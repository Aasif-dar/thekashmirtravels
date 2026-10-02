import Link from "next/link";
import DemoBanner from "@/components/admin/DemoBanner";
import { DemoProvider } from "@/components/admin/DemoContext";
import LogoutButton from "@/components/admin/LogoutButton";
import { isDemoMode } from "@/lib/demo";

// Admin data must always be fresh and per-request.
export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demo = isDemoMode();

  return (
    <DemoProvider demo={demo}>
      {demo && <DemoBanner compact />}
      <header className="bg-deep-green text-ivory">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/admin" className="font-serif text-lg">
              Admin
            </Link>
            <Link href="/admin/destinations" className="text-ivory/80 hover:text-ivory">
              Destinations
            </Link>
            <Link href="/admin/journeys" className="text-ivory/80 hover:text-ivory">
              Journeys
            </Link>
            <Link href="/admin/requests" className="text-ivory/80 hover:text-ivory">
              Requests
            </Link>
          </nav>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" target="_blank" className="text-ivory/70 hover:text-ivory">
              View site
            </Link>
            <Link href="/admin/account" className="text-ivory/70 hover:text-ivory">
              Password
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </DemoProvider>
  );
}
