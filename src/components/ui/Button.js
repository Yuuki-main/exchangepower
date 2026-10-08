import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * @typedef {"primary" | "secondary" | "ghost" | "link"} ButtonVariant
 * @typedef {"sm" | "md" | "lg"} ButtonSize
 */

/** @type {Record<ButtonVariant, string>} */
const VARIANTS = {
  // Solar amber call to action. Works on light and dark sections.
  primary:
    "bg-accent-400 text-brand-950 shadow-sm hover:bg-accent-300 active:bg-accent-500",
  // Solid brand button for secondary actions on light sections.
  secondary:
    "bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900",
  // Outlined, inherits the surrounding text colour, so it adapts to dark sections.
  ghost:
    "border border-current/35 text-current hover:bg-current/8 active:bg-current/12",
  // Inline text link styled as an action.
  link: "text-current underline decoration-accent-500 decoration-2 underline-offset-4 hover:decoration-current",
};

/** @type {Record<ButtonSize, string>} */
const SIZES = {
  sm: "min-h-9 px-3.5 text-sm gap-1.5",
  md: "min-h-11 px-5 text-base gap-2",
  lg: "min-h-13 px-7 text-lg gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-md font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

/**
 * Returns the class string for a button, so other elements (for example a
 * form's submit button or a dialog trigger) can look like a Button.
 *
 * @param {{ variant?: ButtonVariant, size?: ButtonSize, fullWidth?: boolean, className?: string }} [options]
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
} = {}) {
  return cn(
    BASE,
    VARIANTS[variant],
    variant === "link" ? "gap-1.5 p-0" : SIZES[size],
    fullWidth && "w-full",
    className,
  );
}

/** Hrefs that should render a plain <a> instead of next/link. */
const EXTERNAL = /^(https?:|mailto:|tel:|sms:|#)/;

/**
 * Button or link with the design-system look.
 *
 * - With `href`: renders a next/link `Link` for internal paths, or a plain
 *   `<a>` for external URLs and `tel:`/`mailto:` links.
 * - Without `href`: renders a `<button>` (default `type="button"`).
 *
 * @param {object} props
 * @param {ButtonVariant} [props.variant="primary"] Visual style.
 * @param {ButtonSize} [props.size="md"] Height and padding. Ignored by `link`.
 * @param {string} [props.href] Makes the button a link.
 * @param {boolean} [props.fullWidth=false] Stretch to the container width.
 * @param {"button" | "submit" | "reset"} [props.type="button"] Button type (no `href` only).
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Extra classes.
 * @param {React.ReactNode} props.children Label, optionally with an icon.
 * @param {string} [props.target]
 * @param {string} [props.rel]
 * @param {React.MouseEventHandler<HTMLElement>} [props.onClick]
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth,
  type = "button",
  disabled,
  className,
  children,
  ...rest
}) {
  const classes = buttonClasses({ variant, size, fullWidth, className });

  if (href) {
    // Links can't be disabled natively; mark them and remove them from tab order.
    const linkProps = disabled
      ? { "aria-disabled": true, tabIndex: -1, ...rest }
      : rest;
    if (EXTERNAL.test(href)) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
