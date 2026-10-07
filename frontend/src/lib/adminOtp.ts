import type { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  PENDING_COOKIE,
  PENDING_COOKIE_PATH,
  PENDING_SECONDS,
  SESSION_SECONDS,
  signPendingToken,
  signToken,
  type PendingPurpose,
} from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { otpEmail } from "@/lib/emailTemplates";
import { sendAdminSecurityEmail } from "@/lib/mail";
import {
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
  checkOtp,
  checkSend,
  generateOtp,
  hashOtp,
  type OtpCheck,
  type OtpPurpose,
} from "@/lib/otp";
import { AdminModel } from "@/models/Admin";

// Database + email side of admin OTPs. The code itself only ever exists in
// memory here and in the email; the database keeps an HMAC of it.

export type SendResult =
  | { ok: true; expiresAt: number; resendAt: number }
  | { ok: false; reason: "no-admin" }
  | { ok: false; reason: "throttled"; retryAfterMs: number }
  | { ok: false; reason: "failed" };

/**
 * Create a new code for this admin (replacing any previous one) and email it
 * to the address on the admin record. With `reuseActive`, a still-valid code of
 * the same purpose inside the resend cooldown is reused instead of throttling
 * (e.g. the admin submits the password form twice).
 */
export async function sendOtp(
  email: string,
  purpose: OtpPurpose,
  { reuseActive = false } = {}
): Promise<SendResult> {
  await connectDb();
  const admin = await AdminModel.findOne({ email: email.toLowerCase() }).lean();
  if (!admin) return { ok: false, reason: "no-admin" };

  const now = Date.now();
  const allowed = checkSend(admin, now);
  if (!allowed.ok) {
    const active =
      admin.otpHash &&
      admin.otpPurpose === purpose &&
      (admin.otpExpiresAt?.getTime() ?? 0) > now &&
      (admin.otpAttempts ?? 0) < OTP_MAX_ATTEMPTS;
    if (reuseActive && active) {
      return {
        ok: true,
        expiresAt: admin.otpExpiresAt!.getTime(),
        resendAt: now + allowed.retryAfterMs,
      };
    }
    return { ok: false, reason: "throttled", retryAfterMs: allowed.retryAfterMs };
  }

  const code = generateOtp();
  const expiresAt = now + OTP_TTL_MS;
  await AdminModel.updateOne(
    { _id: admin._id },
    {
      $set: {
        otpHash: hashOtp(admin.email, purpose, code),
        otpPurpose: purpose,
        otpExpiresAt: new Date(expiresAt),
        otpAttempts: 0,
        otpLastSentAt: new Date(now),
        otpSendWindowStart: allowed.windowStart,
        otpSendCount: allowed.count,
      },
    }
  );

  try {
    const message = otpEmail(purpose, code, Math.round(OTP_TTL_MS / 60000));
    await sendAdminSecurityEmail({ to: admin.email, ...message });
  } catch (error) {
    // Don't leave a code behind that nobody received. Log only the reason.
    await AdminModel.updateOne(
      { _id: admin._id },
      { $unset: { otpHash: 1, otpPurpose: 1, otpExpiresAt: 1 } }
    );
    console.error(
      "Admin OTP email failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return { ok: false, reason: "failed" };
  }

  return { ok: true, expiresAt, resendAt: now + OTP_RESEND_COOLDOWN_MS };
}

/**
 * Check a code. Each guess is counted atomically BEFORE it is evaluated, so
 * parallel requests can't exceed OTP_MAX_ATTEMPTS. A correct code is consumed.
 */
export async function verifyOtp(
  email: string,
  purpose: OtpPurpose,
  code: string
): Promise<OtpCheck> {
  await connectDb();
  const normalized = email.toLowerCase();
  const before = await AdminModel.findOneAndUpdate(
    {
      email: normalized,
      otpPurpose: purpose,
      otpHash: { $exists: true },
      otpAttempts: { $lt: OTP_MAX_ATTEMPTS },
    },
    { $inc: { otpAttempts: 1 } },
    { new: false }
  ).lean();

  if (!before) {
    // No countable code: report why (none / expired / locked).
    const admin = await AdminModel.findOne({ email: normalized }).lean();
    return checkOtp(admin ?? {}, normalized, purpose, code);
  }

  const result = checkOtp(before, before.email, purpose, code);
  if (result.status !== "ok") return result;

  // Single use: only the request that removes this exact hash wins.
  const consumed = await AdminModel.updateOne(
    { _id: before._id, otpHash: before.otpHash },
    {
      $unset: { otpHash: 1, otpPurpose: 1, otpExpiresAt: 1 },
      $set: { otpAttempts: 0 },
    }
  );
  return consumed.modifiedCount === 1 ? result : { status: "none" };
}

// ------------------------------------------------------------------ cookies

export async function setSessionCookie(response: NextResponse, email: string) {
  response.cookies.set(AUTH_COOKIE, await signToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function setPendingCookie(
  response: NextResponse,
  email: string,
  purpose: PendingPurpose
) {
  response.cookies.set(PENDING_COOKIE, await signPendingToken(email, purpose), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: PENDING_COOKIE_PATH,
    maxAge: PENDING_SECONDS,
  });
}

export function clearPendingCookie(response: NextResponse) {
  response.cookies.set(PENDING_COOKIE, "", { path: PENDING_COOKIE_PATH, maxAge: 0 });
}

export const seconds = (ms: number) => Math.max(1, Math.ceil(ms / 1000));
