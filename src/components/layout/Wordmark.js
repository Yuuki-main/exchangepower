import Link from "next/link";
import { getApprovedImage } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * The logo linking home. On light surfaces it shows the business's logo once
 * that image is approved and downloaded (images.js `logo`); otherwise, and on
 * dark surfaces (the logo's blue text needs a light background), it shows
 * the typeset "Exchange Power" wordmark.
 *
 * @param {object} props
 * @param {string} props.name Business name.
 * @param {"light" | "dark"} [props.tone="light"] Surface it sits on.
 * @param {string} [props.className]
 */
export function Wordmark({ name, tone = "light", className }) {
  const logo = tone === "light" ? getApprovedImage("logo") : null;
  if (logo) {
    return (
      <Link
        href="/"
        className={cn("inline-flex min-h-11 items-center", className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
        <img
          src={logo.localPath}
          alt=""
          width={logo.width}
          height={logo.height}
          className="h-12 w-auto lg:h-14"
        />
        <span className="sr-only">{name}, home</span>
      </Link>
    );
  }
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
