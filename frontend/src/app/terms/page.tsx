import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory px-6 pt-32 pb-24 sm:px-10 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-4xl text-charcoal">
            Terms of Service
          </h1>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal/75">
            <p>
              This page is a placeholder. Add your actual booking terms,
              cancellation policy and liability terms here before launch.
            </p>
            <p>
              For questions in the meantime, reach us at{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-deep-green underline underline-offset-4"
              >
                {contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
