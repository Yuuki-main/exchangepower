import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getSite } from "@/lib/content";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  const site = getSite();
  return (
    <Section spacing="lg">
      <SectionIntro
        level={1}
        eyebrow="404"
        title="We couldn't find that page."
        lead="It may have moved when we rebuilt the website. Try the homepage, or call us and we'll point you in the right direction."
      />
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Go to the homepage</Button>
        <Button href={site.phone.href} variant="ghost">
          Call {site.phone.display}
        </Button>
      </div>
    </Section>
  );
}
