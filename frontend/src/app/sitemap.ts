import type { MetadataRoute } from "next";
import {
  getDestinationSitemapEntries,
  getJourneySitemapEntries,
} from "@/lib/queries";
import type { SitemapEntry } from "@/lib/types";
import { site } from "@/data/site";

// Same cadence as the destination and journey pages it lists.
export const revalidate = 3600;

const url = (path: string) => `${site.url}${path}`;

/** A listing page last changed when its most recently edited item did. */
function latest(entries: SitemapEntry[]) {
  const times = entries.flatMap((entry) =>
    entry.updatedAt ? [new Date(entry.updatedAt).getTime()] : []
  );
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, journeys] = await Promise.all([
    getDestinationSitemapEntries(),
    getJourneySitemapEntries(),
  ]);

  // These pages have no stored edit date, so they carry no lastModified.
  const staticRoutes = [
    "",
    "/experiences",
    "/about",
    "/plan-trip",
    "/contact",
  ].map((path) => ({ url: url(path) }));

  const destinationRoutes = destinations.map(({ slug, updatedAt }) => ({
    url: url(`/destinations/${slug}`),
    lastModified: updatedAt,
  }));

  const journeyRoutes = journeys.map(({ slug, updatedAt }) => ({
    url: url(`/journeys/${slug}`),
    lastModified: updatedAt,
  }));

  return [
    ...staticRoutes,
    { url: url("/destinations"), lastModified: latest(destinations) },
    { url: url("/journeys"), lastModified: latest(journeys) },
    ...destinationRoutes,
    ...journeyRoutes,
  ];
}
