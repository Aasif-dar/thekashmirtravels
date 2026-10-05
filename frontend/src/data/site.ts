import { images, type SiteImage } from "./images";
// TEMPORARY UI DATA — see addData.ts. Replace with real backend/admin data later.
// To remove: delete addData.ts and the four dummy* lines below.
import { dummyFaqs, dummyGallery, dummyTestimonials } from "./addData";

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SiteConfig {
  url: string;
  brandName: string;
  logo: { text: string; image?: SiteImage };
  tagline: string;
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    image: SiteImage;
    ctaLabel: string;
    secondaryCtaLabel: string;
  };
  intro: { heading: string; body: string; highlights: string[] };
  about: { description: string };
  gallery: { eyebrow: string; title: string; photos: SiteImage[] };
  testimonials: Testimonial[];
  faqs: Faq[];
  finalCta: { heading: string; body: string; image: SiteImage };
  footer: { blurb: string };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: { url: string; width: number; height: number; alt: string };
  };
}

export const site: SiteConfig = {
  url: "https://thekashmirtravels.com",
  brandName: "Fastpacker",
  logo: { text: "Fastpacker" },
  tagline: "Curated Journeys Through Kashmir",
  hero: {
    eyebrow: "Kashmir • India",
    heading: "Some journeys stay with you.",
    subheading:
      "Discover Kashmir through thoughtfully planned journeys, local experiences and stays chosen by people who know the valley.",
    image: images.hero,
    ctaLabel: "Plan Your Journey",
    secondaryCtaLabel: "Explore Kashmir",
  },
  intro: {
    heading: "Not just a trip to Kashmir.",
    body: "We design journeys around the way you want to experience the valley — from quiet mornings on Dal Lake to snow-covered Gulmarg and slow evenings beside the Lidder.",
    highlights: ["Locally based", "Personally planned"],
  },
  about: {
    description:
      "Fastpacker is a locally based team planning personal journeys through the valley — beyond the standard itinerary.",
  },
  gallery: {
    eyebrow: "A Visual Kashmir",
    title: "Notes from the Valley",
    photos: dummyGallery, // TEMPORARY UI DATA
  },
  // ADMIN: real traveler testimonials (customerName, customerLocation, review,
  // rating, customerImage, published, sortOrder) go here or come from the backend.
  testimonials: dummyTestimonials, // TEMPORARY UI DATA
  faqs: dummyFaqs, // TEMPORARY UI DATA
  finalCta: {
    heading: "Your Kashmir story starts here.",
    body: "Tell us how you want to travel. We'll help shape the rest.",
    image: images.dalLakeWide,
  },
  footer: {
    blurb: "Journeys through Kashmir, planned by people who call the valley home.",
  },
  seo: {
    title: "Fastpacker | Kashmir Travel & Tours",
    description:
      "Fastpacker is a Kashmir-based tour and travel company. Discover Kashmir through thoughtfully planned journeys, handpicked stays and authentic local experiences across Srinagar, Gulmarg, Pahalgam and beyond.",
    keywords: [
      "Fastpacker",
      "Kashmir travel",
      "Kashmir tour package",
      "Srinagar houseboat",
      "Gulmarg tour",
      "Pahalgam tour",
      "Kashmir honeymoon package",
    ],
    ogImage: {
      url: "/images/kashmir/hero-dal-sunset.jpg",
      width: 1920,
      height: 1281,
      alt: "Sunset over Dal Lake, Srinagar",
    },
  },
};
