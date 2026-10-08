// Shared content rules: types, categories, routes, frontmatter parsing and
// validation. Plain ESM with no Next.js or server-only imports, so the app
// (src/lib/content.js) and the Node scripts (scripts/*.mjs) use the same
// rules. Keep relative imports here with explicit ".js" extensions.

/**
 * @typedef {object} SeoMeta
 * @property {string} title Full <title> text.
 * @property {string} description Meta description. May be empty if the live page had none.
 */

/**
 * @typedef {object} Faq
 * @property {string} question
 * @property {string} answer Markdown.
 */

/**
 * @typedef {"residential" | "commercial" | "battery" | "packages"} ProductCategory
 */

/**
 * A product, service or category hub page.
 * @typedef {object} Product
 * @property {string} slug URL segment. For hubs it equals the category base path.
 * @property {ProductCategory} category
 * @property {"hub" | "detail"} kind
 * @property {string} title Page H1 and card title.
 * @property {string} summary Short description for cards (from the live meta description).
 * @property {string | null} image Key in src/content/images.js for cards, or null.
 * @property {{ desktop: string, mobile: string } | null} banner Image keys of the live page banner.
 * @property {string[]} highlights Bullet points shown on cards (may be empty).
 * @property {string[]} bodyImages Image keys shown beside the body copy on the live page (may be empty).
 * @property {SeoMeta} seo
 * @property {Faq[]} faqs
 * @property {string} bodyFile Markdown file in src/content/pages/.
 * @property {boolean} bodyHiddenOnLive True if the live site ships this copy hidden (`d-none`).
 */

/**
 * @typedef {object} PostFrontmatter
 * @property {string} title
 * @property {string} date ISO date (YYYY-MM-DD).
 * @property {string} category
 * @property {string} image Key in src/content/images.js.
 * @property {string} excerpt Excerpt as shown on the live blog listing.
 * @property {SeoMeta} seo
 */

/**
 * @typedef {PostFrontmatter & { slug: string, body: string }} Post
 */

/**
 * @typedef {object} LegalPage
 * @property {string} slug
 * @property {string} title
 * @property {SeoMeta} seo
 * @property {string} body Markdown.
 */

/**
 * @typedef {object} NavItem
 * @property {string} label
 * @property {string | null} href Internal path ending in "/", external URL, or null if not decided yet.
 * @property {NavItem[]} [children]
 */

/**
 * Business details and site-wide copy (src/content/site.js).
 * @typedef {object} SiteInfo
 * @property {string} name
 * @property {string} legalName
 * @property {string} abn
 * @property {string} url Canonical origin, no trailing slash.
 * @property {string} tagline
 * @property {{ display: string, href: string, international: string }} phone
 * @property {string} email
 * @property {{ number: string, href: string }} whatsapp
 * @property {{ display: string, unit: string, street: string, suburb: string, state: string, postcode: string, country: string, countryCode: string }} address
 * @property {{ netcc: { image: string, label: string } }} badges
 * @property {{ name: string, image: string }[]} brands
 * @property {{ value: number, suffix: string, label: string }[]} stats
 * @property {{ rating: number, count: number, text: string, source: string | null, verified: boolean }} reviewSummary
 * @property {{ text: string, cta: { label: string, href: string | null } }} topBar
 * @property {{ quoteLabel: string, title: string, subtitle: string, buttonLabel: string }} cta
 * @property {{ quickQuote: { fields: string[], submitLabel: string }, specialDeal: { title: string, fields: string[], submitLabel: string } }} forms
 * @property {{ copyright: string }} footer
 */

/**
 * @typedef {object} ImageAsset
 * @property {string} src Source URL on the live site.
 * @property {string} localPath Planned public path (file under public/).
 * @property {string} alt Alt text ("" for decorative images).
 * @property {number} width Intrinsic width in px.
 * @property {number} height Intrinsic height in px.
 */

/** URL base path and label for each product category. */
export const CATEGORIES = /** @type {const} */ ({
  residential: { base: "residential-solar", label: "Residential" },
  commercial: { base: "commercial-solar", label: "Commercial" },
  battery: { base: "solar-battery", label: "Solar Batteries" },
  packages: { base: "solar-packages", label: "Solar Packages" },
});

/** Top-level routes that are not products or posts. */
export const STATIC_ROUTES = [
  "/",
  "/about-exchange-power/",
  "/blog/",
  "/privacy-policy/",
  "/terms-and-conditions/",
];

/** Old live URLs that will redirect (PLAN.md Step 6). Links to them are allowed but flagged. */
export const REDIRECTS = {
  "/category/solar/": "/blog/",
  "/category/uncategorized/": "/blog/",
  "/residential-solar-system/": "/residential-solar/",
};

/** Route folders under src/app that blog slugs (root-level URLs) must not clash with. */
export const RESERVED_TOP_LEVEL = [
  "about-exchange-power",
  "blog",
  "contact",
  "privacy-policy",
  "terms-and-conditions",
  "styleguide",
  "api",
  "faq",
  ...Object.values(CATEGORIES).map((c) => c.base),
];

/** @param {Pick<Product, "slug" | "category" | "kind">} product */
export function productPath(product) {
  const base = CATEGORIES[product.category].base;
  return product.kind === "hub" ? `/${base}/` : `/${base}/${product.slug}/`;
}

/** @param {{ slug: string }} post */
export function postPath(post) {
  return `/${post.slug}/`;
}

/**
 * Parses a Markdown file with frontmatter. Each frontmatter line is
 * `key: <JSON value>` (valid YAML, since JSON is a subset of YAML).
 *
 * @param {string} source
 * @param {string} fileName For error messages.
 * @returns {{ data: Record<string, unknown>, body: string }}
 */
export function parseFrontmatter(source, fileName) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  /** @type {Record<string, unknown>} */
  const data = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const sep = line.indexOf(":");
    if (sep === -1)
      throw new Error(`${fileName}: invalid frontmatter line "${line}"`);
    const key = line.slice(0, sep).trim();
    try {
      data[key] = JSON.parse(line.slice(sep + 1).trim());
    } catch {
      throw new Error(`${fileName}: frontmatter "${key}" must be a JSON value`);
    }
  }
  return { data, body: match[2] };
}

/**
 * @param {Record<string, unknown>} data
 * @param {string} body
 */
export function stringifyFrontmatter(data, body) {
  const lines = Object.entries(data).map(
    ([k, v]) => `${k}: ${JSON.stringify(v)}`,
  );
  return `---\n${lines.join("\n")}\n---\n\n${body.trim()}\n`;
}

/**
 * Throws if `value` is not a non-empty string.
 * @param {unknown} value
 * @param {string} label
 * @param {{ allowEmpty?: boolean }} [options]
 * @returns {asserts value is string}
 */
export function assertString(value, label, { allowEmpty = false } = {}) {
  if (typeof value !== "string" || (!allowEmpty && value.trim() === "")) {
    throw new Error(
      `Content error: ${label} must be a ${allowEmpty ? "" : "non-empty "}string`,
    );
  }
}

/**
 * @param {unknown} seo
 * @param {string} label
 * @returns {asserts seo is SeoMeta}
 */
export function assertSeo(seo, label) {
  if (!seo || typeof seo !== "object")
    throw new Error(`Content error: ${label}.seo is missing`);
  const s = /** @type {Record<string, unknown>} */ (seo);
  assertString(s.title, `${label}.seo.title`);
  assertString(s.description, `${label}.seo.description`, { allowEmpty: true });
}

/**
 * Validates one product entry. Throws a descriptive error.
 * @param {unknown} product
 * @param {number} index
 * @returns {asserts product is Product}
 */
export function assertProduct(product, index) {
  if (!product || typeof product !== "object")
    throw new Error(`Content error: products[${index}] is not an object`);
  const p = /** @type {Record<string, unknown>} */ (product);
  const label = `products[${index}] (${String(p.slug)})`;
  assertString(p.slug, `${label}.slug`);
  if (!(String(p.category) in CATEGORIES))
    throw new Error(
      `Content error: ${label}.category "${String(p.category)}" is unknown`,
    );
  if (p.kind !== "hub" && p.kind !== "detail")
    throw new Error(`Content error: ${label}.kind must be "hub" or "detail"`);
  assertString(p.title, `${label}.title`);
  assertString(p.summary, `${label}.summary`, { allowEmpty: true });
  assertString(p.bodyFile, `${label}.bodyFile`);
  assertSeo(p.seo, label);
  if (!Array.isArray(p.faqs))
    throw new Error(`Content error: ${label}.faqs must be an array`);
  p.faqs.forEach((f, i) => {
    assertString(f?.question, `${label}.faqs[${i}].question`);
    assertString(f?.answer, `${label}.faqs[${i}].answer`);
  });
  if (!Array.isArray(p.highlights))
    throw new Error(`Content error: ${label}.highlights must be an array`);
  if (!Array.isArray(p.bodyImages))
    throw new Error(`Content error: ${label}.bodyImages must be an array`);
}

/**
 * Validates post frontmatter. Throws a descriptive error.
 * @param {Record<string, unknown>} data
 * @param {string} fileName
 * @returns {asserts data is PostFrontmatter}
 */
export function assertPostFrontmatter(data, fileName) {
  for (const key of ["title", "category", "image", "excerpt"]) {
    assertString(data[key], `${fileName} frontmatter "${key}"`);
  }
  if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(
      `Content error: ${fileName} frontmatter "date" must be YYYY-MM-DD`,
    );
  }
  assertSeo(data.seo, fileName);
}
