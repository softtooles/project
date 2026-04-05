import { blogPosts } from "@/app/data/blogPosts";
import { routeComponentMap } from "@/app/routes";
import { getTopVariantPaths, PROGRAMMATIC_SEO_VARIANT_LIMIT } from "@/app/seo/toolVariantSystem";

/** Max URLs per sitemap file (Google allows up to 50k; we use 5k for manageable chunks). */
export const SITEMAP_CHUNK_SIZE = 5000;

export function getProgrammaticBaseToolSlugs(): string[] {
  return Object.keys(routeComponentMap)
    .filter((p) => p.startsWith("/tools/"))
    .map((p) => p.replace("/tools/", ""))
    .concat(["image-converter"]);
}

/** Variant hub pagination size (must match pages/variant-hub/[page].tsx). */
export const VARIANT_HUB_LINKS_PER_PAGE = 250;

export function getVariantHubPageCount(): number {
  const v = getTopVariantPaths(getProgrammaticBaseToolSlugs(), PROGRAMMATIC_SEO_VARIANT_LIMIT);
  return Math.max(1, Math.ceil(v.length / VARIANT_HUB_LINKS_PER_PAGE));
}

/**
 * All pathnames to include in sitemaps (sorted, deduped).
 */
export function collectAllSitemapPathnames(): string[] {
  const paths = new Set<string>();

  paths.add("/variant-hub");

  const variantHubPageCount = getVariantHubPageCount();
  for (let p = 1; p <= variantHubPageCount; p++) {
    paths.add(`/variant-hub/${p}`);
  }

  for (const path of Object.keys(routeComponentMap)) {
    if (path === "/contact-us") continue;
    paths.add(path);
  }

  for (const post of blogPosts) {
    paths.add(`/blog/${post.slug}`);
  }

  const topVariantPaths = getTopVariantPaths(getProgrammaticBaseToolSlugs(), PROGRAMMATIC_SEO_VARIANT_LIMIT);
  for (const p of topVariantPaths) {
    paths.add(p);
  }

  return Array.from(paths).sort();
}

export function chunkPathnames(pathnames: string[], chunkSize: number): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < pathnames.length; i += chunkSize) {
    chunks.push(pathnames.slice(i, i + chunkSize));
  }
  return chunks.length > 0 ? chunks : [[]];
}
