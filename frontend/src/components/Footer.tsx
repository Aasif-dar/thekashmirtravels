import Link from "next/link";
import { Mail } from "lucide-react";
import { contact, whatsappLink } from "@/data/contact";
import { site } from "@/data/site";

const nav = [
  { href: "/journeys", label: "Journeys" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-green px-6 pt-20 pb-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-ivory">
              {site.brandName}
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ivory/65">
              {site.footer.blurb}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] text-ivory/50 uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] text-ivory/50 uppercase">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-[15px] text-ivory/75">
              <li>{contact.location}</li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ivory"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-ivory"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ivory"
                >
                  {contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-[13px] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.brandName}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ivory/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory/80">
              Terms
            </Link>
          </div>
        </div>

        <DeveloperCredit />
      </div>
    </footer>
  );
}

// Developer attribution — a quiet signature, not a banner.
const credit = [
  {
    href: "https://www.instagram.com/asif_dar5/",
    label: "Asif Manzoor on Instagram",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/asifmanzoor2002/",
    label: "Asif Manzoor on LinkedIn",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.6 4.77 5.98v5.48h-4v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.26-1.87 2.57v4.94H10v-11Z" />
      </svg>
    ),
  },
  {
    href: "mailto:asifdar2002@gmail.com",
    label: "Email Asif Manzoor",
    external: false,
    icon: <Mail size={15} strokeWidth={1.6} aria-hidden="true" />,
  },
];

function DeveloperCredit() {
  return (
    <div className="mt-10">
      {/* gold hairline that fades out at both ends */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="mt-7 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* signature */}
        <a
          href={credit[1].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Asif Manzoor — website developer"
          className="group flex items-center gap-4"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 font-serif text-[13px] tracking-widest text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-green">
            AM
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-gold/15 transition-all duration-500 group-hover:-inset-1.5 group-hover:border-gold/30"
            />
          </span>

          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-medium tracking-[0.3em] text-ivory/40 uppercase">
              Designed &amp; developed by
            </span>
            <span className="mt-2 font-serif text-[18px] text-ivory/85 italic transition-colors duration-500 group-hover:text-gold">
              Asif Manzoor
            </span>
          </span>
        </a>

        {/* social orbs */}
        <div className="flex items-center gap-3">
          {credit.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}