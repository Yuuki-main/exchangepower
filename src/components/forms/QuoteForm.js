"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import { LIMITS, VARIANT_FIELDS, validateEnquiry } from "@/lib/validation";

/** @typedef {import("@/app/actions/send-enquiry.js").EnquiryState} EnquiryState */
/** @typedef {import("@/lib/validation.js").EnquiryField} EnquiryField */

const LABELS = /** @type {const} */ ({
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  address: "Address or suburb",
  enquiryType: "What is your enquiry about?",
  message: "Message",
});

/** @type {EnquiryState} */
const INITIAL_STATE = {
  ok: false,
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
  token: "",
};

/**
 * Quote request form, sent through the sendEnquiry Server Action (Resend).
 *
 * - The same rules run in the browser (instant feedback) and on the server
 *   (src/lib/validation.js).
 * - Works without JavaScript: the form posts to the action and the page
 *   re-renders with the result.
 * - Results are announced in a live region that receives focus.
 *
 * @param {object} props
 * @param {"full" | "compact"} [props.variant="full"] `compact` (homepage) asks
 *   only for name, email, phone and enquiry type.
 * @param {readonly string[]} props.enquiryTypes
 * @param {string} props.submitLabel
 * @param {string} [props.className]
 */
export function QuoteForm({
  variant = "full",
  enquiryTypes,
  submitLabel,
  className,
}) {
  const [state, formAction, pending] = useActionState(
    sendEnquiry,
    INITIAL_STATE,
  );
  const [clientErrors, setClientErrors] = useState(
    /** @type {Partial<Record<EnquiryField, string>> | null} */ (null),
  );
  const [token, setToken] = useState("");
  const statusRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const pathname = usePathname();
  const compact = variant === "compact";
  const id = (/** @type {string} */ name) =>
    `${compact ? "home-quote" : "quote"}-${name}`;
  const fields = new Set(
    /** @type {readonly string[]} */ (VARIANT_FIELDS[variant]),
  );

  // Ask the server for a signed time-to-submit token once the form is on screen.
  useEffect(() => {
    const data = new FormData();
    data.set("intent", "token");
    sendEnquiry(undefined, data).then((s) => {
      if (s.token) setToken(s.token);
    });
  }, []);

  // Move focus to the result so it is announced and visible.
  useEffect(() => {
    if (["success", "invalid", "confirm", "error"].includes(state.status)) {
      statusRef.current?.focus();
    }
  }, [state]);

  const errors =
    clientErrors ?? (state.status === "invalid" ? state.fieldErrors : {});
  const values = state.ok ? {} : state.values;
  const errorList = /** @type {[EnquiryField, string][]} */ (
    Object.entries(errors).filter(([, message]) => message)
  );
  const showResult =
    !clientErrors && ["success", "confirm", "error"].includes(state.status);

  /** @param {HTMLFormElement} form */
  const check = (form) =>
    validateEnquiry(
      /** @type {Record<string, string>} */ (
        Object.fromEntries(new FormData(form))
      ),
      {
        variant,
      },
    ).fieldErrors;

  /**
   * Check in the browser first (the server checks again). If anything is
   * wrong, stop the submission and show the errors.
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    const fieldErrors = check(event.currentTarget);
    if (Object.keys(fieldErrors).length) {
      event.preventDefault();
      setClientErrors(fieldErrors);
      requestAnimationFrame(() => statusRef.current?.focus());
    } else {
      setClientErrors(null);
    }
  }

  /**
   * Once errors are showing, re-check a field when it loses focus.
   * (Blur events from the fields bubble up to the form.)
   * @param {React.FocusEvent<HTMLFormElement>} event
   */
  function handleBlur(event) {
    if (!clientErrors) return;
    const control = /** @type {HTMLInputElement} */ (
      /** @type {unknown} */ (event.target)
    );
    if (!fields.has(control.name)) return;
    const fieldErrors = check(event.currentTarget);
    setClientErrors((prev) => ({
      ...prev,
      [control.name]: fieldErrors[/** @type {EnquiryField} */ (control.name)],
    }));
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      aria-busy={pending}
      className={cn("relative grid gap-6 sm:grid-cols-2", className)}
    >
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="source" value={pathname} />
      <input type="hidden" name="token" value={state.token || token} />

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div
        aria-hidden="true"
        className="absolute left-[-10000px] h-px w-px overflow-hidden"
      >
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input
          id={id("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Live region: the error summary or the result. Focused after each submit. */}
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="outline-none empty:hidden sm:col-span-2"
      >
        {errorList.length ? (
          <div
            role="alert"
            className="border-l-4 border-error-600 bg-error-50 p-4 text-error-700"
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
                    href={`#${id(name)}`}
                    className="underline underline-offset-2"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : showResult ? (
          <p
            className={cn(
              "flex items-start gap-2 border-l-4 p-4",
              state.ok
                ? "border-success-600 bg-success-50 text-success-700"
                : "border-warning-600 bg-warning-50 text-warning-700",
            )}
          >
            {state.ok ? (
              <CheckIcon size={18} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircleIcon size={18} className="mt-0.5 shrink-0" />
            )}
            <span>{state.message}</span>
          </p>
        ) : null}
      </div>

      <Field
        id={id("firstName")}
        label={LABELS.firstName}
        error={errors.firstName}
        required
      >
        {(c) => (
          <Input
            name="firstName"
            autoComplete="given-name"
            maxLength={LIMITS.firstName}
            defaultValue={values.firstName}
            {...c}
          />
        )}
      </Field>
      <Field
        id={id("lastName")}
        label={LABELS.lastName}
        error={errors.lastName}
        required
      >
        {(c) => (
          <Input
            name="lastName"
            autoComplete="family-name"
            maxLength={LIMITS.lastName}
            defaultValue={values.lastName}
            {...c}
          />
        )}
      </Field>
      <Field
        id={id("email")}
        label={LABELS.email}
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
            maxLength={LIMITS.email}
            defaultValue={values.email}
            {...c}
          />
        )}
      </Field>
      <Field
        id={id("phone")}
        label={LABELS.phone}
        error={errors.phone}
        required
      >
        {(c) => (
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            defaultValue={values.phone}
            {...c}
          />
        )}
      </Field>
      {fields.has("address") ? (
        <Field
          id={id("address")}
          label={LABELS.address}
          hint="Optional. Your suburb is enough for a first quote."
          error={errors.address}
          className="sm:col-span-2"
        >
          {(c) => (
            <Input
              name="address"
              autoComplete="street-address"
              maxLength={LIMITS.address}
              defaultValue={values.address}
              {...c}
            />
          )}
        </Field>
      ) : null}
      <Field
        id={id("enquiryType")}
        label={LABELS.enquiryType}
        error={errors.enquiryType}
        required
        className="sm:col-span-2"
      >
        {(c) => (
          // Keyed by the echoed value so a server re-render restores the choice.
          <Select
            key={values.enquiryType ?? ""}
            name="enquiryType"
            defaultValue={values.enquiryType ?? ""}
            {...c}
          >
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
      {fields.has("message") ? (
        <Field
          id={id("message")}
          label={LABELS.message}
          hint="Optional. Tell us about your property, roof or power bills."
          error={errors.message}
          className="sm:col-span-2"
        >
          {(c) => (
            <Textarea
              name="message"
              rows={5}
              maxLength={LIMITS.message}
              defaultValue={values.message}
              {...c}
            />
          )}
        </Field>
      ) : null}

      <div className="flex flex-col gap-4 sm:col-span-2">
        <p className="text-sm text-foreground-muted">
          By sending this form you agree to our{" "}
          <Link
            href="/privacy-policy/"
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          . We only use your details to reply to your enquiry.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="self-start"
        >
          {pending ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
