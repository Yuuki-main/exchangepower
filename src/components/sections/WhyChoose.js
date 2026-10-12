import {
  FileCheckIcon,
  HeadsetIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SunIcon,
  TagIcon,
} from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getApprovedImage } from "@/lib/content";
import { MediaSlot } from "./MediaSlot";

const ICONS = {
  price: TagIcon,
  rebates: FileCheckIcon,
  warranty: ShieldCheckIcon,
  support: HeadsetIcon,
};

/**
 * Why Exchange Power: the commitments as icon cards beside the intro and a
 * "based in Wangara" card, then the equipment brands as a slow marquee
 * (static for reduced-motion users; the second copy is hidden from
 * assistive tech).
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.lead
 * @param {{ title: string, text: string, icon?: string }[]} props.items
 * @param {string} [props.brandsLabel]
 * @param {{ name: string, image?: string | null }[]} [props.brands] Omit to
 *   hide the brands line. Logos show once their image is approved; names otherwise.
 * @param {string} [props.address]
 * @param {string | null} [props.image] Collage image key (shown once approved).
 */
export function WhyChoose({
  eyebrow,
  title,
  lead,
  items,
  brandsLabel,
  brands,
  address,
  image,
}) {
  return (
    <Section background="muted" labelledBy="why-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionIntro
            id="why-title"
            eyebrow={eyebrow}
            title={title}
            lead={lead}
          />
          <MediaSlot
            imageKey={image}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="rounded-3xl shadow-lg ring-1 ring-border"
          />
          {address ? (
            <div className="relative isolate overflow-hidden rounded-3xl bg-brand-900 p-6 text-white shadow-lg sm:p-7">
              {/* Map-like dot grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(255_255_255/0.14)_1px,transparent_1px)] bg-size-[18px_18px]"
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 right-10 -z-10 size-24 -translate-y-1/2 rounded-full bg-accent-400/20 blur-xl"
              />
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-400 text-brand-950"
                >
                  <MapPinIcon size={22} />
                </span>
                <p className="font-semibold">{address}</p>
              </div>
            </div>
          ) : null}
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {items.map((item) => {
            const Icon = item.icon
              ? ICONS[/** @type {keyof typeof ICONS} */ (item.icon)]
              : null;
            return (
              <li
                key={item.title}
                className="group reveal rounded-3xl bg-background p-6 shadow-sm ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0 sm:p-7"
              >
                {Icon ? (
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-200 transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950 group-hover:ring-accent-400"
                  >
                    <Icon size={22} />
                  </span>
                ) : null}
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-foreground-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {brands?.length ? (
        <div className="mt-16 lg:mt-20">
          <h3 className="text-center text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {brandsLabel}
          </h3>
          <div className="group relative mt-6 overflow-hidden mask-x-from-85% mask-x-to-100%">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 ? "true" : undefined}
                  className="flex shrink-0 items-center"
                >
                  {brands.map((brand) => {
                    const logo = getApprovedImage(brand.image);
                    return (
                      <li
                        key={brand.name}
                        className="flex items-center gap-10 pr-10 font-display text-2xl font-semibold whitespace-nowrap text-brand-900/70 sm:text-3xl"
                      >
                        {logo ? (
                          <span className="grid h-16 w-44 place-items-center rounded-2xl bg-background px-4 shadow-sm ring-1 ring-border">
                            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo, no optimisation needed */}
                            <img
                              src={logo.localPath}
                              alt={copy === 1 ? "" : brand.name}
                              width={logo.width}
                              height={logo.height}
                              loading="lazy"
                              decoding="async"
                              className="h-auto max-h-11 w-auto"
                            />
                          </span>
                        ) : (
                          brand.name
                        )}
                        <SunIcon size={18} className="text-accent-500" />
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
