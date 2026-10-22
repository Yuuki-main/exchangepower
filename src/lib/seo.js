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

/** Where the business installs (content handover, Structured data). */
const AREA_SERVED = [
  { "@type": "City", name: "Perth" },
  { "@type": "State", name: "Western Australia" },
];

/**
 * Structured data for the business, from src/content/site.js only.
 * Fields the business hasn't confirmed (opening hours, reviews) are left
 * out until they are set in site.js. `geo` is added only if coordinates are recorded in
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
    taxID: SITE.abn,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.unit}/${address.street}`,
      addressLocality: address.suburb,
      addressRegion: address.state,
      postalCode: address.postcode,
      addressCountry: address.countryCode,
    },
    areaServed: AREA_SERVED,
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
    ...(SITE.openingHours ? { openingHours: SITE.openingHours.schema } : {}),
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
 * @param {{ title: string, description: string, date: string, updated?: string, path: string }} post
 */
export function articleJsonLd({ title, description, date, updated, path }) {
  const url = new URL(path, SITE.url).href;
  const org = { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: updated ?? date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: org,
    publisher: org,
  };
}

/**
 * Service structured data for a product or service page, provided by the
 * business (by @id, defined in localBusinessJsonLd on the homepage).
 * @param {{ name: string, description: string, path: string, serviceType: string, areaServed?: string[] }} service
 *   `areaServed` replaces the default Perth / Western Australia with named places.
 */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
  areaServed,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: new URL(path, SITE.url).href,
    areaServed: areaServed
      ? areaServed.map((place) => ({ "@type": "Place", name: place }))
      : AREA_SERVED,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: `${SITE.url}/`,
      telephone: SITE.phone.international,
    },
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
