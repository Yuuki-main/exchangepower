import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  AwardIcon,
  BatteryIcon,
  ShieldCheckIcon,
  SunIcon,
  UsersIcon,
} from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const ICONS = {
  sun: SunIcon,
  users: UsersIcon,
  shield: ShieldCheckIcon,
  award: AwardIcon,
  battery: BatteryIcon,
};

/**
 * The facts that build trust as a raised card: an icon, a large figure and
 * a label for each. On the homepage it overlaps the bottom of the hero.
 *
 * @param {object} props
 * @param {string} props.title Section name (read by screen readers only).
 * @param {{ value: string, label: string, href?: string, icon?: string }[]} props.items
 * @param {boolean} [props.overlap=false] Pull the card up over the section above
 *   (the homepage hero leaves room for it).
 */
export function Credentials({ title, items, overlap = false }) {
  return (
    <section
      aria-labelledby="credentials-title"
      className={cn("relative z-10 bg-background", overlap ? "pb-4" : "py-10")}
    >
      <h2 id="credentials-title" className="sr-only">
        {title}
      </h2>
      <Container>
        <dl
          className={cn(
            "grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border",
            overlap ? "-mt-12 shadow-xl sm:-mt-16" : "shadow-sm",
            items.length >= 4
              ? "lg:grid-cols-4"
              : items.length === 3
                ? "lg:grid-cols-3"
                : "",
          )}
        >
          {items.map((item) => {
            const Icon = item.icon
              ? ICONS[/** @type {keyof typeof ICONS} */ (item.icon)]
              : null;
            return (
              <div
                key={item.label}
                className="flex min-w-0 flex-col-reverse justify-end gap-1 bg-background p-5 sm:p-7 lg:p-8"
              >
                <dt className="text-sm text-foreground-muted">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 hover:text-brand-700 hover:decoration-current"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </dt>
                <dd className="font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl lg:text-2xl xl:text-3xl">
                  {/* The icon sits in the dd (above the figure, in normal flow)
                      so the dl keeps only dt/dd pairs and the two never overlap. */}
                  {Icon ? (
                    <span
                      aria-hidden="true"
                      className="mb-4 grid size-11 place-items-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-200"
                    >
                      <Icon size={22} />
                    </span>
                  ) : null}
                  <span className="block">{item.value}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
