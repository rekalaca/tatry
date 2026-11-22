"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info, ZoomIn, X } from "lucide-react";

export default function TezOverviewSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Close on Escape key press and safely handle body scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 text-xs font-semibold mb-3">
            <Info className="w-3.5 h-3.5" />
            <span>A Tátrai Villamosvasút története és működése</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            A Tátrai Elektromos Vasút (TEŽ)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            A <strong>Tatranské elektrické železnice (TEŽ)</strong> a Magas-Tátra fő közlekedési ütőere
            és egyben kihagyhatatlan turisztikai élménye. A keskeny nyomtávú (1000 mm) villamosvasút{" "}
            <strong>1908. december 20-án</strong> indult meg, ezzel Közép-Európa egyik legrégebbi és legpatinásabb
            hegyi villamoshálózata.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 mt-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                35 km-es Y-alakú pálya
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                Poprádról indulva Ótátrafürednél (Starý Smokovec) ágazik el: nyugat felé a Csorba-tóra (183-as vonal),
                kelet felé pedig Tátralomnicra (184-es vonal).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Modern Stadler GTW vonatok
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                425.95-ös sorozatú, svájci licenc alapján gyártott motorvonatok alacsonypadlós beszállórésszel,
                panorámaablakokkal és 80 km/h-s végsebességgel.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Callout Image with Click-to-Enlarge Lightbox */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-sky-500/20 shadow-xl group cursor-pointer hover:border-sky-400/50 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300"
          title="Kattints a kép nagyításához!"
        >
          <Image
            src="/pictures/tez/tez_tatry_magyar.jpg"
            alt="Tátrai villamos hegyi háttérrel"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

          {/* Hover zoom indicator */}
          <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-sky-400/30">
            <ZoomIn className="w-4 h-4 text-sky-300" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
            <p className="font-bold flex items-center gap-1.5">
              <span>Környezetbarát hegyi utazás</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-200 border border-sky-400/40">
                Nagyítás 🔍
              </span>
            </p>
            <p className="text-[11px] text-slate-300">Nincs hóláncozás, nincs parkolási díj!</p>
          </div>
        </div>
      </div>

      {/* Fullscreen Centered Lightbox Modal (Optimized for mobile & desktop) */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Always visible Close Button at top-right with icon & text */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="fixed top-3 right-3 sm:top-6 sm:right-6 z-[110] flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/95 text-white hover:bg-sky-600 border border-slate-600 hover:border-sky-400 shadow-2xl transition-all active:scale-95 text-xs font-semibold cursor-pointer"
            aria-label="Bezárás"
          >
            <X className="w-5 h-5 text-sky-400" />
            <span>Bezárás</span>
          </button>

          {/* Centered Image Container - strictly within screen bounds, no bottom text */}
          <div
            className="relative w-full max-w-5xl h-[72vh] sm:h-[82vh] max-h-[84dvh] rounded-2xl overflow-hidden bg-slate-950/90 border border-sky-400/30 shadow-2xl shadow-sky-500/20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/pictures/tez/tez_tatry_magyar.jpg"
              alt="Környezetbarát hegyi utazás - Tátrai villamos hegyi háttérrel nagy méretben"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 85vw"
              className="object-contain select-none p-1 sm:p-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}
