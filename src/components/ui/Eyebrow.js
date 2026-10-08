import { cn } from "@/lib/cn";

/**
 * Small uppercase label above a heading, with a short amber rule.
 * Colours meet AA: accent-700 on light surfaces, accent-300 on dark ones.
 *
 * @param {object} props
 * @param {"light" | "dark"} [props.tone="light"] Surface the label sits on.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Eyebrow({ tone = "light", className, children }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase",
        tone === "dark" ? "text-accent-300" : "text-accent-700",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}
