"use client";

import { useRef } from "react";

/** Six single-digit boxes: auto-advance, backspace to go back, paste a full code. */
export default function OtpInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  function setAt(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, 6));
  }

  return (
    <div className="flex justify-between gap-2" role="group" aria-label="6-digit code">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={digit}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          className="h-12 w-11 border border-charcoal/20 bg-white text-center font-serif text-xl text-charcoal outline-none focus:border-deep-green disabled:opacity-50"
          onChange={(event) => {
            const typed = event.target.value.replace(/\D/g, "");
            if (!typed) return setAt(i, "");
            if (typed.length > 1) {
              // Autofill / paste into one box.
              onChange(typed.slice(0, 6));
              refs.current[Math.min(typed.length, 6) - 1]?.focus();
              return;
            }
            setAt(i, typed);
            refs.current[i + 1]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digit) refs.current[i - 1]?.focus();
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
            if (!pasted) return;
            event.preventDefault();
            onChange(pasted.slice(0, 6));
            refs.current[Math.min(pasted.length, 6) - 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}
