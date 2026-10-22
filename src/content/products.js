// Product, service and category hub pages.
//
// Titles, meta descriptions, H1s ("heading"), specs and the 7-layer FAQ sets
// come from the content handover (Exchange Power Website Content &
// Developer Handover, 18 October 2026: "Page FAQs" and "Page updates & SEO").
// Figures follow its verified facts sheet (rebates and connection rules
// checked October 2026). Questions whose answers were still placeholders in
// the handover (prices, brands, lead times, service areas) are left out until
// the business confirms them. The original live copy is in git history.

/** Shared FAQ answers, so the same fact reads the same everywhere. */
const WORKMANSHIP =
  "Manufacturer warranties on the panels and inverter (and battery, if fitted), plus our 5-year workmanship warranty. See our [terms](/terms-and-conditions/) for details.";
const CONNECTION_RULES =
  "Since 1 May 2026, inverter systems up to 30 kVA can connect on a standard single- or three-phase connection in Perth, subject to your retailer's export settings and a site check. New inverters must support remote management, or be export-limited to 1.5 kW.";

/** @type {import("../lib/content-schema.js").Product[]} */
export const PRODUCTS = [
  // ---------------------------------------------------------------- residential
  {
    slug: "residential-solar",
    category: "residential",
    kind: "hub",
    title: "Residential Solar",
    heading: "Residential Solar Systems in Perth",
    summary:
      "Home solar systems from 6.6kW to 13.2kW, sized from your power bill, battery-ready and with the STC discount applied.",
    image: null,
    banner: null,
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Residential Solar Perth | 6.6kW to 13.2kW Systems",
      description:
        "Compare 6.6kW, 7.7kW, 10kW and 13.2kW home solar systems in Perth. Sized from your bill, battery-ready, with the STC discount applied.",
    },
    tags: ["6.6kW", "7.7kW", "10kW", "13.2kW"],
    faqs: [
      {
        layer: "beginner",
        question: "How does home solar work?",
        answer:
          "Panels turn sunlight into DC power, an inverter converts it to AC for your home, and any surplus is exported to the grid or stored in a battery.",
      },
      {
        layer: "beginner",
        question: "Is solar worth it in Perth?",
        answer:
          "Perth's high sunshine makes solar one of the most effective ways to cut daytime power costs, especially if you use power during the day.",
      },
      {
        layer: "cost",
        question: "What affects the price of a home solar system?",
        answer:
          "System size, panel and inverter choice, roof type, switchboard condition and the current STC discount.",
      },
      {
        layer: "technical",
        question:
          "What is the difference between 6.6kW, 7.7kW, 10kW and 13.2kW?",
        answer:
          "Larger systems produce more power and suit higher usage. A 6.6kW system averages about 26–29 kWh a day in Perth; a 13.2kW system about 52–58 kWh.",
      },
      {
        layer: "technical",
        question: "Can I add a battery later?",
        answer:
          "Yes. Choosing a hybrid inverter now makes it simpler, but most systems can take an AC-coupled battery later.",
      },
      {
        layer: "installation",
        question: "What happens on installation day?",
        answer:
          "Panels and rails go on the roof, the inverter is mounted, the switchboard is connected and the system is tested and commissioned.",
      },
      {
        layer: "support",
        question: "Do solar panels need maintenance?",
        answer:
          "Little. An annual clean and an inspection every 2–3 years keep performance and safety on track.",
      },
      {
        layer: "location",
        question: "Do new WA connection rules affect my system?",
        answer:
          "Systems installed since 1 May 2026 must meet new requirements, including remote management or a fixed 1.5 kW export limit. We handle this.",
      },
      {
        layer: "quote",
        question: "Which size should I choose?",
        answer:
          "Send your bill and we will recommend a size. Compare options in our [solar system cost guide](/solar-system-cost-perth/).",
      },
    ],
    bodyFile: "residential-solar.md",
    keyFacts: [],
    hubIntroOverride: null,
    bodyHiddenOnLive: true,
  },
  {
    slug: "6-6kw-solar-system-wa",
    category: "residential",
    kind: "detail",
    title: "6.6kW Solar System",
    heading: "6.6kW Solar System for Perth Homes",
    summary:
      "For households of 2–4 people using about 15–25 kWh a day, with some daytime use.",
    image: "products-6-6kw-solar-system-wa",
    banner: {
      desktop: "products-6-6kw-solar-system-wa",
      mobile: "products-6-6kw-solar-system-wa",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "6.6kW Solar System Perth | Price, Output & Panels",
      description:
        "A 6.6kW system makes about 26–29 kWh a day in Perth. See what's included, STC discount, panels, warranties and get a fixed-price quote.",
    },
    tags: ["6.6kW"],
    specs: [
      { label: "Panels", value: "About 15 × 440 W" },
      { label: "Average daily output in Perth", value: "About 26–29 kWh" },
      {
        label: "STCs if installed in 2026",
        value: "About 45 (about 36 in 2027)",
      },
      { label: "Typical household", value: "2–4 people, 15–25 kWh a day" },
    ],
    fit: {
      suits: [
        "Your household uses about 15–25 kWh a day",
        "Someone is home for part of the day",
        "You want a strong saving for a modest outlay",
      ],
      consider: [
        "You run air conditioning most afternoons (look at 7.7kW)",
        "You have a pool, home office or EV (look at 10kW)",
        "You plan a large battery soon",
      ],
    },
    compare: [
      {
        label: "Compare the 7.7kW system",
        href: "/residential-solar/7-7kw-solar-system-wa/",
      },
      { label: "Add a battery", href: "/solar-battery/" },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Who is a 6.6kW system best for?",
        answer:
          "Households of 2–4 people using about 15–25 kWh a day, with some daytime use.",
      },
      {
        layer: "beginner",
        question: "Why is 6.6kW so popular?",
        answer:
          "It fits most roofs, pairs with a standard inverter and gives a strong saving for its cost.",
      },
      {
        layer: "cost",
        question: "How much is a 6.6kW system in Perth?",
        answer:
          "It depends on the panels, inverter, roof and switchboard. Every quote shows the STC discount as a line item: about 45 certificates for 2026 installations.",
      },
      {
        layer: "cost",
        question: "What is included in the price?",
        answer:
          "Panels, inverter, mounting, installation, switchboard connection, compliance paperwork and monitoring. Any switchboard upgrade is listed separately.",
      },
      {
        layer: "technical",
        question: "How much power does a 6.6kW system produce in Perth?",
        answer:
          "About 26–29 kWh a day on average, more in summer and less in winter.",
      },
      {
        layer: "technical",
        question: "How many panels are in a 6.6kW system?",
        answer: "About 15 panels at 440 W, or more with lower-wattage panels.",
      },
      {
        layer: "installation",
        question: "How long does a 6.6kW installation take?",
        answer: "Usually one day.",
      },
      {
        layer: "installation",
        question: "Do I need approval to install?",
        answer:
          "We arrange the network and retailer paperwork, including DEBS setup with Synergy.",
      },
      {
        layer: "support",
        question: "What warranties come with the system?",
        answer: WORKMANSHIP,
      },
      {
        layer: "support",
        question: "How do I know it is working?",
        answer:
          "You get monitoring on your phone, showing daily generation and alerts.",
      },
      {
        layer: "location",
        question: "How much will a 6.6kW system save on a Synergy bill?",
        answer:
          "It depends on self-use. As an example, using 40% of output at home could save around $1,300 a year on the Home Plan (A1).",
      },
      {
        layer: "location",
        question: "Does the STC rebate change in 2027?",
        answer:
          "Yes. A 6.6kW system gets about 45 STCs in 2026 and about 36 in 2027. See [why the solar rebate drops in 2027](/solar-rebate-drop-january-2027-wa/).",
      },
      {
        layer: "quote",
        question: "How do I get a 6.6kW quote?",
        answer:
          "Send a recent bill and roof photo. [Get a quote](/get-a-quote/) or compare with our [7.7kW system](/residential-solar/7-7kw-solar-system-wa/).",
      },
      {
        layer: "quote",
        question: "Can I upgrade to a bigger system later?",
        answer:
          "Yes, but it is usually cheaper per kW to choose the right size now.",
      },
    ],
    bodyFile: "6-6kw-solar-system-wa.md",
    keyFacts: [
      { label: "Average daily output", value: "26–29 kWh" },
      { label: "Panels", value: "About 15" },
      { label: "STCs (2026 install)", value: "About 45" },
    ],
    bodyHiddenOnLive: false,
  },
  {
    slug: "7-7kw-solar-system-wa",
    category: "residential",
    kind: "detail",
    title: "7.7kW Solar System",
    summary:
      "For growing families using about 20–30 kWh a day, often with afternoon air conditioning.",
    image: "products-6-6kw-solar-system-wa",
    banner: {
      desktop: "products-6-6kw-solar-system-wa",
      mobile: "products-6-6kw-solar-system-wa",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "7.7kW Solar System Perth | For Families & Air Con",
      description:
        "A 7.7kW system suits growing families and afternoon air conditioning. About 30–34 kWh a day. See inclusions, warranties and pricing.",
    },
    tags: ["7.7kW"],
    specs: [
      { label: "Panels", value: "About 17–18 × 440 W" },
      { label: "Average daily output in Perth", value: "About 30–34 kWh" },
      {
        label: "STCs if installed in 2026",
        value: "About 53 (about 42 in 2027)",
      },
      { label: "Typical household", value: "Growing family, 20–30 kWh a day" },
    ],
    fit: {
      suits: [
        "Your family uses about 20–30 kWh a day",
        "You run air conditioning in the afternoon",
        "You want about 17% more output than a 6.6kW system",
      ],
      consider: [
        "Your use is under about 20 kWh a day (look at 6.6kW)",
        "You have a pool, home office or EV (look at 10kW)",
        "Your roof is small or shaded",
      ],
    },
    compare: [
      {
        label: "Compare the 6.6kW system",
        href: "/residential-solar/6-6kw-solar-system-wa/",
      },
      {
        label: "Compare the 10kW system",
        href: "/residential-solar/10kw-solar-system-wa/",
      },
      { label: "Add a battery", href: "/solar-battery/" },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Who is a 7.7kW system best for?",
        answer:
          "Growing families using about 20–30 kWh a day, often with afternoon air conditioning.",
      },
      {
        layer: "beginner",
        question: "Is 7.7kW much better than 6.6kW?",
        answer:
          "It produces about 17% more power, which helps homes with higher daytime use.",
      },
      {
        layer: "cost",
        question: "How much does a 7.7kW system cost?",
        answer:
          "It depends on the equipment, roof and switchboard. The quote includes an STC discount of about 53 certificates for 2026 installations.",
      },
      {
        layer: "cost",
        question: "Why is 7.7kW only a little more than 6.6kW?",
        answer:
          "Fixed costs such as labour and paperwork are shared, so the extra panels cost less per kW.",
      },
      {
        layer: "technical",
        question: "How much power does a 7.7kW system produce?",
        answer: "About 30–34 kWh a day on average in Perth.",
      },
      {
        layer: "technical",
        question: "How many panels does it use?",
        answer: "About 17–18 panels at 440 W.",
      },
      {
        layer: "installation",
        question: "How long does it take to install?",
        answer: "Usually one day on a single-storey home.",
      },
      {
        layer: "installation",
        question: "Will my switchboard need an upgrade?",
        answer:
          "Some older homes do. We check a switchboard photo before quoting.",
      },
      {
        layer: "support",
        question: "What warranty applies?",
        answer: WORKMANSHIP,
      },
      {
        layer: "support",
        question: "What maintenance does it need?",
        answer: "An annual clean and a periodic inspection.",
      },
      {
        layer: "location",
        question: "Can a 7.7kW system run my air conditioner?",
        answer:
          "On sunny afternoons it can cover much of a typical split or ducted system's running.",
      },
      {
        layer: "location",
        question: "Is 7.7kW allowed on single-phase power?",
        answer:
          "Yes. Since 1 May 2026 larger systems can connect on single phase, subject to retailer settings.",
      },
      {
        layer: "quote",
        question: "How do I choose between 6.6kW and 7.7kW?",
        answer:
          "Send your bill and we will model both. Read [6.6kW vs 7.7kW](/6-6kw-solar-system-vs-7-7kw-solar-system-which-is-better/).",
      },
      {
        layer: "quote",
        question: "Can I add a battery?",
        answer: "Yes. Ask for a battery-ready hybrid inverter in your quote.",
      },
    ],
    bodyFile: "7-7kw-solar-system-wa.md",
    keyFacts: [
      { label: "Average daily output", value: "30–34 kWh" },
      { label: "Panels", value: "About 17–18" },
      { label: "STCs (2026 install)", value: "About 53" },
    ],
    bodyHiddenOnLive: false,
  },
  {
    slug: "10kw-solar-system-wa",
    category: "residential",
    kind: "detail",
    title: "10kW Solar System",
    heading: "10kW Solar System for Larger Homes",
    summary:
      "For larger households using about 25–40 kWh a day, often with a pool, home office or ducted air conditioning.",
    image: "products-10kw-solar-system-3",
    banner: {
      desktop: "banners-10kw-solar-system-1",
      mobile: "banners-10kw-solar-system-2",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "10kW Solar System Perth | Output, Price & Roof Size",
      description:
        "A 10kW system averages 40–44 kWh a day in Perth. Ideal for larger homes, pools and home offices. Battery-ready options available.",
    },
    tags: ["10kW"],
    specs: [
      { label: "Panels", value: "About 23 × 440 W" },
      { label: "Roof area needed", value: "About 46–50 m²" },
      {
        label: "Average daily output in Perth",
        value: "About 40–44 kWh (about 55–62 in summer, 25–32 in winter)",
      },
      {
        label: "STCs if installed in 2026",
        value: "About 69 (about 55 in 2027)",
      },
      {
        label: "Typical household",
        value: "4–5 people, pool or home office, 25–40 kWh a day",
      },
    ],
    fit: {
      suits: [
        "Your household uses about 25–40 kWh a day",
        "You run a pool pump, home office or ducted air conditioning",
        "You may add a battery later",
      ],
      consider: [
        "You are out all day with low use (look at 6.6kW or 7.7kW)",
        "You charge an EV or want a 13 kWh+ battery (look at 13.2kW)",
        "Your roof has less than about 46 m² of good space",
      ],
    },
    compare: [
      {
        label: "Compare the 7.7kW system",
        href: "/residential-solar/7-7kw-solar-system-wa/",
      },
      {
        label: "Compare the 13.2kW system",
        href: "/residential-solar/13-2kw-solar-system/",
      },
      { label: "Add a battery", href: "/solar-battery/" },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Who should consider a 10kW system?",
        answer:
          "Larger households using about 25–40 kWh a day, often with a pool, home office or ducted air conditioning.",
      },
      {
        layer: "beginner",
        question: "Is 10kW too big for my home?",
        answer:
          "Not if you use power during the day or plan a battery. If you are out all day with low use, a smaller system may suit better.",
      },
      {
        layer: "cost",
        question: "How much does a 10kW system cost in Perth?",
        answer:
          "It depends on the equipment, roof and switchboard. The quote includes about 69 STCs for 2026 installations.",
      },
      {
        layer: "cost",
        question: "Is a 10kW system better value per kW?",
        answer:
          "Usually yes, because fixed installation costs are spread over more panels.",
      },
      {
        layer: "technical",
        question: "How much power does a 10kW system produce?",
        answer:
          "About 40–44 kWh a day on average in Perth, from about 55–62 kWh in summer to 25–32 kWh in winter.",
      },
      {
        layer: "technical",
        question: "How much roof space do I need?",
        answer: "About 46–50 m² of usable, unshaded roof for around 23 panels.",
      },
      {
        layer: "installation",
        question: "Can a 10kW system go on single-phase power?",
        answer: CONNECTION_RULES,
      },
      {
        layer: "installation",
        question: "How long does installation take?",
        answer: "One to two days, depending on roof type and access.",
      },
      {
        layer: "support",
        question: "What warranties apply?",
        answer: WORKMANSHIP,
      },
      {
        layer: "support",
        question: "How do I monitor performance?",
        answer:
          "Through the inverter app, with alerts for faults or low output.",
      },
      {
        layer: "location",
        question: "How does a 10kW system work with DEBS?",
        answer:
          "Exports earn 10c/kWh from 3pm to 9pm and 2c at other times, so using solar at home or storing it gives the best value.",
      },
      {
        layer: "location",
        question: "Will Emergency Solar Management affect me?",
        answer:
          "It is a rare, short, last-resort measure. Your system stays connected and normally operates as usual.",
      },
      {
        layer: "quote",
        question: "How do I know if 10kW or 13.2kW suits me?",
        answer:
          "Send your bill and we will price both. Read our [10kW vs 13.2kW guide](/10kw-vs-13-2kw-solar-system/).",
      },
      {
        layer: "quote",
        question: "What should I send for a quote?",
        answer: "A recent bill, a switchboard photo and your address.",
      },
    ],
    bodyFile: "10kw-solar-system-wa.md",
    keyFacts: [
      { label: "Average daily output", value: "40–44 kWh" },
      { label: "Panels", value: "About 23" },
      { label: "Roof area", value: "46–50 m²" },
      { label: "STCs (2026 install)", value: "About 69" },
    ],
    bodyHiddenOnLive: false,
  },
  {
    slug: "13-2kw-solar-system",
    category: "residential",
    kind: "detail",
    title: "13.2kW Solar System",
    summary:
      "For high-use homes over 40 kWh a day, or homes with an EV, a large battery or all-electric appliances.",
    image: "products-13-2kw-solar-system-3",
    banner: {
      desktop: "banners-13-2kw-solar-system-wa",
      mobile: "banners-13-2kw-solar-system-wa-2",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "13.2kW Solar System Perth | For EVs & High Use",
      description:
        "Our largest home package: about 52–58 kWh a day for EV charging, batteries and all-electric homes. Check roof, phase and export options.",
    },
    tags: ["13.2kW"],
    specs: [
      { label: "Panels", value: "About 30 × 440 W" },
      { label: "Roof area needed", value: "About 60–65 m²" },
      { label: "Average daily output in Perth", value: "About 52–58 kWh" },
      {
        label: "STCs if installed in 2026",
        value: "About 91 (about 72 in 2027)",
      },
      { label: "Phase", value: "Single or three phase; we check your supply" },
      {
        label: "Typical household",
        value: "5+ people, EV, battery or all-electric home",
      },
    ],
    fit: {
      suits: [
        "You use more than about 40 kWh a day",
        "You charge an EV at home or plan to",
        "You want a 13 kWh or larger battery that fills in winter",
      ],
      consider: [
        "Your use is 25–40 kWh a day (look at 10kW)",
        "Your roof has less than about 60 m² of good space",
        "Most extra output would export at 2c/kWh",
      ],
    },
    compare: [
      {
        label: "Compare the 10kW system",
        href: "/residential-solar/10kw-solar-system-wa/",
      },
      { label: "Add a battery", href: "/solar-battery/" },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Who is a 13.2kW system for?",
        answer:
          "High-use homes using over 40 kWh a day, or homes with an EV, large battery or all-electric appliances.",
      },
      {
        layer: "beginner",
        question: "Is 13.2kW the largest home system you install?",
        answer:
          "It is our largest standard package. Larger systems can be designed on request.",
      },
      {
        layer: "cost",
        question: "How much does a 13.2kW system cost?",
        answer:
          "It depends on the equipment, roof, phase and switchboard. About 91 STCs apply for 2026 installations.",
      },
      {
        layer: "cost",
        question: "Does a bigger system pay back faster?",
        answer:
          "Only if you use or store most of the extra power. Exports before 3pm earn just 2c/kWh.",
      },
      {
        layer: "technical",
        question: "How much power does a 13.2kW system produce?",
        answer: "About 52–58 kWh a day on average in Perth.",
      },
      {
        layer: "technical",
        question: "How many panels and how much roof?",
        answer: "About 30 panels at 440 W, needing about 60–65 m² of roof.",
      },
      {
        layer: "installation",
        question: "Do I need three-phase power?",
        answer:
          "Not necessarily under the 2026 rules, but three phase can help balance large loads. We check your supply.",
      },
      {
        layer: "installation",
        question: "How long does installation take?",
        answer: "Usually two days.",
      },
      {
        layer: "support",
        question: "What warranty applies to a 13.2kW system?",
        answer: WORKMANSHIP,
      },
      {
        layer: "support",
        question: "Does a larger system need more maintenance?",
        answer:
          "Not much more, but more panels mean cleaning and inspections are worth scheduling.",
      },
      {
        layer: "location",
        question: "What export limit will my system have?",
        answer:
          "It depends on your retailer's settings and connection. Without remote management, exports are limited to 1.5 kW.",
      },
      {
        layer: "location",
        question: "Can I add a battery and claim the WA rebate?",
        answer:
          "Yes, with an approved battery, SAA-accredited installer and VPP enrolment.",
      },
      {
        layer: "quote",
        question: "How do I start?",
        answer:
          "Send your bill and future plans (EV, battery). [Get a quote](/get-a-quote/) or read [single vs three-phase solar](/single-phase-vs-three-phase-solar-wa/).",
      },
      {
        layer: "quote",
        question: "Can you design for my EV charger too?",
        answer: "Yes. Tell us your vehicle and daily driving.",
      },
    ],
    bodyFile: "13-2kw-solar-system.md",
    keyFacts: [
      { label: "Average daily output", value: "52–58 kWh" },
      { label: "Panels", value: "About 30" },
      { label: "Roof area", value: "60–65 m²" },
      { label: "STCs (2026 install)", value: "About 91" },
    ],
    bodyHiddenOnLive: false,
  },

  // ---------------------------------------------------------------- commercial
  {
    slug: "commercial-solar",
    category: "commercial",
    kind: "hub",
    title: "Commercial Solar",
    heading: "Commercial Solar for WA Businesses",
    summary:
      "Solar for WA warehouses, offices, retail and manufacturing, sized from your interval data, with ROI and finance options.",
    image: null,
    banner: null,
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Commercial Solar Perth | 30kW, 50kW & 100kW Systems",
      description:
        "Commercial solar for WA warehouses, offices, retail and manufacturing. Sized from interval data, with ROI and finance options.",
    },
    tags: ["30kW", "50kW", "100kW"],
    faqs: [
      {
        layer: "beginner",
        question: "Which businesses benefit most from solar?",
        answer:
          "Businesses with steady daytime use: warehouses, cold storage, manufacturing, retail, offices, schools, hospitality and farms.",
      },
      {
        layer: "beginner",
        question: "What system sizes do you install for businesses?",
        answer:
          "Standard packages of 30kW, 50kW and 100kW, plus custom designs.",
      },
      {
        layer: "cost",
        question: "How is commercial solar priced?",
        answer:
          "By system size, roof type, switchboard and network requirements, monitoring and access. STCs reduce the price for systems up to 100kW.",
      },
      {
        layer: "cost",
        question: "Can we finance commercial solar?",
        answer:
          "Yes. Options include cash, equipment finance, leasing and power purchase agreements. See [paying for commercial solar](/commercial-solar-finance-options-wa/).",
      },
      {
        layer: "technical",
        question: "How do you size a commercial system?",
        answer:
          "From 12 months of 30-minute interval data, matched to your roof area and daytime load.",
      },
      {
        layer: "installation",
        question: "Do commercial systems need network approval?",
        answer:
          "Systems above 30 kVA need a Western Power application and technical assessment.",
      },
      {
        layer: "installation",
        question: "Will installation disrupt our operations?",
        answer:
          "Most work happens on the roof during business hours. Final connection needs a short scheduled shutdown.",
      },
      {
        layer: "location",
        question: "Do you install commercial solar in Wangara and nearby?",
        answer:
          "Yes. We are based in Wangara and install across Perth's northern industrial areas. See [commercial solar for warehouses in north Perth](/commercial-solar-warehouses-perth-north/).",
      },
      {
        layer: "quote",
        question: "How do we get a commercial proposal?",
        answer:
          "Send recent bills and interval data. Read our [commercial solar ROI guide](/commercial-solar-roi-wa/) first.",
      },
    ],
    bodyFile: "commercial-solar.md",
    keyFacts: [],
    hubIntroOverride: null,
    bodyHiddenOnLive: true,
  },
  {
    slug: "30kw-solar-system",
    category: "commercial",
    kind: "detail",
    title: "30kW Solar System",
    heading: "30kW Commercial Solar System",
    summary:
      "For offices, clinics, small workshops and retail using about 150–300 kWh on a weekday.",
    image: "products-30kw-solar-system-3",
    banner: {
      desktop: "banners-30kw-solar-system",
      mobile: "banners-30kw-solar-system-2",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "30kW Commercial Solar System | Perth & WA",
      description:
        "A 30kW system produces about 130 kWh a day. Suits offices, clinics and small workshops, and can fit the standard 30 kVA connection.",
    },
    tags: ["30kW"],
    specs: [
      { label: "Panels", value: "About 68 × 440 W" },
      { label: "Roof area needed", value: "About 150–170 m²" },
      { label: "Average daily output in Perth", value: "About 130 kWh" },
      { label: "Annual output", value: "About 48,000 kWh" },
      { label: "STCs if installed in 2026", value: "About 207" },
      {
        label: "Network connection",
        value: "Can fit within the 30 kVA standard connection",
      },
      {
        label: "Typical business",
        value: "Offices, clinics, small workshops, retail",
      },
    ],
    fit: {
      suits: [
        "Your business uses about 150–300 kWh on a weekday",
        "Your weekday daytime load averages around 15 kW",
        "You want a simpler connection under the 30 kVA standard",
      ],
      consider: [
        "Your daytime load averages 20–30 kW (look at 50kW)",
        "You close on weekends and most output would export",
        "You have a large roof and heavy daytime use (look at 100kW)",
      ],
    },
    compare: [
      {
        label: "Compare the 50kW system",
        href: "/commercial-solar/50kw-solar-system/",
      },
      { label: "Commercial solar ROI", href: "/commercial-solar-roi-wa/" },
      {
        label: "Finance options",
        href: "/commercial-solar-finance-options-wa/",
      },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Which businesses suit a 30kW system?",
        answer:
          "Offices, clinics, small workshops and retail using about 150–300 kWh on a weekday.",
      },
      {
        layer: "beginner",
        question: "Can a home use a 30kW system?",
        answer:
          "Rarely. It is designed for business loads, though large rural homes may consider it.",
      },
      {
        layer: "cost",
        question: "How much does a 30kW system cost?",
        answer:
          "It depends on the roof, switchboard and access. About 207 STCs apply for 2026 installations.",
      },
      {
        layer: "cost",
        question: "What is a typical payback?",
        answer:
          "It depends on self-consumption and tariff. Sites using most solar on site often see short paybacks.",
      },
      {
        layer: "technical",
        question: "How much does a 30kW system produce?",
        answer:
          "About 130 kWh a day, or 48,000 kWh a year, on average in Perth.",
      },
      {
        layer: "technical",
        question: "How much roof space is needed?",
        answer: "About 150–170 m² for around 68 panels.",
      },
      {
        layer: "installation",
        question: "Does 30kW need a Western Power application?",
        answer:
          "A system up to 30 kVA can often connect under the standard connection introduced on 1 May 2026.",
      },
      {
        layer: "installation",
        question: "How long does it take to install?",
        answer: "Usually two to three days.",
      },
      {
        layer: "support",
        question: "What monitoring is included?",
        answer:
          "Online monitoring with fault alerts, shared with our team if you choose.",
      },
      {
        layer: "support",
        question: "What warranty applies?",
        answer: WORKMANSHIP,
      },
      {
        layer: "location",
        question: "What buyback rate applies to business exports?",
        answer:
          "It depends on your retailer arrangement. We check this before estimating savings.",
      },
      {
        layer: "location",
        question: "Can we add a battery later?",
        answer:
          "Yes, if the design allows. Ask for a battery-ready configuration.",
      },
      {
        layer: "quote",
        question: "What do you need to quote?",
        answer:
          "12 months of bills or interval data, your address and roof access details. Compare sizes in [30kW vs 50kW vs 100kW](/30kw-vs-50kw-vs-100kw-commercial-solar/).",
      },
      {
        layer: "quote",
        question: "Do you offer a site visit?",
        answer: "Yes, free for commercial enquiries.",
      },
    ],
    bodyFile: "30kw-solar-system.md",
    keyFacts: [
      { label: "Average daily output", value: "About 130 kWh" },
      { label: "Panels", value: "About 68" },
      { label: "Roof area", value: "150–170 m²" },
      { label: "STCs (2026 install)", value: "About 207" },
    ],
    bodyHiddenOnLive: false,
  },
  {
    slug: "50kw-solar-system",
    category: "commercial",
    kind: "detail",
    title: "50kW Solar System",
    heading: "50kW Commercial Solar System",
    summary:
      "For larger workshops, gyms, supermarkets, schools and sites with refrigeration or all-day air conditioning.",
    image: "products-50kw-solar-system-3",
    banner: {
      desktop: "banners-50kw-solar-system",
      mobile: "banners-50kw-solar-system-2",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "50kW Commercial Solar System | Perth & WA",
      description:
        "About 220 kWh a day for workshops, supermarkets, gyms and schools. Design, Western Power approval and installation handled.",
    },
    tags: ["50kW"],
    specs: [
      { label: "Panels", value: "About 114 × 440 W" },
      { label: "Roof area needed", value: "About 250–280 m²" },
      { label: "Average daily output in Perth", value: "About 220 kWh" },
      { label: "Annual output", value: "About 80,000 kWh" },
      { label: "STCs if installed in 2026", value: "About 345" },
      {
        label: "Network connection",
        value: "Western Power application required",
      },
      {
        label: "Typical business",
        value: "Larger workshops, gyms, supermarkets, schools",
      },
    ],
    fit: {
      suits: [
        "Your weekday daytime load averages 20–30 kW",
        "You run refrigeration, compressors or all-day air conditioning",
        "You have about 250–280 m² of usable roof",
      ],
      consider: [
        "Your daytime load averages around 15 kW (look at 30kW)",
        "Your daytime load averages 40–50 kW (look at 100kW)",
        "You close on weekends and would export a lot",
      ],
    },
    compare: [
      {
        label: "Compare the 30kW system",
        href: "/commercial-solar/30kw-solar-system/",
      },
      {
        label: "Compare the 100kW system",
        href: "/commercial-solar/100kw-solar-system/",
      },
      { label: "Commercial solar ROI", href: "/commercial-solar-roi-wa/" },
      {
        label: "Finance options",
        href: "/commercial-solar-finance-options-wa/",
      },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Which businesses suit a 50kW system?",
        answer:
          "Larger workshops, gyms, supermarkets, schools and sites with refrigeration or all-day air conditioning.",
      },
      {
        layer: "beginner",
        question: "Is 50kW too big for us?",
        answer:
          "Not if your weekday daytime load averages 20–30 kW. We check this from interval data.",
      },
      {
        layer: "cost",
        question: "How much does a 50kW system cost?",
        answer:
          "It depends on the roof, switchboard, access and network requirements. About 345 STCs apply for 2026 installations.",
      },
      {
        layer: "cost",
        question: "What extra costs might apply?",
        answer:
          "Western Power application costs, switchboard upgrades or roof safety equipment, quoted upfront.",
      },
      {
        layer: "technical",
        question: "How much does a 50kW system produce?",
        answer: "About 220 kWh a day, or 80,000 kWh a year, on average.",
      },
      {
        layer: "technical",
        question: "How much roof area is needed?",
        answer: "About 250–280 m².",
      },
      {
        layer: "installation",
        question: "What approvals are needed?",
        answer:
          "A Western Power application and technical assessment, which may set an export limit.",
      },
      {
        layer: "installation",
        question: "How long does installation take?",
        answer:
          "Installation itself takes three to five days, after network approval.",
      },
      {
        layer: "support",
        question: "Is roof leak cover included?",
        answer:
          "Our 5-year workmanship warranty covers the roof penetrations we make.",
      },
      {
        layer: "location",
        question: "Do you install 50kW systems on metal industrial roofs?",
        answer:
          "Yes. Kliplok, Trimdek and similar profiles are common in Perth's industrial areas.",
      },
      {
        layer: "location",
        question: "What about asbestos roofs?",
        answer: "These need specialist advice before any solar work.",
      },
      {
        layer: "quote",
        question: "How do we start?",
        answer:
          "Request a site assessment and share interval data. See [warehouse solar in north Perth](/commercial-solar-warehouses-perth-north/).",
      },
      {
        layer: "quote",
        question: "Can you provide a business case?",
        answer: "Yes, with output, savings and payback estimates.",
      },
    ],
    bodyFile: "50kw-solar-system.md",
    keyFacts: [
      { label: "Average daily output", value: "About 220 kWh" },
      { label: "Panels", value: "About 114" },
      { label: "Roof area", value: "250–280 m²" },
      { label: "STCs (2026 install)", value: "About 345" },
    ],
    bodyHiddenOnLive: false,
  },
  {
    slug: "100kw-solar-system",
    category: "commercial",
    kind: "detail",
    title: "100kW Solar System",
    heading: "100kW Commercial Solar System",
    summary:
      "For warehouses, cold stores, manufacturers and large retail with heavy daytime loads and large roofs.",
    image: "products-100kw-solar-system-2",
    banner: {
      desktop: "banners-100kw-solar-system",
      mobile: "banners-100kw-solar-system-1",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "100kW Commercial Solar System | Perth & WA",
      description:
        "The largest STC-eligible size: about 440 kWh a day for warehouses, cold stores and manufacturers. Business case and finance options.",
    },
    tags: ["100kW"],
    specs: [
      { label: "Panels", value: "About 227 × 440 W" },
      { label: "Roof area needed", value: "About 500–560 m²" },
      { label: "Average daily output in Perth", value: "About 440 kWh" },
      { label: "Annual output", value: "About 160,000 kWh" },
      { label: "STCs if installed in 2026", value: "About 691" },
      {
        label: "Network connection",
        value: "Western Power application required",
      },
      {
        label: "Typical business",
        value: "Warehouses, cold storage, manufacturing, large retail",
      },
    ],
    fit: {
      suits: [
        "Your weekday daytime load averages 40–50 kW or more",
        "You have about 500–560 m² of usable roof",
        "You want the largest STC-eligible system",
      ],
      consider: [
        "Your daytime load averages 20–30 kW (look at 50kW)",
        "You close on weekends and export limits apply",
        "Your roof needs repairs or an engineering check first",
      ],
    },
    compare: [
      {
        label: "Compare the 50kW system",
        href: "/commercial-solar/50kw-solar-system/",
      },
      { label: "Commercial solar ROI", href: "/commercial-solar-roi-wa/" },
      {
        label: "Finance options",
        href: "/commercial-solar-finance-options-wa/",
      },
    ],
    faqs: [
      {
        layer: "beginner",
        question: "Who needs a 100kW system?",
        answer:
          "Warehouses, cold stores, manufacturers and large retail with heavy daytime loads and large roofs.",
      },
      {
        layer: "beginner",
        question: "Is 100kW the biggest system you install?",
        answer:
          "It is our largest standard package and the largest STC-eligible size. Larger systems can be designed.",
      },
      {
        layer: "cost",
        question: "How much does a 100kW system cost?",
        answer:
          "It depends on the roof, switchboard, access and network requirements. About 691 STCs apply for 2026 installations.",
      },
      {
        layer: "cost",
        question: "How can we fund it?",
        answer:
          "Cash, equipment finance, leasing or a power purchase agreement. See our [finance guide](/commercial-solar-finance-options-wa/).",
      },
      {
        layer: "technical",
        question: "How much power does 100kW produce?",
        answer:
          "About 440 kWh a day, or 160,000 kWh a year, on average in Perth.",
      },
      {
        layer: "technical",
        question: "How much roof space is needed?",
        answer: "About 500–560 m² for roughly 227 panels.",
      },
      {
        layer: "installation",
        question: "What approval does 100kW need?",
        answer:
          "A Western Power application and assessment; export limits are common at this size.",
      },
      {
        layer: "installation",
        question: "Will the roof need an engineering check?",
        answer: "Often yes, especially on older buildings.",
      },
      {
        layer: "support",
        question: "How long will the system last?",
        answer:
          "Panels are typically warranted for 25–30 years of performance; plan for inverter replacement during that time.",
      },
      {
        layer: "location",
        question: "Is 100kW eligible for STCs?",
        answer:
          "Yes. Systems up to 100kW can create STCs; larger systems use a different certificate scheme.",
      },
      {
        layer: "quote",
        question: "How do we get a 100kW proposal?",
        answer:
          "Share 12 months of interval data and [book a site visit](/get-a-quote/).",
      },
      {
        layer: "quote",
        question: "Can you model savings with a battery?",
        answer:
          "Yes. We can compare solar-only and solar plus battery scenarios.",
      },
    ],
    bodyFile: "100kw-solar-system.md",
    keyFacts: [
      { label: "Average daily output", value: "About 440 kWh" },
      { label: "Panels", value: "About 227" },
      { label: "Roof area", value: "500–560 m²" },
      { label: "STCs (2026 install)", value: "About 691" },
    ],
    bodyHiddenOnLive: false,
  },

  // ---------------------------------------------------------------- battery
  {
    slug: "solar-battery",
    category: "battery",
    kind: "hub",
    title: "Solar Battery",
    heading: "Home Solar Batteries in Perth",
    summary:
      "Store your daytime solar for the evening, with the WA rebate and federal discount, backup options and VPP setup.",
    image: null,
    banner: null,
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Solar Batteries Perth | Home Battery Installation WA",
      description:
        "Store your solar for the evening. Approved home batteries with WA rebate and federal discount, backup options and VPP setup.",
    },
    tags: ["battery"],
    faqs: [
      {
        layer: "beginner",
        question: "What does a solar battery do?",
        answer:
          "It stores surplus solar from the day so you can use it in the evening and overnight instead of buying grid power.",
      },
      {
        layer: "beginner",
        question: "Do I need solar to get a battery?",
        answer:
          "For the rebates and real savings, yes. Batteries are designed to charge from rooftop solar.",
      },
      {
        layer: "cost",
        question: "How much does a home battery cost?",
        answer:
          "It depends on capacity, brand and backup needs. WA and federal support reduce the upfront cost, and your quote shows each one separately.",
      },
      {
        layer: "cost",
        question: "What rebates are available?",
        answer:
          "The WA Residential Battery Scheme rebate (up to $1,300 for Synergy or $3,800 for Horizon Power customers) plus the federal Cheaper Home Batteries discount.",
      },
      {
        layer: "technical",
        question: "What size battery do I need?",
        answer:
          "Many homes suit 10–14 kWh of usable capacity, based on evening use and solar surplus. See our [battery sizing guide](/what-size-solar-battery-wa/).",
      },
      {
        layer: "technical",
        question: "Can a battery work with my existing solar?",
        answer:
          "Usually yes, using AC coupling or a hybrid inverter. See [adding a battery to existing solar](/add-battery-to-existing-solar-perth/).",
      },
      {
        layer: "installation",
        question: "How long does battery installation take?",
        answer: "Usually one day.",
      },
      {
        layer: "installation",
        question: "Who can install a rebate-eligible battery?",
        answer:
          "An installer with SAA Grid Connected Battery System accreditation, through a scheme-accredited vendor.",
      },
      {
        layer: "support",
        question: "How long do batteries last?",
        answer:
          "Most carry about a 10-year warranty, with conditions on retained capacity or energy throughput.",
      },
      {
        layer: "support",
        question: "Will I get backup in a blackout?",
        answer:
          "Only if the system is designed for backup. Tell us at quote stage. See [battery backup in a blackout](/solar-battery-blackout-backup-perth/).",
      },
      {
        layer: "location",
        question: "Do I have to join a VPP?",
        answer:
          "Yes, to claim the WA state rebate or loan. The federal discount does not require it.",
      },
      {
        layer: "location",
        question: "Do batteries earn DEBS export rates?",
        answer:
          "Yes. Battery exports earn the same time-based DEBS rates as solar.",
      },
      {
        layer: "quote",
        question: "How do I get a battery quote?",
        answer:
          "Send a recent bill or Synergy interval data. [Get a battery quote](/get-a-quote/).",
      },
    ],
    bodyFile: "solar-battery.md",
    keyFacts: [],
    hubIntroOverride: null,
    bodyHiddenOnLive: true,
  },
  {
    slug: "wa-residential-battery-rebates",
    category: "battery",
    kind: "detail",
    title: "WA Residential Battery Rebates",
    heading: "WA Residential Battery Scheme: Rebates and Loans",
    summary:
      "The WA state rebate (up to $1,300 for Synergy or $3,800 for Horizon Power customers), the federal discount and no-interest loans.",
    image: "products-wa-residential-battery-rebates",
    banner: {
      desktop: "products-wa-residential-battery-rebates",
      mobile: "products-wa-residential-battery-rebates",
    },
    // Facts sheet, checked October 2026 (rebate wording approved in the handover).
    highlights: [
      "Up to $1,300 for Synergy customers",
      "Up to $3,800 for Horizon Power customers",
    ],
    bodyImages: ["products-wa-residential-battery-rebates-2"],
    seo: {
      title: "WA Battery Rebate 2026 | Synergy & Horizon Power",
      description:
        "WA state rebate up to $1,300 (Synergy) or $3,800 (Horizon Power), plus the federal discount and no-interest loans. Check eligibility.",
    },
    tags: ["battery", "rebates"],
    faqs: [
      {
        layer: "beginner",
        question: "What is the WA Residential Battery Scheme?",
        answer:
          "A WA Government program offering rebates and optional no-interest loans for eligible households installing a home battery.",
      },
      {
        layer: "beginner",
        question: "Who runs the scheme?",
        answer:
          "Energy Policy WA, with Plenti appointed as scheme administrator and loan provider.",
      },
      {
        layer: "cost",
        question: "How much is the WA battery rebate?",
        answer:
          "$130 per usable kWh for Synergy customers, up to $1,300; $380 per kWh for Horizon Power customers, up to $3,800. The cap applies at 10 kWh.",
      },
      {
        layer: "cost",
        question: "Can I combine it with the federal discount?",
        answer:
          "Yes. The state rebate is in addition to the federal Cheaper Home Batteries discount, which depends on battery size and install date.",
      },
      {
        layer: "technical",
        question: "Which batteries are eligible?",
        answer:
          "New, VPP-capable batteries on the Synergy or Horizon Power supported list.",
      },
      {
        layer: "technical",
        question: "Does a bigger battery get a bigger WA rebate?",
        answer: "No. The state rebate is capped at 10 kWh of usable capacity.",
      },
      {
        layer: "installation",
        question: "How do I apply?",
        answer:
          "Your accredited vendor creates the rebate application in the Plenti portal; if you want a loan, you apply with Plenti online.",
      },
      {
        layer: "installation",
        question: "What must happen after installation?",
        answer:
          "The battery is commissioned and enrolled in an approved VPP before the rebate is paid.",
      },
      {
        layer: "support",
        question: "Does joining a VPP affect my battery warranty?",
        answer:
          "VPP use is designed to sit within normal battery operation. Check your battery's warranty terms.",
      },
      {
        layer: "support",
        question: "Can I leave the VPP?",
        answer:
          "Check the scheme terms first; leaving early may affect rebate conditions.",
      },
      {
        layer: "location",
        question: "Why do Horizon Power customers get more?",
        answer:
          "Regional energy and installation costs are higher, so the rebate is larger.",
      },
      {
        layer: "location",
        question: "Is the loan available to everyone?",
        answer:
          "No. Household gross income must be under $210,000 and loans are credit-assessed. The rebate is not income-tested.",
      },
      {
        layer: "quote",
        question: "How do I claim the rebate with Exchange Power?",
        answer:
          "[Get a battery quote](/get-a-quote/) and we help with the application. Read about the [no-interest loan](/wa-battery-scheme-no-interest-loan/).",
      },
      {
        layer: "quote",
        question: "When does the scheme close?",
        answer:
          "It runs while funding lasts. Check with us for current availability.",
      },
    ],
    bodyFile: "wa-residential-battery-rebates.md",
    keyFacts: [
      { label: "Synergy customers", qualifier: "Up to", value: "$1,300" },
      { label: "Horizon Power customers", qualifier: "Up to", value: "$3,800" },
      { label: "Rebate cap", qualifier: "At", value: "10 kWh" },
      { label: "No-interest loan", qualifier: "Up to", value: "$10,000" },
      { label: "Household income", qualifier: "Under", value: "$210,000" },
      { label: "Loan term", qualifier: "Up to", value: "10 years" },
    ],
    bodyHiddenOnLive: false,
  },

  // ---------------------------------------------------------------- packages
  {
    slug: "solar-packages",
    category: "packages",
    kind: "hub",
    title: "Solar Packages",
    summary:
      "Fixed-price solar packages from 6.6kW to 100kW, with clear inclusions, warranties and the STC discount on every package.",
    image: null,
    banner: null,
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Solar Packages Perth | Fixed-Price Home & Business Solar",
      description:
        "Compare fixed-price solar packages from 6.6kW to 100kW. Clear inclusions, warranties and STC discount on every package.",
    },
    tags: ["pricing", "warranty"],
    faqs: [
      {
        layer: "beginner",
        question: "What is a solar package?",
        answer:
          "A pre-designed system with matched panels, inverter, mounting and installation at a fixed price for typical homes or businesses.",
      },
      {
        layer: "cost",
        question: "What does a package price include?",
        answer:
          "Equipment, standard installation, compliance paperwork, monitoring and the STC discount. Non-standard work, such as switchboard upgrades, is quoted separately.",
      },
      {
        layer: "cost",
        question: "Are package prices fixed?",
        answer:
          "Yes for standard installations. Complex roofs, two-storey access or upgrades may add cost, shown in writing before you sign.",
      },
      {
        layer: "technical",
        question: "Can I change the panels or inverter in a package?",
        answer:
          "Yes. We can swap to a different brand or a hybrid inverter and requote.",
      },
      {
        layer: "support",
        question: "Do packages have the same warranty as custom systems?",
        answer:
          "Yes. All installations include manufacturer warranties and our 5-year workmanship warranty.",
      },
      {
        layer: "quote",
        question: "Which package should I choose?",
        answer:
          "Compare sizes in our [solar cost guide](/solar-system-cost-perth/), then send your bill for a recommendation.",
      },
    ],
    bodyFile: "solar-packages.md",
    keyFacts: [],
    hubIntroOverride: null,
    bodyHiddenOnLive: true,
  },
  {
    slug: "solar-panel-installation-in-wa",
    category: "packages",
    kind: "detail",
    title: "Solar Panel Installation in WA",
    summary:
      "How our WA solar installation works: assessment, design, approvals, installation and support, for homes and businesses.",
    image: "products-solar-rebates-and-incentives-wa",
    banner: {
      desktop: "banners-solar-rebates-and-incentives-in-wa",
      mobile: "products-solar-rebates-and-incentives-wa",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Solar Panel Installation WA | Perth Solar Installers",
      description:
        "How our WA solar installation works: assessment, design, approvals, install and support, from a NETCC Approved Seller based in Wangara.",
    },
    tags: ["installation", "maintenance", "design"],
    faqs: [
      {
        layer: "beginner",
        question: "What does a solar installation include?",
        answer:
          "Site assessment, system design, approvals, installation, testing, commissioning, monitoring setup and handover documents.",
      },
      {
        layer: "beginner",
        question: "Do you install for homes and businesses?",
        answer: "Yes, from 6.6kW home systems to 100kW commercial systems.",
      },
      {
        layer: "technical",
        question: "What roof types can you install on?",
        answer:
          "Colorbond and metal sheeting, terracotta and concrete tile, and flat roofs with tilt frames. Asbestos roofs need specialist advice.",
      },
      {
        layer: "technical",
        question: "Will my switchboard need work?",
        answer:
          "Some older switchboards need upgrades or extra space. We check this before quoting.",
      },
      {
        layer: "installation",
        question: "What are the steps from quote to switch-on?",
        answer:
          "1. Bill and roof review. 2. Design and quote. 3. Network and retailer paperwork. 4. Installation day. 5. Testing and commissioning. 6. Handover and monitoring.",
      },
      {
        layer: "support",
        question: "What do I receive at handover?",
        answer:
          "Electrical compliance certificate, system diagram, warranty documents, monitoring login and shutdown instructions.",
      },
      {
        layer: "support",
        question: "Who do I call if something goes wrong?",
        answer: "Our local team on 08 6370 4963.",
      },
      {
        layer: "location",
        question: "Do you handle the May 2026 connection requirements?",
        answer:
          "Yes. We commission each system under the correct export arrangement for your retailer.",
      },
      {
        layer: "quote",
        question: "How do I book a site assessment?",
        answer:
          "[Book online](/get-a-quote/) or call us. Learn how [roof direction affects output](/roof-orientation-shading-solar-perth/).",
      },
    ],
    bodyFile: "solar-panel-installation-in-wa.md",
    keyFacts: [],
    bodyHiddenOnLive: false,
  },
  {
    slug: "solar-panel-installation-wangara",
    category: "packages",
    kind: "detail",
    title: "Solar Panel Installation Wangara",
    heading: "Solar Panel Installation in Wangara",
    summary:
      "Wangara-based solar and battery installers for homes and businesses in Perth's northern suburbs.",
    image: "products-solar-rebates-and-incentives-wa",
    banner: {
      desktop: "banners-solar-rebates-and-incentives-in-wa",
      mobile: "products-solar-rebates-and-incentives-wa",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Solar Installers Wangara | Local Solar Company",
      description:
        "Wangara-based solar and battery installers for homes and businesses in Perth's northern suburbs. Visit us at Prindiville Drive.",
    },
    tags: ["Wangara", "installer"],
    faqs: [
      {
        layer: "beginner",
        question: "Are you based in Wangara?",
        answer:
          "Yes. Our office is at 5/17 Prindiville Drive, Wangara WA 6065.",
      },
      {
        layer: "beginner",
        question: "Do you install residential and commercial solar in Wangara?",
        answer:
          "Yes, for homes in surrounding suburbs and businesses in the Wangara industrial area.",
      },
      {
        layer: "technical",
        question: "Are Wangara industrial roofs suitable for solar?",
        answer: "Most metal roofs are, after a structural and condition check.",
      },
      {
        layer: "support",
        question: "Do you provide local service after installation?",
        answer:
          "Yes. Our Wangara team handles service, warranty claims and inspections.",
      },
      {
        layer: "location",
        question: "Who is the electricity retailer in Wangara?",
        answer:
          "Synergy, on Perth's main grid. DEBS and the Synergy battery rebate apply.",
      },
      {
        layer: "quote",
        question: "How do I get a quote in Wangara?",
        answer:
          "[Book a free quote](/get-a-quote/) and we come to you, or call 08 6370 4963.",
      },
    ],
    bodyFile: "solar-panel-installation-wangara.md",
    keyFacts: [],
    bodyHiddenOnLive: false,
  },
  {
    slug: "solar-rebates-and-incentives-in-wa",
    category: "packages",
    kind: "detail",
    title: "Solar Rebates and Incentives in WA",
    summary:
      "Every solar and battery incentive in WA: the STC discount, the WA battery rebate, the federal battery discount and DEBS buyback.",
    image: "products-solar-rebates-and-incentives-wa",
    banner: {
      desktop: "banners-solar-rebates-and-incentives-in-wa",
      mobile: "products-solar-rebates-and-incentives-wa",
    },
    highlights: [],
    bodyImages: [],
    seo: {
      title: "Solar Rebates WA 2026 | STCs, Battery Rebate, DEBS",
      description:
        "Every solar and battery incentive in WA: STC discount, WA battery rebate, federal battery discount and DEBS buyback, checked October 2026.",
    },
    tags: ["rebates", "STC", "DEBS"],
    faqs: [
      {
        layer: "beginner",
        question: "What solar and battery incentives are available in WA?",
        answer:
          "The federal STC discount for solar, the federal Cheaper Home Batteries discount, the WA Residential Battery Scheme rebate and loan, and DEBS export payments.",
      },
      {
        layer: "cost",
        question: "How much is the solar STC discount in Perth?",
        answer:
          "About 45 STCs for a 6.6kW system installed in 2026, worth roughly $1,600–$1,800 depending on the STC price.",
      },
      {
        layer: "cost",
        question: "Is the discount taken off the price?",
        answer: "Yes. Most installers apply it upfront on the quote.",
      },
      {
        layer: "technical",
        question: "How are STCs calculated?",
        answer:
          "System size (kW) × Perth's Zone 3 rating (1.382) × the deeming years (5 in 2026, 4 in 2027).",
      },
      {
        layer: "installation",
        question: "Do I need an accredited installer to get rebates?",
        answer:
          "Yes. The system must be designed and installed by an SAA-accredited installer using approved products.",
      },
      {
        layer: "support",
        question: "Do rebates affect my warranty?",
        answer: "No. Warranties come from manufacturers and your installer.",
      },
      {
        layer: "location",
        question: "What does Synergy pay for exported solar?",
        answer:
          "Under DEBS, 10c/kWh from 3pm to 9pm and 2c/kWh at other times (rates from 1 July 2025, reviewed yearly).",
      },
      {
        layer: "location",
        question: "What changed on 1 May 2026?",
        answer:
          "New WA connection rules for inverters, and the federal battery discount became tiered by size and now steps down every six months.",
      },
      {
        layer: "quote",
        question: "How do I find out exactly what I can claim?",
        answer:
          "Send your address, retailer and bill and we will list every incentive for your system. Read [why the solar rebate drops in 2027](/solar-rebate-drop-january-2027-wa/).",
      },
    ],
    bodyFile: "solar-rebates-and-incentives-in-wa.md",
    keyFacts: [
      {
        label: "WA battery rebate (Synergy)",
        qualifier: "Up to",
        value: "$1,300",
      },
      {
        label: "WA battery rebate (Horizon Power)",
        qualifier: "Up to",
        value: "$3,800",
      },
      { label: "DEBS 3pm–9pm", value: "10c/kWh" },
      { label: "STCs, 6.6kW in 2026", qualifier: "About", value: "45" },
    ],
    bodyHiddenOnLive: false,
  },
];
