// Validates everything in src/content/.
//
//   npm run check:content
//
// Checks: unique slugs, no blog slug clashing with a top-level route, required
// fields, internal links point to known routes, every live URL (PLAN.md A1)
// has content, every image key exists. Exits with code 1 on any error.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ABOUT } from "../src/content/about.js";
import { HOME } from "../src/content/home.js";
import { IMAGES } from "../src/content/images.js";
import { FOOTER_NAV, HEADER_NAV } from "../src/content/navigation.js";
import { PRODUCTS } from "../src/content/products.js";
import { SITE } from "../src/content/site.js";
import {
  REDIRECTS,
  RESERVED_TOP_LEVEL,
  STATIC_ROUTES,
  assertPostFrontmatter,
  assertProduct,
  assertSeo,
  assertString,
  parseFrontmatter,
  postPath,
  productPath,
} from "../src/lib/content-schema.js";
import { SOURCE_PAGES } from "./source-pages.mjs";

const CONTENT = path.resolve(import.meta.dirname, "../src/content");
/** @type {string[]} */
const errors = [];
/** @type {string[]} */
const warnings = [];

/** Runs a check and records its error instead of stopping. */
function check(/** @type {() => void} */ fn) {
  try {
    fn();
  } catch (e) {
    errors.push(/** @type {Error} */ (e).message);
  }
}

// ------------------------------------------------------------ products
const productSlugs = new Set();
const productBodies = [];
PRODUCTS.forEach((p, i) =>
  check(() => {
    assertProduct(p, i);
    const route = productPath(p);
    if (productSlugs.has(route))
      throw new Error(`Duplicate product route ${route}`);
    productSlugs.add(route);
    for (const key of [
      p.image,
      p.banner?.desktop,
      p.banner?.mobile,
      ...p.bodyImages,
    ]) {
      if (key && !(key in IMAGES))
        throw new Error(
          `products[${i}] (${p.slug}): image key "${key}" not in images.js`,
        );
    }
    const body = readFileSync(path.join(CONTENT, "pages", p.bodyFile), "utf8");
    if (!body.trim()) throw new Error(`pages/${p.bodyFile} is empty`);
    productBodies.push({ file: `pages/${p.bodyFile}`, body });
    p.faqs.forEach((f, j) =>
      productBodies.push({
        file: `products ${p.slug} faqs[${j}]`,
        body: f.answer,
      }),
    );
  }),
);

// Every pages/*.md file is used by a product
for (const file of readdirSync(path.join(CONTENT, "pages"))) {
  if (!PRODUCTS.some((p) => p.bodyFile === file))
    warnings.push(`pages/${file} is not referenced by any product`);
}

// ------------------------------------------------------------ posts
const posts = [];
for (const file of readdirSync(path.join(CONTENT, "posts")).filter((f) =>
  f.endsWith(".md"),
)) {
  check(() => {
    const { data, body } = parseFrontmatter(
      readFileSync(path.join(CONTENT, "posts", file), "utf8"),
      `posts/${file}`,
    );
    assertPostFrontmatter(data, `posts/${file}`);
    if (!(data.image in IMAGES))
      throw new Error(
        `posts/${file}: image key "${data.image}" not in images.js`,
      );
    if (!body.trim()) throw new Error(`posts/${file}: body is empty`);
    const slug = file.replace(/\.md$/, "");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
      throw new Error(`posts/${file}: slug must be lowercase kebab-case`);
    if (RESERVED_TOP_LEVEL.includes(slug)) {
      throw new Error(
        `posts/${file}: slug "${slug}" clashes with a top-level route folder`,
      );
    }
    posts.push({ slug, body, file: `posts/${file}` });
  });
}
// Also check against the real folders in src/app (catches new routes).
const appFolders = readdirSync(path.resolve(CONTENT, "../app"), {
  withFileTypes: true,
})
  .filter(
    (d) =>
      d.isDirectory() && !d.name.startsWith("[") && !d.name.startsWith("("),
  )
  .map((d) => d.name);
for (const p of posts) {
  if (appFolders.includes(p.slug))
    errors.push(`posts/${p.slug}.md clashes with src/app/${p.slug}/`);
}

// ------------------------------------------------------------ legal
const legal = [];
for (const slug of ["privacy-policy", "terms-and-conditions"]) {
  check(() => {
    const file = `legal/${slug}.md`;
    const { data, body } = parseFrontmatter(
      readFileSync(path.join(CONTENT, file), "utf8"),
      file,
    );
    assertString(data.title, `${file} title`);
    assertSeo(data.seo, file);
    legal.push({ file, body });
  });
}

// ------------------------------------------------------------ site, home, about
check(() => {
  assertString(SITE.name, "site.name");
  assertString(SITE.email, "site.email");
  if (!/^tel:\+?\d+$/.test(SITE.phone.href))
    throw new Error(`site.phone.href "${SITE.phone.href}" is not a tel: link`);
  if (!SITE.whatsapp.href.startsWith("https://wa.me/"))
    throw new Error("site.whatsapp.href must be a wa.me link");
  for (const b of SITE.brands)
    if (!(b.image in IMAGES))
      throw new Error(`site.brands "${b.name}" image not in images.js`);
  if (!(SITE.badges.netcc.image in IMAGES))
    throw new Error("site.badges.netcc image not in images.js");
  if (SITE.topBar.cta.href === null)
    warnings.push(
      "site.topBar.cta.href is null (Claim now target not decided, PLAN Part C item 8)",
    );
});
check(() => {
  assertSeo(HOME.seo, "home");
  for (const key of [
    HOME.hero.image,
    HOME.why.image,
    ...HOME.services.tabs.map((t) => t.image),
    ...HOME.brands.items,
  ]) {
    if (key && !(key in IMAGES))
      throw new Error(`home: image key "${key}" not in images.js`);
  }
});
check(() => assertSeo(ABOUT.seo, "about"));

// ------------------------------------------------------------ routes and links
const knownRoutes = new Set([
  ...STATIC_ROUTES,
  ...productSlugs,
  ...posts.map((p) => postPath(p)),
]);

/** @param {string} href @param {string} where */
function checkLink(href, where) {
  if (href === null) return;
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    if (/exchangepower\.com\.au/.test(href) && !href.includes("@"))
      errors.push(
        `${where}: absolute link to own site "${href}" (use a relative path)`,
      );
    return;
  }
  const pathOnly = href.split(/[?#]/)[0];
  if (!pathOnly.startsWith("/"))
    return errors.push(`${where}: link "${href}" is not absolute-relative`);
  if (!pathOnly.endsWith("/"))
    return errors.push(`${where}: link "${href}" must end in "/"`);
  if (pathOnly in REDIRECTS)
    return warnings.push(
      `${where}: link "${href}" points to a redirect (→ ${REDIRECTS[pathOnly]})`,
    );
  if (!knownRoutes.has(pathOnly))
    errors.push(`${where}: link "${href}" does not match a known route`);
}

const mdLink = /\[([^\]]*)\]\(([^)\s]+)\)/g;
for (const { file, body } of [...productBodies, ...posts, ...legal]) {
  for (const [, , href] of body.matchAll(mdLink)) checkLink(href, file);
  if (/\[\/?[a-z_]+(\s[^\]]*)?\](?!\()/.test(body.replace(mdLink, "")))
    warnings.push(`${file}: possible leftover shortcode`);
  if (/Comments are closed/i.test(body))
    errors.push(`${file}: contains "Comments are closed"`);
  if (/<span|style=|class=/i.test(body))
    errors.push(`${file}: contains leftover HTML markup`);
  if (/info@exchange\.com\b|wa\.me\/454|\+91/.test(body))
    errors.push(`${file}: contains leftover theme markup`);
}
for (const s of [
  ...HOME.services.tabs.flatMap((t) => t.paragraphs),
  ...ABOUT.intro,
  ABOUT.why.intro,
  ...ABOUT.why.items.map((i) => i.text),
]) {
  for (const [, , href] of s.matchAll(mdLink))
    checkLink(href, "home/about copy");
}
HOME.services.tabs.forEach((t) =>
  checkLink(t.cta.href, `home.services "${t.label}"`),
);
HOME.packages.tabs.forEach((t) =>
  t.items.forEach((href) => checkLink(href, `home.packages "${t.label}"`)),
);

/** @param {import("../src/lib/content-schema.js").NavItem[]} items @param {string} where */
function walkNav(items, where) {
  for (const item of items) {
    if (item.href === null)
      errors.push(`${where} "${item.label}": href is null`);
    else checkLink(item.href, `${where} "${item.label}"`);
    if (item.children) walkNav(item.children, where);
  }
}
walkNav(HEADER_NAV, "header nav");
FOOTER_NAV.forEach((col) => walkNav(col.links, `footer "${col.title}"`));

// ------------------------------------------------------------ coverage of the live site
for (const page of SOURCE_PAGES) {
  if (page.kind === "archive" || page.kind === "orphan") {
    if (!(page.path in REDIRECTS))
      errors.push(
        `Live URL ${page.path} (${page.kind}) has no planned redirect`,
      );
    continue;
  }
  if (!knownRoutes.has(page.path))
    errors.push(`Live URL ${page.path} has no content entry`);
}

// ------------------------------------------------------------ images
for (const [key, img] of Object.entries(IMAGES)) {
  if (!img.src.startsWith("https://"))
    errors.push(`images.${key}: src must be an https URL`);
  if (!img.localPath.startsWith("/images/"))
    errors.push(`images.${key}: localPath must start with /images/`);
  if (!(img.width > 0 && img.height > 0))
    errors.push(`images.${key}: width and height are required`);
}

// ------------------------------------------------------------ report
const faqCount = PRODUCTS.reduce((n, p) => n + p.faqs.length, 0);
console.log(
  `Checked ${PRODUCTS.length} products (${PRODUCTS.filter((p) => p.kind === "hub").length} hubs), ${posts.length} posts, ${faqCount} FAQs, ${legal.length} legal pages, ${Object.keys(IMAGES).length} images, ${knownRoutes.size} routes.`,
);
for (const w of warnings) console.log(`warn   ${w}`);
for (const e of errors) console.log(`ERROR  ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log("\nContent OK.");
