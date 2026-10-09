# Exchange Power website

The Exchange Power website (Solar and battery systems, Wangara WA), rebuilt with Next.js 16, React 19 and Tailwind CSS 4. Pages are static, and the only server code is one Server Action that emails quote requests through [Resend](https://resend.com).

See `PLAN.md` for the build plan, `docs/CONVENTIONS.md` for code conventions and `docs/CONTENT-NOTES.md` for content awaiting approval. A full handoff guide follows in Step 10.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: the form works without a key in development
npm run dev
```

Checks: `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run check:content`, `npm run build`, then `npm run check:links`.

## Email setup

The quote forms (`/contact/` and the homepage) call the `sendEnquiry` Server Action (`src/app/actions/send-enquiry.js`). It validates the enquiry, checks the anti-spam measures and sends it with Resend (`src/lib/email/resend.js`). Each email has the customer's address as Reply-To, so replying answers them directly.

### 1. Create the Resend account

1. Sign up at [resend.com](https://resend.com) with the business's email address.
2. Go to **API Keys → Create API key**. Choose **Sending access**, optionally restricted to the domain below. Copy the key (it starts with `re_`); it is shown only once.

### 2. Verify the domain

1. In Resend, go to **Domains → Add domain** and enter `exchangepower.com.au`. A subdomain such as `mail.exchangepower.com.au` also works, and keeps the main domain's records untouched.
2. Resend shows DNS records: an **MX** and **TXT (SPF)** record for the sending subdomain, and a **TXT (DKIM)** record. Add them exactly as shown at the domain's DNS provider. Adding a **DMARC** TXT record (`_dmarc`) is recommended.
3. Click **Verify**. DNS changes can take from a few minutes to a few hours.

### 3. Set the environment variables in Vercel

In Vercel: **Project → Settings → Environment Variables**. Add these for **Production** (and **Preview** if previews should send email), then redeploy:

| Name                 | Example                                           | Notes                                                                                                                  |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | `re_…`                                            | Secret. Never prefix with `NEXT_PUBLIC_`.                                                                              |
| `CONTACT_TO_EMAIL`   | `info@exchangepower.com.au`                       | Where enquiries go. Comma-separate several.                                                                            |
| `CONTACT_FROM_EMAIL` | `Exchange Power <enquiries@exchangepower.com.au>` | Must use the verified domain.                                                                                          |
| `FORM_TOKEN_SECRET`  | output of `openssl rand -base64 32`               | Signs the form's anti-spam token (at least 32 random bytes). If unset, a secret derived from `RESEND_API_KEY` is used. |

For local testing, put the same values in `.env.local` (git-ignored).

### Test sender limits

Before the domain is verified you can set `CONTACT_FROM_EMAIL="Exchange Power <onboarding@resend.dev>"`. Resend's test sender **only delivers to the email address of the Resend account owner**, so `CONTACT_TO_EMAIL` must be that address while testing. Switch to the verified domain before launch.

### How it behaves

- **Development without a key:** nothing is sent. The full email (subject, to, reply-to, text) is printed in the `npm run dev` console, and the form shows success.
- **Production with a missing variable:** the form asks the visitor to call or email instead, and the server logs which variable is missing. Visitors never see configuration details.
- **Spam protection:**
  - **Hidden honeypot field:** submissions that fill it get a fake success and nothing is sent.
  - **Signed time-to-submit token** (signed with `FORM_TOKEN_SECRET`): submissions made too soon after the form loads are rejected. Without JavaScript, the first submission asks the visitor to press Send again.
  - **Rate limit:** 5 submissions per IP per 10 minutes, kept in memory. On Vercel that limit applies per serverless instance, so it is best-effort. Add a shared store (for example Upstash Redis) or Vercel Firewall rules if spam becomes a problem.
