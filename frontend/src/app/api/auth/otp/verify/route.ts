import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { handleError, json } from "@/lib/api";
import {
  clearPendingCookie,
  setPendingCookie,
  setSessionCookie,
  verifyOtp,
} from "@/lib/adminOtp";
import { PENDING_COOKIE, readPendingToken } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";

const schema = z.object({
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

const EXPIRED = "Your verification code has expired. Please request a new code.";
const RESTART = "Your verification session has expired. Please start again.";

/**
 * Step 2: the emailed code. Login purpose → issues the normal session cookie.
 * Reset purpose → unlocks /api/auth/reset for a few minutes.
 */
export async function POST(request: Request) {
  try {
    if (isDemoMode()) return json({ error: "Not available in demo mode" }, 400);
    const { code } = schema.parse(await request.json());

    const pending = await readPendingToken(
      (await cookies()).get(PENDING_COOKIE)?.value,
      ["otp-login", "otp-reset"]
    );
    if (!pending) return json({ error: RESTART, restart: true }, 401);

    const purpose = pending.purpose === "otp-login" ? "login" : "reset";
    const result = await verifyOtp(pending.email, purpose, code);

    if (result.status === "ok") {
      const response = NextResponse.json({
        ok: true,
        next: purpose === "login" ? "admin" : "reset",
      });
      if (purpose === "login") {
        clearPendingCookie(response);
        await setSessionCookie(response, pending.email);
      } else {
        await setPendingCookie(response, pending.email, "reset-granted");
      }
      return response;
    }

    if (result.status === "expired") {
      return json({ error: EXPIRED, code: "expired" }, 400);
    }
    if (result.status === "locked") {
      return json(
        { error: "Too many incorrect attempts. Please request a new code.", code: "locked" },
        429
      );
    }
    // Reset codes don't reveal the attempt count (the email may not be an admin).
    if (result.status === "wrong" && purpose === "login") {
      const left = result.attemptsLeft;
      return json(
        { error: `That code is incorrect. ${left} attempt${left === 1 ? "" : "s"} left.` },
        400
      );
    }
    return json(
      { error: "That code is incorrect. Please check it or request a new code." },
      400
    );
  } catch (error) {
    return handleError(error);
  }
}
