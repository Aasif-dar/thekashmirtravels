import { images } from "./images";

export type JourneyDay = {
  day: string;
  title: string;
  location: string;
  description: string;
  stay?: string;
};

export type Journey = {
  slug: string;
  title: string;
  duration: string;
  route: string[];
  forWhom: string;
  summary: string;
  heroImage: (typeof images)[keyof typeof images];
  cardImage: (typeof images)[keyof typeof images];
  days: JourneyDay[];
  included: string[];
  notIncluded: string[];
  goodToKnow: string[];
};

// ADMIN: journeys now come from the backend (see ADMIN_DATA_GUIDE.md).
// No sample records ship with the project.
export const journeys: Journey[] = [];

export function getJourneyBySlug(slug: string) {
  return journeys.find((journey) => journey.slug === slug);
}
