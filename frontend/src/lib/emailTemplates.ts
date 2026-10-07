import { site } from "@/data/site";
import type { RequestSummary } from "@/lib/requestSummary";
import type { OtpPurpose } from "@/models/Admin";

// Email-safe HTML: table layout, inline styles, system/serif font stacks, no
// external CSS, fonts, images or scripts. Every customer-supplied value goes
// through escapeHtml() before it reaches the markup.

const C = {
  burgundy: "#6e2929",
  burgundyDark: "#561f1f",
  ivory: "#f5f1e8",
  paper: "#fbf8f2",
  gold: "#b69a68",
  ink: "#1d211e",
  muted: "#6b6a63",
  line: "#e6dccb",
};
const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes, then keeps the customer's line breaks. */
const multiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

/** Single-line, length-capped text for subject lines. */
const subjectSafe = (value: string, max = 60) => {
  const clean = value.replace(/[\r\n]+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};

const BRAND = site.brandName.toUpperCase(); // FASTPACKER
const TAGLINE = "Kashmir Travel &amp; Tours";

function layout(options: {
  preheader: string;
  eyebrow: string;
  body: string;
  footerNote: string;
}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(site.brandName)}</title>
</head>
<body style="margin:0;padding:0;background:${C.ivory};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ivory};">${escapeHtml(options.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivory};">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${C.paper};border:1px solid ${C.line};">
        <tr>
          <td style="background:${C.burgundy};padding:28px 36px 24px 36px;">
            <div style="font-family:${SERIF};font-size:24px;letter-spacing:6px;color:${C.ivory};">${BRAND}</div>
            <div style="margin-top:8px;height:1px;width:40px;background:${C.gold};line-height:1px;font-size:1px;">&nbsp;</div>
            <div style="margin-top:12px;font-family:${SANS};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#e9d9c0;">${options.eyebrow}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 36px 8px 36px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">
            ${options.body}
          </td>
        </tr>
        <tr>
          <td style="padding:28px 36px 32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
              <tr>
                <td style="padding-top:20px;font-family:${SERIF};font-size:15px;color:${C.burgundy};">${escapeHtml(site.brandName)}</td>
              </tr>
              <tr>
                <td style="padding-top:2px;font-family:${SANS};font-size:12px;letter-spacing:1px;color:${C.muted};">${TAGLINE}</td>
              </tr>
              <tr>
                <td style="padding-top:14px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};">${options.footerNote}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ------------------------------------------------------------------ OTP email

export function otpEmail(purpose: OtpPurpose, code: string, minutes: number) {
  const reset = purpose === "reset";
  const heading = reset ? "Password Reset" : "Admin Security Verification";
  const intro = reset
    ? `We received a request to reset your ${escapeHtml(site.brandName)} admin password.`
    : `We received a request to verify your ${escapeHtml(site.brandName)} admin account.`;
  const ignore = reset
    ? "If you did not request a password reset, please ignore this email. Your password will not change."
    : "If you did not request this code, you can safely ignore this email.";
  const digits = escapeHtml(code);

  const body = `
    <p style="margin:0 0 6px 0;font-family:${SERIF};font-size:22px;color:${C.ink};">${heading}</p>
    <p style="margin:18px 0 0 0;">Hello,</p>
    <p style="margin:12px 0 0 0;">${intro}</p>
    <p style="margin:26px 0 10px 0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};">Your verification code</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:${C.ivory};border:1px solid ${C.line};border-left:3px solid ${C.gold};padding:16px 28px;font-family:'Courier New',Courier,monospace;font-size:32px;letter-spacing:10px;font-weight:bold;color:${C.burgundy};">${digits}</td>
      </tr>
    </table>
    <p style="margin:18px 0 0 0;">This code expires in <strong>${minutes} minutes</strong> and can be used once.</p>
    <p style="margin:18px 0 0 0;color:${C.muted};font-size:13px;">${ignore}</p>
    <p style="margin:12px 0 0 0;color:${C.muted};font-size:13px;">${escapeHtml(site.brandName)} will never ask you for this code by phone or message.</p>`;

  return {
    subject: reset
      ? `${site.brandName} — Password reset code`
      : `${site.brandName} — Your admin verification code`,
    html: layout({
      preheader: `Your ${site.brandName} code expires in ${minutes} minutes.`,
      eyebrow: heading,
      body,
      footerNote: "This is an automated security email for the website administrator.",
    }),
    text: [
      BRAND,
      heading,
      "",
      "Hello,",
      "",
      reset
        ? `We received a request to reset your ${site.brandName} admin password.`
        : `We received a request to verify your ${site.brandName} admin account.`,
      "",
      `Your verification code: ${code}`,
      `This code expires in ${minutes} minutes and can be used once.`,
      "",
      ignore,
      "",
      `${site.brandName}`,
      "Kashmir Travel & Tours",
    ].join("\n"),
  };
}

// ------------------------------------------------------------ Enquiry email

function sectionTitle(title: string) {
  return `<p style="margin:30px 0 4px 0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};">${title}</p>`;
}

/** Label/value rows; rows without a value are left out entirely. */
function rows(items: [string, string | undefined][]) {
  const filled = items.filter(([, html]) => html);
  if (!filled.length) return "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filled
    .map(
      ([label, html]) => `
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:13px;color:${C.muted};width:42%;vertical-align:top;">${label}</td>
        <td style="padding:11px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink};vertical-align:top;">${html}</td>
      </tr>`
    )
    .join("")}</table>`;
}

const link = (href: string, label: string) =>
  `<a href="${href}" style="color:${C.burgundy};text-decoration:underline;">${label}</a>`;

export function enquirySubject(s: RequestSummary) {
  const kind = s.type === "booking" ? "New Booking Request" : "New Custom Trip Request";
  const name = subjectSafe(s.name, 40);
  return name ? `${site.brandName} — ${kind} from ${name}` : `${site.brandName} — ${kind}`;
}

export function enquiryEmail(s: RequestSummary, plainText: string) {
  const booking = s.type === "booking";
  const email = s.email.trim();
  const phoneDigits = s.phone.replace(/[^\d+]/g, "");
  const replySubject = encodeURIComponent(
    booking && s.journey
      ? `Your ${site.brandName} booking enquiry — ${s.journey.title}`
      : `Your ${site.brandName} trip enquiry`
  );
  const mailto = `mailto:${encodeURIComponent(email).replace(/%40/g, "@")}?subject=${replySubject}`;

  const customer = rows([
    ["Name", escapeHtml(s.name)],
    ["Email", link(escapeHtml(mailto), escapeHtml(email))],
    ["Phone", s.phone ? link(`tel:${escapeHtml(phoneDigits)}`, escapeHtml(s.phone)) : undefined],
  ]);

  const trip = booking
    ? rows([
        ["Journey", s.journey ? escapeHtml(s.journey.title) : undefined],
        ["Duration", s.journey?.duration ? escapeHtml(s.journey.duration) : undefined],
        [
          "Price",
          s.journey?.price ? `From ₹${escapeHtml(s.journey.price.toLocaleString("en-IN"))}` : undefined,
        ],
        ["Preferred travel date", s.travelDate ? escapeHtml(s.travelDate) : undefined],
        ["Number of travellers", escapeHtml(s.travellers)],
      ])
    : rows([
        [
          s.destinations && s.destinations.length > 1 ? "Destinations" : "Destination",
          s.destinations?.length ? escapeHtml(s.destinations.join(", ")) : undefined,
        ],
        ["Travel dates", s.travelDates ? escapeHtml(s.travelDates) : undefined],
        ["Trip length", s.tripLength ? escapeHtml(s.tripLength) : undefined],
        ["Number of travellers", escapeHtml(s.travellers)],
        ["Budget", s.budget ? escapeHtml(s.budget) : undefined],
      ]);

  const message = s.notes?.trim()
    ? `${sectionTitle("Customer message")}
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
         <tr><td style="padding:16px 20px;background:${C.ivory};border-left:3px solid ${C.gold};font-family:${SERIF};font-size:15px;line-height:1.7;font-style:italic;color:${C.ink};">&ldquo;${multiline(s.notes.trim())}&rdquo;</td></tr>
       </table>`
    : "";

  const body = `
    <p style="margin:0;font-family:${SERIF};font-size:24px;color:${C.ink};">${booking ? "New Booking Request" : "New Travel Enquiry"}</p>
    <p style="margin:10px 0 0 0;color:${C.muted};">A new ${booking ? "booking request" : "travel request"} has been submitted through the ${escapeHtml(site.brandName)} website.</p>
    ${sectionTitle("Customer details")}
    ${customer}
    ${sectionTitle(booking ? "Booking details" : "Trip details")}
    ${trip}
    ${message}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 4px 0;">
      <tr>
        <td style="background:${C.burgundy};border-radius:2px;">
          <a href="${escapeHtml(mailto)}" style="display:inline-block;padding:13px 28px;font-family:${SANS};font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:${C.ivory};text-decoration:none;">Reply to Customer</a>
        </td>
      </tr>
    </table>`;

  return {
    subject: enquirySubject(s),
    html: layout({
      preheader: `${booking ? "Booking request" : "Trip enquiry"} from ${s.name}`,
      eyebrow: booking ? "New Booking Request" : "New Travel Enquiry",
      body,
      footerNote: `This enquiry was submitted through the ${escapeHtml(site.brandName)} website. Replying to this email goes straight to the customer.`,
    }),
    text: plainText,
  };
}
