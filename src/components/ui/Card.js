import { cn } from "@/lib/cn";

/** @type {Record<"elevated" | "outline" | "muted" | "inverse", string>} */
const VARIANTS = {
  elevated: "bg-background text-foreground shadow-md",
  outline: "bg-background text-foreground border border-border",
  muted: "bg-surface-muted text-foreground",
  inverse:
    "bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]",
};

/** @type {Record<"none" | "sm" | "md" | "lg", string>} */
const PADDING = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

/**
 * A rounded content panel.
 *
 * @param {object} props
 * @param {"elevated" | "outline" | "muted" | "inverse"} [props.variant="outline"]
 * @param {"none" | "sm" | "md" | "lg"} [props.padding="md"]
 * @param {boolean} [props.interactive=false] Lift on hover. Use when the whole
 *   card is a link (put the link inside; the card is not focusable itself).
 * @param {React.ElementType} [props.as="div"] For example `article` or `li`.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({
  variant = "outline",
  padding = "md",
  interactive = false,
  as: Tag = "div",
  className,
  children,
}) {
  return (
    <Tag
      className={cn(
        "rounded-lg",
        VARIANTS[variant],
        PADDING[padding],
        interactive &&
          "transition-[box-shadow,translate] focus-within:shadow-lg hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
