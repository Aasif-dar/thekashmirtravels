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

// Public pages are statically generated and refreshed hourly; admin edits
// trigger revalidatePath for an immediate update.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
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
