import { SITE } from "@/content/site.js";

/**
 * Builds a route's metadata from content, with canonical URL and Open Graph.
 * See node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md.
 *
 * @param {object} options
 * @param {string} options.title Page title.
 * @param {string} options.description Meta description.
 * @param {string} options.path Route path ending in "/", e.g. "/blog/".
 * @param {boolean} [options.absoluteTitle=false] Use the title as-is, without the
 *   root layout's "%s | Exchange Power" template (for titles that already
 *   include the brand).
 * @returns {import("next").Metadata}
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}) {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: SITE.name,
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Structured data for the business, from src/content/site.js only.
 * Fields the business hasn't confirmed (ABN, opening hours, reviews) are
 * deliberately left out.
 */
export function localBusinessJsonLd() {
  const { address } = SITE;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: `${SITE.url}/`,
    telephone: SITE.phone.international,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.unit}/${address.street}`,
      addressLocality: address.suburb,
      addressRegion: address.state,
      postalCode: address.postcode,
      addressCountry: address.countryCode,
    },
    areaServed: { "@type": "State", name: "Western Australia" },
  };
}
