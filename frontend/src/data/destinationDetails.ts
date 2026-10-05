import { images } from "./images";

export type DestinationDetail = {
  slug: string;
  name: string;
  tagline: string;
  paragraphs: string[];
  highlights: string[];
  heroImage: (typeof images)[keyof typeof images];
  secondaryImage: (typeof images)[keyof typeof images];
};

// ADMIN: destination detail content now comes from the backend (see ADMIN_DATA_GUIDE.md).
// No sample records ship with the project.
export const destinationDetails: DestinationDetail[] = [];
