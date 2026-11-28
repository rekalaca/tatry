"use client";

import React, { useState } from "react";
import {
  Home,
  MapPin,
  Car,
  Navigation,
  ExternalLink,
  ChevronRight,
  Compass,
  UtensilsCrossed,
  Info
} from "lucide-react";

interface RestaurantLocation {
  id: string;
  name: string;
  category: string;
  town: string;
  distanceKm: number;
  distanceText: string;
  durationText: string;
  transportText: string;
  address: string;
  googleMapsUrl: string;
  anchorId?: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  svgPos: { x: number; y: number };
}

// True geographic coordinates projected to 1 km = 36 pixels (equal X & Y scale, zero distortion)
// Scale origin: Villa Greystone at (430, 270)
const VILLA_GREYSTONE = {
  id: "villa-greystone",
  name: "Villa Greystone (Szállásunk)",
  town: "Nová Lesná",
  address: "Zakladateľov 387, 059 86 Nová Lesná",
  svgPos: { x: 430, y: 270 },
};

const RESTAURANTS: RestaurantLocation[] = [
  {
    id: "koliba-tatry",
    name: "Koliba Tatry Tradicionális Étterem",
    category: "Hagyományos szlovák koliba & grill",
    town: "Nová Lesná",
    distanceKm: 0.1,
    distanceText: "100 méter",
    durationText: "1-2 perc séta",
    transportText: "Közvetlenül a szállás mellett • Ingyenes házhoz szállítás",
    address: "Slavkovská 521, 059 86 Nová Lesná",
    googleMapsUrl: "https://maps.google.com/?q=Koliba+Tatry+Slavkovsk%C3%A1+521+059+86+Nov%C3%A1+Lesn%C3%A1",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/15",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-300",
    svgPos: { x: 408, y: 272 },
  },
  {
    id: "manuel-caffe",
    name: "Manuel Caffé & Bistro Italiano",
    category: "Olasz kávézó, pizza & bisztró",
    town: "Horný Smokovec",
    distanceKm: 4.0,
    distanceText: "4,0 km",
    durationText: "kb. 4-5 perc",
    transportText: "Autóval vagy TEŽ villamossal (Pod lesom ➔ Horný Smokovec)",
    address: "Horný Smokovec 20, 062 01 Vysoké Tatry",
    googleMapsUrl: "https://maps.google.com/?q=Manuel+Caffe+Bistro+Italiano+Horny+Smokovec+20+Stary+Smokovec+062+01+Vysoke+Tatry",
    color: "#f43f5e",
    badgeBg: "bg-rose-500/15",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-300",
    svgPos: { x: 325, y: 205 },
  },
  {
    id: "koliba-kamzik",
    name: "Koliba Kamzík Ótátrafüred",
    category: "Patinás hegyvidéki koliba",
    town: "Starý Smokovec",
    distanceKm: 5.0,
    distanceText: "5,0 km",
    durationText: "kb. 6 perc",
    transportText: "Autóval vagy TEŽ villamossal (Hrebienok siklóállomás mellett)",
    address: "Starý Smokovec 8, 062 01 Vysoké Tatry",
    googleMapsUrl: "https://maps.google.com/?q=Koliba+Kamz%C3%ADk+Star%C3%BD+Smokovec+8+062+01+Vysok%C3%A9+Tatry",
    color: "#10b981",
    badgeBg: "bg-emerald-500/15",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-300",
    svgPos: { x: 265, y: 195 },
  },
  {
    id: "koliba-penzion",
    name: "Koliba Restaurant & Penzión",
    category: "Nyílt parázson sült ételek & élő zene",
    town: "Starý Smokovec",
    distanceKm: 5.2,
    distanceText: "5,2 km",
    durationText: "kb. 6 perc",
    transportText: "Autóval vagy TEŽ villamossal (a Szlavkói-csúcs lábánál)",
    address: "Starý Smokovec 34, 062 01 Vysoké Tatry",
    googleMapsUrl: "https://maps.google.com/?q=Koliba+Restaurant+Penzion+Stary+Smokovec+34+062+01+Vysoke+Tatry",
    color: "#f97316",
    badgeBg: "bg-orange-500/15",
    badgeBorder: "border-orange-500/30",
    badgeText: "text-orange-300",
    svgPos: { x: 245, y: 215 },
  },
  {
    id: "la-famiglia",
    name: "La Famiglia Ristorante Italiano",
    category: "Tradicionális olasz konyha & pizzéria",
    town: "Tatranská Lomnica",
    distanceKm: 6.0,
    distanceText: "6,0 km",
    durationText: "kb. 7-8 perc",
    transportText: "Autóval vagy TEŽ villamossal (a vasútállomás szomszédságában)",
    address: "Tatranská Lomnica 96, 059 60 Vysoké Tatry",
    googleMapsUrl: "https://maps.google.com/?q=La+Famiglia+Tatransk%C3%A1+Lomnica+96+059+60",
    color: "#14b8a6",
    badgeBg: "bg-teal-500/15",
    badgeBorder: "border-teal-500/30",
    badgeText: "text-teal-300",
    svgPos: { x: 465, y: 110 },
  },
  {
    id: "humno-tatry",
    name: "Humno Tatry Restaurant & Music Club",
    category: "Étterem, après-ski bár & party club",
    town: "Tatranská Lomnica",
    distanceKm: 6.5,
    distanceText: "6,5 km",
    durationText: "kb. 8 perc",
    transportText: "Autóval vagy TEŽ villamossal (a sípályák & kabinos felvonó lábánál)",
    address: "Tatranská Lomnica 059 60 Vysoké Tatry",
    googleMapsUrl: "https://maps.google.com/?q=Humno+Tatry+Tatransk%C3%A1+Lomnica+059+60",
    color: "#a855f7",
    badgeBg: "bg-purple-500/15",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-300",
    svgPos: { x: 430, y: 95 },
  },
  {
    id: "la-primavera",
    name: "La Primavera Pizzeria & Ristorante",
    category: "Kemencés olasz pizza & házi tészták",
    town: "Poprad",
    distanceKm: 8.5,
    distanceText: "8,5 km",
    durationText: "kb. 11 perc",
    transportText: "Autóval (534-es út déli irányba) vagy TEŽ villamossal",
    address: "Štefánikova 897/4, 058 01 Poprad",
    googleMapsUrl: "https://maps.google.com/?q=La+Primavera+Pizzeria+%C5%A0tef%C3%A1nikova+897%2F4+058+01+Poprad",
    color: "#f43f5e",
    badgeBg: "bg-rose-500/15",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-300",
    svgPos: { x: 495, y: 535 },
  },
  {
    id: "dobre-casy",
    name: "Dobré Časy & Burger Poprad",
    category: "16 csapolt kraft sör & gourmet burgerek",
    town: "Poprad",
    distanceKm: 8.8,
    distanceText: "8,8 km",
    durationText: "kb. 11 perc",
    transportText: "Autóval a belvárosig vagy TEŽ villamossal Poprad-Tatry állomásig",
    address: "Levočská 211/2, 058 01 Poprad",
    googleMapsUrl: "https://maps.google.com/?q=Dobr%C3%A9+%C4%8Casy+Levo%C4%8Dsk%C3%A1+211%2F2+058+01+Poprad",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/15",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-300",
    svgPos: { x: 520, y: 545 },
  },
];

export default function GasztroMap() {
  const [activeId, setActiveId] = useState<string>("koliba-tatry");
  const [filterTown, setFilterTown] = useState<string>("all");

  const activeRestaurant = RESTAURANTS.find((r) => r.id === activeId) || RESTAURANTS[0];

  const filteredRestaurants =
    filterTown === "all"
      ? RESTAURANTS
      : RESTAURANTS.filter((r) => {
          if (filterTown === "nova-lesna") return r.town === "Nová Lesná";
          if (filterTown === "smokovec") return r.town.includes("Smokovec");
          if (filterTown === "lomnica") return r.town === "Tatranská Lomnica";
          if (filterTown === "poprad") return r.town === "Poprad";
          return true;
        });

  return (
    <div className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 border border-amber-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-amber-950/20">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar - Full Div Width above content */}
      <div className="relative z-10 w-full mb-4 sm:mb-6 pb-3.5 sm:pb-5 border-b border-slate-800">
        <div className="w-full mb-3">
          <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Éttermek elhelyezkedése & Távolságok
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Kattints bármelyik étteremre a térképen vagy a listában a pontos menetidő és cím megtekintéséhez.
          </p>
        </div>

        {/* Town filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium w-full">
          <button
            type="button"
            onClick={() => setFilterTown("all")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              filterTown === "all"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-semibold"
                : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Mind (8)
          </button>
          <button
            type="button"
            onClick={() => setFilterTown("nova-lesna")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              filterTown === "nova-lesna"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-semibold"
                : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Nová Lesná (100 m)
          </button>
          <button
            type="button"
            onClick={() => setFilterTown("smokovec")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              filterTown === "smokovec"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-semibold"
                : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Ótátrafüred (4-5 km)
          </button>
          <button
            type="button"
            onClick={() => setFilterTown("lomnica")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              filterTown === "lomnica"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-semibold"
                : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Tátralomnic (6 km)
          </button>
          <button
            type="button"
            onClick={() => setFilterTown("poprad")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
              filterTown === "poprad"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm font-semibold"
                : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Poprád (8,5 km)
          </button>
        </div>
      </div>

      {/* Main Map Area: SVG Canvas + Active Card Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* SVG Map (7 Cols on desktop) */}
        <div className="lg:col-span-7 bg-slate-950/90 rounded-xl sm:rounded-2xl border border-slate-800/80 p-2 sm:p-4 shadow-xl overflow-hidden relative">
          <div className="relative w-full aspect-[860/620] select-none">
            <svg
              viewBox="0 0 860 620"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Méretarányos gasztronómiai térkép"
            >
              <defs>
                {/* Glow Filters */}
                <filter id="map-glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="map-glow-active" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Mountain Ridge Gradient */}
                <linearGradient id="tatras-ridge" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid Background */}
              <pattern id="scale-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              <rect width="860" height="620" fill="url(#scale-grid)" />

              {/* High Tatras Mountain Silhouette (North / Top of Map) */}
              <path
                d="M 60 140 L 150 95 L 240 120 L 320 80 L 400 110 L 470 65 L 560 115 L 660 70 L 760 125 L 840 145 L 840 210 L 60 210 Z"
                fill="url(#tatras-ridge)"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1.5"
              />

              {/* Mountain Peak Labels */}
              <g opacity="0.65">
                <path d="M 470 65 L 464 78 L 476 78 Z" fill="#94a3b8" />
                <text x="470" y="58" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                  Lomnici-csúcs (2634 m)
                </text>

                <path d="M 320 80 L 314 92 L 326 92 Z" fill="#94a3b8" />
                <text x="320" y="73" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                  Szlavkói-csúcs (2452 m)
                </text>

                <path d="M 150 95 L 144 107 L 156 107 Z" fill="#94a3b8" />
                <text x="150" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  Gerlachfalvi-csúcs (2655 m)
                </text>
              </g>

              {/* Major Road & TEŽ Network (Physically connects towns) */}
              {/* Cesta Slobody (Road 537: Smokovec ➔ Horný Smokovec ➔ Tatranská Lomnica) */}
              <path
                d="M 230 215 Q 320 180, 440 100 Q 470 105, 500 115"
                fill="none"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Road 534: Smokovec / Horný Smokovec ➔ Nová Lesná ➔ Poprad */}
              <path
                d="M 270 200 Q 340 230, 415 270 Q 450 320, 460 380 Q 480 470, 510 540"
                fill="none"
                stroke="rgba(245, 158, 11, 0.35)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Road connecting Nová Lesná ➔ Tatranská Lomnica */}
              <path
                d="M 430 270 Q 425 180, 440 105"
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />

              {/* TEŽ Rail Y-network (subtle dashed tracks) */}
              <path
                d="M 260 195 Q 350 250, 425 275 Q 460 390, 510 540"
                fill="none"
                stroke="rgba(14, 165, 233, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Scale-accurate Radial Distance Circles around Villa Greystone (1 km = 36 px) */}
              {/* 5 km circle = 180 px radius */}
              <circle
                cx={VILLA_GREYSTONE.svgPos.x}
                cy={VILLA_GREYSTONE.svgPos.y}
                r="180"
                fill="none"
                stroke="rgba(245, 158, 11, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <text x={VILLA_GREYSTONE.svgPos.x + 185} y={VILLA_GREYSTONE.svgPos.y + 4} fill="#f59e0b" opacity="0.4" fontSize="9" fontWeight="bold">
                5 km távolság
              </text>

              {/* Town Area Enclosures / Labels */}
              {/* Starý Smokovec */}
              <rect x="210" y="170" width="145" height="65" rx="12" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(148, 163, 184, 0.15)" />
              <text x="218" y="184" fill="#94a3b8" fontSize="10" fontWeight="bold">
                ÓTÁTRAFÜRED (Starý Smokovec)
              </text>

              {/* Tatranská Lomnica */}
              <rect x="400" y="75" width="135" height="55" rx="12" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(148, 163, 184, 0.15)" />
              <text x="408" y="88" fill="#94a3b8" fontSize="10" fontWeight="bold">
                TÁTRALOMNIC (Lomnica)
              </text>

              {/* Nová Lesná (Base Area) */}
              <rect x="375" y="245" width="130" height="55" rx="12" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" />
              <text x="385" y="260" fill="#f59e0b" fontSize="10" fontWeight="bold">
                NOVÁ LESNÁ (Bázisunk)
              </text>

              {/* Poprad */}
              <rect x="450" y="510" width="130" height="55" rx="12" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(148, 163, 184, 0.15)" />
              <text x="460" y="525" fill="#94a3b8" fontSize="10" fontWeight="bold">
                POPRÁD (Poprad belváros)
              </text>

              {/* Active Route Highlight Line (from Villa to Active Restaurant) */}
              {activeRestaurant && (
                <path
                  d={`M ${VILLA_GREYSTONE.svgPos.x} ${VILLA_GREYSTONE.svgPos.y} L ${activeRestaurant.svgPos.x} ${activeRestaurant.svgPos.y}`}
                  fill="none"
                  stroke={activeRestaurant.color}
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity="0.85"
                />
              )}

              {/* RESTAURANT MARKERS */}
              {RESTAURANTS.map((rest) => {
                const isSelected = rest.id === activeId;
                return (
                  <g
                    key={rest.id}
                    onClick={() => setActiveId(rest.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={rest.svgPos.x}
                        cy={rest.svgPos.y}
                        r="14"
                        fill="none"
                        stroke={rest.color}
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.4"
                      />
                    )}

                    {/* Outer marker circle */}
                    <circle
                      cx={rest.svgPos.x}
                      cy={rest.svgPos.y}
                      r={isSelected ? "11" : "8"}
                      fill="#0f172a"
                      stroke={rest.color}
                      strokeWidth={isSelected ? "3" : "2"}
                      filter={isSelected ? "url(#map-glow-active)" : undefined}
                      className="transition-all duration-300 group-hover:r-[10px]"
                    />

                    {/* Inner color dot */}
                    <circle
                      cx={rest.svgPos.x}
                      cy={rest.svgPos.y}
                      r={isSelected ? "5" : "3.5"}
                      fill={rest.color}
                      className="transition-all duration-300"
                    />

                    {/* Quick Marker Label */}
                    <text
                      x={rest.svgPos.x + 12}
                      y={rest.svgPos.y + 4}
                      fill={isSelected ? "#ffffff" : "#cbd5e1"}
                      fontSize={isSelected ? "11" : "9.5"}
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none select-none"
                    >
                      {rest.name.replace(" Tradicionális Étterem", "").replace(" Pizzeria & Ristorante", "").replace(" Restaurant & Music Club", "")}
                    </text>
                  </g>
                );
              })}

              {/* VILLA GREYSTONE BASE PIN (HOUSE ICON) */}
              <g
                onClick={() => setActiveId("koliba-tatry")}
                className="cursor-pointer group"
              >
                {/* Outer golden halo */}
                <circle
                  cx={VILLA_GREYSTONE.svgPos.x}
                  cy={VILLA_GREYSTONE.svgPos.y}
                  r="18"
                  fill="rgba(245, 158, 11, 0.2)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  filter="url(#map-glow-amber)"
                  className="animate-pulse"
                />
                <circle
                  cx={VILLA_GREYSTONE.svgPos.x}
                  cy={VILLA_GREYSTONE.svgPos.y}
                  r="11"
                  fill="#f59e0b"
                />

                {/* House Icon graphic in center of pin */}
                <path
                  d={`M ${VILLA_GREYSTONE.svgPos.x} ${VILLA_GREYSTONE.svgPos.y - 6} L ${VILLA_GREYSTONE.svgPos.x - 5} ${VILLA_GREYSTONE.svgPos.y - 1} L ${VILLA_GREYSTONE.svgPos.x - 3} ${VILLA_GREYSTONE.svgPos.y - 1} L ${VILLA_GREYSTONE.svgPos.x - 3} ${VILLA_GREYSTONE.svgPos.y + 5} L ${VILLA_GREYSTONE.svgPos.x + 3} ${VILLA_GREYSTONE.svgPos.y + 5} L ${VILLA_GREYSTONE.svgPos.x + 3} ${VILLA_GREYSTONE.svgPos.y - 1} L ${VILLA_GREYSTONE.svgPos.x + 5} ${VILLA_GREYSTONE.svgPos.y - 1} Z`}
                  fill="#020617"
                />

                {/* Base badge */}
                <text
                  x={VILLA_GREYSTONE.svgPos.x + 20}
                  y={VILLA_GREYSTONE.svgPos.y - 2}
                  fill="#fbbf24"
                  fontSize="12"
                  fontWeight="bold"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                >
                  🏠 Villa Greystone (Szállásunk)
                </text>
                <text
                  x={VILLA_GREYSTONE.svgPos.x + 20}
                  y={VILLA_GREYSTONE.svgPos.y + 11}
                  fill="#fde68a"
                  fontSize="9.5"
                  className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                >
                  ★ Bázis • Koliba Tatry mindössze 100 m
                </text>
              </g>

              {/* Exact Scale Bar in bottom-left corner */}
              {/* 36 px = 1 km, so 72 px = 2 km, 180 px = 5 km */}
              <g transform="translate(40, 560)" opacity="0.85">
                <rect x="0" y="-18" width="200" height="34" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(148, 163, 184, 0.2)" />
                <line x1="10" y1="0" x2="190" y2="0" stroke="#f1f5f9" strokeWidth="2" />
                <line x1="10" y1="-5" x2="10" y2="5" stroke="#f1f5f9" strokeWidth="2" />
                <line x1="82" y1="-3" x2="82" y2="3" stroke="#f1f5f9" strokeWidth="1.5" />
                <line x1="190" y1="-5" x2="190" y2="5" stroke="#f1f5f9" strokeWidth="2" />
                <text x="10" y="10" fill="#94a3b8" fontSize="8">0</text>
                <text x="75" y="10" fill="#94a3b8" fontSize="8">2 km</text>
                <text x="175" y="10" fill="#f59e0b" fontSize="8" fontWeight="bold">5 km</text>
                <text x="10" y="-8" fill="#e2e8f0" fontSize="8.5" fontWeight="bold">
                  MÉRETARÁNY (1 km = 36 px)
                </text>
              </g>

              {/* Compass Rose in bottom-right */}
              <g transform="translate(800, 565)" opacity="0.6">
                <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                <path d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z" fill="none" stroke="#f59e0b" strokeWidth="1" />
                <path d="M 0 -14 L 3 -3 L 0 0 Z" fill="#f59e0b" />
                <text x="0" y="-17" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">É</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Selected Restaurant Information Card (5 Cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
          {/* Active Detail Card */}
          <div className="glass-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-amber-500/30 bg-slate-900/90 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${activeRestaurant.badgeBg} ${activeRestaurant.badgeBorder} ${activeRestaurant.badgeText}`}>
                {activeRestaurant.town}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeRestaurant.distanceText} • {activeRestaurant.durationText}</span>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              {activeRestaurant.name}
            </h4>
            <p className="text-xs text-amber-300/90 font-medium mb-3">
              {activeRestaurant.category}
            </p>

            {/* Megközelítés / Közlekedés doboz */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 mb-3 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Megközelítés a Villa Greystone-tól:</span>
              </div>
              <p
                lang="hu"
                className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
              >
                {activeRestaurant.transportText}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-xs text-slate-400 mb-4">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>{activeRestaurant.address}</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(activeRestaurant.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-750 text-amber-200 hover:text-white border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                <span>Részletek a lapon</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </button>

              <a
                href={activeRestaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-950" />
                <span>Útvonaltervezés</span>
                <ExternalLink className="w-3 h-3 text-slate-950" />
              </a>
            </div>
          </div>

          {/* Quick Distance Table */}
          <div className="bg-slate-950/80 rounded-xl sm:rounded-2xl border border-slate-800 p-3 sm:p-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
              <span>Gyors távolságlista a villától</span>
              <span className="text-[11px] text-amber-400 font-semibold">8 étterem</span>
            </h5>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredRestaurants.map((rest) => {
                const isSelected = rest.id === activeId;
                return (
                  <button
                    key={rest.id}
                    type="button"
                    onClick={() => setActiveId(rest.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500/40 text-white font-semibold shadow-sm"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: rest.color }}
                      />
                      <span className="truncate">{rest.name}</span>
                    </div>
                    <span className="shrink-0 text-amber-300 font-bold text-[11px]">
                      {rest.distanceText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
