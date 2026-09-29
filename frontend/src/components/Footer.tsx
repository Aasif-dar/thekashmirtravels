import Link from "next/link";
import { contact, whatsappLink } from "@/data/contact";

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
              The Kashmir Travels
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ivory/65">
              Journeys through Kashmir, planned by people who call the valley
              home.
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
                  href={`https://instagram.com/${contact.instagram.replace(
                    "@",
                    ""
                  )}`}
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
          <p>&copy; {new Date().getFullYear()} The Kashmir Travels</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ivory/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory/80">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
