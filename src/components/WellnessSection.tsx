"use client";

import React from "react";
import Link from "next/link";
import { Waves, Sparkles, ExternalLink, MapPin, Thermometer, ShieldCheck } from "lucide-react";

export default function WellnessSection() {
  const baths = [
    {
      title: "AquaCity Poprad",
      subtitle: "A Magas-Tátra legnagyobb élmény- és wellness központja",
      location: "Poprád belváros",
      temp: "30 - 38 °C",
      badge: "Közeli & Családi kedvenc",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      description: "13 beltéri és szabadtéri termálmedence, ahonnan közvetlenül látni a havas csúcsokat. Esténként 3D lézershow a Blue Sapphire medencében, valamint hatalmas szaunavilág (Fire & Water).",
      tips: "Online jegyvásárlással vagy délutáni belépővel jelentős összeget lehet spórolni. Gyerekeknek csúszdák és meleg vizű pancsolók.",
      link: "https://aquacity.sk/hu/",
      linkText: "AquaCity Poprad honlap",
    },
    {
      title: "Thermal Park Vrbov (Ménhárd)",
      subtitle: "Autentikus forró gyógyvíz a hóesésben",
      location: "Vrbov (Poprádtól 15 perc)",
      temp: "32 - 38 °C",
      badge: "Kiváló ár-érték & Pihenés",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      description: "Természetes kénes-ásványianyagos gyógyforrás. Télen a gőzölgő forró szabadtéri medencékben ülni, miközben körülötted hullik a hó, felejthetetlen relaxáció egy túranap után.",
      tips: "Sokkal csendesebb és kedvezőbb árú, mint a nagy aquaparkok. Készpénz vagy bankkártya egyaránt működik.",
      link: "https://www.termalnekupalisko.com/",
      linkText: "Thermal Park Vrbov infók",
    },
    {
      title: "Tatralandia Aquapark",
      subtitle: "Trópusi paradicsom igazi pálmafákkal",
      location: "Liptovský Mikuláš (kb. 45 perc autóval)",
      temp: "30 - 36 °C",
      badge: "Trópusi kaland",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      description: "Ha egy napra a trópusokra vágynátok: fedett Tropical Paradise valódi tengeri korallokkal és halakkal, beltéri szörfmedence és melegvizes élménymedencék.",
      tips: "Gopass regisztrációval olcsóbbak a belépőjegyek. Kiváló egész napos program hóvihar vagy túl hideg idő esetén.",
      link: "https://www.tatralandia.sk/hu/",
      linkText: "Tatralandia hivatalos oldal",
    },
    {
      title: "Termy BUKOVINA",
      subtitle: "Közép-Európa egyik legmodernebb tátrai élményfürdője",
      location: "Bukowina Tatrzańska (Lengyelország, kb. 35 perc)",
      temp: "30 - 38 °C",
      badge: "Prémium Tátrai Wellness",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      description: "20 beltéri és szabadtéri termálmedence (30-38 °C) gyógyvízzel, pezsgőfürdőkkel, hidromasszázzsal, sodrófolyosóval és fenséges kilátással a havas tátrai fenyvesekre a lengyel határon.",
      tips: "A havas téli tájban a kültéri hegyi medencékben fürdőzni felejthetetlen élmény! Érdemes online előre megváltani a belépőjegyeket a hivatalos weboldalon.",
      link: "https://www.termybukovina.pl/en/",
      linkText: "Termy BUKOVINA hivatalos oldal",
    },
  ];

  return (
    <section id="wellness" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
          <Waves className="w-3.5 h-3.5" />
          <span>Forró Termálvíz a Hófödte Tájban</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Fürdők &{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
            Wellness Pihenés
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Nincs jobb dolog egy egész napos havas túra vagy síelés után, mint a 38 fokos gőzölgő medencékben kipihenni a fáradalmakat.
        </p>
      </div>

      {/* In-House Wellness Card: Villa Greystone */}
      <div className="glass-panel-warm p-6 sm:p-8 rounded-3xl border border-cyan-500/30 mb-12 shadow-2xl relative overflow-hidden glow-warm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Privát Helyszíni Relaxáció • Házon belül a Villa Greystone-ban</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Villa Greystone Privát Szauna & Jacuzzi Részleg
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Nem szükséges elhagynotok az épületet a fagyos téli napokon: a Villa Greystone saját wellness zónájában forró köves <strong>finn szauna</strong> és meleg vizű <strong>hidromasszázs pezsgőfürdő (jacuzzi)</strong> vár. A pezsgőfürdőt <em>privát idősávban</em> vehetitek igénybe, így kizárólag a ti családotok lazíthat a forró vízben!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <strong className="text-cyan-300 block mb-0.5">🧖‍♂️ Finn Szauna:</strong>
                Klasszikus forró kövekkel, kérésre a kívánt órára felfűtve méregtelenítéshez és izomlazításhoz.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <strong className="text-cyan-300 block mb-0.5">🛁 Privát Jacuzzi:</strong>
                Kellemes meleg vizű masszázsmedence, zavartalan családi relaxációhoz zárt idősávban.
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20 shrink-0 text-center lg:min-w-[240px]">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
              Házigazda egyeztetés
            </span>
            <div className="text-xl font-bold text-white mb-1">Rado Menedzser</div>
            <p className="text-xs text-slate-400 mb-3">Wellness-csomagok & idősáv egyeztetés érkezéskor</p>
            <a
              href="tel:+421915966745"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 transition-all"
            >
              <span>+421 915 966 745</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Közeli Nagy Termálfürdők & Aquaparkok
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Ha egész napos vízi élményre vagy természetes kénes gyógyfürdőre vágytok a Tátra vidékén:
        </p>
      </div>

      {/* Baths Grid (2-2 layout on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {baths.map((bath, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-sky-500/15 hover:border-cyan-400/40 transition-all flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${bath.badgeColor}`}>
                  {bath.badge}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-300">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{bath.temp}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {bath.title}
              </h3>
              <p className="text-xs font-medium text-cyan-400 mb-2">{bath.subtitle}</p>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{bath.location}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {bath.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-4">
                <strong className="text-cyan-300 font-semibold">Tipp: </strong>
                <span>{bath.tips}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={bath.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
              >
                <span>{bath.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Wellness Checklist Box */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white mb-1">Fürdőzéshez készített praktikus tanácsok</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mindenképp legyen a kocsiban fejenként legalább egy fürdőruha, fürdőlepedő/törölköző és vízálló strandpapucs. Vrbovban a kénes gyógyvíz miatt az ezüst ékszereket érdemes előre levenni!
            </p>
          </div>
        </div>

        <Link
          href="/csomagolas"
          className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 transition-all"
        >
          Fürdős holmik a csomagolási listában
        </Link>
      </div>
    </section>
  );
}
