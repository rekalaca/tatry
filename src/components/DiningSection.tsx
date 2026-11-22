"use client";

import React from "react";
import { Utensils, FileText, Download, Flame, Star, Coffee, Heart, MapPin, ExternalLink } from "lucide-react";

export default function DiningSection({ isSubpage = false }: { isSubpage?: boolean } = {}) {
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
    <section id="gasztro" className={`${isSubpage ? "pt-2 pb-16" : "py-20"} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Gasztronómia &{" "}
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Koliba Élmény
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Faház éttermek, pattogó kandallótűz, forró fokhagymaleves cipóban és a kihagyhatatlan juhtúrós sztrapacska.
        </p>
      </div>

      {/* Featured Restaurant Card: Koliba Tatry */}
      <div className="glass-panel-warm p-6 sm:p-8 rounded-3xl mb-14 border border-amber-500/30 shadow-2xl relative overflow-hidden glow-warm">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Közvetlenül a Villa Greystone mellett • Ingyenes Házhoz Szállítás</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Koliba Tatry Tradicionális Étterem
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Különleges kényelem, hogy az autentikus tátrai rönkfa étterem <strong>mindössze néhány lépésre fekszik a Villa Greystone apartmanunktól</strong>. Fatüzelésű kandalló, juhtúrós finomságok, ropogós csülök és forró ételek várnak.
            </p>
            <div className="p-3.5 sm:p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 mb-6">
              <div className="flex items-center gap-2 mb-1.5 text-amber-300 font-bold text-xs sm:text-sm">
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

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {/* Magyar étlap */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 p-0.5 rounded-xl shadow-lg shadow-amber-500/20">
                <a
                  href="/docs/Koliba_Tatry_etlap_magyar.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-950 hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  <span>🇭🇺 Magyar étlap (PDF)</span>
                </a>
                <a
                  href="/docs/Koliba_Tatry_etlap_magyar.pdf"
                  download="Koliba_Tatry_etlap_magyar.pdf"
                  title="Magyar étlap letöltése"
                  className="p-2.5 text-slate-950 hover:bg-black/10 rounded-lg transition-colors flex items-center"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>

              {/* Szlovák eredeti étlap */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 p-0.5 rounded-xl transition-all">
                <a
                  href="/docs/Koliba_Tatry_etterem.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 font-semibold text-xs sm:text-sm text-amber-200 hover:text-white transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>🇸🇰 Eredeti szlovák étlap (PDF)</span>
                </a>
                <a
                  href="/docs/Koliba_Tatry_etterem.pdf"
                  download="Koliba_Tatry_etterem.pdf"
                  title="Eredeti étlap letöltése"
                  className="p-2.5 text-amber-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Info Box on Right */}
          <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-5 sm:p-6 lg:min-w-[300px]">
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Amit mindenképp kóstolj meg:</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
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
        </div>
      </div>

      {/* Featured Restaurant Card 2: Manuel Caffé & Bistro Italiano */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-14 border border-rose-500/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-rose-950/20">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
                <span>🇮🇹 Autentikus Olasz Vezetés & Konyha</span>
              </span>
              <span className="text-slate-400">• Horný Smokovec (Ótátrafüred)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Manuel Caffé & Bistro Italiano
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              A Magas-Tátra szívében működő, valódi <strong>olasz vezetéssel irányított kávézó és bisztró</strong>. Egyszerre autentikus olasz kávézó, minőségi pizzéria, borbár, valamint bőséges reggeliző- és ebédlőhely kirándulóknak és a családnak.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-6 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Pontos cím:</strong> Horný Smokovec 20, 062 01 Vysoké Tatry (Ótátrafüred / Felsőtátrafüred, Szlovákia • TEŽ villamossal vagy autóval 4 perc a Villa Greystone-tól)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-rose-300 font-medium text-xs pt-1">
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

            {/* Action Buttons: Facebook & Google Maps */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/ManuelCaffeTatry/?locale=hu_HU"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Manuel Caffé Facebook oldal</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://maps.google.com/?q=Manuel+Caffe+Bistro+Italiano+Horny+Smokovec+20"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Google Térkép</span>
              </a>
            </div>
          </div>

          {/* Quick Menu Highlights on Right */}
          <div className="bg-slate-950/85 border border-rose-500/20 rounded-2xl p-5 sm:p-6 lg:min-w-[310px]">
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-sans">
              <Star className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Kínálat & Specialitások:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Kávék:</strong> Eredeti olasz eszpresszó és barista kávékülönlegességek</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Pizza & Focaccia:</strong> Friss kemencés tészták, ropogós olasz focaccia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Tészták:</strong> Házi lasagne, spaghetti és tradicionális olasz szószok</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Levesek & Saláták:</strong> Napi meleg levesek, vegetáriánus és vegán ételek</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Desszertek:</strong> Tiramisù, profiterole és ropogós szicíliai cannolo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Borbár:</strong> Minőségi olasz borok, prosecco és jeges Aperol Spritz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Traditional Dishes Cards */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-amber-400" />
        <span>Kihagyhatatlan tátrai kedvencek</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition-all hover:-translate-y-1"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
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

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
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

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
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
    </section>
  );
}
