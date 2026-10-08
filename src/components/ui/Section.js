import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** @type {Record<"none" | "sm" | "md" | "lg", string>} */
const SPACING = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
};

/**
 * `brand` is a dark section: it sets light text and switches the focus-ring
 * colour (the `--ring` variable) to amber so focus stays visible.
 * @type {Record<"default" | "muted" | "brand" | "accent", string>}
 */
const BACKGROUNDS = {
  default: "bg-background text-foreground",
  muted: "bg-surface text-foreground",
  brand:
    "bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]",
  accent: "bg-accent-50 text-foreground",
};

/**
 * A full-width page band with consistent vertical rhythm. Wraps its children
 * in a `Container` unless `contained` is false.
 *
 * @param {object} props
 * @param {"none" | "sm" | "md" | "lg"} [props.spacing="md"] Vertical padding (fluid).
 * @param {"default" | "muted" | "brand" | "accent"} [props.background="default"]
 * @param {boolean} [props.contained=true] Wrap children in a Container.
 * @param {"content" | "reading" | "full"} [props.containerSize="content"]
 * @param {React.ElementType} [props.as="section"]
 * @param {string} [props.id] Anchor id.
 * @param {string} [props.labelledBy] Id of the heading that names this section.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Section({
  spacing = "md",
  background = "default",
  contained = true,
  containerSize = "content",
  as: Tag = "section",
  id,
  labelledBy,
  className,
  children,
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(SPACING[spacing], BACKGROUNDS[background], className)}
    >
      {contained ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
