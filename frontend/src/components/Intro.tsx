import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function Intro() {
  return (
    <section className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2 className="font-serif text-3xl leading-snug font-normal text-charcoal sm:text-4xl">
            {site.intro.heading}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-charcoal/75 sm:text-xl">
            {site.intro.body}
          </p>
          <div className="mt-8 flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] text-deep-green/80 uppercase">
            {site.intro.highlights.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
