# QA report (Step 10)

**Date:** 2026-10-09
**Build:** production (`npm run build`, then `next start`), tested locally
**Browser:** Chromium (desktop Chrome via Playwright). Widths up to 390px were run as a mobile device with touch; 768px with touch.

This covers the automated responsive pass. Real-device checks for the owner are listed at the end and are **not yet tested**.

## What was checked on every page and width

| Check                | Pass condition                                                                                                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Horizontal overflow  | `document.documentElement.scrollWidth` equals the viewport width: no sideways scroll.                                                                                                                           |
| Header               | Below 1024px the menu button shows and the desktop nav is hidden. From 1024px the desktop nav shows. The sticky header never covers the H1.                                                                     |
| Mobile menu          | On the homepage at 360, 390 and 768px: the menu opens fully on screen with all 16 links, and Esc closes it.                                                                                                     |
| Readable type        | No visible text under 12px. The only 12px text is uppercase letter-spaced labels (eyebrows and footer headings). Body copy is 16px or more, and article (prose) text is 17px at 360px rising to 19px at 1440px. |
| Tap targets (≤390px) | Every standalone link, button, summary and form control is at least 44 × 44px. Links inside a sentence are exempt (WCAG 2.5.5 inline exception) and listed below.                                               |
| Forms                | Every visible control has a font size of at least 16px (no iOS zoom on focus) and is at least 140px wide.                                                                                                       |
| Overlap and clipping | No element with hidden overflow clips its content. No header overlap.                                                                                                                                           |
| Console              | No JavaScript errors. The 404 page logs one "Failed to load resource: 404" because the page itself returns a 404 status, which is correct.                                                                      |

## Matrix

✅ = all checks above pass. Templates and the URL tested:

| Template   | URL                                                              | 360 | 390 | 768 | 1024 | 1280 | 1440 |
| ---------- | ---------------------------------------------------------------- | --- | --- | --- | ---- | ---- | ---- |
| Home       | `/`                                                              | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Hub        | `/residential-solar/`                                            | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Product    | `/residential-solar/6-6kw-solar-system-wa/`                      | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Blog index | `/blog/`                                                         | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Post       | `/why-the-6-6kw-solar-system-is-australias-most-popular-choice/` | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| About      | `/about-exchange-power/`                                         | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Contact    | `/contact/`                                                      | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Terms      | `/terms-and-conditions/`                                         | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| Privacy    | `/privacy-policy/`                                               | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |
| 404        | `/not-a-real-page/`                                              | ✅  | ✅  | ✅  | ✅   | ✅   | ✅   |

**Open issues:** none at blocker or major level. Minor notes are below.

## Issues found and fixed in Step 10

| #   | Severity | Issue                                                                                                                                                                           | Fix                                                                                                                                                                                         |
| --- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Major    | Mobile tap targets under 44px: the header and footer wordmark (28px tall), footer contact links (24px), footer menu links (20px), and breadcrumbs (21px; "Blog" was 30px wide). | Wordmark, footer links and breadcrumbs now have a minimum height of 44px (and a minimum width of 44px for short labels). Footer and breadcrumb links return to compact spacing from 1024px. |
| 2   | Major    | The Terms "Contents" toggle (24px) and its clause links (29px) were too small to tap reliably.                                                                                  | The summary now has a minimum height of 44px. Clause links have 12px vertical padding below 1024px.                                                                                         |
| 3   | Minor    | Homepage: the hero phone link, the "How the rebate works" link, the credentials link, the FAQ "Read the full page" links and "All guides" were 20–38px tall.                    | All now have a minimum height of 44px.                                                                                                                                                      |
| 4   | Minor    | Homepage quote form at 1024–1440px: email and phone were 150–188px wide beside the copy, so long addresses scrolled inside the field.                                           | In the compact (homepage) form, email and phone span the full width from 1024px. First and last name stay side by side.                                                                     |
| 5   | Minor    | Footer at 390px: two-line links ("Solar Panel Installation WA" and "…Wangara") ran together with no space between them.                                                         | Added 6px of vertical padding to footer links below 1024px.                                                                                                                                 |

## Inline links exempt from the 44px rule

These links sit inside a sentence, where WCAG 2.5.5 allows a smaller target. They are the full height of the line of text:

- The quote forms: "Privacy Policy" in the consent line
- Blog posts: in-text links such as "6.6kW solar system" and "solar panels"
- About: "Exchange Power" in the body copy
- Terms: the email address in clause 19
- Privacy: the site URL in the body copy

## Background photos (2026-10-10)

The matrix above was re-run after background photos were added to the headers and quote bands. It passes on every template and width.

Text over photos was also measured against the actual pixels behind each line, on all 30 pages at all 6 widths: 2,375 samples, all at WCAG AA or better. The lowest was 4.67:1, for a 12px eyebrow on the 30kW page at 360px.

## Also verified in Step 10

- `npm run check:links`: every internal link resolves, and the `tel:` (E.164, `tel:+61863704963`), `mailto:` and WhatsApp (`https://wa.me/61480595132`) links are well formed.
- `npm run check:parity`: all 30 URLs from the live sitemap return 200 here, or redirect (308) to a page that does.
- `/styleguide/` returns 404.

## How to re-run

The automated pass used a local Playwright script (not committed: Playwright isn't a project dependency). To repeat it by hand, open each URL above in Chrome DevTools device mode at each width and check the table at the top. The scripted checks that are committed are `npm run check:links`, `npm run check:seo` and `npm run check:parity` (see `README.md`).

## Manual device checks (for the owner)

Run these on the Vercel preview URL before launch. Tick each box when done.

| Device and browser    | Status         |
| --------------------- | -------------- |
| iPhone, Safari (iOS)  | Not yet tested |
| Android phone, Chrome | Not yet tested |
| Mac, Safari           | Not yet tested |
| Desktop, Firefox      | Not yet tested |
| Desktop, Edge         | Not yet tested |

On each one:

- [ ] **Homepage:** loads with no sideways scroll, and the hero heading and buttons are fully visible.
- [ ] **Menu (phones):** the ☰ button opens the menu. Every link works. The ✕ button closes it (on Android, so does the Back gesture), and the page behind doesn't scroll while it's open.
- [ ] **Desktop menu:** the Residential and Commercial dropdowns open on click and close when you click elsewhere or press Esc.
- [ ] **Tap to call:** the phone number opens the dialler with 08 6370 4963.
- [ ] **Email and WhatsApp:** the email link opens a new message to the business address, and WhatsApp opens a chat.
- [ ] **Quote form (contact page):**
  - Press Send with the form empty: the errors appear and the first one is announced or focused.
  - Fill it in and send it: the success message appears, and the email arrives in the enquiry inbox (see `LAUNCH-CHECKLIST.md` step 7).
  - Phones: focusing a field doesn't zoom the page, and the keyboard shows @ for email and numbers for phone.
- [ ] **Product page:** the FAQ items open and close, and the "Get a free quote" button goes to the contact page.
- [ ] **Terms (phones):** "Contents" expands, and tapping a clause jumps to it with the heading visible below the sticky header.
- [ ] **Blog post:** text is comfortable to read with no zooming, and long words or links don't run off the screen.
- [ ] **404:** a made-up URL shows the "Page not found" page with links back into the site.
- [ ] **Rotate (phones):** turning the phone to landscape and back doesn't break the layout.
