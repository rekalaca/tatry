"use client";

import React, { useState } from "react";
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Users, 
  Mountain,
  Snowflake,
  Ticket,
  Train
} from "lucide-react";

interface Program {
  id: string;
  title: string;
  region: "smokovec" | "strbske-pleso" | "lomnica" | "other";
  category: "outdoor" | "family" | "ski";
  categoryLabel: string;
  badgeColor: string;
  location: string;
  duration: string;
  description: string;
  tips: string;
  link?: string;
  linkText?: string;
  logo?: string;
}

interface RegionConfig {
  id: "smokovec" | "strbske-pleso" | "lomnica" | "other";
  anchorId: string;
  name: string;
  shortName: string;
  tag: string;
  subtitle: string;
  borderColor: string;
  bgGradient: string;
  badgeClass: string;
  iconBg: string;
}

const REGIONS: RegionConfig[] = [
  {
    id: "smokovec",
    anchorId: "regio-smokovec",
    name: "Ótátrafüred (Starý Smokovec) & Tarajka (Hrebienok)",
    shortName: "Ótátrafüred",
    tag: "Ótátrafüred környéke",
    subtitle: "A Villa Greystone-hoz legközelebbi hegyi központ (1 TEŽ vasúti megálló, alig 10 perc). Tátrai Jégdóm, szánkópálya és családi látnivalók.",
    borderColor: "border-amber-500/50 hover:border-amber-400/80",
    bgGradient: "bg-gradient-to-b from-amber-500/10 via-slate-900/60 to-slate-950/80 shadow-amber-500/5",
    badgeClass: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    iconBg: "bg-amber-500/20 border-amber-400/30 text-amber-300",
  },
  {
    id: "strbske-pleso",
    anchorId: "regio-strbske-pleso",
    name: "Csorba-tó (Štrbské Pleso) környéke",
    shortName: "Csorba-tó",
    tag: "Csorba-tó környéke",
    subtitle: "A Magas-Tátra legmagasabban fekvő tava és síparadicsoma (1346 m). Közvetlen, fűtött panorámás villamossal (TEŽ) elérhető parkolási díj nélkül!",
    borderColor: "border-sky-500/50 hover:border-sky-400/80",
    bgGradient: "bg-gradient-to-b from-sky-500/10 via-slate-900/60 to-slate-950/80 shadow-sky-500/5",
    badgeClass: "bg-sky-400/20 text-sky-300 border-sky-400/40",
    iconBg: "bg-sky-500/20 border-sky-400/30 text-sky-300",
  },
  {
    id: "lomnica",
    anchorId: "regio-lomnica",
    name: "Tátralomnic (Tatranská Lomnica) & Lomnici-csúcs",
    shortName: "Tátralomnic",
    tag: "Tátralomnic környéke",
    subtitle: "Szlovákia leghosszabb sípályái, modern kabinos felvonók a Kő-pataki tóhoz és a 2634 m magas Lomnici-csúcs legendás piros függővasútja.",
    borderColor: "border-indigo-500/50 hover:border-indigo-400/80",
    bgGradient: "bg-gradient-to-b from-indigo-500/10 via-slate-900/60 to-slate-950/80 shadow-indigo-500/5",
    badgeClass: "bg-indigo-400/20 text-indigo-300 border-indigo-400/40",
    iconBg: "bg-indigo-500/20 border-indigo-400/30 text-indigo-300",
  },
  {
    id: "other",
    anchorId: "regio-kirandulasok",
    name: "További Tátrai Kirándulások & Különleges Élmények",
    shortName: "Egyéb élmények",
    tag: "Poprád, Bélai-Tátra & Hálózat",
    subtitle: "AquaCity Poprad élményfürdője, a Bélai-Tátra lombkorona tanösvénye, alpesi termálfürdő és a hegyi vasúthálózat élménye.",
    borderColor: "border-emerald-500/50 hover:border-emerald-400/80",
    bgGradient: "bg-gradient-to-b from-emerald-500/10 via-slate-900/60 to-slate-950/80 shadow-emerald-500/5",
    badgeClass: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
    iconBg: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
  },
];

const programs: Program[] = [
  {
    id: "hrebienok-ice",
    title: "Tarajka (Hrebienok) & Tátrai Jégdóm",
    region: "smokovec",
    category: "outdoor",
    categoryLabel: "Kiemelt Téli Csoda",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    location: "Ótátrafüred (Starý Smokovec)",
    duration: "2 - 4 óra",
    description: "A Tátra legnagyobb téli látványossága! Több száz tonna tiszta jégből faragott világhírű katedrális, monumentális jégszobrok és misztikus fényfestés egy fűtött kupola alatt.",
    tips: "Ótátrafüredről a piros siklóvasúttal (kb. 7 perc) vagy gyalog erdei sétaúton érhető el. A jégdóm belépése ingyenes!",
    link: "https://www.vt.sk/hu/aktivitasok/teli-tevekenysegek/tatrai-jegtemplom",
    linkText: "Hivatalos jégdóm infók"
  },
  {
    id: "hrebienok-lanovka",
    title: "Tarajkai sikló (Ótátrafüred – Tarajka siklóvasút)",
    region: "smokovec",
    category: "outdoor",
    categoryLabel: "Panorámás Siklóvasút",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    location: "Ótátrafüred (1025 m) ➡️ Tarajka (1285 m)",
    duration: "kb. 5 - 7 perc menetidő",
    description: "A Magas-Tátra ikonikus, sínen futó zárt panorámakocsija (szlovákul: Pozemná lanovka Starý Smokovec – Hrebienok, vagy egyszerűen Lanovka na Hrebienok / funicular). Ótátrafüredről (Starý Smokovec, 1025 m) kapaszkodik fel a Tarajkára (Hrebienok, 1285 m), leküzdve a 247 méteres szintkülönbséget alig 5-7 perc alatt, kényelmes és akadálymentes hegyi utazást nyújtva.",
    tips: "Fent található a téli Tátrai Jégdóm, a Tarpataki-vízesések felé induló túraútvonal, valamint a 2,5 km-es szánkópálya rajtja (a sikló a bérelt szánkókat is kényelmesen felviszi). A menetjegyeket érdemes online a Gopass rendszerben vagy az állomási automatából előre megváltani az olcsóbb ár és a pénztári sorban állás elkerülése végett.",
    link: "https://gopass.travel/HU/resort/stary-smokovec",
    linkText: "Gopass Starý Smokovec sikló infók & jegyek"
  },
  {
    id: "hrebienok-sanko",
    title: "2,5 km-es Tarajka Szánkópálya",
    region: "smokovec",
    category: "ski",
    categoryLabel: "Szánkózás & Adrenalin",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    location: "Hrebienok ➡️ Ótátrafüred",
    duration: "1 - 2 óra",
    description: "Közép-Európa egyik leghosszabb szánkópályája. Nappal és sötétedés után esti kivilágítás mellett is suhanhatunk a havas fenyvesek között.",
    tips: "A sikló alsó állomásánál komplett szánkóbérlés működik. A sikló felviszi a szánkót!",
    link: "https://www.vt.sk/hu/aktivitasok/teli-tevekenysegek/szankozas-tarajkan",
    linkText: "Szánkópálya nyitvatartás & infók"
  },
  {
    id: "tricklandia",
    title: "Tricklandia – Optikai Illúziók Palotája",
    region: "smokovec",
    category: "family",
    categoryLabel: "Gyerek- & Családi kedvenc",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    location: "Ótátrafüred (Starý Smokovec)",
    duration: "1 - 1,5 óra",
    description: "Beltéri varázsvilág optikai illúziókkal, tükörlabirintussal, fejjel lefelé fordított szobákkal és szlovák népmesék ihlette 3D festményekkel.",
    tips: "Tökéletes választás havas vagy hideg időjárás esetén. Előzetes online időpontfoglalás nagyon ajánlott!",
    link: "https://www.tripadvisor.com/Attraction_Review-g274943-d11629671-Reviews-Tricklandia-Stary_Smokovec_Presov_Region.html",
    linkText: "TripAdvisor vélemények & infók"
  },
  {
    id: "strbske-pleso",
    title: "Csorba-tó (Štrbské Pleso) Téli Séta",
    region: "strbske-pleso",
    category: "outdoor",
    categoryLabel: "Havas Panoráma",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    location: "Csorba-tó (1346 m)",
    duration: "Félnapos program",
    description: "A Magas-Tátra legkedveltebb tava. Télen a befagyott tó partján futó sétányról festői kilátás nyílik a Solisko és Kriván hófödte csúcsaira.",
    tips: "A tókerülő séta kényelmes tempóban 1-1,5 óra babakocsival vagy szánkóval is. A legegyszerűbben és legkényelmesebben a TEŽ tátrai hegyi vonattal érhető el parkolási gondok nélkül!",
    link: "https://utazasielmenyek.hu/utazasi-magazin-hirek/uti-beszamolo/2542-teli-kirandulas-a-csorba-tohoz",
    linkText: "Téli kirándulás a Csorba-tóhoz (beszámoló)"
  },
  {
    id: "lomnic-csucs",
    title: "Lomnici-csúcs felvonó (Lanovka na Lomnický štít)",
    region: "lomnica",
    category: "outdoor",
    categoryLabel: "Zárt Kabinos Csúcsfelvonó",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    location: "Tátralomnic ➡️ Kő-pataki-tó (1761 m) ➡️ Lomnici-csúcs (2634 m)",
    duration: "3 - 5 óra (csúcstartózkodás: 50 perc)",
    description: "A kötélen lebegő, zárt kabinos tátrai kötélpálya (szlovákul és a jegyrendszerben: Kabínková lanovka Tatranská Lomnica – Skalnaté pleso – Lomnický štít). Két szakaszból áll: először Tátralomnicról (Tatranská Lomnica) modern, zárt kabinokkal jutunk fel a Kő-pataki-tóhoz (Skalnaté pleso, 1761 m), onnan pedig a legendás lebegő piros nagykabin repít fel a Magas-Tátra második legmagasabb pontjára, a 2634 méteres Lomnici-csúcsra.",
    tips: "A Lomnici-csúcsra a nagykabin szigorúan korlátozott létszáma miatt a jegyet kötelező jó előre megváltani a Gopass rendszerében fix idősávra! A csúcson 50 perc tölthető el a kilátóteraszon, a csillagvizsgálónál és a kávézóban. A Kő-pataki-tóig (1761 m) tartó első szakaszra aznap is könnyen váltható jegy.",
    link: "https://gopass.travel/HU/resort/tatranska-lomnica",
    linkText: "Gopass Lomnici-csúcs menetrend & jegyek"
  },
  {
    id: "lomnic-sedlo-libego",
    title: "Lomnici-nyereg libegő (Sedačková lanovka Lomnické sedlo)",
    region: "lomnica",
    category: "outdoor",
    categoryLabel: "Nyitott Ülőlift (Libegő)",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    location: "Kő-pataki-tó (1761 m) ➡️ Lomnici-nyereg (2190 m)",
    duration: "1 - 2 óra (menetidő kb. 8 perc)",
    description: "A csúcsfelvonó népszerű, alpesi hangulatú libegős alternatívája (szlovákul: Sedačková lanovka Lomnické sedlo). Ez a nyitott kétüléses ülőlift a Kő-pataki-tó (Skalnaté pleso, 1761 m) partjáról repít fel a 2190 méter magasan fekvő sziklás Lomnici-nyeregbe, amely Szlovákia legmagasabb síterepe és az egyik legdrámaibb magashegyi kilátópontja.",
    tips: "Ideális választás akkor is, ha a legfelső csúcsra már elfogytak a jegyek: a nyeregből fantasztikus panoráma tárul a Kis-Tarpataki-völgy sziklafalaira. Mivel teljesen nyitott ülőliftről van szó, szélálló, meleg téli réteges öltözet, sapka és kesztyű erősen ajánlott! A felvonójegyek Gopass kártyával a völgyi kabinnal kombinálva válthatók.",
    link: "https://gopass.travel/HU/resort/tatranska-lomnica",
    linkText: "Gopass Lomnici-nyereg felvonó infók"
  },
  {
    id: "bachledka",
    title: "Bachledka Lombkorona Tanösvény",
    region: "other",
    category: "outdoor",
    categoryLabel: "Panoráma Séta",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    location: "Zár (Ždiar) - Bachledova dolina",
    duration: "2 - 3 óra",
    description: "A Bélai-Tátra kapujában a fák lombkoronája felett kanyargó faborítású sétaút és 32 méter magas kilátótorony, ahonnan a hófödte tátrai csúcsok láthatók.",
    tips: "Új, kényelmes 10 személyes kabinos felvonó visz fel a hegyre, fent melegített étterem és játszótér várja a családot.",
    link: "https://chodnikkorunamistromov.sk/hu/",
    linkText: "Bachledka hivatalos oldal"
  },
  {
    id: "tez-villamos",
    title: "Tátrai Elektromos Vasút (TEŽ Villamos)",
    region: "other",
    category: "family",
    categoryLabel: "Családi Élményutazás",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    location: "Poprád – Ótátrafüred – Csorba-tó",
    duration: "Rugalmas",
    description: "A tátrai hegyoldalban kanyargó hegyi villamos, amivel autó és hólánc nélkül, fűtött vagonokban lehet bejárni a tátrai üdülővárosokat és a Csorba-tavat.",
    tips: "Jegyeket és időszakos bérleteket (1, 3, 7 napos) az állomásokon vagy online a ZSSK hivatalos oldalán és applikációjában érdemes megvenni.",
    link: "https://www.zssk.sk/casove-listky/",
    linkText: "ZSSK Tátrai bérletek & jegyárak"
  },
  {
    id: "termy-bukovina",
    title: "Termy BUKOVINA – Alpesi Termálfürdő",
    region: "other",
    category: "family",
    categoryLabel: "Prémium Tátrai Wellness",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    location: "ul. Sportowa 22, 34-530 Bukowina Tatrzańska (Lengyelország, kb. 35 perc)",
    duration: "Félnapos / 3 - 4 óra",
    description: "Közép-Európa egyik legmodernebb tátrai élményfürdője: 20 beltéri és kültéri termálmedence (30-38 °C), pezsgőfürdők, sodrófolyosók és fenséges hegyi panoráma a havas tátrai fenyvesekre.",
    tips: "A téli hóesésben a gőzölgő szabadtéri medencékben fürdőzni felejthetetlen élmény! Érdemes online előre megváltani a belépőjegyeket a hivatalos weboldalon.",
    link: "https://www.termybukovina.pl/en/",
    linkText: "Termy BUKOVINA hivatalos oldal",
    logo: "https://babygo.pl/upload/firm/termy-bukovina/Termy%20BUKOVINA.jpg",
  },
  {
    id: "terma-bania",
    title: "Terma Bania – Élmény- és Termálfürdő",
    region: "other",
    category: "family",
    categoryLabel: "Sípálya & Termálfürdő",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    location: "Środkowa 181, 34-405 Białka Tatrzańska, Lengyelország",
    duration: "Félnapos / Egész napos",
    description: "Białka Tatrzańska népszerű élményfürdője a Kotelnica sípályák tövében. Családi vízi csúszdapark, hullámmedence, valamint csendes relaxációs termálzónák fenséges hegyi panorámával.",
    tips: "Közvetlenül a sípályák mellett helyezkedik el, ideális síelés utáni forró fürdőzéshez. Jegyeket érdemes online előre lefoglalni a hivatalos oldalon.",
    link: "https://www.termabania.pl/en/",
    linkText: "Terma Bania hivatalos weboldal & jegyek",
    logo: "https://www.nadwodospadem.info/files/200/logo_277_x_200_px1_4x3.png",
  },
  {
    id: "termy-zakopianskie",
    title: "Termy Zakopiańskie – Panoráma Aquapark",
    region: "other",
    category: "family",
    categoryLabel: "Zakopane Termálfürdője",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    location: "Jagiellońska utca 31, 34-500 Zakopane, Lengyelország",
    duration: "2 - 4 óra",
    description: "Zakopane központi termál- és élményfürdője, kilátással a havas Giewont csúcsra. Kénes termálmedencék, vadvízi sodrófolyosó, csúszdák és wellness szaunavilág a város szívében.",
    tips: "A zakopanei vasútállomástól és a Krupówki sétálóutcától is pár perc sétával megközelíthető, remek program városnézés vagy túrázás után.",
    link: "https://www.termy-zakopianskie.pl/",
    linkText: "Termy Zakopiańskie hivatalos oldal",
    logo: "https://www.termy-zakopianskie.pl/images/termy-logo-300x107.webp",
  },
  {
    id: "aquacity-poprad",
    title: "AquaCity Poprad",
    region: "other",
    category: "family",
    categoryLabel: "Élményfürdő & Családi Lazítás",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    location: "Športová 1397/1, Spišská Sobota, 058 01 Poprad, Szlovákia",
    duration: "Félnapos / Egész napos",
    description: "A Magas-Tátra lábánál fekvő, nemzetközileg elismert élmény- és wellnessközpont: 13 fedett és szabadtéri termálmedence (30–38 °C), pezsgőfürdők, szórakoztató csúszdatornyok és Blue Sapphire medencék esti 3D lézershow-val. Kétszintes Fire & Water Wellness & Spa szaunavilága tökéletes feltöltődést kínál egy havas tátrai túra után a család minden tagjának.",
    tips: "A belépőjegyeket érdemes előre online megváltani a hivatalos webshopban, elkerülve a kasszáknál való sorban állást és kedvezőbb áron hozzájutva a jegyekhez. Poprád belvárosából és a vasútállomásról percek alatt elérhető autóval vagy helyi közlekedéssel.",
    link: "https://shop.aquacity.sk/en/",
    linkText: "AquaCity Poprad hivatalos webshop & jegyek",
    logo: "https://shop.aquacity.sk/wp-content/uploads/2020/03/logo-aquacity.svg",
  }
];

export default function ProgramsSection({ isSubpage = false }: { isSubpage?: boolean } = {}) {
  const [activeTab, setActiveTab] = useState<"all" | "outdoor" | "family" | "ski">("all");

  const filteredPrograms = activeTab === "all" 
    ? programs 
    : programs.filter(p => p.category === activeTab);

  return (
    <section id="programok" className={`${isSubpage ? "pt-2 pb-16" : "py-20"} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Téli Programok &{" "}
          <span className="bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent">
            Kirándulások
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Válogatott tátrai programok a család minden tagjának: szánkózás, jégtemplom, panoráma felvonók és meleg beltéri mókák.
        </p>
      </div>

      {/* ZSSK TEŽ Hegyi Vasút Kiemelt Kártya */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-orange-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-amber-950/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Train className="w-3.5 h-3.5" />
                <span>Tátrai Elektromos Vasút (TEŽ) & Hegyi Vonatok</span>
              </span>
              <span className="text-xs text-sky-300 font-medium">
                🌲 Autó és téli parkolási stressz nélkül
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Kényelmes utazás a Csorba-tóhoz és a Tátra csodáihoz
            </h3>

            <p
              lang="hu"
              className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            >
              A piros hegyi vasúttal (TEŽ) fűtött, panorámás vagonokban kirándulhatunk a hegyekbe. Közvetlen összeköttetést biztosít <strong>Poprád, Ótátrafüred (Starý Smokovec), Tátralomnic és a Csorba-tó (Štrbské Pleso)</strong> között, így nem kell a téli hegyi utakon vezetni vagy parkolóhelyet vadászni a fagyban.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-6">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-sky-300 font-medium">
                Poprád
              </span>
              <span className="text-slate-500">↔</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-sky-300 font-medium">
                Ótátrafüred (Starý Smokovec)
              </span>
              <span className="text-slate-500">↔</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-orange-500/40 text-orange-300 font-bold shadow-sm shadow-orange-500/20">
                🏔️ Csorba-tó (Štrbské Pleso)
              </span>
              <span className="text-slate-500">↔</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-sky-300 font-medium">
                Tátralomnic
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.zssk.sk/casove-listky/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 group"
              >
                <span>ZSSK Tátrai bérletek & időszakos jegyek</span>
                <ExternalLink className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-xs text-slate-400 font-medium">
                💡 1, 3 vagy 7 napos turistabérlettel korlátlanul utazhatunk az egész hálózaton
              </span>
            </div>
          </div>

          {/* Right Logo & Info badge */}
          <div className="flex flex-col items-center justify-center bg-slate-950/90 border border-orange-500/20 rounded-2xl p-6 lg:min-w-[270px] text-center self-center lg:self-stretch">
            <div className="bg-white px-5 py-3 rounded-xl shadow-md mb-4 flex items-center justify-center">
              <img
                src="/pictures/zssk-logo.svg"
                alt="ZSSK Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-xs font-bold text-white mb-1">Železničná spoločnosť Slovensko</div>
            <p className="text-[11px] text-slate-400 leading-normal mb-3">
              Hivatalos szlovák vasúttársaság (TEŽ & OŽ hegyi vonalak)
            </p>
            <a
              href="https://www.zssk.sk/casove-listky/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>zssk.sk/casove-listky</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "all"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
              : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
          }`}
        >
          Összes program ({programs.length})
        </button>
        <button
          onClick={() => setActiveTab("outdoor")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "outdoor"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
              : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
          }`}
        >
          🏔️ Havas kalandok & Panoráma
        </button>
        <button
          onClick={() => setActiveTab("family")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "family"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
              : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
          }`}
        >
          👨‍👩‍👧‍👦 Családi & Beltéri szórakozás
        </button>
        <button
          onClick={() => setActiveTab("ski")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "ski"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
              : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
          }`}
        >
          🛷 Szánkó & Téli sport
        </button>
      </div>

      {/* Quick Jump by Region */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>Térségek:</span>
        </span>
        {REGIONS.map((reg) => {
          const count = filteredPrograms.filter((p) => p.region === reg.id).length;
          if (count === 0) return null;
          return (
            <a
              key={reg.id}
              href={`#${reg.anchorId}`}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs transition-all flex items-center gap-1.5"
            >
              <span>{reg.shortName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
                {count}
              </span>
            </a>
          );
        })}
      </div>

      {/* Program Groups by Region */}
      <div className="space-y-12">
        {REGIONS.map((region) => {
          const regionPrograms = filteredPrograms.filter((p) => p.region === region.id);
          if (regionPrograms.length === 0) return null;

          return (
            <div
              key={region.id}
              id={region.anchorId}
              className={`rounded-3xl border-2 ${region.borderColor} ${region.bgGradient} p-5 sm:p-7 shadow-xl transition-all duration-300 scroll-mt-28`}
            >
              {/* Region Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`p-2.5 rounded-2xl border shrink-0 ${region.iconBg}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {region.name}
                      </h3>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${region.badgeClass} font-mono`}>
                        {regionPrograms.length} program
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {region.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Region Cards Grid */}
              <div
                className={`grid grid-cols-1 ${
                  regionPrograms.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
                } gap-6`}
              >
                {regionPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 bg-slate-950/70"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${program.badgeColor}`}>
                          {program.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span>{program.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                          {program.title}
                        </h4>
                        {program.logo && (
                          <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200 shrink-0 flex items-center justify-center min-w-[90px] sm:min-w-[105px] h-12">
                            <img
                              src={program.logo}
                              alt={`${program.title} Logo`}
                              className="h-8 sm:h-9 w-auto max-w-[95px] sm:max-w-[110px] object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-start gap-1.5 text-xs font-medium text-amber-400/90 mb-3">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="leading-tight">{program.location}</span>
                      </div>

                      <p
                        lang="hu"
                        className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                      >
                        {program.description}
                      </p>

                      {/* Tip Box: Icon & title in one row, full width justified text in new row */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-4">
                        <div className="flex items-center gap-2 mb-2 text-amber-300 font-bold text-xs">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span>Tipp & jótanács:</span>
                        </div>
                        <p
                          lang="hu"
                          className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                        >
                          {program.tips}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    {program.link && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <a
                          href={program.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-200 transition-colors"
                        >
                          <span>{program.linkText || "Részletek és hivatalos oldal"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
