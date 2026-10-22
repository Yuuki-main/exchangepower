import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icon";

/**
 * The opening of a system-size page: key specs table, "Is this size right
 * for you?" lists and links to the next size up or down.
 *
 * @param {object} props
 * @param {string} props.title Product title, e.g. "6.6kW Solar System".
 * @param {{ label: string, value: string }[]} [props.specs]
 * @param {{ suits: string[], consider: string[] }} [props.fit]
 * @param {{ label: string, href: string }[]} [props.compare]
 */
export function ProductSpecs({ title, specs, fit, compare }) {
  if (!specs?.length && !fit && !compare?.length) return null;
  return (
    <div className="mb-12 space-y-10">
      {specs?.length ? (
        <section aria-labelledby="specs-title">
          <h2
            id="specs-title"
            className="font-display text-2xl font-semibold text-brand-900"
          >
            Key specs
          </h2>
          <div className="prose-content mt-4">
            <table>
              <caption className="sr-only">{title} key specs</caption>
              <tbody>
                {specs.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-foreground-muted">
            Output figures are estimates (about 4.4 kWh per kW of panels a day
            in Perth). Your design report gives figures for your own roof.
          </p>
        </section>
      ) : null}

      {fit ? (
        <section aria-labelledby="fit-title">
          <h2
            id="fit-title"
            className="font-display text-2xl font-semibold text-brand-900"
          >
            Is this size right for you?
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
              <h3 className="font-semibold text-brand-900">A good fit if</h3>
              <ul className="mt-3 space-y-2">
                {fit.suits.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon
                      size={18}
                      className="mt-1 shrink-0 text-success-600"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
              <h3 className="font-semibold text-brand-900">
                Consider another size if
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {fit.consider.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {compare?.length ? (
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
              {compare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-900"
                  >
                    {link.label}
                    <ArrowRightIcon size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
