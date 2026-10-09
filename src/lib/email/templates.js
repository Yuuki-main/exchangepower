import "server-only";

/**
 * The enquiry email sent to the business: plain text plus a simple HTML
 * version with inline styles only (mail clients ignore stylesheets), a
 * single column and system fonts so it reads well on phones.
 */

/** Escapes text for safe use in HTML. Every user value passes through this. */
export function escapeHtml(/** @type {string} */ value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes line breaks so a value can't add email headers. */
const oneLine = (/** @type {string} */ value) =>
  value.replace(/[\r\n]+/g, " ").trim();

/**
 * @param {object} enquiry
 * @param {import("../validation.js").EnquiryData} enquiry.data Validated and normalised.
 * @param {string} enquiry.sourceUrl Page the form was sent from.
 * @param {string} enquiry.receivedAt Human-readable time (Perth).
 * @param {"full" | "compact"} enquiry.variant Which form was used.
 */
export function enquiryEmail({ data, sourceUrl, receivedAt, variant }) {
  const name = oneLine(`${data.firstName} ${data.lastName}`);
  const subject = oneLine(`New enquiry: ${data.enquiryType}: ${name}`);

  /** @type {[string, string][]} */
  const rows = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Enquiry type", data.enquiryType],
    ["Address or suburb", data.address || "Not given"],
  ];
  const message =
    data.message ||
    (variant === "compact"
      ? "(Sent from the short homepage form, no message field.)"
      : "No message.");

  const text = [
    `New website enquiry from ${name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
    "",
    "—",
    `Sent from: ${sourceUrl}`,
    `Received: ${receivedAt}`,
    "Reply to this email to answer the customer directly.",
  ].join("\n");

  const cell =
    "padding:10px 0;border-bottom:1px solid #dde4e8;vertical-align:top;font-size:15px;line-height:1.5;";
  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f7f9fa;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#161c21;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#a65102;font-weight:600;">New website enquiry</p>
    <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#0b2b33;">${escapeHtml(data.enquiryType)}: ${escapeHtml(name)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #dde4e8;">
      <tr><td style="padding:4px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="${cell}width:38%;color:#4f5b64;">${escapeHtml(label)}</td><td style="${cell}font-weight:600;">${label === "Email" ? `<a href="mailto:${escapeHtml(value)}" style="color:#114b57;">${escapeHtml(value)}</a>` : label === "Phone" ? `<a href="tel:${escapeHtml(value.replace(/\s/g, ""))}" style="color:#114b57;">${escapeHtml(value)}</a>` : escapeHtml(value)}</td></tr>`,
            )
            .join("\n          ")}
        </table>
      </td></tr>
    </table>
    <h2 style="margin:24px 0 8px;font-size:16px;color:#0b2b33;">Message</h2>
    <div style="background:#ffffff;border:1px solid #dde4e8;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
    <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#4f5b64;">
      Sent from <a href="${escapeHtml(sourceUrl)}" style="color:#114b57;">${escapeHtml(sourceUrl)}</a><br>
      Received ${escapeHtml(receivedAt)}<br>
      Reply to this email to answer the customer directly.
    </p>
  </div>
</body>
</html>`;

  return { subject, text, html };
}
