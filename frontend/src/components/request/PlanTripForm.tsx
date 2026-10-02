"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BUDGETS,
  customRequestSchema,
  fieldErrors,
} from "@/lib/requestSchemas";
import {
  FormField,
  Honeypot,
  SelectInput,
  TextArea,
  TextInput,
  ThankYou,
  labelClass,
  submitClass,
} from "./fields";
import { openWhatsApp, postRequest } from "./submit";

export default function PlanTripForm({
  destinations,
}: {
  destinations: { slug: string; title: string }[];
}) {
  const preselected = useSearchParams().get("destination");
  const [selected, setSelected] = useState<string[]>(
    preselected && destinations.some((d) => d.slug === preselected)
      ? [preselected]
      : []
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const toggle = (slug: string) =>
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug]
    );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      type: "custom" as const,
      name,
      phone,
      email,
      destinations: selected,
      travelDates,
      tripLength,
      travellers: Number(travellers),
      budget,
      notes,
      website,
    };
    const parsed = customRequestSchema.safeParse(payload);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));

    setErrors({});
    setBusy(true);
    const failure = await postRequest(payload);
    setBusy(false);
    if (failure) return setErrors({ form: failure });

    setWhatsappUrl(
      openWhatsApp({
        type: "custom",
        name,
        phone,
        email,
        travellers: Number(travellers),
        notes,
        destinations: destinations
          .filter((d) => selected.includes(d.slug))
          .map((d) => d.title),
        travelDates,
        tripLength,
        budget,
      })
    );
  }

  if (whatsappUrl) return <ThankYou whatsappUrl={whatsappUrl} />;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-7">
      <div>
        <p className={labelClass}>Destinations of interest</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {destinations.map((destination) => (
            <label
              key={destination.slug}
              className="flex cursor-pointer items-center gap-2 text-[15px] text-charcoal/80"
            >
              <input
                type="checkbox"
                checked={selected.includes(destination.slug)}
                onChange={() => toggle(destination.slug)}
                className="accent-deep-green"
              />
              {destination.title}
            </label>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-charcoal/50">
          Not sure yet? Leave blank and we&apos;ll suggest a route.
        </p>
      </div>

      <FormField id="p-name" label="Your name" error={errors.name}>
        <TextInput id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>

      <div className="grid gap-7 sm:grid-cols-2">
        <FormField id="p-phone" label="Phone" error={errors.phone}>
          <TextInput
            id="p-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
        <FormField id="p-email" label="Email" error={errors.email}>
          <TextInput
            id="p-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <FormField
          id="p-dates"
          label="Travel dates or month"
          error={errors.travelDates}
        >
          <TextInput
            id="p-dates"
            placeholder="e.g. Early April"
            value={travelDates}
            onChange={(e) => setTravelDates(e.target.value)}
          />
        </FormField>
        <FormField id="p-length" label="Trip length" error={errors.tripLength}>
          <TextInput
            id="p-length"
            placeholder="e.g. 6 days"
            value={tripLength}
            onChange={(e) => setTripLength(e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <FormField id="p-travellers" label="Travellers" error={errors.travellers}>
          <TextInput
            id="p-travellers"
            type="number"
            min={1}
            max={50}
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
          />
        </FormField>
        <FormField id="p-budget" label="Budget per person" error={errors.budget}>
          <SelectInput
            id="p-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Select a range</option>
            {BUDGETS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </FormField>
      </div>

      <FormField id="p-notes" label="Interests and notes" error={errors.notes}>
        <TextArea
          id="p-notes"
          rows={5}
          placeholder="Houseboat stays, skiing, photography, a honeymoon…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormField>

      <Honeypot value={website} onChange={setWebsite} />

      {errors.form && <p className="text-sm text-burgundy">{errors.form}</p>}

      <button type="submit" disabled={busy} className={submitClass}>
        {busy ? "Sending…" : "Send trip request"}
      </button>
    </form>
  );
}
