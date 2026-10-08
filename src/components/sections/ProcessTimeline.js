import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * The customer process as one connected vertical timeline. The intro stays
 * in view on large screens while the steps scroll past.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {{ title: string, text: string }[]} props.steps
 */
export function ProcessTimeline({ eyebrow, title, steps }) {
  return (
    <Section labelledBy="process-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionIntro
            id="process-title"
            eyebrow={eyebrow}
            title={title}
            className="lg:sticky lg:top-32"
          />
        </div>
        <ol className="relative lg:col-span-7 lg:col-start-6">
          {/* The connecting line */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-border"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 sm:gap-x-8"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex size-10 items-center justify-center bg-background font-display text-sm font-semibold text-brand-900 tabular-nums ring-1 ring-brand-900"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl font-semibold text-brand-900">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-reading text-foreground-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
