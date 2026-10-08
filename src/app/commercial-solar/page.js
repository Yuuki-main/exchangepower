import { CategoryHub } from "@/components/templates/CategoryHub";
import { getSite } from "@/lib/content";
import { getHubPageData, hubMetadata } from "@/lib/product-pages";

export const metadata = hubMetadata("commercial");

export default function Page() {
  return <CategoryHub data={getHubPageData("commercial")} site={getSite()} />;
}
