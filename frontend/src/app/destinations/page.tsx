import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationSection from "@/components/DestinationSection";
import EmptyState from "@/components/EmptyState";
import { getDestinations } from "@/lib/queries";
import { images } from "@/data/images";
import { pageMetadata, truncate } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const names = (await getDestinations()).map((destination) => destination.title);
  const list =
    names.length > 1
      ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
      : names[0];

  return pageMetadata({
    title: "Places to Visit in Kashmir",
    description: truncate(
      list
        ? `Explore ${list}: what each Kashmir destination is known for, when to visit, and the journeys that include it.`
        : "Explore Kashmir destinations with Fastpacker: what each place is known for and journeys that include it."
    ),
    path: "/destinations",
    image: {
      url: images.dalLakeChinarIslands.src,
      alt: images.dalLakeChinarIslands.alt,
    },
  });
}

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
