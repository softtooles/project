/**
 * Unzips nested GSC export zips from ./zip, extracts URLs from CSV/TXT,
 * dedupes + normalizes, writes ./indexing-json/1.json, 2.json, ...
 * Each batch file is a single JSON array with at most BATCH_SIZE URLs (default 199).
 *
 * Usage: npm run gsc:indexing-batches
 * Default inbox: ./zip (GSC exports). Override: GSC_INBOX=./gsc-zips-inbox
 * Optional env: GSC_OUT, GSC_HOST, GSC_BATCH_SIZE
 */

import AdmZip from "adm-zip";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { join, basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const INBOX = process.env.GSC_INBOX
  ? resolve(process.env.GSC_INBOX)
  : join(ROOT, "zip");
const OUT_DIR = process.env.GSC_OUT ? resolve(process.env.GSC_OUT) : join(ROOT, "indexing-json");
const WORK_DIR = join(INBOX, ".extract-work");
const ALLOWED_HOST = (process.env.GSC_HOST || "softtooles.com").toLowerCase();
const BATCH_SIZE = Math.min(500, Math.max(1, Number(process.env.GSC_BATCH_SIZE || 199)));

const URL_IN_TEXT_RE = /https?:\/\/[^\s"'<>[\]()]+/gi;

function* walkFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const ent of entries) {
    if (ent.name === ".extract-work" || ent.name === "node_modules") continue;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) yield* walkFiles(p);
    else yield p;
  }
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else if (c === "\r") {
      continue;
    } else {
      cur += c;
    }
  }
  out.push(cur.trim());
  return out;
}

function readTextMaybeUtf16(buf) {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.slice(2).toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    return buf.swap16().slice(2).toString("utf16le");
  }
  let s = buf.toString("utf8");
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  return s;
}

function normalizeUrl(raw) {
  let u = raw.trim().replace(/^"|"$/g, "");
  if (!u) return null;
  try {
    if (!/^https?:\/\//i.test(u)) {
      if (u.startsWith("//")) u = "https:" + u;
      else if (u.startsWith("/")) u = `https://${ALLOWED_HOST.replace(/^www\./, "")}${u}`;
      else return null;
    }
    const parsed = new URL(u);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const base = ALLOWED_HOST.replace(/^www\./, "");
    if (host !== base && !host.endsWith(`.${base}`)) return null;
    parsed.hash = "";
    let out = parsed.toString();
    if (out.endsWith("/") && parsed.pathname !== "/") out = out.replace(/\/+$/, "");
    return out;
  } catch {
    return null;
  }
}

function urlColumnIndex(headerCells) {
  const lower = headerCells.map((c) => c.replace(/^\uFEFF/, "").trim().toLowerCase());
  const candidates = ["url", "page url", "address", "link", "uri"];
  for (const c of candidates) {
    const i = lower.indexOf(c);
    if (i !== -1) return i;
  }
  return -1;
}

function extractUrlsFromCsv(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return [];
  const first = parseCsvLine(lines[0]);
  let urlIdx = urlColumnIndex(first);
  let startRow = 1;
  if (urlIdx === -1) {
    urlIdx = 0;
    startRow = 0;
  }
  const urls = [];
  for (let r = startRow; r < lines.length; r++) {
    const cells = parseCsvLine(lines[r]);
    const cell = cells[urlIdx];
    if (cell) {
      const n = normalizeUrl(cell);
      if (n) urls.push(n);
    }
  }
  return urls;
}

function extractUrlsFromTxt(content) {
  const urls = [];
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const n = normalizeUrl(trimmed);
    if (n) urls.push(n);
    else {
      let m;
      URL_IN_TEXT_RE.lastIndex = 0;
      while ((m = URL_IN_TEXT_RE.exec(line)) !== null) {
        const x = normalizeUrl(m[0]);
        if (x) urls.push(x);
      }
    }
  }
  return urls;
}

function listZipFiles(dir) {
  const z = [];
  for (const p of walkFiles(dir)) {
    if (p.toLowerCase().endsWith(".zip")) z.push(p);
  }
  return z;
}

function unzipTo(zipPath, outDir) {
  mkdirSync(outDir, { recursive: true });
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(outDir, true);
}

function copyInboxIntoWork(srcDir, destDir) {
  let count = 0;
  for (const ent of readdirSync(srcDir, { withFileTypes: true })) {
    if (ent.name === ".extract-work" || ent.name === ".gitkeep") continue;
    const s = join(srcDir, ent.name);
    const d = join(destDir, ent.name);
    if (ent.isDirectory()) {
      mkdirSync(d, { recursive: true });
      count += copyInboxIntoWork(s, d);
    } else {
      copyFileSync(s, d);
      count++;
    }
  }
  return count;
}

function prepareWorkTree() {
  if (existsSync(WORK_DIR)) rmSync(WORK_DIR, { recursive: true, force: true });
  mkdirSync(WORK_DIR, { recursive: true });

  if (!existsSync(INBOX)) {
    console.error(`Missing inbox folder: ${INBOX}`);
    process.exit(1);
  }

  const copied = copyInboxIntoWork(INBOX, WORK_DIR);

  if (copied === 0) {
    console.error(
      `No files in ${INBOX}. Add your GSC export .zip files (and nested zips inside), then run again.`,
    );
    process.exit(1);
  }
}

function unzipAllNested(root) {
  const processed = new Set();
  let safety = 0;
  while (safety++ < 5000) {
    const zips = listZipFiles(root).filter((z) => !processed.has(z));
    if (zips.length === 0) break;
    for (const z of zips) {
      processed.add(z);
      const outDir = `${z}__unzipped`;
      try {
        unzipTo(z, outDir);
      } catch (e) {
        console.warn(`Skip bad zip: ${z} (${e.message})`);
      }
    }
  }
}

function collectUrlsFromWorkTree() {
  /** @type {Map<string, string>} */
  const urlFirstCategory = new Map();

  for (const filePath of walkFiles(WORK_DIR)) {
    const low = filePath.toLowerCase();
    if (low.endsWith(".zip")) continue;
    const rel = filePath.slice(WORK_DIR.length + 1);
    const parts = rel.split(/[/\\]/);
    const uzipSegs = parts.filter((p) => p.endsWith("__unzipped"));
    const deepest = uzipSegs[uzipSegs.length - 1];
    const zipHint = deepest ? deepest.replace(/__unzipped$/i, "") : "";
    const category = zipHint ? basename(zipHint, ".zip") : "loose-files";

    let urls = [];
    if (low.endsWith(".csv")) {
      const buf = readFileSync(filePath);
      urls = extractUrlsFromCsv(readTextMaybeUtf16(buf));
    } else if (low.endsWith(".txt")) {
      const buf = readFileSync(filePath);
      urls = extractUrlsFromTxt(readTextMaybeUtf16(buf));
    }

    for (const u of urls) {
      if (!urlFirstCategory.has(u)) urlFirstCategory.set(u, category);
    }
  }

  const urls = Array.from(urlFirstCategory.keys()).sort();
  /** @type {Map<string, number>} */
  const byCategory = new Map();
  for (const u of urls) {
    const cat = urlFirstCategory.get(u) ?? "unknown";
    byCategory.set(cat, (byCategory.get(cat) || 0) + 1);
  }

  return { urls, byCategory };
}

function main() {
  prepareWorkTree();
  unzipAllNested(WORK_DIR);
  const { urls, byCategory } = collectUrlsFromWorkTree();

  mkdirSync(OUT_DIR, { recursive: true });
  if (existsSync(OUT_DIR)) {
    for (const ent of readdirSync(OUT_DIR, { withFileTypes: true })) {
      if (ent.name === "all-site-urls.json" || ent.name === "batches") continue;
      const p = join(OUT_DIR, ent.name);
      if (ent.isDirectory()) rmSync(p, { recursive: true, force: true });
      else rmSync(p, { force: true });
    }
  }

  if (urls.length > 0) {
    writeFileSync(join(OUT_DIR, "gsc-export-urls.json"), JSON.stringify(urls, null, 2), "utf8");
  }

  const splitBatches = process.env.GSC_SPLIT_BATCHES === "1";
  let batchCount = 0;
  if (splitBatches && urls.length > 0) {
    let n = 1;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const chunk = urls.slice(i, i + BATCH_SIZE);
      writeFileSync(join(OUT_DIR, `${n}.json`), JSON.stringify(chunk), "utf8");
      n++;
    }
    batchCount = n - 1;
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    inbox: INBOX,
    output: OUT_DIR,
    allowedHost: ALLOWED_HOST,
    batchSize: BATCH_SIZE,
    totalUniqueUrls: urls.length,
    singleFile: "gsc-export-urls.json (one JSON array, no splitting)",
    batchFileCount: batchCount,
    splitBatchesHint: "Set GSC_SPLIT_BATCHES=1 to also write 1.json, 2.json, ... (199 URLs each).",
    indexingApiNote:
      "URLs from 'Alternate page with proper canonical' are usually correct not to index separately. Redirect sources should not be indexed; fix redirects on the site instead.",
    urlsPerCategoryFromZipNames: Object.fromEntries(
      [...byCategory.entries()].sort((a, b) => b[1] - a[1]),
    ),
  };
  writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2), "utf8");

  console.log(
    `Done. Unique URLs: ${urls.length}. ${splitBatches ? `Batch files: ${batchCount}. ` : ""}Single file: gsc-export-urls.json. Summary: ${join(OUT_DIR, "summary.json")}`,
  );
}

main();
