import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { contact, whatsappLink } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach The Kashmir Travels by WhatsApp or email, book a journey, or tell us about a custom trip.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.3em] text-deep-green/70 uppercase">
              Contact
            </p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">
              Let&apos;s plan your Kashmir trip.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-charcoal/70">
              Pick a ready-made journey, or tell us about a trip you have in
              mind — we&apos;ll follow up on WhatsApp and email.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr]">
            <Reveal delay={100}>
              <div className="space-y-6">
                <Link
                  href="/journeys"
                  className="block border border-charcoal/15 p-8 transition-colors hover:border-deep-green"
                >
                  <h2 className="font-serif text-2xl text-charcoal">
                    Choose a plan
                  </h2>
                  <p className="mt-2 text-[15px] text-charcoal/70">
                    Browse our journeys and book the one that fits.
                  </p>
                </Link>
                <Link
                  href="/plan-trip"
                  className="block border border-charcoal/15 p-8 transition-colors hover:border-deep-green"
                >
                  <h2 className="font-serif text-2xl text-charcoal">
                    Plan a custom trip
                  </h2>
                  <p className="mt-2 text-[15px] text-charcoal/70">
                    Tell us your dates, budget and interests and we&apos;ll
                    design it around you.
                  </p>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border-t border-charcoal/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16">
                <p className="text-[11px] font-medium tracking-[0.25em] text-charcoal/50 uppercase">
                  Reach Us Directly
                </p>
                <ul className="mt-6 space-y-4 text-[15px] text-charcoal/75">
                  <li>{contact.location}</li>
                  <li>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-deep-green"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="transition-colors hover:text-deep-green"
                    >
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-deep-green"
                    >
                      {contact.instagram}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
