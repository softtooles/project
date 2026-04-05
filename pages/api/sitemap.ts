import type { NextApiRequest, NextApiResponse } from "next";
import {
  SITEMAP_CHUNK_SIZE,
  chunkPathnames,
  collectAllSitemapPathnames,
} from "@/app/seo/sitemapPaths";

const baseUrl = "https://softtooles.com";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const all = collectAllSitemapPathnames();
  const chunks = chunkPathnames(all, SITEMAP_CHUNK_SIZE);
  const lastmodDay = new Date().toISOString().slice(0, 10);

  const items = chunks
    .map((_, i) => {
      const index = i + 1;
      return `
  <sitemap>
    <loc>${baseUrl}/sitemap-${index}.xml</loc>
    <lastmod>${lastmodDay}</lastmod>
  </sitemap>`.trim();
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}
</sitemapindex>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(xml);
}
