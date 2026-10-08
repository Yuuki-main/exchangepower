// Homepage content (new design, PLAN.md Step 5).
//
// The headlines and short descriptions here are NEW copy written for the
// redesign. Every fact in them comes from the live site; the source is noted
// next to each one. They need the business's approval (docs/CONTENT-NOTES.md
// section 9). The live homepage copy is kept in archive/home-live.js.
//
// Links are relative and end in "/". `QUOTE_HREF` comes from site.js.

import { SITE } from "./site.js";

const QUOTE_HREF = SITE.cta.quoteHref;

export const HOME = {
  // Live homepage title and description, kept for SEO continuity.
  seo: {
    title:
      "Exchange Power WA | Solar Panels & Battery Solutions in Western Australia",
    description:
      "Trusted solar installers in WA offering panels, batteries & rebate assistance. Maximize savings with Exchange Power solutions.",
  },

  hero: {
    eyebrow: "Solar and battery installers · Wangara, WA",
    title: "Solar and batteries, designed around how you use power.",
    // About page: "designs, installs and connects solar PV systems";
    // Why section: "handling all the valid Australian solar rebate applications and paperwork".
    lead: "Exchange Power designs, installs and connects solar PV and battery systems for homes and businesses across Western Australia, and handles the rebate paperwork for you.",
    primaryCta: { label: "Get a free quote", href: QUOTE_HREF },
    secondaryCta: { label: "Find your system size", href: "#system-sizes" },
    visualCaption:
      "Solar covers the day. A battery carries it into the evening.",
    // Live product card and battery rebate page. Time-sensitive (CONTENT-NOTES 4.6).
    rebate: {
      label: "WA battery rebate",
      text: "Up to $5,000 for Synergy customers and up to $7,500 for Horizon Power customers. Eligibility applies.",
      link: {
        label: "How the rebate works",
        href: "/solar-battery/wa-residential-battery-rebates/",
      },
    },
  },

  credentials: {
    title: "Exchange Power at a glance",
    items: [
      // Live homepage and About stats (unverified, CONTENT-NOTES 4.5).
      { value: "50,000+", label: "solar panels sold" },
      { value: "1,000+", label: "satisfied customers" },
      // Terms 11.3 and 11.4.
      {
        value: "5 years",
        label: "whole-system and workmanship warranty",
        href: "/terms-and-conditions/",
      },
      // Footer badge.
      {
        value: "NETCC",
        label: "New Energy Tech Consumer Code Approved Seller",
      },
    ],
  },

  solutions: {
    eyebrow: "What we install",
    title: "One team for solar, storage and rebates.",
    items: [
      {
        title: "Homes",
        range: "6.6kW – 13.2kW",
        // Live homepage: residential systems "makes homes ready to implement battery storage and EV chargers".
        text: "Rooftop solar for Western Australian homes, designed so a battery or EV charger can be added later.",
        href: "/residential-solar/",
      },
      {
        title: "Business",
        range: "30kW – 100kW",
        // 100kW FAQ: warehouses, factories, offices, schools, farms, retail centres, hospitality.
        text: "Commercial systems for warehouses, factories, offices, schools, farms and retail, built for high daytime use.",
        href: "/commercial-solar/",
      },
      {
        title: "Batteries",
        range: "Storage + rebates",
        text: "Store your daytime solar for the evening, with help claiming the WA Residential Battery Scheme rebate.",
        href: "/solar-battery/",
      },
      {
        title: "Installation",
        range: "Wangara · WA-wide",
        text: "Professional installation across Western Australia from our Wangara base, plus solar rebates and incentives explained.",
        href: "/solar-packages/",
      },
    ],
  },

  // Facts are from each system's FAQs on the live site.
  systems: {
    id: "system-sizes",
    eyebrow: "System sizes",
    title: "Which system fits?",
    lead: "A rough guide from our most-installed sizes. Your quote is based on your own roof, usage and budget.",
    groups: [
      {
        label: "Homes",
        items: [
          {
            kw: 6.6,
            slug: "6-6kw-solar-system-wa",
            bestFor: "Medium-size homes",
            facts: [
              "24–28 kWh a day on average",
              "16–18 panels",
              "3–5 year expected payback",
            ],
          },
          {
            kw: 7.7,
            slug: "7-7kw-solar-system-wa",
            bestFor: "Medium to large homes with moderate to high use",
            facts: ["Suits homes running air conditioning"],
          },
          {
            kw: 10,
            slug: "10kw-solar-system-wa",
            bestFor: "Larger homes with higher use",
            facts: ["35–45 kWh a day", "Can be paired with a battery"],
          },
          {
            kw: 13.2,
            slug: "13-2kw-solar-system",
            bestFor:
              "Large homes with air conditioning, EVs, pools or home offices",
            facts: ["28–32 panels", "1–2 days to install"],
          },
        ],
      },
      {
        label: "Business",
        items: [
          {
            kw: 30,
            slug: "30kw-solar-system",
            bestFor:
              "Offices, factories, schools and large residential buildings",
            facts: [
              "120–150 kWh a day",
              "54–56 × 550W panels",
              "2–5 days to install",
            ],
          },
          {
            kw: 50,
            slug: "50kw-solar-system",
            bestFor: "Warehouses with high daytime use",
            facts: [
              "Suits metal, flat and commercial roofs",
              "25+ year system life",
            ],
          },
          {
            kw: 100,
            slug: "100kw-solar-system",
            bestFor:
              "Warehouses, factories, retail, schools, farms and hospitality",
            facts: ["Installed in planned stages"],
          },
        ],
      },
    ],
    cta: { label: "Not sure? Get a sizing quote", href: QUOTE_HREF },
  },

  // Battery hub and rebate page copy, and battery rebate FAQs. Time-sensitive.
  battery: {
    eyebrow: "Battery storage",
    title: "Keep your daytime solar for the evening.",
    lead: "Panels produce the most around midday, but most homes use the most power after dark. A battery stores the surplus, so you draw less from the grid at night and keep power during outages.",
    figures: [
      {
        prefix: "Up to",
        value: "$5,000",
        label: "WA battery rebate for eligible Synergy customers",
      },
      {
        prefix: "Up to",
        value: "$7,500",
        label: "WA battery rebate for eligible Horizon Power customers",
      },
      {
        prefix: "Up to",
        value: "$10,000",
        label:
          "No-interest loan for households with a combined income under $210,000, repayable over up to 10 years",
      },
    ],
    notes: [
      "The WA Residential Battery Scheme requires joining a Virtual Power Plant (VPP).",
      "It can be combined with the Federal solar battery rebate.",
      "Quotas and eligibility rules apply. We handle the application for you.",
    ],
    primaryCta: { label: "Get a battery quote", href: QUOTE_HREF },
    secondaryCta: {
      label: "Battery rebate details",
      href: "/solar-battery/wa-residential-battery-rebates/",
    },
  },

  // From the Terms and Conditions (clause numbers noted) and the About page.
  process: {
    eyebrow: "How it works",
    title: "From first call to switch-on.",
    steps: [
      {
        title: "Free quote",
        text: "Tell us about your property and how you use power. Your written quote is valid for 14 days.", // 4.3
      },
      {
        title: "Site-specific design",
        text: "Before anything is installed, you get a full system design and an estimate of its output. If you don't accept it, you get a full refund.", // 2.6
      },
      {
        title: "Approvals and rebates",
        text: "We lodge the grid-connection paperwork with your electricity distributor and handle the rebate applications.", // 2.5, Why
      },
      {
        title: "Installation",
        text: "Installed to Clean Energy Council guidelines at a time agreed with you. A 13.2kW home system typically takes one to two days.", // 3.2, 4.3, 13.2kW FAQ
      },
      {
        title: "Switch-on and handover",
        text: "We activate the system and hand over a system manual for your installation.", // 6.1, About
      },
      {
        title: "Support",
        text: "Your whole system and our workmanship are covered for 5 years, and we're on call if something goes wrong.", // 11.3, 11.4, Why
      },
    ],
  },

  // The four "Why Choose Exchange Power" points from the live homepage, rewritten concisely.
  why: {
    eyebrow: "Why Exchange Power",
    title: "Local, accountable, and still here after the install.",
    lead: "A Western Australian team based in Wangara, working with manufacturers we trust.",
    items: [
      {
        title: "Best price guarantee",
        text: "Competitive pricing without cutting quality, and no hidden charges or surprises.",
      },
      {
        title: "Rebates made easy",
        text: "We handle the solar and battery rebate applications and paperwork, so you get the savings you're eligible for.",
      },
      {
        title: "Worry-free warranty",
        text: "5 years on the whole system and our workmanship, on top of the manufacturers' product warranties.", // Terms 11.1, 11.3, 11.4
      },
      {
        title: "Support after installation",
        text: "If a problem comes up, we troubleshoot quickly and come on site, so your system keeps running.",
      },
    ],
    brandsLabel: "Equipment we install",
  },

  // No published customer reviews exist yet (the live rating block is hidden
  // and unverified, CONTENT-NOTES 3.3). The section renders only when real,
  // attributable reviews are added here.
  reviews: {
    eyebrow: "Customer stories",
    title: "What our customers say",
    /** @type {{ quote: string, name: string, location: string, system?: string }[]} */
    items: [],
  },

  // Real FAQs from the product pages, shown verbatim (resolved in src/lib/content.js).
  faq: {
    eyebrow: "Questions",
    title: "Common questions",
    items: [
      { product: "wa-residential-battery-rebates", index: 1 },
      { product: "wa-residential-battery-rebates", index: 3 },
      { product: "6-6kw-solar-system-wa", index: 4 },
      { product: "13-2kw-solar-system", index: 4 },
      { product: "10kw-solar-system-wa", index: 3 },
    ],
    guidesTitle: "Guides",
    guidesCount: 3,
    guidesLink: { label: "All guides", href: "/blog/" },
  },

  finalCta: {
    id: "get-a-quote",
    eyebrow: "Free quote",
    title: "Tell us how you use power. We'll design the system around it.",
    lead: "Call, email or message us. We'll talk through your usage, recommend a system size, explain the rebates you may be eligible for and put it all in a written quote.",
  },
};
