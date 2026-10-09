// URL parity: every URL in the live site's sitemaps must work on the new site.
//
//   npm run build && npm run start      (in one terminal)
//   npm run check:parity                (BASE_URL=http://localhost:3000 by default)
//
// Reads the live sitemap index and its child sitemaps with plain GET requests
// (read-only; nothing is submitted to the live site). For each old URL it
// checks, on the new build:
//   - the URL as listed (with trailing slash): 200, or a planned 308 redirect
//     (PLAN.md Step 6) that ends at a 200 page
//   - the same URL without its trailing slash: resolves (via 308) to a 200 page
// Fails if any URL doesn't resolve.

import { REDIRECTS } from "../src/lib/content-schema.js";

const BASE = (
  process.env.BASE_URL ??
  process.argv[2] ??
  "http://localhost:3000"
).replace(/\/$/, "");
const LIVE = "https://exchangepower.com.au";
const UA = { "User-Agent": "exchangepower-new parity check (read-only)" };

/** @param {string} url */
async function liveLocs(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
}

/** Follows redirects (max 5) on the new build; returns the hops and final status. */
async function resolve(/** @type {string} */ path) {
  /** @type {string[]} */
  const hops = [];
  let current = path;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(BASE + current, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const location = new URL(
        res.headers.get("location") ?? "/",
        BASE + current,
      );
      hops.push(`${res.status}→${location.pathname}`);
      current = location.pathname + location.search;
      continue;
    }
    return { status: res.status, final: current, hops };
  }
  return { status: 0, final: current, hops: [...hops, "too many redirects"] };
}

const index = await liveLocs(`${LIVE}/sitemap_index.xml`);
const children = index.filter((u) => u.endsWith(".xml"));
/** @type {Set<string>} */
const urls = new Set();
for (const child of children) {
  for (const loc of await liveLocs(child)) {
    // Page URLs only (skip images, KML and other files listed in some sitemaps).
    if (
      loc.startsWith(LIVE) &&
      !/\.(xml|kml|jpe?g|png|webp|gif|pdf)$/i.test(loc)
    )
      urls.add(loc);
  }
}

const rows = [];
let failures = 0;
for (const url of [...urls].sort()) {
  const path = new URL(url).pathname;
  const asListed = await resolve(path);
  const planned = path in REDIRECTS;
  const listedOk =
    asListed.status === 200 &&
    (asListed.hops.length === 0 ||
      (planned &&
        asListed.final ===
          REDIRECTS[/** @type {keyof typeof REDIRECTS} */ (path)]));
  const noSlashPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const noSlash = await resolve(noSlashPath);
  const noSlashOk = noSlash.status === 200;
  const ok = listedOk && noSlashOk;
  if (!ok) failures++;
  rows.push({
    path,
    listed: asListed.hops.length
      ? `${asListed.hops.join(" ")} → ${asListed.status}`
      : String(asListed.status),
    noSlash:
      noSlashPath === path
        ? "(same)"
        : `${noSlash.hops.join(" ")} → ${noSlash.status}`,
    result: ok ? "OK" : "FAIL",
  });
}

console.log(
  `Live sitemaps: ${children.length} (${children.map((c) => c.replace(LIVE + "/", "")).join(", ")})`,
);
console.log(`Old URLs checked: ${rows.length} against ${BASE}\n`);
console.log("| Old URL | As listed | Without trailing slash | Result |");
console.log("|---|---|---|---|");
for (const r of rows)
  console.log(`| \`${r.path}\` | ${r.listed} | ${r.noSlash} | ${r.result} |`);
if (failures) {
  console.log(`\n${failures} URL(s) do not resolve.`);
  process.exit(1);
}
console.log(`\nAll ${rows.length} old URLs resolve.`);
