import "server-only";

import {
  getAllPosts,
  getCardPhoto,
  getPost,
  getPostPath,
  getRelatedPosts,
  isOwnPhoto,
} from "./content";
import { renderMarkdown, renderMarkdownWithHeadings } from "./markdown";
import { buildMetadata } from "./seo";

/** @typedef {import("./content-schema.js").Post} Post */

/**
 * A post reduced to what cards need.
 * @param {Post} post
 * @returns {import("@/components/sections/PostCardGrid.js").PostSummary}
 */
export function toPostSummary(post) {
  return {
    title: post.title,
    href: getPostPath(post),
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    readingMinutes: post.readingMinutes,
    image: post.image,
    photo: getCardPhoto(post.image, `posts/${post.slug}`),
    photoIsOwn: isOwnPhoto(post.image),
  };
}

export function postStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** @param {string} slug */
export function postMetadata(slug) {
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    ...post.seo,
    path: getPostPath(post),
    absoluteTitle: true,
    type: "article",
    publishedTime: post.date,
  });
}

/**
 * Everything a post page needs, or null for an unknown slug.
 * @param {string} slug
 */
export function getPostPageData(slug) {
  const post = getPost(slug);
  if (!post) return null;
  const { html, headings } = renderMarkdownWithHeadings(post.body);
  const words = post.body.split(/\s+/).filter(Boolean).length;
  return {
    post,
    path: getPostPath(post),
    bodyHtml: html,
    // Table of contents for posts over 1,000 words (content handover, Blog CMS setup).
    toc: words > 1000 ? headings.filter((h) => h.level === 2) : [],
    noticeHtml: post.notice ? renderMarkdown(post.notice) : null,
    related: getRelatedPosts(post).map(toPostSummary),
  };
}
