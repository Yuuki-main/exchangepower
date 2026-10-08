# Exchange Power — Rebuild Plan

Rebuild and redesign of https://exchangepower.com.au/ (currently WordPress with WPForms and the Rank Math SEO plugin) as a Next.js 16.4 App Router site in this repo.

- **Stack (existing):** Next.js 16.4.0 (Turbopack), React 19.3, Tailwind CSS 4 (via the `@tailwindcss/turbopack` loader in `next.config.mjs`), JavaScript with `jsconfig.json` (`@/*` → `./src/*`), ESLint 9 flat config with `eslint-config-next`.
- **Config already set:** `cacheComponents: true` and `partialPrefetching: true`.
- **Constraints:** completely new visual design, fast, clean reusable code, responsive layouts, no backend or database, email through Resend.
- **Audit date:** 2026-10-09. Every page in the site's sitemaps was fetched, 30 URLs in total.

> **Rule for every step:** before writing code that uses a Next.js API, read the matching guide in `node_modules/next/dist/docs/` (paths are listed in each step). This version differs from older Next.js. For example, `params` and `searchParams` are async, `next lint` no longer exists, `middleware` is now `proxy`, `next/image` has new defaults (`qualities: [75]`, no 16px size), and Cache Components and Partial Prerendering (PPR) are on.

---

## Part A — Audit of the live site

### A1. Sitemap (every URL on the live site)

| Group       | URL                                                                       | Page type            | Notes                                                              |
| ----------- | ------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------ |
| Core        | `/`                                                                       | Homepage             |                                                                    |
| Core        | `/about-exchange-power/`                                                  | About                |                                                                    |
| Core        | `/blog/`                                                                  | Blog index           | 8 posts, 1 category ("Solar")                                      |
| Residential | `/residential-solar/`                                                     | Category hub         | Body copy is **duplicated from the 6.6kW page**                    |
| Residential | `/residential-solar/6-6kw-solar-system-wa/`                               | Product              | ~700 words, 5 FAQs                                                 |
| Residential | `/residential-solar/7-7kw-solar-system-wa/`                               | Product              | ~800 words, 7 FAQs                                                 |
| Residential | `/residential-solar/10kw-solar-system-wa/`                                | Product              | ~900 words, 7 FAQs                                                 |
| Residential | `/residential-solar/13-2kw-solar-system/`                                 | Product              | ~1,100 words, 7 FAQs                                               |
| Commercial  | `/commercial-solar/`                                                      | Category hub         | Body copy is **duplicated from the 100kW page**                    |
| Commercial  | `/commercial-solar/30kw-solar-system/`                                    | Product              | ~1,100 words, 6 FAQs                                               |
| Commercial  | `/commercial-solar/50kw-solar-system/`                                    | Product              | ~900 words, 6 FAQs                                                 |
| Commercial  | `/commercial-solar/100kw-solar-system/`                                   | Product              | ~1,200 words, 6 FAQs                                               |
| Battery     | `/solar-battery/`                                                         | Category hub         | Rebate copy plus 1 card                                            |
| Battery     | `/solar-battery/wa-residential-battery-rebates/`                          | Rebate info          | ~1,100 words, 5 FAQs                                               |
| Packages    | `/solar-packages/`                                                        | Category hub         | 3 cards                                                            |
| Packages    | `/solar-packages/solar-panel-installation-in-wa/`                         | Service and location | ~900 words, 5 FAQs                                                 |
| Packages    | `/solar-packages/solar-panel-installation-wangara/`                       | Service and location | ~800 words, 5 FAQs                                                 |
| Packages    | `/solar-packages/solar-rebates-and-incentives-in-wa/`                     | Rebate info          | ~1,150 words, 4 FAQs                                               |
| Blog post   | `/6-6kw-solar-system-vs-7-7kw-solar-system-which-is-better/`              | Post                 | 18 Jun 2026                                                        |
| Blog post   | `/is-a-7-7kw-solar-system-suitable-for-homes-with-air-conditioning/`      | Post                 | 15 Jun 2026, ~900 words                                            |
| Blog post   | `/why-a-7-7kw-solar-system-is-ideal-for-growing-families/`                | Post                 | 12 Jun 2026, ~860 words                                            |
| Blog post   | `/why-the-6-6kw-solar-system-is-australias-most-popular-choice/`          | Post                 | 8 Jun 2026, ~1,200 words                                           |
| Blog post   | `/solar-panel-rebate-western-australia-for-first-time-solar-buyers/`      | Post                 | 20 Mar 2026, ~800 words                                            |
| Blog post   | `/complete-guide-to-solar-power-rebate-western-australia-in-2026/`        | Post                 | 13 Feb 2026, ~1,270 words                                          |
| Blog post   | `/wa-government-solar-battery-rebate-2026-complete-guide-for-homeowners/` | Post                 | 7 Feb 2026, ~1,290 words                                           |
| Blog post   | `/wa-residential-battery-scheme-for-solar-homes-in-western-australia/`    | Post                 | 5 Feb 2026, ~1,180 words                                           |
| Archive     | `/category/solar/`                                                        | Category listing     | Same list as `/blog/`                                              |
| Archive     | `/category/uncategorized/`                                                | Category listing     | Empty                                                              |
| Orphan      | `/residential-solar-system/`                                              | Old page             | In the sitemap but not linked anywhere. Thin content (2 sections). |
| Legal       | `/privacy-policy/`                                                        | Legal                |                                                                    |
| Legal       | `/terms-and-conditions/`                                                  | Legal                | ~4,300 words, 20 clauses                                           |

There is **no Contact page** (`/contact/` and `/contact-us/` both return 404) and **no FAQ page**. FAQs exist only on the individual product and service pages.

### A2. Global elements (shown on every page)

**Top bar:** "Get new solar battery for lowest price — **Claim now**". The "Claim now" link has an empty `href`, so it goes nowhere. Phone: 0863704963.

**Main navigation:**

- Home
- Residential: 6.6kW, 7.7kW, 10kW, 13.2kW Solar System
- Commercial: 30kW, 50kW, 100kW Solar System
- Solar Batteries
- Solar Packages
- About Us
- Blog
- **Free Quote** button, which opens the quote pop-up

**Pre-footer call to action:** "Your Solar Journey, Made Simple" / "Get Started with your Free Consultation Today!" / **Click Here** button (opens the quote pop-up).

**Footer:**

- _Contact Us:_ info@exchangepower.com.au · 0863704963 · 5/17 Prindiville Dr, Wangara, WA 6065, Australia
- _Solar Packages:_ 6.6kW, 7.7kW, 10kW, 13.2kW, 30kW, 50kW, 100kW Solar System (the 100kW item has **no link**)
- _Solar Installation:_ Solar Panel Installation WA · Solar Panel Installation Wangara
- _Useful Links_ (misspelt "Usefull" on the live site): Why Exchange Power? (links to About) · Terms & Conditions · Privacy Policy · Blog
- New Energy Tech Consumer Code (NETCC) "Approved Seller" badge
- WhatsApp link: `https://wa.me/61480595132`
- "© 2026, All rights reserved. Designed by ." (the designer name is empty)

**Social links:** none (the site has no Facebook, Instagram or LinkedIn links).
**ABN, opening hours, map embed:** none on the site.
**Structured data:** Rank Math outputs Organization, WebSite, WebPage and Article schema.
**Leftover theme markup (not visible, ignore it):** `mailto:info@exchange.com`, `wa.me/454`, a `+91-…` phone number.

### A3. Forms and calls to action

| Form                                    | Where it appears                                                                                      | Fields                                                      | Notes                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| **Quick quote** (WPForms #111)          | Homepage hero                                                                                         | Name\*, Email\*, Phone\*                                    | Submit button                                     |
| **"Get A Special Deal"** (WPForms #206) | Pop-up (`#contactForm`), opened by **every** "Free Quote", "Get a Free Quote" and "Click Here" button | Name\* (First and Last), Email\*, Phone\*, Address, Message | Submit button. This is the site's main lead form. |

Other CTAs:

- `tel:0863704963` in the top bar and footer
- `mailto:info@exchangepower.com.au`
- WhatsApp
- "Read More" on each package card
- "Learn More" on the Residential and Commercial tabs. The Commercial one links to the **homepage**, which is a bug.
- "Read all blogs"
- "Claim now", which is broken

Neither form asks for a **service type** (residential, commercial or battery), so the business can't tell from an enquiry what the customer is asking about. The rebuild should add that field (see the decisions in Part C).

### A4. Homepage content (top to bottom)

1. **Hero:** H1 "Cheaper Home Batteries Program" · subheading "Switch to Smart Energy Storage & Reduce Power Bills" · "Get a Free Quote" button · quick-quote form.
2. **Stats:** "Our Solar Footprint - Making a Brighter Future": **50000+ Solar Panels Sold · 1000+ Satisfied Customers · 15000 kWh+ Solar Batteries Sold**.
3. **"Trusted by Over 5,000 Australians — The Exchange Power Promise":** Residential / Commercial tabs, each with 2 paragraphs and "Learn More".
4. **"Premium Solar Packages — Smart Solar Solutions That Reduce Your Power Bills by Up to 80%":** cards filterable by Commercial / Residential / Solar Battery / Solar Packages. The cards are 100kW, 50kW, 30kW, 6.6kW, 7.7kW, 10kW, WA Residential Battery Rebates ("Up to $5,000 for Synergy customers", "Up to $7,500 for Horizon Power customers"), Solar Panel Installation Wangara, Solar Panel Installation in WA, and Solar Rebates and Incentives in WA. Each card has "Read More" and "Get a Free Quote".
5. **"Why Choose Exchange Power":** Best Price Guarantee · Rebates Made Easy · Worry-Free Warranty · Emergency Support, each with one paragraph.
6. **"Trusted by Australian Families and Businesses":** "**4.8 from 1,194 reviews**" plus one short paragraph. There are **no individual testimonials and no review source** on the site.
7. **Recent Blogs:** the 3 latest posts, plus "Read all blogs".
8. **"Brands We Install":** Trina Solar, Seraphim, Growatt, Solis, Neovolt, Jinko Solar, Fronius, Sofar (shown as logo images).
9. Pre-footer CTA and footer (see A2).

**Meta title:** "Exchange Power WA | Solar Panels & Battery Solutions in Western Australia"
**Meta description:** "Trusted solar installers in WA offering panels, batteries & rebate assistance. Maximize savings with Exchange Power solutions."

### A5. Inner pages

**Product and service pages** (residential ×4, commercial ×3, the 3 packages pages, battery rebates) all use the same layout:

1. H1
2. A long SEO article (700–1,200 words of plain paragraphs, keyword-heavy, with internal links)
3. "Frequently Asked Questions (FAQs)" as an accordion with 4–7 questions

There are **no prices, spec tables, inclusions lists or panel and inverter models** on any page. Figures that do appear:

- 6.6kW: 24–28 kWh/day, 16–18 panels, 3–5 year payback
- 10kW: 35–45 kWh/day
- 13.2kW: 28–32 panels, 1–2 day installation
- 30kW: 120–150 kWh/day
- 50kW: 25+ year life
- Battery rebate: up to $5,000 (Synergy) or $7,500 (Horizon Power) for a 10kWh battery; no-interest loans up to $10,000 for households with a combined income under $210,000, repayable over up to 10 years; Virtual Power Plant (VPP) participation required

**Category hubs** (Residential, Commercial, Solar Battery, Solar Packages): H1, intro copy, then cards linking to their child pages.

**About:**

- H1 "About Exchange Power" · "Trusted by Thousands. Recognised by Industry Leaders."
- 3 intro paragraphs
- "Why Choose Exchange Power?" with 7 sub-points: Expertise and Experience · Comprehensive Solutions · Quality Products · Energy Efficiency and Sustainability · Customer-Centric Approach · Financial Benefits · Ongoing Support
- The stats band again
- Our Vision / Our Mission. **The two texts are swapped:** the "Vision" text describes the mission and the "Mission" text describes the vision.

**Blog posts:** category tag, H1, "Exchange Power | date", featured image, body as plain paragraphs with no subheadings, "Comments are closed", sidebar with Recent Posts and Topics.

**Privacy Policy:** a short generic policy covering what is collected, use, disclosure, security, rights, third-party links and changes. Its wording is poor, and it doesn't mention the Australian Privacy Act 1988 or the Australian Privacy Principles.

**Terms and Conditions:** 20 numbered clauses: Agreement · Pre-Delivery · Delivery and installation · Variation · Access to Property · System Information · Risk and title · Payment · Cancellation · No reliance · Warranties and return policy (includes a **5-year whole-system warranty**) · Liability · Indemnity · Privacy · STC Incentives · Governing law · Entire Agreement · Clean Energy Council (CEC) Approved Solar Retailer Code of Conduct · Complaints handling · General. It mentions a $300 re-booking fee.

### A6. Keep as-is vs replace

**Keep exactly as-is (content and business facts):**

- Business name, phone (08 6370 4963), email, address (5/17 Prindiville Dr, Wangara WA 6065), WhatsApp (+61 480 595 132)
- Every URL slug (to protect search rankings). The new routes must match the live paths, **including trailing slashes**.
- All product, service, rebate and blog body copy and all FAQ questions and answers. Exception: light fixes if the client approves (see the decision on copy fixes).
- Legal text (Terms, Privacy) word-for-word unless the business supplies new versions. We are not lawyers and must not rewrite these.
- Rebate figures, stats, the review claim, brand list and NETCC badge. These are business claims to keep, but each needs **verification before launch** (see Part C).
- Page titles and meta descriptions. Copy them into content files as the SEO baseline.
- Form fields from both WPForms forms (as the minimum set).
- Navigation structure: Residential, Commercial, Batteries, Packages, About, Blog, plus Free Quote.
- Product photos and blog images in `wp-content/uploads`, if the business owns them (see Part C).

**Replace freely (visual design only):**

- Layout, colours, fonts, icons, the Bootstrap grid, the jQuery and Fancybox pop-up, tabbed sections, card styles, the logo-carousel styling, the stats band styling and the WhatsApp floating icon.
- The blog sidebar, "Comments are closed" and the category archive pages.
- Duplicated hub copy on `/residential-solar/` and `/commercial-solar/`. Hubs can get a short, original intro plus product cards, which also avoids duplicate-content SEO issues. This needs approval.

**Fix (bugs on the live site):**

- "Claim now" has an empty link.
- Commercial "Learn More" points to the homepage.
- The 100kW footer item has no link.
- "Designed by ." is empty.
- "Usefull" is misspelt.
- Vision and Mission texts are swapped.
- Stats are inconsistent: 1,000+ customers, "over 5,000 Australians" and 1,194 reviews don't agree, and "15000 kWh+ Solar Batteries Sold" mixes a unit of energy with a count of batteries.

---

## Part B — The 10 steps

Each step is one focused session. Don't start a step until the previous step's acceptance criteria are met.

### Target folder structure (built over Steps 1–8)

```
src/
  app/
    layout.js  page.js  globals.css  not-found.js
    sitemap.js  robots.js  opengraph-image.js           (Step 9)
    about-exchange-power/page.js
    residential-solar/page.js   residential-solar/[slug]/page.js
    commercial-solar/page.js    commercial-solar/[slug]/page.js
    solar-battery/page.js       solar-battery/[slug]/page.js
    solar-packages/page.js      solar-packages/[slug]/page.js
    blog/page.js
    [slug]/page.js              ← blog posts stay at root-level URLs, as on the live site
    contact/page.js             ← new page
    privacy-policy/page.js  terms-and-conditions/page.js
  components/
    ui/        Button, Card, Container, Section, Heading, Input, Textarea, Field, Badge, Accordion, Dialog, Icon
    layout/    TopBar, Header, MobileNav, Footer
    sections/  Hero, StatsBand, ServiceSplit, PackageGrid, WhyChoose, ReviewSummary, BrandStrip,
               PostGrid, CtaBand, FaqList, Prose, PageHeader, Breadcrumbs
    forms/     QuoteForm, QuoteDialog, QuoteButton
  content/
    site.js         business details, contact info, socials, legal entity
    navigation.js   header and footer menus
    home.js  about.js
    products.js     residential, commercial, battery and package entries (title, slug, category, summary, image, seo, faqs, body file)
    pages/*.md      long-form copy for product and service pages
    posts/*.md      blog posts (frontmatter: title, date, category, image, excerpt, seo)
    legal/*.md      terms and privacy
  lib/
    content.js      typed accessors (getProduct, getProductsByCategory, getPost, getAllPosts)
    markdown.js     build-time Markdown → HTML (server only)
    seo.js          buildMetadata(), JSON-LD helpers
    cn.js           className helper
    (Step 7, after approval) email/ and validation.js
```

---

### Step 1 — Project foundation

- **Goal:** a clean, agreed baseline that builds, lints and formats, with the folder structure in place.
- **Read first:** `01-app/02-guides/upgrading/version-16.md` (Turbopack, `next lint` removal, ESLint flat config), `01-app/03-api-reference/05-config/01-next-config-js/{cacheComponents,partialPrefetching,trailingSlash,images}.md`, `01-app/03-api-reference/05-config/03-eslint.md`.
- **Deliverables:**
  - Confirm `npm run dev` and `npm run build` work on Turbopack. The earlier SWC native binary problem is fixed; record the Node version in use (v20.20.2).
  - **Language decision: stay on JavaScript**, matching `jsconfig.json`. Get type safety from JSDoc `@typedef`s plus `"checkJs": true` in `jsconfig.json`. That gives editor and `tsc --noEmit` checking without converting files. (Switching to TypeScript is listed as an optional decision in Part C.)
  - Add Prettier with `prettier-plugin-tailwindcss` (class sorting) and `eslint-config-prettier`, plus `.prettierrc`, `.prettierignore`, `.editorconfig`.
  - Scripts: `lint`, `lint:fix`, `format`, `format:check`, `typecheck` (`tsc --noEmit -p jsconfig.json` using `typescript` as a dev dependency, run in check-only mode).
  - Set `trailingSlash: true` in `next.config.mjs` so the new URLs match the live site exactly. Keep `cacheComponents`, `partialPrefetching` and the `@tailwindcss/turbopack` CSS rule.
  - Create the empty folder skeleton (`src/components/{ui,layout,sections,forms}`, `src/content`, `src/lib`) and remove the create-next-app boilerplate (starter page content and the starter SVGs in `public/`).
  - Add `.env.example` (no secrets) and a short `docs/CONVENTIONS.md` covering naming, Server vs Client component rules, and where content lives.
- **Files:** `package.json`, `package-lock.json`, `next.config.mjs`, `jsconfig.json`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `.editorconfig`, `.env.example`, `.gitignore`, `docs/CONVENTIONS.md`, `src/app/page.js` (placeholder), `public/*` (removals).
- **Acceptance criteria:** `npm run lint`, `npm run format:check`, `npm run typecheck` and `npm run build` all pass with no errors. `npm run dev` serves a placeholder page on Turbopack. `/` responds, and a URL without a trailing slash redirects to the version with one.
- **Out of scope:** any design or real content.
- **Step 1 notes (done 2026-10-09):**
  - Toolchain: Node v20.20.2, npm 10.8.2, Next 16.4.0 on Turbopack.
  - TypeScript 6.0.3 is installed for `typecheck` only (`checkJs` + `strict`). `@types/react`, `@types/react-dom` and `@types/node@20` were added, because `tsc` can't type JSX or React without them.
  - `layout.js` got only a JSDoc `@param` for `children` (needed by strict `checkJs`) and Prettier's class sort.
  - `.gitignore` keeps ignoring `.env*` but now allows `.env.example`.
  - Env variable names are `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
  - Only one `next dev` can run per project. A second one exits with "Another next dev server is already running".

### Step 2 — Design system

- **Goal:** a new visual identity expressed as Tailwind 4 tokens, plus a small set of reusable UI building blocks.
- **Read first:** `01-app/01-getting-started/13-fonts.md` (`next/font`), `01-app/01-getting-started/12-images.md`.
- **Deliverables:**
  - Tokens in `globals.css` using `@theme`:
    - **Colour:** brand, accent (solar or energy), neutral scale, success/warning/error, and surface/foreground pairs. Every text/background pair must meet **WCAG AA contrast**, checked and recorded in a table.
    - **Typography:** a display font and a body font via `next/font` (self-hosted, no layout shift) and a fluid type scale using `clamp()`.
    - **Spacing:** section rhythm and a container width.
    - **Radius, shadow, motion:** a few levels each, with motion that respects `prefers-reduced-motion`.
  - Breakpoints: mobile-first, with the Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280) documented. The layout goal is 360px phone → tablet → 1440px desktop.
  - Components in `src/components/ui/`:
    - `Button` (primary, secondary, ghost, link; sm, md, lg; renders a `Link` or `<a>` when given `href`)
    - `Card`, `Container`, `Section` (spacing and background variants), `Heading` (keeps semantic level and visual size separate)
    - `Input`, `Textarea`, `Field` (label, hint, error, `aria-describedby`)
    - `Badge`
    - `Accordion` (native `<details>`/`<summary>`, no client JS)
    - `Dialog` (native `<dialog>`, the only client component here)
    - `Icon` (inline SVG set, tree-shaken)
  - A component gallery at `/styleguide` that is excluded from the sitemap and set to `noindex`. It's deleted or gated in Step 10.
- **Files:** `src/app/globals.css`, `src/app/layout.js` (fonts only), `src/components/ui/*`, `src/lib/cn.js`, `src/app/styleguide/page.js`.
- **Acceptance criteria:**
  - Every component renders in the gallery at 360px, 768px and 1280px without horizontal scroll.
  - The contrast table passes AA.
  - Focus rings are visible on every interactive element.
  - Only `Dialog` is marked `'use client'`.
  - Lint, typecheck and build pass.
- **Out of scope:** page sections and real content.
- **Step 2 notes (done 2026-10-09):**
  - The palette is a proposal: deep teal-navy brand and solar amber accent. It's documented in `docs/DESIGN-TOKENS.md`, and `npm run check:contrast` checks 29 pairs, all passing AA.
  - Fonts: Sora (display) and Inter (body), both variable fonts loaded with `next/font/google`.
  - The reading-width token is `max-w-reading`, because `max-w-prose` is a built-in Tailwind utility.
  - The UI kit adds no new runtime dependencies. `cn` is a small local helper and doesn't merge conflicting classes.

### Step 3 — Content layer

- **Goal:** all copy and business data lives in `src/content/`, and pages render from it. No page copy is hard-coded in components.
- **Read first:** `01-app/03-api-reference/03-file-conventions/dynamic-routes.md`, `01-app/03-api-reference/04-functions/generate-static-params.md`, and the `use cache` directive docs (to see how build-time file reads behave with `cacheComponents`).
- **Deliverables:**
  - `site.js`: name, phone (display and `tel:` formats), email, address (with structured parts), WhatsApp, NETCC badge, brands list, stats, review summary, legal footer text.
  - `navigation.js`: the header menu with submenus, and the footer columns.
  - `home.js` and `about.js`: section-by-section copy from audit sections A4 and A5.
  - `products.js`: one entry for each of the 14 product, service and hub pages, with `slug`, `category`, `title`, `summary`, `image`, `seo { title, description }`, `faqs[]` and `bodyFile`.
  - `pages/*.md` (long-form product copy), `posts/*.md` (8 posts with frontmatter) and `legal/*.md` (Terms and Privacy). All copied **verbatim** from the live site, keeping the internal links but rewriting them to relative paths.
  - JSDoc `@typedef`s (`Product`, `Post`, `Faq`, `SeoMeta`, `NavItem`) and `src/lib/content.js` accessors, which throw a clear error at build time on a missing or invalid entry.
  - `src/lib/markdown.js`: renders Markdown on the server at build time. It uses one small dependency (for example `marked`), which never reaches the client bundle.
  - Images: download the reused product, blog and brand-logo images into `public/images/...` (only after the image-rights decision), convert them to WebP or AVIF where useful, and record their width and height.
- **Files:** `src/content/**`, `src/lib/content.js`, `src/lib/markdown.js`, `public/images/**`, `package.json`.
- **Acceptance criteria:**
  - Every live URL in table A1 (except the archive and orphan pages) has a matching content entry.
  - A small script or test (`npm run check:content`) checks that slugs are unique, every required field is present, and every internal link points to a known route.
  - Spot-checking 3 pages against the live site shows identical copy.
  - Typecheck passes.
- **Out of scope:** page layouts. Pages can stay unstyled in this step.

### Step 4 — Layout shell

- **Goal:** the frame every page shares.
- **Read first:** `01-app/03-api-reference/03-file-conventions/layout.md`, `01-app/01-getting-started/14-metadata-and-og-images.md`, `01-app/03-api-reference/04-functions/generate-metadata.md`, `01-app/03-api-reference/02-components/link.md`, `01-app/02-guides/optimizing-prefetching.md` (with Partial Prefetching on).
- **Deliverables:**
  - `TopBar`: the rebate promotion with a **working** link (target to be confirmed) and a phone link.
  - `Header`: logo, desktop navigation with keyboard-accessible dropdowns for Residential and Commercial, a "Free Quote" button and a phone link. It is sticky and compact on scroll, with no layout shift.
  - `MobileNav`: a full-screen or drawer menu with focus trapping, Esc to close, scroll lock, closing on navigation, and the call and quote buttons pinned at the bottom.
  - `Footer`: the columns from `navigation.js` with the bugs fixed, contact details, the NETCC badge, a WhatsApp link, and "© {year} Exchange Power".
  - Root `layout.js`: `lang="en-AU"`, fonts, a skip-to-content link, default `metadata` (title template `%s | Exchange Power WA`, `metadataBase`, description) and `viewport`.
  - `not-found.js`.
- **Files:** `src/components/layout/*`, `src/app/layout.js`, `src/app/not-found.js`, `src/lib/seo.js` (`buildMetadata` helper).
- **Acceptance criteria:**
  - The header and footer render from content files only.
  - The mobile menu works with keyboard alone and with a screen reader (a VoiceOver smoke test).
  - Only the mobile menu and the dropdown toggles are client components.
  - The 404 page renders.
  - There is no Cumulative Layout Shift (CLS) from the header.
  - Lint, typecheck and build pass.
- **Out of scope:** page bodies and forms (the "Free Quote" buttons can link to `/contact/` for now).

### Step 5 — Homepage

- **Goal:** the new homepage, built from reusable sections.
- **Read first:** `01-app/03-api-reference/02-components/image.md` (`priority`/`preload`, `sizes`, `fill`).
- **Deliverables:**
  - The sections `Hero`, `StatsBand`, `ServiceSplit` (residential vs commercial, replacing the tabs), `PackageGrid` (filter by category, which works without JS through links or anchors and is enhanced with JS), `WhyChoose`, `ReviewSummary` (only if the claim is verified), `PostGrid` (the latest 3 posts), `BrandStrip` and `CtaBand`.
  - The hero image is optimised and loads with priority. All other images lazy-load with correct `sizes`.
  - The quote form slot is a placeholder until Step 7.
  - Page metadata comes from content.
- **Files:** `src/app/page.js`, `src/components/sections/*`, `src/content/home.js` (tweaks only).
- **Acceptance criteria:**
  - The page matches the audit's section list (fixes applied).
  - It has no horizontal scroll from 360px to 1440px.
  - Lighthouse mobile Performance on a production build is 90 or above.
  - The page is prerendered (static) in the build output.
- **Out of scope:** working form submission.

### Step 6 — Core service and product pages

- **Goal:** the 4 category hubs and 14 detail pages, built on shared templates.
- **Read first:** `dynamic-routes.md` and `generate-static-params.md` (note `params` is async), `01-app/03-api-reference/03-file-conventions/route-segment-config` (`dynamicParams`), and the redirects config docs.
- **Deliverables:**
  - One `ProductPage` template: `PageHeader` with breadcrumbs, a key-facts panel (figures from the copy, such as kWh per day, panel count and best-fit property type), `Prose` body, `FaqList`, related products, and a `CtaBand`.
  - One `CategoryHub` template: intro and card grid.
  - Routes `residential-solar/`, `commercial-solar/`, `solar-battery/` and `solar-packages/`, each with a `[slug]` route using `generateStaticParams` and no unknown slugs allowed (unknown slugs return 404).
  - Redirects in `next.config.mjs`: `/category/solar/` → `/blog/`, `/category/uncategorized/` → `/blog/`, `/residential-solar-system/` → `/residential-solar/`. All are permanent.
  - FAQ and breadcrumb JSON-LD on each detail page.
- **Files:** `src/app/{residential-solar,commercial-solar,solar-battery,solar-packages}/**`, `src/components/sections/{PageHeader,Breadcrumbs,Prose,FaqList,KeyFacts,RelatedProducts}.js`, `next.config.mjs`.
- **Acceptance criteria:**
  - All 18 URLs (4 hubs and 14 detail pages) return 200 at the same paths as the live site.
  - Unknown slugs return 404.
  - Old archive URLs return 308 redirects.
  - The FAQ JSON-LD validates (Rich Results Test or Schema validator).
  - Every page is static in the build output.
- **Out of scope:** blog and legal pages.

### Step 7 — Contact and enquiry forms with Resend _(server code only after approval, see Part C)_

- **Goal:** working quote and enquiry forms that email the business through Resend without exposing the API key.
- **Read first:** `01-app/02-guides/forms.md`, `01-app/02-guides/server-actions.md` (the Security section), `01-app/01-getting-started/07-mutating-data.md`, `01-app/01-getting-started/15-route-handlers.md`, `01-app/02-guides/environment-variables.md`, `01-app/02-guides/data-security.md` (rate limiting).

#### How email is sent securely without a backend

The Resend API key is a secret. Anything in browser JavaScript, including any variable prefixed `NEXT_PUBLIC_`, can be read by anyone, so **the browser must never call Resend directly**.

**Option A — one Server Action (recommended).** This is the smallest secure option and needs a server runtime.

There is no separate backend, database or API server. The only server-side code is a single function, `sendEnquiry(formData)`, marked `'use server'`. Next.js runs it on the host's serverless runtime. It does the following:

1. Validates the fields again on the server: required fields, email and Australian phone format, length limits.
2. Rejects bots using a hidden honeypot field plus a minimum time-to-submit check.
3. Applies a basic per-IP rate limit (best effort on serverless; Vercel BotID or Cloudflare Turnstile can be added if spam appears).
4. Escapes user input and builds a plain-text and HTML email.
5. Calls Resend using `process.env.RESEND_API_KEY`, with the customer's address as `replyTo`.
6. Returns `{ ok }` or field errors to the form via `useActionState`.

The Resend client lives in `src/lib/email/resend.js`, which starts with `import 'server-only'` so it can never be bundled for the browser. The key is set only in the host's environment variables and in `.env.local`, which git ignores.

Why a Server Action instead of a route handler: the form still submits with JavaScript disabled (progressive enhancement), it comes with pending and error states, and there is no public URL to document.

**Option A2 — one route handler.** `src/app/api/enquiry/route.js` with a `POST` export does exactly the same job and has the same footprint. Choose this if you want a plain endpoint you can test with `curl`, or one other clients can reuse later.

Both A and A2 require hosting that runs Next.js server functions, such as Vercel, Netlify, or a Node server. With A, keep `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` stable if self-hosting across several instances.

**Option B — fully static site (`output: 'export'`).** The build produces plain HTML, CSS and JS files with **no server at all**, so there is nowhere safe to keep the Resend key. Server Actions and request-based route handlers are not supported in a static export. Forms would then need one of these:

- **(B1)** A third-party form endpoint (Formspree, Web3Forms, Basin and similar). It's simple, but it isn't Resend: emails come from their service and are subject to their limits and pricing.
- **(B2)** A separate serverless function deployed outside Next.js (a Cloudflare Worker or Netlify Function) that holds the key and calls Resend. That is effectively a small backend you maintain separately.

A static export also gives up other things this site needs:

- **Redirects** from the old WordPress archive URLs. These would have to move to host config.
- **Default `next/image` optimisation.** It would need a custom loader or pre-optimised images.
- **Cache Components and Partial Prerendering** (`cacheComponents`), which is currently enabled. Its compatibility with `output: 'export'` would have to be checked, and the flag may have to be turned off.

**Recommendation:** Option A on Vercel. Every page is still prerendered as static HTML and served from the CDN, so speed is identical to a static export. The single action function only runs when a form is submitted, and that fits the Vercel free plan.

**Deliverables** (Option A):

- `QuoteForm` with these fields: First name\*, Last name\*, Email\*, Phone\*, Address or suburb, **Enquiry type** (Residential solar / Commercial solar / Battery / Rebates / Other), Message, and a consent line linking to the Privacy Policy.
- A compact hero variant (Name, Email, Phone).
- `QuoteDialog` (native `<dialog>`), opened by every "Get a Free Quote" button. It falls back to `/contact/` when JavaScript is off.
- The `sendEnquiry` action, the shared validation in `src/lib/validation.js` (used by both client and server), and an email template.
- Success and error states that are announced to screen readers through `aria-live`.
- A hidden field recording the page the form was submitted from (source URL), so the business knows which page produced the lead.
- `.env.example` entries: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- **Files:** `src/components/forms/*`, `src/app/actions/send-enquiry.js` (or `src/app/api/enquiry/route.js` for A2), `src/lib/email/resend.js`, `src/lib/email/templates.js`, `src/lib/validation.js`, `.env.example`, `package.json` (`resend`).
- **Acceptance criteria:**
  - A test submission arrives at the recipient inbox with all fields and `replyTo` set.
  - `RESEND_API_KEY` doesn't appear anywhere in `.next/static` (check with grep).
  - An invalid submission is rejected on the server even with client validation bypassed (tested with `curl` or devtools).
  - A honeypot submission is silently dropped.
  - The form works with JavaScript disabled (Option A).
  - Errors are announced to assistive technology.
- **Out of scope:** CRM integration and auto-responders, unless requested.

### Step 8 — Remaining pages

- **Goal:** every other page on the site.
- **Deliverables:**
  - **About** (`/about-exchange-power/`), with the Vision and Mission fix and the stats.
  - **Blog index** (`/blog/`), with optional category filtering.
  - **Blog post** template at the root `[slug]` route (static params from `posts/`), with date, reading time, featured image, `Prose`, related posts, a CTA, and Article JSON-LD.
  - **Contact** (`/contact/`, new): the full quote form, phone, email, WhatsApp, address, and a static map image with a "Get directions" link (no heavy map embed).
  - **Privacy Policy** and **Terms and Conditions**: Markdown rendered with `Prose`, a table of contents for Terms, and anchor links to each clause.
  - **FAQ page**: optional (see Part C). If approved, `/faq/` gathers all product FAQs, grouped by topic.
- **Files:** `src/app/{about-exchange-power,blog,[slug],contact,privacy-policy,terms-and-conditions}/page.js`, optionally `src/app/faq/page.js`, plus related sections.
- **Acceptance criteria:**
  - Every URL in table A1 returns 200 or a planned redirect.
  - All 8 posts render with their original dates.
  - The root `[slug]` route doesn't catch other routes; static routes take precedence and unknown slugs return 404.
  - Legal text matches the live site word-for-word, unless replaced by text the business supplies.
- **Out of scope:** new blog posts or a CMS.

### Step 9 — Performance, SEO and accessibility

- **Read first:** `01-app/03-api-reference/03-file-conventions/01-metadata/{sitemap,robots,opengraph-image,app-icons,manifest}.md`, `01-app/03-api-reference/04-functions/generate-metadata.md`, `01-app/02-guides/upgrading/version-16.md` (the `next/image` defaults section).
- **Deliverables:**
  - Metadata on every route: a unique title and description (from content), canonical URLs with trailing slashes, Open Graph and Twitter tags, and generated OG images (a branded template through `opengraph-image.js`).
  - `sitemap.js` (every public route, with `lastModified` from content dates) and `robots.js`.
  - JSON-LD: `LocalBusiness`/`Organization` (name, address, phone, geo, `sameAs` if social accounts exist), `WebSite`, `BreadcrumbList`, `FAQPage`, `Article`.
  - Favicon, app icons and `manifest`.
  - An image audit: every image has `width`/`height` or `fill`+`sizes`, sensible quality (default `[75]`), modern formats, and only the first-screen (LCP) image has priority.
  - A bundle check: client JS is limited to the header menu, dialog, form and filters. Remove any unused dependencies.
  - Accessibility pass:
    - Keyboard-only walkthrough of every template
    - Visible focus
    - Skip link
    - Landmark structure
    - Heading order
    - Form labels and errors
    - `prefers-reduced-motion`
    - Contrast re-checked
    - axe DevTools: 0 serious or critical issues
- **Files:** `src/app/{sitemap,robots,manifest}.js`, `src/app/opengraph-image.js` (and per-section versions if useful), `src/app/icon.*`, `src/lib/seo.js`, touch-ups across components.
- **Acceptance criteria:**
  - Lighthouse (mobile, production build) scores **90 or above in Performance, Accessibility, Best Practices and SEO** on the homepage, one product page, one blog post and Contact.
  - Core Web Vitals in the lab: LCP under 2.5s, CLS under 0.1, Total Blocking Time (TBT) under 200ms.
  - The sitemap lists every route.
  - The Rich Results Test passes for FAQ, Article and LocalBusiness.
- **Out of scope:** analytics (see Part C).

### Step 10 — QA, build check, deployment and handoff

- **Read first:** `01-app/01-getting-started/17-deploying.md`, `01-app/02-guides/deploying-to-platforms.md`, `01-app/02-guides/environment-variables.md`.
- **Deliverables:**
  - **Responsive QA matrix** covering 360, 390, 768, 1024, 1280 and 1440px on Safari iOS, Chrome Android, and desktop Chrome, Safari, Firefox and Edge. Record results in `docs/QA.md`.
  - **Link check** across the whole site: no broken internal links, and `tel:`, `mailto:` and WhatsApp links work.
  - **URL parity check**: a script compares the live sitemap against the new build's routes. Every old URL returns 200 or a redirect.
  - **Form test** on the preview deployment with the real Resend domain.
  - **Clean build**: `npm run build` passes with zero warnings, and lint and typecheck pass.
  - Remove or gate `/styleguide`.
  - **Deployment config** for the chosen host: project settings, environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`), production domain, `www` → apex redirect, and a launch DNS checklist (including Resend's SPF/DKIM records for the sending domain).
  - `README.md` handoff covering:
    - Setup and scripts
    - Folder map
    - How to edit content (add a product, add a blog post, change contact details)
    - How forms and email work, and where the key lives
    - Deploying
    - Known limitations
- **Files:** `README.md`, `docs/QA.md`, `docs/LAUNCH-CHECKLIST.md`, `scripts/check-links.mjs`, `scripts/check-url-parity.mjs`, host config (for example `vercel.json` only if needed).
- **Acceptance criteria:**
  - The QA matrix is complete with no open blocker or major issues.
  - The URL parity check passes.
  - A live form test is received.
  - The production build is clean.
  - A new developer can follow the README to run, edit content and deploy.

---

## Part C — Decisions needed from the user

1. **Hosting platform.** Vercel is recommended: it's built for Next.js, supports Cache Components, Server Actions and image optimisation, has preview deployments, and its free tier fits this site. Alternatives are Netlify, Cloudflare, or a Node server/VPS.
2. **Static site or one server function for email** (see Step 7):
   - **A — one Server Action** (recommended), or **A2 — one route handler**. Both use Resend, keep the key server-side, and need a host that runs Next.js server functions. Pages stay static.
   - **B — fully static (`output: 'export'`).** No server. Forms must use a third-party form service (not Resend) or a separately deployed function. This also loses Next.js redirects and default image optimisation, and `cacheComponents` would need to be checked or turned off.
3. **Resend setup:**
   - The **sender address**, for example `enquiries@exchangepower.com.au`. The domain must be verified in Resend with DNS records, so someone with DNS access is needed.
   - The **recipient address(es)**: is it `info@exchangepower.com.au`? Does anyone else need a copy?
   - Should customers get an **automatic confirmation email**?
4. **Quote or booking flow.** Options:
   - Keep the simple enquiry form (current behaviour, plus an "enquiry type" field).
   - Add a short multi-step quote form: property type → system interest → roof and bill details → contact details.
   - Add booking for consultation times. That needs a calendar service such as Cal.com or Calendly, linked or embedded.
5. **Content changes.** Should the copy stay exactly as it is now? Or may we:
   - fix obvious grammar and spelling,
   - swap the Vision and Mission texts back, and
   - write short original intros for the Residential and Commercial hubs, which currently duplicate the 6.6kW and 100kW pages?
6. **Business claims to verify before launch:**
   - **Stats:** 50,000+ panels, 1,000+ customers vs "over 5,000 Australians", "15000 kWh+ batteries".
   - **Review rating:** "4.8 from 1,194 reviews". Where do these reviews come from? Under Australian Consumer Law the claim must be accurate and traceable, so a Google Business Profile link or real testimonials would be needed.
   - **Rebate amounts** and loan terms (Synergy $5,000, Horizon Power $7,500, $10,000 loans, $210,000 income cap). These are time-sensitive.
   - The NETCC badge, and whether the business is a CEC Approved Solar Retailer.
7. **Brand assets and images:**
   - Is there a logo source file (SVG) and are there brand colours to keep? Or is a completely new palette acceptable alongside the existing logo?
   - Does the business own the photos in `wp-content/uploads` (product and blog images)? Should they be reused, or replaced with new or stock photography?
8. **"Claim now" top-bar promotion.** Where should it go: the battery rebates page, the quote form, or nowhere (remove it)?
9. **Extra pages and business details:**
   - Approve the new **Contact** page.
   - Do you want a combined **FAQ** page?
   - Do you want social media links (do any accounts exist)?
   - Should the footer show an ABN?
   - Should the footer show opening hours?
10. **Analytics and consent.** None, Vercel Analytics (no cookies), GA4, or Plausible? GA4 would require a cookie notice and an update to the Privacy Policy.
11. **Legal text.** Keep the current Privacy Policy and Terms word-for-word? Or will the business supply updated versions? The current Privacy Policy doesn't mention the Australian Privacy Act or the APPs, so a lawyer review is recommended.
12. **Language (optional).** Stay on JavaScript with JSDoc type checking (recommended, matches `jsconfig.json`), or convert to TypeScript now?
