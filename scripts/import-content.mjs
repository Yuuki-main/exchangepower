// One-off importer: turns the live site's HTML (downloaded by
// `npm run content:download` into .cache/source-html/) into the content files
// in src/content/. Copy is kept word for word; only markup is cleaned.
//
//   npm run content:import            -> writes files that don't exist yet
//   npm run content:import -- --force -> overwrites (loses hand edits!)
//
// After the first import, src/content/ is edited by hand. Run with --force
// only to start again from the live site.
//
// Image dimensions come from <img width/height>. When those are missing, the
// script reads only the first bytes of the file into memory to parse its
// header. No image is saved to disk (scripts/fetch-images.mjs does that).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";
import TurndownService from "turndown";
import { SOURCE_PAGES, sourceFile } from "./source-pages.mjs";
import {
  CATEGORIES,
  productPath,
  stringifyFrontmatter,
} from "../src/lib/content-schema.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "src/content");
const FORCE = process.argv.includes("--force");
const SITE = /^https?:\/\/(www\.)?exchangepower\.com\.au/i;

/** @type {string[]} */
const written = [];
/** @type {string[]} */
const skipped = [];

/** @param {string} rel @param {string} contents */
function write(rel, contents) {
  const file = path.join(CONTENT, rel);
  if (existsSync(file) && !FORCE) {
    skipped.push(rel);
    return;
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents);
  written.push(rel);
}

// ---------------------------------------------------------------- helpers

/** Collapses whitespace and trims. node-html-parser's `.text` decodes entities. */
const clean = (/** @type {string} */ s) => s.replace(/\s+/g, " ").trim();

/** @param {import("node-html-parser").HTMLElement | null | undefined} el */
const text = (el) => (el ? clean(el.text) : "");

/**
 * Live URL → relative path ending in "/" (hash and query kept).
 * External URLs, tel: and mailto: are returned unchanged.
 * @param {string} href
 */
export function toRelative(href) {
  const raw = href.trim();
  if (/^(mailto:|tel:|#|javascript:)/i.test(raw)) return raw;
  if (/^https?:/i.test(raw) && !SITE.test(raw)) return raw;
  const url = new URL(raw.replace(SITE, ""), "https://exchangepower.com.au");
  let p = url.pathname.replace(/\/{2,}/g, "/");
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return p + url.search + url.hash;
}

/** @param {string} file */
function load(file) {
  return parse(readFileSync(file, "utf8"), {
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true },
  });
}

/** @param {import("node-html-parser").HTMLElement} root */
function seoOf(root) {
  const title = clean(root.querySelector("title")?.text ?? "");
  const descriptions = root
    .querySelectorAll('meta[name="description"]')
    .map((m) => clean(m.getAttribute("content") ?? ""))
    .filter(Boolean);
  // The theme prints an empty description and Rank Math prints the real one.
  return { title, description: descriptions.at(-1) ?? "" };
}

// Turndown: HTML → Markdown, with WordPress leftovers removed.
const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  emDelimiter: "_",
  strongDelimiter: "**",
});
turndown.remove(["script", "style", "noscript", "img", "iframe", "form"]);
turndown.addRule("internal-links", {
  filter: (node) => node.nodeName === "A" && !!node.getAttribute("href"),
  replacement: (content, node) => {
    const href = toRelative(
      /** @type {HTMLElement} */ (node).getAttribute("href") ?? "",
    );
    const label = content.trim();
    return label ? `[${label}](${href})` : "";
  },
});

/**
 * Cleans a content container and converts it to Markdown.
 * @param {import("node-html-parser").HTMLElement} el
 */
function toMarkdown(el) {
  const copy = parse(el.outerHTML);
  // Drop WordPress/theme leftovers.
  // Images are tracked in images.js (bodyImages / featured image), never inlined.
  copy
    .querySelectorAll(".commentsWrapper, .nocomments, script, style, img")
    .forEach((n) => n.remove());
  copy.querySelectorAll("*").forEach((n) => {
    n.removeAttribute("style");
    n.removeAttribute("class");
  });
  // Unwrap tool-generated spans (e.g. AI highlighter markup in FAQ answers).
  copy.querySelectorAll("span").forEach((n) => n.replaceWith(n.innerHTML));
  // Remove empty paragraphs and headings.
  copy
    .querySelectorAll("p, h1, h2, h3, h4, h5, h6, strong, em")
    .forEach((n) => {
      if (!clean(n.text) && !n.querySelector("img")) n.remove();
    });
  // Strip WordPress [shortcodes] from the HTML text, before Markdown exists,
  // so Markdown link labels can never be mistaken for shortcodes.
  const html = copy.innerHTML
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/\[\/?[a-z][\w-]*(?:\s[^\]<>]*)?\](?!\()/gi, "");
  let md = turndown.turndown(html);
  md = md.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

/** "June 18, 2026" → "2026-06-18" */
function isoDate(/** @type {string} */ s) {
  const d = new Date(`${s} 12:00 UTC`);
  if (Number.isNaN(d.getTime())) throw new Error(`Bad date: ${s}`);
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------- images

/** @type {Map<string, { key: string, src: string, localPath: string, alt: string, width: number, height: number }>} */
const images = new Map();

/** Brand logos have no alt text on the live site; names checked by eye. */
const BRAND_NAMES = {
  partner2: "Trina Solar",
  partner3: "Seraphim",
  partner4: "Growatt",
  partner5: "Solis",
  partner6: "Neovolt",
  partner7: "Jinko Solar",
  partner8: "Fronius",
  partner9: "Sofar",
};

/**
 * Registers an image and returns its key. Same URL → same key.
 * @param {string} src
 * @param {{ group: string, alt?: string, width?: string | number | null, height?: string | number | null, key?: string }} opts
 */
function registerImage(src, { group, alt = "", width, height, key }) {
  const url = new URL(src, "https://exchangepower.com.au").href;
  const existing = images.get(url);
  if (existing) {
    if (!existing.alt && alt) existing.alt = alt;
    return existing.key;
  }
  const base = path.basename(new URL(url).pathname);
  const stem = base.replace(/\.[a-z0-9]+$/i, "");
  const finalKey =
    key ??
    `${group}-${stem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`;
  images.set(url, {
    key: finalKey,
    src: url,
    localPath: `/images/${group}/${base}`,
    alt: clean(alt),
    width: Number(width) || 0,
    height: Number(height) || 0,
  });
  return finalKey;
}

/** @param {import("node-html-parser").HTMLElement | null | undefined} img @param {string} group @param {string} [key] */
function registerImg(img, group, key) {
  const src = img?.getAttribute("src");
  if (!img || !src || src.startsWith("data:")) return null;
  return registerImage(src, {
    group,
    key,
    alt: img.getAttribute("alt") ?? "",
    width: img.getAttribute("width"),
    height: img.getAttribute("height"),
  });
}

/** Reads the first bytes of an image and returns its size, without saving it. */
async function probeSize(/** @type {string} */ url) {
  for (const bytes of [65535, 524287]) {
    const res = await fetch(url, {
      headers: { Range: `bytes=0-${bytes}`, "User-Agent": "Mozilla/5.0" },
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const size = sizeFromBuffer(buf);
    if (size) return size;
  }
  return null;
}

/** @param {Buffer} b @returns {{ width: number, height: number } | null} */
function sizeFromBuffer(b) {
  // PNG
  if (b.readUInt32BE(0) === 0x89504e47)
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  // WebP
  if (
    b.toString("ascii", 0, 4) === "RIFF" &&
    b.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8X")
      return {
        width: 1 + b.readUIntLE(24, 3),
        height: 1 + b.readUIntLE(27, 3),
      };
    if (chunk === "VP8 ")
      return {
        width: b.readUInt16LE(26) & 0x3fff,
        height: b.readUInt16LE(28) & 0x3fff,
      };
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return {
        width: 1 + (bits & 0x3fff),
        height: 1 + ((bits >> 14) & 0x3fff),
      };
    }
  }
  // JPEG: scan for a SOF marker
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) return null;
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        ![0xc4, 0xc8, 0xcc].includes(marker)
      ) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
    return null;
  }
  // SVG
  const head = b.toString("utf8", 0, Math.min(b.length, 4000));
  if (head.includes("<svg")) {
    const tag = head.slice(
      head.indexOf("<svg"),
      head.indexOf(">", head.indexOf("<svg")),
    );
    const w = tag.match(/\swidth="([\d.]+)/)?.[1];
    const h = tag.match(/\sheight="([\d.]+)/)?.[1];
    if (w && h)
      return { width: Math.round(Number(w)), height: Math.round(Number(h)) };
    const vb = tag.match(
      /viewBox="[\d.\-]+[ ,]+[\d.\-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/,
    );
    if (vb)
      return {
        width: Math.round(Number(vb[1])),
        height: Math.round(Number(vb[2])),
      };
  }
  return null;
}

// ---------------------------------------------------------------- pages

const pageByPath = new Map(
  SOURCE_PAGES.map((p) => [p.path, { ...p, root: load(sourceFile(p)) }]),
);
const getPage = (/** @type {string} */ p) => {
  const page = pageByPath.get(p);
  if (!page) throw new Error(`No source page for ${p}`);
  return page;
};

/**
 * All content sections after the page hero, in page order (skips banners,
 * FAQ, card grids and sections without paragraphs).
 * @param {import("node-html-parser").HTMLElement} root
 */
function bodySections(root) {
  return root
    .querySelectorAll("section")
    .filter(
      (s) =>
        !/\b(innerhero|heroIMages|section-faq)\b/.test(
          s.getAttribute("class") ?? "",
        ) &&
        s.querySelectorAll("p").length > 0 &&
        !s.querySelector(".card-products"),
    );
}

/** Product card data from a card grid: link → { image, highlights }. */
/** @type {Map<string, { image: string | null, highlights: string[] }>} */
const cards = new Map();
function collectCards(
  /** @type {import("node-html-parser").HTMLElement} */ root,
) {
  for (const card of root.querySelectorAll(".card-products")) {
    const href = card
      .querySelector(".card-footer a[href]")
      ?.getAttribute("href");
    if (!href) continue;
    const link = toRelative(href);
    if (cards.has(link)) continue;
    cards.set(link, {
      image: registerImg(card.querySelector(".imgBox img"), "products"),
      highlights: card.querySelectorAll(".description li").map(text),
    });
  }
}

// Card grids live on the homepage and the four hubs.
collectCards(getPage("/").root);
for (const p of SOURCE_PAGES.filter((s) => s.kind === "hub"))
  collectCards(getPage(p.path).root);

// --- Products (hubs + details)
/** @type {object[]} */
const products = [];
for (const src of SOURCE_PAGES.filter(
  (s) => s.kind === "hub" || s.kind === "detail",
)) {
  const { root } = getPage(src.path);
  const category = /** @type {keyof typeof CATEGORIES} */ (src.category);
  const kind = /** @type {"hub" | "detail"} */ (src.kind);
  const slug =
    kind === "hub"
      ? CATEGORIES[category].base
      : (src.path.split("/").filter(Boolean).at(-1) ?? "");
  const sections = bodySections(root);
  if (!sections.length) throw new Error(`No body section on ${src.path}`);
  const bodyFile = `${slug}.md`;
  // Some pages have an image beside the copy (e.g. battery rebates). Track it.
  const bodyImages = sections
    .flatMap((section) => section.querySelectorAll("img"))
    .map((img) => registerImg(img, "products"))
    .filter(Boolean);
  write(
    `pages/${bodyFile}`,
    `${sections.map((section) => toMarkdown(section)).join("\n\n")}\n`,
  );

  const faqs = root
    .querySelectorAll(".section-faq .faq-accordion > li")
    .map((li) => ({
      question: text(li.querySelector("h4")),
      answer: toMarkdown(
        /** @type {import("node-html-parser").HTMLElement} */ (
          li.querySelector(".content")
        ),
      ),
    }));

  const banner = root.querySelector("section.heroIMages");
  const card = cards.get(productPath({ slug, category, kind }));
  const seo = seoOf(root);

  products.push({
    slug,
    category,
    kind,
    title: text(root.querySelector("section.innerhero h1")),
    summary: seo.description,
    image: card?.image ?? null,
    banner: banner
      ? {
          desktop: registerImg(
            banner.querySelector(".heroBanner img"),
            "banners",
          ),
          mobile: registerImg(
            banner.querySelector(".mobBanner img"),
            "banners",
          ),
        }
      : null,
    highlights: card?.highlights ?? [],
    bodyImages,
    seo,
    faqs,
    bodyFile,
    bodyHiddenOnLive: sections.every((section) =>
      /\bd-none\b/.test(section.getAttribute("class") ?? ""),
    ),
  });
}

// --- Blog posts
const blogIndex = getPage("/blog/").root;
/** @type {Map<string, string>} excerpt by path */
const excerpts = new Map();
for (const card of blogIndex.querySelectorAll("h3")) {
  const link =
    card.closest("a") ??
    card.parentNode?.parentNode?.querySelector?.("a[href]");
  const container = card.parentNode;
  const excerpt = text(container?.querySelector("p"));
  const href =
    container?.parentNode?.querySelector("a[href]")?.getAttribute("href") ??
    link?.getAttribute("href");
  if (href && excerpt) excerpts.set(toRelative(href), excerpt);
}

const posts = [];
for (const src of SOURCE_PAGES.filter((s) => s.kind === "post")) {
  const { root } = getPage(src.path);
  const slug = src.path.replaceAll("/", "");
  const hero = root.querySelector("section.innerhero");
  const meta = text(hero?.querySelector("p")); // "Exchange Power | June 18, 2026"
  const detail = root.querySelector(".blogDetail");
  if (!detail) throw new Error(`No .blogDetail on ${src.path}`);
  const featured = detail.querySelector("img");
  const imageKey = registerImg(featured, "blog", `post-${slug}`);
  featured?.remove();
  const inline = detail.querySelectorAll("img").length;
  if (inline)
    console.warn(`! ${src.path} has ${inline} inline image(s) inside the body`);
  const data = {
    title: text(hero?.querySelector("h1")),
    date: isoDate(meta.split("|").at(-1)?.trim() ?? ""),
    category: text(hero?.querySelector("a.catLink")),
    image: imageKey,
    excerpt: excerpts.get(src.path) ?? "",
    seo: seoOf(root),
  };
  write(`posts/${slug}.md`, stringifyFrontmatter(data, toMarkdown(detail)));
  posts.push({ slug, ...data });
}

// --- Legal pages
for (const src of SOURCE_PAGES.filter((s) => s.kind === "legal")) {
  const { root } = getPage(src.path);
  const slug = src.path.replaceAll("/", "");
  const container = root.querySelector("section.section-content .bigTxt");
  if (!container) throw new Error(`No content on ${src.path}`);
  const title = text(root.querySelector("section.innerhero h1"));
  let body;
  if (slug === "terms-and-conditions") {
    // Each clause is one <p> with <br> line breaks. Clause titles ("1. Agreement")
    // become headings; every other line becomes its own paragraph.
    const blocks = [];
    for (const p of container.querySelectorAll("p")) {
      const lines = p.innerHTML
        .split(/<br\s*\/?>/i)
        .map((l) => clean(parse(l).text))
        .filter(Boolean);
      for (const line of lines) {
        if (line === "TERMS AND CONDITIONS") continue; // duplicates the page H1
        if (/^\d{1,2}\.\s+\D/.test(line) && line.length < 90)
          blocks.push(`## ${line}`);
        else blocks.push(turndown.escape(line));
      }
    }
    body = blocks.join("\n\n");
  } else {
    // Privacy: <br>-separated lines are list items in meaning; keep them as lines.
    const copy = parse(container.outerHTML);
    copy.querySelectorAll("p").forEach((p) => {
      if (/<br\s*\/?>/i.test(p.innerHTML)) {
        const items = p.innerHTML
          .split(/<br\s*\/?>/i)
          .map((l) => `<li>${l}</li>`);
        p.replaceWith(`<ul>${items.join("")}</ul>`);
      }
    });
    body = toMarkdown(copy).replace(
      /^\*\*Exchange Power’s Privacy Policy\*\*\n\n/,
      "## Exchange Power’s Privacy Policy\n\n",
    );
  }
  write(
    `legal/${slug}.md`,
    stringifyFrontmatter({ title, seo: seoOf(root) }, body),
  );
}

// --- Homepage
const home = getPage("/").root;
const heroSlide = home.querySelector("section.hero .swiper-slide");
const usp = home.querySelector("section.hero .usp");
const services = home.querySelector("section.section-services");
const productsIntro = home.querySelector("section.section-products .heading");
const productTabs = home.querySelector("section.section-products.gradientBg");
const why = home.querySelector("section.section-why");
const reviews = home.querySelector("section.section-reviews");
const blogTeaser = home.querySelector(".section-blog");
const brands = home.querySelector("section.section-brands");

const homeData = {
  seo: seoOf(home),
  hero: {
    title: text(heroSlide?.querySelector("h1")),
    subtitle: text(heroSlide?.querySelector("h1")?.nextElementSibling),
    image: registerImg(heroSlide?.querySelector("img"), "home", "home-hero"),
    ctaLabel: text(heroSlide?.querySelector("a.btn")),
  },
  stats: {
    title: text(usp?.querySelector("h3")),
  },
  services: {
    title: text(services?.querySelector("h2")),
    subtitle: text(services?.querySelector("h3")),
    tabs: (services?.querySelectorAll(".dataTabs li") ?? []).map((li, i) => {
      const panel = services?.querySelectorAll(".dataTab-wrapper")[i];
      const label = text(li);
      const category = label.toLowerCase().startsWith("res")
        ? "residential"
        : "commercial";
      return {
        label,
        image: registerImg(
          panel?.querySelector("img"),
          "home",
          `home-${category}`,
        ),
        paragraphs: (panel?.querySelectorAll("p") ?? [])
          .map((p) => toMarkdown(p))
          .filter(Boolean),
        cta: {
          label: text(panel?.querySelector("a.btn, a")),
          // Live site: Commercial "Learn More" points to the homepage (bug). Fixed here.
          href: `/${CATEGORIES[category].base}/`,
        },
      };
    }),
  },
  packages: {
    title: text(productsIntro?.querySelector("h2")),
    subtitle: text(productsIntro?.querySelector("h3")),
    tabs: (productTabs?.querySelectorAll(".dataTabs li") ?? []).map(
      (li, i) => ({
        label: text(li),
        items: (
          productTabs
            ?.querySelectorAll(".dataTab-wrapper")
            [i]?.querySelectorAll(".card-footer a[href]") ?? []
        )
          .map((a) => toRelative(a.getAttribute("href") ?? ""))
          .filter(
            (href, idx, all) =>
              href.startsWith("/") && href !== "/" && all.indexOf(href) === idx,
          ),
      }),
    ),
  },
  why: {
    title: text(why?.querySelector("h2")),
    image: registerImg(why?.querySelector(".fl img"), "home", "home-why"),
    items: (why?.querySelectorAll(".whyBoxes .card-why") ?? []).map((card) => ({
      title: text(card.querySelector("h3")),
      text: text(card.querySelector(".contentBox")),
    })),
  },
  reviews: {
    title: text(reviews?.querySelector("h3")),
    ratingText: text(reviews?.querySelector(".reviewPills")),
    text: text(reviews?.querySelector(".col-auto:last-child div")),
    hiddenOnLive: /\bd-none\b/.test(reviews?.getAttribute("class") ?? ""),
  },
  blog: {
    title: text(blogTeaser?.querySelector(".col")),
    ctaLabel: "Read all blogs",
  },
  brands: {
    title: clean(text(brands?.querySelector("h2"))),
    items: (brands?.querySelectorAll("img") ?? []).map((img) => {
      const name = path
        .basename(img.getAttribute("src") ?? "")
        .replace(/\.\w+$/, "");
      const brand = BRAND_NAMES[/** @type {keyof typeof BRAND_NAMES} */ (name)];
      if (!brand) throw new Error(`Unknown brand logo ${name}`);
      return registerImage(img.getAttribute("src") ?? "", {
        group: "brands",
        key: `brand-${brand.toLowerCase().replace(/\s+/g, "-")}`,
        alt: brand,
        width: img.getAttribute("width"),
        height: img.getAttribute("height"),
      });
    }),
  },
};

// --- About
const about = getPage("/about-exchange-power/").root;
const aboutParas = about.querySelectorAll(
  "section.section-content .bigTxt > p",
);
const whyIndex = aboutParas.findIndex(
  (p) => text(p) === "Why Choose Exchange Power?",
);
const aboutData = {
  seo: seoOf(about),
  title: text(about.querySelector("section.innerhero h1")),
  subtitle: text(about.querySelector("section.innerhero h4")),
  intro: aboutParas.slice(0, whyIndex).map((p) => toMarkdown(p)),
  why: {
    title: text(aboutParas[whyIndex]),
    intro: toMarkdown(aboutParas[whyIndex + 1]),
    items: aboutParas.slice(whyIndex + 2).map((p) => {
      const title = text(p.querySelector("strong"));
      p.querySelector("strong")?.remove();
      return { title, text: toMarkdown(p) };
    }),
  },
  statsTitle: text(
    about.querySelectorAll("section.innerhero")[1]?.querySelector("h3"),
  ),
  // Kept exactly as live, including the swapped Vision/Mission text (see docs/CONTENT-NOTES.md).
  visionMission: about
    .querySelectorAll("section.section-price .card")
    .map((card) => ({
      title: text(card.querySelector("h3")),
      text: text(card.querySelector("p")),
    })),
};

// --- Site-wide images (logo, badge)
const header = home.querySelector("header");
registerImg(header?.querySelector("a.logo img"), "site", "logo");
registerImage(
  "https://exchangepower.com.au/wp-content/themes/exchangepower/assets/images/netcc-logo-approved-seller.png",
  {
    group: "site",
    key: "netcc-badge",
    alt: "New Energy Tech Consumer Code Approved Seller",
  },
);

// --- Probe missing image sizes (header bytes only, in memory)
for (const img of images.values()) {
  if (img.width && img.height) continue;
  const size = await probeSize(img.src);
  if (size) Object.assign(img, size);
  else console.warn(`! Could not read size of ${img.src}`);
}

// ---------------------------------------------------------------- write JS

const header_ = (/** @type {string} */ what) =>
  `// ${what}\n// Imported from the live site by scripts/import-content.mjs, then edited by hand.\n// Copy is verbatim; see docs/CONTENT-NOTES.md for suggested fixes.\n\n`;

const imageEntries = Object.fromEntries(
  [...images.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ key, ...rest }) => [key, rest]),
);

write(
  "images.js",
  `${header_("Image registry. Not downloaded yet: run `npm run images:fetch` once approved (PLAN.md Part C item 7).")}/** @type {Record<string, import("../lib/content-schema.js").ImageAsset>} */\nexport const IMAGES = ${JSON.stringify(imageEntries, null, 2)};\n`,
);
write(
  "products.js",
  `${header_("Product, service and category hub pages.")}/** @type {import("../lib/content-schema.js").Product[]} */\nexport const PRODUCTS = ${JSON.stringify(products, null, 2)};\n`,
);
// The live homepage copy is archived for reference. The new homepage content
// (src/content/home.js) is written by hand and never overwritten.
write(
  "archive/home-live.js",
  `${header_("ARCHIVE: the live homepage copy, imported verbatim (not used by the app).")}export const HOME_LIVE = ${JSON.stringify(homeData, null, 2)};\n`,
);
write(
  "about.js",
  `${header_("About page copy (PLAN.md A5). Strings in `intro` and `text` are inline Markdown.")}export const ABOUT = ${JSON.stringify(aboutData, null, 2)};\n`,
);
write(
  "blog.js",
  `${header_("Blog index page.")}export const BLOG = ${JSON.stringify({ title: text(blogIndex.querySelector("section.innerhero h1")), seo: seoOf(blogIndex) }, null, 2)};\n`,
);

console.log(
  `\nProducts: ${products.length}  Posts: ${posts.length}  FAQs: ${products.reduce((n, p) => n + /** @type {any} */ (p).faqs.length, 0)}  Images: ${images.size}`,
);
console.log(
  `Written: ${written.length} files${skipped.length ? `, skipped (exist, use --force): ${skipped.length}` : ""}`,
);
