import { getImageProps } from "next/image";
import { getApprovedImage } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Optional image. Renders only when the key points to an image that is
 * approved and downloaded (images.js `approved: true`); otherwise renders
 * nothing, so layouts must look complete without it.
 *
 * Uses next/image's getImageProps() (optimised srcset, sizes, lazy loading,
 * width/height) on the server and renders a plain <img>, so pages don't ship
 * next/image's client component (Step 9).
 *
 * @param {object} props
 * @param {string | null | undefined} props.imageKey
 * @param {string} props.sizes Responsive `sizes` attribute.
 * @param {boolean} [props.preload=false] Only for the one above-the-fold image:
 *   loads it eagerly with high fetch priority (the next/image docs' recommended
 *   alternative to `preload`); everything else lazy-loads.
 * @param {string} [props.className] Classes for the wrapper.
 */
export function MediaSlot({ imageKey, sizes, preload = false, className }) {
  const image = getApprovedImage(imageKey);
  if (!image) return null;
  const { props } = getImageProps({
    src: image.localPath,
    alt: image.alt,
    width: image.width,
    height: image.height,
    sizes,
    ...(preload ? { loading: "eager", fetchPriority: "high" } : {}),
  });
  return (
    <div className={cn("overflow-hidden bg-surface-muted", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image getImageProps() */}
      <img {...props} alt={image.alt} className="h-full w-full object-cover" />
    </div>
  );
}
