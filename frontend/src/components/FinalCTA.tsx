import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/data/contact";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-charcoal px-6 py-28 sm:px-10">
      <div className="absolute inset-0">
        <Image
          src={site.finalCta.image.src}
          alt={site.finalCta.image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.15] text-ivory sm:text-5xl">
            {site.finalCta.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/80 sm:text-lg">
            {site.finalCta.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/plan-trip"
              className="bg-ivory px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-parchment"
            >
              Plan My Trip
            </Link>
            <a
              href={whatsappLink(
                "Hi! I'd like to plan a trip to Kashmir."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-ivory/50 pb-1 text-[13px] font-medium tracking-[0.08em] text-ivory uppercase transition-colors hover:border-ivory"
            >
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
