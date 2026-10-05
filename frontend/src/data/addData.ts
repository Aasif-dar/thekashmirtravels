// TEMPORARY UI DATA
// Replace with real backend/admin data later.
//
// Fictional filler so the website has content in sections that don't have a
// backend yet: Experiences, Testimonials, Gallery and FAQs. It is shown on the
// real website, in development and production alike.
//
// Destinations and Journeys are NOT here: they come only from MongoDB, and show
// their empty states when the database has none.
//
// To remove: delete this file, then replace the `dummy*` references in
// experiences.ts and site.ts (an empty array `[]` shows each empty state).

import { images, type SiteImage } from "./images";
import type { Experience } from "./experiences";
import type { Faq, Testimonial } from "./site";

// ---------------------------------------------------------------- EXPERIENCES
// Uses only the fields on the Experience type: title, description, image.
// Images come from the local registry (public/images/kashmir/).
export const dummyExperiences: Experience[] = [
  {
    title: "Shikara Ride on Dal Lake",
    description:
      "Glide across still water at first light, past floating gardens and lotus beds, as the lake slowly wakes up around you.",
    image: images.shikara,
  },
  {
    title: "Gulmarg Gondola Experience",
    description:
      "Ride one of the world's highest cable cars up toward Apharwat Peak, with wide views over snow and pine forest.",
    image: images.gulmargGondola,
  },
  {
    title: "Pahalgam Valley Exploration",
    description:
      "Walk or ride through Aru and Betaab valleys, where the Lidder river runs clear beside meadows and quiet villages.",
    image: images.aruValley,
  },
  {
    title: "Kashmiri Wazwan Experience",
    description:
      "A slow, shared, multi-course feast in the traditional style — rich, fragrant and meant to be lingered over.",
    image: images.wazwan,
  },
  {
    title: "Mughal Gardens & Heritage Walk",
    description:
      "Wander the terraced gardens of Nishat Bagh and the lanes of the old city, with stories of the valley's Mughal past.",
    image: images.mughalGarden,
  },
  {
    title: "Traditional Kashmiri Handicraft Experience",
    description:
      "Meet the artisans behind pashmina, papier-mâché and walnut-wood carving, and see how each piece is made by hand.",
    image: images.pashmina,
  },
];

// --------------------------------------------------------------- TESTIMONIALS
// Fictional names. The Testimonial type has no rating or image field, so none
// are included here.
export const dummyTestimonials: Testimonial[] = [
  {
    quote:
      "The itinerary never felt rushed. We had time to sit by the lake and still saw more than we'd planned.",
    name: "Ananya & Rohan Verma",
    location: "Pune",
  },
  {
    quote:
      "Our host knew exactly when to suggest something and when to leave us alone. It felt personal, not packaged.",
    name: "Meera Iyer",
    location: "Chennai",
  },
  {
    quote:
      "Travelling with two children can be stressful. Every transfer and stay was sorted before we even asked.",
    name: "The Kapoor Family",
    location: "Jaipur",
  },
  {
    quote:
      "We went in winter for the snow and came back talking about the food and the people just as much.",
    name: "Imran Qureshi",
    location: "Hyderabad",
  },
  {
    quote:
      "A calm, well-organised trip with honest advice. The houseboat evenings were the highlight of our honeymoon.",
    name: "Tara & Dev Malhotra",
    location: "Delhi",
  },
  {
    quote:
      "As a solo traveller I felt looked after the whole way. Great suggestions for places I'd never have found alone.",
    name: "Sofia Almeida",
    location: "Mumbai",
  },
];

// -------------------------------------------------------------------- GALLERY
// 12 images from the existing local registry — nothing new is downloaded or
// generated. The first nine match the order of the current gallery.
export const dummyGallery: SiteImage[] = [
  images.dalLakeChinarIslands,
  images.gulmargSnow,
  images.srinagarMosque,
  images.betaabValley,
  images.houseboat,
  images.thajiwasGlacier,
  images.chinarSquare,
  images.flowerSeller,
  images.mughalGarden,
  images.saffron,
  images.gurezAlt,
  images.gulmargGondola,
];

// ------------------------------------------------------------------------ FAQS
// The Faq type exists in site.ts, but no page displays FAQs yet, so this is
// inert until a component renders `site.faqs`.
export const dummyFaqs: Faq[] = [
  {
    question: "When is the best time to visit Kashmir?",
    answer:
      "April to October suits gardens, lakes and meadows; December to February is for snow and skiing in Gulmarg.",
  },
  {
    question: "How far ahead should I plan my trip?",
    answer:
      "A few weeks ahead is comfortable for most journeys, and longer for peak seasons or houseboat stays.",
  },
  {
    question: "Can a journey be customised?",
    answer:
      "Yes. Use the Plan Your Trip form to tell us your dates, interests and budget, and we'll shape the itinerary around you.",
  },
  {
    question: "Do you arrange airport pickup?",
    answer:
      "Airport pickup and drop are part of our journeys; the details of each stay are confirmed when you book.",
  },
  {
    question: "What should I pack?",
    answer:
      "Comfortable walking shoes year-round, light layers in summer and proper winter clothing from November to March.",
  },
  {
    question: "Are permits needed for every destination?",
    answer:
      "Most places need none, but a few remote valleys do. We arrange any required permits in advance.",
  },
];
