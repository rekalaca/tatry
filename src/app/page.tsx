import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeatherSection from "@/components/WeatherSection";
import ApartmentSection from "@/components/ApartmentSection";
import ShoppingSection from "@/components/ShoppingSection";
import WinterTrackDivider from "@/components/WinterTrackDivider";
import WebcamsSection from "@/components/WebcamsSection";
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

      {/* Weather and Snow Report section */}
      <WeatherSection />

      {/* Apartment section featuring 49 photos with fullscreen lightbox */}
      <ApartmentSection />

      {/* Supermarkets & local shopping */}
      <ShoppingSection />

      {/* Winter Animated Divider separating Shopping from Webcams */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WinterTrackDivider />
      </div>

      {/* Live webcams & meteorological radar */}
      <WebcamsSection />

      {/* Atmospheric footer */}
      <Footer />
    </main>
  );
}
