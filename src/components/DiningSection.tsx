"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Utensils, FileText, Download, Flame, Star, Coffee, Heart, MapPin, ExternalLink, Globe, Music, Beer, ZoomIn, X } from "lucide-react";
import GasztroMap from "@/components/GasztroMap";

export default function DiningSection({ isSubpage = false }: { isSubpage?: boolean } = {}) {
  const [mounted, setMounted] = useState(false);
  const [spotlightImage, setSpotlightImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeSpotlight = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsExiting(true);
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }
    exitTimerRef.current = setTimeout(() => {
      setSpotlightImage(null);
      setIsExiting(false);
      exitTimerRef.current = null;
    }, 250);
  };

  const handleImageClick = (src: string, alt: string, title: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
    setIsExiting(false);
    setSpotlightImage({ src, alt, title });

    // 4 seconds after popping up, return back smoothly
    closeTimerRef.current = setTimeout(() => {
      closeSpotlight();
    }, 4000);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!spotlightImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSpotlight();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [spotlightImage]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const handleOpenFacebookApp = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string, webUrl: string) => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || "";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    if (!isMobile) return;

    e.preventDefault();
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const fbAppUrl = isIOS
      ? `fb://page/?id=${pageId}`
      : `intent://page/${pageId}#Intent;package=com.facebook.katana;scheme=fb;end`;
    const fbFallbackApp = `fb://page/${pageId}`;

    const start = Date.now();
    try {
      window.location.href = fbAppUrl;
    } catch {
      window.location.href = fbFallbackApp;
    }

    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.location.href = webUrl;
      }
    }, 800);
  };

  const dishes = [
    {
      name: "Bryndzové halušky",
      huName: "Juhtúrós sztrapacska tepertővel",
      desc: "A szlovák konyha koronája: friss házi galuska gazdag juhtúróval és ropogósra sült szalonnapörccel összeforgatva.",
      tag: "Nemzeti Kedvenc",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      name: "Cesnačka v bochníku",
      huName: "Fokhagymaleves cipóban",
      desc: "Forró, illatos fokhagymaleves reszelt sajttal, ropogós kérgű kerek cipóban tálalva. A leghidegebb túra után is azonnal felmelegít.",
      tag: "Melegítő csoda",
      badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    },
    {
      name: "Vyprážaný Encián / Syr",
      huName: "Sült camembert / sajt áfonyával",
      desc: "Olvadós belsővel kisütött sajtkorongok vadon termett tátrai vörösáfonyával, sült burgonyával és házi tatárral.",
      tag: "Klasszikus",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    {
      name: "Parené buchty",
      huName: "Tátrai gőzgombóc",
      desc: "Óriási puha kelt gőzgombóc szilvalekváros töltelékkel, bőséges mákkal vagy fahéjjal és forró vajjal leöntve.",
      tag: "Családi édesség",
      badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    },
  ];

  return (
    <section id="gasztro" className={`${isSubpage ? "pt-2 pb-12 sm:pb-16" : "py-10 sm:py-20"} px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
          Gasztronómia &{" "}
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Koliba Élmény
          </span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-lg">
          Faház éttermek, pattogó kandallótűz, forró fokhagymaleves cipóban és a kihagyhatatlan juhtúrós sztrapacska.
        </p>
      </div>

      {/* Méretarányos Tátrai Gasztro Térkép */}
      <GasztroMap />

      {/* Featured Restaurant Card: Koliba Tatry */}
      <div id="koliba-tatry" className="glass-panel-warm p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-amber-500/30 shadow-2xl relative overflow-hidden glow-warm scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Közvetlenül a Villa Greystone mellett • Ingyenes Házhoz Szállítás</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Koliba Tatry Tradicionális Étterem
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Delivery */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/koliba-tatry.jpg",
                      "Koliba Tatry Tradicionális Étterem Nová Lesná",
                      "Koliba Tatry Tradicionális Étterem"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg group cursor-pointer hover:border-amber-400 hover:shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/koliba-tatry.jpg"
                    alt="Koliba Tatry Tradicionális Étterem Nová Lesná"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-amber-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-amber-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-amber-500/30">
                    Koliba Tatry
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Különleges kényelem, hogy az autentikus tátrai rönkfa étterem <strong>mindössze néhány lépésre (kb. 100 méterre) fekszik a Villa Greystone apartmanunktól</strong>. Fatüzelésű kandalló, juhtúrós finomságok, ropogós csülök és forró ételek várnak.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-amber-500/25 mb-4">
                <div className="flex items-center gap-3 mb-2.5 text-amber-300 font-bold text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Étterem címe & Megközelítés</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                >
                  Pontos cím:{" "}
                  <a
                    href="https://maps.google.com/?q=Koliba+Tatry+Slavkovsk%C3%A1+521+059+86+Nov%C3%A1+Lesn%C3%A1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors font-semibold inline-flex items-center gap-1"
                    title="Megnyitás Google Térképen telefonon"
                  >
                    <span>Slavkovská 521, 059 86 Nová Lesná, Szlovákia</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>{" "}
                  — mindössze 100 méterre, 1-2 perc kényelmes sétára fekszik a Villa Greystone szállástól. Telefonon vagy böngészőben rákattintva közvetlenül elindítható az útvonaltervezés a Google Térképen.
                </p>
              </div>

              {/* Ingyenes Házhoz Szállítás doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-amber-500/20 bg-amber-500/10">
                <div className="flex items-center gap-2 mb-2 text-amber-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🛵</span>
                  <span>Családi tipp: Ingyenes házhoz szállítás</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  15 € feletti rendelés esetén <strong>ingyenesen házhoz szállítják</strong> az ételeket közvetlenül a Villa Greystone apartmanunkba! Ha egy fárasztó túra vagy esti wellness után nincs kedvetek kimozdulni, csak hívjátok fel őket.
                </p>
              </div>
            </div>

            {/* Right Div: Quick Info & Action Buttons */}
            <div className="bg-slate-950/85 border border-amber-500/25 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2.5 sm:mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Amit mindenképp kóstolj meg:</span>
                </h4>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Fokhagymakrémleves cipóban</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Juhtúrós sztrapacska szalonnával</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Grillezett füstölt sajtok</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Csapolt eredeti Kofola</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Forró Tatratea tea-likőr</span>
                  </li>
                </ul>
              </div>

              {/* 3 gomb: Magyar étlap, Szlovák étlap, Google Térkép */}
              <div className="space-y-2 sm:space-y-2.5 pt-3.5 sm:pt-5 border-t border-amber-500/20">
                {/* Magyar étlap */}
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 p-0.5 rounded-xl shadow-lg shadow-amber-500/20">
                  <a
                    href="/docs/Koliba_Tatry_etlap_magyar.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-slate-950" />
                    <span>🇭🇺 Magyar étlap (PDF)</span>
                  </a>
                  <a
                    href="/docs/Koliba_Tatry_etlap_magyar.pdf"
                    download="Koliba_Tatry_etlap_magyar.pdf"
                    title="Magyar étlap letöltése"
                    className="p-2.5 text-slate-950 hover:bg-black/10 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* Szlovák eredeti étlap */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 p-0.5 rounded-xl transition-all">
                  <a
                    href="/docs/Koliba_Tatry_etterem.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 font-semibold text-xs sm:text-sm text-amber-200 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>🇸🇰 Eredeti szlovák étlap (PDF)</span>
                  </a>
                  <a
                    href="/docs/Koliba_Tatry_etterem.pdf"
                    download="Koliba_Tatry_etterem.pdf"
                    title="Eredeti étlap letöltése"
                    className="p-2.5 text-amber-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* Google Térkép gomb */}
                <a
                  href="https://maps.google.com/?q=Koliba+Tatry+Slavkovsk%C3%A1+521+059+86+Nov%C3%A1+Lesn%C3%A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-amber-200 hover:text-white border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 2: Koliba Kamzík (Starý Smokovec) */}
      <div id="koliba-kamzik" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-emerald-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-emerald-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                <span>🏔️ Tradicionális Tátrai Faház Étterem</span>
              </span>
              <span className="text-slate-400">• Starý Smokovec (A Hrebienok sikló mellett)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Koliba Kamzík Ótátrafüred
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/koliba-kamzik.jpg",
                      "Koliba Kamzík Tradicionális Étterem Starý Smokovec",
                      "Koliba Kamzík Ótátrafüred"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg group cursor-pointer hover:border-emerald-400 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/koliba-kamzik.jpg"
                    alt="Koliba Kamzík Tradicionális Étterem Starý Smokovec"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-emerald-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-emerald-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Koliba Kamzík
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A Magas-Tátra egyik legismertebb és legpatinásabb rönkfa étterme Starý Smokovec központjában, a Tarajkára (Hrebienok) induló siklóvasút közvetlen közelében. Meghitt hegyvidéki belső tér, fatüzelésű kandalló, tradicionális szlovák receptúrák és ízletes tátrai fogások várják a megpihenni vágyó utazókat.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-emerald-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=Koliba+Kamz%C3%ADk+Star%C3%BD+Smokovec+8+062+01+Vysok%C3%A9+Tatry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Starý Smokovec 8, 062 01 Vysoké Tatry, Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Ótátrafüred szívében, a TEŽ tátrai villamos vasútállomásától 5 perc sétára, közvetlenül a Tricklandia és a siklóállomás szomszédságában. Nová Lesnából autóval vagy a TEŽ villamossal mindössze 5-7 perc menetidő.
                  </p>
                </div>
              </div>

              {/* Hrebienok Tipp doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-emerald-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🏔️</span>
                  <span>Túra & Élmény Tipp: Hrebienok utáni betérő</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Tökéletes célpont egy tarajkai séta, a Tátrai Jégdóm meglátogatása vagy egy élménydús havas szánkózás után. Amikor leértek a siklóval a hegyről, alig 2 perc sétával egy meleg, forró levessel és juhtúrós finomságokkal teli asztalnál pihenhettek meg.
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-emerald-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2.5 sm:mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-4 sm:mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>Juhtúrós galuska:</strong> Bryndzové halušky ropogós szalonnapörccel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>Tátrai pirogok:</strong> Juhtúrós, húsos és burgonyás változatban</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>Vadételek & Csülök:</strong> Szaftos szarvasragu és kemencés pecsenyék</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>Hegyi halak:</strong> Friss tátrai pisztráng fűszervajjal sütve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span><strong>Tátrai italok:</strong> Kézműves sörök, csapolt Kofola & forró Tatratea</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-emerald-500/20">
                <a
                  href="https://smokovec.kamzik.sk/sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Hivatalos Honlap & Étlap</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=Koliba+Kamz%C3%ADk+Star%C3%BD+Smokovec+8+062+01+Vysok%C3%A9+Tatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 3: Humno Tatry (Tatranská Lomnica) */}
      <div id="humno-tatry" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-purple-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-purple-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-purple-400" />
                <span>Étterem, Après-Ski & Zenés Klub</span>
              </span>
              <span className="text-slate-400">• Tatranská Lomnica (A kabinos felvonó völgyállomásánál)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Humno Tatry Restaurant & Music Club
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/humno-tatry.jpg",
                      "Humno Tatry Restaurant and Music Club Tatranská Lomnica",
                      "Humno Tatry Restaurant & Music Club"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg group cursor-pointer hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/humno-tatry.jpg"
                    alt="Humno Tatry Restaurant and Music Club Tatranská Lomnica"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-purple-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-purple-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-purple-500/30">
                    Humno Tatry
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A Magas-Tátra egyik legikonikusabb és legkülönlegesebb gasztronómiai és szórakoztató központja Tátralomnicon, közvetlenül a sípályák lábánál. Hatalmas rusztikus fa csűrépület, a mennyezetről függesztett valódi fekete Cadillac, látványkandalló és prémium alpesi hangulat fogadja a vendégeket, ahol a kiadós hegyvidéki ebédek és vacsorák mellett a hétvégéken pezsgő éjszakai zenés klubélet várja a bulizni vágyókat.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-purple-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=Humno+Tatry+Tatransk%C3%A1+Lomnica+059+60"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Tatranská Lomnica, 059 60 Magas-Tátra, Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Közvetlenül a tátralomnici kabinos felvonó (Lomnici-csúcs felvonóállomás) völgyállomása mellett fekszik. A Villa Greystone apartmanunktól autóval mindössze 7-8 perc alatt elérhető, vagy a TEŽ tátrai villamossal Tátralomnic állomásig utazva rövid kényelmes sétával megközelíthető.
                  </p>
                </div>
              </div>

              {/* Après-Ski & Nightlife doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-purple-500/20 bg-purple-500/10">
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-purple-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🔥</span>
                  <span>Après-Ski Élmény & Péntek-Szombati Party Night</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Egy havas síelés vagy túra után egyenesen a lécekről betérhettek a forró forralt borra, Tatrateára vagy kézműves koktélokra. Péntek és szombat esténként a hely átalakul a Tátra legforróbb klubjává, ahol neves DJ-k, fények és élő zenei rendezvények teremtenek felejthetetlen partihangulatot (Gopass pontok beváltásával és jegyvásárlással is elérhető).
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span><strong>Steakek & Grillezett húsok:</strong> Érlelt marhasteakek és szaftos sült bordák</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span><strong>Gourmet Burgerek:</strong> Házi buciban sült prémium hegyi marhaburgerek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span><strong>Tátrai Hagyományos Ételek:</strong> Juhtúrós finomságok és tartalmas levesek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span><strong>Après-Ski Bár & Koktélok:</strong> Signature koktélok, prémium párlatok és sörök</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span><strong>Hétvégi Party & DJ szettek:</strong> Éjszakai klubprogramok és koncertek</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-purple-500/20">
                <a
                  href="https://www.humnotatry.sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 text-white shrink-0" />
                  <span>Hivatalos Honlap & Események</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=Humno+Tatry+Tatransk%C3%A1+Lomnica+059+60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 4: Koliba Restaurant & Penzión (Starý Smokovec 34) */}
      <div id="koliba-penzion" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-orange-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-orange-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Nyílt Parázson Sült Ételek & Élő Zene</span>
              </span>
              <span className="text-slate-400">• Starý Smokovec (A Szlavkói-csúcs lábánál)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Koliba Restaurant & Penzión Ótátrafüred
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/koliba-smokovec-penzion.jpg",
                      "Koliba Restaurant & Penzión Starý Smokovec",
                      "Koliba Restaurant & Penzión"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-orange-500/30 shadow-lg group cursor-pointer hover:border-orange-400 hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/koliba-smokovec-penzion.jpg"
                    alt="Koliba Restaurant & Penzión Starý Smokovec"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-orange-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-orange-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-orange-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-orange-500/30">
                    Koliba Restaurant
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A Szlavkói-csúcs lábánál épült, autentikus stílusú tátrai faház étterem a hegyvidéki vendéglátás igazi fellegvára. Központi látványossága a terem szívében álló, nyitott kandalló és faszenes grill, ahol a vendégek szeme előtt sülnek a zamatos húsok és kolbászok, miközben az estéket gyakran élő népzene és cimbalommuzsika teszi felejthetetlenné.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-orange-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=Koliba+Restaurant+Penzion+Stary+Smokovec+34+062+01+Vysoke+Tatry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Starý Smokovec 34, 062 01 Vysoké Tatry, Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Ótátrafüred központjában, csendes erdei környezetben fekszik. A TEŽ tátrai villamos állomásától mindössze 6-8 perc kényelmes sétára található, a Villa Greystone apartmanunktól pedig autóval vagy villamossal mindössze 5-6 perc alatt elérhető.
                  </p>
                </div>
              </div>

              {/* Parázs & Élő zene doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-orange-500/20 bg-orange-500/10">
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-orange-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🎻</span>
                  <span>Különleges élmény: Nyitott kandalló & Élő népzene</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A nyitott faszenes grillen frissen piruló húsok illata és a rusztikus rönkfa belső tér tökéletes tátrai estét ígér. Különösen a téli és hétvégi időszakban élő népzenei és cigányzenei előadások kísérik a vacsorát, ezért érdemes előre asztalt foglalni.
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Nyílt parázson sültek:</strong> Saslik, bélszín, grillkolbász és tátrai tarja</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Juhtúrós galuska:</strong> Tradicionális bryndzové halušky ropogós pörccel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Tátrai levesek:</strong> Tartalmas tátrai gulyás és erdei gombaleves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Vadételek:</strong> Párolt szarvascomb vörösboros mártásban áfonyával</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Helyi italok:</strong> Szlovák csapolt sörök, forralt bor & Tatratea</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-orange-500/20">
                <a
                  href="https://www.kolibasmokovec.sk/hu/koliba-panzioban/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Koliba Honlap & Étlap (Magyarul)</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=Koliba+Restaurant+Penzion+Stary+Smokovec+34+062+01+Vysoke+Tatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 4: Manuel Caffé & Bistro Italiano */}
      <div id="manuel-caffe" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-rose-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-rose-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
                <span>🇮🇹 Autentikus Olasz Vezetés & Konyha</span>
              </span>
              <span className="text-slate-400">• Horný Smokovec (Starý Smokovec)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Manuel Caffé & Bistro Italiano
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tags */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/manuel-caffe.jpg",
                      "Manuel Caffé & Bistro Italiano Horný Smokovec",
                      "Manuel Caffé & Bistro Italiano"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-rose-500/30 shadow-lg group cursor-pointer hover:border-rose-400 hover:shadow-rose-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/manuel-caffe.jpg"
                    alt="Manuel Caffé & Bistro Italiano Horný Smokovec"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-rose-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-rose-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-rose-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-rose-500/30">
                    Manuel Caffé
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A Magas-Tátra szívében működő, valódi <strong>olasz vezetéssel irányított kávézó és bisztró</strong>. Egyszerre autentikus olasz kávézó, minőségi pizzéria, borbár, valamint bőséges reggeliző- és ebédlőhely kirándulóknak és a családnak.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-rose-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=Manuel+Caffe+Bistro+Italiano+Horny+Smokovec+20+Stary+Smokovec+062+01+Vysoke+Tatry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-300 hover:text-rose-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Horný Smokovec 20, Starý Smokovec, 062 01 Vysoké Tatry, Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Ótátrafüred / Felsőtátrafüred szomszédságában, a TEŽ villamossal vagy autóval mindössze 4 perc a Villa Greystone apartmanunktól. Telefonon vagy böngészőben kattintva azonnal indul az útvonaltervezés a Google Térképen.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-rose-300 font-medium text-xs pt-2 border-t border-slate-800/80">
                  <span>🍕 Pizza & Focaccia</span>
                  <span>•</span>
                  <span>🍝 Házi tészták</span>
                  <span>•</span>
                  <span>☕ Olasz eszpresszó</span>
                  <span>•</span>
                  <span>🥗 Vega & Vegán</span>
                  <span>•</span>
                  <span>🍰 Tiramisù & Desszertek</span>
                  <span>•</span>
                  <span>🍷 Bor & Aperol Spritz</span>
                </div>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-rose-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Kávék:</strong> Eredeti olasz eszpresszó és barista különlegességek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Pizza & Focaccia:</strong> Kemencés olasz tészták</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Tészták:</strong> Házi lasagne és olasz szószok</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Desszertek:</strong> Tiramisù, profiterole és cannolo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Borbár:</strong> Minőségi olasz borok & Aperol Spritz</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-rose-500/20">
                <a
                  href="https://www.facebook.com/ManuelCaffeTatry/?locale=hu_HU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Manuel Caffé Facebook oldal</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=Manuel+Caffe+Bistro+Italiano+Horny+Smokovec+20+Stary+Smokovec+062+01+Vysoke+Tatry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 5: La Primavera Pizzeria & Ristorante (Poprad) */}
      <div id="la-primavera" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-rose-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-red-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
                <span>🍕 Autentikus Olasz Pizzéria & Ristorante</span>
              </span>
              <span className="text-slate-400">• Poprád Belvárosa (Štefánikova utca)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              La Primavera Pizzeria & Ristorante Poprad
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/la-primavera.jpg",
                      "La Primavera Pizzeria Ristorante Poprad",
                      "La Primavera Pizzeria & Ristorante"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-rose-500/30 shadow-lg group cursor-pointer hover:border-rose-400 hover:shadow-rose-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/la-primavera.jpg"
                    alt="La Primavera Pizzeria Ristorante Poprad"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-rose-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-rose-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-rose-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-rose-500/30">
                    La Primavera
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Poprád szívének egyik legkedveltebb olasz étterme és pizzériája, ahol a valódi olasz receptúrák, a vékonyra nyújtott, ropogós kemencés pizzák és a frissen készített házi tészták találkoznak. Barátságos, meleg vendéglátás, prémium alapanyagok és gazdag választék várja mindazokat, akik a hegyi túrák vagy egy poprádi városnézés után egy hamisítatlan mediterrán vacsorára vágynak.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-rose-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=La+Primavera+Pizzeria+%C5%A0tef%C3%A1nikova+897%2F4+058+01+Poprad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-300 hover:text-rose-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Štefánikova 897/4, 058 01 Poprad, Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Poprád belvárosában, a sétálóutca és a főtér közvetlen szomszédságában található. A Villa Greystone apartmanunktól autóval kényelmesen mindössze 10-12 perc alatt elérhető, vagy a TEŽ tátrai villamossal Poprad-Tatry állomásig utazva egy kellemes rövid belvárosi sétával megközelíthető.
                  </p>
                </div>
              </div>

              {/* Tipp & Hangulat doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-rose-500/20 bg-rose-500/10">
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-rose-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🍕</span>
                  <span>Családi & Esti Tipp: Olasz ízek és AquaCity közelség</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Kiváló választás egy délutáni poprádi séta, bevásárlás vagy az AquaCity élményfürdőzés utáni kiadós családi vacsorához. A kemencés pizzák mellett bőséges hústálak, tengeri fogások és finom desszertek gondoskodnak arról, hogy a gyerekek és a felnőttek is megtalálják a kedvencüket.
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-rose-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Kemencés pizzák:</strong> Vékony, ropogós olasz tészta gazdag feltétekkel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Házi tészták & Lasagne:</strong> Bolognese, Carbonara és krémes szószok</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Rizottók & Gnocchi:</strong> Erdei gombás és parmezános receptek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Húsételek & Halak:</strong> Zamatos steakek és tenger gyümölcsei</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span><strong>Desszertek & Kávék:</strong> Helyi házi Tiramisù és olasz kávékülönlegességek</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-rose-500/20">
                <a
                  href="https://www.facebook.com/p/La-Primavera-Pizzeria-Ristorante-100039489976945/"
                  onClick={(e) =>
                    handleOpenFacebookApp(
                      e,
                      "100039489976945",
                      "https://www.facebook.com/p/La-Primavera-Pizzeria-Ristorante-100039489976945/"
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
                  title="Megnyitás közvetlenül a Facebook alkalmazásban vagy böngészőben"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>La Primavera Facebook oldal (App)</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://www.google.com/search?sca_esv=2988de7988bf50d5&rlz=1C1ONGR_huHU1203HU1203&sxsrf=AKL5yDhe0bYJfHnB_aojzx6Kq_DwWuVRbQ:1795847264064&q=La+Primavera+Pizzeria&si=AE1YtOpq69kQPYJq7TIn_jext5SiMwQcb6Hqfr7QepP6tJJpjzT81TJ7pt9uUkNU4W74m__JuzOkcy5cTwjLGE2139bIs4h85DEh0f5K-hJjg9Fa414mb0HgLnf41Ter90EgFLHALSvw&sa=X&ved=2ahUKEwj26fqxhKqYAxU-FRAIHX37BY0Q_coHegQIERAB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-rose-200 hover:text-white border border-rose-500/30 hover:border-rose-400 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Google Adatlap & Értékelések</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=La+Primavera+Pizzeria+%C5%A0tef%C3%A1nikova+897%2F4+058+01+Poprad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 6: Dobré Časy & Burger (Poprad) */}
      <div id="dobre-casy" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-amber-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-amber-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
                <Beer className="w-3.5 h-3.5 text-amber-400" />
                <span>Kézműves Sörház & Gourmet Burgerező</span>
              </span>
              <span className="text-slate-400">• Poprád Belvárosa (Levočská utca)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dobré Časy & Burger Poprad
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/dobre-casy.jpg",
                      "Dobré Časy & Burger Poprad",
                      "Dobré Časy & Burger Poprad"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg group cursor-pointer hover:border-amber-400 hover:shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/dobre-casy.jpg"
                    alt="Dobré Časy & Burger Poprad"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-amber-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-amber-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-amber-500/30">
                    Dobré Časy
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Poprád és a Magas-Tátra térségének egyik leghíresebb kézműves sörháza és gasztropubja. A kétszintes, hangulatos loft stílusú sörözőben egyszerre 16 különböző, folyamatosan frissülő kézműves sört tartanak csapon nosztalgia csapfejekkel, mellé pedig a régió legfinomabb, omlós marhahúsból készült prémium kézműves burgereit és szaftos BBQ fogásait kínálják.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-amber-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=Dobr%C3%A9+%C4%8Casy+Levo%C4%8Dsk%C3%A1+211%2F2+058+01+Poprad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Levočská 211/2, 058 01 Poprad, Slovensko</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Poprád belvárosában, a történelmi központ és az AquaCity közelében helyezkedik el. A Villa Greystone apartmanunktól autóval kényelmesen 10-12 perc alatt elérhető, vagy a TEŽ tátrai villamossal Poprad-Tatry végállomásig utazva rövid belvárosi sétával felkereshető.
                  </p>
                </div>
              </div>

              {/* Sörkülönlegességek & Burgerek tipp doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-amber-500/20 bg-amber-500/10">
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-amber-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">🍻</span>
                  <span>Gasztro Tipp: 16 csapolt kézműves sör & BBQ élmény</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Ha szereted a minőségi szlovák és cseh IPA, APA, Stout vagy klasszikus láger söröket, itt a helyed! A 16 csap kínálata rendszeresen változik, a sörök mellé pedig kihagyhatatlan a sörös hagymalekváros Beer Onion Burger, a ropogós sült oldalas és a fűszeres csirkeszárnyak.
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-amber-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>16 csapolt kézműves sör:</strong> Nosztalgia csapok, szlovák és cseh kraft sörök</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Gourmet Burgerek:</strong> Beer Onion, Sweet Bacon, Kamzík és Jalapeño burgerek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>BBQ Sült Oldalas & Szárnyak:</strong> Omlós, ropogós húsok házi szószokkal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Sörkorcsolyák & Köretek:</strong> Sült steak burgonya, hagymakarika és mártogatók</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Italok:</strong> Kézműves limonádék, házi teák és prémium párlatok</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-amber-500/20">
                <a
                  href="https://poprad.dobre-casy.sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Hivatalos Honlap & Étlap</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=Dobr%C3%A9+%C4%8Casy+Levo%C4%8Dsk%C3%A1+211%2F2+058+01+Poprad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurant Card 7: La Famiglia Ristorante Italiano (Tatranská Lomnica) */}
      <div id="la-famiglia" className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-teal-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-teal-950/20 scroll-mt-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Title (Full Width Header) */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center gap-1.5">
                <span>🇮🇹 Mediterrán Olasz Konyha & Pizzéria</span>
              </span>
              <span className="text-slate-400">• Tatranská Lomnica (A TEŽ vasútállomásnál)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              La Famiglia Ristorante Italiano Tátralomnic
            </h3>
          </div>

          {/* 2 Divs Below Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
            {/* Left Div: Photo, Description, Address, Tip */}
            <div className="flex-1">
              {/* Photo + Intro */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-4 items-start">
                <div
                  onClick={() =>
                    handleImageClick(
                      "/pictures/la-famiglia.jpg",
                      "La Famiglia Ristorante Italiano Tatranská Lomnica",
                      "La Famiglia Ristorante Italiano"
                    )
                  }
                  className="relative shrink-0 w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-teal-500/30 shadow-lg group cursor-pointer hover:border-teal-400 hover:shadow-teal-500/20 hover:scale-[1.02] transition-all duration-300"
                  title="Kattints a kép kiemeléséhez (4 mp)"
                >
                  <img
                    src="/pictures/la-famiglia.jpg"
                    alt="La Famiglia Ristorante Italiano Tatranská Lomnica"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-teal-500/30 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide text-teal-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-teal-500/30">
                    La Famiglia
                  </span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  A 2018-ban megnyílt, nagy népszerűségnek örvendő családi olasz étterem Tátralomnic szívében. A konyha a Róma, Bécs és Velence neves éttermeiben szerzett sokéves tapasztalatokból merít: ropogós, kemencés pizzák, kézzel nyújtott házi tészták, krémes lasagne és autentikus dél-olasz, mediterrán fogások varázsolják a Magas-Tátra lábához a napfényes Itália ízeit.
                </p>
              </div>

              {/* Cím és Megközelítés doboz */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2.5 text-teal-300 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Étterem címe & Megközelítés</span>
                  </div>
                  <p
                    lang="hu"
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left w-full"
                  >
                    <strong className="text-white">Pontos cím:</strong>{" "}
                    <a
                      href="https://maps.google.com/?q=La+Famiglia+Tatransk%C3%A1+Lomnica+96+059+60"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-300 hover:text-teal-200 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                      title="Megnyitás Google Térképen telefonon"
                    >
                      <span>Tatranská Lomnica 96, 059 60 Szlovákia</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>{" "}
                    — Tátralomnic központjában, közvetlenül a TEŽ vasútállomás mellett (a Renomal apartmanház épületében) található. A Villa Greystone szállástól autóval mindössze 7-8 perc kényelmes menetidő, vagy a TEŽ tátrai villamossal egy panorámás utazással közvetlenül a lomnici állomásig utazva érhető el.
                  </p>
                </div>
              </div>

              {/* Síelés & Dog-friendly tipp doboz */}
              <div className="p-3 sm:p-4 rounded-xl border border-teal-500/20 bg-teal-500/10">
                <div className="flex items-center gap-3 mb-2.5 text-teal-300 font-bold text-xs sm:text-sm">
                  <span className="text-base select-none">⛷️</span>
                  <span>Téli Tipp: Sípályák közelsége & Kutyabarát légkör</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  Kiváló választás a tátralomnici sípályák (Tatranská Lomnica síközpont) vagy a Lomnici-csúcs felvonózás utáni meleg, kiadós vacsorához. Barátságos, kutyabarát (dog-friendly) fogadtatás és meghitt hegyvidéki belső tér vár; az esti csúcsidőszakban érdemes előre asztalt foglalni.
                </p>
              </div>
            </div>

            {/* Right Div: Specialitások & Action Buttons */}
            <div className="bg-slate-950/85 border border-teal-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:w-[360px] shrink-0 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
                  <Star className="w-4 h-4 text-teal-400 fill-teal-400" />
                  <span>Kínálat & Specialitások:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans mb-5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span><strong>Tradicionális pizzák:</strong> Margherita, Diavolo, bivalymozzarella & pármai sonka</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span><strong>Házi tészták & Lasagne:</strong> Kézzel gyúrt tagliatelle, gnocchi és lasagne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span><strong>Dél-olasz fogások:</strong> Krémes toszkán paradicsomleves és mediterrán tálak</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span><strong>Grillezett húsok & Halak:</strong> Zamatos steakek és friss tengeri ételek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span><strong>Desszertek & Olasz borok:</strong> Házi Tiramisù és kiváló olasz borválaszték</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-teal-500/20">
                <a
                  href="https://lafamigliatatry.sk/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Globe className="w-4 h-4 text-white shrink-0" />
                  <span>Hivatalos Honlap & Étlap</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://maps.google.com/?q=La+Famiglia+Tatransk%C3%A1+Lomnica+96+059+60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>Google Térkép megnyitása</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Dishes Cards */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-amber-400" />
        <span>Kihagyhatatlan tátrai kedvencek</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-800 hover:border-amber-400/40 transition-all hover:-translate-y-1"
          >
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-3 inline-block ${dish.badge}`}>
              {dish.tag}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">{dish.name}</h4>
            <p className="text-xs font-medium text-amber-400 mb-2">{dish.huName}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{dish.desc}</p>
          </div>
        ))}
      </div>

      {/* Traditional Drinks & Breakfast Note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Villa Greystone Reggeli</h4>
            </div>
            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              Bőséges svédasztalos, à la carte és kontinentális reggeli helyben a villa étkezőjében: friss pékáru, felvágottak, prémium sajtok, zöldségek, meleg ételek és kérésre főzött barista kávék (pl. caffe latte).
            </p>
          </div>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Csapolt Kofola</h4>
            </div>
            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              Szlovákia legendás üdítője, 14-féle gyógynövény és gyümölcskivonattal, harmadannyi cukorral mint a kóla. Éttermekben szinte mindig csapolva kérik – a gyerekek és felnőttek közös kedvence!
            </p>
          </div>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Tatratea (Tátrai Tea Likőr)</h4>
            </div>
            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              Késmárkon készülő tátrai specialitás fekete teából, gyógynövényekből és tölgyfahordós érleléssel. A klasszikus 52%-os mellett kapható lágyabb gyümölcsös (32% citrus, 42% őszibarack) változat is.
            </p>
          </div>
        </div>
      </div>

      {/* Spotlight Popup Modal for Center Highlighting with 4-second Auto-return rendered via Portal */}
      {mounted &&
        spotlightImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 transition-all duration-200 ${
              isExiting
                ? "bg-black/0 opacity-0 pointer-events-none"
                : "bg-black/85 backdrop-blur-md opacity-100 animate-modal-backdrop"
            }`}
            onClick={closeSpotlight}
          >
            <div
              className={`relative max-w-4xl w-full max-h-[88vh] rounded-3xl overflow-hidden border border-amber-400/40 shadow-[0_0_60px_rgba(245,158,11,0.3)] bg-slate-950 flex flex-col transition-all duration-200 transform cursor-pointer ${
                isExiting ? "scale-90 opacity-0" : "scale-100 opacity-100 animate-spotlight-pop"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                closeSpotlight();
              }}
              title="Kattints a bezáráshoz (vagy 4 mp után magától visszatér)"
            >
              {/* Close button at top right */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSpotlight();
                }}
                className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 text-white/90 hover:text-white border border-slate-700 hover:border-amber-400/60 backdrop-blur-md shadow-2xl transition-all cursor-pointer text-xs font-semibold"
                aria-label="Bezárás"
              >
                <X className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Bezárás</span>
              </button>

              {/* Main Center Image */}
              <div className="relative w-full h-[58vh] sm:h-[68vh] max-h-[72vh] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={spotlightImage.src}
                  alt={spotlightImage.alt}
                  className="w-full h-full object-contain sm:object-cover select-none"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                      Gasztronómia • Kiemelt Fotó
                    </span>
                    <h4 className="text-lg sm:text-2xl font-extrabold text-white drop-shadow-md">
                      {spotlightImage.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Glowing 4-second countdown bar */}
              <div className="w-full h-1.5 bg-slate-900 relative overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 animate-countdown-4s shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
