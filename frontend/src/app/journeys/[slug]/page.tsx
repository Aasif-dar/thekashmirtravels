import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import BookJourney from "@/components/request/BookJourney";
import WhatsAppTopic from "@/components/WhatsAppTopic";
import JsonLd from "@/components/JsonLd";
import { altText, journeyJsonLd, pageMetadata, truncate } from "@/lib/seo";
import type { Destination, Journey } from "@/lib/types";
import {
  getDestinations,
  getJourneyBySlug,
  getJourneys,
  routeNames,
} from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getJourneys()).map((journey) => ({ slug: journey.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) return {};

  const image = journey.heroImage ?? journey.coverImage;
  return pageMetadata({
    title: journey.title,
    description: truncate(journey.description),
    path: `/journeys/${journey.slug}`,
    image: { url: image.src, alt: altText(image, journey.title) },
  });
}

/** Route stops, linking each one that has a destination page. */
function RouteLinks({
  journey,
  destinations,
  linkClassName,
}: {
  journey: Journey;
  destinations: Destination[];
  linkClassName: string;
}) {
  const names = routeNames(journey, destinations);
  return journey.destinations.map((stopSlug, index) => (
    <Fragment key={`${stopSlug}-${index}`}>
      {index > 0 && " · "}
      {destinations.some((d) => d.slug === stopSlug) ? (
        <Link href={`/destinations/${stopSlug}`} className={linkClassName}>
          {names[index]}
        </Link>
      ) : (
        names[index]
      )}
    </Fragment>
  ));
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) notFound();
  const [destinations, allJourneys] = await Promise.all([
    getDestinations(),
    getJourneys(),
  ]);
  const otherJourneys = allJourneys.filter((item) => item.slug !== slug);
  const heroImage = journey.heroImage ?? journey.coverImage;

  return (
    <>
      <JsonLd data={journeyJsonLd(journey)} />
      <WhatsAppTopic name={journey.title} />
      <Navbar />
      <main>
        <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden bg-charcoal">
          <Image
            src={heroImage.src}
            alt={altText(heroImage, journey.title)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-5xl px-6 pb-16 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              {journey.duration}
              {journey.price
                ? ` · From ₹${journey.price.toLocaleString("en-IN")}`
                : ""}
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              {journey.title}
            </h1>
            <p className="mt-4 text-sm text-ivory/80">
              <RouteLinks
                journey={journey}
                destinations={destinations}
                linkClassName="underline-offset-4 hover:underline"
              />
            </p>
          </div>
        </section>

        <section className="bg-ivory px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
                {journey.description}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <dl className="mt-12 grid gap-8 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
                {journey.duration && (
                  <div>
                    <dt className="text-[11px] font-medium tracking-[0.25em] text-charcoal/50 uppercase">
                      Duration
                    </dt>
                    <dd className="mt-2 text-[15px] text-charcoal/80">
                      {journey.duration}
                    </dd>
                  </div>
                )}
                {journey.forWhom && (
                  <div>
                    <dt className="text-[11px] font-medium tracking-[0.25em] text-charcoal/50 uppercase">
                      Suited to
                    </dt>
                    <dd className="mt-2 text-[15px] text-charcoal/80">
                      {journey.forWhom}
                    </dd>
                  </div>
                )}
                {journey.destinations.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] font-medium tracking-[0.25em] text-charcoal/50 uppercase">
                      Route
                    </dt>
                    <dd className="mt-2 text-[15px] text-charcoal/80">
                      <RouteLinks
                        journey={journey}
                        destinations={destinations}
                        linkClassName="text-deep-green underline underline-offset-4"
                      />
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="bg-ivory px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-3xl text-charcoal">
                The Journey
              </h2>
            </Reveal>

            <div className="mt-12">
              {journey.itinerary.map((day, index) => (
                <Reveal
                  key={day.day}
                  delay={Math.min(index * 60, 300)}
                  className="relative grid grid-cols-[80px_1fr] gap-6 border-l border-charcoal/15 pb-12 pl-8 last:pb-0 sm:grid-cols-[110px_1fr]"
                >
                  <span className="absolute top-0.5 -left-[7px] h-3 w-3 rounded-full bg-gold" />
                  <span className="text-[13px] font-medium tracking-[0.1em] text-deep-green/80 uppercase">
                    {day.day}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-charcoal">
                      {day.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-charcoal/70">
                      {day.description}
                    </p>
                    {day.stay && (
                      <p className="mt-3 text-[13px] text-charcoal/50">
                        Stay — {day.stay}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {journey.images.length > 0 && (
          <section className="bg-ivory px-6 pb-24 sm:px-10">
            <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
              {journey.images.map((image, index) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={altText(image, `${journey.title} – photo ${index + 1}`)}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-parchment px-6 py-20 sm:px-10">
          <div className="mx-auto grid max-w-3xl gap-12 sm:grid-cols-2">
            {journey.inclusions.length > 0 && (
              <Reveal>
                <h2 className="font-serif text-2xl text-charcoal">
                  What&apos;s Included
                </h2>
                <ul className="mt-6 space-y-3">
                  {journey.inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-charcoal/75"
                    >
                      <Check
                        size={16}
                        className="mt-1 flex-none text-deep-green"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {journey.exclusions.length > 0 && (
              <Reveal delay={100}>
                <h2 className="font-serif text-2xl text-charcoal">
                  Not Included
                </h2>
                <ul className="mt-6 space-y-3">
                  {journey.exclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-charcoal/75"
                    >
                      <X
                        size={16}
                        className="mt-1 flex-none text-burgundy/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {journey.goodToKnow.length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl">
              <Reveal>
                <h2 className="font-serif text-2xl text-charcoal">
                  Good to Know
                </h2>
                <ul className="mt-6 space-y-3">
                  {journey.goodToKnow.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] leading-relaxed text-charcoal/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          )}
        </section>

        {otherJourneys.length > 0 && (
          <section className="bg-ivory px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-2xl text-charcoal">
                More Kashmir journeys
              </h2>
              <ul className="mt-6 space-y-3">
                {otherJourneys.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/journeys/${item.slug}`}
                      className="text-[15px] text-deep-green underline underline-offset-4"
                    >
                      {item.title}
                    </Link>
                    {item.duration && (
                      <span className="text-[13px] text-charcoal/50">
                        {" "}
                        — {item.duration}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-deep-green px-6 py-20 text-center sm:px-10">
          <Reveal className="mx-auto max-w-xl">
            <h2 className="font-serif text-3xl text-ivory">
              Ready to plan {journey.title}?
            </h2>
            <BookJourney
              journey={{
                slug: journey.slug,
                title: journey.title,
                duration: journey.duration,
                price: journey.price,
              }}
              className="mt-8 inline-block bg-ivory px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-parchment"
            />
            <Link
              href="/plan-trip"
              className="mt-6 block text-[13px] font-medium tracking-[0.08em] text-ivory/80 uppercase underline-offset-4 hover:underline"
            >
              Or plan a custom trip
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
