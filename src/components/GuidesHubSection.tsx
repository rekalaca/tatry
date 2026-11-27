"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Utensils,
  Waves,
  Train,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Mountain,
  Flame,
  Thermometer,
  HeartPulse,
} from "lucide-react";

export default function GuidesHubSection() {
  const guides = [
    {
      title: "Téli Programok & Kirándulások",
      badge: "Kiemelt Élmények",
      desc: "Ótátrafüred & Tarajka (Hrebienok) Jégdóm, 2,5 km-es kivilágított szánkópálya, Csorba-tó téli sétányai és a Lomnici-csúcs felvonói.",
      href: "/programok",
      icon: Compass,
      tag: "Tarajka • Csorba-tó • Lomnic",
      gradient: "from-amber-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-amber-400/60 hover:shadow-amber-500/15",
      badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      iconBg: "bg-amber-500/15 text-amber-300 border-amber-400/30",
      cta: "Programok megtekintése",
    },
    {
      title: "Gasztronómia & Koliba Élmény",
      badge: "Helyi Ízek",
      desc: "Autentikus tátrai rönkfa éttermek (szomszédos Koliba Tatry magyar étlappal és házhoz szállítással, Koliba Kamzík és Koliba Restaurant Ótátrafüreden), olasz kávézó és forró levesek.",
      href: "/gasztro",
      icon: Utensils,
      tag: "Koliba Tatry • Koliba Kamzík • Koliba Penzión • Manuel Caffé",
      gradient: "from-orange-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-orange-400/60 hover:shadow-orange-500/15",
      badgeClass: "bg-orange-500/20 text-orange-300 border-orange-400/30",
      iconBg: "bg-orange-500/15 text-orange-300 border-orange-400/30",
      cta: "Étlap & Éttermek",
    },
    {
      title: "Fürdők & Wellness Pihenés",
      badge: "38 °C Forró Víz",
      desc: "AquaCity Poprad panorámás medencékkel és esti lézershow-val, Termy BUKOVINA, Terma Bania, Termy Zakopiańskie és privát szaunánk.",
      href: "/furdo",
      icon: Waves,
      tag: "AquaCity • Bukovina • Terma Bania • Zakopane",
      gradient: "from-cyan-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-cyan-400/60 hover:shadow-cyan-500/15",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
      iconBg: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
      cta: "Fürdők felfedezése",
    },
    {
      title: "Közlekedés & Tátrai Villamos (TEŽ)",
      badge: "Élő Menetrend & Térkép",
      desc: "Pod lesom vasúti megálló 10 perces sétaútja, élő vonattérkép, 183-as és 184-es menetrend, 24 órás bérletárak és autós KRESZ szabályok.",
      href: "/kozlekedes",
      icon: Train,
      tag: "Élő vonattérkép • 24h bérlet • Sétaútvonal",
      gradient: "from-sky-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-sky-400/60 hover:shadow-sky-500/15",
      badgeClass: "bg-sky-500/20 text-sky-300 border-sky-400/30",
      iconBg: "bg-sky-500/15 text-sky-300 border-sky-400/30",
      cta: "Közlekedési kalauz",
    },
    {
      title: "Csomagolási Notesz",
      badge: "Interaktív Csekklista",
      desc: "Személyes öltözet, szánkózás, kötelező autós tartozékok, okmányok, elektronika és konyha – pipálható, eszközön menthető családi ellenőrzőlista.",
      href: "/csomagolas",
      icon: CheckSquare,
      tag: "Menthető csekklista • Téli felszerelés",
      gradient: "from-emerald-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-emerald-400/60 hover:shadow-emerald-500/15",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      iconBg: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
      cta: "Csomagolólista megnyitása",
    },
    {
      title: "Orvosi Ügyeletek & Patikák",
      badge: "0–24 Sürgősségi",
      desc: "Poprádi Kórház 0–24 sürgősségi és háziorvosi ügyelete, ótátrafüredi rendelő, hétvégén is nyitva tartó gyógyszertárak és HZS hegyi mentési tudnivalók.",
      href: "/ugyelet",
      icon: HeartPulse,
      tag: "0–24 Sürgősségi • Dr. Max Ótátrafüred • HZS 18 300",
      gradient: "from-rose-500/20 via-slate-900/80 to-slate-950",
      borderHover: "hover:border-rose-400/60 hover:shadow-rose-500/15",
      badgeClass: "bg-rose-500/20 text-rose-300 border-rose-400/30",
      iconBg: "bg-rose-500/15 text-rose-300 border-rose-400/30",
      cta: "Ügyeleti kalauz & Segélyhívók",
    },
  ];

  return (
    <section id="kalauzok" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Részletes Tátrai Útmutatók</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Tátrai Kalauzaink &{" "}
          <span className="bg-gradient-to-r from-sky-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
            Aloldalaink
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Minden fontos élmény, látnivaló, étterem és közlekedési infó külön dedikált aloldalakon,
          hogy kényelmesen, felesleges görgetés nélkül megtaláljátok a legfontosabb tudnivalókat.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b ${item.gradient} border border-slate-800 ${item.borderHover} shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl border ${item.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">
                  {item.title}
                </h3>

                {/* Subtag */}
                <p className="text-xs font-medium text-sky-400/90 mb-3 font-mono">
                  {item.tag}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-bold text-white group-hover:text-sky-300">
                <span>{item.cta}</span>
                <div className="w-8 h-8 rounded-full bg-slate-800/80 group-hover:bg-sky-500 group-hover:text-white border border-slate-700/80 group-hover:border-sky-400 flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
