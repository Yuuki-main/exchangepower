import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * Editorial index of the main solutions: large numbered rows instead of a
 * grid of cards. Each row is one link to its section of the site.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {{ title: string, range: string, text: string, href: string }[]} props.items
 */
export function SolutionIndex({ eyebrow, title, items }) {
  return (
    <Section labelledBy="solutions-title">
      <SectionIntro id="solutions-title" eyebrow={eyebrow} title={title} />
      <ol className="mt-12 border-b border-border lg:mt-16">
        {items.map((item, i) => (
          <li key={item.href} className="reveal border-t border-border">
            <Link
              href={item.href}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-3 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] lg:grid-cols-[4rem_minmax(0,1fr)_3rem] lg:gap-x-8 lg:py-10"
            >
              <span className="pt-2 font-display text-sm font-semibold text-accent-700 tabular-nums lg:pt-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid gap-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,0.5fr)] lg:items-baseline lg:gap-8">
                <span className="font-display text-4xl font-semibold tracking-tight text-brand-900 transition-colors group-hover:text-brand-600">
                  {item.title}
                </span>
                <span className="max-w-xl text-foreground-muted lg:text-lg">
                  {item.text}
                </span>
                <span className="text-sm font-semibold tracking-wide text-brand-700 lg:text-right">
                  {item.range}
                </span>
              </span>
              <ArrowRightIcon
                size={28}
                className="mt-2 justify-self-end text-brand-700 transition-transform group-hover:translate-x-1 lg:mt-4"
              />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
