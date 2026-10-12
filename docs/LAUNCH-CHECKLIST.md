# Launch checklist

Everything needed to take the new site live on Vercel at `exchangepower.com.au`, in order. Nothing here has been done yet: no GitHub repo, no Vercel project, no DNS changes.

- **Part 1** is the content sign-off. Items marked **Blocks launch** must be settled before step 10 (switching the domain).
- **Part 2** is the technical launch, steps 1–12.

---

## Part 1 — Pre-launch content sign-off

The site was built with the live site's copy, kept word for word, plus some new copy for the redesign. The items below need a decision from the business. Details are in [`CONTENT-NOTES.md`](CONTENT-NOTES.md) and [`PLAN.md` Part C](../PLAN.md#part-c--decisions-needed-from-the-user).

| #   | Item                            | What's needed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Where                                                                                                                                                                                                                      | Launch?            | Signed off |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------- |
| 1   | **New copy awaiting approval**  | Approve or edit the new wording:<br>• homepage hero, process steps and section headings<br>• contact page title and lead<br>• About heading and blog lead<br>• the form's labels, error and success messages                                                                                                                                                                                                                                                                                 | [CONTENT-NOTES §9](CONTENT-NOTES.md#9-new-homepage-copy-step-5-needs-approval), [§11](CONTENT-NOTES.md#11-remaining-pages-step-8), [§12](CONTENT-NOTES.md#12-enquiry-form-and-email-step-7); Part C item 5                 | **Blocks launch**  | ☐          |
| 2   | **Unverified stats and claims** | **Now shown on the homepage at the owner's request (2026-10-12):** "Trusted by Over 5,000 Australians", "4.8 from 1,194 reviews", "15,000kWh+ solar batteries sold" and "Reduce Your Power Bills by Up to 80%", plus "50,000+ panels" and "1,000+ customers". They are still unverified. Under Australian Consumer Law each one must be accurate and provable (for example, a review source for the rating) before launch. Also confirm the per-system figures and the NETCC and CEC badges. | [CONTENT-NOTES §4](CONTENT-NOTES.md#4-needs-confirmation-business-facts) (4.5, 4.7, 4.8), [§9](CONTENT-NOTES.md#9-new-homepage-copy-step-5-needs-approval), [§10](CONTENT-NOTES.md#10-product-pages-step-6); Part C item 6 | **Blocks launch**  | ☐          |
| 3   | **Rebate figures**              | Check against current WA Government terms:<br>• Synergy up to $5,000<br>• Horizon Power up to $7,500<br>• no-interest loans up to $10,000<br>• the $210,000 income cap<br>These figures are time-sensitive.                                                                                                                                                                                                                                                                                  | [CONTENT-NOTES 4.6](CONTENT-NOTES.md#4-needs-confirmation-business-facts); Part C item 6                                                                                                                                   | **Blocks launch**  | ☐          |
| 4   | **Privacy Policy legal review** | The current policy is the live site's text. It doesn't mention the Privacy Act 1988 or the APPs, or that enquiries are now emailed through Resend (a US service). Terms clause 1 also says "PTV LTD". Get a lawyer's review, or the owner can accept launching with the current text.                                                                                                                                                                                                        | [CONTENT-NOTES 5.19, 4.1](CONTENT-NOTES.md#5-suggested-copy-fixes-typos-and-grammar); Part C item 11                                                                                                                       | **Blocks launch**¹ | ☐          |
| 5   | "Claim now" target              | Choose where the top-bar promo goes, or drop it. The new site doesn't show the top bar until this is decided.                                                                                                                                                                                                                                                                                                                                                                                | [CONTENT-NOTES 2.1](CONTENT-NOTES.md#2-needs-a-decision-links-and-placeholders); Part C item 8                                                                                                                             | Can follow launch  | ☐          |
| 6   | Opening hours                   | Supply them. None are shown today (the live site has none either).                                                                                                                                                                                                                                                                                                                                                                                                                           | [CONTENT-NOTES §11](CONTENT-NOTES.md#11-remaining-pages-step-8) "Missing"; Part C item 9                                                                                                                                   | Can follow launch  | ☐          |
| 7   | Logo and real images            | Supply the logo SVG and confirm which photos the business owns. The site currently uses a typeset "Exchange Power" wordmark, and Unsplash stock photos as header backgrounds (free for commercial use). Replace them with real project photos when available.                                                                                                                                                                                                                                | [CONTENT-NOTES §7](CONTENT-NOTES.md#7-images-not-downloaded-plan-part-c-item-7), [§14](CONTENT-NOTES.md#14-background-photos-stock-added-after-step-10); Part C item 7                                                     | Can follow launch  | ☐          |
| 8   | Placeholder icons               | The favicon, Apple touch icon and app icons are a placeholder "EP" monogram. Replace them once the logo is approved (`scripts/generate-icons.mjs`).                                                                                                                                                                                                                                                                                                                                          | PLAN Step 9; Part C item 7                                                                                                                                                                                                 | Can follow launch  | ☐          |
| 9   | Hub intros and SEO titles       | The 4 category hubs show copy that duplicates their detail pages, and their titles are WordPress defaults ("Residential Solar Archive - Exchange Power"). Write short original intros, titles and descriptions. Recommended within 2 weeks of launch.                                                                                                                                                                                                                                        | [CONTENT-NOTES §3](CONTENT-NOTES.md#3-needs-a-decision-hidden-or-duplicated-content) (3.1–3.2), [§6](CONTENT-NOTES.md#6-seo-metadata) (6.1); Part C item 5                                                                 | Can follow launch  | ☐          |
| 10  | Analytics                       | Choose: none (current), Vercel Analytics (no cookies), Plausible or GA4. GA4 needs a cookie notice and a Privacy Policy update.                                                                                                                                                                                                                                                                                                                                                              | Part C item 10                                                                                                                                                                                                             | Can follow launch  | ☐          |

¹ The policy is the same text the live site shows today, so the owner may choose to launch with it and review it afterwards. Record that decision here.

Typo and grammar fixes ([CONTENT-NOTES §5](CONTENT-NOTES.md#5-suggested-copy-fixes-typos-and-grammar)) can follow launch. They are the same as on the live site today.

---

## Part 2 — Technical launch

You'll need:

- a GitHub account
- a Vercel account. Vercel's free Hobby plan is for non-commercial use, so a business site should be on **Pro**.
- a Resend account
- access to the domain's DNS settings
- access to the WordPress hosting account (for rollback)

### 1. Push the code to GitHub

1. Create a **private** repository on GitHub, for example `exchangepower-site`. Don't add a README or .gitignore (the project already has them).
2. In the project folder:

   ```bash
   git remote add origin git@github.com:<your-account>/exchangepower-site.git
   git push -u origin main
   ```

3. On GitHub, check that **no `.env` or `.env.local` file** is in the repo. Only `.env.example` should be there, with empty values.

### 2. Import the project into Vercel

1. In Vercel: **Add New → Project → Import** the GitHub repository.
2. **Framework preset:** Next.js (detected automatically). Leave the defaults:
   - **Build command:** `npm run build`. npm runs the `prebuild` script first, which generates the social sharing images into `public/og/`.
   - **Install command:** leave the default. Vercel installs from `package-lock.json`.
   - **Output directory:** leave it as the Next.js default.
   - **Node.js version:** comes from `"engines"` in `package.json` (`20.x || 22.x`), so Vercel picks 22.x, the newest version in that range. Node 20 reached end of life in April 2026. If Vercel reports a problem with the range, set it to `"22.x"`. The build is tested on Node 20 and 22.
3. **Root directory:** the repository root.
4. **Don't deploy yet.** Add the environment variables in step 3 first. If it deploys anyway, that's fine: redeploy after step 3.

No `vercel.json` is needed. Redirects, trailing slashes and headers are all in `next.config.mjs`, and everything else is a dashboard setting.

### 3. Set the environment variables

In Vercel: **Project → Settings → Environment Variables**. All four are **server-only**. Never add a `NEXT_PUBLIC_` prefix. Mark the key and secret as **Sensitive**.

| Name                 | Production                                                                     | Preview                                                 | Development                           |
| -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------- |
| `RESEND_API_KEY`     | ✅ The Resend key (Sending access)                                             | ✅ The same key, so form tests work on previews         | ✗ (use `.env.local` on your computer) |
| `CONTACT_TO_EMAIL`   | ✅ The inbox that receives enquiries                                           | ✅ Your own inbox, so tests don't reach the sales inbox | ✗                                     |
| `CONTACT_FROM_EMAIL` | ✅ `Exchange Power <onboarding@resend.dev>` until step 6, then the real sender | ✅ The same as Production                               | ✗                                     |
| `FORM_TOKEN_SECRET`  | ✅ A new value from `openssl rand -base64 32`                                  | ✅ A **different** value from `openssl rand -base64 32` | ✗                                     |

- While `CONTACT_FROM_EMAIL` uses `onboarding@resend.dev`, Resend only delivers to the **email address that owns the Resend account**, so `CONTACT_TO_EMAIL` must be that address.
- Changing a variable doesn't affect existing deployments. After any change: **Deployments → ⋯ → Redeploy**.
- `VERCEL_ENV` is set by Vercel automatically. The site uses it to tell production from previews (see "How previews stay out of Google" at the end).

### 4. Add the domain to Vercel

1. **Project → Settings → Domains → Add** `exchangepower.com.au`. When Vercel asks, also add `www.exchangepower.com.au`.
2. Make the **apex** (`exchangepower.com.au`) the primary domain. Set `www.exchangepower.com.au` to **Redirect to `exchangepower.com.au`** (permanent, 308).
3. Vercel now shows the DNS records it needs. **Don't change DNS yet**: that's step 10, the cut-over. Note the values.

`SITE.url` in `src/content/site.js` is already `https://exchangepower.com.au` (apex, https, no trailing slash). The canonical URLs, sitemap, robots.txt and social cards all use it.

### 5. Prepare the DNS records (don't switch yet)

Keep your current DNS provider. **Don't move the nameservers to Vercel**: that risks losing the existing email (MX) records for `info@exchangepower.com.au`. You'll only change the web records.

1. Log in to the DNS provider. **Screenshot or copy every existing record**: this is your rollback (step 12).
2. A day before the cut-over, lower the **TTL** of the current apex `A` record and the `www` record to **300 seconds** (5 minutes), so the switch and any rollback take effect quickly.
3. The records Vercel will need (use the exact values Vercel shows in step 4; these are the usual ones):

   | Type    | Name (host) | Value                                                  |
   | ------- | ----------- | ------------------------------------------------------ |
   | `A`     | `@`         | The IP Vercel shows (often `76.76.21.21`)              |
   | `CNAME` | `www`       | The target Vercel shows (often `cname.vercel-dns.com`) |

4. **Leave untouched:** `MX` records, existing SPF or DKIM records for your mailbox provider, and any other TXT or CNAME records.

### 6. Verify the sending domain in Resend

The enquiry emails are sent from your own domain, so they don't land in spam.

1. In Resend: **Domains → Add domain**. Enter `exchangepower.com.au`, or a subdomain such as `mail.exchangepower.com.au`. A subdomain keeps Resend's records separate from your mailbox records. If Resend asks for a region, choose the one closest to Australia.
2. Resend shows the records to add. Add them **exactly as shown**. Typically:

   | Purpose                       | Type  | Name (host)                    | Value                                                                       |
   | ----------------------------- | ----- | ------------------------------ | --------------------------------------------------------------------------- |
   | DKIM (signature)              | `TXT` | `resend._domainkey` (as shown) | The long `p=…` key Resend shows                                             |
   | SPF (bounce domain)           | `MX`  | `send` (as shown)              | `feedback-smtp.<region>.amazonses.com`, priority 10                         |
   | SPF (bounce domain)           | `TXT` | `send` (as shown)              | `v=spf1 include:amazonses.com ~all`                                         |
   | DMARC (optional, recommended) | `TXT` | `_dmarc`                       | `v=DMARC1; p=none;` (add `rua=mailto:<a reports inbox>` to receive reports) |
   - Resend's SPF records go on the `send` subdomain, so they **don't replace** your main domain's SPF record. Don't create a second SPF record on the root domain.
   - If a `_dmarc` record already exists, keep it and don't add another.

3. Click **Verify**. It can take from a few minutes to a few hours.
4. In Resend: **API Keys → Create API key**. Choose **Sending access**, restricted to this domain. Paste it into Vercel as `RESEND_API_KEY` (step 3). It's shown only once. Don't save it in any file in the repo.

### 7. Switch to the real sender

Once Resend shows the domain as **Verified**:

1. In Vercel, change `CONTACT_FROM_EMAIL` (Production and Preview) to the real sender on the verified domain, for example `Exchange Power <enquiries@exchangepower.com.au>`. The address doesn't need a real mailbox, because replies go to the customer (Reply-To).
2. Change `CONTACT_TO_EMAIL` for **Production** to the business inbox (or several, separated by commas).
3. Redeploy.

### 8. Test the form live: preview first, then production

**On a preview deployment** (any branch or pull request, or **Deployments → the latest preview**):

1. Open `<preview-url>/contact/` and send a test enquiry with your own name and email.
2. Check:
   - the success message appears
   - the email arrives in the Preview `CONTACT_TO_EMAIL` inbox and isn't in spam
   - the subject reads `New enquiry: <type>: <name>`
   - **Reply** goes to the address you typed in the form
3. Also send one from the homepage form (`<preview-url>/#get-a-quote`).
4. In Resend → **Emails**, check that both show as **Delivered**.

**On production** (after step 10, or on the `*.vercel.app` production URL before it):

5. Repeat steps 1–4 on the production URL. Check the email arrives in the business inbox.
6. Tell the team that test enquiries named "TEST" are expected.

### 9. Check the preview site end to end

Before the cut-over, on the production deployment's `*.vercel.app` URL:

1. Run the manual device checks in [`QA.md`](QA.md#manual-device-checks-for-the-owner) and tick them off.
2. Spot-check a few old URLs: `/category/solar/` should redirect to `/blog/`, and `/residential-solar-system/` should redirect to `/residential-solar/`.
3. Confirm **every Part 1 item marked "Blocks launch" is signed off.**

### 10. Cut over (switch the domain)

Pick a quiet time, for example early on a weekday morning, so problems can be fixed during business hours.

1. Take a full backup of the WordPress site from the hosting control panel or a backup plugin. **Don't cancel or delete the WordPress hosting.**
2. At the DNS provider, change only the two web records to the Vercel values from step 5:
   - the apex `A` record (`@`)
   - the `www` record
3. In Vercel → **Domains**, wait for both domains to show **Valid Configuration**. Vercel issues the HTTPS certificates automatically, usually within minutes.
4. Check:
   - `https://exchangepower.com.au/` shows the new site
   - `https://www.exchangepower.com.au/` redirects to the apex
   - `http://` redirects to `https://`
   - `https://exchangepower.com.au/robots.txt` shows `Allow: /` and the sitemap line
   - `https://exchangepower.com.au/sitemap.xml` lists 29 URLs
5. Send one more live form test (step 8, points 5–6).
6. Check that business email still arrives at `info@exchangepower.com.au`, which confirms the MX records were untouched.

### 11. After launch

1. **Google Search Console:**
   - Add or verify the `exchangepower.com.au` property (Domain property, verified with a DNS TXT record).
   - Go to **Sitemaps → Add** `https://exchangepower.com.au/sitemap.xml`. Remove any old WordPress sitemap entries (`sitemap_index.xml`).
   - Use **URL Inspection** on the homepage and one product page, and request indexing.
   - Over the next 2–4 weeks, watch the **Pages** report for 404s and fix any with a redirect in `next.config.mjs`.
2. **PageSpeed Insights** (pagespeed.web.dev): run it on these 4 URLs, for mobile and desktop:
   - `/`
   - `/residential-solar/6-6kw-solar-system-wa/`
   - `/why-the-6-6kw-solar-system-is-australias-most-popular-choice/`
   - `/contact/`

   Record the results in `docs/QA.md`. Local lab LCP was about 2.1–2.6s (simulated). See the known limitation in `PLAN.md` Step 9. Field data appears after about 28 days of traffic.

3. **Optional: Vercel Speed Insights** (real-visitor Core Web Vitals, PLAN Part C item 10):
   1. Enable it in **Project → Speed Insights**.
   2. Run `npm install @vercel/speed-insights`.
   3. Add `<SpeedInsights />` from `@vercel/speed-insights/next` to `src/app/layout.js`.
   4. Mention it in the Privacy Policy.
   5. Only revisit the JS split if the 75th percentile LCP is over 2.5s.
4. Keep the WordPress hosting for at least **30 days** before cancelling it.

### 12. Rollback plan

If something serious goes wrong after the cut-over (the site is down, or the forms aren't arriving and can't be fixed quickly):

1. **Fast rollback within Vercel** (for example, a bad change after launch): **Deployments → choose the last good production deployment → ⋯ → Instant Rollback**. It takes seconds and needs no DNS change.
2. **Full rollback to WordPress:** at the DNS provider, set the apex `A` record and the `www` record back to the values you saved in step 5.1. With a TTL of 300, most visitors see WordPress again within minutes. Leave the domain in Vercel so you can switch back later.
3. **Viewing WordPress after the cut-over** (for example, to copy content): the WordPress site stays on its host, unchanged. To view it without changing DNS:
   - add a line to your computer's `hosts` file: `<old server IP> exchangepower.com.au`
   - remove the line afterwards

   Or use the host's temporary or preview URL if it has one.

4. After a rollback, re-submit the WordPress sitemap in Search Console only if the rollback will last more than a few days.

---

## How previews stay out of Google

Preview deployments (every branch and pull request, at `*.vercel.app` URLs) must never be indexed. Three independent layers prevent it:

1. **Vercel's header:** Vercel adds `X-Robots-Tag: noindex` to preview deployment URLs.
2. **robots.txt:** `src/app/robots.js` serves `Disallow: /` (and no sitemap) unless `VERCEL_ENV` is `production`.
3. **Meta tag:** `src/app/layout.js` adds `<meta name="robots" content="noindex, nofollow">` to every page under the same condition.

These checks run at **build time**, because pages are prerendered. Each Vercel deployment is built with its own `VERCEL_ENV`:

- A preview build is noindex.
- A production build is indexable.
- Promoting a preview to production rebuilds it with production settings.

Local builds (`npm run build`, where `VERCEL_ENV` is unset) are treated as production, so the SEO checks can run.

**Canonical URLs** always point at `https://exchangepower.com.au` (from `SITE.url`), even on previews. Any preview page that is found points search engines at the real page. Social cards on previews also point at the production domain, so they only load after launch.
