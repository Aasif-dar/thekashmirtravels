"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { ImageRef } from "@/lib/types";
import { useDemo } from "./DemoContext";
import { ghostButtonClass, inputClass } from "./ui";

async function uploadToCloudinary(file: File): Promise<string> {
  const signResponse = await fetch("/api/upload/sign", { method: "POST" });
  if (!signResponse.ok) {
    const data = await signResponse.json().catch(() => ({}));
    throw new Error(data.error ?? "Could not get upload signature");
  }
  const { cloudName, apiKey, folder, timestamp, signature } =
    await signResponse.json();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? "Upload failed");
  return data.secure_url as string;
}

/**
 * Demo mode: no Cloudinary. Read the picked image, shrink it and keep it as a
 * data URL so it persists across reloads (object URLs would not).
 */
async function fileToDataUrl(file: File, maxSize = 1000): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

/** Demo mode: paste an image URL instead of uploading. */
function PasteUrl({ onUrl }: { onUrl: (url: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="…or paste an image URL (https://… or /images/…)"
        className={`${inputClass} w-72`}
      />
      <button
        type="button"
        disabled={!value.trim()}
        onClick={() => {
          onUrl(value.trim());
          setValue("");
        }}
        className={ghostButtonClass}
      >
        Use URL
      </button>
    </div>
  );
}

function UploadButton({
  label,
  multiple,
  onUploaded,
}: {
  label: string;
  multiple?: boolean;
  onUploaded: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const demo = useDemo();

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const upload = demo ? fileToDataUrl : uploadToCloudinary;
      const urls = await Promise.all(Array.from(files).map((file) => upload(file)));
      onUploaded(urls);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={(event) => handleFiles(event.target.files)}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className={ghostButtonClass}
      >
        {busy ? "Uploading…" : label}
      </button>
      {demo && <PasteUrl onUrl={(url) => onUploaded([url])} />}
      {error && <p className="mt-1 text-xs text-burgundy">{error}</p>}
    </div>
  );
}

function Preview({
  image,
  onChange,
  onRemove,
}: {
  image: ImageRef;
  onChange: (image: ImageRef) => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative w-40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="h-28 w-40 border border-charcoal/15 object-cover"
      />
      <button
        type="button"
        aria-label="Remove image"
        onClick={onRemove}
        className="absolute top-1 right-1 grid h-6 w-6 place-items-center bg-charcoal/80 text-ivory"
      >
        <X size={14} />
      </button>
      <input
        value={image.alt}
        onChange={(event) => onChange({ ...image, alt: event.target.value })}
        placeholder="Alt text"
        className={`${inputClass} mt-1.5 !py-1 text-xs`}
      />
    </div>
  );
}

export function ImageField({
  value,
  onChange,
  label = "Upload image",
}: {
  value?: ImageRef;
  onChange: (image: ImageRef | undefined) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {value && (
        <Preview
          image={value}
          onChange={onChange}
          onRemove={() => onChange(undefined)}
        />
      )}
      <UploadButton
        label={value ? "Replace image" : label}
        onUploaded={([src]) => onChange({ src, alt: value?.alt ?? "" })}
      />
    </div>
  );
}

export function ImageListField({
  value,
  onChange,
}: {
  value: ImageRef[];
  onChange: (images: ImageRef[]) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {value.map((image, index) => (
        <Preview
          key={image.src}
          image={image}
          onChange={(next) =>
            onChange(value.map((item, i) => (i === index ? next : item)))
          }
          onRemove={() => onChange(value.filter((_, i) => i !== index))}
        />
      ))}
      <UploadButton
        label="Add images"
        multiple
        onUploaded={(urls) =>
          onChange([...value, ...urls.map((src) => ({ src, alt: "" }))])
        }
      />
    </div>
  );
}
