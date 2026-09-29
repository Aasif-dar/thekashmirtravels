import Image from "next/image";
import { images } from "@/data/images";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function MosaicImage({
  image,
  className,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: {
  image: (typeof images)[keyof typeof images];
  className: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export default function LocalKashmir() {
  return (
    <section id="local-kashmir" className="bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Beyond the Postcard"
              title="See Kashmir Beyond the Postcard"
              subtitle="Saffron fields at Pampore, hands still weaving pashmina by hand, and a old city that has never needed to perform for visitors. This is the Kashmir we build journeys around."
            />
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-12 gap-4">
              <Reveal className="col-span-7" delay={0}>
                <MosaicImage
                  image={images.srinagarOldCity}
                  className="aspect-[4/3.2] sm:h-[420px]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </Reveal>
              <Reveal className="col-span-5" delay={120}>
                <MosaicImage
                  image={images.saffron}
                  className="aspect-[3/4] sm:h-[420px]"
                  sizes="(min-width: 768px) 26vw, 100vw"
                />
              </Reveal>

              <Reveal className="col-span-6" delay={200}>
                <MosaicImage
                  image={images.pashmina}
                  className="aspect-[4/5] sm:h-[300px]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </Reveal>
              <Reveal className="col-span-6" delay={280}>
                <MosaicImage
                  image={images.driedFruitsMarket}
                  className="aspect-[4/5] sm:h-[300px]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
