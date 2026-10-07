"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demo";
import { PASSWORD_RULES, passwordProblem } from "@/lib/passwordRules";
import OtpInput from "./OtpInput";
import { Field, buttonClass, inputClass } from "./ui";

type Step = "credentials" | "otp" | "forgot" | "reset";
type OtpFlow = "login" | "reset";

type ApiResult = {
  ok: boolean;
  status: number;
  data: Record<string, unknown>;
  error: string;
};

async function post(url: string, body?: unknown): Promise<ApiResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    const issues = Array.isArray(data.issues)
      ? data.issues.map((i: { message: string }) => i.message).join(" ")
      : "";
    return {
      ok: response.ok,
      status: response.status,
      data,
      error: issues || data.error || `Request failed (${response.status})`,
    };
  } catch {
    return { ok: false, status: 0, data: {}, error: "Network error. Please try again." };
  }
}

/** Re-renders every second while `active`, returning the current time. */
function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

const mmss = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

function PasswordInput({
  value,
  onChange,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-charcoal/50 hover:text-charcoal"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

const linkClass =
  "text-sm text-deep-green underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-charcoal/40 disabled:no-underline";

export default function LoginForm({ demo }: { demo: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("credentials");
  const [flow, setFlow] = useState<OtpFlow>("login");
  const [email, setEmail] = useState(demo ? DEMO_EMAIL : "");
  const [password, setPassword] = useState(demo ? DEMO_PASSWORD : "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const now = useNow(step === "otp");
  const expired = step === "otp" && expiresAt > 0 && now >= expiresAt;
  const resendIn = Math.max(0, resendAt - now);

  function go(next: Step, message = "") {
    setStep(next);
    setError("");
    setNotice(message);
    setCode("");
  }

  function startOtp(result: ApiResult, nextFlow: OtpFlow) {
    setFlow(nextFlow);
    setExpiresAt(Number(result.data.expiresAt) || Date.now() + 10 * 60 * 1000);
    setResendAt(Number(result.data.resendAt) || Date.now() + 60 * 1000);
    go("otp");
  }

  function enterAdmin() {
    const next = searchParams.get("next");
    // Only follow same-site admin paths.
    router.push(next?.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  async function run(task: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await task();
    } finally {
      setBusy(false);
    }
  }

  const submitCredentials = (event: React.FormEvent) => {
    event.preventDefault();
    void run(async () => {
      const result = await post("/api/auth/login", { email, password });
      if (!result.ok) return setError(result.error);
      setPassword("");
      if (result.data.otpRequired) startOtp(result, "login");
      else enterAdmin(); // demo mode signs in directly
    });
  };

  const submitCode = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length !== 6) return setError("Enter the 6-digit code.");
    void run(async () => {
      const result = await post("/api/auth/otp/verify", { code });
      if (!result.ok) {
        setCode("");
        if (result.data.restart) return go(flow === "login" ? "credentials" : "forgot", result.error);
        return setError(result.error);
      }
      if (result.data.next === "reset") go("reset");
      else enterAdmin();
    });
  };

  const resend = () =>
    void run(async () => {
      const result = await post("/api/auth/otp/resend");
      if (!result.ok) {
        if (result.data.restart) return go(flow === "login" ? "credentials" : "forgot", result.error);
        if (result.data.retryAfter) setResendAt(Date.now() + Number(result.data.retryAfter) * 1000);
        return setError(result.error);
      }
      setCode("");
      setExpiresAt(Number(result.data.expiresAt));
      setResendAt(Number(result.data.resendAt));
      setNotice("A new code has been sent. Earlier codes no longer work.");
    });

  const submitForgot = (event: React.FormEvent) => {
    event.preventDefault();
    void run(async () => {
      const result = await post("/api/auth/forgot", { email });
      if (!result.ok) return setError(result.error);
      startOtp(result, "reset");
      setNotice("If that email belongs to an admin account, a code is on its way.");
    });
  };

  const submitReset = (event: React.FormEvent) => {
    event.preventDefault();
    const problem = passwordProblem(newPassword);
    if (problem) return setError(problem);
    if (newPassword !== confirmPassword) return setError("The passwords do not match.");
    void run(async () => {
      const result = await post("/api/auth/reset", { password: newPassword, confirmPassword });
      if (!result.ok) {
        if (result.data.restart) return go("forgot", result.error);
        return setError(result.error);
      }
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");
      go("credentials", "Your password has been updated. Sign in with your new password.");
    });
  };

  const heading = {
    credentials: ["Admin", "Sign in to manage destinations and journeys."],
    otp: ["Verify your email", "Enter the 6-digit code sent to your email."],
    forgot: ["Reset your password", "Enter your admin email and we'll send you a verification code."],
    reset: ["Create new password", PASSWORD_RULES],
  }[step];

  const messages = (
    <>
      {notice && <p className="text-sm text-deep-green">{notice}</p>}
      {error && (
        <p role="alert" className="text-sm text-burgundy">
          {error}
        </p>
      )}
    </>
  );

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal">{heading[0]}</h1>
      <p className="mt-1 mb-6 text-sm text-charcoal/60">{heading[1]}</p>

      {step === "credentials" && (
        <form onSubmit={submitCredentials} className="space-y-5">
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
            <PasswordInput value={password} onChange={setPassword} autoComplete="current-password" />
          </Field>
          {messages}
          <button type="submit" disabled={busy} className={`${buttonClass} w-full`}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {!demo && (
            <div className="text-center">
              <button type="button" onClick={() => go("forgot")} className={linkClass}>
                Forgot password?
              </button>
            </div>
          )}
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={submitCode} className="space-y-5">
          <OtpInput value={code} onChange={setCode} disabled={busy || expired} />
          <p className="text-center text-xs text-charcoal/60">
            {expired ? (
              <span className="text-burgundy">
                Your verification code has expired. Please request a new code.
              </span>
            ) : (
              <>Code expires in {mmss(expiresAt - now)}</>
            )}
          </p>
          {messages}
          <button
            type="submit"
            disabled={busy || expired || code.length !== 6}
            className={`${buttonClass} w-full`}
          >
            {busy ? "Verifying…" : "Verify OTP"}
          </button>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(flow === "login" ? "credentials" : "forgot")}
              className={linkClass}
            >
              Back
            </button>
            <button type="button" onClick={resend} disabled={busy || resendIn > 0} className={linkClass}>
              {resendIn > 0 ? `Resend OTP in ${Math.ceil(resendIn / 1000)}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      )}

      {step === "forgot" && (
        <form onSubmit={submitForgot} className="space-y-5">
          <Field label="Admin email">
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </Field>
          {messages}
          <button type="submit" disabled={busy} className={`${buttonClass} w-full`}>
            {busy ? "Sending…" : "Send code"}
          </button>
          <div className="text-center">
            <button type="button" onClick={() => go("credentials")} className={linkClass}>
              Back to sign in
            </button>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={submitReset} className="space-y-5">
          <Field label="New password">
            <PasswordInput value={newPassword} onChange={setNewPassword} autoComplete="new-password" />
          </Field>
          <Field label="Confirm new password">
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />
          </Field>
          {messages}
          <button type="submit" disabled={busy} className={`${buttonClass} w-full`}>
            {busy ? "Saving…" : "Update password"}
          </button>
        </form>
      )}
    </div>
  );
}
