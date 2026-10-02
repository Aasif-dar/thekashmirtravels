import { z } from "zod";

// Shared by the browser forms and POST /api/requests.

export const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Not sure yet",
] as const;

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((value) => !/[\r\n]/.test(value), "Must be a single line");

const base = z.object({
  name: singleLine(100).min(1, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-()]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().max(200).email("Enter a valid email"),
  travellers: z
    .number({ error: "Enter the number of travellers" })
    .int("Enter a whole number")
    .min(1, "At least 1 traveller")
    .max(50, "Please contact us for groups above 50"),
  notes: z.string().trim().max(2000).default(""),
  // Honeypot: hidden from people, filled in by bots.
  website: z.string().max(200).optional(),
});

export const bookingRequestSchema = base.extend({
  type: z.literal("booking"),
  journeySlug: singleLine(80).min(1),
  travelDate: singleLine(100).min(1, "Choose a preferred travel date"),
});

export const customRequestSchema = base.extend({
  type: z.literal("custom"),
  destinations: z.array(singleLine(80)).max(20).default([]),
  travelDates: singleLine(100).min(1, "Tell us when you'd like to travel"),
  tripLength: singleLine(100).min(1, "Tell us how long you'd like to stay"),
  budget: z.enum(BUDGETS, { error: "Choose a budget range" }),
});

export const requestSchema = z.discriminatedUnion("type", [
  bookingRequestSchema,
  customRequestSchema,
]);

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
export type CustomRequestInput = z.infer<typeof customRequestSchema>;
export type RequestInput = z.infer<typeof requestSchema>;

/** First error message per field, for inline form errors. */
export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}
