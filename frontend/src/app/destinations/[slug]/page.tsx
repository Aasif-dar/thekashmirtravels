import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationSection from "@/components/DestinationSection";
import JourneyCard from "@/components/JourneyCard";
import WhatsAppTopic from "@/components/WhatsAppTopic";
import {
  getDestinationBySlug,
  getDestinations,
  getJourneys,
  routeNames,
} from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getDestinations()).map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  return {
    title: destination.title,
    description:
      destination.description.split(/\n{2,}/)[0] || destination.tagline,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const [allJourneys, destinations] = await Promise.all([
    getJourneys(),
    getDestinations(),
  ]);
  const journeys = allJourneys.filter((journey) =>
    journey.destinations.includes(slug)
  );
  const gallery = destination.galleryImages.slice(1);

  return (
    <>
      <WhatsAppTopic name={destination.title} />
      <Navbar />
      <main>
        <div className="h-20 bg-ivory" />
        <DestinationSection destination={destination} index={0} detail />

        {gallery.length > 0 && (
          <section className="bg-ivory px-6 pb-24 sm:px-10">
            <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
              {gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {journeys.length > 0 && (
          <section className="bg-parchment px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 font-serif text-3xl text-charcoal">
                Journeys through {destination.title}
              </h2>
              {journeys.map((journey) => (
                <JourneyCard
                  key={journey.slug}
                  journey={journey}
                  route={routeNames(journey, destinations)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
