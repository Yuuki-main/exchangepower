import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon, BatteryIcon, PhoneIcon } from "@/components/ui/Icon";
import { DayCurve } from "./DayCurve";

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
 */
export function HomeHero({ content, phone }) {
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
      className="overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]"
    >
      <Container className="grid gap-12 pt-12 pb-12 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20 lg:pb-20 xl:gap-16">
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

        <figure className="animate-rise [animation-delay:120ms] lg:col-span-6">
          <div className="border-l border-white/15 pl-4 sm:pl-6">
            <DayCurve />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm text-foreground-inverse-muted">
            <span>{visualCaption}</span>
            <span className="shrink-0 text-xs tracking-[0.14em] uppercase">
              Illustrative
            </span>
          </figcaption>
        </figure>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-300">
            <BatteryIcon size={18} />
            {rebate.label}
          </p>
          <p className="text-foreground-inverse-muted">{rebate.text}</p>
          <Link
            href={rebate.link.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-white hover:text-accent-300 sm:ml-auto"
          >
            {rebate.link.label}
            <ArrowRightIcon size={16} />
          </Link>
        </Container>
      </div>
    </section>
  );
}
