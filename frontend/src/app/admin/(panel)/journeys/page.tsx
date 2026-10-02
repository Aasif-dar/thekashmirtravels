import Link from "next/link";
import { adminListJourneys } from "@/lib/adminQueries";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/ui";
import type { Journey } from "@/lib/types";

export default async function AdminJourneysPage() {
  let journeys: Journey[] = [];
  let error = "";
  try {
    journeys = await adminListJourneys();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load journeys";
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Journeys</h1>
        <Link href="/admin/journeys/new" className={buttonClass}>
          New journey
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-burgundy">{error}</p>}

      <div className="mt-8 overflow-x-auto border border-charcoal/15 bg-white/60">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/15 text-[12px] tracking-[0.1em] text-charcoal/60 uppercase">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Price</th>
              <th className="p-3">Featured</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey) => (
              <tr key={journey.id} className="border-b border-charcoal/10 last:border-0">
                <td className="p-3">
                  <span className="font-medium">{journey.title}</span>
                  <span className="block text-xs text-charcoal/50">{journey.slug}</span>
                </td>
                <td className="p-3 text-charcoal/60">{journey.duration}</td>
                <td className="p-3 text-charcoal/60">
                  {journey.price ? `₹${journey.price.toLocaleString("en-IN")}` : "On request"}
                </td>
                <td className="p-3">{journey.featured ? "Yes" : "—"}</td>
                <td className="flex justify-end gap-4 p-3">
                  <Link
                    href={`/admin/journeys/${journey.slug}`}
                    className="text-sm text-deep-green hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    url={`/api/journeys/${journey.slug}`}
                    name={journey.title}
                  />
                </td>
              </tr>
            ))}
            {!journeys.length && !error && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-charcoal/50">
                  No journeys yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
