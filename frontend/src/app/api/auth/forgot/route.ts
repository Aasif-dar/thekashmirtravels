import { NextResponse } from "next/server";
import { z } from "zod";
import { handleError, json } from "@/lib/api";
import { sendOtp, setPendingCookie } from "@/lib/adminOtp";
import { isDemoMode } from "@/lib/demo";
import { OTP_RESEND_COOLDOWN_MS, OTP_TTL_MS } from "@/lib/otp";

const schema = z.object({
  email: z.string().trim().max(200).email("Enter a valid email"),
});

/**
 * Forgot password, step 1. The response is the same whether or not the email
 * belongs to an admin, so it can't be used to discover the admin address.
 * The code is sent to the address stored on the admin record.
 */
export async function POST(request: Request) {
  try {
    if (isDemoMode()) return json({ error: "Not available in demo mode" }, 400);
    const email = schema.parse(await request.json()).email.toLowerCase();

    const sent = await sendOtp(email, "reset", { reuseActive: true });
    if (!sent.ok && sent.reason === "failed") {
      return json({ error: "We couldn't send the code. Please try again shortly." }, 502);
    }

    const now = Date.now();
    const response = NextResponse.json({
      ok: true,
      expiresAt: sent.ok ? sent.expiresAt : now + OTP_TTL_MS,
      resendAt: sent.ok ? sent.resendAt : now + OTP_RESEND_COOLDOWN_MS,
    });
    await setPendingCookie(response, email, "otp-reset");
    return response;
  } catch (error) {
    return handleError(error);
  }
}
