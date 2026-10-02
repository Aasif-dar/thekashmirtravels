"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demo";
import { Field, buttonClass, inputClass, submitJson } from "./ui";

export default function LoginForm({ demo }: { demo: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(demo ? DEMO_EMAIL : "");
  const [password, setPassword] = useState(demo ? DEMO_PASSWORD : "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const message = await submitJson("/api/auth/login", "POST", {
      email,
      password,
    });
    setBusy(false);
    if (message) return setError(message);

    const next = searchParams.get("next");
    // Only follow same-site admin paths.
    router.push(next?.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Email">
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </Field>
      {error && <p className="text-sm text-burgundy">{error}</p>}
      <button type="submit" disabled={busy} className={`${buttonClass} w-full`}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
