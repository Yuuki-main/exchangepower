import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { MediaSlot } from "@/components/sections/MediaSlot";
import { PageHeader } from "@/components/sections/PageHeader";
import { PostCardGrid } from "@/components/sections/PostCardGrid";
import { ProductSpecs } from "@/components/sections/ProductSpecs";
import { RatingBadge } from "@/components/sections/RatingBadge";
import { Prose } from "@/components/sections/Prose";
import { RelatedProducts } from "@/components/sections/RelatedProducts";
import { WarrantyCards } from "@/components/sections/WarrantyCards";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { WARRANTIES } from "@/content/warranties.js";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo";
import { getBackground } from "@/lib/content";

/** Service type for structured data, by category. */
const SERVICE_TYPES = {
  residential: "Residential solar installation",
  commercial: "Commercial solar installation",
  battery: "Home battery installation",
  packages: "Solar panel installation",
};

/**
 * Template for every product and service detail page. System-size pages
 * (those with `specs`) follow the standard order from the content handover:
 * summary, key specs, fit, body (inclusions, pricing and rebates, process),
 * warranties, compare links, related guides, FAQs and the quote CTA.
 *
 * @param {object} props
 * @param {NonNullable<ReturnType<typeof import("@/lib/product-pages.js").getProductPageData>>} props.data
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function ProductPage({ data, site }) {
  const { product, hubTitle, breadcrumbs, bodyHtml, related, guides } = data;
  const quote = { label: site.cta.quoteLabel, href: site.cta.quoteHref };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: product.title,
          description: product.seo.description,
          path: breadcrumbs[breadcrumbs.length - 1].href,
          serviceType: SERVICE_TYPES[product.category],
          ...(product.slug === "solar-panel-installation-wangara"
            ? { areaServed: ["Wangara", "Perth", "Western Australia"] }
            : {}),
        })}
      />
      {product.faqs.length ? (
        <JsonLd data={faqPageJsonLd(product.faqs)} />
      ) : null}

      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground(`products/${product.slug}`)}
        eyebrow={hubTitle}
        title={product.heading ?? product.title}
        lead={product.summary || undefined}
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
            <ProductSpecs
              title={product.title}
              specs={product.specs}
              fit={product.fit}
              compare={product.compare}
            />
            {/* The product's own image, once approved (PLAN Part C item 7). */}
            <MediaSlot
              imageKey={product.image}
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) 66vw, 100vw"
              className="mb-10 rounded-3xl ring-1 ring-border"
            />
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
              <RatingBadge summary={site.reviewSummary} className="mt-5" />
            </div>
          </aside>
        </div>
      </Section>

      {product.specs?.length ? <WarrantyCards {...WARRANTIES} /> : null}

      {guides.length ? (
        <Section background="muted" labelledBy="guides-title">
          <SectionIntro
            id="guides-title"
            eyebrow="Related guides"
            title="Read before you buy"
            size="lg"
          />
          <PostCardGrid
            posts={guides}
            headingLevel={3}
            surface="muted"
            className="reveal mt-10"
          />
        </Section>
      ) : null}

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
        background={getBackground("ctaBand")}
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={quote}
        phone={site.phone}
      />
    </>
  );
}
