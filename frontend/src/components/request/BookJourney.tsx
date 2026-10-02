"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { bookingRequestSchema, fieldErrors } from "@/lib/requestSchemas";
import {
  FormField,
  Honeypot,
  TextArea,
  TextInput,
  ThankYou,
  submitClass,
} from "./fields";
import { openWhatsApp, postRequest } from "./submit";

export type BookableJourney = {
  slug: string;
  title: string;
  duration: string;
  price?: number;
};

export default function BookJourney({
  journey,
  label = "Book this journey",
  className = "",
}: {
  journey: BookableJourney;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      type: "booking" as const,
      journeySlug: journey.slug,
      name,
      phone,
      email,
      travelDate,
      travellers: Number(travellers),
      notes,
      website,
    };
    const parsed = bookingRequestSchema.safeParse(payload);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));

    setErrors({});
    setBusy(true);
    const failure = await postRequest(payload);
    setBusy(false);
    if (failure) return setErrors({ form: failure });

    setWhatsappUrl(
      openWhatsApp({
        type: "booking",
        name,
        phone,
        email,
        travellers: Number(travellers),
        notes,
        journey,
        travelDate,
      })
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/60 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Book ${journey.title}`}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto bg-ivory p-6 text-left sm:p-10"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal"
        >
          <X size={22} />
        </button>

        {whatsappUrl ? (
          <ThankYou whatsappUrl={whatsappUrl} onClose={() => setOpen(false)} />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="relative space-y-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.25em] text-deep-green/70 uppercase">
                Book this journey
              </p>
              <h3 className="mt-2 font-serif text-2xl text-charcoal">
                {journey.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal/60">
                {journey.duration}
                {journey.price
                  ? ` · From ₹${journey.price.toLocaleString("en-IN")}`
                  : " · Price on request"}
              </p>
            </div>

            <FormField id="b-name" label="Your name" error={errors.name}>
              <TextInput
                id="b-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField id="b-phone" label="Phone" error={errors.phone}>
                <TextInput
                  id="b-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormField>
              <FormField id="b-email" label="Email" error={errors.email}>
                <TextInput
                  id="b-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                id="b-date"
                label="Preferred travel date"
                error={errors.travelDate}
              >
                <TextInput
                  id="b-date"
                  type="date"
                  min={today}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </FormField>
              <FormField
                id="b-travellers"
                label="Travellers"
                error={errors.travellers}
              >
                <TextInput
                  id="b-travellers"
                  type="number"
                  min={1}
                  max={50}
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                />
              </FormField>
            </div>
            <FormField id="b-notes" label="Note (optional)" error={errors.notes}>
              <TextArea
                id="b-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormField>

            <Honeypot value={website} onChange={setWebsite} />

            {errors.form && <p className="text-sm text-burgundy">{errors.form}</p>}

            <button type="submit" disabled={busy} className={submitClass}>
              {busy ? "Sending…" : "Send booking request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {/* Portal: cards animate with transforms, which would trap a fixed overlay. */}
      {open && createPortal(modal, document.body)}
    </>
  );
}
