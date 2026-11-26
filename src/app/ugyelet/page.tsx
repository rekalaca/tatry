import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import {
  PhoneCall,
  Clock,
  MapPin,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Stethoscope,
  HeartPulse,
  Baby,
  Smile,
  Pill,
  Sparkles,
  Search,
  Compass,
  Utensils,
  Waves,
  Train,
  CheckSquare,
  HelpCircle,
  Navigation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Orvosi Ügyeletek & Gyógyszertárak • Magas-Tátra | Villa Greystone",
  description:
    "Fontos segélyhívó számok, a Poprádi Kórház 0–24 sürgősségi és felnőtt/gyermek háziorvosi ügyelete, hegyvidéki rendelők, hétvégén is nyitva tartó gyógyszertárak és HZS hegyi mentési tudnivalók.",
};

export default function UgyeletPage() {
  const quickEmergency = [
    {
      num: "112",
      title: "Általános Segélyhívó",
      badge: "Európai vészhelyzet",
      desc: "Bármilyen súlyos vészhelyzet esetén többnyelvű diszpécserközponttal, SIM-kártya vagy térerő hiányában is hívható.",
      accent: "from-rose-500/25 via-slate-900/80 to-slate-950",
      border: "border-rose-500/40 hover:border-rose-400",
      btnClass: "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20",
    },
    {
      num: "155",
      title: "Orvosi Mentők (Záchranka)",
      badge: "Közvetlen mentőhívás",
      desc: "Közvetlen egészségügyi mentés hirtelen eszméletvesztés, stroke, szívinfarktus gyanúja és súlyos sérülések esetén.",
      accent: "from-red-500/25 via-slate-900/80 to-slate-950",
      border: "border-red-500/40 hover:border-red-400",
      btnClass: "bg-red-500 hover:bg-red-400 text-white shadow-red-500/20",
    },
    {
      num: "18 300",
      title: "Hegyi Mentők (HZS)",
      badge: "Túra & hegyi baleset",
      desc: "Hegyi túrán, lejtőkön, sziklafalon történő eltévedés, kimerülés, fagyás vagy sérülés esetén közvetlen riasztás.",
      accent: "from-amber-500/25 via-slate-900/80 to-slate-950",
      border: "border-amber-500/40 hover:border-amber-400",
      btnClass: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20",
    },
    {
      num: "+421 52 712 51 11",
      title: "Poprádi Kórház Központ",
      badge: "0–24 Kórházi Info",
      desc: "Központi kórházi diszpécser és ügyeleti tájékoztatás a betegfelvételről, osztályokról és orvosi szolgálatról.",
      accent: "from-sky-500/25 via-slate-900/80 to-slate-950",
      border: "border-sky-500/40 hover:border-sky-400",
      btnClass: "bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20",
    },
  ];

  const hospitalServices = [
    {
      name: "Sürgősségi Osztály (Urgentný príjem)",
      icon: HeartPulse,
      time: "0–24 órában, a hét minden napján folyamatosan nyitva",
      timeHighlight: "0–24 Folyamatos",
      loc: "Főépület összekötő folyosója (komplement), földszint",
      phone: "+421 52 712 56 16",
      desc: "Közvetlen életveszély, heveny szív- és keringési zavarok, eszméletvesztés, súlyos akut allergiás rohamok, csonttörések és súlyos baleseti traumák azonnali kivizsgálása és fekvőbeteg felvétele a hét minden napján, éjjel-nappal.",
      fee: "Sürgősségi ellátás szerint",
      officialUrl: "https://www.nemocnicapp.sk/ambulancie-oddelenia/ambulancie/urgentny-prijem",
      accent: "from-rose-500/20 border-rose-500/30",
      badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      iconColor: "text-rose-400",
    },
    {
      name: "Felnőtt Háziorvosi Ügyelet (APS pre dospelých)",
      icon: Stethoscope,
      time: "H–P: 16:00 – 22:00 • Szo–V és ünnepnap: 7:00 – 22:00",
      timeHighlight: "Hétvégén 7:00 – 22:00",
      loc: "Geriatriai pavilon, bejárat a hátsó udvar felől a rámpánál",
      phone: "+421 52 712 56 14",
      desc: "Hirtelen fellépő felnőttkori panaszok, magas láz, heveny görcsök, erős köhögés vagy egyéb nem életveszélyes, de a háziorvosi rendelési időn kívül halaszthatatlan rosszullétek járóbeteg-ellátása és receptfelírása.",
      fee: "2 € vizsgálati alapdíj",
      officialUrl: "https://www.nemocnicapp.sk/ambulancie-oddelenia/ambulancie/pohotovost-pre-dospelych",
      accent: "from-sky-500/20 border-sky-500/30",
      badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      iconColor: "text-sky-400",
    },
    {
      name: "Gyermekorvosi Ügyelet (APS pre deti a dorast)",
      icon: Baby,
      time: "H–P: 16:00 – 20:00 • Szo–V és ünnepnap: 8:00 – 20:00",
      timeHighlight: "Hétvégén 8:00 – 20:00",
      loc: "Gyermekpoliklinika épülete (Detská poliklinika), 2-es számú bejárat",
      phone: "+421 52 712 56 83",
      desc: "Gyermekek és fiatalkorúak hirtelen megbetegedése, lázcsillapítási nehézségek, heveny légúti fertőzések és panaszok szakellátása. Figyelem: este 20:00 óra után a poprádi kórház fekvőbeteg gyermekosztálya veszi át a sürgős esetek azonnali ellátását.",
      fee: "2 € vizsgálati alapdíj",
      officialUrl: "https://www.nemocnicapp.sk/ambulancie-oddelenia/ambulancie/urgentny-prijem",
      accent: "from-amber-500/20 border-amber-500/30",
      badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      name: "Fogorvosi Ügyelet (Zubná pohotovosť)",
      icon: Smile,
      time: "Szombat – Vasárnap és ünnepnapokon: 9:00 – 13:00",
      timeHighlight: "Hétvégén 9:00 – 13:00",
      loc: "Főportás épület, 1. emelet, V102-es ajtó",
      phone: "+421 52 712 56 13",
      desc: "Hirtelen jelentkező elviselhetetlen fogfájás, arcduzzanat, heveny gyulladás, vérzés vagy fogbaleset sürgősségi csillapítása és azonnali fogászati beavatkozása a hétvégi délelőtti ügyeleti idősávban.",
      fee: "Ügyeleti díjszabás szerint",
      officialUrl: "https://www.nemocnicapp.sk/ambulancie-oddelenia/ambulancie/urgentny-prijem",
      accent: "from-emerald-500/20 border-emerald-500/30",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      iconColor: "text-emerald-400",
    },
  ];

  const shoppingPharmacies = [
    {
      name: "Lekáreň EKOLEKÁREŇ – OC FORUM Poprad",
      address: "Námestie Sv. Egídia 3290/14 (bejárat a Francisciho utca felől)",
      hours: "Hétfő – Vasárnap: 8:00 – 20:00 (Hétvégén is este 20-ig nyitva!)",
      phone: "+421 910 888 091",
      mall: "OC FORUM Belvárosi Pláza",
      mapQuery: "EKOLEKAREN+OC+FORUM+Poprad",
    },
    {
      name: "Lekáreň Dr. Max – OC Kaufland Poprad",
      address: "Jiřího Wolkera 466/14, Poprad",
      hours: "Hétfő – Vasárnap: 8:00 – 20:00 (Hétvégén is este 20-ig nyitva!)",
      phone: "+421 901 961 195",
      mall: "Kaufland Poprad Nyugat",
      mapQuery: "Dr.+Max+Kaufland+Poprad+Wolkerova",
    },
    {
      name: "Lekáreň BENU – OD Kaufland Poprad",
      address: "Moyzesova 4067/3, Poprad",
      hours: "Hétfő – Vasárnap: 8:00 – 20:00 (Hétvégén is este 20-ig nyitva!)",
      phone: "+421 905 821 914",
      mall: "OD Kaufland Poprad Centrum",
      mapQuery: "BENU+Kaufland+Moyzesova+Poprad",
    },
    {
      name: "Lekáreň BENU – HM Tesco Poprad",
      address: "Teplická cesta 4359/3, Poprad",
      hours: "Hétfő – Vasárnap: 8:00 – 20:00 (Hétvégén is este 20-ig nyitva!)",
      phone: "+421 917 194 759",
      mall: "Tesco Hipermarket Poprad",
      mapQuery: "BENU+Tesco+Poprad+Teplicka",
    },
  ];

  const glossary = [
    { hu: "Sürgősségi ellátás", sk: "Urgentný príjem", tip: "0–24 órás akut kórházi ellátás" },
    { hu: "Orvosi ügyelet", sk: "Ambulantná pohotovosť", tip: "Háziorvosi ügyelet rendelési időn kívül" },
    { hu: "Gyógyszertár", sk: "Lekáreň", tip: "Patika, vény nélküli és vényköteles szerek" },
    { hu: "Orvosi recept / vény", sk: "Lekársky predpis / Recept", tip: "Szlovákiában elfogadják az uniós e-receptet" },
    { hu: "Fájdalomcsillapító", sk: "Liek proti bolesti", tip: "Paracetamol, ibuprofen típusú szerek" },
    { hu: "Lázcsillapító", sk: "Liek na zníženie teploty", tip: "Magas testhőmérséklet (horúčka) esetén" },
    { hu: "Hegyi mentőszolgálat", sk: "Horská záchranná služba (HZS)", tip: "18 300 közvetlen hegyi segélyhívó" },
    { hu: "Egészségbiztosítás", sk: "Zdravotné poistenie", tip: "Európai Egészségbiztosítási Kártya (EHIC)" },
  ];

  return (
    <main className="min-h-screen relative selection:bg-rose-500 selection:text-white pb-16">
      {/* Falling snow particles */}
      <SnowEffect />

      {/* Sticky frosted glass navbar */}
      <Navbar />

      <div className="animate-subpage-fade-in">
        {/* Main Container */}
      <div className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Hero: Clean title directly without any pill/badge above it */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.18] mb-4">
            Orvosi Ügyeletek &{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-sky-300 bg-clip-text text-transparent">
              Gyógyszertárak
            </span>
          </h1>
          <p
            lang="hu"
            className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
          >
            A tátrai pihenés során a család biztonsága a legfontosabb. A Villa Greystone szállástól (Nová Lesná / Pod lesom)
            mindössze <strong>12–15 perc autóval vagy a TEŽ villamossal</strong> a poprádi központi térségi kórház, valamint 
            Ótátrafüreden a hegyek lábánál is működik hétvégén is nyitva tartó gyógyszertár és integrált orvosi központ. 
            Az alábbiakban egybegyűjtöttük az azonnal hívható segélykérő számokat, rendelési időket és hivatalos patikakeresőket.
          </p>
        </div>

        {/* Quick Emergency Hotlines Grid */}
        <section className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickEmergency.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-gradient-to-b ${item.accent} border ${item.border} shadow-lg flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-200">
                      {item.badge}
                    </span>
                    <PhoneCall className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {item.num}
                  </div>
                  <div className="text-sm font-bold text-slate-100 mb-2">
                    {item.title}
                  </div>
                  <p
                    lang="hu"
                    className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mb-4"
                  >
                    {item.desc}
                  </p>
                </div>
                <a
                  href={`tel:${item.num.replace(/\s+/g, "")}`}
                  className={`w-full py-2.5 px-3 rounded-xl ${item.btnClass} text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Azonnali hívás: {item.num}</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HZS Warning & Insurance Card - Strictly adhering to layout rules */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-rose-500/15 border-2 border-amber-400/40 shadow-2xl">
            {/* Rule: Icon & Title on ONE ROW */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                Hegyi Mentőszolgálat (HZS) & Kötelező Utasbiztosítási Tudnivalók
              </h2>
            </div>

            {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
            <div
              lang="hu"
              className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto]"
            >
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                Szlovákiában a hegyi mentők technikai beavatkozása (a hegyen eltévedt turisták felkutatása, hordágyas lehozatal,
                valamint a helikopteres mentés) <strong>fizetős szolgáltatás</strong>, amely egyetlen beavatkozás során is több száz
                vagy akár több ezer euróra rúghat! Kiemelten fontos tudni, hogy a magyar <strong>Európai Egészségbiztosítási Kártya
                (kék kártya)</strong> kizárólag az állami kórházi és orvosi alapellátást fedezi a poprádi kórházban, de a hegyről
                történő technikai mentést és a helikoptert NEM állja.
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5">
                Ezért minden tátrai túra és síelés előtt elengedhetetlen egy kifejezetten hegyi mentésre és helikopteres ellátásra
                kiterjedő kiegészítő utasbiztosítás megléte. Emellett okostelefonra feltétlenül ajánlott előre telepíteni az ingyenes
                <strong> hivatalos HZS mobilalkalmazást</strong>, mellyel baj esetén egyetlen gombnyomással a mentőközpontba juttathatók
                a pontos műholdas GPS-koordináták.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://app.hzs.sk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all"
              >
                <span>HZS Mobilalkalmazás letöltése</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="tel:18300"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs sm:text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>HZS Segélyhívás: 18 300</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 1: Poprádi Kórház */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl mb-8">
            {/* Header: Title starts directly, no pill above H2 */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Poprádi Kórház (Nemocnica Poprad, a.s.)
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium text-sky-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Banícka 803/28, 058 01 Poprad</span>
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-300">
                    Szállástól: <strong>12–15 perc</strong> (autó / TEŽ villamos)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Nemocnica+Poprad,+Ban%C3%ADcka+803%2F28,+058+01+Poprad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Útvonaltervezés (Google Maps)</span>
                </a>
                <a
                  href="tel:+421527125111"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                  <span>Központ: +421 52 712 51 11</span>
                </a>
              </div>
            </div>

            {/* Featured Photo: Poprádi Kórház épülete */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-sky-500/25 shadow-xl group">
              <Image
                src="/pictures/medical/nemocnica-poprad.jpg"
                alt="Poprádi Kórház épülete (Nemocnica Poprad, a.s.)"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white">
                <div>
                  <span className="text-xs sm:text-sm font-bold block drop-shadow-md">
                    Nemocnica Poprad, a.s. – Központi épület és sürgősségi fogadótér
                  </span>
                  <span className="text-[11px] text-sky-200/90 font-mono">
                    Banícka 803/28, Poprad • 12–15 perc a Villa Greystone-tól
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/80 backdrop-blur-md text-white text-xs font-bold w-fit shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  0–24 Sürgősségi ellátás
                </span>
              </div>
            </div>

            {/* Hospital Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {hospitalServices.map((svc, idx) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-b ${svc.accent} via-slate-900/60 to-slate-950 border shadow-lg flex flex-col justify-between`}
                  >
                    <div>
                      {/* Rule: Icon and Title on ONE ROW */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-xl bg-slate-900/80 border border-white/10 ${svc.iconColor} shrink-0`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                          {svc.name}
                        </h3>
                      </div>

                      {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
                      <div
                        lang="hu"
                        className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] mb-4"
                      >
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {svc.desc}
                        </p>
                      </div>

                      {/* Metadata badges & info */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80 mb-4 text-xs text-slate-300">
                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">Nyitvatartás: </span>
                            <span>{svc.time}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">Pontos helyszín: </span>
                            <span>{svc.loc}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            Díj: {svc.fee}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${svc.badgeClass}`}>
                            {svc.timeHighlight}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                      <a
                        href={`tel:${svc.phone.replace(/\s+/g, "")}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                        <span>Hívás: {svc.phone}</span>
                      </a>
                      {svc.officialUrl && (
                        <a
                          href={svc.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                          title="Hivatalos kórházi aloldal megnyitása"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: Orvosi ellátás a hegyekben (Starý Smokovec / Újtátrafüred) */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl">
            {/* Header: Title starts directly, no pill above H2 */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Orvosi Ellátás a Hegyekben (Starý & Nový Smokovec)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Közvetlen hegyi orvosi központ Ótátrafüred szomszédságában, kisebb balesetek és általános háziorvosi panaszok esetén.
            </p>

            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 via-slate-900/60 to-slate-950 border border-sky-500/30">
              {/* Rule: Icon & Title on ONE ROW */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Integrált Egészségügyi Ellátóközpont (Centrum integrovanej zdravotnej starostlivosti)
                </h3>
              </div>

              {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
              <div
                lang="hu"
                className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] mb-5"
              >
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                  A tátrai hegyvidéken tartózkodók számára Újtátrafüreden működik a modern Integrált Egészségügyi Központ.
                  A központban általános felnőtt- és gyermekorvosi ellátás érhető el, a téli és nyári főszezonban pedig
                  külön <strong>baleseti sebészeti (traumatológiai) szakrendelés</strong> fogadja a sípályákon vagy túrákon
                  könnyebb sérülést, zúzódást, ficamodást szenvedett kirándulókat.
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Előnye, hogy a Villa Greystone apartmantól autóval alig <strong>4 perc (2,9 km)</strong>, vagy a Pod lesom
                  megállóból TEŽ villamossal közvetlenül 9 perc alatt elérhető, így kisebb panaszokkal nem szükséges Poprádra utazni.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Nový Smokovec 27, 062 01 Vysoké Tatry</span>
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-sky-300 font-mono">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>+421 52 442 24 44</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+421524422444"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Hívás: +421 52 442 24 44</span>
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Nov%C3%BD+Smokovec+27,+062+01+Vysok%C3%A9+Tatry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span>Útvonal</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Hétvégén is Nyitva Tartó Gyógyszertárak */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl">
            {/* Header: Title starts directly, no pill above H2 */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Hétvégén is Nyitva Tartó Gyógyszertárak (Lekárne)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-8">
              A hegyekben Starý Smokovecen a hét minden napján nyitva tartó patika működik, Poprádon pedig a bevásárlóközpontokban este 20:00-ig van gyógyszerellátás.
            </p>

            {/* Sub-category A: A hegyekben legközelebb */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>A hegyekben (Szálláshoz legközelebbi gyógyszertárak)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Dr. Max Starý Smokovec */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-emerald-500/15 via-slate-900/60 to-slate-950 border border-emerald-500/30 shadow-lg flex flex-col justify-between">
                  <div>
                    {/* Real Pharmacy Photo */}
                    <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 border border-emerald-500/30 shadow-md group">
                      <Image
                        src="/pictures/medical/lekaren-dr-max.jpg"
                        alt="Lekáreň Dr. Max – Starý Smokovec gyógyszertár"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-white drop-shadow">Starý Smokovec 24 (PRIMO)</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] shadow">
                          Minden nap nyitva
                        </span>
                      </div>
                    </div>

                    {/* Rule: Icon & Title on ONE ROW */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                          Lekáreň Dr. Max – Starý Smokovec (Ótátrafüred)
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Hétvégén is egész nap nyitva!
                        </span>
                      </div>
                    </div>

                    {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
                    <div
                      lang="hu"
                      className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] mb-4"
                    >
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        A legközelebbi és legkényelmesebb gyógyszertár a szállásotokhoz. Ótátrafüred központjában, az új PRIMO
                        multifunkciós épületben (volt Dom služieb) található. A hét minden napján, szombaton és vasárnap is
                        folyamatosan nyitva tart, így hétvégén sem kell feltétlenül Poprádra leutazni gyógyszerért.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80 mb-4 text-xs text-slate-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>Starý Smokovec 24 (PRIMO ház, központ)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-emerald-300">
                          Hétfő – Vasárnap: 7:30 – 19:30 (MINDEN NAP)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                    <a
                      href="tel:+421901961265"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Hívás: +421 901 961 265</span>
                    </a>
                    <a
                      href="https://www.drmax.sk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                      title="Dr. Max hivatalos portál"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Tatranská lekáreň Štrbské Pleso */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-sky-500/15 via-slate-900/60 to-slate-950 border border-sky-500/30 shadow-lg flex flex-col justify-between">
                  <div>
                    {/* Real Pharmacy Photo */}
                    <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 border border-sky-500/30 shadow-md group">
                      <Image
                        src="/pictures/medical/tatranska-lekaren.jpg"
                        alt="Tatranská lekáreň – Štrbské Pleso gyógyszertár"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-white drop-shadow">Štrbské Pleso (Limbová 10)</span>
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/80 text-white font-bold text-[10px] shadow">
                          H – Szo: 8:00 – 16:30
                        </span>
                      </div>
                    </div>

                    {/* Rule: Icon & Title on ONE ROW */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 shrink-0">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                          Tatranská lekáreň – Štrbské Pleso (Csorba-tó)
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          Hétfő – Szombat: 8:00 – 16:30
                        </span>
                      </div>
                    </div>

                    {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
                    <div
                      lang="hu"
                      className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] mb-4"
                    >
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        A Csorba-tó központjában, az egészségügyi rendelőintézet épületében működő gyógyszertár. Ideális,
                        ha a Csorba-tavi téli séta, síelés vagy szánkózás közben merül fel szükség azonnali vitaminra,
                        kötözőszerre vagy fájdalomcsillapítóra. Vasárnap zárva tart.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80 mb-4 text-xs text-slate-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>Egészségügyi központ épülete, Limbová 10, Štrbské Pleso</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Hétfő – Szombat: 8:00 – 16:30 (Vasárnap zárva)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                    <a
                      href="tel:+421524484488"
                      className="flex-1 py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                      <span>Hívás: +421 52 448 44 88</span>
                    </a>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Limbov%C3%A1+10,+%C5%A0trbsk%C3%A9+Pleso"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                      title="Google Maps navigáció"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-category B: Poprádon este 20:00-ig nyitva tartó patikák */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Poprádon (Hétvégén este 20:00-ig nyitva tartó patikák)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingPharmacies.map((pharmacy, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Rule: Icon & Title on ONE ROW */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 shrink-0">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {pharmacy.name}
                          </h4>
                          <span className="text-[10px] text-sky-300 font-medium">
                            {pharmacy.mall}
                          </span>
                        </div>
                      </div>

                      {/* Rule: Text starts on NEW LINE, fills FULL WIDTH, and is JUSTIFIED */}
                      <div
                        lang="hu"
                        className="w-full text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] mb-3 text-xs text-slate-300 leading-relaxed"
                      >
                        <p className="mb-1.5">
                          <strong className="text-slate-200">Cím:</strong> {pharmacy.address}
                        </p>
                        <p className="text-emerald-300 font-medium">
                          <strong className="text-slate-200">Nyitvatartás:</strong> {pharmacy.hours}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                      <a
                        href={`tel:${pharmacy.phone.replace(/\s+/g, "")}`}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{pharmacy.phone}</span>
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Térkép</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-category C: Hivatalos online keresők */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Hivatalos Online Ügyelet- és Gyógyszertár-Keresők</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://www.e-vuc.sk/psk/zdravotnictvo/lekarenska-pohotovostna-sluzba-v-psk.html?page_id=92640&okres=Okres+Poprad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 hover:bg-slate-900 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <Search className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        e-VÚC Megyei Ügyelet
                      </h4>
                    </div>
                    <p
                      lang="hu"
                      className="text-[11px] text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                    >
                      A Poprádi járás hivatalos megyei ügyeletes patikabeosztása és éjszakai gyógyszertári szolgálati rendje.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-300">
                    <span>Megnyitás</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                <a
                  href="https://www.otvorenalekaren.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-400/40 hover:bg-slate-900 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        Otvorená Lekáreň
                      </h4>
                    </div>
                    <p
                      lang="hu"
                      className="text-[11px] text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                    >
                      Élő patikakereső portál, amely valós időben mutatja a környékeden éppen nyitva tartó összes gyógyszertárat.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>Megnyitás</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                <a
                  href="https://www.nemocnicapp.sk/ambulancie-oddelenia/ambulancie/pohotovost-pre-dospelych"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-400/40 hover:bg-slate-900 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <Search className="w-4 h-4 text-sky-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                        Poprádi Kórház Info
                      </h4>
                    </div>
                    <p
                      lang="hu"
                      className="text-[11px] text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                    >
                      A Poprádi Kórház hivatalos felnőtt és gyermek háziorvosi ügyeleti, valamint gyógyszertári tájékoztatója.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-300">
                    <span>Megnyitás</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Hasznos szlovák egészségügyi kifejezések */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl">
            {/* Header: Title starts directly, no pill above H2 */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Hasznos Szlovák Kifejezések Egészségügyi Ellátáshoz
            </h2>
            <p
              lang="hu"
              className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mb-6"
            >
              Orvosi rendelőben vagy patikában az alábbi kifejezések megkönnyítik a gyors megértést, ha telefonon vagy személyesen kell segítséget kérni:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {glossary.map((term, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/30 transition-colors"
                >
                  <div className="text-xs text-sky-400 font-semibold mb-1">
                    {term.hu}
                  </div>
                  <div className="text-sm font-bold text-white mb-1.5 font-mono">
                    {term.sk}
                  </div>
                  <div
                    lang="hu"
                    className="text-[11px] text-slate-400 leading-tight text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                  >
                    {term.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Quick Navigation to Other Guides */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              További Tátrai Kalauzaink
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-6">
              Böngészd át a családi téli programokat, a melegvizes fürdőket, a szomszédos Koliba Tatry étlapját, vagy ellenőrizd az élő vonattérképet!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/programok"
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4" />
                <span>Téli Programok</span>
              </Link>
              <Link
                href="/gasztro"
                className="px-4 py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Utensils className="w-4 h-4" />
                <span>Gasztronómia & Koliba</span>
              </Link>
              <Link
                href="/furdo"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Waves className="w-4 h-4" />
                <span>Fürdők & Wellness</span>
              </Link>
              <Link
                href="/kozlekedes"
                className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Train className="w-4 h-4" />
                <span>Közlekedés & TEŽ</span>
              </Link>
              <Link
                href="/csomagolas"
                className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Csomagolási Notesz</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

        {/* Atmospheric footer */}
        <Footer />
      </div>
    </main>
  );
}
