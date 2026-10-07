import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminEmail } from "@/lib/auth";
import { handleError, json, requireAdmin } from "@/lib/api";
import { setSessionCookie } from "@/lib/adminOtp";
import { connectDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { passwordProblem } from "@/lib/passwordRules";
import { AdminModel } from "@/models/Admin";

const schema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().max(200),
});

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    if (isDemoMode()) {
      return json({ error: "Not available in demo mode (the demo account is built in)" }, 400);
    }
    const { currentPassword, newPassword } = schema.parse(await request.json());
    const problem = passwordProblem(newPassword);
    if (problem) return json({ error: problem }, 400);

    const email = await getAdminEmail();
    if (!email) return json({ error: "Unauthorized" }, 401);

    await connectDb();
    const admin = await AdminModel.findOne({ email });
    if (!admin || !(await bcrypt.compare(currentPassword, admin.passwordHash))) {
      return json({ error: "Current password is incorrect" }, 403);
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    // Signs out every other session; this one gets a fresh cookie below.
    admin.passwordChangedAt = new Date(Date.now() - 1000);
    await admin.save();

    const response = NextResponse.json({ ok: true });
    await setSessionCookie(response, admin.email);
    return response;
  } catch (error) {
    return handleError(error);
  }
}
