import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { isDemoMode } from "@/lib/demo";

// All outgoing email goes through Gmail SMTP (GMAIL_USER + App Password).
// Functions throw if Gmail isn't configured or the send fails — callers decide
// whether that is fatal. Nothing here logs message bodies (OTP codes!).

type Message = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

async function deliver(message: Message) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD not set");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  await transporter.sendMail({
    from: `"${site.brandName} website" <${user}>`,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

/** Booking / trip enquiry → REQUEST_TO_EMAIL (falls back to GMAIL_USER). */
export async function sendOwnerEmail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}) {
  // Demo mode: no SMTP, just show what would have been sent (no secrets here).
  if (isDemoMode()) {
    const to = process.env.REQUEST_TO_EMAIL || "the owner";
    console.log(
      [
        "",
        `[demo] Email not sent. It would have gone to ${to}:`,
        `Reply-To: ${options.replyTo}`,
        `Subject: ${options.subject}`,
        "",
        options.text,
        "",
      ].join("\n")
    );
    return;
  }

  const to = process.env.REQUEST_TO_EMAIL || process.env.GMAIL_USER;
  if (!to) throw new Error("REQUEST_TO_EMAIL / GMAIL_USER not set");
  await deliver({ ...options, to });
}

/**
 * Security email (OTP) to an admin. `to` must be the address stored on the
 * admin record — never one typed into a form. Never logged, even in demo mode.
 */
export async function sendAdminSecurityEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  if (isDemoMode()) throw new Error("Email is disabled in demo mode");
  await deliver(options);
}
