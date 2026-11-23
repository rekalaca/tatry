"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Sparkles, Volume2, VolumeX, Play, Pause, ExternalLink } from "lucide-react";

type TransitionStage = "playing" | "fade-black" | "fade-page";

export default function KozlekedesVideoModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [stage, setStage] = useState<TransitionStage>("playing");
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isEndingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth two-phase cinematic transition: video fades into black, then black dissolves into the page
  const handleClose = useCallback(() => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    setStage("fade-black");
    setTimeout(() => {
      setStage("fade-page");
      setTimeout(() => {
        setIsOpen(false);
      }, 950);
    }, 600);
  }, []);

  // Synchronized time update & automatic cinematic closing at video end
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const current = video.currentTime;
    const duration = video.duration;
    const pct = Math.min(100, Math.max(0, (current / duration) * 100));
    setProgress(pct);

    // Trigger smooth fade 0.3s before end for seamless cinematic transition
    if (duration - current <= 0.35 && !isEndingRef.current) {
      handleClose();
    }
  };

  const handleVideoEnded = () => {
    if (!isEndingRef.current) {
      handleClose();
    }
  };

  // Toggle Play / Pause
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

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

  // Autoplay attempt on mount
  useEffect(() => {
    if (!mounted || !isOpen) return;
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay with sound might fail in some browsers; muted autoplay always succeeds
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [mounted, isOpen]);

  // Fallback timeout: if video fails to report ended within 35s, cleanly close
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const fallbackTimer = setTimeout(() => {
      if (!isEndingRef.current) {
        handleClose();
      }
    }, 35000);

    return () => clearTimeout(fallbackTimer);
  }, [mounted, isOpen, handleClose]);

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
      aria-label="Tátrai Villamos (TEŽ) nyitóvideó"
    >
      {/* Video Container: Vertical 9:16 aspect ratio centered */}
      <div
        className={`relative w-full max-w-[380px] sm:max-w-[420px] h-[86vh] sm:h-[88vh] max-h-[760px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-sky-400/40 shadow-2xl shadow-sky-500/25 flex flex-col transition-all duration-700 ease-out select-none ${
          isFadingToBlack ? "border-transparent shadow-none" : "animate-modal-expand"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real-time Dynamic Progress Line */}
        <div
          className={`absolute top-0 inset-x-0 h-1 bg-white/10 z-50 overflow-hidden pointer-events-none transition-opacity duration-500 ${
            isFadingToBlack ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Info & Instagram Link Badge */}
        <a
          href="https://www.instagram.com/reels/DCt_kMFNFzg/"
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 hover:border-sky-400/60 backdrop-blur-md text-[11px] text-sky-200 hover:text-white transition-all shadow-lg group ${
            isFadingToBlack ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          title="Megnyitás Instagramon (@liptovsky_mlyn • Tatranská Električka)"
          onClick={(e) => e.stopPropagation()}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold tracking-wide">Tatranská Električka</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300 transition-colors ml-0.5" />
        </a>

        {/* Action Controls in Top Right: Mute toggle + Close button */}
        <div
          className={`absolute top-3 right-3 z-30 flex items-center gap-2 transition-opacity duration-500 ${
            isFadingToBlack ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-black/80 hover:bg-slate-800 text-white border border-white/25 hover:border-sky-400 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            aria-label={isMuted ? "Hang bekapcsolása" : "Némítás"}
            title={isMuted ? "Hang bekapcsolása" : "Némítás"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-black/80 hover:bg-sky-500 text-white hover:text-slate-950 border border-white/25 hover:border-sky-400 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            aria-label="Videó bezárása"
            title="Bezárás (ESC)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Native HTML5 Video Element */}
        <div
          className="w-full h-full relative bg-black cursor-pointer overflow-hidden flex items-center justify-center"
          onClick={togglePlayPause}
        >
          <video
            ref={videoRef}
            src="/videos/tez-intro.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onError={handleClose}
            className="w-full h-full object-cover"
          />

          {/* Play/Pause Overlay Indicator on click */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none transition-opacity">
              <div className="p-4 rounded-full bg-black/70 border border-white/30 text-white shadow-2xl">
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </div>
            </div>
          )}
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
            className="w-full py-2.5 px-3 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-xs text-slate-200 hover:text-white transition-all text-center backdrop-blur-md font-medium shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Tovább a közlekedési oldalra</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
