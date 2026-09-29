import { images } from "./images";

export type Experience = {
  title: string;
  description: string;
  image: (typeof images)[keyof typeof images];
};

export const experiences: Experience[] = [
  {
    title: "Morning on Dal Lake",
    description: "A quiet shikara ride before the lake wakes.",
    image: images.shikara,
  },
  {
    title: "A Night on a Houseboat",
    description: "Experience Kashmir's floating heritage.",
    image: images.houseboat,
  },
  {
    title: "Wazwan, Slowly Served",
    description:
      "A multi-course Kashmiri feast, eaten the traditional way — unhurried, and shared.",
    image: images.wazwan,
  },
  {
    title: "Gulmarg in Winter",
    description: "Snow-covered meadows and mountain air.",
    image: images.gulmargSnow,
  },
  {
    title: "Pahalgam by the River",
    description: "A slower side of Kashmir.",
    image: images.lidderRiver,
  },
  {
    title: "Kashmir After Autumn",
    description: "Chinar-lined roads and golden landscapes.",
    image: images.chinarAutumn,
  },
];
