export interface ImageRef {
  src: string;
  alt: string;
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string; // paragraphs separated by a blank line
  country: string;
  region: string;
  coverImage: ImageRef;
  galleryImages: ImageRef[];
  highlights: string[];
  featured: boolean;
}

export interface JourneyDay {
  day: string;
  title: string;
  location: string;
  description: string;
  stay?: string;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  description: string;
  price?: number; // INR, per person
  duration: string;
  forWhom: string;
  destinations: string[]; // destination slugs, in route order
  itinerary: JourneyDay[];
  inclusions: string[];
  exclusions: string[];
  goodToKnow: string[];
  coverImage: ImageRef;
  heroImage?: ImageRef;
  images: ImageRef[];
  featured: boolean;
}

export type DestinationInput = Omit<Destination, "id">;
export type JourneyInput = Omit<Journey, "id">;

/** A booking / custom-trip request as shown in the admin. */
export interface AdminRequest {
  id: string;
  type: "booking" | "custom";
  name: string;
  phone: string;
  email: string;
  travellers: number;
  notes: string;
  journey?: string; // journey title
  travelDate?: string;
  destinations: string[]; // destination titles
  travelDates?: string;
  tripLength?: string;
  budget?: string;
  emailSent: boolean;
  createdAt: string;
}

export interface NewRequest {
  type: "booking" | "custom";
  name: string;
  phone: string;
  email: string;
  travellers: number;
  notes: string;
  journey?: { slug: string; title: string; duration?: string; price?: number };
  travelDate?: string;
  destinations: { slug: string; title: string }[];
  travelDates?: string;
  tripLength?: string;
  budget?: string;
  ipHash: string;
}
