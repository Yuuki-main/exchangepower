// TEMPORARY: design-system gallery for development and review.
// Remove or gate this route in Step 10 (see PLAN.md). It is noindex and must
// never be added to the sitemap.

import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Dialog } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Heading } from "@/components/ui/Heading";
import * as Icons from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Textarea } from "@/components/ui/Textarea";

export const metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// Full class names so Tailwind can detect them.
const SCALES = [
  {
    name: "brand",
    swatches: [
      ["50", "bg-brand-50"],
      ["100", "bg-brand-100"],
      ["200", "bg-brand-200"],
      ["300", "bg-brand-300"],
      ["400", "bg-brand-400"],
      ["500", "bg-brand-500"],
      ["600", "bg-brand-600"],
      ["700", "bg-brand-700"],
      ["800", "bg-brand-800"],
      ["900", "bg-brand-900"],
      ["950", "bg-brand-950"],
    ],
  },
  {
    name: "accent",
    swatches: [
      ["50", "bg-accent-50"],
      ["100", "bg-accent-100"],
      ["200", "bg-accent-200"],
      ["300", "bg-accent-300"],
      ["400", "bg-accent-400"],
      ["500", "bg-accent-500"],
      ["600", "bg-accent-600"],
      ["700", "bg-accent-700"],
      ["800", "bg-accent-800"],
      ["900", "bg-accent-900"],
    ],
  },
  {
    name: "neutral",
    swatches: [
      ["50", "bg-neutral-50"],
      ["100", "bg-neutral-100"],
      ["200", "bg-neutral-200"],
      ["300", "bg-neutral-300"],
      ["400", "bg-neutral-400"],
      ["500", "bg-neutral-500"],
      ["600", "bg-neutral-600"],
      ["700", "bg-neutral-700"],
      ["800", "bg-neutral-800"],
      ["900", "bg-neutral-900"],
      ["950", "bg-neutral-950"],
    ],
  },
  {
    name: "status",
    swatches: [
      ["success-50", "bg-success-50"],
      ["success-600", "bg-success-600"],
      ["warning-50", "bg-warning-50"],
      ["warning-600", "bg-warning-600"],
      ["error-50", "bg-error-50"],
      ["error-600", "bg-error-600"],
    ],
  },
];

const TYPE_SCALE = [
  ["text-5xl", "text-5xl font-display font-bold"],
  ["text-4xl", "text-4xl font-display font-bold"],
  ["text-3xl", "text-3xl font-display font-semibold"],
  ["text-2xl", "text-2xl font-display font-semibold"],
  ["text-xl", "text-xl font-display font-semibold"],
  ["text-lg", "text-lg"],
  ["text-base", "text-base"],
  ["text-sm", "text-sm"],
  ["text-xs", "text-xs"],
];

const VARIANTS = /** @type {const} */ ([
  "primary",
  "secondary",
  "ghost",
  "link",
]);
const SIZES = /** @type {const} */ (["sm", "md", "lg"]);
const TONES = /** @type {const} */ ([
  "brand",
  "accent",
  "neutral",
  "success",
  "warning",
  "error",
]);
const HEADING_SIZES = /** @type {const} */ ([
  "display",
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
]);

/** @param {{ id: string, title: string, children: React.ReactNode }} props */
function Block({ id, title, children }) {
  return (
    <Section spacing="sm" labelledBy={id} className="border-b border-border">
      <Heading level={2} size="md" id={id} className="mb-6">
        {title}
      </Heading>
      {children}
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="flex-1">
      <Section spacing="md" background="brand">
        <Badge tone="accent">Internal</Badge>
        <Heading level={1} size="display" className="mt-4">
          Design system
        </Heading>
        <p className="mt-4 max-w-reading text-lg text-foreground-inverse-muted">
          Every UI component in every variant. Temporary page, removed or gated
          in Step 10.
        </p>
      </Section>

      <Block id="colours" title="Colour tokens">
        <div className="flex flex-col gap-6">
          {SCALES.map((scale) => (
            <div key={scale.name}>
              <p className="mb-2 text-sm font-semibold">{scale.name}</p>
              <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                {scale.swatches.map(([label, bg]) => (
                  <li key={label} className="text-xs">
                    <span
                      className={`block h-12 rounded-md border border-border ${bg}`}
                    />
                    <span className="mt-1 block text-foreground-muted">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block id="typography" title="Typography">
        <div className="flex flex-col gap-4">
          {TYPE_SCALE.map(([label, classes]) => (
            <div
              key={label}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <code className="w-24 shrink-0 text-xs text-foreground-muted">
                {label}
              </code>
              <p className={classes}>Clean solar power for WA</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="headings" title="Heading (level and size are independent)">
        <div className="flex flex-col gap-4">
          {HEADING_SIZES.map((size) => (
            <Heading key={size} level={3} size={size}>
              h3 at size “{size}”
            </Heading>
          ))}
        </div>
      </Block>

      <Block id="buttons" title="Button">
        <div className="flex flex-col gap-6">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <code className="w-24 text-xs text-foreground-muted">
                {variant}
              </code>
              {SIZES.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Button {size}
                </Button>
              ))}
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <code className="w-24 text-xs text-foreground-muted">as links</code>
            <Button href="/">
              Internal link <Icons.ArrowRightIcon size={18} />
            </Button>
            <Button href="tel:0000000000" variant="secondary">
              <Icons.PhoneIcon size={18} /> Phone link
            </Button>
            <Button href="https://example.com" variant="ghost">
              External link
            </Button>
          </div>
          <Button fullWidth variant="secondary" className="sm:hidden">
            Full width (phones)
          </Button>
        </div>
      </Block>

      <Section spacing="sm" background="brand" labelledBy="dark">
        <Heading level={2} size="md" id="dark" className="mb-6">
          On a dark section
        </Heading>
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Badge tone="accent">Badge</Badge>
        </div>
      </Section>

      <Block id="sections" title="Section backgrounds">
        <div className="flex flex-col gap-3">
          {
            /** @type {const} */ (["default", "muted", "accent", "brand"]).map(
              (bg) => (
                <Section
                  key={bg}
                  as="div"
                  background={bg}
                  spacing="sm"
                  containerSize="reading"
                  className="rounded-lg border border-border"
                >
                  <p className="font-semibold">background=&quot;{bg}&quot;</p>
                  <p className="text-sm opacity-90">
                    Spacing sm, contained at reading width.
                  </p>
                </Section>
              ),
            )
          }
        </div>
      </Block>

      <Block id="containers" title="Container">
        <div className="flex flex-col gap-3">
          {
            /** @type {const} */ (["content", "reading"]).map((size) => (
              <Container
                key={size}
                size={size}
                className="rounded-md bg-brand-50 py-3 text-sm"
              >
                size=&quot;{size}&quot;
              </Container>
            ))
          }
        </div>
      </Block>

      <Block id="cards" title="Card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {
            /** @type {const} */ ([
              "elevated",
              "outline",
              "muted",
              "inverse",
            ]).map((variant) => (
              <Card key={variant} variant={variant}>
                <Heading level={3} size="sm">
                  {variant}
                </Heading>
                <p className="mt-2 text-sm opacity-90">
                  Card content sits here.
                </p>
              </Card>
            ))
          }
          <Card
            as="article"
            variant="elevated"
            interactive
            padding="lg"
            className="sm:col-span-2"
          >
            <Heading level={3} size="sm">
              Interactive, padding lg
            </Heading>
            <p className="mt-2 text-sm">
              Lifts on hover or when something inside has focus.
            </p>
            <Button href="/" variant="link" className="mt-3">
              Card link <Icons.ArrowRightIcon size={16} />
            </Button>
          </Card>
          <Card padding="sm" className="sm:col-span-2">
            <p className="text-sm">Outline, padding sm.</p>
          </Card>
        </div>
      </Block>

      <Block id="badges" title="Badge">
        <div className="flex flex-col gap-3">
          {
            /** @type {const} */ (["sm", "md"]).map((size) => (
              <div key={size} className="flex flex-wrap gap-2">
                {TONES.map((tone) => (
                  <Badge key={tone} tone={tone} size={size}>
                    {tone}
                  </Badge>
                ))}
              </div>
            ))
          }
        </div>
      </Block>

      <Block id="forms" title="Field, Input, Textarea">
        <form className="grid max-w-reading gap-5 sm:grid-cols-2" action="#">
          <Field id="sg-name" label="Name" required>
            {(control) => (
              <Input name="name" autoComplete="name" {...control} />
            )}
          </Field>
          <Field id="sg-email" label="Email" hint="We never share it." required>
            {(control) => (
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                {...control}
              />
            )}
          </Field>
          <Field
            id="sg-phone"
            label="Phone"
            error="Enter a valid Australian phone number."
          >
            {(control) => (
              <Input type="tel" name="phone" defaultValue="12" {...control} />
            )}
          </Field>
          <Field id="sg-disabled" label="Disabled">
            {(control) => (
              <Input disabled defaultValue="Not editable" {...control} />
            )}
          </Field>
          <Field
            id="sg-message"
            label="Message"
            hint="Optional"
            className="sm:col-span-2"
          >
            {(control) => <Textarea name="message" {...control} />}
          </Field>
          <div className="sm:col-span-2">
            <Button type="button">Submit (demo)</Button>
          </div>
        </form>
      </Block>

      <Block id="accordion" title="Accordion">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-foreground-muted">
              Independent items
            </p>
            <Accordion>
              <AccordionItem title="First item, open by default" defaultOpen>
                Native details and summary. No JavaScript needed.
              </AccordionItem>
              <AccordionItem title="Second item">More content.</AccordionItem>
            </Accordion>
          </div>
          <div>
            <p className="mb-2 text-sm text-foreground-muted">
              Exclusive (shared name)
            </p>
            <Accordion>
              <AccordionItem name="sg-faq" title="Only one open at a time">
                Opening another item closes this one.
              </AccordionItem>
              <AccordionItem name="sg-faq" title="Another exclusive item">
                Content.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Block>

      <Block id="dialog" title="Dialog">
        <div className="flex flex-wrap gap-3">
          <Dialog
            triggerLabel="Open dialog"
            title="Dialog title"
            description="Esc, the close button or a backdrop click closes it."
          >
            <Field id="sg-dialog-input" label="Focusable field">
              {(control) => <Input {...control} />}
            </Field>
          </Dialog>
          <Dialog
            triggerLabel="Small dialog"
            triggerVariant="ghost"
            size="sm"
            title="Small"
          >
            <p>Narrow panel.</p>
          </Dialog>
          <Dialog
            triggerLabel="Large dialog"
            triggerVariant="secondary"
            size="lg"
            title="Large"
          >
            <p>Wide panel.</p>
          </Dialog>
        </div>
      </Block>

      <Block id="icons" title="Icon">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {Object.entries(Icons).map(([name, Icon]) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-md border border-border p-3 text-center"
            >
              <Icon size={24} className="text-brand-700" />
              <span className="text-xs break-all text-foreground-muted">
                {name.replace("Icon", "")}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="radius-shadow" title="Radius and shadow">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["rounded-sm", "rounded-sm"],
            ["rounded-md", "rounded-md"],
            ["rounded-lg", "rounded-lg"],
            ["rounded-xl", "rounded-xl"],
            ["shadow-sm", "rounded-md shadow-sm"],
            ["shadow-md", "rounded-md shadow-md"],
            ["shadow-lg", "rounded-md shadow-lg"],
          ].map(([label, classes]) => (
            <div
              key={label}
              className={`flex h-20 items-center justify-center border border-border bg-background text-xs ${classes}`}
            >
              {label}
            </div>
          ))}
        </div>
      </Block>
    </main>
  );
}
