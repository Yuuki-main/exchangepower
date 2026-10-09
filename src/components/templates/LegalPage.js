import { PageHeader } from "@/components/sections/PageHeader";
import { Prose } from "@/components/sections/Prose";
import { TableOfContents } from "@/components/sections/TableOfContents";
import { Section } from "@/components/ui/Section";

/**
 * Legal document (Terms, Privacy): verbatim Markdown, with an optional table
 * of contents built from the headings.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.path
 * @param {string} props.html Rendered body with heading ids.
 * @param {{ id: string, text: string, level: number }[]} [props.toc] Shown when given.
 */
export function LegalPage({ title, path, html, toc }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: title, href: path },
  ];
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow="Legal" title={title} />
      <Section labelledBy="legal-body-title">
        <h2 id="legal-body-title" className="sr-only">
          {title}
        </h2>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {toc?.length ? (
            <div className="lg:col-span-4 xl:col-span-3">
              {/* Phones: collapsible. Desktop: sticky sidebar. */}
              <details className="group border-y border-border py-3 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brand-900 [&::-webkit-details-marker]:hidden">
                  Contents
                  <span
                    aria-hidden="true"
                    className="text-sm text-foreground-muted group-open:hidden"
                  >
                    Show
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-sm text-foreground-muted group-open:inline"
                  >
                    Hide
                  </span>
                </summary>
                <TableOfContents
                  items={toc}
                  title="Clauses"
                  id="toc-mobile"
                  className="mt-4"
                />
              </details>
              <TableOfContents
                items={toc}
                className="hidden lg:sticky lg:top-28 lg:block"
              />
            </div>
          ) : null}
          <Prose
            html={html}
            className={
              toc?.length ? "lg:col-span-8 xl:col-start-5" : "lg:col-span-8"
            }
          />
        </div>
      </Section>
    </>
  );
}
