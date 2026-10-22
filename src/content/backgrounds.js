// Background photos for the dark page headers and call-to-action bands.
// Each value is a "bg-…" key in src/content/images.js (Unsplash stock photos).
// Every page gets its own photo; a page that isn't listed falls back to the
// plain dark surface. To change a photo, point the page at another key (or
// add a new image to images.js first).

export const BACKGROUNDS = {
  home: {
    hero: "bg-home-hero",
    // The closing "Request a free quote" section (#get-a-quote).
    quote: "bg-quote-cta",
  },
  // The "Get a free quote" band at the foot of inner pages.
  ctaBand: "bg-cta-band",

  about: "bg-about",
  contact: "bg-contact",
  blog: "bg-blog",
  legal: "bg-legal",
  notFound: "bg-not-found",

  // Category hubs and product pages, by slug (products.js).
  products: {
    "residential-solar": "bg-residential",
    "6-6kw-solar-system-wa": "bg-6-6kw",
    "7-7kw-solar-system-wa": "bg-7-7kw",
    "10kw-solar-system-wa": "bg-10kw",
    "13-2kw-solar-system": "bg-13-2kw",
    "commercial-solar": "bg-commercial",
    "30kw-solar-system": "bg-30kw",
    "50kw-solar-system": "bg-50kw",
    "100kw-solar-system": "bg-100kw",
    "solar-battery": "bg-battery",
    "wa-residential-battery-rebates": "bg-battery-rebates",
    "solar-packages": "bg-packages",
    "solar-panel-installation-in-wa": "bg-installation-wa",
    "solar-panel-installation-wangara": "bg-installation-wangara",
    "solar-rebates-and-incentives-in-wa": "bg-rebates-incentives",
  },

  // Blog posts, by file name (src/content/posts/<slug>.md).
  posts: {
    "6-6kw-solar-system-vs-7-7kw-solar-system-which-is-better":
      "bg-post-6-6-vs-7-7",
    "complete-guide-to-solar-power-rebate-western-australia-in-2026":
      "bg-post-rebate-guide",
    "is-a-7-7kw-solar-system-suitable-for-homes-with-air-conditioning":
      "bg-post-7-7-air-con",
    "solar-panel-rebate-western-australia-for-first-time-solar-buyers":
      "bg-post-first-time-buyers",
    "wa-government-solar-battery-rebate-2026-complete-guide-for-homeowners":
      "bg-post-battery-rebate-2026",
    "wa-residential-battery-scheme-for-solar-homes-in-western-australia":
      "bg-post-battery-scheme",
    "why-a-7-7kw-solar-system-is-ideal-for-growing-families":
      "bg-post-7-7-families",
    "why-the-6-6kw-solar-system-is-australias-most-popular-choice":
      "bg-post-6-6-popular",
    // New guides (content handover, October 2026). Shared stock photos
    // until each post has its own image from the graphic briefs.
    "solar-system-cost-perth": "bg-packages",
    "10kw-vs-13-2kw-solar-system": "bg-13-2kw",
    "how-much-power-10kw-solar-system-perth": "bg-10kw",
    "single-phase-vs-three-phase-solar-wa": "bg-installation-wa",
    "solar-rebate-drop-january-2027-wa": "bg-rebates-incentives",
    "debs-synergy-solar-feed-in-explained": "bg-residential",
    "roof-orientation-shading-solar-perth": "bg-7-7kw",
    "solar-panel-inverter-warranty-checklist": "bg-6-6kw",
    "what-size-solar-battery-wa": "bg-battery",
    "add-battery-to-existing-solar-perth": "bg-post-battery-scheme",
    "virtual-power-plant-wa": "bg-battery-rebates",
    "solar-battery-blackout-backup-perth": "bg-post-battery-rebate-2026",
    "is-solar-battery-worth-it-perth": "bg-battery",
    "wa-battery-scheme-no-interest-loan": "bg-battery-rebates",
    "commercial-solar-roi-wa": "bg-commercial",
    "30kw-vs-50kw-vs-100kw-commercial-solar": "bg-50kw",
    "commercial-solar-warehouses-perth-north": "bg-100kw",
    "commercial-solar-finance-options-wa": "bg-30kw",
    "solar-panel-cleaning-maintenance-perth": "bg-installation-wangara",
    "how-to-choose-solar-installer-perth": "bg-about",
  },
};
