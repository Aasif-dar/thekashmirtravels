import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { contact, whatsappLink } from "@/data/contact";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Tell us how you want to travel Kashmir and we'll help shape the itinerary — reach us by form, WhatsApp or email.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.3em] text-deep-green/70 uppercase">
              Plan Your Trip
            </p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">
              Tell us how you want to travel.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-charcoal/70">
              A few details are enough to start — we&apos;ll follow up with
              questions and a first draft of the itinerary.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr]">
            <Reveal delay={100}>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
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
                      href={`https://instagram.com/${contact.instagram.replace(
                        "@",
                        ""
                      )}`}
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
