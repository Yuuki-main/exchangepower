import { cn } from "@/lib/cn";

/**
 * Figures from a product's own copy, shown large. Renders nothing when there
 * are no facts, so pages without figures simply don't have the panel.
 *
 * @param {object} props
 * @param {{ label: string, value: string, qualifier?: string }[]} props.facts
 * @param {string} [props.title="At a glance"] Small label above the figures (also the region name).
 * @param {"light" | "dark"} [props.tone="dark"]
 * @param {string} [props.className]
 */
export function KeyFacts({
  facts,
  title = "At a glance",
  tone = "dark",
  className,
}) {
  if (!facts.length) return null;
  const dark = tone === "dark";
  return (
    <section aria-label={title} className={className}>
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.14em] uppercase",
          dark ? "text-accent-300" : "text-accent-700",
        )}
      >
        {title}
      </p>
      <dl
        className={cn(
          "mt-4 grid grid-cols-2 border-t",
          dark ? "border-white/15" : "border-border",
        )}
      >
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={cn(
              "flex flex-col-reverse gap-1 border-b py-4",
              dark ? "border-white/15" : "border-border",
              i % 2 === 1 &&
                (dark ? "border-l border-l-white/15 pl-5" : "border-l pl-5"),
            )}
          >
            <dt
              className={cn(
                "text-sm",
                dark
                  ? "text-foreground-inverse-muted"
                  : "text-foreground-muted",
              )}
            >
              {fact.label}
            </dt>
            <dd
              className={cn(
                "font-display text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl",
                dark ? "text-accent-300" : "text-brand-900",
              )}
            >
              {fact.qualifier ? (
                <span
                  className={cn(
                    "block font-sans text-sm font-semibold tracking-normal",
                    dark
                      ? "text-foreground-inverse-muted"
                      : "text-foreground-muted",
                  )}
                >
                  {fact.qualifier}
                </span>
              ) : null}
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
