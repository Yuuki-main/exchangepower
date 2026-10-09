import { BlogIndex } from "@/components/templates/BlogIndex";
import { getAllPosts, getBlogIndex, getSite } from "@/lib/content";
import { toPostSummary } from "@/lib/post-pages";
import { buildMetadata } from "@/lib/seo";

const blog = getBlogIndex();

export const metadata = buildMetadata({
  ...blog.seo,
  path: "/blog/",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <BlogIndex
      title={blog.title}
      posts={getAllPosts().map(toPostSummary)}
      site={getSite()}
    />
  );
}
