import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeatherSection from "@/components/WeatherSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import ApartmentSection from "@/components/ApartmentSection";
import ShoppingSection from "@/components/ShoppingSection";
import WinterTrackDivider from "@/components/WinterTrackDivider";
import WebcamsSection from "@/components/WebcamsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white">
      {/* Sticky frosted glass navbar */}
      <Navbar />

      {/* Hero section with mountain vibes, countdown & quick links */}
      <Hero />

      {/* Weather and Snow Report section */}
      <WeatherSection />

      {/* Panoramic Parallax Mountain Divider separating Weather from Apartment */}
      <ParallaxDivider />

      {/* Apartment section featuring 49 photos with fullscreen lightbox */}
      <ApartmentSection />

      {/* Winter Animated Divider separating Gallery / Photos from Supermarkets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WinterTrackDivider />
      </div>

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
