import { JsonLd } from "@/components/seo/JsonLd";
import { BatteryFeature } from "@/components/sections/BatteryFeature";
import { ContactCta } from "@/components/sections/ContactCta";
import { Credentials } from "@/components/sections/Credentials";
import { FaqSection } from "@/components/sections/FaqSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { SolutionIndex } from "@/components/sections/SolutionIndex";
import { SystemSizeGuide } from "@/components/sections/SystemSizeGuide";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import {
  getAllProducts,
  getBackground,
  getCardPhoto,
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
  const products = new Map(getAllProducts().map((p) => [p.slug, p]));

  const systemGroups = home.systems.groups.map((group) => ({
    label: group.label,
    items: group.items.map(({ slug, ...system }) => {
      const product = products.get(slug);
      if (!product)
        throw new Error(
          `Content error: home.systems references unknown product "${slug}"`,
        );
      return {
        ...system,
        href: getProductPath(product),
        // Stock photo: the kW figure is set over it, which would clash with
        // the text baked into the product's own image.
        photo: getBackground(`products/${slug}`),
      };
    }),
  }));

  const guides = getLatestPosts(home.faq.guidesCount).map((post) => ({
    title: post.title,
    date: post.date,
    href: getPostPath(post),
    photo: getCardPhoto(post.image, `posts/${post.slug}`),
  }));

  // Each solution card shows its category hub's photo.
  const solutions = {
    ...home.solutions,
    items: home.solutions.items.map((item) => ({
      ...item,
      photo: getBackground(
        `products/${item.href.split("/").filter(Boolean).pop()}`,
      ),
    })),
  };

  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <HomeHero
        content={home.hero}
        phone={site.phone}
        background={getBackground("home.hero")}
        rating={home.promise.rating}
      />
      <Credentials {...home.credentials} overlap />
      <PromiseSection
        {...home.promise}
        tabs={home.promise.tabs.map((tab) => ({
          ...tab,
          photo: getCardPhoto(tab.image, tab.fallback),
        }))}
      />
      <SolutionIndex {...solutions} />
      <SystemSizeGuide {...home.systems} groups={systemGroups} />
      <BatteryFeature {...home.battery} />
      <ProcessTimeline {...home.process} />
      <WhyChoose
        {...home.why}
        brands={site.brands}
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
      <ContactCta
        {...home.finalCta}
        site={site}
        background={getBackground("home.quote")}
      />
    </>
  );
}
