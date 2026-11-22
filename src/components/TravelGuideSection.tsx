"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Info, 
  Car, 
  ShieldAlert, 
  CreditCard, 
  PhoneCall, 
  HelpCircle, 
  ChevronDown, 
  ExternalLink,
  AlertTriangle,
  FileCheck,
  Train,
  ArrowRight,
  Compass
} from "lucide-react";

export default function TravelGuideSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const rules = [
    {
      title: "Szlovák Autópálya Matrica",
      desc: "Csak a hivatalos eznamka.sk oldalon vásárold meg! A 10 napos e-matrica személyautóra (3,5t-ig) kb. 12 €. Nem kell ragasztani, rendszám alapján rögzül.",
      link: "https://eznamka.sk/hu",
      linkText: "Hivatalos Eznamka.sk vásárlás",
    },
    {
      title: "Téli Autófelszerelés",
      desc: "Téli gumi kötelező, ha havas/jeges az út (min. 3 mm profilmélység). Hóláncot tegyél a csomagtartóba! Téli szélvédőmosó (-25°C), jégkaparó, jégoldó és pléd.",
    },
    {
      title: "Láthatósági Mellény az utastérben",
      desc: "Nagyon szigorúan ellenőrzik: minden utasnak kell láthatósági mellény, és kötelező az utastérben elérhető helyen tartani (nem a csomagtartó alján!).",
    },
    {
      title: "Zéró Alkohol Tolerancia (0,00 ‰)",
      desc: "Szlovákiában a véralkohol megengedett értéke 0,0 ezrelék! Vezetés előtt/alatt még egy korty sört sem szabad inni. Tompított fényszóró nappal is kötelező.",
    },
  ];

  const emergencyNumbers = [
    { name: "Általános segélyhívó", num: "112", desc: "Európai egységes segélyhívó szám" },
    { name: "Hegyi Mentőszolgálat (HZS)", num: "18 300", desc: "Hegyimentők direkt riasztása baj esetén" },
    { name: "Mentők", num: "155", desc: "Orvosi sürgősségi ellátás" },
    { name: "Rendőrség", num: "158", desc: "Közúti és általános segítség" },
  ];

  const faqs = [
    {
      q: "Hogyan jutunk el a Villa Greystone apartmanhoz és mik a bejelentkezés tudnivalói?",
      a: "A Villa Greystone címe: Zakladateľov 387, 059 86 Nová Lesná (Alsóerdőfalva). Bejelentkezés (Check-in) 14:00 és 22:00 között lehetséges; a várható érkezési időt előre jelezni kell a házigazdának, Radónak (+421 915 966 745). Kijelentkezés 08:00 és 10:00 között. A szállás előtt ingyenes privát parkoló van. Kiemelten fontos: a szálláshely kizárólag bankkártyát fogad el, készpénzes fizetésre nincs lehetőség!",
    },
    {
      q: "Mit jelent a Tátrai Villamos (TEŽ) és milyen messze van a megállója a villától?",
      a: "A Tátrai Elektromos Vasút (Tatranské elektrické železnice) modern, tiszta, fűtött panorámavonat. A legközelebbi megálló, a Pod lesom vasútállomás kb. 900 méterre (10-12 perc séta) van a Villa Greystone-tól! A 24 órás hálózati jegy (felnőtt: 6 €, diák/gyerek: 4 €) lehetővé teszi, hogy Ótátrafüredre, Poprádra vagy a Csorba-tóra kényelmesen, a téli hegyi parkolási díjak és hóláncozás nélkül jussatok el. Részletes menetrend és élő vonattérkép a Közlekedés aloldalunkon található!",
    },
    {
      q: "Szükséges külön hegyimentő biztosítást kötni?",
      a: "IGEN, kifejezetten ajánlott! Szlovákiában a Horská záchranná služba (HZS) általi hegyi mentés és kutatás díjköteles, és nem fedezi az Európai Egészségbiztosítási Kártya (EHIC). Utasbiztosítás megkötésekor győződj meg róla, hogy a hegyimentésre (és síelésre, ha síelsz) is érvényes a kötvény.",
    },
    {
      q: "Milyen útvonalon a legkényelmesebb eljutni a Tátra szlovákiai részére?",
      a: "Budapest felől az M2/Parassapuszta ➡️ Zólyom (Zvolen) ➡️ Besztercebánya (Banská Bystrica) ➡️ D1-es autópálya Poprád irányába a leggyorsabb és legjobban takarított útvonal. A szlovák autópálya matricával kényelmesen és folyamatosan lehet haladni.",
    },
    {
      q: "Mennyire fogadnak el bankkártyát a hegyekben és a szálláson?",
      a: "Szlovákiában az Euró (€) a hivatalos fizetőeszköz. A Villa Greystone-ban KIZÁRÓLAG bankkártyás fizetés lehetséges. A szupermarketekben, felvonópénztárakban, fürdőkben és nagyobb éttermekben mindenhol működik az érintésmentes kártya (telefon, Apple/Google Pay). Kisebb erdei menedékházakban vagy vásári bódéknál azért érdemes némi euró készpénzt is magatoknál tartani.",
    },
  ];

  return (
    <section id="hasznos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-3">
          <Info className="w-3.5 h-3.5" />
          <span>Autós Kisokos & Szabályok</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Hasznos Információk &{" "}
          <span className="bg-gradient-to-r from-sky-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">
            Tudnivalók
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Minden fontos szabály a biztonságos és büntetésmentes szlovákiai utazáshoz: matrica, kötelező felszerelések és hegyi segélyhívók.
        </p>
      </div>

      {/* Prominent Transport Gateway Banner */}
      <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-sky-950/80 via-slate-900/90 to-amber-950/70 border border-sky-400/40 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-lg shrink-0">
                <Train className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 text-[10px] font-bold uppercase tracking-wider mb-0.5 border border-sky-400/30">
                  Különálló Aloldal
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  Tátrai Villamos (TEŽ) & Teljes Közlekedési Kalauz
                </h3>
              </div>
            </div>
            <p
              lang="hu"
              className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              Interaktív élő vonattérkép valós idejű szerelvénykövetéssel, teljes 183 és 184-es menetrend táblázatokkal,
              jegyárakkal, a <strong>Pod lesom állomás (900m)</strong> sétaútvonalával és parkolási kalauzzal!
            </p>
          </div>

          <Link
            href="/kozlekedes"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <span>Közlekedés megnyitása</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-sky-500/15 hover:border-sky-400/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{rule.title}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{rule.desc}</p>
            </div>

            {rule.link && (
              <a
                href={rule.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-white transition-colors"
              >
                <span>{rule.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Emergency Contacts Banner */}
      <div className="glass-panel-warm p-6 sm:p-8 rounded-3xl border border-amber-500/30 mb-14 glow-warm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Fontos Szlovákiai Segélyhívó Telefonszámok
            </h3>
            <p className="text-xs text-slate-300">
              Mentsd el őket a telefonodba már indulás előtt!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyNumbers.map((em, idx) => (
            <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-2xl font-black text-amber-400 block mb-1">{em.num}</span>
              <p className="text-sm font-bold text-white mb-0.5">{em.name}</p>
              <p className="text-xs text-slate-400">{em.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <span>Gyakori Kérdések & Válaszok (GYIK)</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-sky-300 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
