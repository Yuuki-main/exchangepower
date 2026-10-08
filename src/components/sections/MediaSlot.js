import Image from "next/image";
import { getApprovedImage } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Optional image. Renders only when the key points to an image that is
 * approved and downloaded (images.js `approved: true`); otherwise renders
 * nothing, so layouts must look complete without it.
 *
 * @param {object} props
 * @param {string | null | undefined} props.imageKey
 * @param {string} props.sizes next/image `sizes`.
 * @param {boolean} [props.preload=false] Only for an above-the-fold image.
 * @param {string} [props.className] Classes for the wrapper.
 */
export function MediaSlot({ imageKey, sizes, preload = false, className }) {
  const image = getApprovedImage(imageKey);
  if (!image) return null;
  return (
    <div className={cn("overflow-hidden bg-surface-muted", className)}>
      <Image
        src={image.localPath}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={preload}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
