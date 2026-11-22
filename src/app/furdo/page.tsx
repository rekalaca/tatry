import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import WellnessSection from "@/components/WellnessSection";
import { Compass, Utensils, Train, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Fürdők & Wellness Pihenés • Magas-Tátra | Villa Greystone",
  description:
    "AquaCity Poprad, a gőzölgő Vrbov gyógyfürdő a havas tájban, Tatralandia trópusi csarnoka, Termy BUKOVINA és a Villa Greystone privát jakuzzija.",
};

export default function FurdoPage() {
  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white pt-24 sm:pt-28 pb-16">
      {/* Falling snow particles */}
      <SnowEffect />

      {/* Sticky frosted glass navbar */}
      <Navbar />

      {/* Main Wellness Component */}
      <WellnessSection isSubpage={true} />

      {/* Quick Navigation to Other Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            További Tátrai Kalauzaink
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-6">
            A meleg vizes lazítás után nézzétek meg az éttermi ajánlónkat, fedezzétek fel a havas csúcsokat, vagy ellenőrizzétek a csomagolólistát!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/programok"
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Téli Programok</span>
            </Link>
            <Link
              href="/gasztro"
              className="px-4 py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Utensils className="w-4 h-4" />
              <span>Gasztronómia & Koliba</span>
            </Link>
            <Link
              href="/kozlekedes"
              className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Train className="w-4 h-4" />
              <span>Közlekedés & TEŽ</span>
            </Link>
            <Link
              href="/csomagolas"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Csomagolási Notesz</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Atmospheric footer */}
      <Footer />
    </main>
  );
}
