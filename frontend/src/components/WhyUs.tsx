import { Compass, NotebookPen, BedDouble, PhoneCall } from "lucide-react";
import Reveal from "./Reveal";

const points = [
  {
    icon: Compass,
    title: "Local Knowledge",
    description:
      "Based in Kashmir, we know the valley beyond the usual route.",
  },
  {
    icon: NotebookPen,
    title: "Thoughtful Planning",
    description: "Every itinerary is designed around your pace.",
  },
  {
    icon: BedDouble,
    title: "Handpicked Stays",
    description:
      "Hotels, houseboats and stays selected for quality and character.",
  },
  {
    icon: PhoneCall,
    title: "On-Trip Support",
    description: "A local team available throughout your journey.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 100}>
              <point.icon
                size={22}
                strokeWidth={1.25}
                className="text-gold"
              />
              <h3 className="mt-5 font-serif text-xl text-charcoal">
                {point.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal/65">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
