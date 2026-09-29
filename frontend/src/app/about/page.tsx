import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Kashmir Travels is a locally based team planning personal journeys through the valley — beyond the standard itinerary.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex h-[52vh] min-h-[400px] items-end overflow-hidden bg-charcoal">
          <Image
            src={images.houseboat.src}
            alt={images.houseboat.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-6xl px-6 pb-14 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              About
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              Experience Kashmir, Beyond the Itinerary.
            </h1>
          </div>
        </section>

        <section className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <p className="font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
                We started this because most Kashmir itineraries read like a
                checklist — and the valley deserves better than that.
              </p>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
                <p>
                  We are a small, Kashmir-based team. Everyone who plans your
                  trip has grown up around Dal Lake, driven the road to
                  Gulmarg more times than they can count, and knows which
                  corner of Pahalgam is worth the extra half hour.
                </p>
                <p>
                  That familiarity is the whole point. Instead of a fixed
                  package, we start with a conversation — how you like to
                  travel, how much you want planned versus left open — and
                  build the journey from there.
                </p>
                <p>
                  It also means we&apos;re reachable while you&apos;re here,
                  not just before you book. If the weather changes the plan,
                  or you simply want to stay another day by the river, we
                  work it out in real time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.artisan.src}
                alt={images.artisan.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <section className="bg-parchment px-6 py-24 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 sm:grid-cols-3">
              <Reveal>
                <p className="font-serif text-5xl text-gold">01</p>
                <h3 className="mt-4 font-serif text-xl text-charcoal">
                  A Conversation First
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
                  Before any itinerary, we ask how you actually want to
                  travel — and build around that answer.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="font-serif text-5xl text-gold">02</p>
                <h3 className="mt-4 font-serif text-xl text-charcoal">
                  Stays With Character
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
                  Houseboats, lodges and cottages we&apos;ve stayed in
                  ourselves — chosen for quality, not just availability.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="font-serif text-5xl text-gold">03</p>
                <h3 className="mt-4 font-serif text-xl text-charcoal">
                  Support While You Travel
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
                  A local contact throughout your trip — for changes,
                  questions, or simply a recommendation.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-deep-green px-6 py-20 text-center sm:px-10">
          <Reveal className="mx-auto max-w-xl">
            <h3 className="font-serif text-3xl text-ivory">
              Let&apos;s talk about your Kashmir.
            </h3>
            <Link
              href="/contact"
              className="mt-8 inline-block bg-ivory px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-parchment"
            >
              Plan Your Trip
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
