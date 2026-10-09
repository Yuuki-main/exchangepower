import "server-only";

import { Resend } from "resend";

/**
 * Resend email sending. The only module that reads the email environment
 * variables, and server-only, so neither the key nor the SDK can reach a
 * client bundle.
 *
 *   RESEND_API_KEY      Resend API key (never prefix with NEXT_PUBLIC_).
 *   CONTACT_TO_EMAIL    Where enquiries go. Comma-separate several addresses.
 *   CONTACT_FROM_EMAIL  Verified sender, e.g. "Exchange Power <enquiries@exchangepower.com.au>".
 */

/** @type {Resend | undefined} */
let client;

/** Created on first use, so builds and pages never need the key. */
function getClient(/** @type {string} */ apiKey) {
  client ??= new Resend(apiKey);
  return client;
}

function readConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() ?? "",
    to: (process.env.CONTACT_TO_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    from: process.env.CONTACT_FROM_EMAIL?.trim() ?? "",
  };
}

/**
 * Fallback for signing form tokens when FORM_TOKEN_SECRET is not set
 * (see src/lib/form-token.js). Null when no key is configured.
 */
export function getSigningSecret() {
  return readConfig().apiKey || null;
}

/**
 * @typedef {object} OutgoingEmail
 * @property {string} subject
 * @property {string} text
 * @property {string} html
 * @property {string} replyTo
 */

/**
 * Sends an email to CONTACT_TO_EMAIL.
 *
 * - Development without RESEND_API_KEY: logs the full email instead of
 *   sending, and reports success (so the form can be tested without a key).
 * - Production with missing configuration: logs a server error and reports
 *   failure. Callers must show a generic message, never config details.
 *
 * @param {OutgoingEmail} email
 * @returns {Promise<{ ok: true, id: string } | { ok: false, reason: "config" | "send" }>}
 */
export async function sendEmail(email) {
  const { apiKey, to, from } = readConfig();
  const isDev = process.env.NODE_ENV !== "production";

  if (!apiKey && isDev) {
    console.log(
      [
        "",
        "──── [enquiry] RESEND_API_KEY not set: email logged, not sent ────",
        `To:       ${to.join(", ") || "(CONTACT_TO_EMAIL not set)"}`,
        `From:     ${from || "(CONTACT_FROM_EMAIL not set)"}`,
        `Reply-To: ${email.replyTo}`,
        `Subject:  ${email.subject}`,
        "",
        email.text,
        "──────────────────────────────────────────────────────────────────",
      ].join("\n"),
    );
    return { ok: true, id: "dev-logged" };
  }

  const missing = [
    !apiKey && "RESEND_API_KEY",
    !to.length && "CONTACT_TO_EMAIL",
    !from && "CONTACT_FROM_EMAIL",
  ].filter(Boolean);
  if (missing.length) {
    console.error(
      `[enquiry] Email not sent: missing environment variable(s): ${missing.join(", ")}`,
    );
    return { ok: false, reason: "config" };
  }

  try {
    const { data, error } = await getClient(apiKey).emails.send({
      from,
      to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    if (error) {
      console.error(
        `[enquiry] Resend rejected the email: ${error.name} (${error.statusCode ?? "no status"}): ${error.message}`,
      );
      return { ok: false, reason: "send" };
    }
    return { ok: true, id: data.id };
  } catch (err) {
    console.error(
      "[enquiry] Resend request failed:",
      /** @type {Error} */ (err).message,
    );
    return { ok: false, reason: "send" };
  }
}
