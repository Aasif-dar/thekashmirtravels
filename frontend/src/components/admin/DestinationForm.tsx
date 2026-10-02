"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Destination, ImageRef } from "@/lib/types";
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

export default function DestinationForm({
  initial,
}: {
  initial?: Destination;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [country, setCountry] = useState(initial?.country ?? "India");
  const [region, setRegion] = useState(initial?.region ?? "");
  const [highlights, setHighlights] = useState(
    (initial?.highlights ?? []).join("\n")
  );
  const [coverImage, setCoverImage] = useState<ImageRef | undefined>(
    initial?.coverImage
  );
  const [galleryImages, setGalleryImages] = useState<ImageRef[]>(
    initial?.galleryImages ?? []
  );
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      tagline,
      description,
      country,
      region,
      highlights: toLines(highlights),
      coverImage,
      galleryImages,
      featured,
    };
    const message = initial
      ? await submitJson(`/api/destinations/${initial.slug}`, "PUT", body)
      : await submitJson("/api/destinations", "POST", body);
    setSaving(false);
    if (message) return setError(message);
    router.push("/admin/destinations");
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

      <Field label="Tagline">
        <input
          value={tagline}
          onChange={(event) => setTagline(event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Description" hint="Separate paragraphs with a blank line.">
        <textarea
          rows={7}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Country">
          <input
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Region">
          <input
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Highlights" hint="One per line.">
        <textarea
          rows={4}
          value={highlights}
          onChange={(event) => setHighlights(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Cover image
        </p>
        <ImageField value={coverImage} onChange={setCoverImage} />
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
          Gallery images
        </p>
        <p className="mb-2 text-xs text-charcoal/50">
          The first gallery image is used as the large photo on the
          destinations page.
        </p>
        <ImageListField value={galleryImages} onChange={setGalleryImages} />
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
          {saving ? "Saving…" : initial ? "Save changes" : "Create destination"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/destinations")}
          className={ghostButtonClass}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
