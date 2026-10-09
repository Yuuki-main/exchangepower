import { JsonLd } from "@/components/seo/JsonLd";
import { BatteryFeature } from "@/components/sections/BatteryFeature";
import { ContactCta } from "@/components/sections/ContactCta";
import { Credentials } from "@/components/sections/Credentials";
import { FaqSection } from "@/components/sections/FaqSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SolutionIndex } from "@/components/sections/SolutionIndex";
import { SystemSizeGuide } from "@/components/sections/SystemSizeGuide";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import {
  getAllProducts,
  getHome,
  getHomeFaqs,
  getLatestPosts,
  getPostPath,
  getProductPath,
  getSite,
} from "@/lib/content";
import { buildMetadata, localBusinessJsonLd, webSiteJsonLd } from "@/lib/seo";

const home = getHome();

export const metadata = buildMetadata({
  ...home.seo,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const site = getSite();
  const productPaths = new Map(
    getAllProducts().map((p) => [p.slug, getProductPath(p)]),
  );

  const systemGroups = home.systems.groups.map((group) => ({
    label: group.label,
    items: group.items.map(({ slug, ...system }) => {
      const href = productPaths.get(slug);
      if (!href)
        throw new Error(
          `Content error: home.systems references unknown product "${slug}"`,
        );
      return { ...system, href };
    }),
  }));

  const guides = getLatestPosts(home.faq.guidesCount).map((post) => ({
    title: post.title,
    date: post.date,
    href: getPostPath(post),
  }));

  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <HomeHero content={home.hero} phone={site.phone} />
      <Credentials {...home.credentials} />
      <SolutionIndex {...home.solutions} />
      <SystemSizeGuide {...home.systems} groups={systemGroups} />
      <BatteryFeature {...home.battery} />
      <ProcessTimeline {...home.process} />
      <WhyChoose
        {...home.why}
        brands={site.brands.map((b) => b.name)}
        address={`Based at ${site.address.display}`}
      />
      <Testimonials {...home.reviews} />
      <FaqSection
        eyebrow={home.faq.eyebrow}
        title={home.faq.title}
        faqs={getHomeFaqs()}
        guidesTitle={home.faq.guidesTitle}
        guides={guides}
        guidesLink={home.faq.guidesLink}
      />
      <ContactCta {...home.finalCta} site={site} />
    </>
  );
}
