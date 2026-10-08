import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/Icon";
import { getNavigation, getSite } from "@/lib/content";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/**
 * Sticky site header. Fixed height (no layout shift); the desktop nav and
 * mobile menu are the only client-side pieces.
 */
export function SiteHeader() {
  const site = getSite();
  const { header } = getNavigation();
  const quote = { label: site.cta.quoteLabel, href: site.cta.quoteHref };
  // "Home" is reached via the wordmark on desktop; the mobile menu lists it.
  const desktopItems = header.filter((item) => item.href !== "/");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-16 items-center gap-4 lg:h-[4.5rem] lg:gap-3 xl:gap-6">
        <Wordmark name={site.name} className="lg:text-lg xl:text-xl" />
        <DesktopNav items={desktopItems} className="hidden lg:block" />
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Icon-only on desktop: the full number is in the hero, contact section and footer. */}
          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            title={`Call ${site.phone.display}`}
            className="hidden size-10 items-center justify-center rounded-md text-brand-900 ring-1 ring-border hover:text-brand-700 hover:ring-brand-700 xl:inline-flex"
          >
            <PhoneIcon size={18} />
          </a>
          {/* Wrapper controls visibility: Button's own inline-flex would override "hidden". */}
          <div className="hidden sm:block">
            <Button href={quote.href} size="sm">
              {quote.label}
            </Button>
          </div>
          <div className="lg:hidden">
            <MobileNav items={header} quote={quote} phone={site.phone} />
          </div>
        </div>
      </Container>
    </header>
  );
}
