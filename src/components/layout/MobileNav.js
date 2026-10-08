import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { MenuIcon, PhoneIcon } from "@/components/ui/Icon";

/** @typedef {import("@/lib/content-schema.js").NavItem} NavItem */

/**
 * Mobile and tablet menu (below lg). A side sheet built on the native
 * <dialog> (focus trap, Esc, scroll lock and focus return come from the
 * browser). Submenus are shown expanded: fewer taps, no nested toggles.
 *
 * @param {object} props
 * @param {NavItem[]} props.items
 * @param {{ label: string, href: string }} props.quote
 * @param {{ display: string, href: string }} props.phone
 */
export function MobileNav({ items, quote, phone }) {
  return (
    <Dialog
      variant="sheet"
      title="Menu"
      triggerLabel={<MenuIcon size={24} />}
      triggerAriaLabel="Open menu"
      triggerClassName="inline-flex size-11 items-center justify-center rounded-md text-brand-900 hover:bg-surface-muted"
      closeLabel="Close menu"
    >
      <nav aria-label="Main" className="-mx-1 flex-1">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.label} className="py-1">
              <Link
                href={item.href ?? "/"}
                className="flex min-h-12 items-center px-1 font-display text-xl font-semibold text-brand-900"
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <ul className="mb-2 grid grid-cols-2 gap-x-3">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href ?? "/"}
                        className="flex min-h-11 items-center px-1 text-foreground-muted hover:text-brand-700"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sticky bottom-0 -mx-5 mt-6 grid gap-3 border-t border-border bg-background px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-7 sm:px-7">
        <Button href={quote.href} fullWidth size="lg">
          {quote.label}
        </Button>
        <Button href={phone.href} variant="ghost" fullWidth size="lg">
          <PhoneIcon size={18} /> {phone.display}
        </Button>
      </div>
    </Dialog>
  );
}
