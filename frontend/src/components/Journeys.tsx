import { journeys } from "@/data/journeys";
import JourneyCard from "./JourneyCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Journeys() {
  return (
    <section id="journeys" className="bg-parchment px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Signature Journeys"
          title="Journeys Made for Kashmir"
          subtitle="A small set of itineraries, each built around a different pace."
        />

        <div className="mt-14">
          {journeys.map((journey, index) => (
            <Reveal key={journey.slug} delay={index * 80}>
              <JourneyCard journey={journey} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
