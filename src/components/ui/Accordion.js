import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "./Icon";

/**
 * A list of collapsible items, each a rounded card. Built on native `<details>`/`<summary>`, so it
 * works with no JavaScript, is keyboard operable, and its content is
 * findable with the browser's find-in-page.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children `AccordionItem` elements.
 */
export function Accordion({ className, children }) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

/**
 * One collapsible item.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title Summary text (the always-visible question).
 * @param {1 | 2 | 3 | 4 | 5 | 6} [props.headingLevel=3] Wraps the title in a
 *   heading so the item appears in the document outline.
 * @param {boolean} [props.defaultOpen=false] Start expanded.
 * @param {string} [props.name] Give items the same `name` to allow only one
 *   open at a time (exclusive accordion).
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children Panel content.
 */
export function AccordionItem({
  title,
  headingLevel = 3,
  defaultOpen = false,
  name,
  className,
  children,
}) {
  const HeadingTag = /** @type {"h3"} */ (`h${headingLevel}`);
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn(
        "group rounded-2xl bg-background px-5 ring-1 ring-border transition-shadow open:shadow-md open:ring-brand-600/30 sm:px-6",
        className,
      )}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:hidden hover:text-brand-700 [&::-webkit-details-marker]:hidden">
        <HeadingTag className="text-lg font-semibold">{title}</HeadingTag>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-muted text-brand-700 transition-colors group-open:bg-brand-900 group-open:text-white"
        >
          <ChevronDownIcon
            size={18}
            className="transition-transform group-open:rotate-180"
          />
        </span>
      </summary>
      <div className="pb-5 text-foreground-muted">{children}</div>
    </details>
  );
}
