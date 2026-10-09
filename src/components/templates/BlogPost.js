import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { MediaSlot } from "@/components/sections/MediaSlot";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  PostCardGrid,
  formatPostDate,
} from "@/components/sections/PostCardGrid";
import { Prose } from "@/components/sections/Prose";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * Blog post: header with date and reading time, the article, related posts
 * and the closing call to action.
 *
 * @param {object} props
 * @param {import("@/lib/content-schema.js").Post} props.post
 * @param {string} props.path
 * @param {string} props.bodyHtml
 * @param {import("@/components/sections/PostCardGrid.js").PostSummary[]} props.related
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function BlogPost({ post, path, bodyHtml, related, site }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: post.title, href: path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.seo.description,
          date: post.date,
          path,
        })}
      />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={post.category}
        title={post.title}
        lead={
          <>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </>
        }
      />

      <Section labelledBy="post-body-title">
        <article
          aria-labelledby="post-body-title"
          className="mx-auto max-w-[42rem]"
        >
          <h2 id="post-body-title" className="sr-only">
            {post.title}
          </h2>
          <MediaSlot
            imageKey={post.image}
            sizes="(min-width: 768px) 42rem, 100vw"
            preload
            className="mb-10 aspect-video"
          />
          <Prose html={bodyHtml} />
        </article>
      </Section>

      {related.length ? (
        <Section background="muted" labelledBy="related-posts-title">
          <SectionIntro
            id="related-posts-title"
            eyebrow="Keep reading"
            title="More guides"
            size="lg"
          />
          <PostCardGrid
            posts={related}
            headingLevel={3}
            surface="muted"
            className="reveal mt-10"
          />
        </Section>
      ) : null}

      <CtaBand
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={{ label: site.cta.quoteLabel, href: site.cta.quoteHref }}
        phone={site.phone}
      />
    </>
  );
}
