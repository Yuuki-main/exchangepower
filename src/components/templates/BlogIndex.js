import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { PostCardGrid } from "@/components/sections/PostCardGrid";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getBackground } from "@/lib/content";
import { POST_CATEGORIES } from "@/lib/content-schema";
import { slugify } from "@/lib/markdown";

/**
 * Blog index: the newest post as a feature, then every post grouped by
 * category (newest first), with jump links to each category. Plain links,
 * so it needs no JavaScript.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.lead
 * @param {import("@/components/sections/PostCardGrid.js").PostSummary[]} props.posts
 * @param {import("@/lib/content-schema.js").SiteInfo} props.site
 */
export function BlogIndex({ title, lead, posts, site }) {
  const groups = POST_CATEGORIES.map((category) => ({
    category,
    id: slugify(category),
    posts: posts.filter((post) => post.category === category),
  })).filter((group) => group.posts.length);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        background={getBackground("blog")}
        eyebrow="Guides"
        title={title}
        lead={lead}
      />
      <Section labelledBy="posts-title" spacing="md">
        <h2 id="posts-title" className="sr-only">
          Latest guide
        </h2>
        <PostCardGrid posts={posts.slice(0, 1)} headingLevel={3} featured />
        <nav aria-label="Guide categories" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-sm font-semibold text-brand-900 ring-1 ring-border hover:ring-brand-600"
                >
                  {group.category}
                  <span className="ml-2 text-foreground-muted">
                    {group.posts.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
      {groups.map((group, i) => (
        <Section
          key={group.id}
          id={group.id}
          spacing="md"
          background={i % 2 === 0 ? "muted" : "default"}
          labelledBy={`${group.id}-title`}
        >
          <SectionIntro
            id={`${group.id}-title`}
            eyebrow="Guides"
            title={group.category}
            size="lg"
          />
          <PostCardGrid
            posts={group.posts}
            headingLevel={3}
            surface={i % 2 === 0 ? "muted" : "default"}
            className="mt-10"
          />
        </Section>
      ))}
      <CtaBand
        background={getBackground("ctaBand")}
        title={site.cta.title}
        text={site.cta.subtitle}
        quote={{ label: site.cta.quoteLabel, href: site.cta.quoteHref }}
        phone={site.phone}
      />
    </>
  );
}
