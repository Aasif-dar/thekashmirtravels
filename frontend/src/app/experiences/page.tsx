import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Experiences from "@/components/Experiences";
import FinalCTA from "@/components/FinalCTA";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "A handful of premium Kashmir experiences — mornings on Dal Lake, a night on a houseboat, Gulmarg in winter, and slow evenings by the Lidder.",
};

export default function ExperiencesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-charcoal">
          <Image
            src={images.shikara.src}
            alt={images.shikara.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/40" />
          <div className="relative mx-auto w-full min-w-0 max-w-6xl px-6 pb-14 sm:px-10">
            <p className="text-[11px] font-medium tracking-[0.3em] text-ivory/75 uppercase">
              Experiences
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-ivory sm:text-5xl">
              Moments Worth Building a Day Around
            </h1>
          </div>
        </section>

        <Experiences />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
