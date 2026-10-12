import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductCardGrid } from "@/components/sections/ProductCardGrid";
import { Prose } from "@/components/sections/Prose";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getBackground } from "@/lib/content";

/**
 * Template for the four category hubs: the category's products first, then
 * the intro copy.
 *
 * @param {object} props
 * @param {ReturnType<typeof import("@/lib/product-pages.js").getHubPageData>} props.data
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function CategoryHub({ data, site }) {
  const { hub, breadcrumbs, products, introHtml } = data;
  const quote = { label: site.cta.quoteLabel, href: site.cta.quoteHref };
  const count = products.length;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground(`products/${hub.slug}`)}
        eyebrow="Exchange Power"
        title={hub.title}
        lead={`${count} ${count === 1 ? "option" : "options"} below. Choose one for details, figures and common questions.`}
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
