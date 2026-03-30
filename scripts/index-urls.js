/**
 * Submit URLs to Google's Indexing API.
 *
 * IMPORTANT LIMITATION:
 * The Google Indexing API is intended for JobPosting and BroadcastEvent pages.
 * Submitting generic pages may be rejected or ignored. Use at your own risk.
 *
 * Usage:
 *   1) npm i google-auth-library
 *   2) Put your service account JSON at: ./service-account.json
 *   3) node scripts/index-urls.js
 */

const fs = require("fs");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");

const BASE_URL = "https://softtooles.com";
const TOP_N = 10_000;

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractToolSlugsFromRoutesFile() {
  const routesPath = path.join(process.cwd(), "src", "app", "routes.tsx");
  const src = fs.readFileSync(routesPath, "utf8");
  const matches = src.match(/"\/tools\/([a-z0-9-]+)"/g) || [];
  const slugs = new Set();
  for (const m of matches) {
    const s = m.replace(/"\/tools\/|"/g, "");
    if (s && s !== "tools") slugs.add(s);
  }
  // Add your programmatic base tool(s) here
  slugs.add("image-converter");
  return Array.from(slugs);
}

function generateTopVariantUrls() {
  // Heuristic generator to produce a large set of variant URLs.
  // This should match your runtime pattern:
  //   /tools/{baseToolSlug}/{from}-to-{to}-mode-{mode}
  const baseTools = extractToolSlugsFromRoutesFile();

  const modes = [
    "fast",
    "secure",
    "browser-based",
    "no-install",
    "mobile-friendly",
    "privacy-first",
    "copy-ready",
    "instant",
    "clean-output",
    "verified",
  ];

  const commonFrom = ["input", "raw-data", "payload", "text", "code", "config", "data", "snippet"];
  const commonTo = ["output", "result", "formatted", "minified", "validated", "clean", "optimized", "ready"];

  const imageFrom = ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg", "tiff"];
  const imageTo = ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg", "tiff"];
  const compressSizes = [10, 15, 20, 30, 40, 50, 75, 100];

  const urls = [];

  for (const base of baseTools) {
    if (base === "image-converter") {
      for (const f of imageFrom) {
        for (const t of imageTo) {
          if (f === t) continue;
          const core = `${slugify(f)}-to-${slugify(t)}`;
          urls.push(`${BASE_URL}/tools/${base}/${core}`);
          for (const m of modes) {
            urls.push(`${BASE_URL}/tools/${base}/${core}-mode-${slugify(m)}`);
          }
        }
      }
      for (const kb of compressSizes) {
        const core = `compress-image-to-${kb}kb`;
        urls.push(`${BASE_URL}/tools/${base}/${core}`);
        for (const m of modes.slice(0, 5)) {
          urls.push(`${BASE_URL}/tools/${base}/${core}-mode-${slugify(m)}`);
        }
      }
    } else {
      for (const f of commonFrom) {
        for (const t of commonTo) {
          if (f === t) continue;
          const core = `${slugify(f)}-to-${slugify(t)}`;
          for (const m of modes) {
            urls.push(`${BASE_URL}/tools/${base}/${core}-mode-${slugify(m)}`);
          }
        }
      }
    }

    if (urls.length >= TOP_N) break;
  }

  return urls.slice(0, TOP_N);
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function submitUrl(client, url) {
  const endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish";
  const resp = await client.request({
    url: endpoint,
    method: "POST",
    data: {
      url,
      type: "URL_UPDATED",
    },
  });
  return resp.data;
}

async function main() {
  const keyPath = path.join(process.cwd(), "service-account.json");
  if (!fs.existsSync(keyPath)) {
    console.error("Missing service-account.json at project root.");
    process.exit(1);
  }

  const urls = generateTopVariantUrls();
  console.log(`Prepared ${urls.length} URLs to submit.`);

  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  const client = await auth.getClient();

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const data = await submitUrl(client, url);
      ok++;
      if ((i + 1) % 50 === 0) {
        console.log(`Submitted ${i + 1}/${urls.length}. OK=${ok} FAIL=${fail}`);
      }
    } catch (e) {
      fail++;
      const msg = e?.response?.data ? JSON.stringify(e.response.data) : String(e?.message || e);
      console.error(`Failed: ${url}\n${msg}\n`);
      // Slow down on failures to avoid hammering
      await sleep(500);
    }

    // Basic pacing to reduce rate limit risk
    await sleep(120);
  }

  console.log(`Done. OK=${ok} FAIL=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

