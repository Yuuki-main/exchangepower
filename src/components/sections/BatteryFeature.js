import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * Battery storage and the WA rebate, told with large figures on a dark band.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ prefix?: string, value: string, label: string }[]} props.figures
 * @param {string[]} props.notes
 * @param {{ label: string, href: string }} props.primaryCta
 * @param {{ label: string, href: string }} props.secondaryCta
 */
export function BatteryFeature({
  eyebrow,
  title,
  lead,
  figures,
  notes,
  primaryCta,
  secondaryCta,
}) {
  return (
    <Section background="brand" spacing="lg" labelledBy="battery-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
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
                <CheckIcon size={20} className="mt-0.5 text-accent-400" />
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
          <dl>
            {figures.map((figure) => (
              <div
                key={figure.value}
                className="flex flex-col-reverse gap-2 border-t border-white/15 py-7 first:border-t-0 first:pt-0 lg:py-8"
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
                  <span className="font-display text-5xl font-semibold tracking-tight text-accent-300 tabular-nums">
                    {figure.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-white/15 pt-6 text-sm text-foreground-inverse-muted">
            Rebate amounts, quotas and eligibility are set by the WA Government
            and can change.
          </p>
        </div>
      </div>
    </Section>
  );
}
