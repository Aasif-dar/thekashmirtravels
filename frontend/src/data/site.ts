import { images, type SiteImage } from "./images";

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
  brandName: "The Kashmir Travels",
  logo: { text: "The Kashmir Travels" },
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
      "The Kashmir Travels is a locally based team planning personal journeys through the valley — beyond the standard itinerary.",
  },
  gallery: {
    eyebrow: "A Visual Kashmir",
    title: "Notes from the Valley",
    photos: [
      images.dalLakeChinarIslands,
      images.gulmargSnow,
      images.srinagarMosque,
      images.betaabValley,
      images.houseboat,
      images.thajiwasGlacier,
      images.chinarSquare,
      images.flowerSeller,
      images.mughalGarden,
    ],
  },
  testimonials: [
    {
      quote:
        "The itinerary never felt rushed. They showed us a side of Kashmir we wouldn't have found ourselves.",
      name: "Rahul & Priya",
      location: "Mumbai",
    },
    {
      quote:
        "Our host in Srinagar knew exactly when to suggest something and when to just let us sit by the lake.",
      name: "Aditi Sharma",
      location: "Bengaluru",
    },
    {
      quote:
        "Gurez wasn't even on our radar until they suggested it. It ended up being the best two days of the trip.",
      name: "Farhan Ahmed",
      location: "Delhi",
    },
  ],
  faqs: [],
  finalCta: {
    heading: "Your Kashmir story starts here.",
    body: "Tell us how you want to travel. We'll help shape the rest.",
    image: images.dalLakeWide,
  },
  footer: {
    blurb: "Journeys through Kashmir, planned by people who call the valley home.",
  },
  seo: {
    title: "The Kashmir Travels | Curated Journeys Through Kashmir",
    description:
      "Discover Kashmir through thoughtfully planned journeys, handpicked stays and authentic local experiences across Srinagar, Gulmarg, Pahalgam and beyond.",
    keywords: [
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
