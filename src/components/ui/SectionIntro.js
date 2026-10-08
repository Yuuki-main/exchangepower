import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

/**
 * The standard opening of a page section: eyebrow, heading and lead text.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.eyebrow]
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.lead]
 * @param {string} [props.id] Heading id, for `Section labelledBy`.
 * @param {1 | 2 | 3} [props.level=2] Heading level.
 * @param {import("./Heading").HeadingSize} [props.size="xl"] Heading size.
 * @param {"light" | "dark"} [props.tone="light"] Surface the intro sits on.
 * @param {string} [props.className]
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  id,
  level = 2,
  size = "xl",
  tone = "light",
  className,
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        level={level}
        size={size}
        id={id}
        className={eyebrow ? "mt-4" : undefined}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-reading text-lg",
            tone === "dark"
              ? "text-foreground-inverse-muted"
              : "text-foreground-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
