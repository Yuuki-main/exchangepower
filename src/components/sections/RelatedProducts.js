import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProductCardGrid } from "./ProductCardGrid";

/**
 * "Other options" after a product page.
 *
 * @param {object} props
 * @param {import("@/lib/product-pages.js").ProductSummary[]} props.products
 * @param {string} [props.title="Compare other options"]
 */
export function RelatedProducts({ products, title = "Compare other options" }) {
  if (!products.length) return null;
  return (
    <Section background="muted" labelledBy="related-title">
      <SectionIntro
        id="related-title"
        eyebrow="Related"
        title={title}
        size="lg"
      />
      <ProductCardGrid
        products={products}
        surface="muted"
        className="reveal mt-10"
      />
    </Section>
  );
}
