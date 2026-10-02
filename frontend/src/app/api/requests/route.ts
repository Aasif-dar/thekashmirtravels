import { createHash } from "node:crypto";
import { handleError, json } from "@/lib/api";
import { sendOwnerEmail } from "@/lib/mail";
import { getDestinations, getJourneyBySlug } from "@/lib/queries";
import { requestRepo } from "@/lib/repo";
import { requestSchema } from "@/lib/requestSchemas";
import {
  emailSubject,
  summaryLines,
  type RequestSummary,
} from "@/lib/requestSummary";
import type { NewRequest } from "@/lib/types";

// DB write + SMTP can take a few seconds on a cold start.
export const maxDuration = 30;

const LIMIT_PER_HOUR = 5;

// Public endpoint: no admin auth. Protected by zod validation, a honeypot
// field and a per-IP limit stored in the data store (MongoDB works across
// serverless instances, unlike in-memory counters).
export async function POST(request: Request) {
  try {
    const data = requestSchema.parse(await request.json());

    // Honeypot filled in → pretend success, store and send nothing.
    if (data.website) return json({ ok: true });

    const ip = (request.headers.get("x-forwarded-for") ?? "unknown")
      .split(",")[0]
      .trim();
    const ipHash = createHash("sha256")
      .update(`${ip}:${process.env.JWT_SECRET ?? ""}`)
      .digest("hex");

    // Resolve journey / destination details server-side; never trust the client.
    let summary: RequestSummary;
    let record: NewRequest;

    if (data.type === "booking") {
      const found = await getJourneyBySlug(data.journeySlug);
      if (!found) return json({ error: "Journey not found" }, 404);
      const journey = {
        slug: found.slug,
        title: found.title,
        duration: found.duration || undefined,
        price: found.price,
      };
      summary = {
        type: "booking",
        name: data.name,
        phone: data.phone,
        email: data.email,
        travellers: data.travellers,
        notes: data.notes,
        journey,
        travelDate: data.travelDate,
      };
      record = {
        type: "booking",
        name: data.name,
        phone: data.phone,
        email: data.email,
        travellers: data.travellers,
        notes: data.notes,
        journey,
        travelDate: data.travelDate,
        destinations: [],
        ipHash,
      };
    } else {
      const all = await getDestinations();
      const destinations = data.destinations.flatMap((slug) => {
        const match = all.find((d) => d.slug === slug);
        return match ? [{ slug: match.slug, title: match.title }] : [];
      });
      summary = {
        type: "custom",
        name: data.name,
        phone: data.phone,
        email: data.email,
        travellers: data.travellers,
        notes: data.notes,
        destinations: destinations.map((d) => d.title),
        travelDates: data.travelDates,
        tripLength: data.tripLength,
        budget: data.budget,
      };
      record = {
        type: "custom",
        name: data.name,
        phone: data.phone,
        email: data.email,
        travellers: data.travellers,
        notes: data.notes,
        destinations,
        travelDates: data.travelDates,
        tripLength: data.tripLength,
        budget: data.budget,
        ipHash,
      };
    }

    // a) Save (also the rate-limit check).
    let savedId: string | null = null;
    try {
      const recent = await requestRepo.countSince(
        ipHash,
        new Date(Date.now() - 60 * 60 * 1000)
      );
      if (recent >= LIMIT_PER_HOUR) {
        return json({ error: "Too many requests. Please try again later." }, 429);
      }
      savedId = await requestRepo.create(record);
    } catch (error) {
      console.error("Saving request failed:", error);
    }

    // b) Email the owner. A failure is logged, never shown to the customer.
    let emailSent = false;
    try {
      await sendOwnerEmail({
        subject: emailSubject(summary),
        text: summaryLines(summary).join("\n"),
        replyTo: data.email,
      });
      emailSent = true;
      if (savedId) await requestRepo.markEmailSent(savedId);
    } catch (error) {
      console.error("Sending request email failed:", error);
    }

    // c) Success as long as the owner can still find out about the request.
    if (!savedId && !emailSent) {
      return json({ error: "Could not submit your request. Please try again." }, 500);
    }
    return json({ ok: true }, 201);
  } catch (error) {
    return handleError(error);
  }
}
