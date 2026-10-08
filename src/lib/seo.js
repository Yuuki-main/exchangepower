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

/**
 * BreadcrumbList structured data.
 * @param {{ label: string, href: string }[]} items Home first, current page last.
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, SITE.url).href,
    })),
  };
}

/** Markdown → plain text (links keep their label; emphasis is dropped). */
function markdownToText(/** @type {string} */ md) {
  return md
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * FAQPage structured data (FAQPage → mainEntity → Question → acceptedAnswer).
 * Answers must match the visible text on the page.
 * @param {{ question: string, answer: string }[]} faqs Answers in Markdown.
 */
export function faqPageJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: markdownToText(faq.answer) },
    })),
  };
}
