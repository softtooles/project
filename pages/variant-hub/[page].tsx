import Link from "next/link";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  getProgrammaticBaseToolSlugs,
  getVariantHubPageCount,
  VARIANT_HUB_LINKS_PER_PAGE,
} from "@/app/seo/sitemapPaths";
import { getTopVariantPaths, PROGRAMMATIC_SEO_VARIANT_LIMIT } from "@/app/seo/toolVariantSystem";

const baseUrl = "https://softtooles.com";

type Props = {
  paths: string[];
  pageNum: number;
  totalPages: number;
  totalVariants: number;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const n = getVariantHubPageCount();
  return {
    paths: Array.from({ length: n }, (_, i) => ({ params: { page: String(i + 1) } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pageNum = parseInt(String(params?.page ?? ""), 10);
  const baseToolSlugs = getProgrammaticBaseToolSlugs();
  const all = getTopVariantPaths(baseToolSlugs, PROGRAMMATIC_SEO_VARIANT_LIMIT);
  const totalPages = getVariantHubPageCount();

  if (!Number.isFinite(pageNum) || pageNum < 1 || pageNum > totalPages) {
    return { notFound: true };
  }

  const start = (pageNum - 1) * VARIANT_HUB_LINKS_PER_PAGE;
  const paths = all.slice(start, start + VARIANT_HUB_LINKS_PER_PAGE);

  return {
    props: {
      paths,
      pageNum,
      totalPages,
      totalVariants: all.length,
    },
    revalidate: 3600,
  };
};

const VariantHubPage: NextPage<Props> = ({ paths, pageNum, totalPages, totalVariants }) => {
  const canonical = `${baseUrl}/variant-hub/${pageNum}`;
  const prev = pageNum > 1 ? pageNum - 1 : null;
  const next = pageNum < totalPages ? pageNum + 1 : null;

  return (
    <>
      <Head>
        <title>
          Tool landing pages — page {pageNum} of {totalPages} | Softtooles
        </title>
        <meta
          name="description"
          content={`Page ${pageNum}: internal links to ${paths.length} programmatic tool URLs (${totalVariants.toLocaleString()} total).`}
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="glass-panel rounded-3xl p-6 md:p-8 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Variant hub · Page {pageNum}</h1>
              <p className="text-muted-foreground text-sm">
                Showing {(pageNum - 1) * VARIANT_HUB_LINKS_PER_PAGE + 1}–
                {(pageNum - 1) * VARIANT_HUB_LINKS_PER_PAGE + paths.length} of {totalVariants.toLocaleString()} URLs
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/variant-hub" className="text-sm text-cyan-600 hover:underline dark:text-cyan-400">
                Hub index
              </Link>
              {prev !== null && (
                <Link
                  href={`/variant-hub/${prev}`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-border/60 hover:bg-accent"
                >
                  ← Previous
                </Link>
              )}
              {next !== null && (
                <Link
                  href={`/variant-hub/${next}`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-border/60 hover:bg-accent"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {paths.map((path) => (
              <li key={path}>
                <Link href={path} className="text-cyan-600 hover:underline dark:text-cyan-400 break-all">
                  {path}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VariantHubPage;
