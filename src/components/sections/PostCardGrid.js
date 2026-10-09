import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { MediaSlot } from "./MediaSlot";

/**
 * @typedef {object} PostSummary
 * @property {string} title
 * @property {string} href
 * @property {string} date ISO date.
 * @property {string} category
 * @property {string} excerpt
 * @property {number} readingMinutes
 * @property {string | null} image Image key; shown only once approved.
 */

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** @param {string} iso */
export function formatPostDate(iso) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Blog posts as a hairline grid of link tiles: category, date, reading
 * time, title and excerpt. Used by the blog index and related posts.
 *
 * @param {object} props
 * @param {PostSummary[]} props.posts
 * @param {2 | 3} [props.headingLevel=2]
 * @param {"default" | "muted"} [props.surface="default"]
 * @param {string} [props.className]
 */
export function PostCardGrid({
  posts,
  headingLevel = 2,
  surface = "default",
  className,
}) {
  const Heading = /** @type {"h2"} */ (`h${headingLevel}`);
  return (
    <ul
      className={cn(
        // Each tile draws its right and bottom edge, so an incomplete last row
        // leaves empty space rather than a grey block.
        "grid border-t border-l border-border sm:grid-cols-2",
        posts.length > 2 && "lg:grid-cols-3",
        className,
      )}
    >
      {posts.map((post) => (
        <li
          key={post.href}
          className={cn(
            "border-r border-b border-border",
            surface === "muted" ? "bg-surface" : "bg-background",
          )}
        >
          <Link
            href={post.href}
            className="group flex h-full flex-col hover:bg-surface-muted"
          >
            <MediaSlot
              imageKey={post.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-video"
            />
            <article className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
              <p className="flex flex-wrap items-center gap-x-2 text-sm text-foreground-muted">
                <span className="font-semibold text-accent-700">
                  {post.category}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </p>
              <Heading className="font-display text-xl font-semibold tracking-tight text-brand-900 group-hover:text-brand-600">
                {post.title}
              </Heading>
              <p className="text-foreground-muted">{post.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-700">
                Read the guide
                <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
