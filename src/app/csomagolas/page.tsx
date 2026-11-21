import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import PackingChecklist from "@/components/PackingChecklist";

export const metadata: Metadata = {
  title: "Mit ne felejtsünk otthon? • Csomagolási Notesz | Villa Greystone",
  description:
    "Interaktív családi csomagolólista a téli tátrai utazáshoz: téli ruházat, sífelszerelés, autó, okmányok, egészség és wellness kellékek menthető állapotban.",
};

export default function CsomagolasPage() {
  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white pt-24 sm:pt-28">
      {/* Falling snow particles */}
      <SnowEffect />

      {/* Sticky frosted glass navbar */}
      <Navbar />

      {/* Packing checklist component */}
      <PackingChecklist isSubpage={true} />

      {/* Atmospheric footer */}
      <Footer />
    </main>
  );
}
