import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { renderMarkdown } from "@/lib/markdown";

/**
 * A list of FAQs as an accessible accordion (native details/summary, no
 * client JS). Answers are Markdown from the content files.
 * Reused on product pages from Step 6.
 *
 * @param {object} props
 * @param {{ question: string, answer: string, href?: string }[]} props.faqs
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
  return (
    <Accordion className={className}>
      {faqs.map((faq) => (
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
      ))}
    </Accordion>
  );
}
