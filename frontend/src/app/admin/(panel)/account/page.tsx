"use client";

import { useState } from "react";
import { Field, buttonClass, inputClass, submitJson } from "@/components/admin/ui";
import { PASSWORD_RULES } from "@/lib/passwordRules";

export default function AccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const failure = await submitJson("/api/auth/password", "POST", {
      currentPassword,
      newPassword,
    });
    setBusy(false);
    if (failure) return setError(failure);
    setCurrentPassword("");
    setNewPassword("");
    setMessage("Password updated.");
  }

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl">Change password</h1>
      <form onSubmit={handleSubmit} className="max-w-sm space-y-5">
        <Field label="Current password">
          <input
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="New password" hint={PASSWORD_RULES}>
          <input
            type="password"
            required
            minLength={10}
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className={inputClass}
          />
        </Field>
        {error && <p className="text-sm text-burgundy">{error}</p>}
        {message && <p className="text-sm text-deep-green">{message}</p>}
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Saving…" : "Update password"}
        </button>
      </form>
    </>
  );
}
