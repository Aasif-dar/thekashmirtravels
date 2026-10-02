import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, SESSION_SECONDS, signToken } from "@/lib/auth";
import { handleError, json } from "@/lib/api";
import { connectDb } from "@/lib/db";
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoMode } from "@/lib/demo";
import { loginSchema } from "@/lib/validation";
import { AdminModel } from "@/models/Admin";

// Valid bcrypt hash of a random string, compared against when the email is
// unknown so response time doesn't reveal which emails exist.
const DUMMY_HASH =
  "$2b$10$QM.OqmBPP6/2/aQVd6wziO/i7/NyrYCx7PIsxru8xBp3WFg7KFpx2";

async function authenticate(email: string, password: string) {
  // Demo mode (local dev only — isDemoMode() is false in production):
  // the built-in account replaces the database.
  if (isDemoMode()) {
    return email === DEMO_EMAIL && password === DEMO_PASSWORD ? DEMO_EMAIL : null;
  }

  await connectDb();
  const admin = await AdminModel.findOne({ email }).lean();
  const ok = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  return admin && ok ? admin.email : null;
}

export async function POST(request: Request) {
  try {
    const { email, password } = loginSchema.parse(await request.json());

    const adminEmail = await authenticate(email.trim().toLowerCase(), password);
    if (!adminEmail) {
      return json({ error: "Invalid email or password" }, 401);
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_COOKIE, await signToken(adminEmail), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
}
