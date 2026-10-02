// Demo mode: run the site and admin with no MongoDB, Cloudinary or Gmail.
// Local development only — this module is the single guard for it.

export const DEMO_EMAIL = "demo@admin.local";
export const DEMO_PASSWORD = "demo1234";

/** Only used to sign demo-mode cookies; isDemoMode() is false in production. */
export const DEMO_JWT_SECRET = "demo-mode-local-only-not-a-secret";

let warned = false;

/**
 * True only when ALL hold: DEMO_MODE=true, MONGODB_URI is unset, NODE_ENV is
 * not "production" and the app is not running on Vercel. In production or on
 * Vercel DEMO_MODE is ignored entirely, so a leaked variable can't open the
 * admin or swap the data store.
 */
export function isDemoMode() {
  if (process.env.DEMO_MODE !== "true") return false;

  const blockers: string[] = [];
  if (process.env.NODE_ENV === "production") blockers.push("NODE_ENV is production");
  if (process.env.VERCEL) blockers.push("VERCEL is set");
  if (process.env.MONGODB_URI) blockers.push("MONGODB_URI is set");

  if (blockers.length) {
    if (!warned) {
      warned = true;
      console.warn(
        `[demo] DEMO_MODE=true but demo mode is OFF because: ${blockers.join(", ")}.`
      );
    }
    return false;
  }

  return true;
}
