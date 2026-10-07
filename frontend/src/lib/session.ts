import { cookies } from "next/headers";
import { AUTH_COOKIE, readSessionToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { AdminModel } from "@/models/Admin";

/**
 * Full session check used by route handlers (requireAdmin) and the admin
 * layout: a valid admin JWT AND the admin still exists AND the token was
 * issued after the last password change. proxy.ts stays a fast JWT-only gate.
 * Fails closed: if the database can't be reached, the session is rejected.
 */
export async function isAdminSession() {
  const session = await readSessionToken((await cookies()).get(AUTH_COOKIE)?.value);
  if (!session) return false;
  if (isDemoMode()) return true; // demo mode has no admin records

  try {
    await connectDb();
    const admin = await AdminModel.findOne(
      { email: session.email },
      { passwordChangedAt: 1 }
    ).lean();
    if (!admin) return false;
    const changedAt = admin.passwordChangedAt?.getTime();
    return !changedAt || session.iat >= Math.floor(changedAt / 1000);
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
}
