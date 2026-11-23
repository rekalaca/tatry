"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Home, 
  Wifi, 
  Car, 
  Coffee, 
  Flame, 
  Tv, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Bed, 
  Bath, 
  UtensilsCrossed, 
  MapPin, 
  Sparkles,
  Phone,
  Star,
  ShieldCheck,
  Clock,
  CreditCard,
  Ban,
  FileText,
  Download,
  Train,
  Bus,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Waves,
  Snowflake
} from "lucide-react";

const apartmentImages = [
  "459766223.jpg", "459766310.jpg", "459766319.jpg", "459766323.jpg",
  "459766329.jpg", "459766336.jpg", "459766341.jpg", "459766346.jpg",
  "459766354.jpg", "459766359.jpg", "459766368.jpg", "459766371.jpg",
  "459766375.jpg", "459766378.jpg", "459766383.jpg", "459766388.jpg",
  "459766401.jpg", "459766405.jpg", "459766411.jpg", "459766415.jpg",
  "459766418.jpg", "459766425.jpg", "459766428.jpg", "459766432.jpg",
  "459766445.jpg", "459766451.jpg", "461910370.jpg", "461910375.jpg",
  "461910376.jpg", "461910378.jpg", "461910380.jpg", "461910451.jpg",
  "462580725.jpg", "462580726.jpg", "464126513.jpg", "464153459.jpg",
  "464899801.jpg", "464900127.jpg", "638066411.jpg", "638066781.jpg",
  "638070851.jpg", "638071057.jpg", "638071432.jpg", "638071933.jpg",
  "638072972.jpg", "638073138.jpg", "638074158.jpg", "735142474.jpg",
  "735142477.jpg"
];

const roomsData = [
  {
    title: "1. Fő Hálószoba (Szülői háló)",
    type: "Külön nyíló hálószoba",
    features: "1 kényelmes queen méretű franciaágy, prémium ágynemű, gardróbszekrény és éjjeliszekrények.",
    benefit: "Csendes, elszeparált nyugodt alvótér a szülőknek egy fárasztó túranap után.",
    icon: Bed,
  },
  {
    title: "2. Második Hálószoba (Nappali szoba)",
    type: "Tágas kapcsolódó alvótér",
    features: "1 teljes értékű franciaágy, amely közvetlenül az élettérhez kapcsolódik (nyitottabb spací kút jelleg).",
    benefit: "Kényelmes, prémium fekhely a fiatalok számára, közvetlen közelségben a nappalihoz.",
    icon: Bed,
  },
  {
    title: "Nappali & Családi Étkezősarok",
    type: "Világos közösségi élettér",
    features: "Síkképernyős műholdas LCD televízió (kábel- és műholdcsatornák), étkezőasztal 4 kényelmes székkel, közvetlen teraszkapcsolat.",
    benefit: "A közös esti társasozások, beszélgetések és családi étkezések központi helyszíne.",
    icon: Tv,
  },
  {
    title: "Fürdőszoba & Külön Privát WC",
    type: "Két külön helyiség",
    features: "Modern burkolatú fürdőszoba zuhanyfülkével, hajszárítóval, prémium törölközőkkel és piperecikkekkel. Külön helyiségben lévő privát WC kézmosóval.",
    benefit: "A szeparált WC óriási előny 4 fős család reggeli és esti készülődésénél: nincs sorban állás!",
    icon: Bath,
  },
  {
    title: "2 Külön Panorámás Erkély / Terasz",
    type: "Közvetlen hegyi kilátás",
    features: "2 saját erkély/terasz kényelmes kerti bútorokkal, közvetlen, akadálytalan kilátással a Magas-Tátra sziklacsúcsaira.",
    benefit: "Reggeli kávézás a felkelő napban és esti forró tea a havas hegycsúcsok látványával.",
    icon: Home,
  },
];

const kitchenTech = [
  { title: "Indukciós főzőlap", desc: "Gyors és biztonságos felület főzéshez" },
  { title: "Hűtőszekrény & Fagyasztó", desc: "Külön fagyasztórekesszel ételeknek, italoknak" },
  { title: "Mikrohullámú sütő", desc: "Ételek gyors felmelegítéséhez túra után" },
  { title: "Elektromos vízforraló", desc: "Reggeli teához és forró kávéhoz" },
  { title: "Edénykészlet & Kések", desc: "Lábosok, serpenyők, vágódeszkák, éles kések" },
  { title: "Étkészlet 4 főre", desc: "Tányérok, evőeszközök, bögrék és borospoharak" },
  { title: "Optikai Szupergyors Wi-Fi", desc: "Ingyenes, vendégek által 9,5-re értékelt stabil hálózat" },
  { title: "Szabályozható fűtés", desc: "Helyiségenként külön állítható hőmérséklet, 24h felügyelet" },
];

const distances = [
  { dest: "Helyi buszmegálló", dist: "10 m", time: "1 percen belül gyalog", desc: "Közvetlen buszjárat Ótátrafüredre és Tátralomnicra", icon: Bus },
  { dest: "Pod lesom vasútállomás", dist: "kb. 900 m", time: "10-12 perc kényelmes séta", desc: "Tátrai Villamos (TEŽ): Csorba-tó, Ótátrafüred és Poprád felé", icon: Train },
  { dest: "Ótátrafüred (Starý Smokovec)", dist: "2,9 km", time: "4 perc autó / 9 perc villamos", desc: "Sikló Hrebienokra, Jégdóm, Tricklandia szórakoztató központ", icon: MapPin },
  { dest: "Tátralomnic (Tatranská Lomnica)", dist: "6,0 km", time: "8 perc autó / 14 perc vonat", desc: "Sípályák, kabinos felvonó a Kő-pataki-tóhoz és Lomnici-csúcsra", icon: MapPin },
  { dest: "AquaCity Poprad Élményfürdő", dist: "10,0 km", time: "12 perc autó / 16 perc villamos", desc: "13 beltéri-kültéri termálmedence, lézershow és wellness", icon: Waves },
  { dest: "Csorba-tó (Štrbské Pleso)", dist: "21,0 km", time: "22 perc autó / 50 perc villamos", desc: "Híres alpesi tókerülő téli séta, sípályák, lenyűgöző panoráma", icon: MapPin },
];

export default function ApartmentSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxActive, setIsLightboxActive] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tezModalOpen, setTezModalOpen] = useState(false);
  const [tezImageLoading, setTezImageLoading] = useState(false);
  const [dividerActive, setDividerActive] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  const addressText = "Zakladateľov 387, 059 86 Nová Lesná, Szlovákia";

  // Preload the 4 highlight card images immediately on mount so opening them is instantaneous
  useEffect(() => {
    const preloadUrls = [
      "/pictures/apartment/638071432.webp",
      "/pictures/apartment/464126513.webp",
      "/pictures/apartment/459766368.webp",
      "/pictures/tez/tez_tatry_magyar.webp",
    ];
    preloadUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const getImageLabel = (filename: string) => {
    if (filename === "459766368.jpg") {
      return {
        title: "Privát Wellness a Villában",
        subtitle: "Finn szauna & Pezsgőfürdő (Jacuzzi)",
      };
    }
    if (filename === "464126513.jpg") {
      return {
        title: "60 m² Kétszobás Apartman",
        subtitle: "Prémium belső tér, külön hálószobák és hegyi panoráma",
      };
    }
    if (filename === "638071432.jpg") {
      return {
        title: "9,9 / 10 Kivételes Értékelés",
        subtitle: "920+ valós vendégértékelés a Booking.com-on",
      };
    }
    return null;
  };

  const openLightbox = (index: number) => {
    setImageLoading(true);
    setSelectedImageIndex(index);
  };

  const openCardImage = (filename: string) => {
    const idx = apartmentImages.indexOf(filename);
    openLightbox(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setIsLightboxActive(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
    }, 250);
  };

  const openTezModal = () => {
    setTezImageLoading(true);
    setTezModalOpen(true);
  };

  useEffect(() => {
    if (selectedImageIndex !== null) {
      const frame = requestAnimationFrame(() => {
        setIsLightboxActive(true);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setIsLightboxActive(false);
    }
  }, [selectedImageIndex]);

  // IntersectionObserver for scroll-triggered entrance animation on desktop & mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Robust scroll & intersection detector for the winter reindeer-sled track divider
  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when the divider is clearly approaching/inside the visible area (top < 85% of screen height)
      const inView = rect.top < windowHeight * 0.88 && rect.bottom > 40;

      if (inView) {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setDividerActive(true);
          setAnimKey((prev) => prev + 1);
        }
      } else {
        // Reset when user scrolls sufficiently far away (e.g., back up to top) so it re-plays next time
        if (rect.top > windowHeight + 150 || rect.bottom < -150) {
          if (hasTriggeredRef.current) {
            hasTriggeredRef.current = false;
            setDividerActive(false);
          }
        }
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    // Initial check with a tiny delay to ensure proper layout computation
    const timer = setTimeout(checkVisibility, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // Keyboard navigation for Lightbox & Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        setTezModalOpen(false);
      }
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % apartmentImages.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + apartmentImages.length) % apartmentImages.length : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section
      id="apartman"
      ref={sectionRef}
      className="scroll-mt-0 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header with Tilted 3D Showcase Photo (459766346.jpg) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 mb-12 sm:mb-16">
        {/* Left: Headline & Description */}
        <div
          className={`flex-1 text-center lg:text-left transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-extrabold tracking-tight mb-4 leading-tight px-3 sm:px-6">
            <span className="block text-4xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)]">
              Villa Greystone
            </span>
            <span className="block text-right">
              <span className="inline-block text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide mt-1.5 sm:mt-2 bg-gradient-to-r from-sky-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                apartman
              </span>
            </span>
          </h2>
          <p
            className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-6 px-3 sm:px-6 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
            lang="hu"
          >
            Alsóerdőfalva (Nová Lesná / Starý Smokovec) • Modern 2 szobás prémium hegyi apartman, bőséges reggeli, privát wellness és lélegzetelállító tátrai panoráma közvetlenül a szobákból és az erkélyről.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300 w-full">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-sky-500/30 text-sky-300 font-semibold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              60 m² Kétszobás Apartman
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              9,9 / 10 Kivételes Értékelés
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 font-medium shadow-sm">
              2 saját hegyi panorámás erkély
            </span>
          </div>
        </div>

        {/* Right: Tilted 3D Photo Card (459766346.jpg) */}
        <div
          className={`shrink-0 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] transition-all duration-1000 delay-200 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-90"
          }`}
        >
          <div
            onClick={() => {
              const idx = apartmentImages.indexOf("459766346.jpg");
              openLightbox(idx !== -1 ? idx : 0);
            }}
            title="Kattints a nagyításhoz!"
            className="group relative cursor-pointer select-none transform -rotate-2 sm:-rotate-3 hover:rotate-0 hover:scale-[1.03] transition-all duration-500 ease-out"
          >
            {/* Real Deep Black Drop Shadow Projection */}
            <div className="absolute inset-1.5 bg-black/95 rounded-2xl sm:rounded-3xl blur-2xl transform translate-y-6 translate-x-2 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:translate-y-8 transition-all duration-500" />

            {/* Thin Elegant White Photo Frame with Crisp Contrast */}
            <div className="relative p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl bg-white border border-white shadow-[0_25px_60px_-10px_rgba(0,0,0,0.98),0_12px_28px_rgba(0,0,0,0.9)] group-hover:shadow-[0_35px_80px_-10px_rgba(0,0,0,1),0_18px_36px_rgba(0,0,0,0.95)] transition-all duration-500">
              <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <picture>
                  <source srcSet="/pictures/apartment/459766346.webp" type="image/webp" />
                  <img
                    src="/pictures/apartment/459766346.jpg"
                    alt="Villa Greystone Apartman"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>

                {/* Corner Alpine Glass Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wide">Villa Greystone • Nová Lesná</span>
                </div>

                {/* Top-right zoom hint */}
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-white/90 group-hover:text-white border border-white/10 group-hover:border-sky-400/50 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Highlight Cards Strip with Interactive Links */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 transition-all duration-1000 delay-300 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <button
          type="button"
          onClick={() => openCardImage("638071432.jpg")}
          className="glass-panel p-4 rounded-2xl border border-amber-400/30 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-400/60 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer group shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.3)] block w-full"
        >
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1 group-hover:scale-105 transition-transform">
            <Star className="w-5 h-5 fill-amber-400" />
            <span className="text-2xl sm:text-3xl font-black text-white">9,9</span>
            <span className="text-xs text-amber-300">/ 10</span>
          </div>
          <p className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center justify-center gap-1">
            <span>Kivételes Értékelés</span>
            <Maximize2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">920+ valós vélemény • Fotó 🔍</p>
        </button>

        <button
          type="button"
          onClick={() => openCardImage("464126513.jpg")}
          className="glass-panel p-4 rounded-2xl border border-sky-400/30 bg-sky-500/5 hover:bg-sky-500/15 hover:border-sky-400/60 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer group shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.3)] block w-full"
        >
          <div className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform">60 m²</div>
          <p className="text-xs font-bold text-sky-300 uppercase tracking-wide flex items-center justify-center gap-1">
            <span>2 Szobás Apartman</span>
            <Maximize2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">2 franciaágy • Fotó 🔍</p>
        </button>

        <button
          type="button"
          onClick={() => openCardImage("459766368.jpg")}
          className="glass-panel p-4 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-400/60 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer group shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.3)] block w-full"
        >
          <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
            <Waves className="w-5 h-5" />
            <span className="text-xl sm:text-2xl font-black text-white">Wellness</span>
          </div>
          <p className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center justify-center gap-1">
            <span>Szauna & Jacuzzi</span>
            <Maximize2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Privát relaxáció • Fotó 🔍</p>
        </button>

        <button
          type="button"
          onClick={openTezModal}
          className="glass-panel p-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 hover:bg-emerald-500/15 hover:border-emerald-400/60 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer group shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.3)] block w-full"
        >
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1 group-hover:scale-105 transition-transform">
            <Train className="w-5 h-5" />
            <span className="text-xl sm:text-2xl font-black text-white">TEŽ Vasút</span>
          </div>
          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center justify-center gap-1">
            <span>Pod lesom állomás</span>
            <Maximize2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">12 perc séta • Hálózati térkép 🔍</p>
        </button>
      </div>

      {/* Main Info Dossier Box: Host, Address, Contact & PDF Download */}
      <div id="apartman-info" className="scroll-mt-24 sm:scroll-mt-28 glass-panel-warm p-6 sm:p-8 rounded-3xl border border-amber-500/30 mb-12 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Villa Greystone • 3 Csillagos Prémium Hegyi Apartmanház (8 önálló egység)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Alapadatok, Elhelyezkedés & Kapcsolat
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Pontos cím:</span> {addressText}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white font-medium">Házigazda / Menedzser:</span>{" "}
                  <span className="text-amber-300 font-semibold">Rado</span> (
                  <a href="tel:+421915966745" className="hover:underline text-white font-mono">
                    +421 915 966 745
                  </a>
                  )
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white font-medium">Recepció & Biztonság:</span> 24 órás felügyelet
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white font-medium">Értékelések:</span> Tisztaság: 10/10 • Kényelem: 9,9/10 • Személyzet: 9,9/10
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Google Maps, Copy Address & Official PDF */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="https://maps.google.com/?q=Villa+Greystone+Zakladatelov+387+Nova+Lesna"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-sky-200 border border-sky-500/30 hover:border-sky-400 transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Megnyitás Google Térképen</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={handleCopyAddress}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Cím vágólapra másolva!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Cím másolása</span>
                </>
              )}
            </button>

            <a
              href="/docs/Villa_Greystone_ismerteto.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Részletes Szállásdosszié (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Apartment Structure & Rooms Section (60 m²) */}
      <div id="apartman-szobak" className="scroll-mt-24 sm:scroll-mt-28 mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              A Két Szobás Apartman Felépítése (60 m²)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Elegáns parketta, prémium belsőépítészet, 2 saját panorámás erkély közvetlen kilátással a Tátra csúcsaira.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomsData.map((room, idx) => {
            const Icon = room.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-sky-500/20 hover:border-sky-400/50 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-sans">{room.title}</h4>
                      <span className="text-[11px] font-medium text-sky-400">{room.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full" lang="hu">
                    {room.features}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-amber-200/90 flex items-start gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full" lang="hu">
                    <strong>Családi szempont:</strong> {room.benefit}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick Summary Card */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_25px_rgba(245,158,11,0.18)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-bold text-white font-sans">Miért tökéletes számunkra?</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                <li>• Kényelmesen elfér a 4 fős család (2 db franciaágy)</li>
                <li>• Külön WC kézmosóval – gyorsabb reggeli készülődés</li>
                <li>• 2 saját erkély közvetlen Magas-Tátra hegyi panorámával</li>
                <li>• Csendes, nyugodt hegyi alpesi környezet</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300 font-medium">
              Villa Greystone • Nová Lesná
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen Equipment & Technology Grid */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Konyhai Felszereltség & Technológiai Háttér
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Teljes önellátásra felszerelve a függetlenségért, modern technika a maximális kényelemért.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {kitchenTech.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-amber-400/40 shadow-[0_8px_24px_rgba(0,0,0,0.65)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.85),0_0_15px_rgba(245,158,11,0.2)] hover:-translate-y-0.5 transition-all"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mb-2" />
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1 font-sans">{item.title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breakfast, Café & In-House Wellness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {/* Breakfast & On-site Café */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-sans">Bőséges Reggeli & Kávézó Helyben</h4>
              <span className="text-xs text-amber-400 font-medium">A villa saját reggelizője és bárja</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full" lang="hu">
            A vendégértékelések kiemelkedően magasra értékelték a helyszíni reggeli színvonalát! Svédasztalos büfé, à la carte és kontinentális választék: friss pékáru, felvágottak, prémium sajtok, zöldségek, meleg ételek, kérésre készített kávék (pl. caffe latte) és gyümölcslevek.
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-sm text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full" lang="hu">
            <span className="text-amber-400 font-semibold">Földszinti Kávézó & Bár: </span>
            A kirándulásból visszatérve forró italokat vagy hűsítő frissítőket fogyaszthattok a hangulatos bárban.
          </div>
        </div>

        {/* In-House Wellness & Relaxation */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-sans">Privát Wellness a Villában</h4>
              <span className="text-xs text-cyan-400 font-medium">Finn szauna & Jacuzzi a házban</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-4">
            <li>
              <strong className="text-white">Finn szauna:</strong> Klasszikus forró köves szauna izomlazításhoz, előzetes egyeztetés alapján fűtik fel a kívánt időpontra.
            </li>
            <li>
              <strong className="text-white">Pezsgőfürdő (Jacuzzi):</strong> Meleg vizű hidromasszázs medence, amelyet <em>privát idősávban</em>, kizárólag a mi családunk vehet igénybe!
            </li>
            <li>
              <strong className="text-white">Pihenőkert & Napozóterasz:</strong> Gondozott hegyi kert kerti bútorokkal és panorámával (ingyenes).
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-sm text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full" lang="hu">
            <span className="text-cyan-400 font-semibold">Gyakorlati tudnivaló: </span>
            A wellness felár ellenében vehető igénybe; a pontos idősávot és díjat a házigazdával (Radóval) érkezéskor érdemes egyeztetni!
          </div>
        </div>
      </div>

      {/* House Rules & Policies */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 mb-14 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-400" />
          <span>Házirend, Bejelentkezés & Szabályzat</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            <div className="text-sky-400 text-xs font-semibold uppercase mb-1">Bejelentkezés (Check-in)</div>
            <div className="text-lg font-bold text-white mb-1">14:00 – 22:00</div>
            <p className="text-xs text-slate-400">Az érkezési időt előre jelezni kell a házigazdának.</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            <div className="text-sky-400 text-xs font-semibold uppercase mb-1">Kijelentkezés (Check-out)</div>
            <div className="text-lg font-bold text-white mb-1">08:00 – 10:00</div>
            <p className="text-xs text-slate-400">Kényelmes reggeli utáni távozás.</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            <div className="text-amber-400 text-xs font-semibold uppercase mb-1">Fizetési mód</div>
            <div className="text-lg font-bold text-white mb-1">Csak Bankkártya</div>
            <p className="text-xs text-slate-400 font-medium text-amber-300/90">
              Fontos: készpénzt a szállás nem fogad el!
            </p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            <div className="text-emerald-400 text-xs font-semibold uppercase mb-1">Parkolás</div>
            <div className="text-lg font-bold text-white mb-1">Ingyenes privát</div>
            <p className="text-xs text-slate-400">Közvetlenül az épület előtti kijelölt parkolóban.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
            <span><strong>Csendes időszak:</strong> 22:00 és 07:00 között a házban kötelező.</span>
          </div>
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>Dohányzás:</strong> A szobákban és a teljes épületben szigorúan tilos.</span>
          </div>
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>Kisállatok:</strong> Házi kedvencek nem hozhatók be az épületbe.</span>
          </div>
        </div>
      </div>

      {/* Transit & Distances Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20 mb-14 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Train className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Közlekedési & Megközelíthetőségi Mutatók
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Menetidők és eljutási lehetőségek közvetlenül a Villa Greystone-tól.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-3 font-semibold">Úti cél / Megálló</th>
                <th className="py-3 px-3 font-semibold">Távolság</th>
                <th className="py-3 px-3 font-semibold">Elérési Mód & Menetidő</th>
                <th className="py-3 px-3 font-semibold">Tudnivaló a Családnak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {distances.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <tr key={idx} className="hover:bg-sky-500/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{row.dest}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-amber-300 whitespace-nowrap">
                      {row.dist}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium whitespace-nowrap">
                      {row.time}
                    </td>
                    <td className="py-3 px-3 text-slate-400 leading-relaxed">
                      {row.desc}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Winter Animated Divider separating Apartment Info from Gallery */}
      <div
        ref={dividerRef}
        onClick={() => {
          hasTriggeredRef.current = true;
          setDividerActive(true);
          setAnimKey((prev) => prev + 1);
        }}
        title="Kattints az animáció újrajátszásához!"
        className="relative w-full h-16 my-10 sm:my-14 overflow-hidden flex items-center select-none cursor-pointer group"
      >
        {/* Subtle base track line that spans full width */}
        <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-700/60 to-transparent group-hover:via-slate-500 transition-colors" />
        <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-500/15 to-transparent blur-[1px]" />

        {/* Drawn Line with Sled & Reindeer - triggered on scroll into view or on click */}
        <div
          key={animKey}
          style={{
            animation: dividerActive
              ? "drawSledLineTrack 3.8s cubic-bezier(0.22, 1, 0.36, 1) forwards"
              : "none",
            width: dividerActive ? undefined : "0%",
          }}
          className={`absolute inset-y-0 left-0 flex items-center ${
            dividerActive ? "animate-draw-sled-line" : "w-0 opacity-0"
          }`}
        >
          {/* Glowing white drawn line */}
          <div className="w-full h-[2.5px] bg-gradient-to-r from-sky-400/30 via-sky-100 via-white to-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_24px_rgba(56,189,248,0.7)]" />

          {/* Sled with Snowflake + Golden Reins + Leaping Reindeer (Szarvas) at the advancing tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[92%] flex items-center select-none pointer-events-none">
            {/* Wooden Sled with Snowflake */}
            <div className="relative flex items-center text-white">
              {/* Ice Sparkles halo glow around sled */}
              <div className="absolute -inset-2 bg-sky-400/25 rounded-full blur-md" />

              {/* Sled SVG */}
              <svg
                viewBox="0 0 38 22"
                className="w-7 h-5 sm:w-8 sm:h-5.5 text-slate-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] relative z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Sled curved runners skimming the line */}
                <path
                  d="M2 18h25c3.5 0 6.5-2 7-6 .2-1.5-.8-2-1.8-2-.8 0-1.2.6-1.5 1.5-.6 2-2 3.5-4.5 3.5H3"
                  fill="currentColor"
                  stroke="none"
                />
                {/* Wooden seat */}
                <path d="M7 10h18" strokeWidth="2.2" stroke="white" />
                {/* Vertical strut supports */}
                <path d="M11 10v7M21 10v7" strokeWidth="1.8" stroke="white" />
              </svg>

              {/* Glowing rotating Snowflake sitting on the sled */}
              <div className="absolute -top-3.5 left-2 z-20">
                <Snowflake
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-200 animate-spin drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                  style={{ animationDuration: "6s" }}
                />
              </div>
            </div>

            {/* Golden Reins connecting Sled to Reindeer */}
            <div className="w-4 sm:w-6 h-[1.8px] bg-gradient-to-r from-amber-300/80 via-amber-200 to-amber-300/90 relative -mx-0.5 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />

            {/* Leaping Reindeer (Szarvas) in front */}
            <div className="relative flex items-center">
              {/* Warm Golden Winter Aura around Reindeer */}
              <div className="absolute -inset-2 bg-amber-400/25 rounded-full blur-md" />

              <svg
                viewBox="0 0 54 40"
                className="w-9 h-7 sm:w-11 sm:h-8 text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] relative z-10"
                fill="currentColor"
              >
                {/* Branching Antlers (Agancsok) */}
                <path
                  d="M36 14 C35 10 33 6 30 4 M33 8 C31 8 29 9 28 11 M36 13 C38 9 41 5 46 3 M40 7 C43 7 45 8 47 10 M44 5 C47 5 49 7 50 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Head and muzzle */}
                <path
                  d="M34 14 C36 13 38 13.5 42 16 C44 17 46 17.5 46 19 C46 20 44 20.5 41 20 C38 19.5 36 18.5 34 19 L32 23"
                />
                {/* Graceful leaping body & tail */}
                <path
                  d="M34 18 C31 22 28 24 23 25 C18 26 13 25 9 23 C7 22 6 21 5 21.5 C4 22 4.5 24 6 25.5 C8 27.5 12 29 17 28.5 C22 28 27 26 31 24 C33 23 35 20.5 35 18 Z"
                />
                {/* Front leaping legs */}
                <path
                  d="M28 25 L34 31 L42 34 M26 25 L31 31 L37 35"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Hind galloping legs */}
                <path
                  d="M14 27 L9 32 L3 35 M11 26 L7 31 L1 33"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Gentle sparkling nose */}
                <circle cx="45" cy="18" r="1.4" fill="#f87171" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Villa Greystone Fotóalbum</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {apartmentImages.length} fotó
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kattints bármelyik képre a teljes képernyős, nagyfelbontású nézethez!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {visibleCount < apartmentImages.length ? (
            <button
              onClick={() => setVisibleCount(apartmentImages.length)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 transition-all"
            >
              Mind a 49 fotó mutatása
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(12)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            >
              Kevesebb mutatása (12 kép)
            </button>
          )}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {apartmentImages.slice(0, visibleCount).map((imgName, index) => (
          <div
            key={imgName}
            onClick={() => openLightbox(index)}
            className="group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-sky-400/50 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-950/50"
          >
            <picture>
              <source srcSet={`/pictures/apartment/${imgName.replace('.jpg', '.webp')}`} type="image/webp" />
              <img
                src={`/pictures/apartment/${imgName}`}
                alt={`Villa Greystone fotó ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
                decoding="async"
              />
            </picture>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <span className="text-xs font-medium text-white drop-shadow">
                #{index + 1}
              </span>
              <div className="p-1.5 rounded-lg bg-sky-500/80 text-white">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button if not expanded */}
      {visibleCount < apartmentImages.length && (
        <div className="text-center mb-12">
          <button
            onClick={() => setVisibleCount(apartmentImages.length)}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 hover:brightness-110 transition-all"
          >
            További {apartmentImages.length - visibleCount} fotó betöltése ({apartmentImages.length} összesen)
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal with Instant GPU-accelerated Transition */}
      {selectedImageIndex !== null && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-200 ease-out flex items-center justify-center overflow-hidden ${
            isLightboxActive ? "bg-black/95 backdrop-blur-md opacity-100 pointer-events-auto" : "bg-black/0 opacity-0 pointer-events-none"
          }`}
          onClick={closeLightbox}
        >
          <div
            className={`w-full h-full flex flex-col justify-between p-3 sm:p-6 transition-all duration-200 ease-out transform ${
              isLightboxActive
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between text-white w-full max-w-6xl mx-auto z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-xs sm:text-sm font-semibold bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                  {selectedImageIndex + 1} / {apartmentImages.length}
                </span>
                {getImageLabel(apartmentImages[selectedImageIndex]) ? (
                  <span className="text-xs sm:text-sm font-bold text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    {getImageLabel(apartmentImages[selectedImageIndex])?.title}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Használd a bal/jobb nyilakat vagy az Esc billentyűt
                  </span>
                )}
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
                aria-label="Bezárás"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Center Image with Prev / Next Buttons */}
            <div
              className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden"
              onClick={closeLightbox}
            >
              {/* Prev button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageLoading(true);
                  setSelectedImageIndex((prev) =>
                    prev !== null ? (prev - 1 + apartmentImages.length) % apartmentImages.length : 0
                  );
                }}
                className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white border border-slate-700 hover:border-sky-400 transition-all shadow-xl"
                aria-label="Előző kép"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Main Picture with Spinner & WebP Picture element */}
              <div
                className="relative max-h-[76vh] sm:max-h-[76vh] max-w-[95vw] sm:max-w-[92vw] flex flex-col items-center justify-center min-h-[220px]"
                onClick={(e) => e.stopPropagation()}
              >
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-10 h-10 border-3 border-sky-400/20 border-t-sky-400 rounded-full animate-spin shadow-lg" />
                  </div>
                )}

                <picture>
                  <source
                    srcSet={`/pictures/apartment/${apartmentImages[selectedImageIndex].replace(".jpg", ".webp")}`}
                    type="image/webp"
                  />
                  <img
                    src={`/pictures/apartment/${apartmentImages[selectedImageIndex]}`}
                    alt={`Villa Greystone teljes kép ${selectedImageIndex + 1}`}
                    onLoad={() => setImageLoading(false)}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className={`max-h-[70vh] sm:max-h-[74vh] max-w-[95vw] sm:max-w-[92vw] object-contain rounded-xl shadow-2xl border border-slate-800 transition-opacity duration-200 ${
                      imageLoading ? "opacity-30" : "opacity-100"
                    }`}
                  />
                </picture>
                {getImageLabel(apartmentImages[selectedImageIndex])?.subtitle && (
                  <div className="mt-2 text-center text-xs sm:text-sm text-slate-300 bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-800 shadow-md">
                    {getImageLabel(apartmentImages[selectedImageIndex])?.subtitle}
                  </div>
                )}
              </div>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageLoading(true);
                  setSelectedImageIndex((prev) =>
                    prev !== null ? (prev + 1) % apartmentImages.length : 0
                  );
                }}
                className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-sky-500 text-white border border-slate-700 hover:border-sky-400 transition-all shadow-xl"
                aria-label="Következő kép"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Thumbnails: hidden on mobile (<sm) to prevent downloading 49 photos at once and stealing bandwidth! Lightweight 3KB webp on desktop */}
            <div
              className="hidden sm:flex w-full max-w-4xl mx-auto overflow-x-auto items-center gap-2 py-2 px-1 no-scrollbar z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {apartmentImages.map((thumb, idx) => (
                <button
                  key={thumb}
                  onClick={() => {
                    setImageLoading(true);
                    setSelectedImageIndex(idx);
                  }}
                  className={`relative shrink-0 w-12 sm:w-14 h-9 sm:h-11 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedImageIndex
                      ? "border-sky-400 scale-105 shadow-md shadow-sky-500/50"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <picture>
                    <source
                      srcSet={`/pictures/apartment/thumbs/${thumb.replace(".jpg", ".webp")}`}
                      type="image/webp"
                    />
                    <img
                      src={`/pictures/apartment/thumbs/${thumb.replace(".jpg", ".webp")}`}
                      alt={`Bélyegkép ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TEŽ Vasúti Hálózat Modal (tez_tatry_magyar.webp - Optimized 118 KB) */}
      {tezModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setTezModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900/95 border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Tátrai Elektromos Vasút (TEŽ) Térkép</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Magyar nyelvű
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pod lesom állomás (Nová Lesná) • Csorba-tó • Ótátrafüred • Tátralomnic
                  </p>
                </div>
              </div>

              <button
                onClick={() => setTezModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Bezárás"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area with Spinner */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-950/60 relative min-h-[240px]">
              {tezImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-10 h-10 border-3 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin shadow-lg" />
                </div>
              )}
              <picture>
                <source srcSet="/pictures/tez/tez_tatry_magyar.webp" type="image/webp" />
                <img
                  src="/pictures/tez/tez_tatry_magyar.jpg"
                  alt="Tátrai Elektromos Vasút TEŽ magyar nyelvű térkép"
                  onLoad={() => setTezImageLoading(false)}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className={`max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-slate-800 transition-opacity duration-200 ${
                    tezImageLoading ? "opacity-30" : "opacity-100"
                  }`}
                />
              </picture>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                💡 A <strong>Pod lesom</strong> állomás mindössze 10-12 perc séta a Villa Greystone apartmantól.
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/pictures/tez/tez_tatry_magyar.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Kép megnyitása teljes méretben</span>
                </a>
                <button
                  onClick={() => setTezModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-bold transition-all"
                >
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
