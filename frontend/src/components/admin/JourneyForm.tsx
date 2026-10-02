"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ImageRef, Journey, JourneyDay } from "@/lib/types";
import { ImageField, ImageListField } from "./ImageField";
import {
  Field,
  buttonClass,
  ghostButtonClass,
  inputClass,
  slugify,
  submitJson,
  toLines,
} from "./ui";

export default function JourneyForm({
  initial,
  destinationOptions,
}: {
  initial?: Journey;
  destinationOptions: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(
    initial?.price !== undefined ? String(initial.price) : ""
  );
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [forWhom, setForWhom] = useState(initial?.forWhom ?? "");
  const [destinations, setDestinations] = useState<string[]>(
    initial?.destinations ?? []
  );
  const [itinerary, setItinerary] = useState<JourneyDay[]>(
    initial?.itinerary ?? []
  );
  const [inclusions, setInclusions] = useState(
    (initial?.inclusions ?? []).join("\n")
  );
  const [exclusions, setExclusions] = useState(
    (initial?.exclusions ?? []).join("\n")
  );
  const [goodToKnow, setGoodToKnow] = useState(
    (initial?.goodToKnow ?? []).join("\n")
  );
  const [coverImage, setCoverImage] = useState<ImageRef | undefined>(
    initial?.coverImage
  );
  const [heroImage, setHeroImage] = useState<ImageRef | undefined>(
    initial?.heroImage
  );
  const [images, setImages] = useState<ImageRef[]>(initial?.images ?? []);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Keep slugs that no longer match a destination so they aren't silently lost.
  const options = [
    ...destinationOptions,
    ...destinations
      .filter((s) => !destinationOptions.some((o) => o.slug === s))
      .map((s) => ({ slug: s, title: `${s} (not in destinations)` })),
  ];

  const toggleDestination = (value: string) =>
    setDestinations((current) =>
      current.includes(value)
        ? current.filter((s) => s !== value)
        : [...current, value]
    );

  const updateDay = (index: number, patch: Partial<JourneyDay>) =>
    setItinerary((days) =>
      days.map((day, i) => (i === index ? { ...day, ...patch } : day))
    );

  const addDay = () =>
    setItinerary((days) => [
      ...days,
      {
        day: `Day ${String(days.length + 1).padStart(2, "0")}`,
        title: "",
        location: "",
        description: "",
      },
    ]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!coverImage) {
      setError("Please upload a cover image.");
      return;
    }
    setSaving(true);
    setError("");
    const body = {
      slug,
      title,
      description,
      price: price.trim() === "" ? undefined : Number(price),
      duration,
      forWhom,
      destinations,
      itinerary: itinerary.map((day) => ({
        ...day,
        stay: day.stay?.trim() || undefined,
      })),
      inclusions: toLines(inclusions),
      exclusions: toLines(exclusions),
      goodToKnow: toLines(goodToKnow),
      coverImage,
      heroImage,
      images,
      featured,
    };
    const message = initial
      ? await submitJson(`/api/journeys/${initial.slug}`, "PUT", body)
      : await submitJson("/api/journeys", "POST", body);
    setSaving(false);
    if (message) return setError(message);
    router.push("/admin/journeys");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title">
          <input
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Slug" hint="Used in the page URL.">
          <input
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Duration" hint="e.g. 5 Nights / 6 Days">
          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Price (INR)" hint="Leave empty for “Price on request”.">
          <input
            type="number"
            min={0}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Best for">
          <input
            value={forWhom}
            onChange={(event) => setForWhom(event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Destinations (in route order of selection)
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {options.map((option) => (
            <label key={option.slug} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={destinations.includes(option.slug)}
                onChange={() => toggleDestination(option.slug)}
              />
              {option.title}
            </label>
          ))}
          {options.length === 0 && (
            <p className="text-sm text-charcoal/50">
              Create a destination first.
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Itinerary
        </p>
        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div
              key={index}
              className="space-y-3 border border-charcoal/15 bg-white/60 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-[100px_1fr_1fr]">
                <input
                  value={day.day}
                  onChange={(event) => updateDay(index, { day: event.target.value })}
                  placeholder="Day 01"
                  className={inputClass}
                />
                <input
                  value={day.title}
                  onChange={(event) => updateDay(index, { title: event.target.value })}
                  placeholder="Title"
                  className={inputClass}
                />
                <input
                  value={day.location}
                  onChange={(event) =>
                    updateDay(index, { location: event.target.value })
                  }
                  placeholder="Location"
                  className={inputClass}
                />
              </div>
              <textarea
                rows={3}
                value={day.description}
                onChange={(event) =>
                  updateDay(index, { description: event.target.value })
                }
                placeholder="Description"
                className={inputClass}
              />
              <input
                value={day.stay ?? ""}
                onChange={(event) => updateDay(index, { stay: event.target.value })}
                placeholder="Stay (optional)"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  setItinerary((days) => days.filter((_, i) => i !== index))
                }
                className="text-sm text-burgundy hover:underline"
              >
                Remove day
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addDay} className={`${ghostButtonClass} mt-3`}>
          Add day
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Inclusions" hint="One per line.">
          <textarea
            rows={5}
            value={inclusions}
            onChange={(event) => setInclusions(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Exclusions" hint="One per line.">
          <textarea
            rows={5}
            value={exclusions}
            onChange={(event) => setExclusions(event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Good to know" hint="One per line.">
        <textarea
          rows={4}
          value={goodToKnow}
          onChange={(event) => setGoodToKnow(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Cover image (shown on cards)
        </p>
        <ImageField value={coverImage} onChange={setCoverImage} />
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Hero image (optional — defaults to the cover)
        </p>
        <ImageField value={heroImage} onChange={setHeroImage} label="Upload hero" />
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Gallery images
        </p>
        <ImageListField value={images} onChange={setImages} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => setFeatured(event.target.checked)}
        />
        Featured on the home page
      </label>

      {error && <p className="text-sm text-burgundy">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className={buttonClass}>
          {saving ? "Saving…" : initial ? "Save changes" : "Create journey"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/journeys")}
          className={ghostButtonClass}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
