import { getImageProps } from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  ChatIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icon";
import { getNavigation, getSite } from "@/lib/content";
import { getApprovedImage } from "@/lib/content";
import { formatAbn } from "@/lib/content-schema";
import { CopyrightYear } from "./CopyrightYear";
import { Wordmark } from "./Wordmark";

/** Site footer: contact details, the footer menus and legal line. */
export function SiteFooter() {
  const site = getSite();
  const { footer } = getNavigation();
  // The NETCC badge image, once approved (PLAN Part C item 7).
  const badge = getApprovedImage(site.badges.netcc.image);
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
  // ABN always; licence numbers once the business confirms them.
  const credentials = [
    `ABN ${formatAbn(site.abn)}`,
    site.licences.saa ? `SAA accreditation ${site.licences.saa}` : null,
    site.licences.electrical
      ? `Electrical contractor licence ${site.licences.electrical}`
      : null,
  ].filter(Boolean);

  return (
    <footer className="bg-brand-950 text-foreground-inverse [--ring:var(--color-accent-300)]">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark name={site.name} tone="dark" />
          <p className="mt-2 max-w-sm text-foreground-inverse-muted">
            {site.description}
          </p>
          <ul className="mt-6">
            {contact.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-start gap-3 py-2.5 text-white hover:text-accent-300"
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
          {site.openingHours ? (
            <p className="mt-2 inline-flex items-start gap-3 text-foreground-inverse-muted">
              <ClockIcon size={18} className="mt-0.5 text-accent-400" />
              {site.openingHours.display}
            </p>
          ) : null}
          {site.socials?.length ? (
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {site.socials.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm text-foreground-inverse-muted underline underline-offset-4 hover:text-white"
                  >
                    {socialLabel(url)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
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
              <ul className="mt-2 lg:mt-4 lg:space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href ?? "/"}
                      className="inline-flex min-h-11 min-w-11 items-center py-1.5 text-foreground-inverse-muted hover:text-white lg:min-h-0 lg:py-0"
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
          <div>
            <p>
              © <CopyrightYear /> {site.name}. All rights reserved.
            </p>
            <p className="mt-1">{credentials.join(" · ")}</p>
          </div>
          <p className="flex items-center gap-3">
            {badge ? (
              // eslint-disable-next-line @next/next/no-img-element -- props come from next/image getImageProps()
              <img
                {...getImageProps({
                  src: badge.localPath,
                  alt: "",
                  width: 48,
                  height: 48,
                }).props}
                alt=""
                className="size-12"
              />
            ) : null}
            {site.badges.netcc.label}
          </p>
        </Container>
      </div>
    </footer>
  );
}

/** Readable name for a profile link. */
function socialLabel(/** @type {string} */ url) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  if (/facebook\./.test(host)) return "Facebook";
  if (/instagram\./.test(host)) return "Instagram";
  if (/linkedin\./.test(host)) return "LinkedIn";
  if (/google\.|g\.page|goo\.gl/.test(host)) return "Google reviews";
  return host;
}
