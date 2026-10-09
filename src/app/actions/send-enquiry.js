"use server";

import { headers } from "next/headers";
import { SITE } from "@/content/site.js";
import { sendEmail } from "@/lib/email/resend";
import { enquiryEmail } from "@/lib/email/templates";
import { checkFormToken, issueFormToken } from "@/lib/form-token";
import { createRateLimiter } from "@/lib/rate-limit";
import { LIMITS, validateEnquiry } from "@/lib/validation";

/**
 * The site's only server code: receives quote-form submissions and forwards
 * them to Resend (PLAN.md Step 7, Option A).
 *
 * Used with useActionState, so it receives (previousState, formData) and
 * returns the state the form renders. It also works without JavaScript: the
 * form posts here and the page re-renders with the returned state.
 *
 * Checks, in order: rate limit, honeypot, validation, signed time-to-submit
 * token, then send.
 */

/** @typedef {import("@/lib/validation.js").EnquiryField} EnquiryField */

/**
 * @typedef {object} EnquiryState
 * @property {boolean} ok
 * @property {"idle" | "token" | "success" | "invalid" | "confirm" | "error"} status
 * @property {string} message
 * @property {Partial<Record<EnquiryField, string>>} fieldErrors
 * @property {Partial<Record<EnquiryField, string>>} values Echoed back so nothing typed is lost.
 * @property {string} token Signed form token to use for the next submission.
 */

/** 5 submissions per IP per 10 minutes (per serverless instance, see rate-limit.js). */
const submitLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
/** Token requests are cheap but still bounded. */
const tokenLimiter = createRateLimiter({ limit: 60, windowMs: 10 * 60 * 1000 });

const MESSAGES = {
  success: "Thanks, your enquiry has been sent. We'll be in touch soon.",
  invalid: "Please check the highlighted fields.",
  confirm: "To help us block spam, please press Send enquiry again.",
  tooFast:
    "That was quick! Please wait a moment, then press Send enquiry again.",
  rateLimited: `You've sent several enquiries in a short time. Please try again in a few minutes, or call us on ${SITE.phone.display}.`,
  failed: `Sorry, we couldn't send your enquiry just now. Please call us on ${SITE.phone.display} or email ${SITE.email}.`,
};

/** @param {Partial<EnquiryState>} state @returns {EnquiryState} */
const result = (state) => ({
  ok: false,
  status: "error",
  message: "",
  fieldErrors: {},
  values: {},
  token: "",
  ...state,
});

/** The page the form was sent from, as a full URL on our own domain. */
function sourceUrl(/** @type {FormDataEntryValue | null} */ raw) {
  const path = typeof raw === "string" ? raw.trim() : "";
  const safe =
    path.length <= LIMITS.source && /^\/[a-z0-9\-/]*$/i.test(path) ? path : "/";
  return `${SITE.url}${safe}`;
}

/** Visitor IP. On Vercel, x-forwarded-for is set by the platform (first entry = client). */
async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * @param {EnquiryState | undefined} _previous
 * @param {FormData} formData
 * @returns {Promise<EnquiryState>}
 */
export async function sendEnquiry(_previous, formData) {
  const ip = await clientIp();

  // The form requests a signed token when it loads (JavaScript only).
  if (formData.get("intent") === "token") {
    if (tokenLimiter.hit(ip).limited) return result({ status: "token" });
    return result({ status: "token", token: issueFormToken() });
  }

  const variant = formData.get("variant") === "compact" ? "compact" : "full";
  const raw = Object.fromEntries(
    [...formData.entries()]
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, String(v)]),
  );
  const { values, fieldErrors, data } = validateEnquiry(raw, { variant });

  if (submitLimiter.hit(ip).limited) {
    return result({
      status: "error",
      message: MESSAGES.rateLimited,
      values,
      token: String(formData.get("token") ?? ""),
    });
  }

  // Honeypot: people never see this field; bots fill it. Pretend it worked.
  if (String(formData.get("website") ?? "").trim()) {
    console.warn("[enquiry] Dropped: honeypot field filled");
    return result({ ok: true, status: "success", message: MESSAGES.success });
  }

  // Validate before the token check, so people without JavaScript see their
  // field errors straight away. Always hand back a usable token.
  const token = formData.get("token");
  const check = checkFormToken(token);
  const nextToken =
    check.status === "valid" || check.status === "too-fast"
      ? String(token)
      : issueFormToken();

  if (!data) {
    return result({
      status: "invalid",
      message: MESSAGES.invalid,
      fieldErrors,
      values,
      token: nextToken,
    });
  }

  // Signed time-to-submit check. Without JavaScript the first submission has
  // no token, so it gets one and is asked to press Send again.
  if (check.status === "too-fast") {
    console.warn("[enquiry] Dropped: submitted too soon after the form loaded");
    return result({
      status: "confirm",
      message: MESSAGES.tooFast,
      values,
      token: nextToken,
    });
  }
  if (check.status !== "valid") {
    return result({
      status: "confirm",
      message: MESSAGES.confirm,
      values,
      token: nextToken,
    });
  }

  const email = enquiryEmail({
    data,
    variant,
    sourceUrl: sourceUrl(formData.get("source")),
    receivedAt: new Intl.DateTimeFormat("en-AU", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Australia/Perth",
    }).format(new Date()),
  });

  const sent = await sendEmail({ ...email, replyTo: data.email });
  if (!sent.ok) {
    return result({
      status: "error",
      message: MESSAGES.failed,
      values,
      token: String(token),
    });
  }
  return result({
    ok: true,
    status: "success",
    message: MESSAGES.success,
    token: issueFormToken(),
  });
}
