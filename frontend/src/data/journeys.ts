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

export const journeys: Journey[] = [
  {
    slug: "the-kashmir-classic",
    title: "The Kashmir Classic",
    duration: "5 Nights / 6 Days",
    route: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    forWhom: "For first-time visitors.",
    summary:
      "The complete arc of the valley — houseboat mornings on Dal Lake, the gondola into Gulmarg's high snow, pine forest along the Lidder in Pahalgam, and the glacier air of Sonamarg before you leave.",
    heroImage: images.dalLakeWide,
    cardImage: images.srinagar,
    days: [
      {
        day: "Day 01",
        title: "Arrive in Srinagar",
        location: "Srinagar",
        description:
          "Received at the airport and taken by shikara to your houseboat on Dal Lake. Rest of the day free — an evening paddle to watch the sun drop behind the Zabarwan hills.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 02",
        title: "Srinagar",
        location: "Srinagar",
        description:
          "A quiet morning shikara ride through the floating gardens, followed by the Mughal gardens of Nishat and Shalimar. Afternoon free to walk the old city.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 03",
        title: "Gulmarg",
        location: "Gulmarg",
        description:
          "Drive to Gulmarg through pine forest. Optional gondola ride up Apharwat Peak. Evening back in Srinagar or an overnight stay in the meadow, depending on season.",
        stay: "Mountain lodge, Gulmarg",
      },
      {
        day: "Day 04",
        title: "Pahalgam",
        location: "Pahalgam",
        description:
          "Onward to Pahalgam along the Lidder river. Time in Betaab Valley and Aru, with the rest of the afternoon left unplanned by the riverside.",
        stay: "Riverside cottage, Pahalgam",
      },
      {
        day: "Day 05",
        title: "Sonamarg",
        location: "Sonamarg",
        description:
          "A full day trip to Sonamarg — the meadow of gold — with views toward Thajiwas Glacier before returning to Srinagar for your final night.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 06",
        title: "Depart",
        location: "Srinagar",
        description:
          "A final morning on the lake before your transfer to the airport.",
      },
    ],
    included: [
      "Airport pickup and drop",
      "Private car for all transfers and sightseeing",
      "5 nights' accommodation with breakfast and dinner",
      "Shikara ride on Dal Lake",
      "A local host reachable throughout your stay",
    ],
    notIncluded: [
      "Flights to and from Srinagar",
      "Lunches, unless specified",
      "Gondola tickets and other optional activities",
      "Personal expenses and travel insurance",
    ],
    goodToKnow: [
      "Best from April to October for gardens and meadows, December to February for snow.",
      "Mountain roads can close briefly after heavy snowfall — itinerary order may shift for safety.",
      "Comfortable walking shoes are worth packing for Betaab Valley and Aru.",
    ],
  },
  {
    slug: "the-slow-kashmir",
    title: "The Slow Kashmir",
    duration: "6 Nights / 7 Days",
    route: ["Srinagar", "Pahalgam", "Gurez"],
    forWhom: "For travelers who want a slower experience.",
    summary:
      "Fewer places, more time in each. Two full days by the Lidder in Pahalgam, then north to Gurez — a valley the usual circuit never reaches — before returning to Srinagar unrushed.",
    heroImage: images.gurez,
    cardImage: images.pahalgam,
    days: [
      {
        day: "Day 01",
        title: "Arrive in Srinagar",
        location: "Srinagar",
        description:
          "Settle into your houseboat. No sightseeing planned — just the lake, and time to adjust.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 02",
        title: "Srinagar",
        location: "Srinagar",
        description:
          "Morning shikara through the floating vegetable market, an afternoon in the old city with a local guide who knows it as home, not a route.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 03",
        title: "Pahalgam",
        location: "Pahalgam",
        description: "Drive to Pahalgam. Evening free by the river.",
        stay: "Riverside cottage, Pahalgam",
      },
      {
        day: "Day 04",
        title: "Pahalgam, at pace",
        location: "Pahalgam",
        description:
          "A full day with nothing fixed — Aru Valley on foot or horseback, or simply the cottage garden and the sound of the Lidder.",
        stay: "Riverside cottage, Pahalgam",
      },
      {
        day: "Day 05",
        title: "Gurez Valley",
        location: "Gurez",
        description:
          "A long, beautiful drive north across Razdan Pass into Gurez, along the Kishanganga river — one of the least-visited valleys in Kashmir.",
        stay: "Guesthouse, Gurez Valley",
      },
      {
        day: "Day 06",
        title: "Gurez to Srinagar",
        location: "Srinagar",
        description:
          "A slow morning in Gurez before the drive back to Srinagar. Final evening on the lake.",
        stay: "Deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 07",
        title: "Depart",
        location: "Srinagar",
        description: "Transfer to the airport.",
      },
    ],
    included: [
      "Airport pickup and drop",
      "Private car for all transfers, suited to mountain roads",
      "6 nights' accommodation with breakfast and dinner",
      "A local host reachable throughout your stay",
      "Permits required for travel to Gurez",
    ],
    notIncluded: [
      "Flights to and from Srinagar",
      "Lunches, unless specified",
      "Horseback rides and other optional activities",
      "Personal expenses and travel insurance",
    ],
    goodToKnow: [
      "Gurez is best from May to October; the pass can close in winter.",
      "An inner-line permit is needed for Gurez — we arrange this in advance with your ID details.",
      "Mobile network in Gurez is limited. Let family know you may be briefly unreachable.",
    ],
  },
  {
    slug: "winter-in-kashmir",
    title: "Winter in Kashmir",
    duration: "5 Nights / 6 Days",
    route: ["Srinagar", "Gulmarg", "Pahalgam"],
    forWhom: "Snow, skiing and mountain stays.",
    summary:
      "Kashmir under snow is a different valley entirely. Built around two nights in Gulmarg for skiing or simply the quiet of the meadow gone white, with Srinagar and Pahalgam on either side.",
    heroImage: images.gulmargSnow,
    cardImage: images.gulmargGondola,
    days: [
      {
        day: "Day 01",
        title: "Arrive in Srinagar",
        location: "Srinagar",
        description:
          "Airport pickup and a short houseboat stay to begin — the lake often partly frozen, still and silver.",
        stay: "Heated houseboat, Dal Lake",
      },
      {
        day: "Day 02",
        title: "Srinagar to Gulmarg",
        location: "Gulmarg",
        description:
          "Drive up to Gulmarg. Afternoon to settle in and walk the snow-covered meadow before the light goes.",
        stay: "Mountain lodge, Gulmarg",
      },
      {
        day: "Day 03",
        title: "Gulmarg",
        location: "Gulmarg",
        description:
          "A full day for the Gondola up Apharwat Peak, skiing or snowboarding lessons, or simply the mountain air.",
        stay: "Mountain lodge, Gulmarg",
      },
      {
        day: "Day 04",
        title: "Gulmarg to Pahalgam",
        location: "Pahalgam",
        description:
          "Onward to Pahalgam, quieter in winter, with the Lidder running fast and cold beside pine forest dusted in snow.",
        stay: "Riverside cottage, Pahalgam",
      },
      {
        day: "Day 05",
        title: "Pahalgam to Srinagar",
        location: "Srinagar",
        description:
          "Return to Srinagar for your final night, with time for the old city or a last shikara ride.",
        stay: "Heated houseboat, Dal Lake",
      },
      {
        day: "Day 06",
        title: "Depart",
        location: "Srinagar",
        description: "Transfer to the airport.",
      },
    ],
    included: [
      "Airport pickup and drop",
      "Private car fitted for snow and mountain roads",
      "5 nights' accommodation with breakfast and dinner",
      "Heated houseboat and lodge stays",
      "A local host reachable throughout your stay",
    ],
    notIncluded: [
      "Flights to and from Srinagar",
      "Skiing and snowboarding equipment and lessons",
      "Gondola tickets",
      "Personal expenses and travel insurance",
    ],
    goodToKnow: [
      "Best from late December through February for reliable snow.",
      "Pack in proper layers — Gulmarg nights fall well below freezing.",
      "Gondola operations can pause in high wind; we build in a flexible day where possible.",
    ],
  },
  {
    slug: "kashmir-for-two",
    title: "Kashmir for Two",
    duration: "5 Nights / 6 Days",
    route: ["Srinagar", "Gulmarg", "Pahalgam"],
    forWhom: "A private escape for couples.",
    summary:
      "The classic route, paced for two — a private houseboat, quieter corners of each destination, and evenings built around long dinners rather than checklists.",
    heroImage: images.houseboat,
    cardImage: images.shikara,
    days: [
      {
        day: "Day 01",
        title: "Arrive in Srinagar",
        location: "Srinagar",
        description:
          "Received at the airport and taken by shikara to a private houseboat on a quieter stretch of the lake.",
        stay: "Private deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 02",
        title: "Srinagar",
        location: "Srinagar",
        description:
          "A morning shikara ride at first light, an afternoon at the Mughal gardens, and a candlelit dinner on the houseboat deck.",
        stay: "Private deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 03",
        title: "Gulmarg",
        location: "Gulmarg",
        description:
          "Drive to Gulmarg. An evening walk through the meadow as the light turns gold over Apharwat.",
        stay: "Mountain lodge, Gulmarg",
      },
      {
        day: "Day 04",
        title: "Pahalgam",
        location: "Pahalgam",
        description:
          "Onward to Pahalgam. Afternoon by the Lidder, with a private riverside dinner arranged on request.",
        stay: "Riverside cottage, Pahalgam",
      },
      {
        day: "Day 05",
        title: "Return to Srinagar",
        location: "Srinagar",
        description:
          "Back to Srinagar for a final evening — a sunset shikara ride to close the trip the way it began.",
        stay: "Private deluxe houseboat, Dal Lake",
      },
      {
        day: "Day 06",
        title: "Depart",
        location: "Srinagar",
        description: "Transfer to the airport.",
      },
    ],
    included: [
      "Airport pickup and drop",
      "Private car for all transfers and sightseeing",
      "5 nights' accommodation with breakfast and dinner",
      "Private shikara rides on Dal Lake",
      "A local host reachable throughout your stay",
    ],
    notIncluded: [
      "Flights to and from Srinagar",
      "Lunches, unless specified",
      "Special dinner arrangements, priced on request",
      "Personal expenses and travel insurance",
    ],
    goodToKnow: [
      "Let us know anniversaries or occasions in advance — we can arrange small details ahead of arrival.",
      "Spring and autumn offer the quietest corners of each destination.",
      "Private houseboat availability is limited — this journey is best booked a few weeks ahead.",
    ],
  },
];

export function getJourneyBySlug(slug: string) {
  return journeys.find((journey) => journey.slug === slug);
}
