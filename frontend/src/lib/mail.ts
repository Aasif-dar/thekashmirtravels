import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { isDemoMode } from "@/lib/demo";

/**
 * Sends a plain-text email to the owner through Gmail SMTP (App Password).
 * Throws if Gmail isn't configured or the send fails — callers decide
 * whether that is fatal.
 */
export async function sendOwnerEmail(options: {
  subject: string;
  text: string;
  replyTo: string;
}) {
  // Demo mode: no SMTP, just show what would have been sent.
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
    to: process.env.REQUEST_TO_EMAIL || user,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
