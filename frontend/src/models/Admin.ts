import { Schema, model, models, type Model } from "mongoose";

export type OtpPurpose = "login" | "reset";

export interface AdminDoc {
  email: string;
  passwordHash: string;
  createdAt: Date;
  // Sessions issued before this moment are rejected (set on password change).
  passwordChangedAt?: Date;
  // One active email OTP at a time. Only an HMAC of the code is stored.
  otpHash?: string;
  otpPurpose?: OtpPurpose;
  otpExpiresAt?: Date;
  otpAttempts?: number;
  // Send throttling: cooldown between codes + a cap per rolling hour.
  otpLastSentAt?: Date;
  otpSendWindowStart?: Date;
  otpSendCount?: number;
}

const adminSchema = new Schema<AdminDoc>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  otpHash: String,
  otpPurpose: { type: String, enum: ["login", "reset"] },
  otpExpiresAt: Date,
  otpAttempts: { type: Number, default: 0 },
  otpLastSentAt: Date,
  otpSendWindowStart: Date,
  otpSendCount: { type: Number, default: 0 },
});

export const AdminModel: Model<AdminDoc> =
  (models.Admin as Model<AdminDoc>) ?? model<AdminDoc>("Admin", adminSchema);
