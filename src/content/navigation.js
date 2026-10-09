// Header and footer menus, verbatim labels from the live site.
// Links are relative and end in "/". Live-site bugs are fixed here and
// recorded in docs/CONTENT-NOTES.md.

/** @typedef {import("../lib/content-schema.js").NavItem} NavItem */

/** @type {NavItem[]} */
export const HEADER_NAV = [
  { label: "Home", href: "/" },
  {
    label: "Residential",
    href: "/residential-solar/",
    children: [
      {
        label: "6.6kW Solar System",
        href: "/residential-solar/6-6kw-solar-system-wa/",
      },
      {
        label: "7.7kW Solar System",
        href: "/residential-solar/7-7kw-solar-system-wa/",
      },
      {
        label: "10kW Solar System",
        href: "/residential-solar/10kw-solar-system-wa/",
      },
      {
        label: "13.2kW Solar System",
        href: "/residential-solar/13-2kw-solar-system/",
      },
    ],
  },
  {
    label: "Commercial",
    href: "/commercial-solar/",
    children: [
      {
        label: "30kW Solar System",
        href: "/commercial-solar/30kw-solar-system/",
      },
      {
        label: "50kW Solar System",
        href: "/commercial-solar/50kw-solar-system/",
      },
      {
        label: "100kW Solar System",
        href: "/commercial-solar/100kw-solar-system/",
      },
    ],
  },
  { label: "Solar Batteries", href: "/solar-battery/" },
  { label: "Solar Packages", href: "/solar-packages/" },
  { label: "About Us", href: "/about-exchange-power/" },
  { label: "Blog", href: "/blog/" },
];

/** @type {{ title: string, links: NavItem[] }[]} */
export const FOOTER_NAV = [
  {
    title: "Solar Packages",
    links: [
      {
        label: "6.6kW Solar System",
        href: "/residential-solar/6-6kw-solar-system-wa/",
      },
      {
        label: "7.7kW Solar System",
        href: "/residential-solar/7-7kw-solar-system-wa/",
      },
      {
        label: "10kW Solar System",
        href: "/residential-solar/10kw-solar-system-wa/",
      },
      {
        label: "13.2kW Solar System",
        href: "/residential-solar/13-2kw-solar-system/",
      },
      {
        label: "30kW Solar System",
        href: "/commercial-solar/30kw-solar-system/",
      },
      {
        label: "50kW Solar System",
        href: "/commercial-solar/50kw-solar-system/",
      },
      // Live site: this item has an empty link. Fixed.
      {
        label: "100kW Solar System",
        href: "/commercial-solar/100kw-solar-system/",
      },
    ],
  },
  {
    title: "Solar Installation",
    links: [
      {
        label: "Solar Panel Installation WA",
        href: "/solar-packages/solar-panel-installation-in-wa/",
      },
      {
        label: "Solar Panel Installation Wangara",
        href: "/solar-packages/solar-panel-installation-wangara/",
      },
    ],
  },
  {
    // Live site spells this "Usefull Links". Kept verbatim pending approval (CONTENT-NOTES).
    title: "Usefull Links",
    links: [
      { label: "Why Exchange Power?", href: "/about-exchange-power/" },
      // Added in Step 7 (not on the live site).
      { label: "Contact", href: "/contact/" },
      { label: "Terms & Conditions", href: "/terms-and-conditions/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
];
