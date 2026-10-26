import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationSection from "@/components/DestinationSection";
import JourneyCard from "@/components/JourneyCard";
import WhatsAppTopic from "@/components/WhatsAppTopic";
import DestinationGuide from "@/components/DestinationGuide";
import JsonLd from "@/components/JsonLd";
import { destinationGuides } from "@/data/destinationGuides";
import { altText, destinationJsonLd, pageMetadata, truncate } from "@/lib/seo";
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

  return pageMetadata({
    title: `${destination.title}, Kashmir – Travel Guide & Tours`,
    description: truncate(
      destination.description.split(/\n{2,}/)[0] || destination.tagline
    ),
    path: `/destinations/${destination.slug}`,
    image: {
      url: destination.coverImage.src,
      alt: altText(destination.coverImage, `${destination.title}, Kashmir`),
    },
  });
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
  const guide = destinationGuides[destination.slug];
  const others = destinations.filter((item) => item.slug !== slug);

  return (
    <>
      <JsonLd data={destinationJsonLd(destination)} />
      <WhatsAppTopic name={destination.title} />
      <Navbar />
      <main>
        <div className="h-20 bg-ivory" />
        <DestinationSection destination={destination} index={0} detail />

        {gallery.length > 0 && (
          <section className="bg-ivory px-6 pb-24 sm:px-10">
            <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
              {gallery.map((image, index) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={altText(
                      image,
                      `${destination.title}, Kashmir – photo ${index + 2}`
                    )}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {guide && <DestinationGuide title={destination.title} guide={guide} />}

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

        {others.length > 0 && (
          <section className="bg-ivory px-6 py-20 sm:px-10 sm:py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-serif text-3xl text-charcoal">
                More places to explore in Kashmir
              </h2>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/destinations/${item.slug}`}
                      className="inline-flex w-fit items-center gap-2 border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:border-charcoal hover:text-charcoal"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
