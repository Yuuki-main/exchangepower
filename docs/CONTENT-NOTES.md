# Content notes: suggested fixes awaiting approval

Step 3 imported the live site's copy **word for word**. `npm run content:verify` confirms that all 40 content blocks (15 page bodies, 15 FAQ sets, 8 posts, 2 legal pages) match the live HTML exactly. Nothing below has been changed in the content files unless it says **Fixed**. Each item needs a yes or no from the business (PLAN.md Part C, item 5).

The live site was downloaded on 2026-10-09 into `.cache/source-html/`.

## 1. Already fixed (links only, no copy changed)

| #   | Where                                 | Live site                                                                                                     | Now                                                                |
| --- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1.1 | Footer, "Solar Packages" column       | "100kW Solar System" has an empty `href`                                                                      | Links to `/commercial-solar/100kw-solar-system/` (`navigation.js`) |
| 1.2 | Homepage, Commercial tab "Learn More" | Points to the homepage                                                                                        | Links to `/commercial-solar/` (`home.js`)                          |
| 1.3 | All internal links in copy            | Absolute `https://exchangepower.com.au/...` URLs                                                              | Relative paths ending in `/`                                       |
| 1.4 | FAQ answers (7.7kW and others)        | Wrapped in leftover `<span role="button" class="... bg-emerald-100 ...">` markup from an AI highlighting tool | Markup removed, text unchanged                                     |
| 1.5 | Blog posts                            | "Comments are closed."                                                                                        | Removed                                                            |
| 1.6 | Terms and Conditions                  | First line "TERMS AND CONDITIONS" repeats the page H1                                                         | Removed (the page title shows it)                                  |

## 2. Needs a decision: links and placeholders

| #   | Item                                                                                                           | Suggestion                                                                        |
| --- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 2.1 | Top bar "Claim now" has an empty link on the live site. `site.topBar.cta.href` is `null` (PLAN Part C item 8). | Point it to `/solar-battery/wa-residential-battery-rebates/` or to the quote form |
| 2.2 | Footer address links to `#/`, which goes nowhere                                                               | Link to Google Maps directions                                                    |
| 2.3 | Footer "Designed by ." has no name                                                                             | Remove it or add the credit                                                       |

## 3. Needs a decision: hidden or duplicated content

| #   | Item                                                            | Detail                                                                                                                                                                                                                     | Suggestion                                                                                                         |
| --- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 3.1 | **Hub intro copy is hidden on the live site**                   | On `/residential-solar/`, `/commercial-solar/`, `/solar-battery/` and `/solar-packages/`, the intro section has class `d-none`, so visitors never see it. Imported anyway, with `bodyHiddenOnLive: true` in `products.js`. | Don't show it as-is (see 3.2). Write a short original intro for each hub.                                          |
| 3.2 | **Hub copy duplicates detail pages exactly**                    | Residential hub = 6.6kW page body. Commercial hub = 100kW page body. Packages hub = Solar Panel Installation Wangara body. Battery hub = second half of the WA Residential Battery Rebates body.                           | Showing duplicates hurts SEO. Use new intros instead.                                                              |
| 3.3 | **Homepage review section is hidden**                           | "Trusted by Australian Families and Businesses / 4.8 from 1,194 reviews" has class `d-none` on the live site. Kept in `home.js` and `site.reviewSummary` with `hiddenOnLive: true` and `verified: false`.                  | Keep it hidden until there's a verifiable source, such as a Google Business Profile link (Australian Consumer Law) |
| 3.4 | Orphan page `/residential-solar-system/`                        | In the sitemap, not linked anywhere, thin content                                                                                                                                                                          | Not imported. 301 redirect to `/residential-solar/` (Step 6).                                                      |
| 3.5 | Archive pages `/category/solar/` and `/category/uncategorized/` | WordPress archives (the second is empty)                                                                                                                                                                                   | Not imported. Redirect to `/blog/` (Step 6).                                                                       |

## 4. Needs confirmation: business facts

| #   | Item                            | Detail                                                                                                                                                                         |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4.1 | Company name                    | Terms clause 1 says "Exchange Power **PTV** LTD". This is almost certainly "PTY LTD". `site.legalName` keeps the live text.                                                    |
| 4.2 | ABN                             | 25693550202 (Terms clause 1). Check it against the ABN register before showing it in the footer.                                                                               |
| 4.3 | **Two different addresses**     | Footer: "5/17 Prindiville Dr, Wangara, WA 6065". Terms clause 19 (complaints): "Office address: 2/24 Niche Parade, Wangara WA 6065". Which is current?                         |
| 4.4 | Phone format                    | Shown as "0863704963". Terms clause 19 writes "863704963" twice (leading 0 missing). Suggest "08 6370 4963" everywhere.                                                        |
| 4.5 | **Stats don't agree**           | "1000+ Satisfied Customers" vs "Trusted by Over 5,000 Australians" vs "1,194 reviews". "15000kWh+ Solar Batteries Sold" mixes a unit of energy with a count of batteries.      |
| 4.6 | Rebate figures (time-sensitive) | Synergy up to $5,000, Horizon Power up to $7,500, no-interest loans up to $10,000 for combined income under $210,000. Check against current WA Government terms before launch. |
| 4.7 | Badges                          | NETCC Approved Seller badge in footer. Terms clause 18 mentions the Clean Energy Council (CEC) Approved Solar Retailer Code. Confirm both are current.                         |
| 4.8 | Warranty                        | Terms clause 11 gives a 5-year whole-system warranty. The homepage says "Worry-Free Warranty" with no term. Could state "5-year" on the homepage if correct.                   |

## 5. Suggested copy fixes (typos and grammar)

Kept verbatim for now. Approve as a group or one by one.

| #    | File                                                 | Live text                                                                                                                                                | Suggested                                                                  |
| ---- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 5.1  | `home.js` why, "Best Price Guarantee"                | "We provides very competitive prices"                                                                                                                    | "We provide very competitive prices"                                       |
| 5.2  | `home.js` why, "Worry-Free Warranty"                 | "trusted manufactures"                                                                                                                                   | "trusted manufacturers"                                                    |
| 5.3  | `navigation.js` footer                               | "Usefull Links"                                                                                                                                          | "Useful Links"                                                             |
| 5.4  | `about.js`                                           | **Vision and Mission texts are swapped.** "Our Vision" says "The mission make households…" and "Our Mission" says "Exchange Power's vision is a future…" | Swap the two texts, and fix "The mission make" to "The mission is to make" |
| 5.5  | `about.js`                                           | "maximize energy out"                                                                                                                                    | "maximise energy output"                                                   |
| 5.6  | `about.js`                                           | "Whether use a rooftop solar system"                                                                                                                     | "Whether it's a rooftop solar system"                                      |
| 5.7  | `products.js` 7.7kW FAQ                              | "a full and smooth transal to solar energy"                                                                                                              | "transition"                                                               |
| 5.8  | `pages/7-7kw-solar-system-wa.md`                     | "I believe that professional installation…" (first person in company copy)                                                                               | "Professional installation…"                                               |
| 5.9  | `pages/100kw-solar-system.md` and the commercial hub | "a professionally designed cylinder"                                                                                                                     | "a professionally designed system"                                         |
| 5.10 | same                                                 | "use face-space that would otherwise be wasted on roof space"                                                                                            | "use roof space that would otherwise be wasted"                            |
| 5.11 | same                                                 | "commercial solar power plant 100kW Wa is used"                                                                                                          | "WA"                                                                       |
| 5.12 | `pages/13-2kw-solar-system.md`                       | "An aged 13.2kW solar panel system"                                                                                                                      | "A 13.2kW solar panel system"                                              |
| 5.13 | same                                                 | "a commercially mounted 13.2kW solar system Perth" (residential page)                                                                                    | "a professionally installed"                                               |
| 5.14 | `legal/terms-and-conditions.md` 1                    | "will not become nil until" / "(d)However ,"                                                                                                             | "will not become binding until" / "(d) However," (legal review)            |
| 5.15 | Terms 12.1                                           | "T o the maximum Extent"                                                                                                                                 | "To the maximum extent"                                                    |
| 5.16 | Terms 15                                             | "ST C Incentives"                                                                                                                                        | "STC Incentives"                                                           |
| 5.17 | Terms 19                                             | "Step 3 – Seek and external review"                                                                                                                      | "Seek an external review"                                                  |
| 5.18 | Terms (many clauses)                                 | Missing spaces after clause numbers ("2.2You confirm") and stray capitals ("Paying", "Unless", "Consent")                                                | Tidy formatting only (legal review)                                        |
| 5.19 | Privacy Policy (whole page)                          | Machine-rewritten wording ("We gather data on aspects.", "Are dedicated, to safeguarding it") and no mention of the Privacy Act 1988 or the APPs         | Replace with a lawyer-reviewed policy (PLAN Part C item 11)                |

Across the product pages, the SEO copy is also keyword-stuffed and has many smaller grammar slips ("solar system WA" repeated). A full copy edit would be a separate task.

## 6. SEO metadata

| #   | Item                                                                                                                                                                                                                                           | Suggestion                                                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 6.1 | Hub `<title>`s are WordPress defaults: "Residential Solar Archive - Exchange Power" (and Commercial, Solar Battery, Solar Packages). Their meta descriptions repeat the same text. `products.js` stores these verbatim as `seo` and `summary`. | Write proper titles and descriptions for the 4 hubs. Hub `summary` should not be shown on cards as-is. |
| 6.2 | `/blog/` has no meta description                                                                                                                                                                                                               | Add one                                                                                                |
| 6.3 | Post titles end in " - Exchange Power"                                                                                                                                                                                                         | Fine. The new layout's title template (Step 4) should avoid adding the brand twice.                    |
| 6.4 | Several titles are over 60 characters (10kW: 85, 13.2kW: 86, Solar Rebates: 87)                                                                                                                                                                | Shorten if desired                                                                                     |

## 7. Images (not downloaded, PLAN Part C item 7)

- 42 images are recorded in `src/content/images.js` with source URL, planned path, alt text and size. `npm run images:fetch` downloads them once ownership is confirmed.
- **Shared images on the live site:** the 7.7kW card and banner use the 6.6kW photo. All three Solar Packages pages share one image (`Solar-Rebates-and-Incentives-WA.jpg`), and its alt text says "Solar Panel Installation Wangara" even on the other two cards.
- Banner images and the homepage "why" image have empty alt text. That's fine if they stay decorative.
- Not recorded, because they're design elements replaced by our icon set: the "Why Choose" SVG icons (`icon-price.svg` etc.), the footer contact icons and the WhatsApp icons.
- Brand logos had no alt text on the live site. The names were identified by eye: Trina Solar, Seraphim, Growatt, Solis, Neovolt, Jinko Solar, Fronius, Sofar.

## 8. Formatting changes made during import (wording unchanged)

- Terms: each clause was one paragraph with line breaks. Clause titles ("1. Agreement") are now `##` headings and each line is its own paragraph.
- Privacy: line-broken groups (the "We might utilize the data…" uses and the rights) are now bullet lists. The first line "Exchange Power's Privacy Policy" is a `##` heading.
- About: the "Why Choose Exchange Power?" sub-points are split into a title and text (`about.js` `why.items`).
