import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import JourneyCard from "@/components/JourneyCard";
import { getDestinations, getJourneys, routeNames } from "@/lib/queries";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Journeys",
  description:
    "A small set of curated Kashmir itineraries — the classic route, a slower pace, winter in the snow, and journeys built for two.",
};

export const revalidate = 3600;

export default async function JourneysPage() {
  const [journeys, destinations] = await Promise.all([
    getJourneys(),
    getDestinations(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-charcoal">
          <Image
            src={images.pahalgam.src}
            alt={images.pahalgam.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-6xl px-6 pb-14 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              Journeys
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              Journeys Made for Kashmir
            </h1>
          </div>
        </section>

        <section className="bg-parchment px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-6xl">
            {!journeys.length && (
              <EmptyState message="Our journeys are being prepared." />
            )}
            {journeys.map((journey) => (
              <JourneyCard
                key={journey.slug}
                journey={journey}
                route={routeNames(journey, destinations)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
