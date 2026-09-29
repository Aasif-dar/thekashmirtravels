"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { contact } from "@/data/contact";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const journey = searchParams.get("journey") ?? "";

  const [name, setName] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [message, setMessage] = useState(
    journey ? `I'm interested in ${journey}.` : ""
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const subject = `Trip enquiry${journey ? ` — ${journey}` : ""}`;
    const body = [
      `Name: ${name || "-"}`,
      `Preferred travel dates: ${travelDates || "-"}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label
          htmlFor="name"
          className="text-[12px] font-medium tracking-[0.12em] text-charcoal/60 uppercase"
        >
          Your name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-deep-green"
        />
      </div>

      <div>
        <label
          htmlFor="dates"
          className="text-[12px] font-medium tracking-[0.12em] text-charcoal/60 uppercase"
        >
          Preferred travel dates
        </label>
        <input
          id="dates"
          type="text"
          placeholder="e.g. Early April, 6 days"
          value={travelDates}
          onChange={(event) => setTravelDates(event.target.value)}
          className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 text-[15px] text-charcoal placeholder:text-charcoal/35 outline-none transition-colors focus:border-deep-green"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-[12px] font-medium tracking-[0.12em] text-charcoal/60 uppercase"
        >
          Tell us about the trip
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-2 w-full resize-none border-b border-charcoal/25 bg-transparent py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-deep-green"
        />
      </div>

      <button
        type="submit"
        className="bg-deep-green px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-ivory uppercase transition-colors hover:bg-forest"
      >
        Send Enquiry
      </button>
    </form>
  );
}
