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

## 9. New homepage copy (Step 5): needs approval

The redesigned homepage (`src/content/home.js`) uses **new short copy**. Every fact in it comes from the live site, and the source is noted next to each line in the file. Please review the wording:

- **Hero:** "Solar and batteries, designed around how you use power." The lead combines the About page ("designs, installs and connects solar PV systems") with the "Rebates made easy" promise.
- **Process (6 steps):** built from the Terms and Conditions: quote valid 14 days (4.3), site-specific design with full refund if not accepted (2.6), grid-connection paperwork (2.5), installation to CEC guidelines at an agreed time (3.2, 4.3), system manual at handover (6.1), and the 5-year whole-system and workmanship warranty (11.3, 11.4).
- **System sizes:** figures are taken from each system's FAQs (for example 6.6kW: 24–28 kWh a day, 16–18 panels, 3–5 year payback; 30kW: 120–150 kWh a day). These are the business's own published claims and should be confirmed.
- **Credentials:** "50,000+ solar panels sold" and "1,000+ satisfied customers" are the live stats (see 4.5, still unverified). "Trusted by over 5,000 Australians" and "15000kWh+ batteries sold" are not used, because they contradict the other figures.
- **Not used:** the "up to 80%" bill-reduction claim (unverifiable), the "4.8 from 1,194 reviews" rating (hidden on the live site, no source), and all live photography. Most live images are AI-generated banners with baked-in text, and the two real photos are 703px stock images of European houses.
- **Customer reviews:** the section is built but renders only when real, attributable reviews are added to `home.reviews.items`.
- **Phone:** now shown as "08 6370 4963" (was "0863704963", see 4.4).
- **Live homepage copy:** kept verbatim in `src/content/archive/home-live.js` for reference.

## 10. Product pages (Step 6)

- **Key facts panels** show only figures from each product's own FAQs or body copy. The source is noted next to each figure in `products.js`.
  - Products with figures: 6.6kW, 10kW, 13.2kW, 30kW, 50kW and WA Residential Battery Rebates.
  - Products without figures, so the panel is hidden: 7.7kW, 100kW, the three Solar Packages pages and the four hubs.
- **Not used:** the 30kW FAQ says "130 to 180 metres of roof area". It almost certainly means square metres, but showing it as m² would change the source, so it's left out until confirmed.
- **Hub intros** still show the duplicated live copy (3.1–3.2). Set `hubIntroOverride` (Markdown) on a hub in `products.js` to replace it.
- **Images:** every image in `images.js` is `approved: false`, so no image slots render. To show one, download it (`npm run images:fetch`) and set `approved: true`.

## 11. Remaining pages (Step 8)

**Fixed:**

- **5.4 Vision and Mission:** the two texts now sit under the correct labels on the About page (`about.js`). The wording is unchanged, so "The mission make households…" is still uncorrected (see 5.4).
- **Quote buttons:** every "Get a free quote" button now goes to `/contact/` (`site.cta.quoteHref`). The homepage `#get-a-quote` section is unchanged.

**New copy that needs approval:**

- Contact page: title "Talk to Exchange Power" and lead "Tell us about your property and how you use power. We'll recommend a system size, explain the rebates you may be eligible for and put it in a written quote."
- Contact page SEO: title "Contact Exchange Power | Free Solar & Battery Quote in WA" and its meta description.
- Quote form (`site.forms.quote`):
  - labels, hints and error messages
  - the enquiry types (Residential solar, Commercial solar, Battery, Rebates, Other)
  - the temporary notice: "Online sending is being switched on soon, so this form doesn't send yet. Please call or email us in the meantime." Remove it in Step 7.
- About page: the section heading "Solar and battery systems, from first consultation to activation." Its wording comes from the About intro.
- Blog index: the lead "Guides to solar system sizes, batteries and rebates in Western Australia."
- Small UI labels: "Read the guide", "More guides", "Contents", "Get directions", and reading times (worked out at about 200 words a minute).

**Still shown, from the live site:**

- About subtitle: "Trusted by Thousands. Recognised by Industry Leaders." This is the live page's verbatim H4 and can't be verified. Remove it, or support it with a source.
- About stats: the same two figures as the homepage (50,000+ panels sold, 1,000+ satisfied customers). See 4.5.

**Missing:**

- **Opening hours** aren't on the live site, so the contact page doesn't show any. Please supply them.
- **Contact link:** the header and footer menus have no "Contact" item. The quote buttons reach the contact page. Consider adding "Contact" to the footer's useful links.
- **Last updated dates:** neither legal page has one at the source, so none is shown.

## 12. Enquiry form and email (Step 7)

**New copy that needs approval:**

- **Success:** "Thanks, your enquiry has been sent. We'll be in touch soon." This deliberately avoids promising a response time. Add one if the business commits to one.
- **Error, can't send:** "Sorry, we couldn't send your enquiry just now. Please call us on 08 6370 4963 or email info@exchangepower.com.au."
- **Rate limited:** "You've sent several enquiries in a short time. Please try again in a few minutes, or call us on 08 6370 4963."
- **Spam checks:**
  - "To help us block spam, please press Send enquiry again." (without JavaScript, or after a long time on the page)
  - "That was quick! Please wait a moment, then press Send enquiry again."
- **Field errors:** "Please check the highlighted fields." and "Please fix N fields."
- **Phone error** (now Australian numbers only): "Enter an Australian phone number, for example 08 6370 4963 or 0412 345 678."
- **Consent line:** "By sending this form you agree to our Privacy Policy. We only use your details to reply to your enquiry." This should match the Privacy Policy, which is due for legal review (item 5.19).
- **Pending button label:** "Sending…"
- **Homepage form heading:** "Request a free quote" (`site.forms.quote.title`).
- **Footer:** a new "Contact" link (not on the live site).

**Enquiry email format:**

- **Subject:** `New enquiry: <Enquiry type>: <First name> <Last name>`, for example "New enquiry: Battery: Jane Smith".
- **Body:** name, email, phone (normalised, for example "+61 8 6370 4963"), enquiry type, address or suburb, message, the page it was sent from and the time received (Perth time).
- **Reply-To:** the customer's address.

## 13. SEO details (Step 9)

- **6.2 resolved without new copy:** `/blog/` now uses its existing on-page lead ("Guides to solar system sizes, batteries and rebates in Western Australia.", Step 8 copy, pending approval) as its meta description.
- **Hub titles and descriptions:** still the WordPress defaults (6.1), but each one is unique, so the SEO check passes. Replacing them is still recommended.
- **Social sharing images:** each page's card shows its title in the brand colours with the typeset "Exchange Power" wordmark. No logo is used until it's approved.
- **Structured data:** opening hours, map coordinates, the ABN and social profiles are left out until the business confirms them.

## 14. Background photos (stock, added after Step 10)

Every dark page header, the homepage hero, the homepage quote section, the "Get a free quote" band and the 404 page now have a background photo. All are **free stock photos from Unsplash**, used under the [Unsplash License](https://unsplash.com/license), which allows commercial use without attribution. They were downloaded through Unsplash's own download links, which only work for free photos (no Unsplash+ images). Credits are recorded anyway.

- **Where they're set:** `src/content/backgrounds.js` maps each page to a key, and `src/content/images.js` (the `bg-…` entries) holds each file, its size and the credit. To change a page's photo, point it at another key.
- **Readability:**
  - A brand-coloured overlay (`BackgroundImage.js`) sits over every photo: at least 60% across the image, darker behind the text column, and at least 68% at the far right.
  - Text contrast was measured against the rendered pixels behind every line of text, across all 30 pages and 6 widths: 2,375 samples, all WCAG AA or better.
- **Cards reuse them.** Product, post, solution and system-size cards, and the homepage guide thumbnails, show the photo of the page they link to (`getCardPhoto()` in `src/lib/content.js`). Once a product or post has its own approved image (`images.js` `approved: true`), the card uses that instead.
- **Decorative only:** the photos have empty alt text and are hidden from screen readers.
- **They're not the business's own work.** Several show non-Australian homes and buildings. Nothing on the page claims they're Exchange Power installations, but replacing them with real project photos is recommended once they're available (PLAN Part C item 7).
- The old-site images in `images.js` are unchanged: still `approved: false`, not downloaded.

| Key                           | Used on                                                                       | Photo                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `bg-home-hero`                | `home.hero`                                                                   | [Benjamin Peck](https://unsplash.com/photos/1lsoCjbLm3I)                     |
| `bg-quote-cta`                | `home.quote`                                                                  | [VD Photography](https://unsplash.com/photos/9KCRGQySNiw)                    |
| `bg-cta-band`                 | `ctaBand`                                                                     | [American Public Power Association](https://unsplash.com/photos/XGAZzyLzn18) |
| `bg-residential`              | `products/residential-solar`                                                  | [Wiseman Mabasa](https://unsplash.com/photos/f93lJ_3wOmM)                    |
| `bg-6-6kw`                    | `products/6-6kw-solar-system-wa`                                              | [Vivint Solar](https://unsplash.com/photos/9CalgkSRZb8)                      |
| `bg-7-7kw`                    | `products/7-7kw-solar-system-wa`                                              | [Watt A Lot](https://unsplash.com/photos/gqpuuF3a2tY)                        |
| `bg-10kw`                     | `products/10kw-solar-system-wa`                                               | [Watt A Lot](https://unsplash.com/photos/Ja8t8nJN2I4)                        |
| `bg-13-2kw`                   | `products/13-2kw-solar-system`                                                | [Rafael Moreno](https://unsplash.com/photos/73JOOymZQTQ)                     |
| `bg-commercial`               | `products/commercial-solar`                                                   | [Bernd Dittrich](https://unsplash.com/photos/g-SFUAYL0MY)                    |
| `bg-30kw`                     | `products/30kw-solar-system`                                                  | [Jolame Chirwa](https://unsplash.com/photos/Oer1kxEHzc4)                     |
| `bg-50kw`                     | `products/50kw-solar-system`                                                  | [Remco Guijs](https://unsplash.com/photos/IbgOtXHG8XQ)                       |
| `bg-100kw`                    | `products/100kw-solar-system`                                                 | [Ben Issac](https://unsplash.com/photos/NEIfsHMjHSQ)                         |
| `bg-battery`                  | `products/solar-battery`                                                      | [Kartik Gada](https://unsplash.com/photos/eXEQyNNAvs8)                       |
| `bg-battery-rebates`          | `products/wa-residential-battery-rebates`                                     | [Iain](https://unsplash.com/photos/ZdmoT5orMzM)                              |
| `bg-packages`                 | `products/solar-packages`                                                     | [Priamo Mendez](https://unsplash.com/photos/E4XEBPEkgUs)                     |
| `bg-installation-wa`          | `products/solar-panel-installation-in-wa`                                     | [Vlad Burac](https://unsplash.com/photos/e5kpS6Xpg04)                        |
| `bg-installation-wangara`     | `products/solar-panel-installation-wangara`                                   | [Vlad Burac](https://unsplash.com/photos/rIVlxt5ROrM)                        |
| `bg-rebates-incentives`       | `products/solar-rebates-and-incentives-in-wa`                                 | [Darmau](https://unsplash.com/photos/hYfOeNvDXWg)                            |
| `bg-about`                    | `about`                                                                       | [Amanda Kevin](https://unsplash.com/photos/OO2L92v213c)                      |
| `bg-contact`                  | `contact`                                                                     | [Pawel Czerwinski](https://unsplash.com/photos/Ih3-ww0fBHM)                  |
| `bg-blog`                     | `blog`                                                                        | [Michael Pointner](https://unsplash.com/photos/ZGzMr04QdmU)                  |
| `bg-post-6-6-vs-7-7`          | `posts/6-6kw-solar-system-vs-7-7kw-solar-system-which-is-better`              | [CHUTTERSNAP](https://unsplash.com/photos/XEXg5U0pxak)                       |
| `bg-post-rebate-guide`        | `posts/complete-guide-to-solar-power-rebate-western-australia-in-2026`        | [Darmau](https://unsplash.com/photos/Y5j57HvzuZg)                            |
| `bg-post-7-7-air-con`         | `posts/is-a-7-7kw-solar-system-suitable-for-homes-with-air-conditioning`      | [Lara John](https://unsplash.com/photos/VNIjztzKF_U)                         |
| `bg-post-first-time-buyers`   | `posts/solar-panel-rebate-western-australia-for-first-time-solar-buyers`      | [CHUTTERSNAP](https://unsplash.com/photos/qziEfi5lyXM)                       |
| `bg-post-battery-rebate-2026` | `posts/wa-government-solar-battery-rebate-2026-complete-guide-for-homeowners` | [Iain](https://unsplash.com/photos/oNHHUl18teM)                              |
| `bg-post-battery-scheme`      | `posts/wa-residential-battery-scheme-for-solar-homes-in-western-australia`    | [Vivint Solar](https://unsplash.com/photos/_ciUqT1HEuY)                      |
| `bg-post-7-7-families`        | `posts/why-a-7-7kw-solar-system-is-ideal-for-growing-families`                | [Angie Warren](https://unsplash.com/photos/ZO7UsokVH98)                      |
| `bg-post-6-6-popular`         | `posts/why-the-6-6kw-solar-system-is-australias-most-popular-choice`          | [Nuno Marques](https://unsplash.com/photos/0GbrjL3vZF4)                      |
| `bg-legal`                    | `legal` (Terms and Privacy)                                                   | [CHUTTERSNAP](https://unsplash.com/photos/Q3r3Ws-o54s)                       |
| `bg-not-found`                | `notFound`                                                                    | [Cristina Glebova](https://unsplash.com/photos/-RwCPtgy6lA)                  |

## 15. Live claims and images restored (2026-10-12, owner's request)

**Claims now shown on the homepage, all still unverified (see 3.3, 4.5 and 9):**

- "Trusted by Over 5,000 Australians — The Exchange Power Promise", with the live Residential and Commercial paragraphs (`home.promise`).
- "4.8 from 1,194 reviews" and "Trusted by Australian Families and Businesses", in the hero and the Promise section. This was hidden on the live site and has no source.
- "15,000kWh+ solar batteries sold", in the stats card. It replaces the NETCC tile; the NETCC badge stays in the footer.
- "Premium Solar Packages — Smart Solar Solutions That Reduce Your Power Bills by Up to 80%" (`home.solutions`).
- "Cheaper Home Batteries Program", as the battery section's eyebrow.

**Old-site images:** every place the live site shows one is now wired up. Each image appears automatically once it's downloaded and `approved: true` in `images.js`:

| Image                                 | Where it appears                                                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Logo                                  | Header (the footer keeps the typeset wordmark, because the logo's blue text needs a light background) |
| `home-hero` banner                    | Battery section                                                                                       |
| `home-residential`, `home-commercial` | Promise cards                                                                                         |
| `home-why` collage                    | Why section                                                                                           |
| Brand logos                           | Marquee tiles                                                                                         |
| NETCC badge                           | Footer                                                                                                |
| Product images                        | Hub cards, related-product cards and the top of each product page                                     |
| Post images                           | Blog cards, the featured card (image beside the text), guide thumbnails and post pages                |

Cards show these images whole, with no tint or overlaid labels, because the images have text baked in. The homepage system-size cards keep their stock photos, because the kW figure is set over them.

**Not done yet:** the images haven't been downloaded. This session's permission rules blocked `npm run images:fetch`. Until they're downloaded, the stock photos and the typeset wordmark show.

## 16. Content handover applied (2026-10-22)

The client's handover document (_Exchange Power — Website Content & Developer Handover_, 18 October 2026) was applied where it needed no further client input. The old imported copy is in git history; `npm run content:verify` now reports differences from the live site by design.

**Done:**

- Battery rebate figures corrected to the handover facts sheet (WA rebate up to $1,300 Synergy / $3,800 Horizon Power, plus the federal discount), dated "checked October 2026": homepage hero and battery section, rebate page, battery hub, rebates page.
- New SEO titles, meta descriptions and H1s (`heading`) for every page in the handover table, including the four "… Archive" hubs and the blog index.
- New body copy for all 15 product and hub pages (commercial hub no longer 100kW-only; battery hub and rebate page rewritten; keyword stuffing removed).
- System-size pages follow the handover template: key specs table, "Is this size right for you?", inclusions, pricing and rebates, process, four warranty cards, compare links, related guides (by tag), 7-layer FAQs, CTA. Service structured data on every product page.
- 7-layer FAQ sets on every product page, the hubs and the homepage, grouped by layer, with FAQPage structured data.
- 20 new blog posts (handover blogs 01–20), with FAQs, a per-post CTA, categories and size tags. Posts over 1,000 words get a table of contents.
- The 8 existing posts moved to the new categories and tagged; dated update notices on the 4 rebate posts; keyword links to the homepage repointed to the relevant page.
- New `/get-a-quote/` page; every "Get a free quote" button links to it. Top-bar "Claim now" now links to the rebate page (2.1).
- Homepage sections reordered to the handover order; "How it works" cut to four steps.

**Left out until the client confirms** (the handover marks these as placeholders): prices, brands and models, lead times, service suburbs, SAA accreditation and EC licence numbers, review platform, reviewer names and author box, Plenti-accredited vendor wording, local case studies. FAQs whose answers were only placeholders were dropped. "SAA-accredited" and "reviewed by licensed professionals" were removed from two meta descriptions for the same reason.

**Not changed (client decision, see 15):** the homepage stats (50,000+, 1,000+, 15,000kWh+), "Over 5,000 Australians", the 4.8 rating, "up to 80%", "Best price guarantee" and the homepage "3–5 year expected payback" line.

**Small correction to the handover:** Blog 05 says waiting three months on a $110/month saving "costs more than" the 6.6kW STC drop ($340); $330 is about the same, so the post says "about as much as".

## 17. Owner decisions and fill-in slots (2026-10-22)

**Owner decisions:**

- **Kept:** the trust numbers (50,000+ panels, 1,000+ customers, 15,000kWh+, "Over 5,000 Australians", 4.8 from 1,194 reviews).
- **Removed:** "up to 80%" (homepage packages lead), "3–5 year expected payback" (homepage 6.6kW card) and "Best price guarantee" (homepage "Why" point, replaced by "Clear, written quotes" from Terms 4.3).
- **Images:** keep the current photos (stock backgrounds plus the old site's images once approved).
- **Prices:** neither the handover nor the old site has any, so none are shown.

**Added from confirmed sources:** the ABN in the footer and LocalBusiness structured data (Terms clause 1). The brand list from the live "Brands We Install" strip now appears on the system-size pages and the About page. About page title, description and FAQs come from the handover, answered from confirmed details only. Blog posts now have an author box ("Written by the Exchange Power team", last updated date).

**Fill-in slots** (shown nowhere until set, then appear automatically):

| Detail | Where to set it | Where it appears |
| --- | --- | --- |
| SAA accreditation number | `site.licences.saa` | Footer, About FAQ |
| Electrical contractor licence | `site.licences.electrical` | Footer, About FAQ |
| Opening hours | `site.openingHours` (`display` and schema.org `schema`) | Footer, About FAQ, LocalBusiness `openingHours` |
| Google Business Profile, Facebook | `site.socials` (URLs) | Footer links, LocalBusiness `sameAs` |
| Customer reviews | `home.reviews.items` | Homepage reviews section |
| Blog reviewer | post frontmatter `reviewedBy: {"name":"…","role":"…"}` | Author box on the post |

**Still needs the business:** package prices, service suburbs, lead times, whether site assessments are free, commercial maintenance plans, founding year and owners, in-house or subcontracted installers, Plenti vendor accreditation, review platform, reviewer names, local case studies.
