import { seedDestinations, seedJourneys } from "@/lib/seedData";
import type {
  AdminRequest,
  Destination,
  DestinationInput,
  Journey,
  JourneyInput,
} from "@/lib/types";

// In-memory data for demo mode. Lives on globalThis so it survives hot
// reloads; it resets whenever the dev server restarts.

export type StoredRequest = AdminRequest & { ipHash: string };

type Store = {
  seq: number;
  destinations: Destination[];
  journeys: Journey[];
  requests: StoredRequest[];
};

const img = (name: string, alt: string) => ({
  src: `/images/kashmir/${name}.jpg`,
  alt,
});

const extraDestinations: DestinationInput[] = [
  {
    slug: "gurez",
    title: "Gurez",
    tagline: "The valley the circuit forgot.",
    description:
      "Gurez sits beyond Razdan Pass, along the Kishanganga river, in a high valley of wooden villages and sharp peaks. It's one of the least-visited corners of Kashmir, and it feels like it.\n\nThe road in is part of the journey — and it's open only from late spring to autumn.",
    country: "India",
    region: "Kashmir",
    coverImage: img("gurez-valley-01", "Kishanganga river winding through Gurez valley"),
    galleryImages: [
      img("gurez-valley-05", "Gurez valley and wooden villages"),
      img("gurez-valley-01", "Gurez valley in summer light"),
    ],
    highlights: [
      "The drive across Razdan Pass",
      "Habba Khatoon peak, seen from the village",
      "Walks along the Kishanganga river",
    ],
    featured: true,
  },
  {
    slug: "doodhpathri",
    title: "Doodhpathri",
    tagline: "The valley of milk.",
    description:
      "Doodhpathri is a wide alpine meadow an hour and a half from Srinagar, ringed by pine forest and cut by a milky-white stream. It's quiet, green and easy to reach — a good day away from the lake.\n\nStay overnight in the village for the meadow before and after the day visitors.",
    country: "India",
    region: "Kashmir",
    coverImage: img("aru-valley", "Open meadow and pine forest near Doodhpathri"),
    galleryImages: [img("betaab-valley", "Pine-lined slopes above the meadow")],
    highlights: [
      "Pony rides across the meadow",
      "The Shaliganga stream",
      "Picnic lunches in the pine forest",
    ],
    featured: false,
  },
];

const day = (
  n: number,
  title: string,
  location: string,
  description: string,
  stay?: string
) => ({ day: `Day ${String(n).padStart(2, "0")}`, title, location, description, stay });

const extraJourneys: JourneyInput[] = [
  {
    slug: "offbeat-gurez-and-doodhpathri",
    title: "Offbeat Gurez & Doodhpathri",
    description:
      "Two quiet corners the usual circuit skips: the alpine meadows of Doodhpathri and the far valley of Gurez, bookended by Dal Lake.",
    price: 38500,
    duration: "5 Nights / 6 Days",
    forWhom: "For repeat visitors and the curious.",
    destinations: ["srinagar", "doodhpathri", "gurez"],
    itinerary: [
      day(1, "Arrive in Srinagar", "Srinagar", "Airport pickup and a houseboat evening on Dal Lake.", "Deluxe houseboat, Dal Lake"),
      day(2, "Doodhpathri", "Doodhpathri", "A slow day in the meadow, with a picnic by the stream.", "Guesthouse, Doodhpathri"),
      day(3, "To Gurez", "Gurez", "Cross Razdan Pass into Gurez.", "Guesthouse, Gurez Valley"),
      day(4, "Gurez", "Gurez", "Walks along the Kishanganga and village visits.", "Guesthouse, Gurez Valley"),
      day(5, "Back to Srinagar", "Srinagar", "A long scenic drive back and a last evening on the lake.", "Deluxe houseboat, Dal Lake"),
      day(6, "Depart", "Srinagar", "Transfer to the airport."),
    ],
    inclusions: ["Airport pickup and drop", "Private car and driver", "Breakfast and dinner", "Gurez inner-line permits"],
    exclusions: ["Flights", "Lunches", "Personal expenses and travel insurance"],
    goodToKnow: ["Gurez is open roughly May to October.", "Mobile network in Gurez is limited."],
    coverImage: img("gurez-valley-05", "Gurez valley"),
    heroImage: img("gurez-valley-01", "Kishanganga river in Gurez"),
    images: [img("aru-valley", "Meadow near Doodhpathri")],
    featured: true,
  },
  {
    slug: "kashmir-family-holiday",
    title: "Kashmir Family Holiday",
    description:
      "An easy-paced, child-friendly loop through the main valleys — short drives, shikara rides and meadows with room to run.",
    price: 52000,
    duration: "6 Nights / 7 Days",
    forWhom: "Families travelling with children.",
    destinations: ["srinagar", "gulmarg", "pahalgam", "sonamarg"],
    itinerary: [
      day(1, "Arrive in Srinagar", "Srinagar", "Rest after travel and an evening shikara ride.", "Houseboat, Dal Lake"),
      day(2, "Srinagar", "Srinagar", "Mughal gardens and a relaxed old-city walk.", "Houseboat, Dal Lake"),
      day(3, "Gulmarg", "Gulmarg", "Gondola ride and meadow games.", "Mountain lodge, Gulmarg"),
      day(4, "Pahalgam", "Pahalgam", "Riverside afternoon and a pony ride.", "Riverside cottage, Pahalgam"),
      day(5, "Pahalgam", "Pahalgam", "Betaab Valley and Aru, at the children's pace.", "Riverside cottage, Pahalgam"),
      day(6, "Sonamarg", "Sonamarg", "A day trip toward Thajiwas Glacier.", "Houseboat, Dal Lake"),
      day(7, "Depart", "Srinagar", "Transfer to the airport."),
    ],
    inclusions: ["Airport pickup and drop", "Private car and driver", "Breakfast and dinner", "Shikara ride"],
    exclusions: ["Flights", "Lunches", "Gondola tickets", "Personal expenses"],
    goodToKnow: ["Child seats can be arranged on request.", "Pack warm layers even in summer."],
    coverImage: img("pahalgam-valley", "Pahalgam valley"),
    heroImage: img("sonamarg-valley", "Sonamarg meadow"),
    images: [],
    featured: false,
  },
];

const demoPrices: Record<string, number> = {
  "the-kashmir-classic": 42000,
  "the-slow-kashmir": 56000,
  "winter-in-kashmir": 47500,
  "kashmir-for-two": 61000,
};

function buildInitial(): Store {
  let seq = 0;
  const id = () => `demo-${++seq}`;

  const destinations: Destination[] = [
    ...seedDestinations,
    ...extraDestinations,
  ].map((d) => ({ id: id(), ...structuredClone(d) }));

  const journeys: Journey[] = [
    ...seedJourneys.map((j) => ({ ...j, price: demoPrices[j.slug] })),
    ...extraJourneys,
  ].map((j) => ({ id: id(), ...structuredClone(j) }));
  journeys[3].featured = false;

  const ago = (hours: number) =>
    new Date(Date.now() - hours * 3600_000).toISOString();

  const requests: StoredRequest[] = [
    {
      id: id(),
      type: "booking",
      name: "Rahul Mehta",
      phone: "+91 98200 11122",
      email: "rahul.mehta@example.com",
      travellers: 2,
      notes: "Anniversary trip — a quiet houseboat if possible.",
      journey: "The Kashmir Classic",
      travelDate: "2026-04-12",
      destinations: [],
      emailSent: true,
      createdAt: ago(3),
      ipHash: "demo",
    },
    {
      id: id(),
      type: "booking",
      name: "Aditi Sharma",
      phone: "+91 99001 33445",
      email: "aditi.s@example.com",
      travellers: 4,
      notes: "",
      journey: "Winter in Kashmir",
      travelDate: "2027-01-05",
      destinations: [],
      emailSent: true,
      createdAt: ago(26),
      ipHash: "demo",
    },
    {
      id: id(),
      type: "custom",
      name: "Farhan Ahmed",
      phone: "+91 98110 55667",
      email: "farhan.a@example.com",
      travellers: 3,
      notes: "Interested in photography and offbeat villages.",
      destinations: ["Gurez", "Doodhpathri"],
      travelDates: "Early September",
      tripLength: "7 days",
      budget: "₹50,000 – ₹1,00,000",
      emailSent: true,
      createdAt: ago(50),
      ipHash: "demo",
    },
    {
      id: id(),
      type: "custom",
      name: "Priya Nair",
      phone: "+91 97400 88990",
      email: "priya.nair@example.com",
      travellers: 2,
      notes: "Honeymoon. Not sure where to start.",
      destinations: [],
      travelDates: "May",
      tripLength: "5 nights",
      budget: "Not sure yet",
      emailSent: false,
      createdAt: ago(120),
      ipHash: "demo",
    },
  ];

  return { seq, destinations, journeys, requests };
}

const g = globalThis as unknown as { __demoStore?: Store };

export function demoStore(): Store {
  return (g.__demoStore ??= buildInitial());
}

export function nextDemoId(store: Store) {
  return `demo-${++store.seq}`;
}
