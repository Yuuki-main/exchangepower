// SEO check against a running production build.
//
//   npm run build && npm run start      (in one terminal)
//   npm run check:seo                   (in another; BASE_URL=http://localhost:3000 by default)
//
// Fetches every URL in /sitemap.xml and fails if any page is missing, or
// shares with another page: <title>, meta description, canonical, og:title,
// og:image (which must load with 200, no redirect). Also fails on more than one <h1>, a canonical that isn't absolute
// or doesn't end in "/", a missing twitter:card, or a page marked noindex.
// Checks that /styleguide/ (removed in Step 10) returns 404 and that
// robots.txt allows the site and points to the sitemap.

const BASE = (
  process.env.BASE_URL ??
  process.argv[2] ??
  "http://localhost:3000"
).replace(/\/$/, "");
const SITE = "https://exchangepower.com.au";

/** @type {string[]} */
const errors = [];

/** @param {string} path */
async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  return { status: res.status, text: await res.text() };
}

/** Decodes the few entities Next.js emits in attributes and titles. */
const decode = (/** @type {string} */ s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** @param {string} html @param {string} attr @param {string} name */
function meta(html, attr, name) {
  const re = new RegExp(
    `<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"|<meta[^>]*content="([^"]*)"[^>]*${attr}="${name}"`,
  );
  const m = html.match(re);
  return m ? decode(m[1] ?? m[2]) : null;
}

const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) {
  console.error(
    `Could not load ${BASE}/sitemap.xml (status ${sitemap.status}). Is the production server running?`,
  );
  process.exit(1);
}
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
);

/** @type {Map<string, Map<string, string[]>>} field → value → pages */
const seen = new Map();
const record = (
  /** @type {string} */ field,
  /** @type {string} */ value,
  /** @type {string} */ page,
) => {
  if (!seen.has(field)) seen.set(field, new Map());
  const byValue = /** @type {Map<string, string[]>} */ (seen.get(field));
  byValue.set(value, [...(byValue.get(value) ?? []), page]);
};

const rows = [];
for (const url of urls) {
  const path = new URL(url).pathname;
  if (!url.startsWith(SITE + "/"))
    errors.push(`sitemap: ${url} is not an absolute ${SITE} URL`);
  if (!path.endsWith("/")) errors.push(`sitemap: ${url} does not end in "/"`);
  const { status, text: html } = await get(path);
  if (status !== 200) {
    errors.push(`${path}: status ${status}`);
    continue;
  }
  const head = html.slice(0, html.indexOf("</head>"));
  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = meta(head, "name", "description");
  const canonical =
    head.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1] ?? null;
  const ogTitle = meta(head, "property", "og:title");
  const ogImage = meta(head, "property", "og:image");
  const twitterCard = meta(head, "name", "twitter:card");
  const robots = meta(head, "name", "robots");
  const body = html
    .slice(html.indexOf("<body"))
    .replace(/<script[\s\S]*?<\/script>/g, "");
  const h1s = (body.match(/<h1[\s>]/g) ?? []).length;

  const fields = {
    title,
    description,
    canonical,
    "og:title": ogTitle,
    "og:image": ogImage,
  };
  for (const [field, value] of Object.entries(fields)) {
    if (!value) errors.push(`${path}: missing ${field}`);
    else
      record(field, field === "og:image" ? value.split("?")[0] : value, path);
  }
  if (canonical && canonical !== `${SITE}${path}`)
    errors.push(`${path}: canonical is ${canonical}, expected ${SITE}${path}`);
  if (!twitterCard) errors.push(`${path}: missing twitter:card`);
  if (!meta(head, "name", "twitter:image"))
    errors.push(`${path}: missing twitter:image`);
  if (ogImage) {
    // The social card must load directly: no redirect, a real PNG.
    const imgPath = ogImage.replace(SITE, "");
    const img = await fetch(BASE + imgPath, { redirect: "manual" });
    if (
      img.status !== 200 ||
      !/^image\//.test(img.headers.get("content-type") ?? "")
    ) {
      errors.push(
        `${path}: og:image ${imgPath} returned ${img.status} ${img.headers.get("content-type") ?? ""}`,
      );
    }
  }
  if (robots && /noindex/.test(robots))
    errors.push(`${path}: marked noindex but listed in the sitemap`);
  if (h1s !== 1)
    errors.push(`${path}: ${h1s} <h1> elements (expected exactly 1)`);
  rows.push({
    path,
    title: title.length,
    description: description?.length ?? 0,
    h1s,
  });
}

for (const [field, byValue] of seen) {
  for (const [value, pages] of byValue) {
    if (pages.length > 1)
      errors.push(
        `duplicate ${field} "${value.slice(0, 70)}" on ${pages.join(", ")}`,
      );
  }
}

// The styleguide was removed in Step 10 and must not exist.
const guide = await get("/styleguide/");
if (guide.status !== 404)
  errors.push(`/styleguide/ returned ${guide.status}, expected 404`);
// Production robots.txt must allow the site (previews disallow everything).
const robotsTxt = await get("/robots.txt");
if (/^Disallow: \/\s*$/m.test(robotsTxt.text))
  errors.push("robots.txt disallows the whole site (built as a preview?)");
if (!robotsTxt.text.includes(`Sitemap: ${SITE}/sitemap.xml`))
  errors.push("robots.txt does not point to the sitemap");

console.log(`Checked ${rows.length} sitemap URLs on ${BASE}.`);
for (const r of rows)
  console.log(
    `  ${r.path.padEnd(72)} title ${String(r.title).padStart(3)}  desc ${String(r.description).padStart(3)}  h1 ${r.h1s}`,
  );
for (const e of errors) console.log(`ERROR  ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} SEO problem(s).`);
  process.exit(1);
}
console.log(
  "\nSEO OK: every page has a unique title, description, canonical, og:title and og:image, and one h1.",
);
