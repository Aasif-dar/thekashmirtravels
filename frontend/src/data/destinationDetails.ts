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

export const destinationDetails: DestinationDetail[] = [
  {
    slug: "srinagar",
    name: "Srinagar",
    tagline: "The soul of the valley.",
    paragraphs: [
      "Srinagar is where most journeys through Kashmir begin, and where they're hardest to leave. Dal Lake sits at the centre of it — houseboats moored along its edges, shikaras threading between floating gardens before the city fully wakes.",
      "Beyond the lake, the old city moves at its own pace: wooden shopfronts, the call to prayer from Jamia Masjid, and the Mughal gardens laid out in terraces above the water.",
    ],
    highlights: [
      "A sunrise shikara ride through the floating vegetable market",
      "Nishat Bagh and Shalimar Bagh, the Mughal-era terraced gardens",
      "The old city around Zaina Kadal, on foot",
      "A night aboard a traditional houseboat",
    ],
    heroImage: images.dalLakeWide,
    secondaryImage: images.srinagarOldCity,
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    tagline: "Where the mountains turn white.",
    paragraphs: [
      "Gulmarg means 'meadow of flowers,' and in summer that's exactly what greets you — rolling green slopes below Apharwat Peak. Come winter, the entire town turns over to snow.",
      "One of the world's highest cable cars carries you up toward the peak in two stages, opening onto views that stretch toward Nanga Parbat on a clear day.",
    ],
    highlights: [
      "The Gondola ride up Apharwat Peak, in two stages",
      "Skiing and snowboarding through the winter months",
      "Alpine meadows and pine forest walks in summer",
      "Golf at one of the highest green courses in the world",
    ],
    heroImage: images.gulmarg,
    secondaryImage: images.gulmargSnow,
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    tagline: "Where the river slows the day.",
    paragraphs: [
      "Pahalgam sits where the Lidder river runs fast and clear through pine forest, and much of its appeal is simply in slowing down beside it.",
      "Aru Valley and Betaab Valley, a short drive away, open onto wider meadows and views further into the mountains — reachable on foot, by horseback, or by car.",
    ],
    highlights: [
      "Walks along the Lidder river",
      "Aru Valley, on foot or on horseback",
      "Betaab Valley and its pine-lined slopes",
      "Chandanwari, the starting point of the Amarnath Yatra",
    ],
    heroImage: images.pahalgam,
    secondaryImage: images.lidderRiver,
  },
  {
    slug: "sonamarg",
    name: "Sonamarg",
    tagline: "Into the high country.",
    paragraphs: [
      "Sonamarg — the 'meadow of gold' — is the last major stop before the road climbs further toward Ladakh. The air noticeably thins, and the valley opens onto glacier views.",
      "It's often visited as a long day trip from Srinagar, though staying overnight buys you the meadow in a different light, before the day-trippers arrive.",
    ],
    highlights: [
      "Thajiwas Glacier, reached on foot or by pony",
      "High-altitude lakes including Vishansar and Krishansar",
      "The gateway views toward Zoji La pass",
    ],
    heroImage: images.sonamarg,
    secondaryImage: images.thajiwasGlacier,
  },
];
