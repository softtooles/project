import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { collectAllSitemapPathnames } from "../src/app/seo/sitemapPaths";

const baseUrl = "https://softtooles.com";
const BATCH_SIZE = 199;

function pathToAbsoluteUrl(path: string): string {
  return path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
}

function main() {
  const paths = collectAllSitemapPathnames();
  const urls = paths.map(pathToAbsoluteUrl);

  const outDir = join(process.cwd(), "indexing-json");
  const batchesDir = join(outDir, "batches");
  mkdirSync(batchesDir, { recursive: true });

  for (const name of readdirSync(batchesDir)) {
    if (/^\d+\.json$/.test(name)) {
      rmSync(join(batchesDir, name), { force: true });
    }
  }

  let batchIndex = 1;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const chunk = urls.slice(i, i + BATCH_SIZE);
    writeFileSync(join(batchesDir, `${batchIndex}.json`), JSON.stringify(chunk), "utf8");
    batchIndex++;
  }

  const outFile = join(outDir, "all-site-urls.json");
  writeFileSync(outFile, JSON.stringify(urls, null, 2), "utf8");

  const batchCount = batchIndex - 1;

  console.log(
    `Wrote ${urls.length} URLs to ${outFile} and ${batchCount} batch files (${BATCH_SIZE} URLs max each) in ${batchesDir}`,
  );
}

main();
