import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { PostCardGrid } from "@/components/sections/PostCardGrid";
import { Section } from "@/components/ui/Section";

/**
 * Blog index: every post, newest first. A category filter would go above the
 * grid once more than one category exists (currently only "Solar").
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.lead
 * @param {import("@/components/sections/PostCardGrid.js").PostSummary[]} props.posts
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function BlogIndex({ title, lead, posts, site }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="Guides"
        title={title}
        lead={lead}
      />
      <Section labelledBy="posts-title">
        <h2 id="posts-title" className="sr-only">
          All posts
        </h2>
        <PostCardGrid posts={posts} headingLevel={3} />
      </Section>
      <CtaBand
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={{ label: site.cta.quoteLabel, href: site.cta.quoteHref }}
        phone={site.phone}
      />
    </>
  );
}
