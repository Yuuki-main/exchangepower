import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { FAQ_LAYERS } from "@/lib/content-schema";
import { renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/cn";

/** @typedef {{ question: string, answer: string, href?: string, layer?: import("@/lib/content-schema.js").FaqLayer }} FaqItem */

/**
 * A list of FAQs as an accessible accordion (native details/summary, no
 * client JS). Answers are Markdown from the content files.
 *
 * When the FAQs have a `layer`, they are shown in groups (Getting started,
 * Cost, Technical…) with the group name as a small label, in FAQ_LAYERS
 * order. Answers stay in the HTML, so the FAQPage structured data matches.
 *
 * @param {object} props
 * @param {FaqItem[]} props.faqs
 * @param {2 | 3 | 4} [props.headingLevel=3]
 * @param {string} [props.sourceLabel="More on this topic"] Label for each answer's
 *   source link (shown only when an FAQ has `href`).
 * @param {string} [props.className]
 */
export function FaqList({
  faqs,
  headingLevel = 3,
  sourceLabel = "More on this topic",
  className,
}) {
  /** @param {FaqItem[]} items */
  const items = (items) =>
    items.map((faq) => (
      <AccordionItem
        key={faq.question}
        title={faq.question}
        headingLevel={headingLevel}
      >
        <div
          className="max-w-reading space-y-3 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(faq.answer) }}
        />
        {faq.href ? (
          <Link
            href={faq.href}
            className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 underline underline-offset-4"
          >
            {sourceLabel}
          </Link>
        ) : null}
      </AccordionItem>
    ));

  if (!faqs.some((faq) => faq.layer))
    return <Accordion className={className}>{items(faqs)}</Accordion>;

  const groups = Object.entries(FAQ_LAYERS)
    .map(([layer, label]) => ({
      label,
      faqs: faqs.filter((faq) => faq.layer === layer),
    }))
    .filter((group) => group.faqs.length);
  const ungrouped = faqs.filter((faq) => !faq.layer);

  return (
    <div className={cn("space-y-8", className)}>
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {group.label}
          </p>
          <Accordion>{items(group.faqs)}</Accordion>
        </div>
      ))}
      {ungrouped.length ? <Accordion>{items(ungrouped)}</Accordion> : null}
    </div>
  );
}
