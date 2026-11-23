import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import KozlekedesVideoModal from "@/components/KozlekedesVideoModal";
import TezOverviewSection from "@/components/TezOverviewSection";
import TezLiveMap from "@/components/TezLiveMap";
import TezTimetable from "@/components/TezTimetable";
import {
  Train,
  Car,
  Ticket,
  MapPin,
  Clock,
  Compass,
  ExternalLink,
  ShieldAlert,
  PhoneCall,
  Smartphone,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Közlekedés a Magas-Tátrában • Tátrai Villamos (TEŽ)",
  description:
    "Részletes tátrai közlekedési kalauz: Tátrai Villamosvasút (TEŽ) élő menetrendi térképpel, 183 és 184-es vonalak menetrendjével, jegyárakkal és autós kisokossal a Villa Greystone vendégei számára.",
};

export default function KozlekedesPage() {
  const ticketTypes = [
    {
      title: "Egyszeri Vonaljegy",
      price: "4 €",
      discountPrice: "3 € (diák / 6–16 év)",
      seniorPrice: "0,50 € (70 év felett)",
      desc: "Egységes ár a teljes vonalon. Egyetlen útra érvényes átszállás nélkül.",
      badge: "Alapjegy",
      highlight: false,
    },
    {
      title: "24 Órás Hálózati Jegy",
      price: "6 €",
      discountPrice: "4 € (diák / 6–16 év)",
      seniorPrice: "Ingyenes 6 év alatt",
      desc: "Korlátlan utazás 24 órán át a teljes TEŽ hálózaton és a Csorba–Csorbató fogaskerekűn (OŽ) is!",
      badge: "★ Legjobb vétel!",
      highlight: true,
    },
    {
      title: "3 Napos Hálózati Jegy",
      price: "12 €",
      discountPrice: "8 € (diák / 6–16 év)",
      seniorPrice: "Ingyenes 6 év alatt",
      desc: "Ideális egy hosszú hétvégére vagy 3 aktív kirándulós napra a Magas-Tátrában.",
      badge: "Hétvégi bérlet",
      highlight: false,
    },
    {
      title: "Heti Hálózati Jegy (7 nap)",
      price: "16 €",
      discountPrice: "9 € (diák / 6–16 év)",
      seniorPrice: "Ingyenes 6 év alatt",
      desc: "Egy teljes hétre szóló korlátlan tátrai villamos- és fogaskerekű-használat.",
      badge: "Nyaralóknak",
      highlight: false,
    },
  ];

  const drivingRules = [
    {
      title: "Szlovák Autópálya Matrica (e-Matrica)",
      desc: "Kizárólag a hivatalos eznamka.sk felületen vagy az Eznamka mobilappban vásárold meg! A 10 napos matrica személygépkocsira kb. 12 €. Nincs szélvédőre ragasztás, rendszám alapján automatikus kamerás ellenőrzés van.",
      link: "https://eznamka.sk/hu",
      linkText: "Hivatalos Eznamka.sk vásárlás ➔",
    },
    {
      title: "Téli Autófelszerelés és Hólánc",
      desc: "Téli gumi kötelező, ha az utat hó vagy jég borítja (min. 3 mm mélység). Hóláncot kötelező a csomagtartóban tartani hegyi szakaszokon! Javasolt felszerelések: -25°C-os téli szélvédőmosó, jégkaparó, jégoldó spray és meleg pléd.",
    },
    {
      title: "Láthatósági Mellény az Utastérben",
      desc: "Szigorúan büntetik: a jármű minden utasának rendelkeznie kell fényvisszaverő mellénnyel, amelyet az utastérben, közvetlenül kéznél kell tartani (kesztyűtartó vagy ajtózseb), NEM a csomagtartó mélyén!",
    },
    {
      title: "Zéró Alkohol Tolerancia (0,00 ‰)",
      desc: "Szlovákiában 0,00 ezrelék a megengedett véralkoholszint! Vezetés előtt és alatt még a legkisebb pohár sör fogyasztása is szigorúan tilos. Tompított fényszóró használata lakott területen belül és kívül nappal is kötelező.",
    },
  ];

  const parkingTips = [
    {
      location: "Ótátrafüred (Starý Smokovec)",
      price: "kb. 10 – 15 € / nap",
      desc: "A Hrebienok (Tarajka) felvonó alsó állomásánál és a központban fizetős nagy parkolók vannak. Téli főszezonban és hétvégén már 9 órára megtelnek.",
      alt: "Tipp: Menjetek Pod lesomról TEŽ villamossal, 10 perc és nincs parkolási díj!",
    },
    {
      location: "Tátralomnic (Tatranská Lomnica)",
      price: "Sízőknek ingyenes (GOPASS) / 10 €",
      desc: "A kabinos felvonó parkolói a síelőknek érvényes síbérlettel díjmentesek, egyéb látogatóknak fizetősek.",
      alt: "TEŽ villamossal átszállással Ótátrafüredről könnyen elérhető.",
    },
    {
      location: "Csorba-tó (Štrbské Pleso)",
      price: "kb. 10 – 15 € / nap",
      desc: "Központi parkoló a vasútállomás mellett. A hegyi tóhoz és síugrósánchoz vezető utak csúcsidőben lezárásra kerülhetnek.",
      alt: "A TEŽ villamos közvetlenül a Csorba-tó központjába érkezik, kényelmes és panorámás!",
    },
  ];

  const emergencyNumbers = [
    { name: "Egységes segélyhívó", num: "112", desc: "Általános európai vészhelyzeti szám" },
    { name: "Hegyi Mentőszolgálat (HZS)", num: "18 300", desc: "Hegyimentők direkt riasztása túrán" },
    { name: "Orvosi Mentők", num: "155", desc: "Sürgősségi egészségügyi segítség" },
    { name: "Rendőrség", num: "158", desc: "Közúti baleset és segítség" },
  ];

  return (
    <main className="min-h-screen relative selection:bg-sky-500 selection:text-white pb-16">
      {/* Intro Tatranská Električka Reel video (muted, auto-plays on navigation, auto-closes on end or via X) */}
      <KozlekedesVideoModal />

      {/* Falling snow particles */}
      <SnowEffect />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Title: 2 lines, line 2 "Magas-Tátrában" in one piece with plenty of descender room */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
            <span className="block mb-1">Közlekedés a</span>
            <span className="inline-block whitespace-nowrap bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300 bg-clip-text text-transparent pt-1 pb-4 leading-[1.25]">
              Magas-Tátrában
            </span>
          </h1>
        </div>

        {/* Highlight Banner: Villa Greystone & Pod lesom connection */}
        <div className="max-w-3xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-sky-500/15 to-emerald-500/20 border border-amber-400/40 shadow-xl">
          <h2 className="text-base sm:text-lg font-bold text-white text-center mb-3 font-sans">
            Villa Greystone & Pod lesom vasútállomás kapcsolata
          </h2>
          <p
            lang="hu"
            className="text-xs sm:text-sm text-slate-200 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mb-4"
          >
            A szállásunktól alig <strong>10–12 perc könnyű séta</strong> a Pod lesom vasúti megálló.
            Nem kell a jeges hegyi utakon autózni, hóláncolni és 15 €-s parkolódíjakat fizetni:
            a fűtött, panorámaablakos villamos közvetlenül elvisz Ótátrafüredre, Poprádra vagy a Csorba-tóhoz!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-semibold">
              900 méter
            </span>
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Zakladate%C4%BEov+387,+059+86+Nov%C3%A1+Lesn%C3%A1&destination=Zelezni%C4%8Dn%C3%A1+stanica+Pod+Lesom,+Nov%C3%A1+Lesn%C3%A1&travelmode=walking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/25 transition-all"
            >
              Sétaútvonal (Google Maps)
            </a>
          </div>
        </div>

        {/* Quick Jump Buttons: Larger, rectangular glassmorphism buttons with subtle border & clear click affordance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          <a
            href="#elo-terkep"
            className="group relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-slate-900/70 hover:bg-slate-800/80 border border-sky-500/20 hover:border-sky-400/60 shadow-lg shadow-black/40 hover:shadow-sky-500/15 transition-all duration-300 hover:-translate-y-1 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/30 group-hover:bg-sky-500/25 transition-colors shrink-0">
                <Compass className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors block">
                  Élő Vonattérkép
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Mozgó járatok & idővonal</span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/80 group-hover:border-sky-400/50 group-hover:bg-sky-500/20 flex items-center justify-center text-slate-400 group-hover:text-sky-300 transition-all shrink-0 ml-2">
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

          <a
            href="#menetrendek"
            className="group relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-slate-900/70 hover:bg-slate-800/80 border border-amber-500/20 hover:border-amber-400/60 shadow-lg shadow-black/40 hover:shadow-amber-500/15 transition-all duration-300 hover:-translate-y-1 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 group-hover:bg-amber-500/25 transition-colors shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors block">
                  183 & 184 Menetrend
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Poprád, Smokovec, Csorba-tó</span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/80 group-hover:border-amber-400/50 group-hover:bg-amber-500/20 flex items-center justify-center text-slate-400 group-hover:text-amber-300 transition-all shrink-0 ml-2">
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

          <a
            href="#jegyarak"
            className="group relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-slate-900/70 hover:bg-slate-800/80 border border-emerald-500/20 hover:border-emerald-400/60 shadow-lg shadow-black/40 hover:shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-1 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 group-hover:bg-emerald-500/25 transition-colors shrink-0">
                <Ticket className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors block">
                  Jegyárak & Vásárlás
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">24h bérlet & mobilapp</span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/80 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/20 flex items-center justify-center text-slate-400 group-hover:text-emerald-300 transition-all shrink-0 ml-2">
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>

          <a
            href="#autos-kisokos"
            className="group relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-slate-900/70 hover:bg-slate-800/80 border border-rose-500/20 hover:border-rose-400/60 shadow-lg shadow-black/40 hover:shadow-rose-500/15 transition-all duration-300 hover:-translate-y-1 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-400/30 group-hover:bg-rose-500/25 transition-colors shrink-0">
                <Car className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-rose-300 transition-colors block">
                  Autós Szabályok
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">e-Matrica & KRESZ</span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/80 group-hover:border-rose-400/50 group-hover:bg-rose-500/20 flex items-center justify-center text-slate-400 group-hover:text-rose-300 transition-all shrink-0 ml-2">
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: About TEŽ Overview with Click-to-Enlarge Lightbox */}
        <TezOverviewSection />

        {/* Section 2: Live Animated SVG Route Map & Train Tracker */}
        <section id="elo-terkep">
          <TezLiveMap />
        </section>

        {/* Section 3: Interactive Timetables */}
        <section id="menetrendek">
          <TezTimetable />
        </section>

        {/* Section 4: Ticket Pricing & How to Buy Guide */}
        <section id="jegyarak" className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
              <Ticket className="w-3.5 h-3.5" />
              <span>Díjszabás & Jegyvásárlás</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              TEŽ Jegyárak & Hálózati Bérletek
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              A ZSSK 2025/2026-os díjszabása alapján. A 24 órás hálózati jegy már napi két utazással megtérül,
              és a fogaskerekűre is érvényes!
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {ticketTypes.map((t, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                  t.highlight
                    ? "bg-gradient-to-b from-sky-900/40 via-slate-900/80 to-slate-950 border-sky-400/60 shadow-xl shadow-sky-500/15 ring-1 ring-sky-400/30"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.highlight
                          ? "bg-amber-400 text-slate-950 font-black"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{t.title}</h4>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-black text-white">{t.price}</span>
                    <span className="text-xs text-slate-400">/ fő</span>
                  </div>
                  <div className="space-y-1 mb-4 text-xs text-slate-300 font-medium">
                    <p className="text-sky-300 font-semibold">{t.discountPrice}</p>
                    <p className="text-slate-400">{t.seniorPrice}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3 mb-4">
                    {t.desc}
                  </p>
                  <a
                    href="https://www.zssk.sk/casove-listky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      t.highlight
                        ? "bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/25"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span>Jegyvásárlás (ZSSK)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* How to Buy Guide: 4 Methods */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-sky-400" />
              <span>Hogyan és hol vásárolhatunk TEŽ jegyet?</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center mb-2">
                  1
                </span>
                <h4 className="font-bold text-white mb-1">Ideme vlakom mobilapp</h4>
                <p className="text-slate-400 leading-relaxed">
                  A ZSSK hivatalos appja (iOS / Android). 0 Ft kezelési díj, a jegy a telefonban tárolódik, nem kell kinyomtatni.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center mb-2">
                  2
                </span>
                <h4 className="font-bold text-white mb-1">ZSSK Időalapú jegyek</h4>
                <p className="text-slate-400 leading-relaxed">
                  Kényelmes online vásárlás bankkártyával sorbanállás nélkül:{" "}
                  <a
                    href="https://www.zssk.sk/casove-listky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline hover:text-white"
                  >
                    zssk.sk/casove-listky
                  </a>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center mb-2">
                  3
                </span>
                <h4 className="font-bold text-white mb-1">Automaták (állomás & vonat)</h4>
                <p className="text-slate-400 leading-relaxed">
                  A Pod lesom megállónál és a villamosok fedélzetén is működnek érintésmentes bankkártyás jegykiadók.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center mb-2">
                  !
                </span>
                <h4 className="font-bold text-amber-300 mb-1">Pénztári vásárlás (+1 €)</h4>
                <p className="text-slate-300 leading-relaxed">
                  Poprádon, Ótátrafüreden pénztár is van, de figyelj: <strong>+1 € szervizdíjat</strong> számolnak fel! Érdemesebb digitálisan venni.
                </p>
              </div>
            </div>

            {/* Cog Railway Note: Icon & title in one row, full width justified text in new row */}
            <div className="mt-5 p-4 sm:p-5 rounded-xl bg-sky-500/10 border border-sky-400/25">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Tátrai Fogaskerekű Vasút (OŽ 182-es vonal)
                </h4>
              </div>
              <p
                lang="hu"
                className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
              >
                Štrba (fővonali állomás) és Štrbské Pleso között modern svájci Stadler fogaskerekű szerelvények járnak. A TEŽ 24 órás, 3 napos és heti hálózati jegyei erre a fogaskerekű vonalra is teljes mértékben érvényesek!
              </p>
            </div>
          </div>
        </section>

        {/* Driving Rules, Vignettes & Emergency Numbers */}
        <section id="autos-kisokos" className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-semibold mb-3">
              <Car className="w-3.5 h-3.5" />
              <span>Autós Kisokos & Szlovák KRESZ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Autós Szabályok, e-Matrica & Téli Tudnivalók
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Minden fontos szabály a biztonságos és büntetésmentes szlovákiai autózáshoz.
            </p>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {drivingRules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-sky-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">{rule.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {rule.desc}
                  </p>
                </div>

                {rule.link && (
                  <a
                    href={rule.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-white transition-colors"
                  >
                    <span>{rule.linkText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Parking Guide in the High Tatras */}
          <div className="mb-10 p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Parkolási kalauz a Magas-Tátra főbb csomópontjain</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {parkingTips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{tip.location}</h4>
                    <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[11px] mb-2">
                      {tip.price}
                    </span>
                    <p className="text-slate-400 leading-relaxed mb-3">{tip.desc}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-200 text-[11px] font-medium">
                    {tip.alt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mountain Rescue & Insurance warning: Icon & title in one row, full width justified text in new row */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-slate-950 border border-amber-500/30 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-bold text-white text-base sm:text-lg">
                Külön Hegyi Mentőbiztosítás (HZS) — Kötelező jellegű jótanács!
              </h4>
            </div>
            <p
              lang="hu"
              className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              Szlovákiában a <strong>Horská záchranná služba (HZS)</strong> hegyi mentése és keresése
              díjköteles, és nem fedezi az Európai Egészségbiztosítási Kártya (EHIC / kék kártya)!
              Egy hegyi mentés helikopterrel vagy szánnal akár több ezer euróba is kerülhet.
              Győződjetek meg róla, hogy az utasbiztosításotok kifejezetten tartalmazza a hegyimentést és a téli sportokat.
            </p>
          </div>

          {/* Emergency Telephone Numbers */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Fontos Szlovákiai Segélyhívó Számok</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {emergencyNumbers.map((em, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <span className="text-2xl font-black text-amber-400 font-mono block">{em.num}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{em.name}</span>
                  <span className="text-[10px] text-slate-400 block">{em.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sources & Acknowledgements */}
        <section className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-center">
          <p className="mb-2">
            <strong>Adatforrások és hivatkozások:</strong> Menetrendi adatok: ŽSR (GTFS 2025/2026, 183-as és 184-es vonal),
            üzemeltető: ZSSK (Szlovák Vasutak). Térkép és fotók kurációja:{" "}
            <a
              href="https://tatry.top/hu/tez.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline hover:text-white"
            >
              tatry.top TEŽ útmutató
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-medium pt-1">
            <a href="https://www.zssk.sk/casove-listky" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
              zssk.sk (Időalapú jegyek & bérletek) ↗
            </a>
            <span>•</span>
            <a href="https://cp.sk" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
              cp.sk (Menetrendek) ↗
            </a>
            <span>•</span>
            <a href="https://eznamka.sk/hu" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
              eznamka.sk (Matrica) ↗
            </a>
            <span>•</span>
            <a href="https://tatry.top/hu/tez.html" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
              tatry.top ↗
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
