"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Video, 
  CloudSnow, 
  ExternalLink, 
  ThermometerSnowflake, 
  Play, 
  X, 
  Maximize2, 
  RefreshCw,
  Radio
} from "lucide-react";
import Hls from "hls.js";

interface WebcamData {
  title: string;
  location: string;
  desc: string;
  altitude: string;
  status: string;
  category: string;
  thumbUrl: string;
  streamUrl: string;
  gopassUrl: string;
}

export default function WebcamsSection() {
  const [selectedCam, setSelectedCam] = useState<WebcamData | null>(null);
  const [streamError, setStreamError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const webcams: WebcamData[] = [
    {
      title: "Lomnici-csúcs",
      location: "Lomnický štít",
      desc: "A Magas-Tátra második legmagasabb pontja és a legendás csillagvizsgáló. Lélegzetelállító 360 fokos panoráma a felhők felett, amely tiszta időben egészen a Szepességig és Lengyelországig ellát.",
      altitude: "2 634 m",
      status: "Élő adás",
      category: "Csúcspanoráma",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-9-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM23.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/tatranska-lomnica/webcams?cam=4",
    },
    {
      title: "Lomnici-nyereg",
      location: "Lomnické sedlo",
      desc: "Szlovákia legmagasabban fekvő és legmeredekebb sípályájának rajthelye a Kő-pataki-tó felett. Kiváló rálátás a sziklás gerincekre, a hóviszonyokra és a fekete pályán száguldó síelőkre.",
      altitude: "2 190 m",
      status: "Élő adás",
      category: "Magashegyi síterep",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-76-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM44.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/tatranska-lomnica/webcams?cam=1",
    },
    {
      title: "Kő-pataki-tó",
      location: "Skalnaté pleso II.",
      desc: "A modern nagykabinos felvonó átszállóállomása a Lomnici-csúcs felé, csillagászati obszervatórium és népszerű kilátópont. A tátrai kirándulók és síelők központi hegyi csomópontja.",
      altitude: "1 751 m",
      status: "Élő adás",
      category: "Középállomás & Hegyitó",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-65-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM29.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/tatranska-lomnica/webcams?cam=3",
    },
    {
      title: "Štart Középállomás",
      location: "Štart – Tatranská Lomnica",
      desc: "A Tátralomnicról induló kabinos felvonó első szakasza és a sípályák találkozási pontja. Innen jól megfigyelhető a síelők forgalma, a pálya minősége és a fenyvesek fölé magasodó hegyvonulat.",
      altitude: "1 173 m",
      status: "Élő adás",
      category: "Pályaközpont",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-35-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM34.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/tatranska-lomnica/webcams?cam=5",
    },
    {
      title: "Tátralomnic Völgyállomás",
      location: "Tatranská Lomnica – Údolná stanica",
      desc: "A síközpont völgyi kiindulópontja, felvonó pénztárak, síbérlés és parkolók környéke. Indulás előtt érdemes ellenőrizni az aktuális völgyi időjárást, ködösséget és a reggeli sorban állást.",
      altitude: "904 m",
      status: "Élő adás",
      category: "Völgyállomás",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-36-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM33.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/tatranska-lomnica/webcams?cam=2",
    },
    {
      title: "Tarajka (Hrebienok)",
      location: "Hrebienok – Starý Smokovec",
      desc: "A sikló felső végállomása, a híres Tátrai Jégdóm helyszíne és a 2,5 km-es éjszakai szánkópálya rajtja. Innen indulnak a legszebb téli túrák a Tarpataki-vízesésekhez és a hegyi menedékházakhoz.",
      altitude: "1 285 m",
      status: "Élő adás",
      category: "Szánkópálya & Jégdóm",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-43-640.jpg",
      streamUrl: "https://stream.profi-net.sk/tmr/STREAM14.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/stary-smokovec/webcams?cam=2",
    },
    {
      title: "Csorba-tó Sáncok & Pályák",
      location: "Štrbské Pleso – Areál snov",
      desc: "A legendás síugrósáncok lábánál fekvő versenyközpont és a Solisko ülőlift alsó állomása. Élő körkép a sípályák hóállapotáról és a sífutók számára előkészített pályákról.",
      altitude: "1 350 m",
      status: "Élő adás",
      category: "Síterep & Sáncok",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-199-640.jpg",
      streamUrl: "https://stream.profi-net.sk/strba/STRB_AREAL.stream/chunklist_w1991372123.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/strbske-pleso/webcams?cam=3",
    },
    {
      title: "Csorba-tó Téli Panoráma",
      location: "Štrbské Pleso – Jazero & Panoráma",
      desc: "Békés kilátás a befagyott tengerszemre, a hólepte fenyőfákra és a háttérben őrt álló magas-tátrai csúcsokra. A népszerű téli tókerülő séta kiinduló pontjának aktuális látványképe.",
      altitude: "1 350 m",
      status: "Élő adás",
      category: "Tóparti panoráma",
      thumbUrl: "https://cdn-dwh.tmr.sk/api/v2/file-fetch/uploads/cams/cam-210-640.jpg",
      streamUrl: "https://stream.profi-net.sk/strba/PANORAMA_VT.stream/playlist.m3u8",
      gopassUrl: "https://gopass.travel/HU/resort/strbske-pleso/webcams?cam=4",
    },
  ];

  const weatherLinks = [
    {
      name: "SHMÚ Szlovák Meteorológia",
      desc: "A legpontosabb helyi hivatalos szlovák előrejelzés és magashegyi figyelmeztetések.",
      url: "https://www.shmu.sk/sk/?page=1",
    },
    {
      name: "Ventusky Élő Időjárás Radar",
      desc: "Interaktív szél-, csapadék- és valós idejű hóréteg-térkép a Magas-Tátra felett.",
      url: "https://www.ventusky.com/hu/49.138;20.219",
    },
    {
      name: "Bergfex Hójelentés & Síinfó",
      desc: "Friss hóvastagság adatok, nyitott sípályák és üzemelő felvonók hivatalos listája.",
      url: "https://hu.bergfex.com/vysoke-tatry-tatranska-lomnica/",
    },
    {
      name: "HZS Hegyi Mentőszolgálat",
      desc: "Hivatalos lavina-előrejelzés és téli magashegyi túraútvonalak járhatósági jelentése.",
      url: "https://hzs.sk/",
    },
  ];

  const handleOpenModal = (cam: WebcamData) => {
    setStreamError(false);
    setSelectedCam(cam);
    setRefreshKey((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setSelectedCam(null);
  };

  // Video Stream setup with Hls.js or native HLS (Safari)
  useEffect(() => {
    if (!selectedCam || !videoRef.current) return;

    const video = videoRef.current;
    setStreamError(false);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = selectedCam.streamUrl;
      video.play().catch(() => {});
    } else if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(selectedCam.streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.warn("HLS fatal error, falling back to live snapshot image", data);
          setStreamError(true);
          hls.destroy();
        }
      });
      hlsRef.current = hls;
    } else {
      setStreamError(true);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedCam]);

  // Keyboard navigation (Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCam) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCam]);

  return (
    <section id="webkamerak" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header: Clean title without pill badge as per UI rules */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Élő Webkamerák
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Nézz rá a hegyekre indulás előtt! Tiszta az idő a csúcson, vagy köd ül a völgyben? Van elég hó a szánkózáshoz?
        </p>
      </div>

      {/* Webcams Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {webcams.map((cam, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border-2 border-sky-500/35 hover:border-sky-400/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.12)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.3)] ring-1 ring-white/5 hover:ring-sky-400/30"
          >
            <div>
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {cam.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>{cam.status}</span>
                </span>
              </div>

              {/* Title row with icon & dual-language name & altitude in new line */}
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30 shadow-md mt-0.5">
                  <Video className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                    {cam.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-400/90 mt-0.5 truncate">
                    {cam.location}
                  </p>
                  <p className="text-xs font-semibold text-sky-300 flex items-center gap-1.5 mt-1">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{cam.altitude}</span>
                  </p>
                </div>
              </div>

              {/* Description text - Full width, justified, hyphenated as per UI rules */}
              <p
                lang="hu"
                className="text-xs text-slate-300 leading-relaxed mb-3 text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
              >
                {cam.desc}
              </p>

              {/* Live Webcam Snapshot Card with Clickable Zoom & Hover Play Button */}
              <div
                onClick={() => handleOpenModal(cam)}
                className="relative aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/70 shadow-inner group/img cursor-pointer mb-3.5 select-none"
                title={`${cam.title} – Kattints az élő videóadás megnyitásához!`}
              >
                <img
                  src={refreshKey > 0 ? `${cam.thumbUrl}?v=${refreshKey}` : cam.thumbUrl}
                  alt={`${cam.title} webkamera élőkép`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Top-left LIVE indicator badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-md text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ÉLŐ KÉP</span>
                </div>

                {/* Top-right Altitude badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-white/10 text-sky-200 text-[10px] font-semibold shadow-md flex items-center gap-1">
                  <ThermometerSnowflake className="w-3 h-3 text-sky-400" />
                  <span>{cam.altitude}</span>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xl transform scale-95 group-hover/img:scale-100 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Élő adás lejátszása</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Open Live Modal & Gopass Link */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleOpenModal(cam)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/35 text-sky-200 border border-sky-400/30 hover:border-sky-400/60 transition-all cursor-pointer flex-1 justify-center shadow-sm"
                title={`${cam.title} élő adás megnyitása`}
              >
                <Play className="w-3 h-3 fill-sky-200" />
                <span>Élő adás</span>
              </button>

              <a
                href={cam.gopassUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                title={`${cam.title} hivatalos Gopass weboldal`}
              >
                <span>Gopass</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream / Camera Fullscreen Modal */}
      {selectedCam && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900/95 border border-sky-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 shrink-0">
                  <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
                    <span>{selectedCam.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                      Élő adás
                    </span>
                  </h3>
                  <p className="text-xs text-amber-400/90 truncate">
                    {selectedCam.location} • {selectedCam.altitude}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setRefreshKey((prev) => prev + 1)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Kép frissítése"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Bezárás"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video / Snapshot Player Area */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col items-center justify-center bg-black/80 relative overflow-hidden min-h-[300px]">
              {!streamError ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  muted
                  poster={refreshKey > 0 ? `${selectedCam.thumbUrl}?v=${refreshKey}` : selectedCam.thumbUrl}
                  className="w-full max-h-[68vh] rounded-xl object-contain shadow-2xl bg-black"
                />
              ) : (
                <div className="relative w-full flex flex-col items-center justify-center">
                  <img
                    src={refreshKey > 0 ? `${selectedCam.thumbUrl}?v=${refreshKey}` : selectedCam.thumbUrl}
                    alt={`${selectedCam.title} élő kép`}
                    className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-slate-800"
                  />
                  <div className="mt-3 px-3 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <ThermometerSnowflake className="w-3.5 h-3.5" />
                    <span>Közvetlen élő fotó-adás (frissítve: most)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/85 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Közvetlen élő adás a Tatry Mountain Resorts (TMR) szerveréről.</span>
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href={selectedCam.gopassUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Megnyitás Gopass oldalon</span>
                </a>

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-teal-400 hover:brightness-110 text-slate-950 font-bold transition-all cursor-pointer"
                >
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Radar Links Hub */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <CloudSnow className="w-5 h-5 text-sky-400" />
          <span>Megbízható Időjárás és Hóelőrejelzés Források</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weatherLinks.map((wl, idx) => (
            <a
              key={idx}
              href={wl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between mb-1.5">
                  <span>{wl.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400" />
                </h4>
                <p
                  lang="hu"
                  className="text-xs text-slate-400 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  {wl.desc}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-sky-400 mt-3 block">
                Megnyitás böngészőben →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
