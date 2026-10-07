import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { handleError, json } from "@/lib/api";
import { clearPendingCookie } from "@/lib/adminOtp";
import { AUTH_COOKIE, PENDING_COOKIE, readPendingToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { passwordProblem } from "@/lib/passwordRules";
import { AdminModel } from "@/models/Admin";

const schema = z.object({
  password: z.string().max(200),
  confirmPassword: z.string().max(200),
});

const RESTART = "Your reset session has expired. Please start again.";

/**
 * Forgot password, step 3: only works with the "reset-granted" cookie that
 * /api/auth/otp/verify issues after a correct reset code.
 */
export async function POST(request: Request) {
  try {
    if (isDemoMode()) return json({ error: "Not available in demo mode" }, 400);
    const pending = await readPendingToken(
      (await cookies()).get(PENDING_COOKIE)?.value,
      ["reset-granted"]
    );
    if (!pending) return json({ error: RESTART, restart: true }, 401);

    const { password, confirmPassword } = schema.parse(await request.json());
    const problem = passwordProblem(password);
    if (problem) return json({ error: problem }, 400);
    if (password !== confirmPassword) {
      return json({ error: "The passwords do not match." }, 400);
    }

    await connectDb();
    const updated = await AdminModel.updateOne(
      { email: pending.email },
      {
        $set: {
          passwordHash: await bcrypt.hash(password, 10),
          // Revokes every session issued before now (see lib/session.ts).
          passwordChangedAt: new Date(),
          otpAttempts: 0,
        },
        $unset: { otpHash: 1, otpPurpose: 1, otpExpiresAt: 1 },
      }
    );
    if (updated.matchedCount !== 1) return json({ error: RESTART, restart: true }, 401);

    const response = NextResponse.json({ ok: true });
    clearPendingCookie(response);
    response.cookies.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    return handleError(error);
  }
}
