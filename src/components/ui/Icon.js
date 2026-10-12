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

export const ClockIcon = /* @__PURE__ */ createIcon(
  "ClockIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);

export const SunIcon = /* @__PURE__ */ createIcon(
  "SunIcon",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </>,
);

export const UsersIcon = /* @__PURE__ */ createIcon(
  "UsersIcon",
  <>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21a7 7 0 0 1 14 0M16 3.13a4 4 0 0 1 0 7.75M22 21a7 7 0 0 0-5-6.7" />
  </>,
);

export const ShieldCheckIcon = /* @__PURE__ */ createIcon(
  "ShieldCheckIcon",
  <>
    <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);

export const AwardIcon = /* @__PURE__ */ createIcon(
  "AwardIcon",
  <>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.2 13.8-1.2 8.2 5-3 5 3-1.2-8.2" />
  </>,
);

export const TagIcon = /* @__PURE__ */ createIcon(
  "TagIcon",
  <>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </>,
);

export const FileCheckIcon = /* @__PURE__ */ createIcon(
  "FileCheckIcon",
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 15l2 2 4-4" />
  </>,
);

export const WrenchIcon = /* @__PURE__ */ createIcon(
  "WrenchIcon",
  <path d="M14.7 6.3a4 4 0 0 0 5.4 5.4l-9.6 9.6a2.1 2.1 0 0 1-3-3l9.6-9.6a4 4 0 0 0-5.4-5.4l2.6 2.6-.6 2.4-2.4.6z" />,
);

export const ZapIcon = /* @__PURE__ */ createIcon(
  "ZapIcon",
  <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
);

export const PenToolIcon = /* @__PURE__ */ createIcon(
  "PenToolIcon",
  <>
    <path d="m12 19 7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
    <path d="m2 2 7.6 7.6" />
    <circle cx="11" cy="11" r="2" />
  </>,
);

export const HeadsetIcon = /* @__PURE__ */ createIcon(
  "HeadsetIcon",
  <>
    <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
    <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
  </>,
);

export const PlusIcon = /* @__PURE__ */ createIcon(
  "PlusIcon",
  <path d="M12 5v14M5 12h14" />,
);

export const StarIcon = /* @__PURE__ */ createIcon(
  "StarIcon",
  <path
    fill="currentColor"
    d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
  />,
);
