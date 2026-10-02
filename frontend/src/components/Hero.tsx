import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={site.hero.image.src}
          alt={site.hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/50" />
      </div>

      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-6 sm:px-10">
        <p
          className="animate-fade-up text-[11px] font-medium tracking-[0.35em] text-ivory/80 uppercase"
          style={{ animationDelay: "200ms" }}
        >
          {site.hero.eyebrow}
        </p>
        <h1
          className="animate-fade-up mt-6 max-w-3xl font-serif text-4xl leading-[1.1] font-normal text-ivory sm:text-6xl md:text-7xl"
          style={{ animationDelay: "400ms" }}
        >
          {site.hero.heading}
        </h1>
        <p
          className="animate-fade-up mt-7 max-w-md text-base leading-relaxed text-ivory/85 sm:text-lg"
          style={{ animationDelay: "650ms" }}
        >
          {site.hero.subheading}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-5"
          style={{ animationDelay: "850ms" }}
        >
          <Link
            href="/plan-trip"
            className="bg-ivory px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-parchment"
          >
            {site.hero.ctaLabel}
          </Link>
          <Link
            href="/destinations"
            className="border-b border-ivory/50 pb-1 text-[13px] font-medium tracking-[0.08em] text-ivory uppercase transition-colors hover:border-ivory"
          >
            {site.hero.secondaryCtaLabel}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="h-10 w-px bg-ivory/40" />
        <span className="animate-scroll-hint block h-1.5 w-1.5 rounded-full bg-ivory/70" />
      </div>
    </section>
  );
}
