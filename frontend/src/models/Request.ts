import { Schema, model, models, type Model } from "mongoose";

export interface RequestDoc {
  type: "booking" | "custom";
  status: "new" | "contacted" | "closed";
  name: string;
  phone: string;
  email: string;
  travellers: number;
  notes: string;
  journey?: { slug: string; title: string; duration?: string; price?: number };
  travelDate?: string;
  destinations: { slug: string; title: string }[];
  travelDates?: string;
  tripLength?: string;
  budget?: string;
  ipHash?: string;
  emailSent: boolean;
  createdAt: Date;
}

const requestSchema = new Schema<RequestDoc>({
  type: { type: String, enum: ["booking", "custom"], required: true },
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  travellers: { type: Number, required: true },
  notes: { type: String, default: "" },
  journey: {
    type: new Schema(
      { slug: String, title: String, duration: String, price: Number },
      { _id: false }
    ),
  },
  travelDate: String,
  destinations: {
    type: [new Schema({ slug: String, title: String }, { _id: false })],
    default: [],
  },
  travelDates: String,
  tripLength: String,
  budget: String,
  ipHash: { type: String, index: true },
  emailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true },
});

export const RequestModel: Model<RequestDoc> =
  (models.Request as Model<RequestDoc>) ??
  model<RequestDoc>("Request", requestSchema);
