import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { BackgroundImage } from "./BackgroundImage";
import { ContactMethods } from "./ContactMethods";

/**
 * The homepage's closing section (anchor #get-a-quote): a large statement
 * and every way to reach the team, beside the compact quote form.
 *
 * @param {object} props
 * @param {string} props.id Anchor id.
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 * @param {string | null} [props.background] Background photo key.
 */
export function ContactCta({ id, eyebrow, title, lead, site, background }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate scroll-mt-16 overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)] lg:scroll-mt-20"
    >
      <BackgroundImage imageKey={background} />
      {/* The sun's arc, echoing the hero chart */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        className="pointer-events-none absolute right-0 bottom-0 hidden w-[44rem] translate-x-1/4 translate-y-[62%] opacity-30 sm:block"
      >
        <path
          d="M10 200 A190 190 0 0 1 390 200"
          fill="none"
          className="stroke-accent-400"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="10" r="7" className="fill-accent-400" />
      </svg>

      <Container className="relative grid gap-12 py-section-lg lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-5xl font-bold tracking-tight text-white"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-foreground-inverse-muted">
            {lead}
          </p>
          <ContactMethods site={site} className="mt-10" />
        </div>

        {/* Light panel so the form keeps its normal (AA) colours on the dark band. */}
        <div className="min-w-0 self-start rounded-3xl bg-background p-5 text-foreground shadow-2xl ring-1 ring-white/10 [--ring:var(--color-brand-600)] sm:p-8 lg:col-span-5 lg:col-start-8">
          <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight text-brand-900">
            {site.forms.quote.title}
          </h3>
          <QuoteForm
            variant="compact"
            enquiryTypes={site.forms.quote.enquiryTypes}
            submitLabel={site.forms.quote.submitLabel}
          />
        </div>
      </Container>
    </section>
  );
}
