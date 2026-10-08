// Every URL on the live site (PLAN.md table A1) and how the import treats it.
// `kind` decides which extractor runs in scripts/import-content.mjs.

import path from "node:path";

export const SOURCE_DIR = path.resolve(
  import.meta.dirname,
  "../.cache/source-html",
);

/**
 * @typedef {object} SourcePage
 * @property {string} path Live URL path (with trailing slash).
 * @property {"home" | "about" | "blog-index" | "hub" | "detail" | "post" | "legal" | "archive" | "orphan"} kind
 * @property {string} [category] residential | commercial | battery | packages
 */

/** @type {SourcePage[]} */
export const SOURCE_PAGES = [
  { path: "/", kind: "home" },
  { path: "/about-exchange-power/", kind: "about" },
  { path: "/blog/", kind: "blog-index" },
  { path: "/residential-solar/", kind: "hub", category: "residential" },
  {
    path: "/residential-solar/6-6kw-solar-system-wa/",
    kind: "detail",
    category: "residential",
  },
  {
    path: "/residential-solar/7-7kw-solar-system-wa/",
    kind: "detail",
    category: "residential",
  },
  {
    path: "/residential-solar/10kw-solar-system-wa/",
    kind: "detail",
    category: "residential",
  },
  {
    path: "/residential-solar/13-2kw-solar-system/",
    kind: "detail",
    category: "residential",
  },
  { path: "/commercial-solar/", kind: "hub", category: "commercial" },
  {
    path: "/commercial-solar/30kw-solar-system/",
    kind: "detail",
    category: "commercial",
  },
  {
    path: "/commercial-solar/50kw-solar-system/",
    kind: "detail",
    category: "commercial",
  },
  {
    path: "/commercial-solar/100kw-solar-system/",
    kind: "detail",
    category: "commercial",
  },
  { path: "/solar-battery/", kind: "hub", category: "battery" },
  {
    path: "/solar-battery/wa-residential-battery-rebates/",
    kind: "detail",
    category: "battery",
  },
  { path: "/solar-packages/", kind: "hub", category: "packages" },
  {
    path: "/solar-packages/solar-panel-installation-in-wa/",
    kind: "detail",
    category: "packages",
  },
  {
    path: "/solar-packages/solar-panel-installation-wangara/",
    kind: "detail",
    category: "packages",
  },
  {
    path: "/solar-packages/solar-rebates-and-incentives-in-wa/",
    kind: "detail",
    category: "packages",
  },
  {
    path: "/6-6kw-solar-system-vs-7-7kw-solar-system-which-is-better/",
    kind: "post",
  },
  {
    path: "/is-a-7-7kw-solar-system-suitable-for-homes-with-air-conditioning/",
    kind: "post",
  },
  {
    path: "/why-a-7-7kw-solar-system-is-ideal-for-growing-families/",
    kind: "post",
  },
  {
    path: "/why-the-6-6kw-solar-system-is-australias-most-popular-choice/",
    kind: "post",
  },
  {
    path: "/solar-panel-rebate-western-australia-for-first-time-solar-buyers/",
    kind: "post",
  },
  {
    path: "/complete-guide-to-solar-power-rebate-western-australia-in-2026/",
    kind: "post",
  },
  {
    path: "/wa-government-solar-battery-rebate-2026-complete-guide-for-homeowners/",
    kind: "post",
  },
  {
    path: "/wa-residential-battery-scheme-for-solar-homes-in-western-australia/",
    kind: "post",
  },
  { path: "/category/solar/", kind: "archive" },
  { path: "/category/uncategorized/", kind: "archive" },
  { path: "/residential-solar-system/", kind: "orphan" },
  { path: "/privacy-policy/", kind: "legal" },
  { path: "/terms-and-conditions/", kind: "legal" },
];

/** @param {SourcePage} page */
export function sourceFile(page) {
  const name =
    page.path === "/"
      ? "index"
      : page.path.replace(/^\/|\/$/g, "").replaceAll("/", "__");
  return path.join(SOURCE_DIR, `${name}.html`);
}
