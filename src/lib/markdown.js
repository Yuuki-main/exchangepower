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
