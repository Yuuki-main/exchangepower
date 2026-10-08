import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { MediaSlot } from "./MediaSlot";

/** @typedef {import("@/lib/product-pages.js").ProductSummary} ProductSummary */

/**
 * Products as a hairline grid of link tiles (no photos needed). Each tile
 * shows the title, up to two key facts or highlights, and an optional image
 * that appears only once approved.
 *
 * @param {object} props
 * @param {ProductSummary[]} props.products
 * @param {2 | 3 | 4} [props.headingLevel=3] Heading level of each tile title.
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
  const tileBg = surface === "muted" ? "bg-surface" : "bg-background";
  return (
    <ul
      className={cn(
        // 1px gaps over a border-coloured background draw the dividers.
        "grid gap-px border border-border bg-border sm:grid-cols-2",
        products.length > 2 && "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => {
        const details = product.keyFacts.length
          ? product.keyFacts
              .slice(0, 2)
              .map(
                (f) =>
                  `${f.label}: ${f.qualifier ? `${f.qualifier.toLowerCase()} ` : ""}${f.value}`,
              )
          : product.highlights.slice(0, 2);
        return (
          <li key={product.href} className={tileBg}>
            <Link
              href={product.href}
              className="group flex h-full flex-col hover:bg-surface-muted"
            >
              <MediaSlot
                imageKey={product.image}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2]"
              />
              <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
                <Heading className="font-display text-2xl font-semibold tracking-tight text-brand-900 group-hover:text-brand-600">
                  {product.title}
                </Heading>
                {details.length ? (
                  <ul className="space-y-1.5 text-sm text-foreground-muted">
                    {details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 bg-accent-700"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-700">
                  View details
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
