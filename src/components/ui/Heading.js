import { cn } from "@/lib/cn";

/** @typedef {"display" | "xl" | "lg" | "md" | "sm" | "xs"} HeadingSize */

/** @type {Record<HeadingSize, string>} */
const SIZES = {
  display: "font-display text-5xl font-bold tracking-tight",
  xl: "font-display text-4xl font-bold tracking-tight",
  lg: "font-display text-3xl font-semibold tracking-tight",
  md: "font-display text-2xl font-semibold",
  sm: "font-display text-xl font-semibold",
  xs: "font-sans text-lg font-semibold",
};

/** Default visual size for each level, used when `size` is not given. */
/** @type {Record<1 | 2 | 3 | 4 | 5 | 6, HeadingSize>} */
const DEFAULT_SIZE = { 1: "xl", 2: "lg", 3: "md", 4: "sm", 5: "xs", 6: "xs" };

/**
 * Heading whose semantic level and visual size are set separately, so the
 * document outline stays correct whatever the design needs.
 *
 * @example <Heading level={2} size="display">Big h2</Heading>
 *
 * @param {object} props
 * @param {1 | 2 | 3 | 4 | 5 | 6} [props.level=2] Renders `<h1>`–`<h6>`.
 * @param {HeadingSize} [props.size] Visual size. Defaults by level.
 * @param {string} [props.id] For `aria-labelledby` and anchor links.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Heading({ level = 2, size, id, className, children }) {
  const Tag = /** @type {"h1"} */ (`h${level}`);
  return (
    <Tag id={id} className={cn(SIZES[size ?? DEFAULT_SIZE[level]], className)}>
      {children}
    </Tag>
  );
}
