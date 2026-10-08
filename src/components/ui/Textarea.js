import { cn } from "@/lib/cn";
import { CONTROL_CLASSES } from "./Input";

/**
 * Multi-line text input. Use inside `Field`. Accepts every native
 * `<textarea>` attribute.
 *
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */
export function Textarea({ className, rows = 4, ...rest }) {
  return (
    <textarea
      rows={rows}
      className={cn(CONTROL_CLASSES, "resize-y", className)}
      {...rest}
    />
  );
}
