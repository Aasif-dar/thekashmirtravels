import { whatsappLink } from "@/data/contact";
import { whatsappText, type RequestSummary } from "@/lib/requestSummary";

/** POST the request. Resolves to an error message, or null on success. */
export async function postRequest(payload: unknown): Promise<string | null> {
  try {
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return null;
    const data = await response.json().catch(() => ({}));
    return data.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Network error. Please check your connection and try again.";
  }
}

/** Builds the wa.me URL and tries to open it in a new tab. */
export function openWhatsApp(summary: RequestSummary) {
  const url = whatsappLink(whatsappText(summary));
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
