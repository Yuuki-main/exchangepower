import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icon";
import { BackgroundImage } from "./BackgroundImage";

/**
 * Closing call to action for inner pages: a short statement, the quote
 * button (site.cta.quoteHref) and the phone number.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.text]
 * @param {{ label: string, href: string }} props.quote
 * @param {{ display: string, href: string }} props.phone
 * @param {string | null} [props.background] Background photo key.
 */
export function CtaBand({ title, text, quote, phone, background }) {
  return (
    <section
      aria-labelledby="cta-band-title"
      className="relative isolate overflow-hidden border-t-4 border-accent-400 bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]"
    >
      <BackgroundImage imageKey={background} />
      <Container className="grid gap-8 py-section-sm lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <h2
            id="cta-band-title"
            className="font-display text-3xl font-bold tracking-tight text-white"
          >
            {title}
          </h2>
          {text ? (
            <p className="mt-3 text-lg text-foreground-inverse-muted">{text}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Button href={quote.href} size="lg">
            {quote.label}
            <ArrowRightIcon size={18} />
          </Button>
          <Button href={phone.href} variant="ghost" size="lg">
            <PhoneIcon size={18} />
            {phone.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}
