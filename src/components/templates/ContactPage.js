import { ContactMethods } from "@/components/sections/ContactMethods";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Section } from "@/components/ui/Section";

/**
 * Contact page: the quote form (the only client component) beside every
 * way to reach the team.
 *
 * @param {object} props
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function ContactPage({ site }) {
  const form = site.forms.quote;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact/" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="Free quote"
        title="Talk to Exchange Power"
        lead="Tell us about your property and how you use power. We'll recommend a system size, explain the rebates you may be eligible for and put it in a written quote."
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
            <ContactMethods site={site} tone="light" className="mt-6" />
          </aside>
        </div>
      </Section>
    </>
  );
}
