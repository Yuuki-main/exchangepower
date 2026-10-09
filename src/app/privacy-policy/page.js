import { LegalPage } from "@/components/templates/LegalPage";
import { getLegalPage } from "@/lib/content";
import { renderMarkdownWithHeadings } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("privacy-policy");

export const metadata = buildMetadata({
  ...page.seo,
  path: "/privacy-policy/",
  absoluteTitle: true,
});

export default function Page() {
  const { html } = renderMarkdownWithHeadings(page.body);
  return <LegalPage title={page.title} path="/privacy-policy/" html={html} />;
}
