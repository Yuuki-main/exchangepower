/**
 * In-page table of contents for long documents (for example the Terms).
 * A plain list of anchor links, so it needs no JavaScript.
 *
 * @param {object} props
 * @param {{ id: string, text: string }[]} props.items
 * @param {string} [props.title="Contents"]
 * @param {string} [props.id="toc"] Unique id prefix (use different ids if rendered twice).
 * @param {string} [props.className]
 */
export function TableOfContents({
  items,
  title = "Contents",
  id = "toc",
  className,
}) {
  return (
    <nav aria-labelledby={`${id}-title`} className={className}>
      <h2
        id={`${id}-title`}
        className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase"
      >
        {title}
      </h2>
      <ol className="mt-4 space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px block border-l-2 border-transparent py-3 pl-4 text-sm text-foreground-muted hover:border-brand-700 hover:text-brand-900 lg:py-1"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
