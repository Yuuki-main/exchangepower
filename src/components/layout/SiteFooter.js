import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  ChatIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icon";
import { getNavigation, getSite } from "@/lib/content";
import { CopyrightYear } from "./CopyrightYear";
import { Wordmark } from "./Wordmark";

/** Site footer: contact details, the footer menus and legal line. */
export function SiteFooter() {
  const site = getSite();
  const { footer } = getNavigation();
  const contact = [
    { icon: PhoneIcon, label: site.phone.display, href: site.phone.href },
    { icon: MailIcon, label: site.email, href: `mailto:${site.email}` },
    { icon: ChatIcon, label: "WhatsApp", href: site.whatsapp.href },
    {
      icon: MapPinIcon,
      label: site.address.display,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address.display}`)}`,
    },
  ];

  return (
    <footer className="bg-brand-950 text-foreground-inverse [--ring:var(--color-accent-300)]">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark name={site.name} tone="dark" />
          <p className="mt-4 max-w-sm text-foreground-inverse-muted">
            {site.description}
          </p>
          <ul className="mt-8 space-y-3">
            {contact.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-start gap-3 text-white hover:text-accent-300"
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon size={18} className="mt-0.5 text-accent-400" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
        >
          {footer.map((column, i) => (
            <div
              key={column.title}
              className={i === 0 ? "row-span-2 sm:row-span-1" : undefined}
            >
              <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-300 uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href ?? "/"}
                      className="text-foreground-inverse-muted hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-foreground-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <p>{site.badges.netcc.label}</p>
        </Container>
      </div>
    </footer>
  );
}
