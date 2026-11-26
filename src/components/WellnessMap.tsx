"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Home, 
  Waves,
  CheckCircle2,
  Compass
} from "lucide-react";

interface BathLocation {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  country: "SK" | "PL";
  countryName: string;
  flag: string;
  address: string;
  distance: string;
  duration: string;
  route: string;
  coords: { lat: number; lng: number };
  svgPos: { x: number; y: number };
  logo: string;
  link: string;
  temp: string;
  highlight: string;
}

const VILLA_GREYSTONE = {
  id: "villa-greystone",
  name: "Villa Greystone (Szállásunk)",
  tag: "Bázisállomás • Magas-Tátra",
  address: "Horný Smokovec 21, 062 01 Vysoké Tatry, Szlovákia",
  coords: { lat: 49.1384, lng: 20.2392 },
  svgPos: { x: 670, y: 380 },
};

const BATH_LOCATIONS: BathLocation[] = [
  {
    id: "aquacity",
    name: "AquaCity Poprad",
    badge: "Szlovákia • Közeli kedvenc",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    country: "SK",
    countryName: "Szlovákia",
    flag: "🇸🇰",
    address: "Športová 1397/1, Spišská Sobota, 058 01 Poprad",
    distance: "13 km",
    duration: "kb. 14 perc",
    route: "534-es főút déli irányba Poprád felé (TEŽ hegyi villamossal is elérhető)",
    coords: { lat: 49.0601, lng: 20.3090 },
    svgPos: { x: 795, y: 475 },
    logo: "https://shop.aquacity.sk/wp-content/uploads/2020/03/logo-aquacity.svg",
    link: "https://shop.aquacity.sk/en/",
    temp: "30 - 38 °C",
    highlight: "13 fedett és kültéri termálmedence esti lézershow-val a Tátra lábánál.",
  },
  {
    id: "bukovina",
    name: "Termy BUKOVINA",
    badge: "Lengyelország • Alpesi prémium",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    country: "PL",
    countryName: "Lengyelország",
    flag: "🇵🇱",
    address: "ul. Sportowa 22, 34-530 Bukowina Tatrzańska",
    distance: "38 km",
    duration: "kb. 38 perc",
    route: "Tátralomnic ➔ Ždiar (66-os út) ➔ Jurgów határátkelő ➔ Bukowina Tatrzańska",
    coords: { lat: 49.3364, lng: 20.0984 },
    svgPos: { x: 425, y: 150 },
    logo: "https://babygo.pl/upload/firm/termy-bukovina/Termy%20BUKOVINA.jpg",
    link: "https://www.termybukovina.pl/en/",
    temp: "30 - 38 °C",
    highlight: "20 alpesi hegyi termálmedence gőzölgő kültéri kilátással a havas fenyvesekre.",
  },
  {
    id: "bania",
    name: "Terma Bania",
    badge: "Lengyelország • Sípálya & Aquapark",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    country: "PL",
    countryName: "Lengyelország",
    flag: "🇵🇱",
    address: "Środkowa 181, 34-405 Białka Tatrzańska",
    distance: "44 km",
    duration: "kb. 43 perc",
    route: "Ždiar ➔ Jurgów határátkelő ➔ Bukowina Tatrzańska ➔ 49-es út észak felé",
    coords: { lat: 49.3908, lng: 20.1064 },
    svgPos: { x: 440, y: 85 },
    logo: "https://www.nadwodospadem.info/files/200/logo_277_x_200_px1_4x3.png",
    link: "https://www.termabania.pl/en/",
    temp: "34 - 38 °C",
    highlight: "Közvetlenül a Kotelnica sípályák lábánál, családi és csendes pihenő zónákkal.",
  },
  {
    id: "zakopane",
    name: "Termy Zakopiańskie",
    badge: "Lengyelország • Városközpont & Panoráma",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    country: "PL",
    countryName: "Lengyelország",
    flag: "🇵🇱",
    address: "Jagiellońska utca 31, 34-500 Zakopane",
    distance: "48 km",
    duration: "kb. 48 perc",
    route: "Ždiar ➔ Łysa Polana vagy Jurgów határ ➔ Poronin ➔ Zakopane belváros",
    coords: { lat: 49.2965, lng: 19.9634 },
    svgPos: { x: 185, y: 195 },
    logo: "https://www.termy-zakopianskie.pl/images/termy-logo-300x107.webp",
    link: "https://www.termy-zakopianskie.pl/",
    temp: "29 - 36 °C",
    highlight: "Kilátás a havas Giewont csúcsra, kénes termálvíz és sétálóutcás közelség.",
  },
];

export default function WellnessMap() {
  const [selectedId, setSelectedId] = useState<string>("aquacity");

  const selectedBath = BATH_LOCATIONS.find((b) => b.id === selectedId) || BATH_LOCATIONS[0];

  const getGoogleMapsDirectionsUrl = (bath: BathLocation) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${VILLA_GREYSTONE.coords.lat},${VILLA_GREYSTONE.coords.lng}&destination=${bath.coords.lat},${bath.coords.lng}&travelmode=driving`;
  };

  const getWazeUrl = (bath: BathLocation) => {
    return `https://waze.com/ul?ll=${bath.coords.lat},${bath.coords.lng}&navigate=yes`;
  };

  return (
    <div
      id="furdoterkep"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/25 shadow-2xl relative overflow-hidden scroll-mt-28 mb-12"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Icon: One row per Villa Greystone UI rule */}
      <div className="flex items-center gap-3 mb-2.5">
        <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30 shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Tátrai Fürdőtérkép & Útvonaltervező
        </h3>
      </div>

      {/* Description: Starts on new row, full width, justified per UI rules */}
      <p
        lang="hu"
        className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mb-6"
      >
        Fedezzétek fel a 4 kiemelt termál- és élményfürdő elhelyezkedését a Villa Greystone szálláshoz képest! A Magas-Tátra hegyvonulata választja el a déli szlovákiai AquaCity Popradot az északi lengyelországi fürdőparadicsomoktól (Termy BUKOVINA, Terma Bania, Termy Zakopiańskie). Kattintsatok bármelyik fürdőre a részletes menetidő, útvonal és navigáció eléréséhez!
      </p>

      {/* Quick Location Switcher Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Kiválasztott célpont:</span>
        </span>
        {BATH_LOCATIONS.map((bath) => (
          <button
            key={bath.id}
            onClick={() => setSelectedId(bath.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedId === bath.id
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30 ring-2 ring-cyan-300"
                : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <span>{bath.flag}</span>
            <span>{bath.name}</span>
            <span className="text-[10px] opacity-75 font-mono">({bath.distance})</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map + Selected Location Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
        {/* SVG Interactive Map (7 cols on large screens) */}
        <div className="lg:col-span-7 bg-[#071322] border border-sky-500/30 rounded-2xl p-3 sm:p-4 shadow-inner relative flex flex-col justify-between overflow-hidden">
          {/* Legend Badges at top corners */}
          <div className="flex items-center justify-between gap-2 z-10 mb-2 px-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-semibold text-amber-300">Villa Greystone</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> 4 kiemelt fürdő
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">🇸🇰 SK / 🇵🇱 PL határ</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[940/560] select-none">
            <svg
              viewBox="0 0 940 560"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Tátrai Fürdők & Villa Greystone térkép"
            >
              <defs>
                {/* Glow filter */}
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="tatras-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Grid Background */}
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
              <rect width="940" height="560" fill="url(#map-grid)" />

              {/* Slovak / Polish Border dashed line */}
              <path
                d="M 60 220 Q 180 230, 240 250 T 400 240 T 560 210 T 730 200 T 900 180"
                fill="none"
                stroke="rgba(244, 63, 94, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <text x="80" y="210" fill="#f43f5e" fontSize="11" fontWeight="bold" letterSpacing="1">
                LENGYELORSZÁG (POLSKA)
              </text>
              <text x="80" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold" letterSpacing="1">
                SZLOVÁKIA (SLOVENSKO)
              </text>

              {/* High Tatras Mountain Ridge Silhouette in Center */}
              <path
                d="M 120 290 L 170 255 L 220 275 L 280 235 L 340 270 L 410 220 L 485 205 L 550 240 L 630 195 L 700 260 L 760 300 Z"
                fill="url(#tatras-gradient)"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="1.5"
              />

              {/* Mountain Peaks indicators */}
              <g opacity="0.6">
                <path d="M 630 195 L 620 215 L 640 215 Z" fill="#94a3b8" />
                <text x="630" y="190" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                  Lomnici-csúcs (2634 m)
                </text>

                <path d="M 485 205 L 475 225 L 495 225 Z" fill="#94a3b8" />
                <text x="485" y="200" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                  Gerlachfalvi-csúcs (2655 m)
                </text>

                <path d="M 280 235 L 272 250 L 288 250 Z" fill="#94a3b8" />
                <text x="280" y="230" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                  Rysy (2501 m)
                </text>

                <path d="M 170 255 L 163 268 L 177 268 Z" fill="#94a3b8" />
                <text x="170" y="250" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                  Giewont (1895 m)
                </text>
              </g>

              {/* Base Road Network (subtle lines) */}
              <path
                d="M 670 380 L 795 475"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              <path
                d="M 670 380 Q 730 350, 720 230 Q 640 180, 500 170 Q 450 165, 425 150"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              <path
                d="M 425 150 L 440 85"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              <path
                d="M 425 150 Q 300 170, 185 195"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />

              {/* ACTIVE ROUTE LINE to Selected Bath (with glowing animation) */}
              {selectedBath.id === "aquacity" && (
                <path
                  d="M 670 380 L 795 475"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  filter="url(#glow-cyan)"
                  strokeLinecap="round"
                />
              )}
              {selectedBath.id === "bukovina" && (
                <path
                  d="M 670 380 Q 730 350, 720 230 Q 640 180, 500 170 Q 450 165, 425 150"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="4"
                  filter="url(#glow-cyan)"
                  strokeLinecap="round"
                />
              )}
              {selectedBath.id === "bania" && (
                <path
                  d="M 670 380 Q 730 350, 720 230 Q 640 180, 500 170 Q 450 165, 425 150 L 440 85"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  filter="url(#glow-amber)"
                  strokeLinecap="round"
                />
              )}
              {selectedBath.id === "zakopane" && (
                <path
                  d="M 670 380 Q 730 350, 720 230 Q 560 175, 425 150 Q 300 170, 185 195"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  filter="url(#glow-cyan)"
                  strokeLinecap="round"
                />
              )}

              {/* VILLA GREYSTONE PIN (Base Accommodation) */}
              <g className="cursor-pointer" onClick={() => setSelectedId("aquacity")}>
                {/* Pulse wave */}
                <circle cx={VILLA_GREYSTONE.svgPos.x} cy={VILLA_GREYSTONE.svgPos.y} r="22" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.4">
                  <animate attributeName="r" values="14;34" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={VILLA_GREYSTONE.svgPos.x} cy={VILLA_GREYSTONE.svgPos.y} r="14" fill="#f59e0b" filter="url(#glow-amber)" />
                <circle cx={VILLA_GREYSTONE.svgPos.x} cy={VILLA_GREYSTONE.svgPos.y} r="7" fill="#090d16" />
                {/* Text Label */}
                <rect x={VILLA_GREYSTONE.svgPos.x - 85} y={VILLA_GREYSTONE.svgPos.y + 18} width="170" height="26" rx="6" fill="#090d16" stroke="#f59e0b" strokeWidth="1.5" />
                <text x={VILLA_GREYSTONE.svgPos.x} y={VILLA_GREYSTONE.svgPos.y + 35} textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  🏠 Villa Greystone (Szállás)
                </text>
              </g>

              {/* 4 BATH PINS */}
              {BATH_LOCATIONS.map((bath) => {
                const isSelected = selectedId === bath.id;
                const pinColor = bath.id === "bania" ? "#f59e0b" : bath.id === "zakopane" ? "#10b981" : "#38bdf8";

                return (
                  <g
                    key={bath.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedId(bath.id)}
                  >
                    {/* Ring when selected */}
                    {isSelected && (
                      <circle
                        cx={bath.svgPos.x}
                        cy={bath.svgPos.y}
                        r="20"
                        fill="none"
                        stroke={pinColor}
                        strokeWidth="2.5"
                        opacity="0.8"
                      >
                        <animate attributeName="r" values="16;28" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0.1" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Outer marker circle */}
                    <circle
                      cx={bath.svgPos.x}
                      cy={bath.svgPos.y}
                      r={isSelected ? "14" : "11"}
                      fill={pinColor}
                      filter="url(#glow-cyan)"
                      className="transition-all duration-300"
                    />
                    <circle cx={bath.svgPos.x} cy={bath.svgPos.y} r={isSelected ? "6" : "4.5"} fill="#08121e" />

                    {/* Label Badge */}
                    <g transform={`translate(${bath.svgPos.x}, ${bath.svgPos.y - 18})`}>
                      <rect
                        x="-70"
                        y="-22"
                        width="140"
                        height="24"
                        rx="6"
                        fill={isSelected ? pinColor : "#090d16"}
                        stroke={isSelected ? "#ffffff" : pinColor}
                        strokeWidth={isSelected ? "1.8" : "1.2"}
                        className="transition-all"
                      />
                      <text
                        x="0"
                        y="-6"
                        textAnchor="middle"
                        fill={isSelected ? "#090d16" : "#ffffff"}
                        fontSize="10.5"
                        fontWeight="bold"
                      >
                        {bath.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Route Footnote */}
          <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-cyan-400" />
              <span>Közvetlen hegyi utak a Magas-Tátra körül (autópályamatrica nélkül is járható)</span>
            </span>
            <span className="text-cyan-300 font-medium">Kattints a pontokra a részletekért!</span>
          </div>
        </div>

        {/* Selected Location Details Panel (5 cols on large screens) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/80 rounded-2xl border border-sky-500/25 p-5 sm:p-6 shadow-xl relative">
          <div>
            {/* Country & Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${selectedBath.badgeColor}`}>
                {selectedBath.badge}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedBath.duration}</span>
              </div>
            </div>

            {/* Bath Name & Large Logo */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedBath.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-cyan-400">{selectedBath.distance} a szállástól</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300">{selectedBath.temp}</span>
                </div>
              </div>

              {/* Large Branded Logo Box */}
              <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-200 shrink-0 flex items-center justify-center min-w-[110px] h-14 sm:h-16">
                <img
                  src={selectedBath.logo}
                  alt={`${selectedBath.name} Logo`}
                  className="h-10 sm:h-12 w-auto max-w-[120px] object-contain"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-xs text-slate-300 mb-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white block text-[11px]">Pontos cím:</strong>
                <span>{selectedBath.address}</span>
              </div>
            </div>

            {/* Highlight & Route info */}
            <div className="space-y-2.5 mb-5 text-xs">
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fürdő élmény:</span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  {selectedBath.highlight}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Javasolt útvonal a Villa Greystone-tól:</span>
                </div>
                <p
                  lang="hu"
                  className="text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  {selectedBath.route}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Google Maps, Waze, and Official Shop/Ticket */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={getGoogleMapsDirectionsUrl(selectedBath)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-300" />
                <span>Google Térkép</span>
              </a>

              <a
                href={getWazeUrl(selectedBath)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Car className="w-3.5 h-3.5 text-sky-300" />
                <span>Waze Navigáció</span>
              </a>
            </div>

            <a
              href={selectedBath.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Hivatalos weboldal & jegyvásárlás</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Practical Distance & Route Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
        {BATH_LOCATIONS.map((bath) => (
          <div
            key={bath.id}
            onClick={() => setSelectedId(bath.id)}
            className={`p-4 rounded-2xl cursor-pointer transition-all ${
              selectedId === bath.id
                ? "bg-slate-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/10"
                : "bg-slate-950/60 border border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base">{bath.flag}</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{bath.distance}</span>
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{bath.name}</h5>
            <div className="flex items-center gap-1 text-[11px] text-amber-300 mb-2">
              <Clock className="w-3 h-3" />
              <span>{bath.duration}</span>
            </div>
            <p
              lang="hu"
              className="text-[11px] text-slate-400 leading-normal text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              {bath.route}
            </p>
          </div>
        ))}
      </div>

      {/* Packing list direct jump */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong className="text-white">Fürdős kellékek előkészítése:</strong> Papucs, törölköző és fürdőruha bepakolásához nézd meg a csomagolási noteszt!
          </p>
        </div>
        <Link
          href="/csomagolas"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 transition-all text-center"
        >
          Fürdős holmik a csomagolási listában ➔
        </Link>
      </div>
    </div>
  );
}
