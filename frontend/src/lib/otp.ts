import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { OtpPurpose } from "@/models/Admin";

// Pure OTP rules (no database, no email) so they can be reasoned about and
// tested in isolation. The routes in app/api/auth apply them to the Admin doc.

export const OTP_TTL_MS = 10 * 60 * 1000; // code lifetime
export const OTP_MAX_ATTEMPTS = 5; // wrong guesses before the code is burned
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // between two codes
export const OTP_MAX_SENDS_PER_HOUR = 5;

export type { OtpPurpose };

/** Cryptographically random 6-digit code (000000–999999). */
export function generateOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

function otpKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET must be set (at least 16 characters)");
  }
  return `otp:${secret}`;
}

/**
 * Keyed hash of the code, bound to the admin and the purpose, so a stored hash
 * is useless without JWT_SECRET and a login code can't be replayed for a reset.
 */
export function hashOtp(email: string, purpose: OtpPurpose, code: string) {
  return createHmac("sha256", otpKey())
    .update(`${email.toLowerCase()}|${purpose}|${code}`)
    .digest("hex");
}

export interface OtpState {
  otpHash?: string | null;
  otpPurpose?: OtpPurpose | null;
  otpExpiresAt?: Date | null;
  otpAttempts?: number | null;
}

export type OtpCheck =
  | { status: "ok" }
  | { status: "none" } // no active code for this purpose
  | { status: "expired" }
  | { status: "locked" } // too many wrong attempts
  | { status: "wrong"; attemptsLeft: number };

/**
 * Evaluate a submitted code against the stored state. `attemptsUsed` is the
 * attempt count BEFORE this guess.
 */
export function checkOtp(
  state: OtpState,
  email: string,
  purpose: OtpPurpose,
  code: string,
  now = Date.now()
): OtpCheck {
  if (!state.otpHash || state.otpPurpose !== purpose || !state.otpExpiresAt) {
    return { status: "none" };
  }
  if (state.otpExpiresAt.getTime() <= now) return { status: "expired" };
  const attemptsUsed = state.otpAttempts ?? 0;
  if (attemptsUsed >= OTP_MAX_ATTEMPTS) return { status: "locked" };

  const expected = Buffer.from(state.otpHash, "hex");
  const actual = Buffer.from(hashOtp(email, purpose, code), "hex");
  const match =
    /^\d{6}$/.test(code) &&
    expected.length === actual.length &&
    timingSafeEqual(expected, actual);
  if (match) return { status: "ok" };

  const attemptsLeft = OTP_MAX_ATTEMPTS - (attemptsUsed + 1);
  return attemptsLeft > 0 ? { status: "wrong", attemptsLeft } : { status: "locked" };
}

export interface SendState {
  otpLastSentAt?: Date | null;
  otpSendWindowStart?: Date | null;
  otpSendCount?: number | null;
}

export type SendCheck =
  | { ok: true; windowStart: Date; count: number }
  | { ok: false; retryAfterMs: number };

/** Cooldown between codes and a cap per rolling hour. */
export function checkSend(state: SendState, now = Date.now()): SendCheck {
  const last = state.otpLastSentAt?.getTime() ?? 0;
  if (now - last < OTP_RESEND_COOLDOWN_MS) {
    return { ok: false, retryAfterMs: OTP_RESEND_COOLDOWN_MS - (now - last) };
  }
  const windowStart = state.otpSendWindowStart?.getTime() ?? 0;
  const inWindow = now - windowStart < 60 * 60 * 1000;
  const count = inWindow ? (state.otpSendCount ?? 0) : 0;
  if (count >= OTP_MAX_SENDS_PER_HOUR) {
    return { ok: false, retryAfterMs: windowStart + 60 * 60 * 1000 - now };
  }
  return {
    ok: true,
    windowStart: inWindow ? new Date(windowStart) : new Date(now),
    count: count + 1,
  };
}
