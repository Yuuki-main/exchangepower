import { ContactPage } from "@/components/templates/ContactPage";
import { getSite } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Exchange Power | Free Solar & Battery Quote in WA",
  description:
    "Request a free solar or battery quote from Exchange Power in Wangara, WA. Call 08 6370 4963, email us or send your details online.",
  path: "/contact/",
  absoluteTitle: true,
});

export default function Page() {
  return <ContactPage site={getSite()} />;
}
