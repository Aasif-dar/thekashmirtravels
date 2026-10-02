import { Schema, model, models, type Model } from "mongoose";

export interface AdminDoc {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const adminSchema = new Schema<AdminDoc>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AdminModel: Model<AdminDoc> =
  (models.Admin as Model<AdminDoc>) ?? model<AdminDoc>("Admin", adminSchema);
