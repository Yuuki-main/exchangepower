import { LegalPage } from "@/components/templates/LegalPage";
import { getLegalPage } from "@/lib/content";
import { renderMarkdownWithHeadings } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("terms-and-conditions");

export const metadata = buildMetadata({
  ...page.seo,
  path: "/terms-and-conditions/",
  absoluteTitle: true,
});

export default function Page() {
  // Every clause heading gets a stable anchor, e.g. "8. Payment" → #clause-8-payment.
  const { html, headings } = renderMarkdownWithHeadings(page.body, {
    idPrefix: "clause-",
  });
  return (
    <LegalPage
      title={page.title}
      path="/terms-and-conditions/"
      html={html}
      toc={headings}
    />
  );
}
