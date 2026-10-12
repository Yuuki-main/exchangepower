/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Match the live WordPress URLs, which all end in "/".
  trailingSlash: true,
  // 75 is the default; 50 is for card photos under a dark scrim (CardPhoto),
  // where the lower quality isn't visible and saves bandwidth.
  images: { qualities: [50, 75] },
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
