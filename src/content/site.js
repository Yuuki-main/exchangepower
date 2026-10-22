// Business details and site-wide copy. Values are verbatim from the live site
// (header, footer, homepage stats, quote forms, Terms clause 1). Items needing
// the business's confirmation are flagged in docs/CONTENT-NOTES.md.

/** @type {import("../lib/content-schema.js").SiteInfo} */
export const SITE = {
  name: "Exchange Power",
  legalName: "Exchange Power PTV LTD", // As written in Terms clause 1; probably "PTY LTD" (see CONTENT-NOTES).
  abn: "25693550202", // From Terms clause 1; not shown elsewhere on the live site.
  url: "https://exchangepower.com.au",
  tagline: "Solar Panels & Battery Solutions in Western Australia",
  description:
    "Solar and battery systems for Western Australian homes and businesses, designed, installed and connected by a local team in Wangara.",

  phone: {
    display: "08 6370 4963", // Live site shows "0863704963"; spaced for readability (CONTENT-NOTES 4.4).
    href: "tel:+61863704963", // E.164 (international format) for tel: links
    international: "+61863704963",
  },
  email: "info@exchangepower.com.au",
  whatsapp: {
    number: "+61480595132",
    href: "https://wa.me/61480595132",
  },
  address: {
    display: "5/17 Prindiville Dr, Wangara, WA 6065, Australia",
    unit: "5",
    street: "17 Prindiville Dr",
    suburb: "Wangara",
    state: "WA",
    postcode: "6065",
    country: "Australia",
    countryCode: "AU",
  },

  // Not on the live site. Add confirmed values to include them in structured data.
  geo: null,
  // Profile URLs (Google Business Profile, Facebook…). Used for sameAs in
  // structured data and as links in the footer once added.
  socials: [],

  // Details the content handover asks for, not yet confirmed by the business.
  // Each one appears on the site (footer, About) and in structured data as
  // soon as it is set here; until then nothing is shown.
  licences: {
    saa: null, // Solar Accreditation Australia number, e.g. "S1234567"
    electrical: null, // WA electrical contractor licence, e.g. "EC012345"
  },
  // e.g. { display: "Mon–Fri 8am–5pm", schema: ["Mo-Fr 08:00-17:00"] }
  openingHours: null,

  badges: {
    netcc: {
      image: "netcc-badge",
      label: "New Energy Tech Consumer Code Approved Seller",
    },
  },

  /** Order as shown in "Brands We Install" on the homepage. */
  brands: [
    { name: "Sofar", image: "brand-sofar" },
    { name: "Fronius", image: "brand-fronius" },
    { name: "Jinko Solar", image: "brand-jinko-solar" },
    { name: "Neovolt", image: "brand-neovolt" },
    { name: "Solis", image: "brand-solis" },
    { name: "Growatt", image: "brand-growatt" },
    { name: "Seraphim", image: "brand-seraphim" },
    { name: "Trina Solar", image: "brand-trina-solar" },
  ],

  /** "Our Solar Footprint" stats (homepage and About). Unverified, see CONTENT-NOTES. */
  stats: [
    { value: 50000, suffix: "+", label: "Solar Panels Sold" },
    { value: 1000, suffix: "+", label: "Satisfied Customers" },
    { value: 15000, suffix: "kWh+", label: "Solar Batteries Sold" },
  ],

  /** Shown at the owner's request (CONTENT-NOTES 15, 18): homepage hero and
   * Promise section, About header, quote and contact pages, product pages.
   * No source is published, so no link and no aggregateRating markup. */
  reviewSummary: {
    rating: 4.8,
    count: 1194,
    text: "4.8 from 1,194 reviews",
    source: null,
    verified: false,
  },

  topBar: {
    text: "Get new solar battery for lowest price",
    cta: {
      label: "Claim now",
      // The live link is empty; it now goes to the battery rebate page
      // (content handover, audit item 4; CONTENT-NOTES 2.1).
      href: "/solar-battery/wa-residential-battery-rebates/",
    },
  },

  cta: {
    quoteLabel: "Get a free quote",
    // Every "Get a free quote" button goes to the quote page (content
    // handover, audit item 15). Change this one value to switch them all.
    quoteHref: "/get-a-quote/",
    title: "Your Solar Journey, Made Simple",
    subtitle: "Get Started with your Free Consultation Today!",
    buttonLabel: "Click Here",
  },

  /** Copy of the live WPForms forms (fields are built in Step 7). */
  forms: {
    quickQuote: {
      fields: ["Name", "Email", "Phone"],
      submitLabel: "Submit",
    },
    // Quote form (contact page, and the compact version on the homepage).
    quote: {
      title: "Request a free quote",
      enquiryTypes: [
        "Residential solar",
        "Commercial solar",
        "Battery",
        "Rebates",
        "Other",
      ],
      submitLabel: "Send enquiry",
    },
    specialDeal: {
      title: "Get A Special Deal",
      fields: ["Name (First, Last)", "Email", "Phone", "Address", "Message"],
      submitLabel: "Submit",
    },
  },

  footer: {
    copyright: "© {year}, All rights reserved.",
  },
};
