// Every public route and the text on its social card. Plain ESM (explicit
// ".js" imports, no Next.js or server-only), read by scripts/generate-og.mjs.
// Keep in step with src/app/sitemap.js: scripts/check-seo.mjs fails if a page's
// card is missing.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ABOUT } from "../content/about.js";
import { BLOG } from "../content/blog.js";
import { CONTACT, QUOTE_PAGE } from "../content/contact.js";
import { HOME } from "../content/home.js";
import { PRODUCTS } from "../content/products.js";
import { CATEGORIES, parseFrontmatter, productPath } from "./content-schema.js";

const CONTENT = path.resolve(import.meta.dirname, "../content");

/**
 * Frontmatter of every Markdown file in a content folder.
 * @param {string} dir
 * @returns {{ slug: string, title: string, category?: string }[]}
 */
const markdown = (dir) =>
  readdirSync(path.join(CONTENT, dir))
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = parseFrontmatter(
        readFileSync(path.join(CONTENT, dir, file), "utf8"),
        file,
      );
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        category: typeof data.category === "string" ? data.category : undefined,
      };
    });

/** @returns {{ path: string, title: string, eyebrow?: string }[]} */
export function ogRoutes() {
  const hubs = Object.fromEntries(
    PRODUCTS.filter((p) => p.kind === "hub").map((p) => [p.category, p.title]),
  );
  const legal = Object.fromEntries(
    markdown("legal").map((l) => [l.slug, /** @type {string} */ (l.title)]),
  );
  return [
    { path: "/", title: HOME.hero.title },
    { path: "/about-exchange-power/", eyebrow: "About us", title: ABOUT.title },
    { path: "/blog/", eyebrow: "Guides", title: BLOG.title },
    { path: "/contact/", eyebrow: CONTACT.eyebrow, title: CONTACT.title },
    {
      path: "/get-a-quote/",
      eyebrow: QUOTE_PAGE.eyebrow,
      title: QUOTE_PAGE.title,
    },
    {
      path: "/privacy-policy/",
      eyebrow: "Legal",
      title: legal["privacy-policy"],
    },
    {
      path: "/terms-and-conditions/",
      eyebrow: "Legal",
      title: legal["terms-and-conditions"],
    },
    ...PRODUCTS.map((p) => ({
      path: productPath(p),
      eyebrow:
        p.kind === "hub"
          ? "Exchange Power"
          : (hubs[p.category] ?? CATEGORIES[p.category].label),
      title: p.title,
    })),
    ...markdown("posts").map((post) => ({
      path: `/${post.slug}/`,
      eyebrow: `Guide · ${post.category}`,
      title: post.title,
    })),
  ];
}
