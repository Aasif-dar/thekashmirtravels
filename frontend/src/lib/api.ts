import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { isAdminSession } from "@/lib/session";

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

export const publicJson = (data: unknown) =>
  NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });

/**
 * Second line of defence behind proxy.ts — returns a 401 response or null.
 * Also rejects sessions issued before the admin's last password change.
 */
export async function requireAdmin() {
  return (await isAdminSession()) ? null : json({ error: "Unauthorized" }, 401);
}

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return json(
      {
        error: "Validation failed",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      400
    );
  }
  if (error instanceof SyntaxError) return json({ error: "Invalid JSON" }, 400);
  if ((error as { code?: number })?.code === 11000) {
    return json({ error: "A record with this slug already exists" }, 409);
  }
  console.error(error);
  return json({ error: "Internal server error" }, 500);
}

export function revalidateSite() {
  revalidatePath("/", "layout");
}
