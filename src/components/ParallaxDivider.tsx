"use client";

import React, { useEffect, useRef } from "react";

export default function ParallaxDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Only calculate when visible in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Normalized progress: 0 when entering from bottom, 1 when leaving at top
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

        // Stronger, dramatic parallax slide: ~220px travel
        // As the user scrolls down (progress goes from 0 to 1),
        // the background slides downward into the frame, bringing the high mountain peaks into clear view!
        const shift = (progress - 0.5) * 220;
        imageRef.current.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 sm:h-96 md:h-[440px] lg:h-[500px] overflow-hidden my-8 sm:my-12 select-none border-y border-sky-500/25 shadow-2xl"
      aria-hidden="true"
    >
      {/* Parallax Panoramic Mountain Image with generous top/bottom bleed for deep slide */}
      <div
        ref={imageRef}
        className="absolute -top-36 -bottom-36 inset-x-0 w-full will-change-transform pointer-events-none"
        style={{
          transform: "translate3d(0, 0px, 0)",
        }}
      >
        <picture>
          <source srcSet="/pictures/parralax.webp" type="image/webp" />
          <img
            src="/pictures/parralax.png"
            alt="Magas-Tátra panoráma"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Seamless Alpine Dark Gradient Veils at Top and Bottom */}
      <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-[#060c14] via-[#060c14]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-[#060c14] via-[#060c14]/80 to-transparent pointer-events-none" />

      {/* Soft Mountain Horizon Vignette - crystal clear in the center where the peaks are */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,transparent_45%,rgba(6,12,20,0.55)_100%)]" />

      {/* Glowing horizon accent lines */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />
    </div>
  );
}
