import { ContactPage } from "@/components/templates/ContactPage";
import { CONTACT } from "@/content/contact.js";
import { getSite } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...CONTACT.seo,
  path: "/contact/",
  absoluteTitle: true,
});

export default function Page() {
  return <ContactPage site={getSite()} />;
}
