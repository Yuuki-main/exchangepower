// Shared enquiry validation, used by the quote form in the browser and by the
// sendEnquiry Server Action on the server (which re-validates everything).
// Plain JS, no dependencies and no server-only imports.

/** The enquiry types the form offers. Anything else is rejected. */
export const ENQUIRY_TYPES = /** @type {const} */ ([
  "Residential solar",
  "Commercial solar",
  "Battery",
  "Rebates",
  "Other",
]);

/** Maximum length of each field, in characters (after trimming). */
export const LIMITS = /** @type {const} */ ({
  firstName: 60,
  lastName: 60,
  email: 254,
  phone: 20,
  address: 200,
  enquiryType: 40,
  message: 2000,
  source: 200,
});

/** Error messages, matching the quote form's copy. */
export const MESSAGES = /** @type {const} */ ({
  firstName: {
    missing: "Enter your first name.",
    tooLong: "Keep your first name under 60 characters.",
  },
  lastName: {
    missing: "Enter your last name.",
    tooLong: "Keep your last name under 60 characters.",
  },
  email: {
    missing: "Enter your email address.",
    invalid: "Enter an email address like name@example.com.",
    tooLong: "Enter an email address like name@example.com.",
  },
  phone: {
    missing: "Enter your phone number.",
    invalid:
      "Enter an Australian phone number, for example 08 6370 4963 or 0412 345 678.",
    tooLong:
      "Enter an Australian phone number, for example 08 6370 4963 or 0412 345 678.",
  },
  address: { tooLong: "Keep your address under 200 characters." },
  enquiryType: {
    missing: "Choose what your enquiry is about.",
    invalid: "Choose what your enquiry is about.",
  },
  message: { tooLong: "Keep your message under 2,000 characters." },
});

/**
 * @typedef {"firstName" | "lastName" | "email" | "phone" | "address" | "enquiryType" | "message"} EnquiryField
 * @typedef {"full" | "compact"} FormVariant
 */

/** Fields per form variant. The compact (homepage) form has no address or message. */
export const VARIANT_FIELDS = /** @type {const} */ ({
  full: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "enquiryType",
    "message",
  ],
  compact: ["firstName", "lastName", "email", "phone", "enquiryType"],
});

const REQUIRED = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "enquiryType",
]);

/** A practical email check: something@domain.tld, no spaces. */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Validates and normalises an Australian phone number: mobiles and landlines
 * with or without +61 (spaces, dashes, dots and brackets allowed), plus
 * 1300/1800 and 13 numbers.
 *
 * @example normaliseAuPhone("(08) 6370 4963") // { valid: true, normalised: "+61 8 6370 4963" }
 * @example normaliseAuPhone("0412 345 678")   // { valid: true, normalised: "+61 412 345 678" }
 * @param {string} raw
 * @returns {{ valid: boolean, normalised: string }}
 */
export function normaliseAuPhone(raw) {
  const compact = raw.replace(/[\s().-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return { valid: false, normalised: "" };
  const digits = compact.replace(/^\+/, "");

  // 1300 / 1800 and 13 numbers (national only).
  if (/^1[38]00\d{6}$/.test(digits)) {
    return {
      valid: true,
      normalised: `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
    };
  }
  if (/^13\d{4}$/.test(digits)) {
    return {
      valid: true,
      normalised: `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`,
    };
  }

  // Reduce to the 9-digit national significant number.
  let nsn = "";
  if (
    compact.startsWith("+61") ||
    (digits.startsWith("61") && digits.length === 11)
  )
    nsn = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 10)
    nsn = digits.slice(1);
  if (nsn.startsWith("0")) nsn = nsn.slice(1); // "+61 (0)8 …"
  if (!/^[23478]\d{8}$/.test(nsn)) return { valid: false, normalised: "" };

  const normalised = nsn.startsWith("4")
    ? `+61 ${nsn.slice(0, 3)} ${nsn.slice(3, 6)} ${nsn.slice(6)}` // mobile
    : `+61 ${nsn[0]} ${nsn.slice(1, 5)} ${nsn.slice(5)}`; // landline
  return { valid: true, normalised };
}

/**
 * @typedef {object} EnquiryData Validated, normalised enquiry.
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone Normalised, e.g. "+61 8 6370 4963".
 * @property {string} address
 * @property {string} enquiryType
 * @property {string} message
 */

/**
 * Validates an enquiry. Trims every value, enforces required fields,
 * lengths, email format, Australian phone numbers and the allowed enquiry
 * types.
 *
 * @param {Record<string, unknown>} input Raw form values (e.g. from FormData).
 * @param {{ variant?: FormVariant }} [options]
 * @returns {{ values: Record<EnquiryField, string>, fieldErrors: Partial<Record<EnquiryField, string>>, data: EnquiryData | null }}
 *   `values` are the trimmed inputs (safe to send back to the form);
 *   `data` is set only when there are no errors.
 */
export function validateEnquiry(input, { variant = "full" } = {}) {
  const fields = VARIANT_FIELDS[variant] ?? VARIANT_FIELDS.full;
  /** @type {Record<EnquiryField, string>} */
  const values = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    enquiryType: "",
    message: "",
  };
  /** @type {Partial<Record<EnquiryField, string>>} */
  const fieldErrors = {};

  for (const field of fields) {
    const raw = input[field];
    const value = typeof raw === "string" ? raw.trim() : "";
    values[field] = value;
    const messages =
      /** @type {{ missing?: string, invalid?: string, tooLong?: string }} */ (
        MESSAGES[field]
      );

    if (!value) {
      if (REQUIRED.has(field)) fieldErrors[field] = messages.missing;
      continue;
    }
    if (value.length > LIMITS[field]) {
      fieldErrors[field] = messages.tooLong;
      continue;
    }
    if (field === "email" && !EMAIL.test(value))
      fieldErrors.email = messages.invalid;
    if (field === "phone" && !normaliseAuPhone(value).valid)
      fieldErrors.phone = messages.invalid;
    if (
      field === "enquiryType" &&
      !ENQUIRY_TYPES.includes(/** @type {any} */ (value))
    ) {
      fieldErrors.enquiryType = messages.invalid;
    }
  }

  const ok = Object.keys(fieldErrors).length === 0;
  return {
    values,
    fieldErrors,
    data: ok
      ? { ...values, phone: normaliseAuPhone(values.phone).normalised }
      : null,
  };
}
