import { SITE } from "@/content/site.js";
import { isIndexable } from "@/lib/content-schema.js";

// Production: allow everything and point to the sitemap. Vercel preview
// deployments (VERCEL_ENV=preview): disallow everything, so previews are never
// indexed (pages also get a noindex meta tag, see layout.js).

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  if (!isIndexable()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
