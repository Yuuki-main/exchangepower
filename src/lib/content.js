import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ABOUT } from "@/content/about.js";
import { BACKGROUNDS } from "@/content/backgrounds.js";
import { BLOG } from "@/content/blog.js";
import { HOME } from "@/content/home.js";
import { IMAGES } from "@/content/images.js";
import { FOOTER_NAV, HEADER_NAV } from "@/content/navigation.js";
import { PRODUCTS } from "@/content/products.js";
import { SITE } from "@/content/site.js";
import {
  CATEGORIES,
  assertPostFrontmatter,
  assertProduct,
  assertSeo,
  assertString,
  parseFrontmatter,
  postPath,
  productPath,
} from "./content-schema.js";

/**
 * Content accessors. Pages read all copy through these functions.
 *
 * Markdown files are read with synchronous `fs` calls. With Cache Components,
 * synchronous I/O completes during prerendering, so pages that use these
 * accessors are fully static (see node_modules/next/dist/docs/01-app/
 * 01-getting-started/08-caching.md, "Predictable values"). Do not switch to
 * async `readFile` without adding `"use cache"`.
 *
 * Every accessor validates its data and throws a descriptive error, so a
 * missing or broken entry fails `next build` instead of shipping.
 */

// Types live in content-schema.js (shared with the Node scripts).
/** @typedef {import("./content-schema.js").Product} Product */
/** @typedef {import("./content-schema.js").ProductCategory} ProductCategory */
/** @typedef {import("./content-schema.js").Post} Post */
/** @typedef {import("./content-schema.js").Faq} Faq */
/** @typedef {import("./content-schema.js").SeoMeta} SeoMeta */
/** @typedef {import("./content-schema.js").NavItem} NavItem */
/** @typedef {import("./content-schema.js").SiteInfo} SiteInfo */
/** @typedef {import("./content-schema.js").LegalPage} LegalPage */
/** @typedef {import("./content-schema.js").ImageAsset} ImageAsset */

const CONTENT_DIR = path.join(process.cwd(), "src/content");

/** @param {string} rel */
function readContentFile(rel) {
  const file = path.join(CONTENT_DIR, rel);
  try {
    return readFileSync(file, "utf8");
  } catch {
    throw new Error(`Content error: file not found: src/content/${rel}`);
  }
}

/** @param {unknown} key @param {string} label */
function assertImageKey(key, label) {
  if (key === null) return;
  assertString(key, label);
  if (!(key in IMAGES))
    throw new Error(
      `Content error: ${label} "${key}" is not in src/content/images.js`,
    );
}

// ---------------------------------------------------------------- site

/** @returns {SiteInfo} */
export function getSite() {
  assertString(SITE.name, "site.name");
  assertString(SITE.phone?.href, "site.phone.href");
  assertString(SITE.email, "site.email");
  return SITE;
}

/** @returns {{ header: NavItem[], footer: { title: string, links: NavItem[] }[] }} */
export function getNavigation() {
  return { header: HEADER_NAV, footer: FOOTER_NAV };
}

export function getHome() {
  assertSeo(HOME.seo, "home");
  return HOME;
}

/**
 * The homepage FAQs, resolved to the verbatim FAQ entries on product pages.
 * @returns {(Faq & { href: string })[]}
 */
export function getHomeFaqs() {
  return HOME.faq.items.map(({ product, index }, i) => {
    const source = PRODUCTS.find((p) => p.slug === product);
    const faq = source?.faqs[index];
    if (!source || !faq) {
      throw new Error(
        `Content error: home.faq.items[${i}] points to a missing FAQ (${product} #${index})`,
      );
    }
    return { ...faq, href: productPath(source) };
  });
}

export function getAbout() {
  assertSeo(ABOUT.seo, "about");
  return ABOUT;
}

export function getBlogIndex() {
  assertSeo(BLOG.seo, "blog");
  return BLOG;
}

/**
 * @param {string} key
 * @returns {ImageAsset}
 */
export function getImage(key) {
  const image = IMAGES[key];
  if (!image)
    throw new Error(
      `Content error: image "${key}" is not in src/content/images.js`,
    );
  return image;
}

/**
 * An image approved for use (PLAN Part C item 7) whose file exists in
 * public/, or null. Image slots render only when this returns an asset.
 * @param {string | null | undefined} key
 * @returns {ImageAsset | null}
 */
export function getApprovedImage(key) {
  if (!key) return null;
  const image = getImage(key);
  if (!image.approved) return null;
  if (!existsSync(path.join(process.cwd(), "public", image.localPath))) {
    throw new Error(
      `Content error: image "${key}" is approved but public${image.localPath} is missing (run npm run images:fetch)`,
    );
  }
  return image;
}

/**
 * Image key of a page's background photo (src/content/backgrounds.js), or
 * null when the page has none.
 * @example getBackground("home.hero")
 * @example getBackground("products/6-6kw-solar-system-wa")
 * @example getBackground(`posts/${post.slug}`)
 * @param {string} name A dotted path, or "products/<slug>" or "posts/<slug>".
 * @returns {string | null}
 */
export function getBackground(name) {
  /** @type {unknown} */
  let value = BACKGROUNDS;
  for (const part of name.includes("/") ? name.split("/") : name.split(".")) {
    value =
      value && typeof value === "object"
        ? /** @type {Record<string, unknown>} */ (value)[part]
        : undefined;
  }
  if (value === undefined) return null;
  if (typeof value !== "string")
    throw new Error(`Content error: background "${name}" is not an image key`);
  getImage(value); // Throws if the key is not in images.js.
  return value;
}

/**
 * Whether an item's own image is approved and downloaded. Cards show such
 * images (often with text baked in) without a tint or overlaid labels.
 * @param {string | null} image
 */
export function isOwnPhoto(image) {
  return Boolean(getApprovedImage(image));
}

/**
 * The photo for a card linking to a product or post: its own image once
 * approved, otherwise the background photo of the page it links to.
 * @param {string | null} image The item's own image key.
 * @param {string} background A getBackground() name, e.g. "posts/<slug>".
 * @returns {string | null}
 */
export function getCardPhoto(image, background) {
  return getApprovedImage(image) ? image : getBackground(background);
}

// ---------------------------------------------------------------- products

/** Validated once per server process. */
const products = PRODUCTS.map((p, i) => {
  assertProduct(p, i);
  assertImageKey(p.image, `products[${i}].image`);
  p.bodyImages.forEach((key, j) =>
    assertImageKey(key, `products[${i}].bodyImages[${j}]`),
  );
  if (p.banner) {
    assertImageKey(p.banner.desktop, `products[${i}].banner.desktop`);
    assertImageKey(p.banner.mobile, `products[${i}].banner.mobile`);
  }
  return p;
});

/** @returns {Product[]} All hubs and detail pages in content order. */
export function getAllProducts() {
  return products;
}

/**
 * Detail pages in one category (hubs excluded), in content order.
 * @param {ProductCategory} category
 * @returns {Product[]}
 */
export function getProductsByCategory(category) {
  if (!(category in CATEGORIES))
    throw new Error(`Content error: unknown category "${category}"`);
  return products.filter((p) => p.category === category && p.kind === "detail");
}

/**
 * The hub page for a category.
 * @param {ProductCategory} category
 * @returns {Product}
 */
export function getCategoryHub(category) {
  const hub = products.find((p) => p.category === category && p.kind === "hub");
  if (!hub)
    throw new Error(`Content error: no hub entry for category "${category}"`);
  return hub;
}

/**
 * A detail page by category and slug, or `null` if none exists (so a route
 * can call `notFound()`).
 * @param {ProductCategory} category
 * @param {string} slug
 * @returns {Product | null}
 */
export function getProduct(category, slug) {
  return (
    products.find(
      (p) => p.category === category && p.kind === "detail" && p.slug === slug,
    ) ?? null
  );
}

/**
 * Markdown body of a product or hub page.
 * @param {Product} product
 */
export function getProductBody(product) {
  return readContentFile(path.join("pages", product.bodyFile));
}

/**
 * Pages to suggest after a product: its siblings in the same category, or
 * (when a category has only one product) the other category hubs.
 * @param {Product} product
 * @param {number} [limit=3]
 * @returns {Product[]}
 */
export function getRelatedProducts(product, limit = 3) {
  const siblings = getProductsByCategory(product.category).filter(
    (p) => p.slug !== product.slug,
  );
  if (siblings.length >= 2) return siblings.slice(0, limit);
  const hubs = products.filter(
    (p) => p.kind === "hub" && p.category !== product.category,
  );
  return [...siblings, ...hubs].slice(0, limit);
}

/** @param {Product} product */
export function getProductPath(product) {
  return productPath(product);
}

// ---------------------------------------------------------------- posts

/** @returns {Post[]} */
function loadPosts() {
  const dir = path.join(CONTENT_DIR, "posts");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, body } = parseFrontmatter(
        readContentFile(path.join("posts", file)),
        `posts/${file}`,
      );
      assertPostFrontmatter(data, `posts/${file}`);
      assertImageKey(data.image, `posts/${file} image`);
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ""),
        ...data,
        body,
        // About 200 words a minute, rounded up.
        readingMinutes: Math.max(1, Math.ceil(words / 200)),
      };
    });
}

/** @type {Post[] | undefined} */
let postsCache;

/** @returns {Post[]} All posts, newest first. */
export function getAllPosts() {
  postsCache ??= loadPosts().sort((a, b) => b.date.localeCompare(a.date));
  return postsCache;
}

/**
 * @param {number} count
 * @returns {Post[]} The newest posts.
 */
export function getLatestPosts(count) {
  return getAllPosts().slice(0, count);
}

/**
 * @param {string} slug
 * @returns {Post | null} `null` if no post has this slug.
 */
export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/**
 * Other posts to read next: same category first, newest first.
 * @param {Post} post
 * @param {number} [limit=3]
 * @returns {Post[]}
 */
export function getRelatedPosts(post, limit = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

/** @param {Post} post */
export function getPostPath(post) {
  return postPath(post);
}

// ---------------------------------------------------------------- legal

/**
 * @param {"privacy-policy" | "terms-and-conditions"} slug
 * @returns {LegalPage}
 */
export function getLegalPage(slug) {
  const file = `legal/${slug}.md`;
  const { data, body } = parseFrontmatter(readContentFile(file), file);
  assertString(data.title, `${file} frontmatter "title"`);
  assertSeo(data.seo, file);
  return { slug, title: data.title, seo: data.seo, body };
}
