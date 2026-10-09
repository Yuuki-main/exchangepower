import "server-only";

import { Marked } from "marked";

/**
 * Markdown → HTML, on the server only. Pages are prerendered, so this runs at
 * build time and `marked` never reaches the browser bundle.
 *
 * The input is our own content from src/content/ (trusted), so raw HTML in
 * Markdown is allowed. Never pass user input to these functions.
 */
const marked = new Marked({ gfm: true, breaks: false, async: false });

/**
 * Renders a Markdown document (paragraphs, headings, lists).
 * @param {string} markdown
 * @returns {string} HTML
 */
export function renderMarkdown(markdown) {
  return /** @type {string} */ (marked.parse(markdown));
}

/**
 * Renders a single line of inline Markdown (bold, links) without a <p> wrapper.
 * Used for short strings in src/content/*.js.
 * @param {string} markdown
 * @returns {string} HTML
 */
export function renderInlineMarkdown(markdown) {
  return /** @type {string} */ (marked.parseInline(markdown));
}

/**
 * Turns heading text into a URL fragment: "8. Payment" → "8-payment".
 * @param {string} text
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Renders Markdown and gives every heading a stable id, returning the HTML
 * and the list of headings (for a table of contents).
 *
 * @example renderMarkdownWithHeadings(md, { idPrefix: "clause-" })
 *   // "## 8. Payment" → <h2 id="clause-8-payment">
 * @param {string} markdown
 * @param {{ idPrefix?: string }} [options]
 * @returns {{ html: string, headings: { id: string, text: string, level: number }[] }}
 */
export function renderMarkdownWithHeadings(markdown, { idPrefix = "" } = {}) {
  /** @type {{ id: string, text: string, level: number }[]} */
  const headings = [];
  const used = new Set();
  const instance = new Marked({
    gfm: true,
    async: false,
    renderer: {
      heading({ tokens, depth, text }) {
        const plain = text.replace(/[*_`]/g, "").trim();
        let id = `${idPrefix}${slugify(plain)}`;
        for (let n = 2; used.has(id); n++)
          id = `${idPrefix}${slugify(plain)}-${n}`;
        used.add(id);
        headings.push({ id, text: plain, level: depth });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = /** @type {string} */ (instance.parse(markdown));
  return { html, headings };
}
