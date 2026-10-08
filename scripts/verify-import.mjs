// Compares imported content with the live HTML, word for word.
//
//   npm run content:verify
//
// For every page, the visible text of the live content sections is compared
// with our Markdown rendered back to text. Reports any difference.
// Needs .cache/source-html/ (npm run content:download).

import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { parse } from "node-html-parser";
import { PRODUCTS } from "../src/content/products.js";
import { parseFrontmatter } from "../src/lib/content-schema.js";
import { SOURCE_PAGES, sourceFile } from "./source-pages.mjs";

const CONTENT = path.resolve(import.meta.dirname, "../src/content");

/** Normalises text for comparison: decode, unify whitespace and quotes. */
function words(/** @type {string} */ s) {
  return s
    .replace(/ /g, " ")
    .replace(/\\([\\`*_{}\[\]()#+\-.!>])/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** @param {string} md */
const mdText = (md) => parse(/** @type {string} */ (marked.parse(md))).text;

/** @param {string[]} a @param {string[]} b */
function firstDiff(a, b) {
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return i;
  return -1;
}

const results = [];

/** @param {string} label @param {string} live @param {string} ours */
function compare(label, live, ours) {
  const a = words(live);
  const b = words(ours);
  const i = firstDiff(a, b);
  results.push({
    label,
    liveWords: a.length,
    ourWords: b.length,
    ok: i === -1,
  });
  if (i !== -1) {
    console.log(`DIFF  ${label} at word ${i}`);
    console.log(`  live: …${a.slice(Math.max(0, i - 6), i + 8).join(" ")}`);
    console.log(`  ours: …${b.slice(Math.max(0, i - 6), i + 8).join(" ")}`);
  }
}

const load = (/** @type {import("./source-pages.mjs").SourcePage} */ p) =>
  parse(readFileSync(sourceFile(p), "utf8"), {
    comment: false,
    blockTextElements: { script: true, style: true },
  });

for (const page of SOURCE_PAGES) {
  const root = load(page);
  if (page.kind === "hub" || page.kind === "detail") {
    const slug =
      page.kind === "hub"
        ? page.path.split("/")[1]
        : page.path.split("/").filter(Boolean).at(-1);
    const product = PRODUCTS.find(
      (p) => p.slug === slug && p.kind === page.kind,
    );
    if (!product) continue;
    const liveBody = root
      .querySelectorAll("section")
      .filter(
        (s) =>
          !/\b(innerhero|heroIMages|section-faq)\b/.test(
            s.getAttribute("class") ?? "",
          ) &&
          s.querySelectorAll("p").length > 0 &&
          !s.querySelector(".card-products"),
      )
      .map((s) => s.text)
      .join(" ");
    compare(
      `${page.path} body`,
      liveBody,
      mdText(
        readFileSync(path.join(CONTENT, "pages", product.bodyFile), "utf8"),
      ),
    );
    const liveFaqs = root.querySelectorAll(".section-faq .faq-accordion > li");
    compare(
      `${page.path} FAQs (${liveFaqs.length} live / ${product.faqs.length} ours)`,
      liveFaqs.map((li) => li.text).join(" "),
      product.faqs.map((f) => `${f.question} ${mdText(f.answer)}`).join(" "),
    );
  } else if (page.kind === "post") {
    const detail = root.querySelector(".blogDetail");
    detail?.querySelectorAll(".commentsWrapper").forEach((n) => n.remove());
    const slug = page.path.replaceAll("/", "");
    const { body } = parseFrontmatter(
      readFileSync(path.join(CONTENT, "posts", `${slug}.md`), "utf8"),
      slug,
    );
    compare(`${page.path} body`, detail?.text ?? "", mdText(body));
  } else if (page.kind === "legal") {
    const slug = page.path.replaceAll("/", "");
    const { body } = parseFrontmatter(
      readFileSync(path.join(CONTENT, "legal", `${slug}.md`), "utf8"),
      slug,
    );
    let live =
      root.querySelector("section.section-content .bigTxt")?.text ?? "";
    if (slug === "terms-and-conditions")
      live = live.replace(/^\s*TERMS AND CONDITIONS/, ""); // dropped: duplicates the H1
    compare(`${page.path} body`, live, mdText(body));
  }
}

const failed = results.filter((r) => !r.ok);
console.log(
  `\n${results.length - failed.length}/${results.length} blocks match the live site word for word.`,
);
if (failed.length) process.exit(1);
