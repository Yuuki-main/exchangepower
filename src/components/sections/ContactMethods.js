import {
  ArrowRightIcon,
  ChatIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Google Maps directions to the business address (no embed, no tracking). */
export function directionsUrl(
  /** @type {import("@/lib/content-schema.js").SiteInfo} */ site,
) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.name}, ${site.address.display}`)}`;
}

/**
 * Every way to reach the team as large, easy-to-tap rows: phone, email,
 * WhatsApp and the address (opens Google Maps directions).
 * Used by the homepage contact section and the contact page.
 *
 * @param {object} props
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 * @param {"light" | "dark"} [props.tone="dark"]
 * @param {string} [props.className]
 */
export function ContactMethods({ site, tone = "dark", className }) {
  const dark = tone === "dark";
  const methods = [
    {
      icon: PhoneIcon,
      label: "Call",
      value: site.phone.display,
      href: site.phone.href,
    },
    {
      icon: MailIcon,
      label: "Email",
      // Allow a line break after "@" so the address never splits mid-word.
      value: (
        <>
          {site.email.split("@")[0]}@<wbr />
          {site.email.split("@")[1]}
        </>
      ),
      href: `mailto:${site.email}`,
    },
    {
      icon: ChatIcon,
      label: "WhatsApp",
      value: "Message us",
      href: site.whatsapp.href,
      external: true,
    },
    {
      icon: MapPinIcon,
      label: "Visit · Get directions",
      value: site.address.display,
      href: directionsUrl(site),
      external: true,
    },
  ];

  return (
    <ul
      className={cn(
        "divide-y border-y",
        dark
          ? "divide-white/15 border-white/15"
          : "divide-border border-border",
        className,
      )}
    >
      {methods.map(({ icon: Icon, label, value, href, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 py-5"
          >
            <Icon
              size={22}
              className={dark ? "text-accent-400" : "text-accent-700"}
            />
            <span className="min-w-0">
              <span
                className={cn(
                  "block text-sm",
                  dark
                    ? "text-foreground-inverse-muted"
                    : "text-foreground-muted",
                )}
              >
                {label}
                {external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </span>
              <span
                className={cn(
                  "block font-display text-xl font-semibold [overflow-wrap:anywhere]",
                  dark
                    ? "text-white group-hover:text-accent-300"
                    : "text-brand-900 group-hover:text-brand-600",
                )}
              >
                {value}
              </span>
            </span>
            <ArrowRightIcon
              className={cn(
                "transition-transform group-hover:translate-x-1",
                dark
                  ? "text-foreground-inverse-muted group-hover:text-accent-300"
                  : "text-brand-700",
              )}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
