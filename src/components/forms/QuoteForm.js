"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

/** Field names, labels and the message shown for each kind of invalid value. */
const FIELDS = /** @type {const} */ ({
  firstName: { label: "First name", missing: "Enter your first name." },
  lastName: { label: "Last name", missing: "Enter your last name." },
  email: {
    label: "Email",
    missing: "Enter your email address.",
    invalid: "Enter an email address like name@example.com.",
  },
  phone: {
    label: "Phone",
    missing: "Enter your phone number.",
    invalid:
      "Enter a phone number with 8 to 20 digits, for example 08 6370 4963.",
  },
  address: { label: "Address or suburb" },
  enquiryType: {
    label: "What is your enquiry about?",
    missing: "Choose what your enquiry is about.",
  },
  message: {
    label: "Message",
    invalid: "Keep your message under 2,000 characters.",
  },
});

/** @typedef {keyof typeof FIELDS} FieldName */

/**
 * Returns the error message for one control, or "" if it is valid.
 * Uses the browser's native constraint validation (required, type, pattern).
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} el
 */
function messageFor(el) {
  const f = /** @type {{ missing?: string, invalid?: string }} */ (
    FIELDS[/** @type {FieldName} */ (el.name)]
  );
  if (!f || el.validity.valid) return "";
  if (el.validity.valueMissing) return f.missing ?? "This field is required.";
  return f.invalid ?? "Check this field.";
}

/**
 * Quote request form. Markup and client-side validation only: sending is
 * added in Step 7 (Resend). Native constraints do the checking; errors are
 * shown in a summary and next to each field (linked with aria-describedby).
 *
 * @param {object} props
 * @param {string[]} props.enquiryTypes
 * @param {string} props.submitLabel
 * @param {string} props.notSentNotice Shown until sending is enabled.
 * @param {{ display: string, href: string }} props.phone
 * @param {string} props.email
 */
export function QuoteForm({
  enquiryTypes,
  submitLabel,
  notSentNotice,
  phone,
  email,
}) {
  const formRef = useRef(/** @type {HTMLFormElement | null} */ (null));
  const summaryRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [errors, setErrors] = useState(
    /** @type {Partial<Record<FieldName, string>>} */ ({}),
  );
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("");

  /** Validates every field and returns the errors. */
  function validateAll() {
    /** @type {Partial<Record<FieldName, string>>} */
    const next = {};
    for (const el of /** @type {HTMLFormElement} */ (formRef.current)
      .elements) {
      const control = /** @type {HTMLInputElement} */ (el);
      if (!(control.name in FIELDS)) continue;
      const message = messageFor(control);
      if (message) next[/** @type {FieldName} */ (control.name)] = message;
    }
    return next;
  }

  /** @param {React.FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);
    const next = validateAll();
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("");
      // Move focus to the summary so screen readers announce it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // TODO(step-7): send the enquiry to the server action that forwards it to
    // Resend (PLAN.md Step 7), show a pending state, then success or failure.
    setStatus(notSentNotice);
  }

  /**
   * Re-check a field when it loses focus, once the user has tried to submit.
   * (Blur events from the fields bubble up to the form.)
   * @param {React.FocusEvent<HTMLFormElement>} event
   */
  function handleBlur(event) {
    if (!attempted) return;
    const control = /** @type {HTMLInputElement} */ (
      /** @type {unknown} */ (event.target)
    );
    if (!(control.name in FIELDS)) return;
    setErrors((prev) => ({
      ...prev,
      [control.name]: messageFor(control) || undefined,
    }));
  }

  const errorList = /** @type {[FieldName, string][]} */ (
    Object.entries(errors).filter(([, m]) => m)
  );

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      aria-describedby="quote-form-note"
      className="grid gap-6 sm:grid-cols-2"
    >
      {errorList.length ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-error-600 bg-error-50 p-4 text-error-700 sm:col-span-2"
        >
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircleIcon size={18} />
            {errorList.length === 1
              ? "Please fix 1 field."
              : `Please fix ${errorList.length} fields.`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
            {errorList.map(([name, message]) => (
              <li key={name}>
                <a
                  href={`#quote-${name}`}
                  className="underline underline-offset-2"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Field
        id="quote-firstName"
        label={FIELDS.firstName.label}
        error={errors.firstName}
        required
      >
        {(c) => <Input name="firstName" autoComplete="given-name" {...c} />}
      </Field>
      <Field
        id="quote-lastName"
        label={FIELDS.lastName.label}
        error={errors.lastName}
        required
      >
        {(c) => <Input name="lastName" autoComplete="family-name" {...c} />}
      </Field>
      <Field
        id="quote-email"
        label={FIELDS.email.label}
        error={errors.email}
        required
      >
        {(c) => (
          <Input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            {...c}
          />
        )}
      </Field>
      <Field
        id="quote-phone"
        label={FIELDS.phone.label}
        error={errors.phone}
        required
      >
        {(c) => (
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern={"^\\+?[0-9 \\(\\)\\-]{8,20}$"}
            {...c}
          />
        )}
      </Field>
      <Field
        id="quote-address"
        label={FIELDS.address.label}
        hint="Optional. Your suburb is enough for a first quote."
        className="sm:col-span-2"
      >
        {(c) => <Input name="address" autoComplete="street-address" {...c} />}
      </Field>
      <Field
        id="quote-enquiryType"
        label={FIELDS.enquiryType.label}
        error={errors.enquiryType}
        required
        className="sm:col-span-2"
      >
        {(c) => (
          <Select name="enquiryType" defaultValue="" {...c}>
            <option value="" disabled>
              Choose one
            </option>
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field
        id="quote-message"
        label={FIELDS.message.label}
        hint="Optional. Tell us about your property, roof or power bills."
        error={errors.message}
        className="sm:col-span-2"
      >
        {(c) => <Textarea name="message" rows={5} maxLength={2000} {...c} />}
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <Button type="submit" size="lg" className="self-start">
          {submitLabel}
        </Button>
        <p id="quote-form-note" className="text-sm text-foreground-muted">
          {notSentNotice}{" "}
          <a
            href={phone.href}
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            {phone.display}
          </a>{" "}
          ·{" "}
          <a
            href={`mailto:${email}`}
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            {email}
          </a>
        </p>
        <p role="status" className="empty:hidden">
          {status ? (
            <span className="flex items-start gap-2 border-l-4 border-brand-600 bg-brand-50 p-4 text-brand-800">
              <CheckIcon size={18} className="mt-0.5" />
              Your details look good. {status}
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
