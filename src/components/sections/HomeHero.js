import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon, BatteryIcon, PhoneIcon } from "@/components/ui/Icon";
import { BackgroundImage } from "./BackgroundImage";
import { DayCurve } from "./DayCurve";
import { RatingBadge } from "./RatingBadge";

/**
 * Homepage hero: positioning, primary and secondary actions, an illustrative
 * day-curve visual and the battery rebate strip.
 *
 * The heading is not animated (it is the LCP element); only the visual and
 * supporting text rise in.
 *
 * @param {object} props
 * @param {typeof import("@/content/home.js").HOME.hero} props.content
 * @param {{ display: string, href: string }} props.phone
 * @param {string | null} [props.background] Background photo key.
 * @param {{ value: number, text: string }} [props.rating] Review summary.
 */
export function HomeHero({ content, phone, background, rating }) {
  const {
    eyebrow,
    title,
    lead,
    primaryCta,
    secondaryCta,
    visualCaption,
    rebate,
  } = content;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]"
    >
      <BackgroundImage imageKey={background} preload />
      <Container className="grid gap-12 pt-12 pb-12 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-24 lg:pb-16 xl:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 font-display text-5xl font-bold tracking-tight text-white"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-lg text-foreground-inverse-muted [animation-delay:80ms]">
            {lead}
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:140ms] sm:flex-row sm:items-center">
            <Button
              href={primaryCta.href}
              size="lg"
              className="w-full sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRightIcon size={18} />
            </Button>
            <Button
              href={secondaryCta.href}
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              {secondaryCta.label}
            </Button>
          </div>
          {rating ? (
            <RatingBadge
              summary={{ rating: rating.value, text: rating.text }}
              tone="dark"
              className="mt-8 animate-rise [animation-delay:180ms]"
            />
          ) : null}
          <p className="mt-6 animate-rise text-foreground-inverse-muted [animation-delay:200ms]">
            Prefer to talk?{" "}
            <a
              href={phone.href}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline decoration-accent-400 decoration-2 underline-offset-4 hover:text-accent-300"
            >
              <PhoneIcon size={16} />
              {phone.display}
            </a>
          </p>
        </div>

        <figure className="relative animate-rise [animation-delay:120ms] lg:col-span-6">
          {/* Warm glow behind the panel */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-accent-400/25 blur-3xl"
          />
          <div className="rounded-3xl bg-brand-950/55 p-5 shadow-2xl ring-1 ring-white/15 backdrop-blur-md sm:p-7">
            <figcaption className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4 text-sm text-foreground-inverse-muted">
              <span>{visualCaption}</span>
              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs tracking-[0.14em] uppercase">
                Illustrative
              </span>
            </figcaption>
            <DayCurve className="mt-4" />
          </div>
        </figure>
      </Container>

      {/* Bottom padding leaves room for the Credentials card, which overlaps it. */}
      <Container className="pb-20 sm:pb-24">
        <div className="flex flex-col gap-3 rounded-2xl bg-brand-950/60 p-4 ring-1 ring-white/15 backdrop-blur-md sm:px-6 lg:flex-row lg:items-center lg:gap-6">
          <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent-400 px-3 py-1 text-sm font-semibold text-brand-950 lg:self-auto">
            <BatteryIcon size={18} />
            {rebate.label}
          </p>
          <p className="text-foreground-inverse-muted">{rebate.text}</p>
          <Link
            href={rebate.link.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-white hover:text-accent-300 lg:ml-auto"
          >
            {rebate.link.label}
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
