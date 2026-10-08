import { notFound } from "next/navigation";
import { ProductPage } from "@/components/templates/ProductPage";
import { getSite } from "@/lib/content";
import {
  getProductPageData,
  productMetadata,
  productStaticParams,
} from "@/lib/product-pages";

// Every product is prerendered. dynamicParams isn't available with Cache
// Components, so unknown slugs are handled with notFound() below.
//
// The whole page must be static. A slug that wasn't prerendered is rendered
// fully before responding (not streamed into the fallback shell), so
// notFound() can still send a real 404 status.
// See docs: route-segment-config/ensureStatic.md.
export const ensureStatic = "navigation";

// `params` is read at the top level, so navigations into this route wait for
// the page instead of showing a shell; every valid slug is prerendered, so
// that wait is a static fetch. See docs: route-segment-config/instant.md.
export const instant = false;
export function generateStaticParams() {
  return productStaticParams("commercial");
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return productMetadata("commercial", slug);
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export default async function Page({ params }) {
  const { slug } = await params;
  const data = getProductPageData("commercial", slug);
  if (!data) notFound();
  return <ProductPage data={data} site={getSite()} />;
}
