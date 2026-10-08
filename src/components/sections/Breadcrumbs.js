import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Breadcrumb trail. The last item is the current page (not a link).
 * Pair with breadcrumbJsonLd() from src/lib/seo.js for structured data.
 *
 * @param {object} props
 * @param {{ label: string, href: string }[]} props.items Home first, current page last.
 * @param {"light" | "dark"} [props.tone="light"] Surface it sits on.
 * @param {string} [props.className]
 */
export function Breadcrumbs({ items, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRightIcon
                  size={14}
                  className={
                    dark
                      ? "text-foreground-inverse-muted"
                      : "text-foreground-muted"
                  }
                />
              ) : null}
              {current ? (
                <span
                  aria-current="page"
                  className={cn(
                    "font-semibold",
                    dark ? "text-white" : "text-foreground",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    dark
                      ? "text-foreground-inverse-muted hover:text-white"
                      : "text-foreground-muted hover:text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
