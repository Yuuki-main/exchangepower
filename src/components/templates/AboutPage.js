import { CtaBand } from "@/components/sections/CtaBand";
import { Credentials } from "@/components/sections/Credentials";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { renderMarkdown } from "@/lib/markdown";
import { getBackground } from "@/lib/content";

/**
 * About page: intro, the stats band, "Why choose" points, and Vision and
 * Mission.
 *
 * @param {object} props
 * @param {typeof import("@/content/about.js").ABOUT} props.about
 * @param {{ value: string, label: string, href?: string }[]} props.stats
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function AboutPage({ about, stats, site }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: about.title, href: "/about-exchange-power/" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground("about")}
        eyebrow="About us"
        title={about.title}
        lead={about.subtitle}
      />

      <Section labelledBy="about-intro-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionIntro
            id="about-intro-title"
            eyebrow="Who we are"
            title="Solar and battery systems, from first consultation to activation."
            size="lg"
            className="lg:col-span-4"
          />
          <Prose
            html={renderMarkdown(about.intro.join("\n\n"))}
            className="lg:col-span-8"
          />
        </div>
      </Section>

      <Credentials title={about.statsTitle} items={stats} />

      <WhyChoose
        eyebrow="Why choose us"
        title={about.why.title}
        lead={about.why.intro}
        items={about.why.items}
      />

      <Section labelledBy="vision-mission-title">
        <h2 id="vision-mission-title" className="sr-only">
          Vision and mission
        </h2>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {about.visionMission.map((item) => (
            <div
              key={item.title}
              className="reveal border-t-2 border-brand-900 pt-6"
            >
              <h3 className="font-display text-3xl font-semibold tracking-tight text-brand-900">
                {item.title}
              </h3>
              <p className="mt-4 text-lg text-foreground-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        background={getBackground("ctaBand")}
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={{ label: site.cta.quoteLabel, href: site.cta.quoteHref }}
        phone={site.phone}
      />
    </>
  );
}
