import type { ReactNode } from "react";
import Link from "next/link";

const control =
  "mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 text-[15px] text-charcoal placeholder:text-charcoal/35 outline-none transition-colors focus:border-deep-green";

export const labelClass =
  "text-[12px] font-medium tracking-[0.12em] text-charcoal/60 uppercase";

export const submitClass =
  "bg-deep-green px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-ivory uppercase transition-colors hover:bg-forest disabled:opacity-60";

export function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[13px] text-burgundy">{error}</p>}
    </div>
  );
}

export const TextInput = (props: React.ComponentProps<"input">) => (
  <input {...props} className={control} />
);

export const SelectInput = (props: React.ComponentProps<"select">) => (
  <select {...props} className={`${control} bg-ivory`} />
);

export const TextArea = (props: React.ComponentProps<"textarea">) => (
  <textarea {...props} className={`${control} resize-none`} />
);

/** Hidden from people (off-screen, not focusable); bots tend to fill it in. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}

export function ThankYou({
  whatsappUrl,
  onClose,
}: {
  whatsappUrl: string;
  onClose?: () => void;
}) {
  return (
    <div className="py-6">
      <h3 className="font-serif text-3xl text-charcoal">Thank you.</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
        We&apos;ve received your request and will get back to you shortly. A
        WhatsApp chat with your details should have opened in a new tab — if
        it didn&apos;t, use the button below.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={submitClass}
        >
          Open WhatsApp
        </a>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase"
          >
            Close
          </button>
        ) : (
          <Link
            href="/"
            className="border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase"
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
