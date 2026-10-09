import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/**
 * A quiet row of facts that build trust: no cards, just figures and labels
 * divided by hairlines.
 *
 * @param {object} props
 * @param {string} props.title Section name (read by screen readers only).
 * @param {{ value: string, label: string, href?: string }[]} props.items
 */
export function Credentials({ title, items }) {
  return (
    <section
      aria-labelledby="credentials-title"
      className="border-b border-border bg-background"
    >
      <h2 id="credentials-title" className="sr-only">
        {title}
      </h2>
      <Container>
        <dl
          className={cn(
            "grid grid-cols-2",
            items.length >= 4
              ? "lg:grid-cols-4"
              : items.length === 3
                ? "lg:grid-cols-3"
                : "",
          )}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col-reverse gap-1 py-7 pr-4 sm:py-9",
                i % 2 === 1 && "border-l border-border pl-5 sm:pl-8",
                i >= 2 && "border-t border-border lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-8",
              )}
            >
              <dt className="text-sm text-foreground-muted sm:text-base">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="underline decoration-border underline-offset-4 hover:text-brand-700 hover:decoration-current"
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-brand-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
