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

/**
 * Modal dialog built on the native `<dialog>` element and `showModal()`. The
 * browser provides the focus trap, Esc to close, the inert background and
 * returning focus to the trigger. Clicking the backdrop also closes it.
 *
 * This is the only client component in the UI kit.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title Dialog heading (also its accessible name).
 * @param {React.ReactNode} [props.description] Short text under the title.
 * @param {React.ReactNode} props.triggerLabel Text of the button that opens it.
 * @param {import("./Button").ButtonVariant} [props.triggerVariant="primary"]
 * @param {import("./Button").ButtonSize} [props.triggerSize="md"]
 * @param {"sm" | "md" | "lg"} [props.size="md"] Max width of the panel.
 * @param {string} [props.closeLabel="Close"] Accessible name of the close button.
 * @param {React.ReactNode} props.children Dialog body.
 */
export function Dialog({
  title,
  description,
  triggerLabel,
  triggerVariant = "primary",
  triggerSize = "md",
  size = "md",
  closeLabel = "Close",
  children,
}) {
  const ref = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const titleId = useId();
  const descriptionId = useId();

  /** @param {React.MouseEvent<HTMLDialogElement>} event */
  function closeOnBackdrop(event) {
    // A click on the <dialog> itself (not its content) is a backdrop click.
    if (event.target === event.currentTarget) ref.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        className={buttonClasses({
          variant: triggerVariant,
          size: triggerSize,
        })}
        onClick={() => ref.current?.showModal()}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={closeOnBackdrop}
        className={cn(
          "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-xl border-0 bg-background p-0 text-foreground shadow-lg",
          "opacity-0 transition-[opacity,scale,display,overlay] transition-discrete duration-200 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0",
          "backdrop:bg-brand-950/60",
          SIZES[size],
        )}
      >
        <div className="p-5 sm:p-7">
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
