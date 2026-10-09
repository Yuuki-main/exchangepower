import { SITE } from "@/content/site.js";
import { ogImagePath } from "@/lib/content-schema.js";

/** Size of every generated social card. */
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Builds a route's metadata from content, with canonical URL, Open Graph and
 * Twitter tags, and the route's social card (generated at build time by
 * scripts/generate-og.mjs into public/og/).
 * See node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md.
 *
 * @param {object} options
 * @param {string} options.title Page title.
 * @param {string} options.description Meta description.
 * @param {string} options.path Route path ending in "/", e.g. "/blog/".
 * @param {"website" | "article"} [options.type="website"] Open Graph type.
 * @param {string} [options.publishedTime] ISO date, for articles.
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
  type = "website",
  publishedTime,
}) {
  const image = { url: ogImagePath(path), ...OG_SIZE, alt: title };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      images: [image],
      type,
      locale: "en_AU",
      siteName: SITE.name,
      url: path,
      title,
      description,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/**
 * Structured data for the business, from src/content/site.js only.
 * Fields the business hasn't confirmed (ABN, opening hours, reviews) are
 * deliberately left out. `geo` is added only if coordinates are recorded in
 * site.js, and `sameAs` only if social accounts exist (none yet).
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
    ...(SITE.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: SITE.geo.latitude,
            longitude: SITE.geo.longitude,
          },
        }
      : {}),
    ...(SITE.socials?.length ? { sameAs: SITE.socials } : {}),
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

/**
 * Article structured data for a blog post. No image until one is approved.
 * @param {{ title: string, description: string, date: string, path: string }} post
 */
export function articleJsonLd({ title, description, date, path }) {
  const url = new URL(path, SITE.url).href;
  const org = { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: org,
    publisher: org,
  };
}

/** WebSite structured data (homepage). No SearchAction: the site has no search. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-AU",
    publisher: { "@id": `${SITE.url}/#business` },
  };
}
