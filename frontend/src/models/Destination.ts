import { Schema, model, models, type Model } from "mongoose";
import type { DestinationInput } from "@/lib/types";

const imageSchema = new Schema({ src: String, alt: String }, { _id: false });

const destinationSchema = new Schema<DestinationInput>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    country: { type: String, default: "India" },
    region: { type: String, default: "" },
    coverImage: { type: imageSchema, required: true },
    galleryImages: { type: [imageSchema], default: [] },
    highlights: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const DestinationModel: Model<DestinationInput> =
  (models.Destination as Model<DestinationInput>) ??
  model<DestinationInput>("Destination", destinationSchema);
