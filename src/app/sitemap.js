import { SITE } from "@/content/site.js";
import {
  getAllPosts,
  getAllProducts,
  getPostPath,
  getProductPath,
} from "@/lib/content";
import { STATIC_ROUTES } from "@/lib/content-schema";

// Every public route.
// lastModified is only given where the content has a real date (posts, and
// the blog index = newest post); other pages have no reliable date to report.

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  const url = (/** @type {string} */ path) => new URL(path, SITE.url).href;
  const posts = getAllPosts();
  const newest = posts[0]?.date;

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: url(path),
      ...(path === "/blog/" && newest ? { lastModified: newest } : {}),
    })),
    ...getAllProducts().map((product) => ({
      url: url(getProductPath(product)),
    })),
    ...posts.map((post) => ({
      url: url(getPostPath(post)),
      lastModified: post.date,
    })),
  ];
}
