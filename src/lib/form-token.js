import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getSigningSecret } from "./email/resend";

/**
 * Signed time-to-submit tokens: "<issuedAtMs>.<hmac>". The form asks the
 * server for one when it loads, and the server only accepts a submission if
 * the token is genuine and old enough. A client can't fake an older token
 * without the secret.
 *
 * Signing secret, in order of preference:
 * 1. FORM_TOKEN_SECRET (at least 32 random bytes, e.g. `openssl rand -base64 32`),
 *    shared by every serverless instance and independent of the email key.
 * 2. A secret derived from RESEND_API_KEY (backwards compatible).
 * 3. A random per-process secret (local development without either).
 */

/** Minimum time between loading the form and submitting it. */
export const MIN_SUBMIT_MS = 3_000;
/** Tokens older than this are refreshed (asks the user to press Send again). */
export const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;

const fallbackSecret = randomBytes(32);

/** Base64 secrets shorter than this many bytes are rejected (with a warning). */
const MIN_SECRET_BYTES = 32;
let warned = false;

function secret() {
  const dedicated = process.env.FORM_TOKEN_SECRET?.trim();
  if (dedicated) {
    if (Buffer.byteLength(dedicated) >= MIN_SECRET_BYTES) {
      return createHmac("sha256", "exchange-power-form-token")
        .update(dedicated)
        .digest();
    }
    if (!warned) {
      warned = true;
      console.error(
        "[enquiry] FORM_TOKEN_SECRET is shorter than 32 bytes and is ignored. Generate one with: openssl rand -base64 32",
      );
    }
  }
  const key = getSigningSecret();
  return key
    ? createHmac("sha256", "exchange-power-form-token").update(key).digest()
    : fallbackSecret;
}

/** @param {string} issuedAt */
function sign(issuedAt) {
  return createHmac("sha256", secret()).update(issuedAt).digest("base64url");
}

/** A new token stamped with the current time. */
export function issueFormToken() {
  const issuedAt = String(Date.now());
  return `${issuedAt}.${sign(issuedAt)}`;
}

/**
 * @param {unknown} token
 * @returns {{ status: "valid" } | { status: "too-fast", waitMs: number } | { status: "missing" | "invalid" | "expired" }}
 */
export function checkFormToken(token) {
  if (typeof token !== "string" || !token) return { status: "missing" };
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature || !/^\d{13}$/.test(issuedAt))
    return { status: "invalid" };
  const expected = Buffer.from(sign(issuedAt));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given))
    return { status: "invalid" };
  const age = Date.now() - Number(issuedAt);
  if (age < 0 || age > MAX_TOKEN_AGE_MS) return { status: "expired" };
  if (age < MIN_SUBMIT_MS)
    return { status: "too-fast", waitMs: MIN_SUBMIT_MS - age };
  return { status: "valid" };
}
