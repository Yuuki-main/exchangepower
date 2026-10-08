import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ABOUT } from "@/content/about.js";
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
      return { slug: file.replace(/\.md$/, ""), ...data, body };
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
 * @param {string} slug
 * @returns {Post | null} `null` if no post has this slug.
 */
export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
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
