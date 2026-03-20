import type { NextPage } from "next";
import Head from "next/head";
import { ToolDetailsSection } from "@/app/components/ToolDetailsSection";
import { isToolRoute, resolveRouteComponent, resolveRouteMeta } from "@/app/routes";

interface CatchAllPageProps {
  slug?: string[];
}

const CatchAllPage: NextPage<CatchAllPageProps> = ({ slug }) => {
  const pathname = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const PageComponent = resolveRouteComponent(pathname);
  const meta = resolveRouteMeta(pathname);
  const canonicalUrl = `https://softtools.studio${pathname}`;
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

CatchAllPage.getInitialProps = ({ query }) => {
  const rawSlug = query.slug;

  if (Array.isArray(rawSlug)) {
    return { slug: rawSlug };
  }

  if (typeof rawSlug === "string") {
    return { slug: [rawSlug] };
  }

  return { slug: undefined };
};

export default CatchAllPage;
