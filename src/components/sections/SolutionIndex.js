import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CardCta, CardPhoto } from "./CardPhoto";

/**
 * The main solutions as tall photo cards: number and size range over the
 * photo, then the title, a line of text and an action, on a dark scrim.
 * Each card is one link to its category hub.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {{ title: string, range: string, text: string, href: string, photo?: string | null }[]} props.items
 */
export function SolutionIndex({ eyebrow, title, lead, items }) {
  return (
    <Section labelledBy="solutions-title">
      <SectionIntro
        id="solutions-title"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
      />
      <ul className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block h-full overflow-hidden rounded-2xl shadow-sm transition duration-300 [--ring:var(--color-accent-300)] hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0"
            >
              <CardPhoto
                imageKey={item.photo}
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                scrim="full"
                className="flex h-full min-h-96 flex-col p-6 lg:min-h-120 lg:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-brand-950/95 px-2.5 py-1 font-display text-sm font-semibold text-accent-300 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-900 shadow-sm">
                    {item.range}
                  </span>
                </div>
                <div className="mt-auto pt-24">
                  <span className="block font-display text-3xl font-bold tracking-tight text-white">
                    {item.title}
                  </span>
                  <span className="mt-3 block text-foreground-inverse-muted">
                    {item.text}
                  </span>
                  <CardCta tone="dark" className="mt-6">
                    Explore {item.title.toLowerCase()}
                  </CardCta>
                </div>
              </CardPhoto>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
