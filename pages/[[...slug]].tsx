import type { NextPage } from "next";
import Head from "next/head";
import { ToolDetailsSection } from "@/app/components/ToolDetailsSection";
import { blogPosts } from "@/app/data/blogPosts";
import { isToolRoute, resolveRouteComponent, resolveRouteMeta, routeComponentMap } from "@/app/routes";
import { getTopVariantPaths } from "@/app/seo/toolVariantSystem";

interface CatchAllPageProps {
  slug?: string[];
}

const baseUrl = "https://softtooles.com";
const REVALIDATE_SECONDS = 3600;

const CatchAllPage: NextPage<CatchAllPageProps> = ({ slug }) => {
  const pathname = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const PageComponent = resolveRouteComponent(pathname);

  const canonicalUrl = `${baseUrl}${pathname === "/" ? "/" : pathname}`;
  const meta = generateMetadataForPathname(pathname);
  const showToolDetails = pathname.startsWith("/tools/") && isToolRoute(pathname);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="google-adsense-account" content="ca-pub-6353972195838916" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6353972195838916"
          crossOrigin="anonymous"
        />

        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="/logo.png?v=2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content="/logo.png?v=2" />

        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <>
        <PageComponent />
        {showToolDetails && (
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl pb-12">
            <ToolDetailsSection pathname={pathname} />
          </div>
        )}
      </>
    </>
  );
};

function generateMetadataForPathname(pathname: string): { title: string; description: string } {
  // This is the Pages-Router equivalent of App-Router `generateMetadata`.
  return resolveRouteMeta(pathname);
}

function pathnameToCatchAllParams(pathname: string): { slug: string[] } {
  if (pathname === "/") return { slug: [] };
  const withoutLeadingSlash = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return { slug: withoutLeadingSlash.split("/") };
}

export async function getStaticPaths() {
  const paths: Array<{ params: { slug?: string[] } }> = [];

  // Pre-render all known routes from your route map (tools + pages like /blog, /tools, /contact, etc).
  for (const pathname of Object.keys(routeComponentMap)) {
    const params = pathnameToCatchAllParams(pathname);
    paths.push({ params });
  }

  // Programmatic SEO: pre-render top 1000 tool variants.
  const baseToolSlugs = Object.keys(routeComponentMap)
    .filter((p) => p.startsWith("/tools/"))
    .map((p) => p.replace("/tools/", ""))
    .concat(["image-converter"]);

  const topVariantPaths = getTopVariantPaths(baseToolSlugs, 1000);
  for (const variantPathname of topVariantPaths) {
    const params = pathnameToCatchAllParams(variantPathname);
    paths.push({ params });
  }

  // Pre-render all blog post routes from content source.
  for (const post of blogPosts) {
    paths.push({ params: { slug: ["blog", post.slug] } });
  }

  return {
    paths,
    // Equivalent of App-Router `dynamicParams = true`:
    // if a new tool/blog slug appears, Next will generate it on first request, then cache it.
    fallback: "blocking" as const,
  };
}

export async function getStaticProps(context: { params?: { slug?: string[] } }) {
  const slug = context.params?.slug;
  const props = slug === undefined ? {} : { slug };
  return {
    props,
    revalidate: REVALIDATE_SECONDS,
  };
}

export default CatchAllPage;
