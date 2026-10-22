// About page copy (PLAN.md A5). Strings in `intro` and `text` are inline Markdown.
// Imported from the live site by scripts/import-content.mjs, then edited by hand.
// Copy is verbatim; see docs/CONTENT-NOTES.md for suggested fixes.

export const ABOUT = {
  // Title and description from the content handover (Page updates & SEO).
  seo: {
    title: "About Exchange Power | Wangara Solar Installers",
    description:
      "Meet the Exchange Power team in Wangara: our accreditations, licences, warranties and how we design and install solar in WA.",
  },
  title: "About Exchange Power",
  subtitle: "Trusted by Thousands. Recognised by Industry Leaders.",
  intro: [
    "Exchange Power is a trusted Australian solar energy provider who is committed to bringing quality solar and battery solutions to homes and businesses. The company believes that the switch should be simple, affordable, and stress-free when it comes to switching to solar. With a firm dedication to open communication, expert advice and best pricing policies, Exchange Power designs, installs and connects solar PV systems that are designed to suit the individual energy needs.",
    "Reducing electricity costs is a priority to many households and businesses. **[Exchange Power](/)** understands this and are focused on making customised solar solutions for long-term solar savings and performance. From the first consultation to the system’s activation, everything is taken care of in a professional and clear manner. Clients are updated on all of this to maintain confidence and peace of mind as they transition to renewable energy.",
    "Exchange Power uses technical know-how and customer orientation. Each project is carefully planned to maximize energy out, system efficiency and return on investment. By using top-quality components and experienced installers, the company ensures that every solar system operates efficiently and reliably for years to come.",
  ],
  why: {
    title: "Why Choose Exchange Power?",
    intro:
      "Exchange Power is not only an energy provider. It is a long-term business partner for sustainable energy solutions. The commitment to excellence, innovation and customer satisfaction makes Exchange Power a trusted choice for solar and battery systems throughout Australia.",
    items: [
      {
        title: "Expertise and Experience",
        text: "The team at Exchange Power possesses years of industry know-how and technical know-how. Skilled professionals create advanced solar solutions for specific energy needs. With a profound understanding of the solar industry the company provides high-performance systems with expert advice and professional installation.",
      },
      {
        title: "Comprehensive Solutions",
        text: "Exchange Power offers complete solar and battery storage solutions in one roof. Services are for residential, commercial, and industrial applications. Whether use a rooftop solar system for a family home or for a large-scale system for a commercial facility, every solution is planned with the ideal of not only addressing current demands but also considers the future energy needs.",
      },
      {
        title: "Quality Products",
        text: "Strong relationships with top manufacturers enable Exchange Power to offer high-quality solar panels, inverters, batteries and system parts. High-quality products guarantee durability and performance and offer long-term reliability. By giving priority to trusted brands and trusted technology the company safeguards each client’s investment.",
      },
      {
        title: "Energy Efficiency and Sustainability",
        text: "Solar energy helps to reduce the dependence on traditional fossil fuels and helps to curb the emission of carbon. Exchange Power systems take advantage of the sun’s energy to produce clean, renewable energy to help build a greener future. By opting for solar, clients will help to achieve environmental sustainability while gaining more control over usage.",
      },
      {
        title: "Customer-Centric Approach",
        text: "Customer satisfaction is at the heart of Exchange Power’s actions. Every project starts with the understanding of the client’s goals, energy usage and budget. From consultation and design to installation and post-installation support the team is with it through every stage. Clear communication and personalised service help to ensure a smooth and positive experience.",
      },
      {
        title: "Financial Benefits",
        text: "Investing in solar energy is a great way to save you money in the long run. Exchange Power offers competitive pricing, flexible payment options and helps with available rebates and incentives. With all of this in mind, the emphasis is on delivering maximum value and helping clients achieve a good return on investment. Solar power not only lowers energy bills but also offers value and financial stability to the property.",
      },
      {
        title: "Ongoing Support",
        text: "The commitment to clients doesn’t end after the installation is complete. Exchange Power provides ongoing maintenance and monitoring as well as technical support to ensure systems continue to operate optimally. Responsive service and reliable help provide the confidence that help is always there when it is needed.",
      },
    ],
  },
  statsTitle: "Our Solar Footprint - Making a Brighter Future",
  // The live site has these two texts under the wrong labels: the "Vision"
  // text describes the mission and vice versa. Labels swapped here; wording
  // unchanged (CONTENT-NOTES 5.4, fixed in Step 8).
  visionMission: [
    {
      title: "Our Vision",
      text: "Exchange Power’s vision is a future in which clean, renewable energy is available to everyone. The aim is to guide the renewable energy movement by the way energy is generated and used. Through ongoing innovation, advanced technology and uncompromising dedication to customer satisfaction, Exchange Power aims to build a brighter and more sustainable world – one solar installation at a time.",
    },
    {
      title: "Our Mission",
      text: "Exchange Power is focused on helping to shift the transition to clean and renewable energy across Australia. The mission make households and businesses powerful with solar power by using innovative, dependable and cost effective solutions. By providing high quality solar and battery systems, Exchange Power helps to reduce carbon footprint and create a more sustainable future for generations to come.",
    },
  ],
};

/**
 * About page FAQs (content handover, About set), built from confirmed details
 * in site.js only. Licence numbers and opening hours are added automatically
 * once they are set there; questions that need unconfirmed details (founding
 * year, review platform) are left out until then.
 *
 * @param {import("../lib/content-schema.js").SiteInfo} site
 * @param {string} abn Formatted ABN.
 * @returns {import("../lib/content-schema.js").Faq[]}
 */
export function aboutFaqs(site, abn) {
  const licences = [
    site.licences.saa
      ? `Solar Accreditation Australia (SAA) accreditation ${site.licences.saa}`
      : null,
    site.licences.electrical
      ? `WA electrical contractor licence ${site.licences.electrical}`
      : null,
  ].filter(Boolean);
  const brands = site.brands.map((b) => b.name);
  return [
    {
      layer: "beginner",
      question: "Who is Exchange Power?",
      answer:
        "A WA solar and battery installer based in Wangara, designing, installing and connecting systems for homes and businesses across Western Australia.",
    },
    {
      layer: "technical",
      question: "Which brands do you install?",
      answer: `Brands we install include ${brands.slice(0, -1).join(", ")} and ${brands.at(-1)}. Your quote names the exact panel, inverter and battery models.`,
    },
    {
      layer: "support",
      question: "What accreditations do you hold?",
      answer: [
        "We are a New Energy Tech Consumer Code (NETCC) Approved Seller.",
        licences.length ? `We also hold ${licences.join(" and ")}.` : null,
        `Our ABN is ${abn}.`,
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      layer: "support",
      question: "What is your workmanship warranty?",
      answer:
        "5 years on the whole system and our workmanship, on top of the manufacturers' product warranties. See our [terms and conditions](/terms-and-conditions/) for what it covers.",
    },
    {
      layer: "location",
      question: "Where are you located?",
      answer: [
        `${site.address.display.replace(", Australia", "")}. Phone ${site.phone.display}, email ${site.email}.`,
        site.openingHours ? `We're open ${site.openingHours.display}.` : null,
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      layer: "quote",
      question: "How do I check you're the right installer?",
      answer:
        "Read [how to choose a solar installer in Perth](/how-to-choose-solar-installer-perth/), then [get a free quote](/get-a-quote/) and check us against all ten points.",
    },
  ];
}
