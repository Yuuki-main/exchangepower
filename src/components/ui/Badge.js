import { cn } from "@/lib/cn";

/** @typedef {"brand" | "accent" | "neutral" | "success" | "warning" | "error"} BadgeTone */

/** @type {Record<BadgeTone, string>} */
const TONES = {
  brand: "bg-brand-50 text-brand-800",
  accent: "bg-accent-100 text-accent-900",
  neutral: "bg-neutral-100 text-neutral-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  error: "bg-error-50 text-error-700",
};

/** @type {Record<"sm" | "md", string>} */
const SIZES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

/**
 * A small label for categories, status or highlights.
 *
 * @param {object} props
 * @param {BadgeTone} [props.tone="brand"]
 * @param {"sm" | "md"} [props.size="sm"]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children Short text, optionally with an icon.
 */
export function Badge({ tone = "brand", size = "sm", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
