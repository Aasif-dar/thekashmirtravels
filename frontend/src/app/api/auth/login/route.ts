import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { handleError, json } from "@/lib/api";
import {
  seconds,
  sendOtp,
  setPendingCookie,
  setSessionCookie,
} from "@/lib/adminOtp";
import { connectDb } from "@/lib/db";
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoMode } from "@/lib/demo";
import { loginSchema } from "@/lib/validation";
import { AdminModel } from "@/models/Admin";

// Valid bcrypt hash of a random string, compared against when the email is
// unknown so response time doesn't reveal which emails exist.
const DUMMY_HASH =
  "$2b$10$QM.OqmBPP6/2/aQVd6wziO/i7/NyrYCx7PIsxru8xBp3WFg7KFpx2";

async function authenticate(email: string, password: string) {
  await connectDb();
  const admin = await AdminModel.findOne({ email }).lean();
  const ok = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  return admin && ok ? admin.email : null;
}

/**
 * Step 1 of 2: email + password. On success an OTP is emailed to the address
 * on the admin record and a short-lived pending cookie is set; the session
 * cookie is only issued by /api/auth/otp/verify.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = loginSchema.parse(await request.json());
    const normalized = email.trim().toLowerCase();

    // Demo mode (local dev only — isDemoMode() is false in production) has no
    // database or email, so the built-in account signs in directly.
    if (isDemoMode()) {
      if (normalized !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        return json({ error: "Invalid email or password" }, 401);
      }
      const response = NextResponse.json({ ok: true });
      await setSessionCookie(response, DEMO_EMAIL);
      return response;
    }

    const adminEmail = await authenticate(normalized, password);
    if (!adminEmail) {
      return json({ error: "Invalid email or password" }, 401);
    }

    const sent = await sendOtp(adminEmail, "login", { reuseActive: true });
    if (!sent.ok) {
      if (sent.reason === "throttled") {
        return json(
          {
            error: `Too many codes requested. Please try again in ${Math.ceil(
              seconds(sent.retryAfterMs) / 60
            )} minute(s).`,
            retryAfter: seconds(sent.retryAfterMs),
          },
          429
        );
      }
      return json(
        { error: "We couldn't send your verification code. Please try again shortly." },
        502
      );
    }

    const response = NextResponse.json({
      otpRequired: true,
      expiresAt: sent.expiresAt,
      resendAt: sent.resendAt,
    });
    await setPendingCookie(response, adminEmail, "otp-login");
    return response;
  } catch (error) {
    return handleError(error);
  }
}
