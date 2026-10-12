import Link from "next/link";
import { cn } from "@/lib/cn";
import { CardCta, CardPhoto } from "./CardPhoto";

/** @typedef {import("@/lib/product-pages.js").ProductSummary} ProductSummary */

/**
 * Products as photo cards: the product's photo with its category, the title,
 * up to two key figures as stat tiles (or highlights when it has none), and a
 * "View details" action. The whole card is one link; it lifts on hover.
 *
 * @param {object} props
 * @param {ProductSummary[]} props.products
 * @param {2 | 3 | 4} [props.headingLevel=3] Heading level of each card title.
 * @param {"default" | "muted"} [props.surface="default"] Background the grid sits on.
 * @param {string} [props.className]
 */
export function ProductCardGrid({
  products,
  headingLevel = 3,
  surface = "default",
  className,
}) {
  const Heading = /** @type {"h3"} */ (`h${headingLevel}`);
  return (
    <ul
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:gap-8",
        products.length > 2 && "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => {
        const facts = product.keyFacts.slice(0, 2);
        const highlights = facts.length ? [] : product.highlights.slice(0, 2);
        return (
          <li key={product.href}>
            <Link
              href={product.href}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-600/30 motion-reduce:hover:translate-y-0",
                surface === "muted" ? "bg-background" : "bg-surface",
              )}
            >
              <CardPhoto
                imageKey={product.photo}
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                // The business's own images have text baked in: show them
                // whole (3:2), with no tint or overlaid label.
                scrim={product.photoIsOwn ? "none" : "bottom"}
                className={product.photoIsOwn ? "aspect-3/2" : "aspect-16/10"}
              >
                {product.photoIsOwn ? null : (
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-brand-900 shadow-sm">
                    {product.category}
                  </span>
                )}
              </CardPhoto>
              <div className="flex flex-1 flex-col gap-5 p-6 lg:p-7">
                {product.photoIsOwn ? (
                  <span className="-mb-2 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                    {product.category}
                  </span>
                ) : null}
                <Heading className="font-display text-2xl font-semibold tracking-tight text-brand-900 transition-colors group-hover:text-brand-600">
                  {product.title}
                </Heading>
                {facts.length ? (
                  <dl className="grid grid-cols-2 gap-3">
                    {facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-xl bg-surface-muted px-3.5 py-3"
                      >
                        <dt className="text-xs text-foreground-muted">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 font-display text-lg leading-tight font-semibold text-brand-900">
                          {fact.qualifier ? (
                            <span className="mr-1 text-sm font-medium text-foreground-muted">
                              {fact.qualifier}
                            </span>
                          ) : null}
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {highlights.length ? (
                  <ul className="space-y-1.5 text-sm text-foreground-muted">
                    {highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <CardCta className="mt-auto border-t border-border pt-5">
                  View details
                </CardCta>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
