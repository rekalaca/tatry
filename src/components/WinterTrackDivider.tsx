"use client";

import React, { useState, useEffect, useRef } from "react";
import { Snowflake } from "lucide-react";

interface WinterTrackDividerProps {
  className?: string;
  title?: string;
}

export default function WinterTrackDivider({
  className = "",
  title = "Kattints az animáció újrajátszásához!",
}: WinterTrackDividerProps) {
  const [dividerActive, setDividerActive] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const dividerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when the divider is clearly approaching/inside the visible area
      const inView = rect.top < windowHeight * 0.88 && rect.bottom > 40;

      if (inView) {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setDividerActive(true);
          setAnimKey((prev) => prev + 1);
        }
      } else {
        // Reset when user scrolls sufficiently far away so it can re-play
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

    const timer = setTimeout(checkVisibility, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  const handleReplay = () => {
    hasTriggeredRef.current = true;
    setDividerActive(true);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      ref={dividerRef}
      onClick={handleReplay}
      title={title}
      className={`relative w-full h-16 my-8 sm:my-12 overflow-hidden flex items-center select-none cursor-pointer group ${className}`}
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
  );
}
