/**
 * Renders structured data as a JSON-LD script tag. "<" is escaped so the
 * payload can't close the script element (Next.js JSON-LD guide).
 *
 * @param {{ data: object }} props
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
