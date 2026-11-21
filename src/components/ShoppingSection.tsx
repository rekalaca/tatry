"use client";

import React from "react";
import { ShoppingBag, ShoppingCart, Clock, Check, HeartHandshake, AlertCircle } from "lucide-react";

export default function ShoppingSection() {
  const stores = [
    {
      name: "Lidl Poprad",
      type: "Diszkont szupermarket",
      address: "Poprad (Svitská cesta & Štefánikova)",
      open: "H - Szo: 07:00 - 21:00, Vas: 08:00 - 20:00",
      highlights: "Friss pékáru reggelente, gyümölcsök, kiváló árak túra-szendvicsekhez és esti főzéshez.",
      badge: "Legjobb ár",
    },
    {
      name: "Billa Poprad",
      type: "Minőségi élelmiszerüzlet",
      address: "Poprad belváros & Állomás közelében",
      open: "H - Szo: 07:00 - 21:00, Vas: 08:00 - 20:00",
      highlights: "A legnagyobb helyi sajtválaszték: eredeti juhtúró (bryndza), fonott korbáčik, teljes Tatratea kollekció díszdobozban.",
      badge: "Sajtok & Szuvenír",
    },
    {
      name: "Kaufland Poprad",
      type: "Hatalmas hipermarket",
      address: "Moyzesova ulica, Poprad",
      open: "H - Szo: 07:00 - 21:00, Vas: 08:00 - 20:00",
      highlights: "Minden egy helyen a nagy családi bevásárláshoz: italok, húsok, pékáru, játékok, tisztálkodási szerek.",
      badge: "Nagybevásárlás",
    },
    {
      name: "Tátrai Helyi Kisboltok (Potraviny)",
      type: "Környékbeli csemegeboltok",
      address: "Ótátrafüred, Tátralomnic, hegyi falvak",
      open: "Jellemzően 07:30 - 18:00",
      highlights: "Ha hirtelen elfogy a kenyér, tej vagy egy üveg ásványvíz, nem kell bemenni Poprádra.",
      badge: "Gyors opció",
    },
  ];

  const souvenirs = [
    { name: "Korbáčik & Parenica", desc: "Hagyományos szlovák kézműves sajtok (füstölt és sós lében eltett)" },
    { name: "Tatratea gyógynövénylikőr", desc: "52%-os Original, 62% Forest Fruit vagy 32% Citrus díszüvegben" },
    { name: "Horalky és Mila ostyák", desc: "A kötelező tátrai mogyorókrémes túra-csoki" },
    { name: "Bryndza (Juhtúró)", desc: "Friss, krémes fa dézsás juhtúró az otthoni sztrapacskához" },
  ];

  return (
    <section id="boltok" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Boltok & Bevásárlás</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Szupermarketek &{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
            Helyi Finomságok
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Hol intézzük a reggelinek valót, hol találjuk a legjobb sajtokat, és mit érdemes hazahozni ajándékba.
        </p>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stores.map((store, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3 inline-block">
                {store.badge}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{store.name}</h3>
              <p className="text-xs text-slate-400 mb-2">{store.type}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{store.highlights}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{store.open}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Souvenirs & Treats Highlight */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-emerald-400" />
          <span>Mit hozzunk haza a tátrai bevásárlásból?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {souvenirs.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
                <Check className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              <p className="text-xs text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-300">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Tudtad? </strong>
            Szlovákiában a legtöbb szupermarket vasárnap is nyitva tart, így nem gond, ha a hétvégi érkezés után kell megvenni a vacsorának valót. A boltokban természetesen működik a magyar bankkártya (Mastercard, Visa, Revolut) érintéses fizetéssel.
          </div>
        </div>
      </div>
    </section>
  );
}
