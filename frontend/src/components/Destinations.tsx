import { destinations } from "@/data/destinations";
import DestinationCard from "./DestinationCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Destinations() {
  const [srinagar, gulmarg, pahalgam, sonamarg] = destinations;

  return (
    <section id="destinations" className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Destinations"
            title="The Valley, Your Way"
            subtitle="Four places. Four different moods."
          />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-4">
          <Reveal className="md:col-span-7" delay={0}>
            <DestinationCard
              destination={srinagar}
              className="aspect-[4/5] sm:aspect-[16/13] md:aspect-auto md:h-[560px]"
              imageSizes="(min-width: 768px) 58vw, 100vw"
              priority
            />
          </Reveal>

          <div className="grid gap-4 md:col-span-5">
            <Reveal delay={150}>
              <DestinationCard
                destination={gulmarg}
                className="aspect-[16/11] md:h-[270px]"
              />
            </Reveal>
            <Reveal delay={250}>
              <DestinationCard
                destination={pahalgam}
                className="aspect-[16/11] md:h-[270px]"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={100} className="mt-4">
          <DestinationCard
            destination={sonamarg}
            className="aspect-[16/9] md:h-[420px]"
            imageSizes="100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
