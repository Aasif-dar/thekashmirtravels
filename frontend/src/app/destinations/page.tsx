import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationSection from "@/components/DestinationSection";
import EmptyState from "@/components/EmptyState";
import { getDestinations } from "@/lib/queries";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Places across Kashmir, each with its own mood and explored at its own pace.",
};

export const revalidate = 3600;

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-charcoal">
          <Image
            src={images.dalLakeChinarIslands.src}
            alt={images.dalLakeChinarIslands.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-6xl px-6 pb-14 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              Destinations
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              The Valley, Your Way
            </h1>
          </div>
        </section>

        {!destinations.length && (
          <section className="bg-ivory px-6 py-24 sm:px-10 sm:py-28">
            <EmptyState message="No destinations available yet." />
          </section>
        )}

        {destinations.map((destination, index) => (
          <DestinationSection
            key={destination.slug}
            destination={destination}
            index={index}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
