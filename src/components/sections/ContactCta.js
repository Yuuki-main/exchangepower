import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactMethods } from "./ContactMethods";

/**
 * The homepage's closing section (anchor #get-a-quote): a large statement,
 * then every way to reach the team.
 *
 * @param {object} props
 * @param {string} props.id Anchor id.
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function ContactCta({ id, eyebrow, title, lead, site }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-16 overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)] lg:scroll-mt-20"
    >
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
        </div>

        <ContactMethods
          site={site}
          className="self-end lg:col-span-5 lg:col-start-8"
        />
      </Container>
    </section>
  );
}
