import { destinationRepo, journeyRepo, requestRepo } from "@/lib/repo";

export type { AdminRequest } from "@/lib/types";

// Admin reads go straight to the data store (no bundled-data fallback) so the
// panel never shows records that can't actually be edited.

export const adminListDestinations = () => destinationRepo.list();
export const adminGetDestination = (slug: string) => destinationRepo.get(slug);
export const adminListJourneys = () => journeyRepo.list();
export const adminGetJourney = (slug: string) => journeyRepo.get(slug);
export const adminListRequests = () => requestRepo.list();
