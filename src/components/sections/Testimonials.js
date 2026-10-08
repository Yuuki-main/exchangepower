import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * @typedef {object} Review
 * @property {string} quote
 * @property {string} name
 * @property {string} location
 * @property {string} [system] e.g. "6.6kW solar + battery"
 */

/**
 * Customer stories: the first review as a large editorial quote, the rest
 * in a row that scrolls sideways on phones.
 *
 * Renders nothing until real, attributable reviews exist in the content.
 * Never add placeholder or invented reviews (Australian Consumer Law).
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {Review[]} props.items
 */
export function Testimonials({ eyebrow, title, items }) {
  if (!items.length) return null;
  const [featured, ...rest] = items;
  return (
    <Section labelledBy="reviews-title">
      <SectionIntro
        id="reviews-title"
        eyebrow={eyebrow}
        title={title}
        size="lg"
      />
      <figure className="mt-12 max-w-4xl">
        <blockquote className="font-display text-3xl font-medium tracking-tight text-brand-900">
          <p>“{featured.quote}”</p>
        </blockquote>
        <figcaption className="mt-6 text-foreground-muted">
          <span className="font-semibold text-foreground">{featured.name}</span>
          , {featured.location}
          {featured.system ? ` · ${featured.system}` : null}
        </figcaption>
      </figure>
      {rest.length ? (
        <ul className="-mx-gutter mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-gutter pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {rest.map((review) => (
            <li
              key={review.name}
              className="w-[80%] shrink-0 snap-start border-t-2 border-brand-900 pt-5 sm:w-[45%] lg:w-auto"
            >
              <figure>
                <blockquote>
                  <p>“{review.quote}”</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-foreground-muted">
                  <span className="font-semibold text-foreground">
                    {review.name}
                  </span>
                  , {review.location}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
