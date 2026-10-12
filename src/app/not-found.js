import { BackgroundImage } from "@/components/sections/BackgroundImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getBackground, getSite } from "@/lib/content";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  const site = getSite();
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)]"
    >
      {/* Not preloaded: this boundary is serialised into every page, so a preload
          hint here would download the photo on every page. */}
      <BackgroundImage imageKey={getBackground("notFound")} />
      <Container className="py-section-lg">
        <div className="max-w-3xl">
          <Eyebrow tone="dark">404</Eyebrow>
          <h1
            id="not-found-title"
            className="mt-5 font-display text-5xl font-bold tracking-tight text-white"
          >
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground-inverse-muted">
            It may have moved when we rebuilt the website. Try the homepage, or
            call us and we&apos;ll point you in the right direction.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Go to the homepage
            </Button>
            <Button href={site.phone.href} variant="ghost" size="lg">
              Call {site.phone.display}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
