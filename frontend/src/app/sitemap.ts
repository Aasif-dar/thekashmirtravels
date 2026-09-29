import type { MetadataRoute } from "next";
import { journeys } from "@/data/journeys";

const siteUrl = "https://thekashmirtravels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/journeys",
    "/destinations",
    "/experiences",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const journeyRoutes = journeys.map((journey) => ({
    url: `${siteUrl}/journeys/${journey.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...journeyRoutes];
}
