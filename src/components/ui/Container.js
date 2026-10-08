import { cn } from "@/lib/cn";

/** @type {Record<"content" | "reading" | "full", string>} */
const SIZES = {
  content: "max-w-content",
  reading: "max-w-reading",
  full: "max-w-none",
};

/**
 * Centres content with the site's max width and responsive side gutters.
 *
 * @param {object} props
 * @param {"content" | "reading" | "full"} [props.size="content"] Max width:
 *   `content` (76rem, page layout), `reading` (42rem, comfortable line length), `full` (no limit).
 * @param {React.ElementType} [props.as="div"] Element to render.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Container({
  size = "content",
  as: Tag = "div",
  className,
  children,
}) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", SIZES[size], className)}>
      {children}
    </Tag>
  );
}
