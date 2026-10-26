import Reveal from "@/components/Reveal";
import type { DestinationGuide as Guide } from "@/data/destinationGuides";

export default function DestinationGuide({
  title,
  guide,
}: {
  title: string;
  guide: Guide;
}) {
  return (
    <section className="bg-ivory px-6 pb-24 sm:px-10 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 border-t border-charcoal/10 pt-16 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-serif text-3xl text-charcoal">
            About {title}
          </h2>
          <div className="mt-6 space-y-4">
            {guide.about.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[15px] leading-relaxed text-charcoal/75 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-3xl text-charcoal">
            Visiting {title}
          </h2>
          <h3 className="mt-6 font-serif text-xl text-charcoal">
            Best time to visit
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
            {guide.bestTime}
          </p>
          <h3 className="mt-6 font-serif text-xl text-charcoal">
            Getting there
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
            {guide.gettingThere}
          </p>
          <p className="mt-6 text-[13px] text-charcoal/50">
            Distances and seasons are approximate and vary with weather and
            road conditions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
