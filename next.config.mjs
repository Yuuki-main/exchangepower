/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Match the live WordPress URLs, which all end in "/".
  trailingSlash: true,
  // Content Markdown is read with fs (src/lib/content.js). Pages are
  // prerendered, but keep the files in server traces for any request-time render.
  outputFileTracingIncludes: {
    "/*": ["src/content/**/*.md"],
  },
  // Old WordPress URLs with no page in the new site (PLAN.md A1). 308, permanent.
  async redirects() {
    return [
      { source: "/category/solar", destination: "/blog/", permanent: true },
      {
        source: "/category/uncategorized",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/residential-solar-system",
        destination: "/residential-solar/",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
