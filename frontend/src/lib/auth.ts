import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { DEMO_JWT_SECRET, isDemoMode } from "@/lib/demo";

export const AUTH_COOKIE = "admin_token";
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secretKey() {
  // The fixed demo secret is only usable when isDemoMode() (local dev only).
  const secret =
    process.env.JWT_SECRET || (isDemoMode() ? DEMO_JWT_SECRET : undefined);
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET must be set (at least 16 characters)");
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(email: string) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secretKey());
}

export async function verifyToken(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(AUTH_COOKIE)?.value);
}

/** Email of the signed-in admin, or null. */
export async function getAdminEmail() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return payload.role === "admin" ? (payload.sub ?? null) : null;
  } catch {
    return null;
  }
}
