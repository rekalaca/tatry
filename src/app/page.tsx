import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ApartmentSection from "@/components/ApartmentSection";
import GuidesHubSection from "@/components/GuidesHubSection";
import ShoppingSection from "@/components/ShoppingSection";
import WebcamsSection from "@/components/WebcamsSection";
import TravelGuideSection from "@/components/TravelGuideSection";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white">
      {/* Falling snow particles with toggle */}
      <SnowEffect />

      {/* Sticky frosted glass navbar */}
      <Navbar />

      {/* Hero section with mountain vibes, countdown & quick links */}
      <Hero />

      {/* Apartment section featuring 49 photos with fullscreen lightbox */}
      <ApartmentSection />

      {/* Central Guides Hub: Clean preview cards linking to dedicated subpages (Programok, Gasztro, Fürdők, Közlekedés, Csomagolás) */}
      <GuidesHubSection />

      {/* Supermarkets & local souvenirs */}
      <ShoppingSection />

      {/* Live webcams & meteorological radar */}
      <WebcamsSection />

      {/* Driving rules, vignettes, mountain rescue & FAQs */}
      <TravelGuideSection />

      {/* Atmospheric footer */}
      <Footer />
    </main>
  );
}
