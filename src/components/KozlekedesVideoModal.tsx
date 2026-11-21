"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";

export default function KozlekedesVideoModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, isOpen]);

  // YouTube IFrame API integration to detect video completion (state 0 / ENDED)
  useEffect(() => {
    if (!mounted || !isOpen) return;

    let player: any = null;

    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;

      try {
        player = new (window as any).YT.Player("yt-shorts-iframe", {
          events: {
            onStateChange: (event: any) => {
              // 0 = YT.PlayerState.ENDED
              if (event.data === 0) {
                setIsOpen(false);
              }
            },
          },
        });
      } catch {
        // Fallback handled via window message listener
      }
    };

    // Load YouTube API script if not present
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === "function") prevCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Direct postMessage listener fallback from YouTube player
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "onStateChange" && data?.info === 0) {
          setIsOpen(false);
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [mounted, isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Tátrai felvezető videó"
    >
      {/* Video Container: Vertical 9:16 aspect ratio centered, nearly full height on mobile */}
      <div
        className="relative w-full max-w-[380px] sm:max-w-[420px] h-[86vh] sm:h-[88vh] max-h-[760px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border border-sky-400/40 shadow-2xl shadow-sky-500/25 flex flex-col animate-modal-expand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Info Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[11px] text-sky-200 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-semibold">Štrbské Pleso • TEŽ</span>
        </div>

        {/* Close Button in the top right */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/80 hover:bg-sky-500 text-white hover:text-slate-950 border border-white/25 hover:border-sky-400 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Videó bezárása"
          title="Bezárás (ESC)"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Embedded YouTube Shorts Video muted & autostarted */}
        <div className="w-full h-full relative">
          <iframe
            ref={iframeRef}
            id="yt-shorts-iframe"
            src="https://www.youtube.com/embed/7GBmdPftOOM?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&enablejsapi=1&origin=https://localhost"
            title="Štrbské Pleso Rail Station in High Tatras"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Skip Bar */}
        <div className="absolute bottom-3 inset-x-4 z-20">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-3 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-xs text-slate-200 hover:text-white transition-all text-center backdrop-blur-md font-medium shadow-lg"
          >
            Tovább a közlekedési oldalra ➔
          </button>
        </div>
      </div>
    </div>
  );
}
