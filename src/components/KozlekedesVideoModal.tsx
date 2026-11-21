"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Sparkles } from "lucide-react";

type TransitionStage = "playing" | "fade-black" | "fade-page";

export default function KozlekedesVideoModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [stage, setStage] = useState<TransitionStage>("playing");
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth two-phase manual close: video fades to black first, then page fades in
  const handleClose = useCallback(() => {
    setStage("fade-black");
    setTimeout(() => {
      setStage("fade-page");
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }, 450);
  }, []);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    // Unlock body scroll once the page starts fading in
    if (stage === "fade-page") {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, isOpen, stage, handleClose]);

  // Automatic 19-21s cinematic transition:
  // 19.0s: Video smoothly fades to pitch black (750ms)
  // 19.8s: Fullscreen black screen dissolves, smoothly fading the website content in (1100ms)
  // 21.0s: Modal unmounts completely
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const blackTimer = setTimeout(() => {
      setStage("fade-black");
    }, 19000);

    const revealTimer = setTimeout(() => {
      setStage("fade-page");
    }, 19800);

    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 21000);

    return () => {
      clearTimeout(blackTimer);
      clearTimeout(revealTimer);
      clearTimeout(closeTimer);
    };
  }, [mounted, isOpen]);

  if (!mounted || !isOpen) return null;

  const isFadingToBlack = stage === "fade-black" || stage === "fade-page";
  const isRevealingPage = stage === "fade-page";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#060c14] flex items-center justify-center p-3 sm:p-6 transition-opacity duration-1000 ease-in-out ${
        isRevealingPage ? "opacity-0 pointer-events-none" : "opacity-100 animate-modal-backdrop"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tátrai felvezető videó"
    >
      {/* Video Container: Vertical 9:16 aspect ratio centered */}
      <div
        className={`relative w-full max-w-[380px] sm:max-w-[420px] h-[86vh] sm:h-[88vh] max-h-[760px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-sky-400/40 shadow-2xl shadow-sky-500/25 flex flex-col transition-all duration-700 ease-out ${
          isFadingToBlack ? "border-transparent shadow-none" : "animate-modal-expand"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 19-second Slim Ambient Progress Line */}
        <div
          className={`absolute top-0 inset-x-0 h-1 bg-white/10 z-50 overflow-hidden pointer-events-none transition-opacity duration-500 ${
            isFadingToBlack ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-full bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300 animate-progress-19s" />
        </div>

        {/* Top Info Badge */}
        <div
          className={`absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[11px] text-sky-200 pointer-events-none transition-opacity duration-500 ${
            isFadingToBlack ? "opacity-0" : "opacity-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-semibold">Štrbské Pleso • TEŽ</span>
        </div>

        {/* Close Button in the top right */}
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/80 hover:bg-sky-500 text-white hover:text-slate-950 border border-white/25 hover:border-sky-400 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
            isFadingToBlack ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Videó bezárása"
          title="Bezárás (ESC)"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Embedded YouTube Shorts Video muted & autostarted */}
        <div className="w-full h-full relative bg-black">
          <iframe
            ref={iframeRef}
            id="yt-shorts-iframe"
            src="https://www.youtube.com/embed/7GBmdPftOOM?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&enablejsapi=1"
            title="Štrbské Pleso Rail Station in High Tatras"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Cinematic Blackout Veil: fades in over the video to turn it completely black */}
        <div
          className={`absolute inset-0 z-40 bg-black pointer-events-none transition-opacity duration-700 ease-in-out ${
            isFadingToBlack ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Bottom Skip Bar */}
        <div
          className={`absolute bottom-3 inset-x-4 z-30 transition-opacity duration-500 ${
            isFadingToBlack ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <button
            onClick={handleClose}
            className="w-full py-2 px-3 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-xs text-slate-200 hover:text-white transition-all text-center backdrop-blur-md font-medium shadow-lg"
          >
            Tovább a közlekedési oldalra ➔
          </button>
        </div>
      </div>
    </div>
  );
}
