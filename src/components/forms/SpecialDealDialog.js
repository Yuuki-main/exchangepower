"use client";

import { useEffect, useId, useRef } from "react";
import { CloseIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { QuoteForm } from "./QuoteForm";

/** localStorage key set once the popup has been shown. */
const SEEN_KEY = "ep-special-deal-seen";
/** Wait a moment so the page is visible before the popup covers it. */
const OPEN_DELAY_MS = 1500;

/**
 * "Get A Special Deal" popup shown once, on a visitor's first visit. Built on
 * the native `<dialog>` (focus trap, Esc to close, inert background), like
 * the UI kit's Dialog. Being seen is remembered in localStorage; if storage
 * is unavailable the popup is not shown, so it never nags on every page.
 */
export function SpecialDealDialog() {
  const ref = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const titleId = useId();

  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      return;
    }
    const timer = setTimeout(() => ref.current?.showModal(), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  /** @param {React.MouseEvent<HTMLDialogElement>} event */
  function handleClick(event) {
    // A click on the <dialog> itself (not its content) is a backdrop click.
    if (event.target === event.currentTarget) ref.current?.close();
    else if (/** @type {HTMLElement} */ (event.target).closest("a[href]")) {
      ref.current?.close();
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={handleClick}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl rounded-xl shadow-lg",
        "overflow-y-auto overscroll-contain border-0 bg-background p-0 text-foreground",
        "opacity-0 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0",
        "transition-[opacity,scale,translate,display,overlay] transition-discrete duration-200",
        "backdrop:bg-brand-950/60",
      )}
    >
      <div className="p-5 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-2xl font-semibold sm:text-3xl"
          >
            Get A Special Deal
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="-m-2 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-foreground-muted hover:bg-surface-muted hover:text-foreground"
          >
            <CloseIcon />
          </button>
        </div>
        <QuoteForm variant="deal" submitLabel="Submit" />
      </div>
    </dialog>
  );
}
