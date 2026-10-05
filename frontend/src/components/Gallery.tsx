import Image from "next/image";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import EmptyState from "./EmptyState";

const spans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:row-span-1",
  "sm:row-span-1",
  "sm:row-span-2",
  "sm:col-span-2",
  "sm:row-span-1",
  "sm:row-span-1",
  "sm:col-span-2 sm:row-span-2",
  "sm:row-span-1",
];

const items = site.gallery.photos.map((image, index) => ({
  image,
  span: spans[index % spans.length],
}));

// ADMIN: gallery photos come from site.gallery.photos (src/data/site.ts).
// Fields: image (src, alt, location). See ADMIN_DATA_GUIDE.md.
export default function Gallery() {
  return (
    <section id="gallery" className="bg-charcoal px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={site.gallery.eyebrow}
          title={site.gallery.title}
          tone="light"
        />

        {!items.length && (
          <EmptyState message="Gallery coming soon." tone="light" />
        )}

        <div className="mt-14 grid grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-3">
          {items.map((item, index) => (
            <Reveal
              key={item.image.location + index}
              delay={(index % 4) * 90}
              className={`group relative overflow-hidden ${item.span} aspect-square sm:aspect-auto`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="p-4 text-[12px] font-medium tracking-[0.05em] text-ivory">
                  {item.image.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
