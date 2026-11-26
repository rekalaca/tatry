"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Compass,
  Utensils,
  Waves,
  ShoppingBag,
  Video,
  Train,
  CheckSquare,
  HeartPulse,
} from "lucide-react";

const navItems = [
  { name: "Apartman", href: "#apartman", icon: Home },
  { name: "Programok", href: "/programok", icon: Compass },
  { name: "Gasztro", href: "/gasztro", icon: Utensils },
  { name: "Fürdők", href: "/furdo", icon: Waves },
  { name: "Boltok", href: "#boltok", icon: ShoppingBag },
  { name: "Webkamerák", href: "#webkamerak", icon: Video },
  { name: "Közlekedés", href: "/kozlekedes", icon: Train },
  { name: "Ügyelet", href: "/ugyelet", icon: HeartPulse },
  { name: "Csomagolás", href: "/csomagolas", icon: CheckSquare },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isSubpage = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          setTimeout(() => {
            elem.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      }
    };

    if (window.location.hash) {
      handleHashScroll();
    }

    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  const resolveHref = (href: string) => {
    if (isSubpage && href.startsWith("#")) {
      return `/${href}`;
    }
    return href;
  };

  const checkIsCurrent = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === href || (href !== "/" && pathname?.startsWith(href));
    }
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-sky-500/20 py-2 sm:py-2.5 shadow-xl shadow-slate-950/50"
          : "bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent py-2.5 sm:py-3.5"
      }`}
    >
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between w-full">
          {/* Logo / Brand - goes out to the left */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3.5 text-white group cursor-pointer hover:scale-[1.02] transition-transform duration-200 shrink-0"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-14 lg:h-14 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform drop-shadow-md">
              <Image
                src="/pictures/logo.png"
                alt="Villa Greystone Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent block leading-tight whitespace-nowrap">
                Villa Greystone
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-sky-400 tracking-wider uppercase block whitespace-nowrap mt-0.5">
                Magas-Tátra Családi Notesz
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links centered on desktop */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 gap-0.5 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = checkIsCurrent(item.href);
              const linkUrl = resolveHref(item.href);

              return (
                <Link
                  key={item.name}
                  href={linkUrl}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium border transition-all duration-200 ease-out transform will-change-transform whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? "bg-sky-500/25 text-white border-sky-400/50 shadow-md shadow-sky-500/20 scale-105"
                      : "text-slate-300 hover:text-white hover:bg-sky-500/15 border-transparent hover:border-sky-400/35 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 transition-transform duration-200 ${
                      isCurrent
                        ? "text-sky-300 scale-110"
                        : "text-sky-400 group-hover:scale-110"
                    }`}
                  />
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Counterweight spacer on wide desktop so the center nav is truly centered */}
          <div className="hidden xl:block w-48 xl:w-56 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50 hover:scale-105 active:scale-95 transition-all"
              aria-label="Menü megnyitása"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth slide & fade animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[550px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-xl border-b border-sky-500/20 px-4 pt-3 pb-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mt-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = checkIsCurrent(item.href);
              const linkUrl = resolveHref(item.href);

              return (
                <Link
                  key={item.name}
                  href={linkUrl}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${idx * 25}ms` : "0ms",
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 transform ${
                    isCurrent
                      ? "text-white bg-sky-500/25 border-sky-400/50 shadow-md shadow-sky-500/25"
                      : "text-slate-200 hover:text-white bg-slate-900/60 hover:bg-sky-500/20 border-slate-800 hover:border-sky-500/40 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/20"
                  } ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? "text-sky-300" : "text-sky-400"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
