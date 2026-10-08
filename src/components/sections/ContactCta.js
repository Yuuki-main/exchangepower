import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  ArrowRightIcon,
  ChatIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icon";

/**
 * The closing section and the target of every "Get a free quote" button
 * until the quote form exists (PLAN Step 7). Large statement, then every
 * way to reach the team as big, easy-to-tap rows.
 *
 * @param {object} props
 * @param {string} props.id Anchor id.
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function ContactCta({ id, eyebrow, title, lead, site }) {
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
      value: site.email,
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
      label: "Visit",
      value: site.address.display,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address.display}`)}`,
      external: true,
    },
  ];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-16 overflow-hidden bg-surface-inverse text-foreground-inverse [--ring:var(--color-accent-300)] lg:scroll-mt-20"
    >
      {/* The sun's arc, echoing the hero chart */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        className="pointer-events-none absolute right-0 bottom-0 hidden w-[44rem] translate-x-1/4 translate-y-[62%] opacity-30 sm:block"
      >
        <path
          d="M10 200 A190 190 0 0 1 390 200"
          fill="none"
          className="stroke-accent-400"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="10" r="7" className="fill-accent-400" />
      </svg>

      <Container className="relative grid gap-12 py-section-lg lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-5xl font-bold tracking-tight text-white"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-foreground-inverse-muted">
            {lead}
          </p>
        </div>

        <ul className="divide-y divide-white/15 self-end border-y border-white/15 lg:col-span-5 lg:col-start-8">
          {methods.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 py-5"
              >
                <Icon size={22} className="text-accent-400" />
                <span className="min-w-0">
                  <span className="block text-sm text-foreground-inverse-muted">
                    {label}
                  </span>
                  <span className="block font-display text-xl font-semibold [overflow-wrap:anywhere] text-white group-hover:text-accent-300">
                    {value}
                  </span>
                </span>
                <ArrowRightIcon className="text-foreground-inverse-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-300" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
