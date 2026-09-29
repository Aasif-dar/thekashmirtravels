import Image from "next/image";
import { experiences } from "@/data/experiences";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experiences() {
  return (
    <section id="experiences" className="bg-deep-green px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experiences"
          title="A Handful of Moments Worth Building a Day Around"
          tone="light"
        />

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <Reveal key={experience.title} delay={(index % 3) * 100}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={experience.image.src}
                    alt={experience.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl text-ivory">
                  {experience.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">
                  {experience.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
