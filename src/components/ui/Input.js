import { cn } from "@/lib/cn";

/** Shared look for text inputs and textareas. */
export const CONTROL_CLASSES =
  "block w-full rounded-md border border-border-strong bg-background px-3.5 py-2.5 text-base text-foreground placeholder:text-neutral-500 transition-colors hover:border-neutral-700 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70 aria-invalid:border-error-600 aria-invalid:[--ring:var(--color-error-600)]";

/**
 * Single-line text input. Use inside `Field` to get a label, hint and error
 * wired up with `aria-describedby`. Accepts every native `<input>` attribute.
 *
 * Text size is 16px so iOS Safari does not zoom in on focus.
 *
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props
 */
export function Input({ className, type = "text", ...rest }) {
  return (
    <input
      type={type}
      className={cn(CONTROL_CLASSES, "min-h-11", className)}
      {...rest}
    />
  );
}
