"use client";

import { useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses } from "./Button";
import { CloseIcon } from "./Icon";

/** @type {Record<"sm" | "md" | "lg", string>} */
const SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/** @type {Record<"modal" | "sheet", string>} */
const VARIANTS = {
  // Centred panel.
  modal: cn(
    "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] rounded-xl shadow-lg",
    "opacity-0 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0",
  ),
  // Full-height panel from the right; full width on small phones.
  sheet: cn(
    "m-0 ml-auto h-dvh max-h-dvh w-full rounded-none",
    "translate-x-full open:translate-x-0 starting:open:translate-x-full",
  ),
};

/**
 * Dialog built on the native `<dialog>` element and `showModal()`. The
 * browser provides the focus trap, Esc to close, the inert background and
 * returning focus to the trigger. Clicking the backdrop also closes it.
 *
 * This is the only client component in the UI kit.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title Dialog heading (also its accessible name).
 * @param {React.ReactNode} [props.description] Short text under the title.
 * @param {React.ReactNode} props.triggerLabel Content of the button that opens it.
 * @param {string} [props.triggerAriaLabel] Accessible name when the trigger is icon-only.
 * @param {string} [props.triggerClassName] Replaces the default Button look of the trigger.
 * @param {import("./Button").ButtonVariant} [props.triggerVariant="primary"]
 * @param {import("./Button").ButtonSize} [props.triggerSize="md"]
 * @param {"modal" | "sheet"} [props.variant="modal"] Centred panel or side sheet.
 * @param {"sm" | "md" | "lg"} [props.size="md"] Max width of the panel.
 * @param {boolean} [props.closeOnNavigate=true] Close when a link inside is followed.
 * @param {string} [props.closeLabel="Close"] Accessible name of the close button.
 * @param {string} [props.className] Extra classes for the panel.
 * @param {React.ReactNode} props.children Dialog body.
 */
export function Dialog({
  title,
  description,
  triggerLabel,
  triggerAriaLabel,
  triggerClassName,
  triggerVariant = "primary",
  triggerSize = "md",
  variant = "modal",
  size = "md",
  closeOnNavigate = true,
  closeLabel = "Close",
  className,
  children,
}) {
  const ref = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const titleId = useId();
  const descriptionId = useId();

  /** @param {React.MouseEvent<HTMLDialogElement>} event */
  function handleClick(event) {
    const target = /** @type {HTMLElement} */ (event.target);
    // A click on the <dialog> itself (not its content) is a backdrop click.
    if (target === event.currentTarget) ref.current?.close();
    else if (closeOnNavigate && target.closest("a[href]")) ref.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={triggerAriaLabel}
        className={
          triggerClassName ??
          buttonClasses({ variant: triggerVariant, size: triggerSize })
        }
        onClick={() => ref.current?.showModal()}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={handleClick}
        className={cn(
          "overflow-y-auto overscroll-contain border-0 bg-background p-0 text-foreground",
          "transition-[opacity,scale,translate,display,overlay] transition-discrete duration-200",
          "backdrop:bg-brand-950/60",
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
      >
        <div
          className={cn(
            "p-5 sm:p-7",
            variant === "sheet" && "flex min-h-full flex-col",
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-display text-2xl font-semibold">
                {title}
              </h2>
              {description ? (
                <p id={descriptionId} className="mt-1 text-foreground-muted">
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={closeLabel}
              className="-m-2 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
