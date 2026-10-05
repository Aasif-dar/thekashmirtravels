import { hasDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { destinationRepo, journeyRepo } from "@/lib/repo";
import type { Destination, Journey } from "@/lib/types";

// ADMIN: the public site renders whatever these return. Destinations and
// journeys are managed in /admin; see ADMIN_DATA_GUIDE.md for the fields.

/**
 * Public reads. They go to MongoDB (or the in-memory store in demo mode). If
 * the database isn't configured or can't be reached, they return an empty
 * result — the UI then shows its empty states; no sample data is substituted.
 */
async function read<T>(query: () => Promise<T>, empty: T): Promise<T> {
  if (isDemoMode()) return query();
  if (!hasDb()) return empty;
  try {
    return await query();
  } catch (error) {
    console.error("DB read failed, rendering empty state:", error);
    return empty;
  }
}

export function getDestinations(options: { featured?: boolean } = {}) {
  return read<Destination[]>(() => destinationRepo.list(options), []);
}

export function getDestinationBySlug(slug: string) {
  return read<Destination | null>(() => destinationRepo.get(slug), null);
}

export function getJourneys(options: { featured?: boolean } = {}) {
  return read<Journey[]>(() => journeyRepo.list(options), []);
}

export function getJourneyBySlug(slug: string) {
  return read<Journey | null>(() => journeyRepo.get(slug), null);
}

/** Display names for a journey's linked destination slugs, in route order. */
export function routeNames(journey: Journey, destinations: Destination[]) {
  return journey.destinations.map(
    (slug) =>
      destinations.find((d) => d.slug === slug)?.title ??
      slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
  );
}
