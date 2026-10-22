import { JsonLd } from "@/components/seo/JsonLd";
import { ContactMethods } from "@/components/sections/ContactMethods";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { RatingBadge } from "@/components/sections/RatingBadge";
import { Section } from "@/components/ui/Section";
import { CONTACT } from "@/content/contact.js";
import { CheckIcon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { getBackground } from "@/lib/content";

/**
 * Contact page: the quote form (the only client component) beside every
 * way to reach the team. Also used for /get-a-quote/ with its own copy and
 * a list of what to send.
 *
 * @param {object} props
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 * @param {{ eyebrow: string, title: string, lead: string, tips?: { title: string, items: string[], note: string } }} [props.copy]
 * @param {{ label: string, href: string }} [props.crumb] Last breadcrumb.
 * @param {string} [props.background] getBackground() name.
 */
export function ContactPage({
  site,
  copy = CONTACT,
  crumb = { label: "Contact", href: "/contact/" },
  background = "contact",
}) {
  const form = site.forms.quote;
  const breadcrumbs = [{ label: "Home", href: "/" }, crumb];
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground(background)}
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
      />
      <Section labelledBy="quote-form-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2
              id="quote-form-title"
              className="font-display text-3xl font-semibold tracking-tight text-brand-900"
            >
              {form.title}
            </h2>
            <p className="mt-2 mb-8 text-foreground-muted">
              Fields marked <span className="text-error-600">*</span> are
              required.
            </p>
            <QuoteForm
              enquiryTypes={form.enquiryTypes}
              submitLabel={form.submitLabel}
            />
          </div>
          <aside
            aria-labelledby="contact-details-title"
            className="lg:col-span-4 lg:col-start-9"
          >
            <h2
              id="contact-details-title"
              className="font-display text-3xl font-semibold tracking-tight text-brand-900"
            >
              Other ways to reach us
            </h2>
            <p className="mt-2 text-foreground-muted">
              Based in Wangara, installing across Western Australia.
            </p>
            <RatingBadge summary={site.reviewSummary} className="mt-4" />
            <ContactMethods site={site} tone="light" className="mt-6" />
            {copy.tips ? (
              <div className="mt-10 rounded-2xl bg-surface-muted p-6 ring-1 ring-border">
                <h3 className="font-display text-xl font-semibold text-brand-900">
                  {copy.tips.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {copy.tips.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckIcon
                        size={18}
                        className="mt-1 shrink-0 text-success-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-foreground-muted">
                  {copy.tips.note}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </>
  );
}
