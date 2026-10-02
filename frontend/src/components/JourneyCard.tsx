import Image from "next/image";
import Link from "next/link";
import BookJourney from "@/components/request/BookJourney";
import { ArrowRight } from "lucide-react";
import type { Journey } from "@/lib/types";

export default function JourneyCard({
  journey,
  route,
}: {
  journey: Journey;
  route: string[];
}) {
  return (
    <div
      className="group relative grid grid-cols-1 gap-6 border-t border-charcoal/12 py-10 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-8"
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:col-span-4">
        <Image
          src={journey.coverImage.src}
          alt={journey.coverImage.alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-col justify-between sm:col-span-8">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
              {journey.title}
            </h3>
            <span className="text-[12px] font-medium tracking-[0.15em] text-deep-green/80 uppercase">
              {journey.duration}
            </span>
          </div>
          <p className="mt-2 text-sm text-charcoal/60">
            {route.join(" · ")}
          </p>
          <p className="mt-1 text-sm text-gold">{journey.forWhom}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal/70">
            {journey.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[12px] font-medium tracking-[0.15em] text-charcoal/50 uppercase">
            {journey.price
              ? `From ₹${journey.price.toLocaleString("en-IN")}`
              : "Price on request"}
          </span>
          <div className="flex items-center gap-6">
            <BookJourney
              journey={{
                slug: journey.slug,
                title: journey.title,
                duration: journey.duration,
                price: journey.price,
              }}
              label="Book this journey"
              className="relative z-10 border border-deep-green px-5 py-2 text-[12px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-deep-green hover:text-ivory"
            />
            <Link
              href={`/journeys/${journey.slug}`}
              className="flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase after:absolute after:inset-0"
            >
              View Journey
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
