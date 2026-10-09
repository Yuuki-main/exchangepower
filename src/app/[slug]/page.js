import { notFound } from "next/navigation";
import { BlogPost } from "@/components/templates/BlogPost";
import { getSite } from "@/lib/content";
import {
  getPostPageData,
  postMetadata,
  postStaticParams,
} from "@/lib/post-pages";

// Blog posts live at root URLs, as on the live site. Static folders in
// src/app (blog, contact, the product hubs...) always win over this route.
//
// Same settings as the product [slug] routes (Step 6): the whole page must be
// static, and a URL that wasn't prerendered renders fully before responding,
// so notFound() sends a real 404. See route-segment-config/ensureStatic.md and
// instant.md.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return postStaticParams();
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return postMetadata(slug);
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export default async function Page({ params }) {
  const { slug } = await params;
  const data = getPostPageData(slug);
  if (!data) notFound();
  return <BlogPost {...data} site={getSite()} />;
}
