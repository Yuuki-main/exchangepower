import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "./Icon";
import { CONTROL_CLASSES } from "./Input";

/**
 * Native select with the design-system look. Use inside `Field`.
 * Accepts every native `<select>` attribute.
 *
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} props
 */
export function Select({ className, children, ...rest }) {
  return (
    <div className="relative">
      <select
        className={cn(
          CONTROL_CLASSES,
          "min-h-11 appearance-none pr-10",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDownIcon
        size={18}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-foreground-muted"
      />
    </div>
  );
}
