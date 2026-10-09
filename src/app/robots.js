import { SITE } from "@/content/site.js";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/styleguide/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
