import Link from "next/link";
import { adminListDestinations } from "@/lib/adminQueries";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/ui";
import type { Destination } from "@/lib/types";

export default async function AdminDestinationsPage() {
  let destinations: Destination[] = [];
  let error = "";
  try {
    destinations = await adminListDestinations();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load destinations";
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Destinations</h1>
        <Link href="/admin/destinations/new" className={buttonClass}>
          New destination
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-burgundy">{error}</p>}

      <div className="mt-8 overflow-x-auto border border-charcoal/15 bg-white/60">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/15 text-[12px] tracking-[0.1em] text-charcoal/60 uppercase">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Region</th>
              <th className="p-3">Featured</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination) => (
              <tr key={destination.id} className="border-b border-charcoal/10 last:border-0">
                <td className="p-3 font-medium">{destination.title}</td>
                <td className="p-3 text-charcoal/60">{destination.slug}</td>
                <td className="p-3 text-charcoal/60">
                  {[destination.region, destination.country].filter(Boolean).join(", ")}
                </td>
                <td className="p-3">{destination.featured ? "Yes" : "—"}</td>
                <td className="flex justify-end gap-4 p-3">
                  <Link
                    href={`/admin/destinations/${destination.slug}`}
                    className="text-sm text-deep-green hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    url={`/api/destinations/${destination.slug}`}
                    name={destination.title}
                  />
                </td>
              </tr>
            ))}
            {!destinations.length && !error && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-charcoal/50">
                  No destinations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
