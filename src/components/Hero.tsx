"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    setMounted(true);
    const target = new Date("2027-01-28T06:00:00+01:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[100dvh] flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8 overflow-hidden text-center"
    >
      {/* Background Image with Alpine Dark Veil ("fátyol") */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hero photo */}
        <Image
          src="/pictures/hero.jpg"
          alt="Magas-Tátra"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65 select-none"
        />

        {/* Color veil matching the website's deep night alpine theme, softened for high mountain visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(13,30,51,0.25)_0%,rgba(6,12,20,0.50)_60%,rgba(3,7,13,0.82)_100%)]" />

        {/* Soft mountain auroral light overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[350px] sm:h-[500px] bg-sky-500/15 rounded-full blur-[140px]" />

        {/* Seamless blend to the content below */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#060c14] via-[#060c14]/60 to-transparent" />
      </div>

      {/* Hero Content: Title shifted higher up with modern glassmorphism countdown below */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <h1 className="text-center px-2 drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)]">
          <span className="block text-lg sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:font-semibold text-sky-100/90 tracking-normal mb-1 sm:mb-3">
            Irány ismét a
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-white leading-tight sm:leading-none whitespace-nowrap">
            Magas-Tátra!
          </span>
        </h1>

        {/* Modern & Elegant Glassmorphism Countdown Timer */}
        <div className="mt-6 sm:mt-8 md:mt-10 inline-flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl bg-slate-950/45 backdrop-blur-xl border border-sky-400/25 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(56,189,248,0.15)] ring-1 ring-white/10">
          {/* Nap */}
          <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[96px] md:min-w-[110px] px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-sky-500/15 via-slate-900/50 to-slate-950/70 border border-sky-400/20 shadow-inner">
            <span className="font-sans tabular-nums text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
              {mounted ? String(timeLeft.days).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-200/80 mt-1">
              nap
            </span>
          </div>

          <span className="text-xl sm:text-3xl font-light text-sky-300/40 -mt-3 select-none">:</span>

          {/* Óra */}
          <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[96px] md:min-w-[110px] px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-sky-500/15 via-slate-900/50 to-slate-950/70 border border-sky-400/20 shadow-inner">
            <span className="font-sans tabular-nums text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-200/80 mt-1">
              óra
            </span>
          </div>

          <span className="text-xl sm:text-3xl font-light text-sky-300/40 -mt-3 select-none">:</span>

          {/* Perc */}
          <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[96px] md:min-w-[110px] px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-sky-500/15 via-slate-900/50 to-slate-950/70 border border-sky-400/20 shadow-inner">
            <span className="font-sans tabular-nums text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-200/80 mt-1">
              perc
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
