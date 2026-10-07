import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleError, json } from "@/lib/api";
import { seconds, sendOtp, setPendingCookie } from "@/lib/adminOtp";
import { PENDING_COOKIE, readPendingToken } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";
import { OTP_RESEND_COOLDOWN_MS, OTP_TTL_MS } from "@/lib/otp";

/** New code for the pending login/reset. The previous code stops working. */
export async function POST() {
  try {
    if (isDemoMode()) return json({ error: "Not available in demo mode" }, 400);
    const pending = await readPendingToken(
      (await cookies()).get(PENDING_COOKIE)?.value,
      ["otp-login", "otp-reset"]
    );
    if (!pending) {
      return json(
        { error: "Your verification session has expired. Please start again.", restart: true },
        401
      );
    }

    const purpose = pending.purpose === "otp-login" ? "login" : "reset";
    const sent = await sendOtp(pending.email, purpose);

    if (!sent.ok && sent.reason === "throttled") {
      const wait = seconds(sent.retryAfterMs);
      return json(
        {
          error:
            wait > 90
              ? `Too many codes requested. Please try again in ${Math.ceil(wait / 60)} minutes.`
              : `Please wait ${wait} seconds before requesting another code.`,
          retryAfter: wait,
        },
        429
      );
    }
    if (!sent.ok && sent.reason === "failed") {
      return json({ error: "We couldn't send a new code. Please try again shortly." }, 502);
    }

    // "no-admin" only happens for password resets: answer exactly as if sent.
    const now = Date.now();
    const response = NextResponse.json({
      ok: true,
      expiresAt: sent.ok ? sent.expiresAt : now + OTP_TTL_MS,
      resendAt: sent.ok ? sent.resendAt : now + OTP_RESEND_COOLDOWN_MS,
    });
    await setPendingCookie(response, pending.email, pending.purpose);
    return response;
  } catch (error) {
    return handleError(error);
  }
}
