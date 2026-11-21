"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, ZoomIn, X } from "lucide-react";

export default function TezOverviewSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500/20 border border-slate-700 hover:border-sky-400 transition-all z-10"
            aria-label="Bezárás"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <Image
                src="/pictures/tez/tez_tatry_magyar.jpg"
                alt="Tátrai villamos hegyi háttérrel nagy méretben"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center max-w-xl w-full">
              <h4 className="text-base font-bold text-white mb-0.5">
                A Tátrai Elektromos Vasút (TEŽ) a havas csúcsok lábánál
              </h4>
              <p className="text-xs text-slate-300">
                Modern, fűtött Stadler GTW panorámavonat a Magas-Tátra hegyei között.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
