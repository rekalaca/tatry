"use client";

import React, { useEffect, useState } from "react";

interface Flake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  blur: number;
  drift: number;
  char: string;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    // Generate flakes on client only
    const snowChars = ["❄", "❅", "•", "•", "✻"];
    const flakes: Flake[] = [];
    const count = 46;

    for (let i = 0; i < count; i++) {
      const isCrystalline = Math.random() > 0.4;
      const char = isCrystalline
        ? snowChars[Math.floor(Math.random() * snowChars.length)]
        : "•";

      flakes.push({
        id: i,
        left: Math.random() * 100,
        // Majestic, gentle fall duration
        duration: 7 + Math.random() * 8,
        // Negative delay so flakes are already distributed and falling on initial load
        delay: -(Math.random() * 15),
        size: isCrystalline ? 10 + Math.random() * 14 : 4 + Math.random() * 7,
        opacity: 0.25 + Math.random() * 0.65,
        blur: Math.random() > 0.75 ? 1.5 : 0,
        drift: (Math.random() - 0.4) * 45,
        char,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-20 [mask-image:linear-gradient(to_bottom,black_0%,black_65%,rgba(0,0,0,0.35)_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_65%,rgba(0,0,0,0.35)_85%,transparent_100%)]"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="hero-snowflake"
          style={
            {
              left: `${flake.left}%`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
              fontSize: `${flake.size}px`,
              filter: flake.blur ? `blur(${flake.blur}px)` : undefined,
              "--drift": `${flake.drift}px`,
            } as React.CSSProperties
          }
        >
          {flake.char}
        </div>
      ))}
    </div>
  );
}
