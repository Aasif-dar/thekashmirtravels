import { z } from "zod";
import { isDemoMode } from "@/lib/demo";

const text = (max = 200) => z.string().trim().max(max);
const lines = z.array(z.string().trim().min(1).max(500)).max(50);

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
  .refine((slug) => slug !== "new", "This slug is reserved");

const imageSchema = z.object({
  src: z
    .string()
    .trim()
    .refine(
      (src) =>
        src.startsWith("/") ||
        src.startsWith("https://") ||
        // Demo mode only: images picked from disk are stored as data URLs.
        (isDemoMode() && src.startsWith("data:image/")),
      "Invalid image URL"
    )
    .refine(
      (src) => src.length <= (src.startsWith("data:") ? 3_000_000 : 1000),
      "Image URL too long"
    ),
  alt: text(300).default(""),
});

export const destinationSchema = z.object({
  slug: slugSchema,
  title: text().min(1, "Title is required"),
  tagline: text().default(""),
  description: text(5000).default(""),
  country: text(100).default("India"),
  region: text(100).default(""),
  coverImage: imageSchema,
  galleryImages: z.array(imageSchema).max(30).default([]),
  highlights: lines.default([]),
  featured: z.boolean().default(false),
});

const daySchema = z.object({
  day: text(50).min(1),
  title: text().min(1),
  location: text().default(""),
  description: text(2000).default(""),
  stay: text().optional(),
});

export const journeySchema = z.object({
  slug: slugSchema,
  title: text().min(1, "Title is required"),
  description: text(5000).default(""),
  price: z.number().min(0).max(100000000).optional(),
  duration: text(100).default(""),
  forWhom: text().default(""),
  destinations: z.array(slugSchema).max(20).default([]),
  itinerary: z.array(daySchema).max(60).default([]),
  inclusions: lines.default([]),
  exclusions: lines.default([]),
  goodToKnow: lines.default([]),
  coverImage: imageSchema,
  heroImage: imageSchema.optional(),
  images: z.array(imageSchema).max(30).default([]),
  featured: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().trim().min(1).max(200),
  password: z.string().min(1).max(200),
});
