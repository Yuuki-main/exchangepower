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
    href: "tel:0863704963",
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
  socials: [],

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

  /** Hidden on the live homepage (d-none). Do not show until verified (CONTENT-NOTES). */
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
      // TODO(PLAN Part C item 8): the live link is empty. Decide the target.
      href: null,
    },
  },

  cta: {
    quoteLabel: "Get a free quote",
    // Every "Get a free quote" button goes to the contact page (Step 8).
    // Change this one value to switch them all.
    quoteHref: "/contact/",
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
