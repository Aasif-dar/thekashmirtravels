import bcrypt from "bcryptjs";
import { z } from "zod";
import { getAdminEmail } from "@/lib/auth";
import { handleError, json, requireAdmin } from "@/lib/api";
import { connectDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { AdminModel } from "@/models/Admin";

const schema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8, "At least 8 characters").max(200),
});

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    if (isDemoMode()) {
      return json({ error: "Not available in demo mode (the demo account is built in)" }, 400);
    }
    const { currentPassword, newPassword } = schema.parse(await request.json());
    const email = await getAdminEmail();
    if (!email) return json({ error: "Unauthorized" }, 401);

    await connectDb();
    const admin = await AdminModel.findOne({ email });
    if (!admin || !(await bcrypt.compare(currentPassword, admin.passwordHash))) {
      return json({ error: "Current password is incorrect" }, 403);
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    await admin.save();
    return json({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}
