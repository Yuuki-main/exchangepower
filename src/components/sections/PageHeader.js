import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { BackgroundImage } from "./BackgroundImage";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Dark page header used by inner pages: breadcrumbs, eyebrow, H1, optional
 * lead and actions, and an optional aside (for example KeyFacts).
 * Matches the homepage hero's surface and type.
 *
 * @param {object} props
 * @param {{ label: string, href: string }[]} props.breadcrumbs
 * @param {React.ReactNode} [props.eyebrow]
 * @param {React.ReactNode} props.title Page H1.
 * @param {React.ReactNode} [props.lead]
 * @param {React.ReactNode} [props.actions] Buttons under the lead.
 * @param {React.ReactNode} [props.aside] Right column on large screens.
 * @param {string | null} [props.background] Background photo key (src/content/backgrounds.js).
 */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  actions,
  aside,
  background,
}) {
  return (
    <header className="relative isolate overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]">
      <BackgroundImage imageKey={background} preload />
      <Container className="pt-6 pb-12 sm:pt-8 lg:pb-16">
        <Breadcrumbs items={breadcrumbs} tone="dark" />
        <div
          className={cn(
            "mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8",
            aside ? "lg:items-end" : undefined,
          )}
        >
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
            <h1
              className={cn(
                "font-display text-5xl font-bold tracking-tight text-white",
                eyebrow ? "mt-5" : undefined,
              )}
            >
              {title}
            </h1>
            {lead ? (
              <p className="mt-6 max-w-2xl text-lg text-foreground-inverse-muted">
                {lead}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="animate-rise [animation-delay:100ms] lg:col-span-5">
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
