"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** @typedef {import("@/lib/content-schema.js").NavItem} NavItem */

/**
 * Desktop navigation (lg and up). Items with children use the disclosure
 * pattern: the label stays a normal link and a separate button toggles the
 * submenu (click, Enter or Space; Esc closes; opens on mouse hover too).
 *
 * @param {object} props
 * @param {NavItem[]} props.items
 * @param {string} [props.className]
 */
export function DesktopNav({ items, className }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(/** @type {number | null} */ (null));
  const navRef = useRef(/** @type {HTMLElement | null} */ (null));
  const baseId = useId();

  // Close on outside click and on Esc (returning focus to the toggle).
  useEffect(() => {
    if (open === null) return;
    /** @param {PointerEvent} e */
    const onPointer = (e) => {
      if (!navRef.current?.contains(/** @type {Node} */ (e.target)))
        setOpen(null);
    };
    /** @param {KeyboardEvent} e */
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      navRef.current
        ?.querySelector(`[aria-controls="${baseId}-${open}"]`)
        ?.closest("button")
        ?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, baseId]);

  /** @param {string | null} href */
  const isCurrent = (href) =>
    href !== null &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav ref={navRef} aria-label="Main" className={className}>
      <ul className="flex items-center xl:gap-1">
        {items.map((item, i) => {
          const linkClasses = cn(
            "inline-flex h-10 items-center rounded-sm px-2 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:text-brand-700 xl:text-[0.9375rem]",
            isCurrent(item.href) &&
              "text-brand-700 underline decoration-accent-500 decoration-2 underline-offset-8",
          );
          if (!item.children?.length) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href ?? "/"}
                  className={linkClasses}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          }
          const menuId = `${baseId}-${i}`;
          const expanded = open === i;
          return (
            <li
              key={item.label}
              className="relative flex items-center"
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onBlur={(e) => {
                if (
                  !e.currentTarget.contains(
                    /** @type {Node} */ (e.relatedTarget),
                  )
                )
                  setOpen(null);
              }}
            >
              <Link
                href={item.href ?? "/"}
                className={cn(linkClasses, "pr-1")}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={menuId}
                aria-label={`${item.label} menu`}
                onClick={() => setOpen(expanded ? null : i)}
                className="inline-flex size-8 items-center justify-center rounded-sm text-foreground-muted hover:text-brand-700"
              >
                <ChevronDownIcon
                  size={16}
                  className={cn(
                    "transition-transform",
                    expanded && "rotate-180",
                  )}
                />
              </button>
              <ul
                id={menuId}
                hidden={!expanded}
                className="absolute top-full left-0 z-50 min-w-60 border border-border bg-background py-2 shadow-lg"
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href ?? "/"}
                      onClick={() => setOpen(null)}
                      aria-current={
                        child.href === pathname ? "page" : undefined
                      }
                      className="block px-4 py-2.5 text-[0.9375rem] text-foreground hover:bg-surface hover:text-brand-700 aria-[current=page]:font-semibold aria-[current=page]:text-brand-700"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
