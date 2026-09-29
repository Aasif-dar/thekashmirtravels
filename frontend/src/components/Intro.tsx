import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2 className="font-serif text-3xl leading-snug font-normal text-charcoal sm:text-4xl">
            Not just a trip to Kashmir.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-charcoal/75 sm:text-xl">
            We design journeys around the way you want to experience the
            valley — from quiet mornings on Dal Lake to snow-covered Gulmarg
            and slow evenings beside the Lidder.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] text-deep-green/80 uppercase">
            <span>Locally based</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>Personally planned</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
