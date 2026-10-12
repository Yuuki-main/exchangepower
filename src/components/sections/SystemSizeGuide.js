import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";
import { CardCta, CardPhoto } from "./CardPhoto";

/**
 * @typedef {object} SystemSize
 * @property {number} kw
 * @property {string} href
 * @property {string} bestFor
 * @property {string[]} facts
 * @property {string | null} [photo] Card photo key.
 */

/**
 * "Which system fits?": each audience's system sizes side by side, with a
 * bar showing relative capacity, who it suits and real figures from the
 * product FAQs. Photo cards: columns on desktop, photo beside the details on phones. No client JS.
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
                  "mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5",
                  group.items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                )}
              >
                {group.items.map((system) => (
                  <li key={system.kw}>
                    {/* Phones: photo beside the details. sm and up: photo on top. */}
                    <Link
                      href={system.href}
                      className="group flex h-full overflow-hidden rounded-2xl bg-background shadow-sm ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-600/30 motion-reduce:hover:translate-y-0 sm:flex-col"
                    >
                      <CardPhoto
                        imageKey={system.photo}
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 8rem"
                        scrim="bottom"
                        className="flex w-32 shrink-0 items-end p-3 sm:aspect-16/10 sm:w-auto sm:p-5"
                      >
                        <span className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                          {system.kw}
                          <span className="ml-0.5 text-base text-white sm:text-lg">
                            kW
                          </span>
                        </span>
                      </CardPhoto>
                      <span className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
                        {/* Relative capacity within the group */}
                        <span
                          aria-hidden="true"
                          className="block h-1.5 w-full overflow-hidden rounded-full bg-neutral-200"
                        >
                          <span
                            className="block h-full rounded-full bg-accent-500"
                            style={{
                              width: `${Math.max(8, (system.kw / max) * 100)}%`,
                            }}
                          />
                        </span>
                        <span className="font-semibold text-foreground">
                          {system.bestFor}
                        </span>
                        <ul className="space-y-1.5 text-sm text-foreground-muted">
                          {system.facts.map((fact) => (
                            <li key={fact} className="flex gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500"
                              />
                              {fact}
                            </li>
                          ))}
                        </ul>
                        <CardCta className="mt-auto pt-1">
                          <span>
                            View <span className="sr-only">the</span>{" "}
                            {system.kw}kW
                            <span className="sr-only"> solar system</span>
                          </span>
                        </CardCta>
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
