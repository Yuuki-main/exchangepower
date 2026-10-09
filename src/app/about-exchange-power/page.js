import { AboutPage } from "@/components/templates/AboutPage";
import { getAbout, getHome, getSite } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const about = getAbout();

export const metadata = buildMetadata({
  ...about.seo,
  path: "/about-exchange-power/",
  absoluteTitle: true,
});

export default function Page() {
  // The same two stats as the homepage credentials (Step 5): panels sold and
  // satisfied customers. The other live figures contradict them (CONTENT-NOTES 4.5).
  const stats = getHome().credentials.items.slice(0, 2);
  return <AboutPage about={about} stats={stats} site={getSite()} />;
}
