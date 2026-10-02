import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demo";

/** Shown only while demo mode is on (local development). */
export default function DemoBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "bg-gold/90 px-6 py-1.5 text-center text-xs text-charcoal"
          : "mb-6 border border-gold bg-gold/15 p-3 text-xs text-charcoal"
      }
    >
      <strong>Demo mode</strong> — no database, uploads or email. Data is
      in-memory and resets when the dev server restarts. Login:{" "}
      <code>{DEMO_EMAIL}</code> / <code>{DEMO_PASSWORD}</code>
    </div>
  );
}
