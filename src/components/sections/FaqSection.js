import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FaqList } from "./FaqList";

/**
 * Common questions next to the latest guides from the blog.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {{ question: string, answer: string, href?: string }[]} props.faqs
 * @param {string} props.guidesTitle
 * @param {{ title: string, date: string, href: string }[]} props.guides
 * @param {{ label: string, href: string }} props.guidesLink
 */
export function FaqSection({
  eyebrow,
  title,
  faqs,
  guidesTitle,
  guides,
  guidesLink,
}) {
  const dateFormat = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionIntro
            id="faq-title"
            eyebrow={eyebrow}
            title={title}
            size="lg"
          />
          <FaqList
            faqs={faqs}
            sourceLabel="Read the full page"
            className="mt-10"
          />
        </div>
        <aside
          aria-labelledby="guides-title"
          className="lg:col-span-4 lg:col-start-9"
        >
          <h2
            id="guides-title"
            className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase"
          >
            {guidesTitle}
          </h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className="group block py-5">
                  <span className="block font-display text-lg font-semibold text-brand-900 group-hover:text-brand-600">
                    {guide.title}
                  </span>
                  <time
                    dateTime={guide.date}
                    className="mt-1 block text-sm text-foreground-muted"
                  >
                    {dateFormat.format(new Date(`${guide.date}T00:00:00Z`))}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={guidesLink.href}
            className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-900"
          >
            {guidesLink.label}
            <ArrowRightIcon size={16} />
          </Link>
        </aside>
      </div>
    </Section>
  );
}
