import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { MediaSlot } from "@/components/sections/MediaSlot";
import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { RelatedProducts } from "@/components/sections/RelatedProducts";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

/**
 * Template for every product and service detail page.
 *
 * @param {object} props
 * @param {NonNullable<ReturnType<typeof import("@/lib/product-pages.js").getProductPageData>>} props.data
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function ProductPage({ data, site }) {
  const { product, hubTitle, breadcrumbs, bodyHtml, related } = data;
  const quote = { label: site.cta.quoteLabel, href: site.cta.quoteHref };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {product.faqs.length ? (
        <JsonLd data={faqPageJsonLd(product.faqs)} />
      ) : null}

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={hubTitle}
        title={product.title}
        actions={
          <>
            <Button href={quote.href} size="lg">
              {quote.label}
              <ArrowRightIcon size={18} />
            </Button>
            <Button href={site.phone.href} variant="ghost" size="lg">
              <PhoneIcon size={18} />
              {site.phone.display}
            </Button>
          </>
        }
        aside={
          product.keyFacts.length ? <KeyFacts facts={product.keyFacts} /> : null
        }
      />

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-8">
            <h2 id="overview-title" className="sr-only">
              About the {product.title}
            </h2>
            {product.bodyImages.map((key) => (
              <MediaSlot
                key={key}
                imageKey={key}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="mb-10 aspect-video"
              />
            ))}
            <Prose html={bodyHtml} />
          </article>
          <aside
            aria-label="Get a quote"
            className="lg:col-span-3 lg:col-start-10"
          >
            <div className="border-t-2 border-brand-900 pt-5 lg:sticky lg:top-28">
              <p className="font-display text-xl font-semibold text-brand-900">
                Get a quote
              </p>
              <p className="mt-2 text-foreground-muted">
                Tell us about your property and how you use power. We&apos;ll
                put it in a written quote.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={quote.href} fullWidth>
                  {quote.label}
                </Button>
                <Button href={site.phone.href} variant="ghost" fullWidth>
                  <PhoneIcon size={18} />
                  {site.phone.display}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {product.faqs.length ? (
        <Section labelledBy="faq-title" className="border-t border-border">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <SectionIntro
              id="faq-title"
              eyebrow="Questions"
              title="Frequently asked questions"
              size="lg"
              className="lg:col-span-4"
            />
            <FaqList faqs={product.faqs} className="lg:col-span-8" />
          </div>
        </Section>
      ) : null}

      <RelatedProducts products={related} />
      <CtaBand
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={quote}
        phone={site.phone}
      />
    </>
  );
}
