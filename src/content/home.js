// Homepage content (new design, PLAN.md Step 5).
//
// The headlines and short descriptions here are NEW copy written for the
// redesign. Every fact in them comes from the live site; the source is noted
// next to each one. They need the business's approval (docs/CONTENT-NOTES.md
// section 9). The live homepage copy is kept in archive/home-live.js.
//
// Links are relative and end in "/". `QUOTE_HREF` comes from site.js.

import { HOME_LIVE } from "./archive/home-live.js";
import { SITE } from "./site.js";

const QUOTE_HREF = SITE.cta.quoteHref;

export const HOME = {
  // Title and description from the content handover (Page updates & SEO).
  seo: {
    title: "Solar Panels & Batteries Perth | Exchange Power WA",
    description:
      "Solar and battery installers based in Wangara. Home and business systems from 6.6kW to 100kW, with STC and WA battery rebates handled for you.",
  },

  // Hero copy from the content handover (Homepage rewrite).
  hero: {
    eyebrow: "Solar and battery installers · Wangara, WA",
    title: "Solar and battery systems built for Perth homes and businesses",
    lead: "From 6.6kW homes to 100kW businesses. We size from your bill, handle every rebate and install from our base in Wangara.",
    primaryCta: { label: "Get a free quote", href: QUOTE_HREF },
    secondaryCta: {
      label: "Check battery rebates",
      href: "/solar-battery/wa-residential-battery-rebates/",
    },
    visualCaption:
      "Solar covers the day. A battery carries it into the evening.",
    // Approved rebate wording (handover facts sheet). Re-check every 1 January and 1 July.
    rebate: {
      label: "WA battery rebate · checked October 2026",
      text: "Up to $1,300 for Synergy customers or $3,800 for Horizon Power customers, plus the federal discount.",
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
      { value: "50,000+", label: "solar panels sold", icon: "sun" },
      { value: "1,000+", label: "satisfied customers", icon: "users" },
      // Terms 11.3 and 11.4.
      {
        value: "5 years",
        label: "whole-system and workmanship warranty",
        icon: "shield",
        href: "/terms-and-conditions/",
      },
      // Live homepage stat (unverified, CONTENT-NOTES 4.5; shown at the owner's request).
      { value: "15,000kWh+", label: "solar batteries sold", icon: "battery" },
    ],
  },

  // Live homepage "Exchange Power Promise" section, verbatim, with the review
  // summary that is hidden on the live site. "Over 5,000 Australians" and the
  // 4.8 rating are unverified (CONTENT-NOTES 3.3, 4.5); shown at the owner's request.
  promise: {
    title: HOME_LIVE.services.title,
    subtitle: HOME_LIVE.services.subtitle.replace(/^—\s*/, ""),
    rating: {
      value: SITE.reviewSummary.rating,
      text: SITE.reviewSummary.text,
      title: HOME_LIVE.reviews.title,
      body: HOME_LIVE.reviews.text,
    },
    tabs: HOME_LIVE.services.tabs.map((tab) => ({
      ...tab,
      // Stock photo until the live image is approved (CONTENT-NOTES 14).
      fallback:
        tab.cta.href === "/residential-solar/"
          ? "products/residential-solar"
          : "products/commercial-solar",
    })),
  },

  // Live homepage "packages" heading. The live subtitle's "up to 80%" claim
  // was removed at the owner's request (2026-10-22, CONTENT-NOTES 17).
  solutions: {
    eyebrow: "What we install",
    title: HOME_LIVE.packages.title,
    lead: "Solar and battery systems for homes and businesses across Western Australia, sized from your power bill.",
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

  // Figures from the content handover (verified facts sheet and product FAQs).
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
            facts: ["26–29 kWh a day on average", "About 15 panels"],
          },
          {
            kw: 7.7,
            slug: "7-7kw-solar-system-wa",
            bestFor: "Growing families with afternoon air conditioning",
            facts: ["30–34 kWh a day on average", "About 17–18 panels"],
          },
          {
            kw: 10,
            slug: "10kw-solar-system-wa",
            bestFor: "Larger homes with a pool, home office or ducted air con",
            facts: ["40–44 kWh a day on average", "About 23 panels"],
          },
          {
            kw: 13.2,
            slug: "13-2kw-solar-system",
            bestFor:
              "Large homes with air conditioning, EVs, pools or home offices",
            facts: ["52–58 kWh a day on average", "About 30 panels"],
          },
        ],
      },
      {
        label: "Business",
        items: [
          {
            kw: 30,
            slug: "30kw-solar-system",
            bestFor: "Offices, clinics, small workshops and retail",
            facts: ["About 130 kWh a day", "About 68 panels"],
          },
          {
            kw: 50,
            slug: "50kw-solar-system",
            bestFor: "Workshops, gyms, supermarkets and schools",
            facts: ["About 220 kWh a day", "About 114 panels"],
          },
          {
            kw: 100,
            slug: "100kw-solar-system",
            bestFor: "Warehouses, cold stores and manufacturers",
            facts: ["About 440 kWh a day", "Largest STC-eligible size"],
          },
        ],
      },
    ],
    cta: { label: "Not sure? Get a sizing quote", href: QUOTE_HREF },
  },

  // Battery hub and rebate page copy, and battery rebate FAQs. Time-sensitive.
  battery: {
    // Live homepage hero title, verbatim.
    eyebrow: HOME_LIVE.hero.title,
    // Live homepage hero banner (shown once approved and downloaded).
    image: HOME_LIVE.hero.image,
    title: "Keep your daytime solar for the evening.",
    lead: "Panels produce the most around midday, but most homes use the most power after dark. A battery stores the surplus, so you draw less from the grid at night and keep power during outages.",
    // Handover facts sheet, checked October 2026.
    figures: [
      {
        prefix: "Up to",
        value: "$1,300",
        label: "WA battery rebate for eligible Synergy customers",
      },
      {
        prefix: "Up to",
        value: "$3,800",
        label: "WA battery rebate for eligible Horizon Power customers",
      },
      {
        prefix: "Up to",
        value: "$10,000",
        label:
          "No-interest loan for households with a gross income under $210,000, over up to 10 years",
      },
    ],
    notes: [
      "The WA rebate is capped at 10 kWh and needs the battery to join an approved Virtual Power Plant (VPP).",
      "It combines with the federal Cheaper Home Batteries discount, which depends on battery size and install date.",
      "Rebate settings checked October 2026. Ask us for your exact figure.",
    ],
    primaryCta: { label: "Get a battery quote", href: QUOTE_HREF },
    secondaryCta: {
      label: "Battery rebate details",
      href: "/solar-battery/wa-residential-battery-rebates/",
    },
  },

  // From the Terms and Conditions (clause numbers noted) and the About page.
  // "How it works" in four steps (content handover, Homepage rewrite).
  // Details from the Terms (clause numbers noted).
  process: {
    eyebrow: "How it works",
    title: "From your power bill to switch-on.",
    steps: [
      {
        title: "Send your bill",
        icon: "quote",
        text: "Send a recent power bill and a photo of your switchboard. We use them to size your system.",
      },
      {
        title: "Design and quote",
        icon: "design",
        text: "A site-specific design and a written quote listing every inclusion and rebate. Quotes are valid for 14 days.", // 2.6, 4.3
      },
      {
        title: "Install",
        icon: "install",
        text: "We lodge the network paperwork, then install and commission your system. Most homes take one day.", // 2.5, 3.2
      },
      {
        title: "Monitor and support",
        icon: "support",
        text: "Monitoring on your phone, and 5 years of cover on the whole system and our workmanship.", // 11.3, 11.4
      },
    ],
  },

  // The four "Why Choose Exchange Power" points from the live homepage, rewritten concisely.
  why: {
    // Live homepage collage (shown once approved and downloaded).
    image: HOME_LIVE.why.image,
    eyebrow: "Why Exchange Power",
    title: "Local, accountable, and still here after the install.",
    lead: "A Western Australian team based in Wangara, working with manufacturers we trust.",
    items: [
      // Replaces "Best price guarantee" (removed at the owner's request,
      // 2026-10-22). Terms 4.3: quotes are valid for 14 days.
      {
        title: "Clear, written quotes",
        icon: "price",
        text: "Every quote lists the exact equipment, the STC discount and every inclusion in writing, and stays valid for 14 days.",
      },
      {
        title: "Rebates made easy",
        icon: "rebates",
        text: "We handle the solar and battery rebate applications and paperwork, so you get the savings you're eligible for.",
      },
      {
        title: "Worry-free warranty",
        icon: "warranty",
        text: "5 years on the whole system and our workmanship, on top of the manufacturers' product warranties.", // Terms 11.1, 11.3, 11.4
      },
      {
        title: "Support after installation",
        icon: "support",
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

  // Homepage FAQs from the content handover (7-layer set).
  faq: {
    eyebrow: "Questions",
    title: "Common questions",
    /** @type {import("../lib/content-schema.js").Faq[]} */
    items: [
      {
        layer: "beginner",
        question: "What does Exchange Power do?",
        answer:
          "We design and install solar panels, solar batteries and commercial solar systems for homes and businesses across Perth and WA, from our base in Wangara.",
      },
      {
        layer: "cost",
        question: "How much does solar cost with Exchange Power?",
        answer:
          "It depends on system size, equipment, roof type and any electrical work. Our quotes list the STC discount, every inclusion and the final price in writing.",
      },
      {
        layer: "technical",
        question: "Which system size is right for my home?",
        answer:
          "Most homes choose between 6.6kW and 13.2kW, based on daily usage, roof space and plans for a battery or EV. We size from your power bill.",
      },
      {
        layer: "installation",
        question: "How long does installation take?",
        answer:
          "Most homes are installed in one day. Larger homes, tile roofs and battery installs may take two.",
      },
      {
        layer: "support",
        question: "What warranties do I get?",
        answer:
          "Manufacturer warranties on panels, inverters and batteries, plus our 5-year workmanship warranty. We provide local after-sales support.",
      },
      {
        layer: "location",
        question: "Can you help with WA battery rebates?",
        answer:
          "Yes. We handle STC discounts and help with WA Residential Battery Scheme applications for eligible Synergy and Horizon Power customers.",
      },
      {
        layer: "quote",
        question: "How do I get a quote?",
        answer:
          "[Request a free quote](/get-a-quote/) with your name, address and a recent power bill, or call 08 6370 4963.",
      },
    ],
    guidesTitle: "Latest guides",
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
