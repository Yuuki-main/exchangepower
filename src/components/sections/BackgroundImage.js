import { getImageProps } from "next/image";
import { getApprovedImage } from "@/lib/content";

/**
 * Decorative full-bleed photo behind a dark section (page headers, hero, CTA
 * bands). Renders nothing when the key is empty or the image isn't approved,
 * so the section falls back to its plain dark surface.
 *
 * The parent must be `relative isolate` (and usually `overflow-hidden`); the
 * photo sits at `-z-10`, above the parent's background and below its content.
 *
 * Contrast: a 75% brand-950 layer covers the whole photo, which keeps white,
 * brand-100 and accent-300 text at WCAG AA or better even over pure white
 * pixels (4.97:1 for accent-300, the lowest). A left-to-right gradient
 * darkens the text column further (about 90%).
 *
 * @param {object} props
 * @param {string | null | undefined} props.imageKey A "bg-…" key in images.js.
 * @param {boolean} [props.preload=false] Above the fold: load eagerly with high
 *   fetch priority. Everything else lazy-loads.
 * @param {string} [props.position="center"] CSS object-position.
 */
export function BackgroundImage({ imageKey, preload = false, position }) {
  const image = getApprovedImage(imageKey);
  if (!image) return null;
  const { props } = getImageProps({
    src: image.localPath,
    alt: "",
    width: image.width,
    height: image.height,
    sizes: "100vw",
    ...(preload ? { loading: "eager", fetchPriority: "high" } : {}),
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image getImageProps() */}
      <img
        {...props}
        alt=""
        className="h-full w-full object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
      <div className="absolute inset-0 bg-brand-950/60" />
      <div className="absolute inset-0 bg-linear-to-r from-brand-950/60 via-brand-950/30 to-brand-950/20" />
    </div>
  );
}
