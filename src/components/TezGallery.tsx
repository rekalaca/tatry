"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryPhoto {
  src: string;
  title: string;
  desc: string;
  author: string;
  year?: string;
}

const photos: GalleryPhoto[] = [
  {
    src: "/pictures/tez/tez-train.jpg",
    title: "425.95-ös motorvonatok Poprádon",
    desc: "Két összekapcsolt 425.95 sorozatú (Stadler GTW 2/6 típusú) motorvonat a poprádi állomáson, háttérben a hófödte és felhőkbe burkolózó Magas-Tátra csúcsaival. Ezek a modern svájci licenc alapján gyártott szerelvények képezik a tátrai villamosvasút gerincét.",
    author: "Aktron / Wikimedia Commons (CC BY-SA 3.0)",
    year: "Modern járműpark",
  },
  {
    src: "/pictures/tez/tez-scenic.jpg",
    title: "A havas tátrai csúcsok alatt",
    desc: "TEŽ motorvonat a nyílt pályán Malompatak (Mlynica) közelében, Poprád és a hegyek között. A vonal mezőkön és fenyveseken keresztül kanyarog, miközben az óriási tátrai panoráma végig kíséri az utazást.",
    author: "ZSSK general / Wikimedia Commons (CC BY-SA 4.0)",
    year: "Téli panorámaút",
  },
  {
    src: "/pictures/tez/tez-station.jpg",
    title: "A 425.951-es szerelvény Tátralomnicnál",
    desc: "A 425.951-es motorkocsi nem sokkal Tátralomnic (Tatranská Lomnica) elhagyása után, Ótátrafüred célállomással. A 184-es vonal festői tátrai fenyveseken és kis erdei megállókon halad át.",
    author: "Falk2 / Wikimedia Commons (CC BY-SA 4.0)",
    year: "184-es vonal",
  },
  {
    src: "/pictures/tez/tez-historic.jpg",
    title: "Tátralomnic vasútállomása 1963-ban",
    desc: "Téli archív felvétel a tátralomnici vasútállomásról. A vágányon egy legendás csehszlovák M 131.1 sorozatú motorkocsi látható a Hidegpatak felől érkező normál nyomtávú szárnyvonalról, amely itt találkozik a villamosvasúttal.",
    author: "Fortepan / Szánthó Zoltán (CC BY-SA 3.0)",
    year: "1963 (Archív nosztalgia)",
  },
];

export default function TezGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 border border-sky-500/25 shadow-2xl">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Képgaléria • tatry.top gyűjtés</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <span>Tátrai Villamos (TEŽ) Fotógaléria</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Hófödte csúcsok, modern Stadler GTW panorámavonatok és 60 éves tátrai nosztalgiafelvétel.
        </p>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <ZoomIn className="w-4 h-4 text-sky-300" />
              </div>

              {photo.year && (
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-semibold text-sky-300 backdrop-blur-sm border border-slate-700/50">
                  {photo.year}
                </div>
              )}
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-grow">
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors mb-1 line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {photo.desc}
                </p>
              </div>
              <p className="text-[10px] text-slate-300 mt-2 font-mono truncate">
                Fotó: {photo.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500/20 border border-slate-700 hover:border-sky-400 transition-all z-10"
            aria-label="Bezárás"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500/20 border border-slate-700 hover:border-sky-400 transition-all z-10"
            aria-label="Előző kép"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500/20 border border-slate-700 hover:border-sky-400 transition-all z-10"
            aria-label="Következő kép"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <Image
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].title}
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center max-w-2xl w-full">
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                {photos[activePhotoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
                {photos[activePhotoIndex].desc}
              </p>
              <p className="text-[11px] text-slate-300 font-mono">
                Forrás / Licenc: {photos[activePhotoIndex].author}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
