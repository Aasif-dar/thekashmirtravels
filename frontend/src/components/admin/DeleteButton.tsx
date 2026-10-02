"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitJson } from "./ui";

export default function DeleteButton({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusy(true);
    const error = await submitJson(url, "DELETE");
    setBusy(false);
    if (error) window.alert(error);
    else router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="text-sm text-burgundy hover:underline disabled:opacity-50"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
