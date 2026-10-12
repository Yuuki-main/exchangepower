import Link from "next/link";
import { ClockIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { CardCta, CardPhoto } from "./CardPhoto";

/**
 * @typedef {object} PostSummary
 * @property {string} title
 * @property {string} href
 * @property {string} date ISO date.
 * @property {string} category
 * @property {string} excerpt
 * @property {number} readingMinutes
 * @property {string | null} image The post's own image key (shown once approved).
 * @property {string | null} photo Card photo key (see getCardPhoto()).
 * @property {boolean} photoIsOwn The photo is the post's own image (text baked
 *   in): shown whole, with no tint or overlaid labels.
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
 * Blog posts as photo cards: photo with category and reading time, date,
 * title, excerpt and a "Read the guide" action. With `featured`, the first
 * post is a wide card with its title over the photo.
 *
 * @param {object} props
 * @param {PostSummary[]} props.posts
 * @param {2 | 3} [props.headingLevel=2]
 * @param {"default" | "muted"} [props.surface="default"]
 * @param {boolean} [props.featured=false] Show the first post as a wide feature.
 * @param {string} [props.className]
 */
export function PostCardGrid({
  posts,
  headingLevel = 2,
  surface = "default",
  featured = false,
  className,
}) {
  const Heading = /** @type {"h2"} */ (`h${headingLevel}`);
  const card = cn(
    "group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-600/30 motion-reduce:hover:translate-y-0",
    surface === "muted" ? "bg-background" : "bg-surface",
  );
  return (
    <ul
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:gap-8",
        posts.length > 2 && "lg:grid-cols-3",
        className,
      )}
    >
      {posts.map((post, i) =>
        featured && i === 0 && post.photoIsOwn ? (
          // Featured, with the post's own image: image beside the text.
          <li key={post.href} className="sm:col-span-2">
            <Link href={post.href} className={cn(card, "lg:flex-row")}>
              <CardPhoto
                imageKey={post.photo}
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="aspect-video lg:aspect-auto lg:w-3/5"
              />
              <article className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                <span className="self-start rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold tracking-wide text-brand-950">
                  Latest guide
                </span>
                <PostMeta post={post} />
                <Heading className="font-display text-2xl font-bold tracking-tight text-brand-900 transition-colors group-hover:text-brand-600 lg:text-3xl">
                  {post.title}
                </Heading>
                <p className="line-clamp-3 text-foreground-muted">
                  {post.excerpt}
                </p>
                <CardCta className="mt-auto border-t border-border pt-5">
                  Read the guide
                </CardCta>
              </article>
            </Link>
          </li>
        ) : featured && i === 0 ? (
          <li key={post.href} className="sm:col-span-2">
            <Link
              href={post.href}
              className={cn(card, "ring-0 [--ring:var(--color-accent-300)]")}
            >
              <CardPhoto
                imageKey={post.photo}
                sizes="(min-width: 1280px) 830px, (min-width: 640px) 100vw, 100vw"
                scrim="full"
                className="flex min-h-104 flex-1 flex-col justify-end p-6 sm:p-8 lg:min-h-120 lg:p-10"
              >
                <span className="absolute top-5 left-5 rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold tracking-wide text-brand-950 sm:top-6 sm:left-6">
                  Latest guide
                </span>
                <p className="flex flex-wrap items-center gap-x-2 text-sm text-foreground-inverse-muted">
                  <span className="font-semibold text-accent-300">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </p>
                <Heading className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance text-white lg:text-4xl">
                  {post.title}
                </Heading>
                <p className="mt-3 line-clamp-2 max-w-2xl text-foreground-inverse-muted">
                  {post.excerpt}
                </p>
                <CardCta tone="dark" className="mt-6 max-w-2xl">
                  Read the guide
                </CardCta>
              </CardPhoto>
            </Link>
          </li>
        ) : (
          <li key={post.href}>
            <Link href={post.href} className={card}>
              <CardPhoto
                imageKey={post.photo}
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                scrim={post.photoIsOwn ? "none" : "bottom"}
                className="aspect-16/10"
              >
                {post.photoIsOwn ? null : (
                  <>
                    <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-brand-900 shadow-sm">
                      {post.category}
                    </span>
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-3 py-1 text-xs font-semibold text-white">
                      <ClockIcon size={14} />
                      {post.readingMinutes} min read
                    </span>
                  </>
                )}
              </CardPhoto>
              <article className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
                {post.photoIsOwn ? (
                  <PostMeta post={post} />
                ) : (
                  <time
                    dateTime={post.date}
                    className="text-sm text-foreground-muted"
                  >
                    {formatPostDate(post.date)}
                  </time>
                )}
                <Heading className="font-display text-xl font-semibold tracking-tight text-brand-900 transition-colors group-hover:text-brand-600">
                  {post.title}
                </Heading>
                <p className="line-clamp-3 text-foreground-muted">
                  {post.excerpt}
                </p>
                <CardCta className="mt-auto border-t border-border pt-5">
                  Read the guide
                </CardCta>
              </article>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

/**
 * Category, date and reading time on one line (light surfaces).
 * @param {{ post: PostSummary }} props
 */
function PostMeta({ post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm text-foreground-muted">
      <span className="font-semibold text-accent-700">{post.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}
