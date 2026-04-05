/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/contact-us", destination: "/contact", permanent: true }];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/sitemap-:chunk.xml",
        destination: "/api/sitemap-chunk?chunk=:chunk",
      },
    ];
  },
};

export default nextConfig;
