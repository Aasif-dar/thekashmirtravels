import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Destinations from "@/components/Destinations";
import Journeys from "@/components/Journeys";
import Experiences from "@/components/Experiences";
import LocalKashmir from "@/components/LocalKashmir";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

// Public pages are statically generated and refreshed hourly; admin edits
// trigger revalidatePath for an immediate update.
export const revalidate = 3600;

export const metadata = pageMetadata({
  description: site.seo.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Destinations />
        <Journeys />
        <Experiences />
        <LocalKashmir />
        <WhyUs />
        <Gallery />
        <Testimonials />
        
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
