import Link from "next/link";
import { ShieldCheckIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * The four warranties on a system (panel product, panel performance,
 * inverter, workmanship) as a row of cards.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {{ title: string, term: string, text: string, href?: string }[]} props.items
 */
export function WarrantyCards({ eyebrow, title, lead, items }) {
  return (
    <Section labelledBy="warranties-title" className="border-t border-border">
      <SectionIntro
        id="warranties-title"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        size="lg"
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl bg-surface p-6 ring-1 ring-border"
          >
            <ShieldCheckIcon size={22} className="text-accent-700" />
            <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-brand-700">
              {item.term}
            </p>
            <p className="mt-3 text-foreground-muted">{item.text}</p>
            {item.href ? (
              <Link
                href={item.href}
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 underline underline-offset-4"
              >
                Read the terms
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
