import { Button } from "@/components/ui/Button";
import { BatteryIcon, CheckIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";
import { MediaSlot } from "./MediaSlot";

/**
 * Battery storage and the WA rebate on a dark band with a faint grid and a
 * warm glow. The rebate figures sit in glass cards; the last one (the loan)
 * spans the full width.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ prefix?: string, value: string, label: string }[]} props.figures
 * @param {string[]} props.notes
 * @param {{ label: string, href: string }} props.primaryCta
 * @param {{ label: string, href: string }} props.secondaryCta
 * @param {string | null} [props.image] Banner image key (shown once approved).
 */
export function BatteryFeature({
  eyebrow,
  title,
  lead,
  figures,
  notes,
  primaryCta,
  secondaryCta,
  image,
}) {
  return (
    <Section
      background="brand"
      spacing="lg"
      labelledBy="battery-title"
      className="relative isolate overflow-hidden"
    >
      {/* Decoration: grid, glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 right-[-10%] size-144 rounded-full bg-accent-400/10 blur-3xl" />
        <div className="absolute -bottom-48 left-[-10%] size-128 rounded-full bg-brand-500/20 blur-3xl" />
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <SectionIntro
            id="battery-title"
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            tone="dark"
          />
          <ul className="mt-8 space-y-3">
            {notes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-foreground-inverse-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-400 text-brand-950"
                >
                  <CheckIcon size={14} strokeWidth={3} />
                </span>
                {note}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <MediaSlot
            imageKey={image}
            sizes="(min-width: 1280px) 580px, (min-width: 1024px) 50vw, 100vw"
            className="mb-4 rounded-3xl shadow-2xl ring-1 ring-white/15"
          />
          <dl className="grid gap-4 sm:grid-cols-2">
            {figures.map((figure, i) => {
              const wide = i === figures.length - 1 && figures.length % 2 === 1;
              return (
                <div
                  key={figure.value}
                  className={cn(
                    "relative flex flex-col-reverse justify-end gap-3 overflow-hidden rounded-3xl bg-white/6 p-6 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/9 sm:p-7",
                    wide && "sm:col-span-2",
                  )}
                >
                  <dt className="max-w-md text-foreground-inverse-muted">
                    {figure.label}
                  </dt>
                  <dd>
                    {figure.prefix ? (
                      <span className="block text-sm font-semibold text-foreground-inverse-muted">
                        {figure.prefix}
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "font-display font-bold tracking-tight text-accent-300 tabular-nums",
                        wide ? "text-5xl" : "text-4xl",
                      )}
                    >
                      {figure.value}
                    </span>
                  </dd>
                  {wide ? (
                    <BatteryIcon
                      size={120}
                      strokeWidth={1}
                      className="pointer-events-none absolute -top-5 -right-3 text-white/10"
                    />
                  ) : null}
                </div>
              );
            })}
          </dl>
          <p className="mt-5 text-sm text-foreground-inverse-muted">
            Rebate amounts, quotas and eligibility are set by the WA Government
            and can change.
          </p>
        </div>
      </div>
    </Section>
  );
}
