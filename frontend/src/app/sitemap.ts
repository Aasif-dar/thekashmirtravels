import type { MetadataRoute } from "next";
import { getDestinations, getJourneys } from "@/lib/queries";
import { site } from "@/data/site";

const siteUrl = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journeys, destinations] = await Promise.all([
    getJourneys(),
    getDestinations(),
  ]);

  const staticRoutes = [
    "",
    "/journeys",
    "/destinations",
    "/experiences",
    "/about",
    "/plan-trip",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const journeyRoutes = journeys.map((journey) => ({
    url: `${siteUrl}/journeys/${journey.slug}`,
    lastModified: new Date(),
  }));

  const destinationRoutes = destinations.map((destination) => ({
    url: `${siteUrl}/destinations/${destination.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...destinationRoutes, ...journeyRoutes];
}
