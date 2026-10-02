import { createHash } from "node:crypto";
import { handleError, json, requireAdmin } from "@/lib/api";
import { isDemoMode } from "@/lib/demo";

// Returns a short-lived signed payload so the browser can upload straight to
// Cloudinary (bypasses Vercel's 4.5MB request body limit). Only the resulting
// URL is stored in the database.
export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    // Demo mode skips Cloudinary; the admin UI stores pasted URLs / local images.
    if (isDemoMode()) return json({ demo: true });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return json({ error: "Cloudinary is not configured" }, 500);
    }

    const folder = "thekashmirtravels";
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    return json({ cloudName, apiKey, folder, timestamp, signature });
  } catch (error) {
    return handleError(error);
  }
}
