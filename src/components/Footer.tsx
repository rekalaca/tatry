"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Heart, Snowflake, Train, HeartPulse } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isSubpage = pathname !== "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getHref = (hash: string) => {
    return isSubpage ? `/${hash}` : hash;
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isSubpage) {
      e.preventDefault();
      const targetId = hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", hash);
      }
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <Link href={isSubpage ? "/" : "#hero"} className="flex items-center gap-2.5 mb-2 hover:opacity-90 transition-opacity">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/pictures/logo.png"
              alt="Villa Greystone Logo"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Villa Greystone • Magas-Tátra
          </span>
        </Link>

        <p className="text-xs text-sky-300/80 mb-6 font-mono">
          Zakladateľov 387, 059 86 Nová Lesná • Házigazda: Rado (+421 915 966 745)
        </p>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-400 mb-8">
          <Link href={getHref("#apartman")} onClick={(e) => handleAnchorClick(e, "#apartman")} className="hover:text-sky-300 transition-colors">Villa Greystone</Link>
          <span>•</span>
          <Link href="/programok" className="hover:text-sky-300 transition-colors">Programok</Link>
          <span>•</span>
          <Link href="/gasztro" className="hover:text-sky-300 transition-colors">Koliba & Gasztro</Link>
          <span>•</span>
          <Link href="/furdo" className="hover:text-sky-300 transition-colors">Fürdők & Szauna</Link>
          <span>•</span>
          <Link href={getHref("#boltok")} onClick={(e) => handleAnchorClick(e, "#boltok")} className="hover:text-sky-300 transition-colors">Boltok</Link>
          <span>•</span>
          <Link href={getHref("#webkamerak")} onClick={(e) => handleAnchorClick(e, "#webkamerak")} className="hover:text-sky-300 transition-colors">Webkamerák</Link>
          <span>•</span>
          <Link href="/kozlekedes" className="text-sky-400 hover:text-white font-semibold transition-colors flex items-center gap-1">
            <Train className="w-3 h-3" />
            <span>Közlekedés & TEŽ</span>
          </Link>
          <span>•</span>
          <Link href="/ugyelet" className="text-rose-400 hover:text-rose-300 font-semibold transition-colors flex items-center gap-1">
            <HeartPulse className="w-3 h-3" />
            <span>Ügyelet & Patikák</span>
          </Link>
          <span>•</span>
          <Link href="/csomagolas" className="hover:text-sky-300 transition-colors">Csomagolás</Link>
        </div>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/30 transition-all mb-8 shadow-md"
          title="Ugrás az oldal tetejére"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <div className="pt-6 border-t border-slate-900 w-full max-w-md text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <span>Készítette szeretettel a családnak:</span>
          <a
            href="https://rekalaca-webdesign.hu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 font-semibold hover:underline transition-colors"
          >
            rekalaca
          </a>
          <span>❄️ Magas-Tátra</span>
        </div>
      </div>
    </footer>
  );
}
