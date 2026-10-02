import { hasDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { destinationRepo, journeyRepo } from "@/lib/repo";
import { seedDestinations, seedJourneys } from "@/lib/seedData";
import type { Destination, Journey } from "@/lib/types";

const withFallbackIds = <T extends { slug: string }>(items: T[]) =>
  items.map((item) => ({ id: item.slug, ...item }));

/**
 * Public reads. In demo mode they hit the demo store; otherwise MongoDB, and
 * if the DB isn't configured or is unreachable, the bundled seed data so the
 * public site keeps working.
 */
async function read<T>(query: () => Promise<T>, fallback: () => T): Promise<T> {
  if (isDemoMode()) return query();
  if (!hasDb()) return fallback();
  try {
    return await query();
  } catch (error) {
    console.error("DB read failed, using bundled data:", error);
    return fallback();
  }
}

export function getDestinations(options: { featured?: boolean } = {}) {
  return read<Destination[]>(
    () => destinationRepo.list(options),
    () => withFallbackIds(seedDestinations)
  );
}

export function getDestinationBySlug(slug: string) {
  return read<Destination | null>(
    () => destinationRepo.get(slug),
    () => withFallbackIds(seedDestinations).find((d) => d.slug === slug) ?? null
  );
}

export function getJourneys(options: { featured?: boolean } = {}) {
  return read<Journey[]>(
    () => journeyRepo.list(options),
    () => withFallbackIds(seedJourneys)
  );
}

export function getJourneyBySlug(slug: string) {
  return read<Journey | null>(
    () => journeyRepo.get(slug),
    () => withFallbackIds(seedJourneys).find((j) => j.slug === slug) ?? null
  );
}

/** Display names for a journey's linked destination slugs, in route order. */
export function routeNames(journey: Journey, destinations: Destination[]) {
  return journey.destinations.map(
    (slug) =>
      destinations.find((d) => d.slug === slug)?.title ??
      slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
  );
}
