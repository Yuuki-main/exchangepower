// Checks every internal link in the built site.
//
//   npm run build && npm run check:links
//
// Reads every prerendered page in .next/server/app, collects each internal
// href, and fails if a link points to a page that doesn't exist (and isn't a
// planned redirect or a file in public/), or to an #anchor that isn't on
// the target page.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { REDIRECTS } from "../src/lib/content-schema.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP = path.join(ROOT, ".next/server/app");
const PUBLIC_DIR = path.join(ROOT, "public");

if (!existsSync(APP)) {
  console.error("No build output found. Run `npm run build` first.");
  process.exit(1);
}

/** @param {string} dir @returns {string[]} */
function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

/** Route path for a prerendered file: index.html → "/", blog.html → "/blog/". */
/** @param {string} file */
function routeOf(file) {
  const rel = path.relative(APP, file).replace(/\.html$/, "");
  if (rel === "index") return "/";
  return `/${rel}/`;
}

// Internal-only pages that are not part of the public site.
const IGNORED = new Set(["/_not-found/", "/_global-error/"]);

/** @type {Map<string, string>} route → HTML */
const pages = new Map();
for (const file of htmlFiles(APP)) {
  const route = routeOf(file);
  if (route.includes("[") || IGNORED.has(route)) continue; // fallback shells
  pages.set(route, readFileSync(file, "utf8"));
}

/** @param {string} html */
const idsIn = (html) =>
  new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const ids = new Map([...pages].map(([route, html]) => [route, idsIn(html)]));

/** @type {string[]} */
const errors = [];
let checked = 0;

for (const [page, html] of pages) {
  // Only links in the visible document, not the RSC payload in <script> tags.
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, "");
  for (const [, href] of visible.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (
      /^(https?:|mailto:|tel:|sms:|javascript:)/.test(href) ||
      href.startsWith("/_next/")
    )
      continue;
    checked++;
    const [rawPath, hash = ""] = href.split("#");
    const target = rawPath === "" ? page : rawPath.split("?")[0];

    if (target !== page && !pages.has(target)) {
      if (target in REDIRECTS) continue; // planned 308
      if (
        /\.[a-z0-9]+$/i.test(target) &&
        existsSync(path.join(PUBLIC_DIR, target))
      )
        continue;
      errors.push(`${page} → ${href}: no such page`);
      continue;
    }
    if (hash && !ids.get(target)?.has(decodeURIComponent(hash))) {
      errors.push(
        `${page} → ${href}: no element with id "${hash}" on ${target}`,
      );
    }
  }
}

console.log(`Checked ${checked} internal links on ${pages.size} pages.`);
for (const e of errors) console.log(`ERROR  ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} broken link(s).`);
  process.exit(1);
}
console.log("All internal links resolve.");
