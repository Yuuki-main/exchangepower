import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHeader } from "@/components/sections/PageHeader";
import { PostCardGrid } from "@/components/sections/PostCardGrid";
import { ProductCardGrid } from "@/components/sections/ProductCardGrid";
import { Prose } from "@/components/sections/Prose";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { getBackground } from "@/lib/content";

/**
 * Template for the four category hubs: the category's products first, then
 * the intro copy, related guides and the hub's FAQs.
 *
 * @param {object} props
 * @param {ReturnType<typeof import("@/lib/product-pages.js").getHubPageData>} props.data
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function CategoryHub({ data, site }) {
  const { hub, breadcrumbs, products, introHtml, guides } = data;
  const quote = { label: site.cta.quoteLabel, href: site.cta.quoteHref };
  const count = products.length;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {hub.faqs.length ? <JsonLd data={faqPageJsonLd(hub.faqs)} /> : null}
      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground(`products/${hub.slug}`)}
        eyebrow="Exchange Power"
        title={hub.heading ?? hub.title}
        lead={
          hub.summary ||
          `${count} ${count === 1 ? "option" : "options"} below. Choose one for details, figures and common questions.`
        }
      />

      <Section spacing="md" labelledBy="options-title">
        <SectionIntro
          id="options-title"
          eyebrow={hub.title}
          title="Choose an option"
          size="lg"
        />
        <ProductCardGrid products={products} className="reveal mt-10" />
      </Section>

      <Section background="muted" labelledBy="intro-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionIntro
            id="intro-title"
            eyebrow="Overview"
            title={`About ${hub.title.toLowerCase()}`}
            size="lg"
            className="lg:col-span-4"
          />
          <Prose html={introHtml} className="lg:col-span-8" />
        </div>
      </Section>

      {guides.length ? (
        <Section labelledBy="guides-title">
          <SectionIntro
            id="guides-title"
            eyebrow="Related guides"
            title="Read before you buy"
            size="lg"
          />
          <PostCardGrid
            posts={guides}
            headingLevel={3}
            className="reveal mt-10"
          />
        </Section>
      ) : null}

      {hub.faqs.length ? (
        <Section
          background={guides.length ? "muted" : "default"}
          labelledBy="faq-title"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <SectionIntro
              id="faq-title"
              eyebrow="Questions"
              title="Frequently asked questions"
              size="lg"
              className="lg:col-span-4"
            />
            <FaqList faqs={hub.faqs} className="lg:col-span-8" />
          </div>
        </Section>
      ) : null}

      <CtaBand
        background={getBackground("ctaBand")}
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={quote}
        phone={site.phone}
      />
    </>
  );
}
