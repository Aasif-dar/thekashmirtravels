import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import EmptyState from "./EmptyState";

// ADMIN: testimonials are not backed by the database yet; they come from
// site.testimonials (src/data/site.ts). Fields: quote, name, location. See
// ADMIN_DATA_GUIDE.md.
export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-parchment px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="From Recent Travelers"
          title="A Few Words Back"
          align="center"
          className="mx-auto"
        />

        {!site.testimonials.length && (
          <EmptyState message="Traveler stories will appear here." />
        )}

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {site.testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 120}>
              <blockquote className="flex h-full flex-col">
                <p className="font-serif text-lg leading-relaxed text-charcoal italic sm:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-6 text-[12px] font-medium tracking-[0.12em] text-charcoal/60 uppercase">
                  {testimonial.name} &middot; {testimonial.location}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
