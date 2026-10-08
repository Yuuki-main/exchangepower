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
