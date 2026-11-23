"use client";

import React from "react";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Clock, 
  Check, 
  AlertCircle, 
  MapPin, 
  Globe, 
  ExternalLink 
} from "lucide-react";

export default function ShoppingSection() {
  const stores = [
    {
      name: "Lidl Poprad",
      type: "Diszkont szupermarket",
      address: "Svitská cesta, 058 01 Poprad, Szlovákia",
      mapsUrl: "https://maps.google.com/maps?rlz=1C1ONGR_huHU1203HU1203&udm&fvr=1&pvq=Cg0vZy8xMWYwa185azg2&vet=10CAAQoqAOahcKEwjwp_K58p6YAxUAAAAAHQAAAAAQHQ..i&cs=1&um=1&ie=UTF-8&fb=1&gl=hu&sa=X&ftid=0x473e3aedaff950d9:0x12ce6f4718ff0b2b",
      websiteUrl: "https://www.lidl.sk/?utm_source=google&utm_medium=organic&utm_campaign=gbp",
      websiteText: "lidl.sk",
      logo: "/pictures/stores/lidl.svg",
      schedule: [
        { day: "csütörtök", hours: "7:00 – 21:00" },
        { day: "péntek", hours: "7:00 – 21:00" },
        { day: "szombat", hours: "7:00 – 21:00" },
        { day: "vasárnap", hours: "8:00 – 20:00" },
      ],
      highlights: "Friss pékáru reggelente, minőségi sajtok, hűsítő üdítők és innivalók a kirándulásokhoz és túrákhoz, mindez a megszokott kedvező árakon.",
    },
    {
      name: "Billa Poprad",
      type: "Minőségi szupermarket",
      address: "Wolklerova 15, 058 01 Poprad, Szlovákia",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Billa,+Wolklerova+15,+058+01+Poprad",
      websiteUrl: "https://www.billa.sk/",
      websiteText: "billa.sk",
      logo: "/pictures/stores/billa.png",
      schedule: [
        { day: "csütörtök", hours: "7:00 – 21:00" },
        { day: "péntek", hours: "7:00 – 21:00" },
        { day: "szombat", hours: "7:00 – 21:00" },
        { day: "vasárnap", hours: "8:00 – 20:00" },
      ],
      highlights: "A legnagyobb helyi sajtválaszték: eredeti juhtúró (bryndza), fonott korbáčik, parenica, valamint prémium élelmiszerek és tátrai finomságok.",
    },
    {
      name: "Kaufland Poprad",
      type: "Hatalmas hipermarket",
      address: "Jiřího Wolkera, 058 01 Poprad, Szlovákia",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kaufland,+Ji%C5%99%C3%ADho+Wolkera,+058+01+Poprad",
      websiteUrl: "https://predajne.kaufland.sk/?cid=SK%3Aloc%3Auberall_1681739587865",
      websiteText: "kaufland.sk",
      logo: "/pictures/stores/kaufland.svg",
      schedule: [
        { day: "csütörtök", hours: "7:00 – 21:00" },
        { day: "péntek", hours: "7:00 – 21:00" },
        { day: "szombat", hours: "7:00 – 21:00" },
        { day: "vasárnap", hours: "8:00 – 20:00" },
      ],
      highlights: "Minden egyetlen helyen a nagy bevásárláshoz: üdítők, pékáruk, húsfélék, játékok és tisztálkodási szerek rendkívül bőséges választékban.",
    },
    {
      name: "Tátrai Helyi Kisboltok",
      type: "Potraviny csemegeboltok",
      address: "Ótátrafüred, Tátralomnic, hegyi falvak",
      open: "Jellemzően 07:30 - 18:00",
      highlights: "Közeli gyors megoldás, ha a hegyek lábánál hirtelen elfogyna a friss kenyér, a tej vagy egy üveg ásványvíz, és nem mennénk be Poprádra.",
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
              {/* Logo & Store Header (Logo and Name are links, Website link in same line) */}
              <div className="flex items-center gap-3 mb-2.5">
                {store.websiteUrl ? (
                  <a
                    href={store.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 transition-transform hover:scale-105"
                    title={`${store.name} hivatalos honlapja`}
                  >
                    {store.logo ? (
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-white/5 p-1 flex items-center justify-center shadow-md hover:border-emerald-400/50 transition-colors">
                        <img
                          src={store.logo}
                          alt={`${store.name} logó`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-md">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-md">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {store.websiteUrl ? (
                      <a
                        href={store.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-white hover:text-emerald-400 transition-colors"
                        title={`${store.name} hivatalos honlapja`}
                      >
                        {store.name}
                      </a>
                    ) : (
                      <h3 className="text-lg font-bold text-white leading-tight">{store.name}</h3>
                    )}

                    {store.websiteUrl && (
                      <a
                        href={store.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/20"
                        title={`${store.name} honlapja (${store.websiteText})`}
                      >
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span>{store.websiteText || "Honlap"}</span>
                        <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{store.type}</p>
                </div>
              </div>

              {/* 2-line Address & Google Maps link */}
              <div className="mb-3 text-xs">
                {store.mapsUrl ? (
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-colors"
                    title={`${store.name} megnyitása Google Térképen`}
                  >
                    {/* 1st line: Address */}
                    <div className="flex items-start gap-1.5 leading-snug text-slate-300 group-hover:text-slate-100">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="font-normal">{store.address}</span>
                    </div>
                    {/* 2nd line: Google Térkép link */}
                    <div className="pl-5 mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 group-hover:text-sky-300 group-hover:underline">
                      <span>(Google Térkép)</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-1.5 leading-snug text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                )}
              </div>

              {/* Highlights text - full width, justified, hyphenated */}
              <p
                lang="hu"
                className="text-xs text-slate-300 leading-relaxed mb-4 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
              >
                {store.highlights}
              </p>
            </div>

            {/* Opening Hours Footer - vertically stacked days so hours fit cleanly */}
            {store.schedule ? (
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Nyitvatartás:</span>
                </div>
                <div className="flex flex-col space-y-1.5 text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                  {store.schedule.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between gap-2">
                      <span className="text-slate-400 capitalize">{s.day}:</span>
                      <span className="text-white font-mono font-medium">{s.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Nyitvatartás:</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  <span>{store.open}</span>
                </div>
              </div>
            )}
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

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-amber-500/20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Tudtad? Nyitvatartás & Fizetés
            </h4>
          </div>
          <p
            lang="hu"
            className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
          >
            Szlovákiában a legtöbb szupermarket vasárnap is nyitva tart, így nem gond, ha a hétvégi érkezés után kell megvenni a reggelinek valót vagy a finomságokat. A boltokban természetesen működik a magyar bankkártya (Mastercard, Visa, Revolut) érintéses fizetéssel.
          </p>
        </div>
      </div>
    </section>
  );
}
