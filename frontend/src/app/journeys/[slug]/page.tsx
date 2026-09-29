import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { journeys, getJourneyBySlug } from "@/data/journeys";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);
  if (!journey) return {};

  return {
    title: journey.title,
    description: journey.summary,
  };
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);
  if (!journey) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden bg-charcoal">
          <Image
            src={journey.heroImage.src}
            alt={journey.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-5xl px-6 pb-16 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              {journey.duration}
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              {journey.title}
            </h1>
            <p className="mt-4 text-sm text-ivory/80">
              {journey.route.join(" · ")}
            </p>
          </div>
        </section>

        <section className="bg-ivory px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
                {journey.summary}
              </p>
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
              {journey.days.map((day, index) => (
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

        <section className="bg-parchment px-6 py-20 sm:px-10">
          <div className="mx-auto grid max-w-3xl gap-12 sm:grid-cols-2">
            <Reveal>
              <h3 className="font-serif text-2xl text-charcoal">
                What&apos;s Included
              </h3>
              <ul className="mt-6 space-y-3">
                {journey.included.map((item) => (
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
            <Reveal delay={100}>
              <h3 className="font-serif text-2xl text-charcoal">
                Not Included
              </h3>
              <ul className="mt-6 space-y-3">
                {journey.notIncluded.map((item) => (
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
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Reveal>
              <h3 className="font-serif text-2xl text-charcoal">
                Good to Know
              </h3>
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
        </section>

        <section className="bg-deep-green px-6 py-20 text-center sm:px-10">
          <Reveal className="mx-auto max-w-xl">
            <h3 className="font-serif text-3xl text-ivory">
              Ready to plan {journey.title}?
            </h3>
            <Link
              href={`/contact?journey=${encodeURIComponent(journey.title)}`}
              className="mt-8 inline-block bg-ivory px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase transition-colors hover:bg-parchment"
            >
              Plan This Journey
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
