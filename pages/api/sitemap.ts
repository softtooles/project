import type { NextApiRequest, NextApiResponse } from "next";
import { routeComponentMap } from "@/app/routes";
import { blogPosts } from "@/app/data/blogPosts";
import { getTopVariantPaths } from "@/app/seo/toolVariantSystem";

const baseUrl = "https://softtooles.com";

function toSitemapXml(urls: string[]) {
  const items = urls
    .sort()
    .map((path) => {
      const loc = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
      // Keep it simple: weekly crawling works well for a tool directory + blog.
      return `
  <url>
    <loc>${loc}</loc>
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
  const urls = new Set<string>();

  // Static-ish routes from your route map
  for (const path of Object.keys(routeComponentMap)) {
    urls.add(path);
  }

  // Blog post routes from your content source
  for (const post of blogPosts) {
    urls.add(`/blog/${post.slug}`);
  }

  // Programmatic SEO: add top variant URLs to sitemap
  const baseToolSlugs = Object.keys(routeComponentMap)
    .filter((p) => p.startsWith("/tools/"))
    .map((p) => p.replace("/tools/", ""))
    .concat(["image-converter"]);

  const topVariantPaths = getTopVariantPaths(baseToolSlugs, 5000);
  for (const p of topVariantPaths) {
    urls.add(p);
  }

  const xml = toSitemapXml(Array.from(urls));

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(xml);
}

