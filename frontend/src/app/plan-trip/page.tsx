import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PlanTripForm from "@/components/request/PlanTripForm";
import { getDestinations } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Tell us how you want to travel Kashmir and we'll shape a custom itinerary around it.",
};

export default async function PlanTripPage() {
  const destinations = (await getDestinations()).map(({ slug, title }) => ({
    slug,
    title,
  }));

  return (
    <>
      <Navbar />
      <main className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
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

          <div className="mt-14">
            <Suspense fallback={null}>
              <PlanTripForm destinations={destinations} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
