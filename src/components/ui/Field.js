import { cn } from "@/lib/cn";
import { AlertCircleIcon } from "./Icon";

/**
 * @typedef {object} FieldControlProps Props to spread onto the control.
 * @property {string} id
 * @property {string | undefined} aria-describedby
 * @property {true | undefined} aria-invalid
 * @property {boolean | undefined} required
 */

/**
 * Label, hint and error text for one form control, with the accessibility
 * wiring done for you. `children` is a function that receives the props to
 * spread onto the control.
 *
 * @example
 * <Field id="email" label="Email" hint="We reply within one business day" required>
 *   {(control) => <Input type="email" name="email" autoComplete="email" {...control} />}
 * </Field>
 *
 * @param {object} props
 * @param {string} props.id Control id. Hint and error ids derive from it.
 * @param {React.ReactNode} props.label Visible label text.
 * @param {React.ReactNode} [props.hint] Help text under the label.
 * @param {React.ReactNode} [props.error] Error message. Marks the control invalid.
 * @param {boolean} [props.required] Adds `required` and a visual marker.
 * @param {string} [props.className]
 * @param {(control: FieldControlProps) => React.ReactNode} props.children
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="ml-0.5 text-error-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-foreground-muted">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}
      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-sm font-medium text-error-600"
        >
          <AlertCircleIcon size={16} className="mt-0.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
