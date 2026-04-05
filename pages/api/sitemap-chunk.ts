import type { NextApiRequest, NextApiResponse } from "next";
import {
  SITEMAP_CHUNK_SIZE,
  chunkPathnames,
  collectAllSitemapPathnames,
} from "@/app/seo/sitemapPaths";

const baseUrl = "https://softtooles.com";

function toSitemapUrlsetXml(pathnames: string[], lastmodDay: string) {
  const items = pathnames
    .map((path) => {
      const loc = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmodDay}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`.trim();
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}
</urlset>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const raw = req.query.chunk;
  const chunkStr = Array.isArray(raw) ? raw[0] : raw;
  const n = parseInt(String(chunkStr ?? ""), 10);

  if (!Number.isFinite(n) || n < 1) {
    res.status(400).setHeader("Content-Type", "text/plain; charset=utf-8").send("Invalid sitemap chunk");
    return;
  }

  const all = collectAllSitemapPathnames();
  const chunks = chunkPathnames(all, SITEMAP_CHUNK_SIZE);

  if (n > chunks.length) {
    res.status(404).setHeader("Content-Type", "text/plain; charset=utf-8").send("Sitemap chunk not found");
    return;
  }

  const pathnames = chunks[n - 1];
  const lastmodDay = new Date().toISOString().slice(0, 10);
  const xml = toSitemapUrlsetXml(pathnames, lastmodDay);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(xml);
}
