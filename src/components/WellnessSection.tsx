"use client";

import React from "react";
import Link from "next/link";
import { Waves, Sparkles, ExternalLink, MapPin, Thermometer } from "lucide-react";
import WellnessMap from "@/components/WellnessMap";

export default function WellnessSection({ isSubpage = false }: { isSubpage?: boolean } = {}) {
  const baths = [
    {
      title: "AquaCity Poprad",
      subtitle: "A Magas-Tátra legnagyobb élmény- és wellness központja",
      location: "Športová 1397/1, Spišská Sobota, 058 01 Poprad, Szlovákia",
      temp: "30 - 38 °C",
      badge: "Közeli & Családi kedvenc",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      description: "13 beltéri és szabadtéri termálmedence, ahonnan közvetlenül látni a havas csúcsokat. Esténként 3D lézershow a Blue Sapphire medencében, valamint hatalmas szaunavilág (Fire & Water).",
      tips: "Online jegyvásárlással vagy előzetes foglalással jelentős összeget lehet spórolni, elkerülve a helyszíni pénztári sorban állást. Gyerekeknek csúszdák és meleg vizű pancsolók állnak rendelkezésre.",
      link: "https://shop.aquacity.sk/en/",
      linkText: "AquaCity Poprad hivatalos webshop & jegyek",
      logo: "https://shop.aquacity.sk/wp-content/uploads/2020/03/logo-aquacity.svg",
    },
    {
      title: "Termy BUKOVINA",
      subtitle: "Közép-Európa egyik legmodernebb alpesi termálfürdője",
      location: "ul. Sportowa 22, 34-530 Bukowina Tatrzańska, Lengyelország (kb. 35 perc)",
      temp: "30 - 38 °C",
      badge: "Prémium Tátrai Wellness",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      description: "20 beltéri és szabadtéri termálmedence (30-38 °C) gyógyvízzel, pezsgőfürdőkkel, hidromasszázzsal, sodrófolyosóval és fenséges kilátással a havas tátrai fenyvesekre a lengyel határon.",
      tips: "A havas téli tájban a kültéri hegyi medencékben fürdőzni felejthetetlen élmény! Érdemes online előre megváltani a belépőjegyeket a hivatalos weboldalon.",
      link: "https://www.termybukovina.pl/en/",
      linkText: "Termy BUKOVINA hivatalos oldal & jegyek",
      logo: "https://babygo.pl/upload/firm/termy-bukovina/Termy%20BUKOVINA.jpg",
    },
    {
      title: "Terma Bania",
      subtitle: "Természetes termálfürdő és aquapark a sípályák lábánál",
      location: "Środkowa 181, 34-405 Białka Tatrzańska, Lengyelország",
      temp: "34 - 38 °C",
      badge: "Élmény & Családi Termálfürdő",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      description: "Białka Tatrzańska hegyi termálkomplexuma modern Hangos Zónával (csúszdák, vízi játszóterek, hullámfürdő) és nyugodt Csendes Zónával (természetes ásványianyag-tartalmú forró termálmedencék, hidromasszázs). A szabadtéri medencékből közvetlen rálátás nyílik a havas hegyoldalakra és a sípályákra.",
      tips: "Közvetlenül a Kotelnica sípályák aljában fekszik, így síelés után azonnal élvezhető a forró gyógyvíz. A belépőjegyeket érdemes előre online megvásárolni a sorban állás elkerülésére.",
      link: "https://www.termabania.pl/en/",
      linkText: "Terma Bania hivatalos weboldal & jegyek",
      logo: "https://www.nadwodospadem.info/files/200/logo_277_x_200_px1_4x3.png",
    },
    {
      title: "Termy Zakopiańskie",
      subtitle: "Panorámás termál- és élményfürdő Zakopane szívében",
      location: "Jagiellońska utca 31, 34-500 Zakopane, Lengyelország",
      temp: "29 - 36 °C",
      badge: "Zakopane Központjában",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      description: "Zakopane legnépszerűbb aquaparkja és termálfürdője, ahonnan lenyűgöző panoráma nyílik a Giewont ikonikus sziklacsúcsára. Kénes gyógyvízzel táplált beltéri és kültéri medencék, vadvízi sodrófolyosó, csúszdák, pezsgőfürdők és prémium szaunavilág gondoskodik a teljes kikapcsolódásról.",
      tips: "Ideális választás zakopanei kirándulás, a Krupówki sétálóutca felkeresése vagy túrázás után, mivel a központtól és a vasútállomástól is percek alatt kényelmesen elérhető.",
      link: "https://www.termy-zakopianskie.pl/",
      linkText: "Termy Zakopiańskie hivatalos honlap & jegyek",
      logo: "https://www.termy-zakopianskie.pl/images/termy-logo-300x107.webp",
    },
  ];

  return (
    <section id="wellness" className={`${isSubpage ? "pt-2 pb-16" : "py-20"} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {bath.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400">{bath.subtitle}</p>
                </div>
                {bath.logo && (
                  <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-slate-200 shrink-0 flex items-center justify-center self-start sm:self-auto min-w-[130px] sm:min-w-[160px] h-16 sm:h-20">
                    <img
                      src={bath.logo}
                      alt={`${bath.title} Logo`}
                      className="h-12 sm:h-14 w-auto max-w-[140px] sm:max-w-[170px] object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start gap-1.5 text-xs text-slate-400 mb-3">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{bath.location}</span>
              </div>

              <p
                lang="hu"
                className="text-sm text-slate-300 leading-relaxed mb-4 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
              >
                {bath.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-4">
                <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Tipp & jótanács:</span>
                </div>
                <p
                  lang="hu"
                  className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  {bath.tips}
                </p>
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

      {/* Interactive Wellness Map showing Villa Greystone and the 4 baths */}
      <WellnessMap />
    </section>
  );
}
