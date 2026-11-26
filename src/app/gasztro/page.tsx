import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import DiningSection from "@/components/DiningSection";
import { Compass, Waves, Train, CheckSquare, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Gasztronómia & Koliba Élmény • Magas-Tátra | Villa Greystone",
  description:
    "Autentikus tátrai ízek, juhtúrós sztrapacska, fokhagymaleves cipóban, a szomszédos Koliba Tatry magyar étlapja és ingyenes házhoz szállítás a Villa Greystone apartmanba.",
};

export default function GasztroPage() {
  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white pt-24 sm:pt-28 pb-16">
      {/* Falling snow particles */}
      <SnowEffect />

      {/* Sticky frosted glass navbar */}
      <Navbar />

      <div className="animate-subpage-fade-in">
        {/* Main Dining Component */}
        <DiningSection isSubpage={true} />

        {/* Quick Navigation to Other Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              További Tátrai Kalauzaink
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-6">
              Egy jó lakoma után nézzetek meg egy havas kirándulást, lazítsatok a forró termálfürdőkben, vagy utazzatok a Tátrai Villamossal!
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
                href="/furdo"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Waves className="w-4 h-4" />
                <span>Fürdők & Wellness</span>
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
              <Link
                href="/ugyelet"
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Ügyelet & Patikák</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Atmospheric footer */}
        <Footer />
      </div>
    </main>
  );
}
