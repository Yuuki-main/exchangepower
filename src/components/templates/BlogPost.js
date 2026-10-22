import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { MediaSlot } from "@/components/sections/MediaSlot";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  PostCardGrid,
  formatPostDate,
} from "@/components/sections/PostCardGrid";
import { Prose } from "@/components/sections/Prose";
import { TableOfContents } from "@/components/sections/TableOfContents";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { getBackground } from "@/lib/content";

/**
 * Blog post: header with date and reading time, an optional dated update
 * notice, a table of contents for long posts, the article, its FAQs,
 * related posts and the closing call to action (the post's own when set).
 *
 * @param {object} props
 * @param {import("@/lib/content-schema.js").Post} props.post
 * @param {string} props.path
 * @param {string} props.bodyHtml
 * @param {{ id: string, text: string }[]} props.toc Empty for short posts.
 * @param {string | null} props.noticeHtml
 * @param {import("@/components/sections/PostCardGrid.js").PostSummary[]} props.related
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function BlogPost({
  post,
  path,
  bodyHtml,
  toc,
  noticeHtml,
  related,
  site,
}) {
  const faqs = post.faqs ?? [];
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
          updated: post.updated,
          path,
        })}
      />
      {faqs.length ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}

      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground(`posts/${post.slug}`)}
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
          {noticeHtml ? (
            <div
              role="note"
              className="mb-10 border-l-4 border-accent-400 bg-surface-muted p-5 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                Update
              </p>
              <div
                className="mt-2 space-y-2"
                dangerouslySetInnerHTML={{ __html: noticeHtml }}
              />
            </div>
          ) : null}
          <MediaSlot
            imageKey={post.image}
            sizes="(min-width: 768px) 42rem, 100vw"
            preload
            className="mb-10 rounded-3xl ring-1 ring-border"
          />
          {toc.length ? (
            <TableOfContents
              items={toc}
              title="In this guide"
              className="mb-10 rounded-2xl bg-surface-muted p-5"
            />
          ) : null}
          <Prose html={bodyHtml} />
          <footer className="mt-12 rounded-2xl bg-surface-muted p-6 ring-1 ring-border">
            <p className="font-semibold text-brand-900">
              Written by the {site.name} team
            </p>
            <p className="mt-1 text-sm text-foreground-muted">
              Solar and battery installers based in Wangara, WA.{" "}
              <time dateTime={post.updated ?? post.date}>
                Last updated {formatPostDate(post.updated ?? post.date)}.
              </time>
            </p>
            {post.reviewedBy ? (
              <p className="mt-3 text-sm text-foreground">
                Reviewed by {post.reviewedBy.name}, {post.reviewedBy.role}.
              </p>
            ) : null}
          </footer>
        </article>
      </Section>

      {faqs.length ? (
        <Section labelledBy="faq-title" className="border-t border-border">
          <div className="mx-auto max-w-[42rem]">
            <SectionIntro
              id="faq-title"
              eyebrow="Questions"
              title="Frequently asked questions"
              size="lg"
            />
            <FaqList faqs={faqs} className="mt-8" />
          </div>
        </Section>
      ) : null}

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
        background={getBackground("ctaBand")}
        title={post.cta?.title ?? site.cta.title}
        text={post.cta?.text ?? site.cta.subtitle}
        quote={{ label: site.cta.quoteLabel, href: site.cta.quoteHref }}
        phone={site.phone}
      />
    </>
  );
}
