# Conventions

The house rules for this codebase. See `PLAN.md` for the build plan.

## Before using a Next.js API

This project runs Next.js 16.4, and its APIs differ from older versions. Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/`. Don't rely on memory of older versions.

## Language and types

- The project is **JavaScript**, not TypeScript. `jsconfig.json` has `checkJs` and `strict` on, so `npm run typecheck` (`tsc --noEmit`) checks every file in `src/`.
- Add types with JSDoc. Put shared shapes as `@typedef`s in the module that owns them (for example, content types live in `src/lib/content.js`). Import them elsewhere with `/** @typedef {import('@/lib/content').Product} Product */`.
- Annotate component props with `@param`, for example `@param {{ title: string, children: React.ReactNode }} props`.

## Folders

| Path                        | What goes there                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                  | Routes only: `page.js`, `layout.js`, route-level metadata files. Keep logic thin and delegate to components and lib. |
| `src/components/ui/`        | Generic building blocks with no business copy (Button, Card, Input, Dialog…).                                        |
| `src/components/layout/`    | Site frame: TopBar, Header, MobileNav, Footer.                                                                       |
| `src/components/sections/`  | Page sections assembled from `ui/` (Hero, FaqList, CtaBand…). They receive content as props.                         |
| `src/components/templates/` | Whole-page templates (ProductPage, CategoryHub). Route files load content and render one.                            |
| `src/components/forms/`     | Form components (QuoteForm, QuoteDialog).                                                                            |
| `src/content/`              | **All site copy and business data**: contact details, navigation, page copy, products, blog posts, legal text.       |
| `src/lib/`                  | Plain helpers with no JSX where possible: content accessors, SEO helpers, `cn`, validation, email.                   |
| `public/`                   | Static files served as-is (images, icons).                                                                           |
| `docs/`                     | Project documentation.                                                                                               |

## Content

- Components and pages **never hard-code copy**. Text, links, phone numbers, prices and FAQs come from `src/content/`, read through the accessors in `src/lib/content.js`.
- To change wording, contact details or a menu, edit the file in `src/content/` and leave components alone.
- Long-form copy (product articles, blog posts, legal pages) is Markdown in `src/content/`. Structured data (navigation, products, FAQs, site details) is in `.js` modules.

## Naming

- Component files and components use `PascalCase`: `QuoteForm.js` exports `QuoteForm`. Use one component per file, as a named export.
- Non-component modules use `camelCase` file names (`content.js`, `seo.js`), and functions use `camelCase`.
- Route folders use the live site's **kebab-case** URL slugs exactly (`residential-solar/`, `about-exchange-power/`).
- Constants that never change use `UPPER_SNAKE_CASE`.
- Import with the `@/` alias (`@/components/ui/Button`), not long relative paths.

## Server and Client Components

- Every component is a **Server Component by default**. Server Components ship no JavaScript to the browser.
- Add `'use client'` only when a component needs the browser: state, effects, event handlers, refs, or browser APIs. Examples are the mobile menu toggle, the dialog and form interactivity.
- Keep client components **small and at the leaves**. Pass server-rendered content in as `children` instead of making a whole section a client component.
- Never import server-only code (secrets, `fs`, the email client) into a client component. Start server-only modules with `import 'server-only'`.
- The only server code is the `sendEnquiry` Server Action in `src/app/actions/`. Client components may import it, because Next.js replaces it with a reference.
- Environment variables with secrets must **not** use the `NEXT_PUBLIC_` prefix. `.env.example` lists every variable name, and real values go in `.env.local` (git-ignored) or the host's settings.

## Styling

- Use Tailwind CSS 4 utility classes. Design tokens are defined with `@theme` in `src/app/globals.css` and documented in `docs/DESIGN-TOKENS.md`. Tailwind's default palette is disabled, so use token colours only (prefer semantic ones such as `text-foreground-muted`).
- Combine conditional classes with the `cn()` helper. Prettier sorts classes, including inside `cn(...)`.
- Design mobile first: base styles target phones, and `sm:`, `md:`, `lg:` and `xl:` add larger layouts.

## Quality checks

Run these before committing:

```bash
npm run lint          # ESLint (next/core-web-vitals + prettier)
npm run format:check  # Prettier (npm run format to fix)
npm run typecheck     # tsc --noEmit over JS via JSDoc
npm run build         # production build (Turbopack)
npm run check:contrast  # WCAG AA check of colour tokens (after palette changes)
```

## Images

- Every content image goes through `MediaSlot` (`src/components/sections/MediaSlot.js`). It renders only images marked `approved: true` in `src/content/images.js`.
- `MediaSlot` uses `next/image`'s `getImageProps()` on the server, which gives an optimised `srcset`, `sizes`, lazy loading and explicit `width`/`height`, and renders a plain `<img>`. That keeps `next/image`'s client component out of every page bundle. If you need a feature that only the `<Image>` component has (for example `placeholder="blur"`), use `next/image` directly in that one place.
- Never write a bare `<img>` with a hand-made `src`. ESLint's `@next/next/no-img-element` flags it. The single exception in `MediaSlot` is commented.
- Always give the size: `width` and `height` from `images.js`, or a sized wrapper (for example `aspect-video` with `object-cover`). This prevents layout shift.
- Always set `sizes` to match the layout, for example `sizes="(min-width: 1024px) 33vw, 100vw"`, so phones don't download desktop-sized files.
- **Above-the-fold image:** only the one image that is the largest thing in the first screen gets `preload` on `MediaSlot`, which sets `loading="eager"` and `fetchPriority="high"`. Everything else lazy-loads by default. (`priority` is deprecated in Next.js 16.)
- **Alt text:** comes from `images.js`. Decorative images use `alt=""`.
- **Quality:** the default is 75. Next.js 16 allows only `[75]` unless `images.qualities` is configured.
