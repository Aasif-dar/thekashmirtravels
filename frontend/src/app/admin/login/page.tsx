import { Suspense } from "react";
import DemoBanner from "@/components/admin/DemoBanner";
import LoginForm from "@/components/admin/LoginForm";
import { isDemoMode } from "@/lib/demo";

// Read per request so the demo banner reflects the current environment.
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const demo = isDemoMode();

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm border border-charcoal/15 bg-white/70 p-8">
        {demo && <DemoBanner />}
        {/* LoginForm renders the heading for each step (sign in, code, reset). */}
        <Suspense fallback={null}>
          <LoginForm demo={demo} />
        </Suspense>
      </div>
    </main>
  );
}
