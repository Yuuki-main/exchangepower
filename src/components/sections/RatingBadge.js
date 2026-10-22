import { StarIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Five stars and the review summary ("4.8 from 1,194 reviews") as a pill.
 * The figure comes from site.reviewSummary (shown at the owner's request;
 * no source is published yet, so there is no link and no rating markup).
 *
 * @param {object} props
 * @param {{ rating: number, text: string }} props.summary
 * @param {"dark" | "light"} [props.tone="light"] Surface it sits on.
 * @param {string} [props.className]
 */
export function RatingBadge({ summary, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-2 ring-1",
        dark
          ? "bg-brand-950/60 ring-white/15 backdrop-blur-md"
          : "bg-accent-50 ring-accent-200",
        className,
      )}
    >
      <span
        className={cn("flex", dark ? "text-accent-400" : "text-accent-700")}
        role="img"
        aria-label={`Rated ${summary.rating} out of 5`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} size={16} />
        ))}
      </span>
      <span
        className={cn(
          "text-sm font-semibold whitespace-nowrap",
          dark ? "text-white" : "text-brand-900",
        )}
      >
        {summary.text}
      </span>
    </p>
  );
}
