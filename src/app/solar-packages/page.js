import { CategoryHub } from "@/components/templates/CategoryHub";
import { getSite } from "@/lib/content";
import { getHubPageData, hubMetadata } from "@/lib/product-pages";

export const metadata = hubMetadata("packages");

export default function Page() {
  return <CategoryHub data={getHubPageData("packages")} site={getSite()} />;
}
