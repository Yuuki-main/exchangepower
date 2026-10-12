import { getImageProps } from "next/image";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { getApprovedImage } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * The photo area of a card: a decorative image that zooms slowly when the
 * card (a `group`) is hovered or focused, an optional scrim for text laid
 * over it, and any overlay content (chips, titles) as children.
 *
 * Without an approved image it falls back to a brand-coloured panel with a
 * soft sun glow, so a card never shows an empty grey box.
 *
 * @param {object} props
 * @param {string | null | undefined} props.imageKey Key in images.js.
 * @param {string} props.sizes Responsive `sizes` for the image.
 * @param {"none" | "bottom" | "full"} [props.scrim="none"]
 *   `bottom`: dark gradient rising from the bottom, for chips and short text.
 *   `full`: strong gradient for titles and paragraphs over the photo (keeps
 *   white text at WCAG AA over bright photos).
 * @param {string} [props.className] Size and shape (for example an aspect ratio).
 * @param {React.ReactNode} [props.children] Content over the photo.
 */
export function CardPhoto({
  imageKey,
  sizes,
  scrim = "none",
  className,
  children,
}) {
  const image = getApprovedImage(imageKey);
  const img = image
    ? getImageProps({
        src: image.localPath,
        alt: "",
        width: image.width,
        height: image.height,
        sizes,
        // Under a scrim or small: quality 50 is visually identical and lighter.
        quality: 50,
      }).props
    : null;
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-brand-900", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element -- props come from next/image getImageProps()
          <img
            {...img}
            alt=""
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="size-full bg-[radial-gradient(circle_at_80%_15%,var(--color-accent-400)_0,transparent_45%)] opacity-40" />
        )}
        {scrim === "bottom" ? (
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
        ) : null}
        {scrim === "full" ? (
          <>
            <div className="absolute inset-0 bg-brand-950/45" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/95 via-brand-950/60 to-brand-950/10" />
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/**
 * The action row at the foot of a card: a label and a round arrow button that
 * fills with the accent colour when the card is hovered or focused.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Label, for example "View details".
 * @param {"light" | "dark"} [props.tone="light"] Surface it sits on.
 * @param {string} [props.className]
 */
export function CardCta({ children, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "flex items-center justify-between gap-4 text-sm font-semibold",
        dark ? "text-white" : "text-brand-700",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950 group-focus-visible:bg-accent-400 group-focus-visible:text-brand-950",
          dark ? "bg-white/15 text-white" : "bg-brand-900 text-white",
        )}
      >
        <ArrowRightIcon
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </span>
  );
}
