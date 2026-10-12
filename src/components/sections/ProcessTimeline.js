import {
  ChatIcon,
  FileCheckIcon,
  HeadsetIcon,
  PenToolIcon,
  WrenchIcon,
  ZapIcon,
} from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

const ICONS = {
  quote: ChatIcon,
  design: PenToolIcon,
  approvals: FileCheckIcon,
  install: WrenchIcon,
  switch: ZapIcon,
  support: HeadsetIcon,
};

/**
 * The customer process as numbered step cards: a large outlined numeral, an
 * icon, the step and a line of detail. An amber bar grows along the top of
 * a card on hover. Three columns on desktop, two on tablets, one on phones.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {{ title: string, text: string, icon?: string }[]} props.steps
 */
export function ProcessTimeline({ eyebrow, title, steps }) {
  return (
    <Section labelledBy="process-title">
      <SectionIntro id="process-title" eyebrow={eyebrow} title={title} />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon
            ? ICONS[/** @type {keyof typeof ICONS} */ (step.icon)]
            : null;
          return (
            <li
              key={step.title}
              className="group reveal relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-lg motion-reduce:hover:translate-y-0 sm:p-7"
            >
              {/* Amber bar that grows on hover */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-1 w-12 rounded-r-full bg-accent-400 transition-all duration-500 group-hover:w-full"
              />
              <div className="flex items-start justify-between gap-4">
                {Icon ? (
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-accent-300 shadow-sm transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950"
                  >
                    <Icon size={22} />
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none font-bold text-outline tabular-nums transition-colors duration-300 select-none group-hover:[-webkit-text-stroke-color:var(--color-accent-500)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-brand-900">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-foreground-muted">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
