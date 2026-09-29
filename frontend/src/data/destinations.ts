import { images } from "./images";

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: (typeof images)[keyof typeof images];
  size: "large" | "medium" | "small";
};

export const destinations: Destination[] = [
  {
    slug: "srinagar",
    name: "Srinagar",
    tagline: "The soul of the valley.",
    description:
      "Dal Lake at first light, houseboats that have hosted four generations of the same families, and a old city where wood and water still shape daily life.",
    image: images.srinagar,
    size: "large",
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    tagline: "Where the mountains turn white.",
    description:
      "Alpine meadows in summer, one of the world's highest gondola rides, and slopes that turn Kashmir into a different country each winter.",
    image: images.gulmarg,
    size: "medium",
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    tagline: "Where the river slows the day.",
    description:
      "Pine forests along the Lidder, quiet valleys reached on foot or on horseback, and evenings with nowhere in particular to be.",
    image: images.pahalgam,
    size: "medium",
  },
  {
    slug: "sonamarg",
    name: "Sonamarg",
    tagline: "Into the high country.",
    description:
      "The road to Ladakh passes through here first — glacier air, high meadows, and the last stretch of Kashmir before the mountains take over.",
    image: images.sonamarg,
    size: "large",
  },
];
