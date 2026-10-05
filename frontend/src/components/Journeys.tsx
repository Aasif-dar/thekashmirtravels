import { getDestinations, getJourneys, routeNames } from "@/lib/queries";
import JourneyCard from "./JourneyCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import EmptyState from "./EmptyState";

// ADMIN: expects journey records from the backend (featured ones; all if none are featured).
// Required: title, slug, description, duration, destinations, coverImage,
// featured. See ADMIN_DATA_GUIDE.md.
export default async function Journeys() {
  const [featured, destinations] = await Promise.all([
    getJourneys({ featured: true }),
    getDestinations(),
  ]);
  const journeys = featured.length ? featured : await getJourneys();

  return (
    <section id="journeys" className="bg-parchment px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Signature Journeys"
          title="Journeys Made for Kashmir"
          subtitle="A small set of itineraries, each built around a different pace."
        />

        {!journeys.length && (
          <EmptyState message="Our journeys are being prepared." />
        )}

        <div className="mt-14">
          {journeys.map((journey, index) => (
            <Reveal key={journey.slug} delay={index * 80}>
              <JourneyCard
                journey={journey}
                route={routeNames(journey, destinations)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
