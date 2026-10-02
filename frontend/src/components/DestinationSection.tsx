import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Destination } from "@/lib/types";

export default function DestinationSection({
  destination,
  index,
  detail = false,
}: {
  destination: Destination;
  index: number;
  detail?: boolean;
}) {
  const image = destination.galleryImages[0] ?? destination.coverImage;
  const paragraphs = destination.description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
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
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow={destination.tagline || destination.region}
              title={destination.title}
            />
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] leading-relaxed text-charcoal/75 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {destination.highlights.length > 0 && (
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
            )}

            <Link
              href={detail ? "/journeys" : `/destinations/${destination.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:border-charcoal hover:text-charcoal"
            >
              {detail ? "See Journeys" : `Explore ${destination.title}`}
            </Link>
            {detail && (
              <Link
                href={`/plan-trip?destination=${destination.slug}`}
                className="mt-4 inline-flex w-fit items-center gap-2 border-b border-deep-green pb-1 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:border-charcoal hover:text-charcoal"
              >
                Plan a trip to {destination.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
