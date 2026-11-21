"use client";

import React, { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";

interface Flake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Generate flakes on client only
    const flakes: Flake[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 6,
        size: 10 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.6,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {/* Floating Snow Toggle Button */}
      <button
        onClick={() => setIsEnabled((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md bg-slate-900/80 border border-sky-400/30 text-sky-200 hover:text-white hover:border-sky-400 shadow-lg shadow-sky-950/50 transition-all hover:scale-105"
        title={isEnabled ? "Hóesés kikapcsolása" : "Hóesés bekapcsolása"}
      >
        <Snowflake className={`w-4 h-4 ${isEnabled ? "text-sky-300 animate-spin" : "text-slate-400"}`} style={{ animationDuration: "12s" }} />
        <span>{isEnabled ? "Hóesés: Be" : "Hóesés: Ki"}</span>
      </button>

      {/* Render Falling Snowflakes */}
      {isEnabled && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden="true">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}vw`,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
                opacity: flake.opacity,
                fontSize: `${flake.size}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}
    </>
  );
}
