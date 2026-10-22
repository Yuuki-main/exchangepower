import { ContactPage } from "@/components/templates/ContactPage";
import { QUOTE_PAGE } from "@/content/contact.js";
import { getSite } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...QUOTE_PAGE.seo,
  path: "/get-a-quote/",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <ContactPage
      site={getSite()}
      copy={QUOTE_PAGE}
      crumb={{ label: "Get a quote", href: "/get-a-quote/" }}
      background="home.quote"
    />
  );
}
