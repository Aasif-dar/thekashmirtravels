import { Schema, model, models, type Model } from "mongoose";
import type { JourneyInput } from "@/lib/types";

const imageSchema = new Schema({ src: String, alt: String }, { _id: false });

const daySchema = new Schema(
  {
    day: String,
    title: String,
    location: { type: String, default: "" },
    description: String,
    stay: String,
  },
  { _id: false }
);

const journeySchema = new Schema<JourneyInput>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    price: Number,
    duration: { type: String, default: "" },
    forWhom: { type: String, default: "" },
    destinations: { type: [String], default: [] },
    itinerary: { type: [daySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    goodToKnow: { type: [String], default: [] },
    coverImage: { type: imageSchema, required: true },
    heroImage: imageSchema,
    images: { type: [imageSchema], default: [] },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const JourneyModel: Model<JourneyInput> =
  (models.Journey as Model<JourneyInput>) ??
  model<JourneyInput>("Journey", journeySchema);
