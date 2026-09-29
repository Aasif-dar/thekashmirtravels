import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { destinationDetails } from "@/data/destinationDetails";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Four places, four different moods — Srinagar, Gulmarg, Pahalgam and Sonamarg, each explored at its own pace.",
};

export default function DestinationsPage() {
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

        {destinationDetails.map((destination, index) => (
          <section
            key={destination.slug}
            id={destination.slug}
            className={
              index % 2 === 0
                ? "bg-ivory px-6 py-24 sm:px-10 sm:py-28"
                : "bg-parchment px-6 py-24 sm:px-10 sm:py-28"
            }
          >
            <div className="mx-auto max-w-6xl">
              <div
                className={`grid gap-10 md:grid-cols-2 md:gap-16 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3.4]">
                  <Image
                    src={destination.heroImage.src}
                    alt={destination.heroImage.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>

                <div className="flex flex-col justify-center">
                  <SectionHeading
                    eyebrow={destination.tagline}
                    title={destination.name}
                  />
                  <div className="mt-6 space-y-4">
                    {destination.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-relaxed text-charcoal/75 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-8 space-y-2.5 border-t border-charcoal/10 pt-6">
                    {destination.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[14px] text-charcoal/70"
                      >
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/journeys"
                    className="mt-8 inline-flex w-fit items-center gap-2 border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:border-charcoal hover:text-charcoal"
                  >
                    See Journeys Here
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
