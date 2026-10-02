import { destinations as legacyDestinations } from "@/data/destinations";
import { destinationDetails } from "@/data/destinationDetails";
import { journeys as legacyJourneys } from "@/data/journeys";
import type { DestinationInput, JourneyInput } from "@/lib/types";

/**
 * The original hardcoded destinations/journeys, mapped to the DB shape.
 * Used by the seed script, and as a fallback when the DB is not configured
 * or unreachable (e.g. a local build without MONGODB_URI).
 */
export const seedDestinations: DestinationInput[] = legacyDestinations.map(
  (destination) => {
    const detail = destinationDetails.find((d) => d.slug === destination.slug);
    return {
      slug: destination.slug,
      title: destination.name,
      tagline: destination.tagline,
      description: detail
        ? detail.paragraphs.join("\n\n")
        : destination.description,
      country: "India",
      region: "Kashmir",
      coverImage: { src: destination.image.src, alt: destination.image.alt },
      galleryImages: detail
        ? [detail.heroImage, detail.secondaryImage].map((image) => ({
            src: image.src,
            alt: image.alt,
          }))
        : [],
      highlights: detail?.highlights ?? [],
      featured: true,
    };
  }
);

export const seedJourneys: JourneyInput[] = legacyJourneys.map((journey) => ({
  slug: journey.slug,
  title: journey.title,
  description: journey.summary,
  duration: journey.duration,
  forWhom: journey.forWhom,
  destinations: journey.route.map((name) => name.toLowerCase()),
  itinerary: journey.days.map((day) => ({ ...day })),
  inclusions: journey.included,
  exclusions: journey.notIncluded,
  goodToKnow: journey.goodToKnow,
  coverImage: { src: journey.cardImage.src, alt: journey.cardImage.alt },
  heroImage: { src: journey.heroImage.src, alt: journey.heroImage.alt },
  images: [],
  featured: true,
}));
