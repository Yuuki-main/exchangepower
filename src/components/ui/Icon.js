import { cn } from "@/lib/cn";

/**
 * Inline SVG icon set. Each icon is its own named export, marked pure, so a
 * bundle only includes the icons a page imports.
 *
 * Paths follow the Lucide icon style (ISC licence): 24×24 grid, 2px round
 * strokes, `currentColor`.
 *
 * @example <PhoneIcon size={18} />            decorative, hidden from screen readers
 * @example <MapPinIcon title="Location" />   meaningful, announced as an image
 */

/**
 * @typedef {object} IconProps
 * @property {number} [size=20] Width and height in px.
 * @property {string} [title] Accessible name. Leave empty for decorative icons.
 * @property {string} [className]
 * @property {number} [strokeWidth=2]
 */

/**
 * @param {string} name
 * @param {React.ReactNode} paths
 */
function createIcon(name, paths) {
  /** @param {IconProps & Omit<React.SVGProps<SVGSVGElement>, 'title'>} props */
  function Icon({ size = 20, title, className, strokeWidth = 2, ...rest }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0", className)}
        {...(title
          ? { role: "img", "aria-label": title }
          : { "aria-hidden": true })}
        focusable="false"
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

export const ArrowRightIcon = /* @__PURE__ */ createIcon(
  "ArrowRightIcon",
  <path d="M5 12h14M12 5l7 7-7 7" />,
);

export const ChevronDownIcon = /* @__PURE__ */ createIcon(
  "ChevronDownIcon",
  <path d="m6 9 6 6 6-6" />,
);

export const ChevronRightIcon = /* @__PURE__ */ createIcon(
  "ChevronRightIcon",
  <path d="m9 18 6-6-6-6" />,
);

export const MenuIcon = /* @__PURE__ */ createIcon(
  "MenuIcon",
  <path d="M4 6h16M4 12h16M4 18h16" />,
);

export const CloseIcon = /* @__PURE__ */ createIcon(
  "CloseIcon",
  <path d="M18 6 6 18M6 6l12 12" />,
);

export const PhoneIcon = /* @__PURE__ */ createIcon(
  "PhoneIcon",
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />,
);

export const MailIcon = /* @__PURE__ */ createIcon(
  "MailIcon",
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </>,
);

export const MapPinIcon = /* @__PURE__ */ createIcon(
  "MapPinIcon",
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
);

export const ChatIcon = /* @__PURE__ */ createIcon(
  "ChatIcon",
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
);

export const BatteryIcon = /* @__PURE__ */ createIcon(
  "BatteryIcon",
  <>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2M6 11v2M10 11v2" />
  </>,
);

export const CheckIcon = /* @__PURE__ */ createIcon(
  "CheckIcon",
  <path d="M20 6 9 17l-5-5" />,
);

export const AlertCircleIcon = /* @__PURE__ */ createIcon(
  "AlertCircleIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </>,
);
