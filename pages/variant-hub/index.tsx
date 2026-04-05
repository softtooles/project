import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import {
  getProgrammaticBaseToolSlugs,
  getVariantHubPageCount,
  VARIANT_HUB_LINKS_PER_PAGE,
} from "@/app/seo/sitemapPaths";
import { getTopVariantPaths, PROGRAMMATIC_SEO_VARIANT_LIMIT } from "@/app/seo/toolVariantSystem";

const baseUrl = "https://softtooles.com";

type Props = {
  totalPages: number;
  totalVariants: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const baseToolSlugs = getProgrammaticBaseToolSlugs();
  const all = getTopVariantPaths(baseToolSlugs, PROGRAMMATIC_SEO_VARIANT_LIMIT);
  return {
    props: {
      totalPages: getVariantHubPageCount(),
      totalVariants: all.length,
    },
    revalidate: 3600,
  };
};

const VariantHubIndex: NextPage<Props> = ({ totalPages, totalVariants }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <Head>
        <title>Programmatic tool pages (hub) | Softtooles</title>
        <meta
          name="description"
          content={`Browse ${totalVariants.toLocaleString()} tool landing URLs across ${totalPages} index pages for crawl-friendly internal discovery.`}
        />
        <link rel="canonical" href={`${baseUrl}/variant-hub`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="glass-panel rounded-3xl p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2">Programmatic tool URL hub</h1>
            <p className="text-muted-foreground text-sm max-w-2xl mb-4">
              {totalVariants.toLocaleString()} variant URLs (from{" "}
              <code className="text-xs bg-muted px-1 rounded">getTopVariantPaths</code> cap{" "}
              {PROGRAMMATIC_SEO_VARIANT_LIMIT.toLocaleString()}), {VARIANT_HUB_LINKS_PER_PAGE} links per page.
              Sitemaps: <code className="text-xs bg-muted px-1 rounded">/sitemap.xml</code> (index) →{" "}
              <code className="text-xs bg-muted px-1 rounded">/sitemap-1.xml</code>, …
            </p>
          </div>
          <nav aria-label="Variant hub pagination">
            <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-sm">
              {pages.map((p) => (
                <li key={p}>
                  <Link
                    href={`/variant-hub/${p}`}
                    className="block rounded-xl border border-border/60 bg-card/40 px-3 py-2 text-center hover:border-cyan-500/50 transition-colors"
                  >
                    Page {p}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default VariantHubIndex;
