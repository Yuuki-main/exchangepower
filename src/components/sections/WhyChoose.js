import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";

/**
 * Why Exchange Power: the four commitments as an editorial 2×2 list with
 * heavy top rules, plus the equipment brands as a typographic line.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ title: string, text: string }[]} props.items
 * @param {string} [props.brandsLabel]
 * @param {string[]} [props.brands] Omit to hide the brands line.
 * @param {string} [props.address]
 */
export function WhyChoose({
  eyebrow,
  title,
  lead,
  items,
  brandsLabel,
  brands,
  address,
}) {
  return (
    <Section background="muted" labelledBy="why-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionIntro
            id="why-title"
            eyebrow={eyebrow}
            title={title}
            lead={lead}
          />
          {address ? (
            <p className="mt-6 text-sm font-semibold text-brand-700">
              {address}
            </p>
          ) : null}
        </div>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {items.map((item) => (
            <li
              key={item.title}
              className="reveal border-t-2 border-brand-900 pt-5"
            >
              <h3 className="font-display text-xl font-semibold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-2 text-foreground-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {brands?.length ? (
        <div className="mt-16 border-t border-border pt-8 lg:mt-20">
          <h3 className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {brandsLabel}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-display text-lg font-semibold text-brand-900/80 sm:text-xl lg:gap-x-10">
            {brands.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
