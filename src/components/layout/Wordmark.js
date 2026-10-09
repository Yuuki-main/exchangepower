import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Typeset "Exchange Power" wordmark linking home. Stands in for the logo
 * until its use is approved (PLAN Part C item 7); swap in the SVG here.
 *
 * @param {object} props
 * @param {string} props.name Business name.
 * @param {"light" | "dark"} [props.tone="light"] Surface it sits on.
 * @param {string} [props.className]
 */
export function Wordmark({ name, tone = "light", className }) {
  const [first, ...rest] = name.split(" ");
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 font-display text-xl font-semibold tracking-tight whitespace-nowrap",
        tone === "dark" ? "text-white" : "text-brand-900",
        className,
      )}
    >
      <span>{first}</span>
      <span className={tone === "dark" ? "text-accent-300" : "text-brand-600"}>
        {rest.join(" ")}
      </span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
