import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";

/**
 * @typedef {object} SystemSize
 * @property {number} kw
 * @property {string} href
 * @property {string} bestFor
 * @property {string[]} facts
 */

/**
 * "Which system fits?": each audience's system sizes side by side, with a
 * bar showing relative capacity, who it suits and real figures from the
 * product FAQs. Columns on desktop, compact rows on phones. No client JS.
 *
 * @param {object} props
 * @param {string} props.id Anchor id (the hero links here).
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ label: string, items: SystemSize[] }[]} props.groups
 * @param {{ label: string, href: string }} props.cta
 */
export function SystemSizeGuide({ id, eyebrow, title, lead, groups, cta }) {
  return (
    <Section
      id={id}
      background="muted"
      labelledBy={`${id}-title`}
      className="scroll-mt-20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionIntro
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />
        <Button
          href={cta.href}
          variant="secondary"
          className="self-start lg:self-auto"
        >
          {cta.label}
        </Button>
      </div>

      <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-16">
        {groups.map((group) => {
          const max = Math.max(...group.items.map((s) => s.kw));
          const min = group.items[0]?.kw ?? 0;
          return (
            <div key={group.label} className="reveal">
              <h3 className="flex items-baseline justify-between gap-4 border-b-2 border-brand-900 pb-3">
                <span className="font-display text-2xl font-semibold text-brand-900">
                  {group.label}
                </span>
                <span className="text-sm font-semibold text-foreground-muted tabular-nums">
                  {min}kW – {max}kW
                </span>
              </h3>
              <ul
                className={cn(
                  // 1px gaps over a border-coloured background draw the dividers.
                  "grid gap-px bg-border sm:grid-cols-2",
                  group.items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                )}
              >
                {group.items.map((system) => (
                  <li
                    key={system.kw}
                    // An odd last item spans both columns at sm, so no empty cell shows.
                    className="bg-surface sm:last:odd:col-span-2 lg:last:odd:col-span-1"
                  >
                    {/* Phones: compact two-column row. sm and up: a column. */}
                    <Link
                      href={system.href}
                      className="group relative grid h-full grid-cols-[5.5rem_minmax(0,1fr)] gap-x-5 gap-y-2 py-5 pr-8 hover:bg-background sm:flex sm:flex-col sm:gap-4 sm:px-6 sm:py-6 lg:py-8"
                    >
                      <span className="row-span-2 flex flex-col gap-3 sm:contents">
                        <span className="font-display text-3xl font-semibold tracking-tight text-brand-900 tabular-nums sm:text-4xl">
                          {system.kw}
                          <span className="ml-0.5 text-lg text-brand-700 sm:text-xl">
                            kW
                          </span>
                        </span>
                        {/* Relative capacity within the group */}
                        <span
                          aria-hidden="true"
                          className="block h-1.5 w-full bg-neutral-200"
                        >
                          <span
                            className="block h-full bg-accent-500"
                            style={{
                              width: `${Math.max(8, (system.kw / max) * 100)}%`,
                            }}
                          />
                        </span>
                      </span>
                      <span className="font-semibold text-foreground">
                        {system.bestFor}
                      </span>
                      <ul className="space-y-1.5 text-sm text-foreground-muted">
                        {system.facts.map((fact) => (
                          <li key={fact} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 bg-accent-700"
                            />
                            {fact}
                          </li>
                        ))}
                      </ul>
                      <ArrowRightIcon className="absolute top-6 right-0 text-brand-700 transition-transform group-hover:translate-x-1 sm:top-8 sm:right-6 lg:top-10" />
                      <span className="sr-only">
                        View the {system.kw}kW solar system
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
