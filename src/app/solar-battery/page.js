import { CategoryHub } from "@/components/templates/CategoryHub";
import { getSite } from "@/lib/content";
import { getHubPageData, hubMetadata } from "@/lib/product-pages";

export const metadata = hubMetadata("battery");

export default function Page() {
  return <CategoryHub data={getHubPageData("battery")} site={getSite()} />;
}
