import { cn } from "@/lib/cn";

/**
 * Styles server-rendered Markdown HTML (paragraphs, headings, lists, links,
 * tables) with the design tokens. The styles live in globals.css under
 * `.prose-content`; no typography plugin is needed for this small set.
 *
 * Only pass HTML produced from our own content (src/lib/markdown.js).
 *
 * @param {object} props
 * @param {string} props.html
 * @param {string} [props.className]
 */
export function Prose({ html, className }) {
  return (
    <div
      className={cn("prose-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
