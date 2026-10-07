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

// ---------------------------------------------------------------------------
// Pending-verification cookie. Remembers WHICH admin passed the password check
// (or asked for a reset) while they enter the emailed code, so the OTP steps
// never trust an email address sent by the browser. It carries no admin role,
// so it can never be used as a session.

export const PENDING_COOKIE = "admin_pending";
export const PENDING_COOKIE_PATH = "/api/auth";
export const PENDING_SECONDS = 15 * 60;

export type PendingPurpose = "otp-login" | "otp-reset" | "reset-granted";

export async function signPendingToken(email: string, purpose: PendingPurpose) {
  return new SignJWT({ purpose })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${PENDING_SECONDS}s`)
    .sign(secretKey());
}

/** The admin email the pending cookie was issued for, if it has that purpose. */
export async function readPendingToken(
  token: string | undefined,
  purposes: PendingPurpose[]
): Promise<{ email: string; purpose: PendingPurpose } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    const purpose = payload.purpose as PendingPurpose;
    if (!payload.sub || payload.role || !purposes.includes(purpose)) return null;
    return { email: payload.sub, purpose };
  } catch {
    return null;
  }
}

/** Decoded session token (email + issued-at seconds), or null. */
export async function readSessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    if (payload.role !== "admin" || !payload.sub) return null;
    return { email: payload.sub, iat: payload.iat ?? 0 };
  } catch {
    return null;
  }
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
