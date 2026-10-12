# Exchange Power website

The Exchange Power website (solar and battery systems, Wangara WA), rebuilt from WordPress with Next.js 16, React 19 and Tailwind CSS 4.

- **Every page is static:** prerendered at build time from files in `src/content/`.
- **No database or CMS.**
- **The only server code** is one Server Action that emails quote requests through [Resend](https://resend.com).
- **Hosting:** Vercel.

## Contents

1. [Setup](#setup)
2. [Scripts](#scripts)
3. [Folder map](#folder-map)
4. [Editing content](#editing-content)
5. [Forms, email and secrets](#forms-email-and-secrets)
6. [Deploying](#deploying)
7. [Known limitations](#known-limitations)
8. [Where the docs live](#where-the-docs-live)

---

## Setup

**Requirements:** Node.js 20 or 22 (`"engines"` in `package.json`), tested on 20.20.2 and 22.23.1. Node 22 is recommended because Node 20 reached end of life in April 2026. Use npm, which comes with Node.

```bash
git clone <repo-url> exchangepower-site
cd exchangepower-site
npm ci                         # install the exact versions in package-lock.json
cp .env.example .env.local     # optional: see below
npm run dev                    # http://localhost:3000
```

- **Without `.env.local`, the site works fully.** The quote form "sends" by printing the email to the terminal instead of emailing it.
- To send real emails locally, fill in `.env.local`. See [Forms, email and secrets](#forms-email-and-secrets).
- `.env.local` is git-ignored. **Never commit it.**

> This project uses **Next.js 16.4**. Its APIs differ from older versions you may know. For example, `params` is a Promise, `next lint` is gone and Cache Components are on. Before changing code that uses a Next.js API, read the matching guide in `node_modules/next/dist/docs/`. House rules are in `docs/CONVENTIONS.md`.

## Scripts

Run with `npm run <name>`.

### Everyday

| Script  | What it does                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------- |
| `dev`   | Starts the development server at http://localhost:3000, with hot reload.                              |
| `build` | Production build. Runs `prebuild` first, which generates the social sharing images into `public/og/`. |
| `start` | Serves the production build (run `build` first). Add `-- -p 3010` to choose the port.                 |

### Checks: run before every commit

| Script           | What it checks                                                                                                                                                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lint`           | ESLint (`lint:fix` fixes what it can).                                                                                                                                                                                                                                             |
| `format:check`   | Prettier formatting (`format` rewrites files).                                                                                                                                                                                                                                     |
| `typecheck`      | JSDoc types across `src/` (`tsc --noEmit`).                                                                                                                                                                                                                                        |
| `check:content`  | Content rules: valid slugs, required fields, image keys, menu links and the `tel:` format. **Run this after any content edit.**                                                                                                                                                    |
| `check:contrast` | WCAG contrast of every colour pair in the design tokens.                                                                                                                                                                                                                           |
| `check:links`    | **Needs a build.** Every internal link in the built HTML resolves, and `tel:`, `mailto:` and WhatsApp links are well formed.                                                                                                                                                       |
| `check:seo`      | **Needs a running production server** (`npm run start`). Every sitemap page has a unique title, description, canonical and social image, and one H1. Also checks that `/styleguide/` is 404 and robots.txt allows indexing. Set `BASE_URL=http://localhost:3010` for another port. |
| `check:parity`   | **Needs a running production server.** Reads the live WordPress sitemap and checks that every old URL returns 200 here, or redirects to a page that does. Makes read-only requests to the live site. Pass `BASE_URL` as above.                                                     |

A full check before a release:

```bash
npm run lint && npm run format:check && npm run typecheck && npm run check:content && npm run check:contrast
npm run build && npm run check:links
npm run start -- -p 3010 &   # then, in the same or another terminal:
BASE_URL=http://localhost:3010 npm run check:seo
BASE_URL=http://localhost:3010 npm run check:parity
```

### Occasional

| Script             | What it does                                                                                                                                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `og:generate`      | Regenerates the social sharing images (`public/og/`, git-ignored). It runs automatically before every build.                                                                                                                                                          |
| `icons:generate`   | Regenerates the **placeholder** "EP" favicon and app icons. Edit `scripts/generate-icons.mjs` when the real logo is approved. Uses `sharp`, which is installed with Next.js.                                                                                          |
| `images:fetch`     | Downloads every image in `src/content/images.js` that isn't already in `public/images/`. The background photos are already committed, and `-- --only=bg-` re-downloads only those. The old-site images haven't been downloaded, because their use isn't approved yet. |
| `content:download` | One-off migration tool: saves the live site's HTML into a local cache.                                                                                                                                                                                                |
| `content:import`   | One-off migration tool: converts the cached HTML into `src/content/`. **Don't re-run it:** it would overwrite hand edits.                                                                                                                                             |
| `content:verify`   | Confirms the imported Markdown still matches the live site word for word.                                                                                                                                                                                             |

## Folder map

```
src/
  app/                    Routes only (one folder per URL). Thin: they load content and render a template.
    page.js               Homepage
    [slug]/               Blog posts, at /<post-slug>/ like the old site
    residential-solar/    Category hubs, each with [slug]/ for its products
    commercial-solar/     (the same for solar-battery/ and solar-packages/)
    about-exchange-power/, blog/, contact/, privacy-policy/, terms-and-conditions/
    actions/send-enquiry.js   The Server Action behind both quote forms
    layout.js             Site frame: header, footer, fonts, default metadata
    not-found.js          The 404 page
    sitemap.js, robots.js, manifest.js, icon.svg, favicon.ico, apple-icon.png
    globals.css           Tailwind setup and design tokens (colours, type, spacing)
  components/
    ui/                   Generic building blocks: Button, Input, Dialog, Accordion, Icon…
    layout/               Header, desktop and mobile navigation, footer, wordmark
    sections/             Page sections: hero, FAQ list, product cards, CTA band…
    templates/            Whole-page layouts: ProductPage, CategoryHub, BlogPost, LegalPage…
    forms/QuoteForm.js    The quote form (variant "full" on /contact/, "compact" on the homepage)
    seo/JsonLd.js         Structured data output
  content/                ALL copy and business data (see "Editing content")
  lib/                    Helpers: content loading and validation, SEO, email, form token, rate limit
scripts/                  Checks, generators and the one-off migration tools
public/                   Static files: icons/, og/ (generated) and images/ (once approved)
docs/                     Project documentation (see "Where the docs live")
```

## Editing content

**All text, links, phone numbers and FAQs live in `src/content/`.** Components never contain copy. Change the content file, then run `npm run check:content` and look at the page in `npm run dev`.

| File                                | Contains                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `site.js`                           | Business name, phone, email, WhatsApp, address, badges, quote button label and target, form labels and messages |
| `navigation.js`                     | Header menu and footer columns                                                                                  |
| `home.js`                           | Homepage sections                                                                                               |
| `products.js`                       | Every hub and product page: title, SEO, FAQs, key facts and which Markdown file is the body                     |
| `pages/*.md`                        | Product and hub body copy (Markdown)                                                                            |
| `posts/*.md`                        | Blog posts (Markdown with frontmatter)                                                                          |
| `legal/*.md`                        | Privacy Policy and Terms                                                                                        |
| `about.js`, `blog.js`, `contact.js` | Those pages' copy and SEO                                                                                       |
| `images.js`                         | The image registry (nothing shows until `approved: true` and the file exists)                                   |
| `backgrounds.js`                    | Which background photo each page header and quote band uses (keys into `images.js`)                             |

### Example: change the phone number

1. Open `src/content/site.js` and edit `phone`:

   ```js
   phone: {
     display: "08 9123 4567",     // how it's shown on the page
     href: "tel:+61891234567",    // international format, no spaces: +61, then the number without its leading 0
     international: "+61891234567",
   },
   ```

2. Every phone link, header button, footer line, form error message and the structured data update automatically.
3. Search for the old number in text that mentions it in a sentence: `grep -rn "6370 4963" src/content`.
   - Today that finds the contact page description in `contact.js`.
   - The Terms quote the number as "863704963" (legal text, CONTENT-NOTES 4.4).
   - `src/lib/validation.js` uses the number only as an example format. It can stay.
4. Run `npm run check:content`. It fails if `href` isn't in `tel:+61…` format.

Email and WhatsApp work the same way: `email` and `whatsapp` in `site.js`. The WhatsApp `href` is `https://wa.me/` followed by the number with no `+` or spaces.

### Example: add a blog post

1. Create `src/content/posts/<url-slug>.md`. The file name becomes the URL, `/<url-slug>/`. Use lowercase letters, numbers and hyphens.

   ```md
   ---
   title: "How Big a Battery Do I Need in Perth?"
   date: "2026-11-02"
   category: "Solar"
   image: "post-how-big-a-battery"
   excerpt: "A quick guide to sizing a home battery for a typical Perth household..."
   seo:
     {
       "title": "How Big a Battery Do I Need in Perth? - Exchange Power",
       "description": "Under 160 characters, unique to this post.",
     }
   ---

   First paragraph of the post. Use **bold**, [links](/solar-battery/), ## headings and - lists.
   ```

2. Add the image to `src/content/images.js` under the same key (`post-how-big-a-battery`).
   - **If you have an approved photo:** put it in `public/images/blog/` and set `approved: true`:

     ```js
     "post-how-big-a-battery": {
       approved: true,
       src: null,                                   // null: the file was added by hand (old-site images have their URL here)
       localPath: "/images/blog/how-big-a-battery.jpg",
       alt: "Home battery installed in a Perth garage",
       width: 1600,
       height: 900,
     },
     ```

   - **If you don't have one yet:** set `approved: false` and the post shows no image.

3. The post appears automatically on `/blog/`, in the homepage "Guides" list (newest first), in the sitemap and with its own social card.
4. Run `npm run check:content`. It catches a slug that clashes with a page, a bad date, a missing image key or a broken link. `npm run check:seo` catches a duplicate SEO title.

### Example: add a product

1. Write the body copy in `src/content/pages/<file>.md` (Markdown).
2. Add an entry to `PRODUCTS` in `src/content/products.js`. Copy an existing `kind: "detail"` entry in the same category and change it:

   ```js
   {
     slug: "15kw-solar-system-wa",        // URL: /residential-solar/15kw-solar-system-wa/
     category: "residential",             // residential | commercial | battery | packages
     kind: "detail",
     title: "15kW Solar System",
     summary: "One or two sentences shown on product cards.",
     image: null,                         // or a key in images.js
     banner: null,
     highlights: [],
     bodyImages: [],
     seo: { title: "15kW Solar System WA | Exchange Power", description: "Unique, under 160 characters." },
     faqs: [{ question: "How many panels…?", answer: "About 34 panels…" }],
     bodyFile: "15kw-solar-system-wa.md",
     keyFacts: [{ label: "Panels", value: "34" }], // only figures the business has confirmed
     bodyHiddenOnLive: false,
   },
   ```

3. The page, its card on the category hub, the sitemap entry and the social card are created automatically.
4. **Menus are manual.** To list the product in the header dropdown or footer, add `{ label, href }` to `src/content/navigation.js`.
5. Run `npm run check:content`, then open the URL in `npm run dev`.

### Example: change a page's background photo

1. Add the photo to `public/images/backgrounds/`. A landscape JPEG about 1920px wide works well, and `next/image` serves smaller WebP versions automatically.
2. Register it in `src/content/images.js`, for example `"bg-my-photo": { approved: true, src: null, localPath: "/images/backgrounds/my-photo.jpg", alt: "", width: 1920, height: 1280, credit: { name: "…", url: "…" } }`.
3. In `src/content/backgrounds.js`, point the page at it, for example `"6-6kw-solar-system-wa": "bg-my-photo"`. Remove a page's entry to show the plain dark header instead.
4. Run `npm run check:content`. It fails on a key that doesn't exist or isn't approved, and on a product or post slug that doesn't exist.

The dark overlay keeps the text readable on any photo. Very bright, busy photos are the hardest, so check the page at phone width after a change.

### Example: edit an FAQ

- **Product page FAQs:** in `src/content/products.js`, find the product's `faqs` array and edit `question` or `answer`. Answers can use Markdown links: `[battery rebates](/solar-battery/wa-residential-battery-rebates/)`. The page's FAQ structured data updates with it.
- **Homepage FAQs:** these aren't separate copies. `home.js` → `faq.items` points at product FAQs by product slug and position, for example `{ product: "6-6kw-solar-system-wa", index: 4 }`, where the first FAQ is index 0. Editing the product FAQ changes both places. To show a different one, change the slug or index.
- Run `npm run check:content` and `npm run build`. The build fails with a clear message if a homepage reference points at an FAQ that doesn't exist.

### Content that still needs approval

Much of the copy is the live site's text kept word for word, and some is new. What still needs a decision is listed in `docs/CONTENT-NOTES.md`, and the launch-blocking items are in `docs/LAUNCH-CHECKLIST.md` Part 1.

## Forms, email and secrets

The quote forms (`/contact/` and the homepage's "Request a free quote") post to the `sendEnquiry` Server Action (`src/app/actions/send-enquiry.js`). It runs only on the server:

1. **Validates** the fields with the same rules the browser uses (`src/lib/validation.js`). Phone numbers must be Australian.
2. **Checks for spam:**
   - a hidden **honeypot** field: if it's filled in, the visitor sees a fake success and nothing is sent
   - a signed **time-to-submit token** (`src/lib/form-token.js`): forms submitted too fast are rejected
   - a **rate limit** of 5 enquiries per IP per 10 minutes (`src/lib/rate-limit.js`)
3. **Sends** one email with Resend (`src/lib/email/resend.js`, template in `templates.js`). The customer's address is the Reply-To, so pressing Reply answers them.

The form works without JavaScript (progressive enhancement). With JavaScript, errors show inline without a page reload.

### Environment variables

All four are **server-only**. Never prefix them with `NEXT_PUBLIC_`, which would publish them in the browser code. The real values live only in Vercel (**Project → Settings → Environment Variables**) and in your own git-ignored `.env.local`. `.env.example` lists them with empty values.

| Name                 | What it is                                                                                                                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key with Sending access. **Secret.**                                                                                                                                                                                          |
| `CONTACT_TO_EMAIL`   | Inbox(es) that receive enquiries. Separate several with commas.                                                                                                                                                                          |
| `CONTACT_FROM_EMAIL` | The sender, for example `Exchange Power <enquiries@your-verified-domain>`. Must be on a domain verified in Resend. Before that, use `Exchange Power <onboarding@resend.dev>`, which only delivers to the Resend account owner's address. |
| `FORM_TOKEN_SECRET`  | Signs the anti-spam token. Generate one with `openssl rand -base64 32`. **Secret.** If it's unset, a secret derived from `RESEND_API_KEY` is used. Changing it makes forms that are already open ask the visitor to press Send again.    |

Which environments each variable is set for (Production, Preview and Development) is in `docs/LAUNCH-CHECKLIST.md` step 3.

### How it behaves

| Situation                              | Result                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev` with no `RESEND_API_KEY` | Nothing is sent. The full email is printed in the terminal, and the form shows success.                                                           |
| Production with a variable missing     | The form asks the visitor to call or email instead. The server log (Vercel → Logs) names the missing variable. Visitors never see config details. |
| Resend rejects or fails                | The visitor sees "Sorry, we couldn't send your enquiry just now…" with the phone number and email address, and the error is logged.               |

**Rotating the key:** create a new key in Resend, update `RESEND_API_KEY` in Vercel, redeploy, then delete the old key in Resend.

## Deploying

The site is set up for **Vercel**, with no `vercel.json`: redirects and trailing slashes are in `next.config.mjs`, and everything else is a dashboard setting.

- **First launch:** follow `docs/LAUNCH-CHECKLIST.md` step by step. It covers GitHub, Vercel, environment variables, the domain, DNS, Resend verification, live form tests, Search Console and rollback.
- **After launch:** every push to `main` deploys to production. Every other branch or pull request gets a **preview URL**. Previews are never indexed by search engines: they get a `noindex` header, a `Disallow: /` robots.txt and a `noindex` meta tag, all based on `VERCEL_ENV`.
- **Undo a bad deploy:** Vercel → Deployments → the last good one → **Instant Rollback**.
- **Old WordPress URLs:** all 30 are covered. Pages keep their exact URLs, and 3 retired URLs redirect (308) in `next.config.mjs`. Add any new redirect there.

## Known limitations

- **Simulated Lighthouse LCP is about 2.6–3.2s** on mobile (homepage 3.2s, inner pages 2.6–2.8s), above the 2.5s "good" line.
  - The LCP element is the header background photo.
  - The real paint is fast: about 1.6–1.7s with applied throttling (homepage Performance 99).
  - Lighthouse's simulation charges for the about 166 KB (gzip) of Next.js and React runtime, and for the richer homepage HTML.
  - Simulated Performance is 93 on the homepage and 96–97 elsewhere. Accessibility, Best Practices and SEO are all 100.
  - Measure real-world data after launch with PageSpeed Insights or Vercel Speed Insights. Only revisit the JavaScript split if the 75th percentile field LCP is over 2.5s.
  - Details are in `PLAN.md` Step 9 under "Known limitation".
- **The rate limit is per server instance** (in memory). On Vercel it's best-effort. If spam becomes a problem, add Vercel Firewall rules or a shared store such as Upstash Redis.
- **Background photos are stock.** Page headers, the homepage hero and the quote bands use free Unsplash photos (credits in `docs/CONTENT-NOTES.md` §14), not the business's own work. Swap in real project photos when available. The old site's product and blog images are still not used (`approved: false`) until the business confirms it owns them.
- **Placeholder brand assets.** There's a typeset wordmark instead of the logo, and an "EP" monogram for the favicon and app icons.
- **No CMS.** Content changes are code changes: edit, commit and push, and Vercel deploys in about a minute. Adding a headless CMS later is possible, because all copy already sits in `src/content/`.
- **No analytics** until a choice is made (PLAN Part C item 10).
- **No automatic confirmation email** to the customer (PLAN Part C item 3).

## Where the docs live

| File                       | What's in it                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `docs/LAUNCH-CHECKLIST.md` | The content sign-off and the step-by-step launch, DNS and rollback plan                                          |
| `docs/CONTENT-NOTES.md`    | Every content question, suggested fix and new copy awaiting approval                                             |
| `docs/QA.md`               | Responsive QA results, and the manual device checks for the owner                                                |
| `docs/CONVENTIONS.md`      | Code conventions: folders, naming, content rules, Next.js 16 notes                                               |
| `docs/DESIGN-TOKENS.md`    | Colours, type scale, spacing, components and the contrast table                                                  |
| `PLAN.md`                  | The original audit of the live site, the 10-step build plan with notes per step, and the decisions list (Part C) |
| `.env.example`             | The environment variables, with empty values                                                                     |
