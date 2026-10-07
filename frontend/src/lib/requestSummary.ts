// Builds the human-readable request summary used in the WhatsApp message and
// the plain-text part of the owner email (the HTML part is in emailTemplates).

export interface RequestSummary {
  type: "booking" | "custom";
  name: string;
  phone: string;
  email: string;
  travellers: number;
  notes?: string;
  // booking
  journey?: { title: string; duration?: string; price?: number };
  travelDate?: string;
  // custom
  destinations?: string[];
  travelDates?: string;
  tripLength?: string;
  budget?: string;
}

export function summaryLines(s: RequestSummary): string[] {
  const lines: string[] = [];
  if (s.type === "booking" && s.journey) {
    lines.push(`Journey: ${s.journey.title}`);
    if (s.journey.duration) lines.push(`Duration: ${s.journey.duration}`);
    lines.push(
      `Price: ${
        s.journey.price
          ? `From ₹${s.journey.price.toLocaleString("en-IN")}`
          : "On request"
      }`
    );
    if (s.travelDate) lines.push(`Preferred travel date: ${s.travelDate}`);
  } else {
    lines.push(
      `Destinations: ${s.destinations?.length ? s.destinations.join(", ") : "Not decided"}`
    );
    if (s.travelDates) lines.push(`Travel dates: ${s.travelDates}`);
    if (s.tripLength) lines.push(`Trip length: ${s.tripLength}`);
    if (s.budget) lines.push(`Budget: ${s.budget}`);
  }
  lines.push(`Travellers: ${s.travellers}`);
  lines.push("", `Name: ${s.name}`, `Phone: ${s.phone}`, `Email: ${s.email}`);
  if (s.notes) lines.push("", `Notes: ${s.notes}`);
  return lines;
}

export function whatsappText(s: RequestSummary) {
  const intro =
    s.type === "booking"
      ? "Hi! I'd like to book a journey."
      : "Hi! I'd like help planning a custom trip to Kashmir.";
  return [intro, "", ...summaryLines(s)].join("\n");
}

