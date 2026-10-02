import type { ReactNode } from "react";

export const inputClass =
  "w-full border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-deep-green";

export const buttonClass =
  "inline-flex items-center justify-center bg-deep-green px-5 py-2.5 text-[13px] font-medium tracking-[0.06em] text-ivory uppercase transition-colors hover:bg-forest disabled:opacity-50";

export const ghostButtonClass =
  "inline-flex items-center justify-center border border-charcoal/25 px-4 py-2 text-[13px] text-charcoal transition-colors hover:bg-parchment disabled:opacity-50";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium tracking-[0.1em] text-charcoal/60 uppercase">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-charcoal/50">{hint}</span>}
    </label>
  );
}

export const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Send JSON to the API and return an error message, or null on success. */
export async function submitJson(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<string | null> {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.ok) return null;
  const data = await response.json().catch(() => ({}));
  const issues = Array.isArray(data.issues)
    ? data.issues
        .map((i: { path: string; message: string }) => `${i.path}: ${i.message}`)
        .join("; ")
    : "";
  return issues || data.error || `Request failed (${response.status})`;
}
