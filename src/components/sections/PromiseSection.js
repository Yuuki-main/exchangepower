import Link from "next/link";
import { StarIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CardCta, CardPhoto } from "./CardPhoto";

/**
 * "The Exchange Power Promise": the headline claim, a review summary card,
 * and the Residential and Commercial overviews as large photo cards (the
 * live site shows them as tabs; here both are visible, with no JavaScript).
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.subtitle Shown as the eyebrow.
 * @param {{ value: number, text: string, title: string, body: string }} [props.rating]
 * @param {{ label: string, paragraphs: string[], cta: { label: string, href: string }, photo: string | null }[]} props.tabs
 */
export function PromiseSection({ title, subtitle, rating, tabs }) {
  return (
    <Section labelledBy="promise-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <SectionIntro
          id="promise-title"
          eyebrow={subtitle}
          title={title}
          className="lg:col-span-7"
        />
        {rating ? (
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-6 text-white shadow-lg sm:p-7 lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-10 -right-10 size-40 rounded-full bg-accent-400/20 blur-2xl"
            />
            <div className="relative flex items-center gap-4">
              <span className="font-display text-5xl font-bold tracking-tight text-accent-300">
                {rating.value}
              </span>
              <span>
                <span
                  className="flex text-accent-400"
                  role="img"
                  aria-label={`Rated ${rating.value} out of 5`}
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} size={18} />
                  ))}
                </span>
                <span className="mt-1 block text-sm text-foreground-inverse-muted">
                  {rating.text}
                </span>
              </span>
            </div>
            <p className="relative mt-5 font-display text-lg font-semibold">
              {rating.title}
            </p>
            <p className="relative mt-2 text-sm text-foreground-inverse-muted">
              {rating.body}
            </p>
          </div>
        ) : null}
      </div>

      <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        {tabs.map((tab) => (
          <li key={tab.label} className="reveal">
            <Link
              href={tab.cta.href}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-600/30 motion-reduce:hover:translate-y-0"
            >
              <CardPhoto
                imageKey={tab.photo}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                scrim="bottom"
                className="aspect-video"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 left-6 font-display text-3xl font-bold tracking-tight text-white sm:bottom-6 sm:left-7"
                >
                  {tab.label}
                </span>
              </CardPhoto>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <h3 className="sr-only">{tab.label}</h3>
                {tab.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-foreground-muted">
                    {p}
                  </p>
                ))}
                <CardCta className="mt-auto border-t border-border pt-5">
                  {tab.cta.label}
                  <span className="sr-only"> about {tab.label} solar</span>
                </CardCta>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
