"use client";

import React, { useState, useEffect, useMemo } from "react";
import liveData from "@/data/tez-live-data.json";
import { Clock, Play, Pause, MapPin, Compass, Train, Sparkles } from "lucide-react";

interface TrainInfo {
  x: number;
  y: number;
  color: string;
  number: string;
  label: string;
  from: string;
  to: string;
  next: string;
  dep: string;
  arr: string;
  progressPercent: number;
}

export default function TezLiveMap() {
  // Default static time during SSR / prerender to avoid Next.js prerender error with `new Date()`
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState<number>(10 * 60); // 10:00
  const [currentWeekday, setCurrentWeekday] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [selectedTrain, setSelectedTrain] = useState<TrainInfo | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>("Pod lesom");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Helper to format minutes to HH:MM
  const formatMinutes = (m: number): string => {
    const hours = Math.floor(m / 60) % 24;
    const mins = Math.floor(m % 60);
    return `${hours < 10 ? "0" : ""}${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  useEffect(() => {
    const readBratislavaTime = () => {
      const now = new Date();
      try {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Bratislava",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).formatToParts(now);

        let h = 0;
        let min = 0;
        for (const p of parts) {
          if (p.type === "hour") h = parseInt(p.value, 10);
          if (p.type === "minute") min = parseInt(p.value, 10);
        }
        if (h === 24) h = 0;
        return h * 60 + min;
      } catch {
        return now.getHours() * 60 + now.getMinutes();
      }
    };

    const readBratislavaWeekday = () => {
      const now = new Date();
      try {
        const dayStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Bratislava",
          weekday: "short",
        }).format(now);
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const idx = days.indexOf(dayStr.slice(0, 3));
        if (idx >= 0) return idx;
      } catch {}
      return (now.getDay() + 6) % 7;
    };

    setIsMounted(true);
    setCurrentTimeMinutes(readBratislavaTime());
    setCurrentWeekday(readBratislavaWeekday());

    const interval = setInterval(() => {
      if (isLive) {
        setCurrentTimeMinutes(readBratislavaTime());
        setCurrentWeekday(readBratislavaWeekday());
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Extract raw data from json
  const { stationCoords, stationNames, destinations, trains } = liveData as {
    stationCoords: Record<string, { x: number; y: number }>;
    stationNames: string[];
    destinations: Record<string, { color: string; label: string }>;
    trains: Array<{
      n: string;
      m: number;
      s: number[];
      t: Array<number | [number, number]>;
    }>;
  };

  const getStationName = (idx: number): string => stationNames[idx] || "";
  const getArrTime = (tArr: Array<number | [number, number]>, idx: number): number => {
    const val = tArr[idx];
    return Array.isArray(val) ? val[0] : val;
  };
  const getDepTime = (tArr: Array<number | [number, number]>, idx: number): number => {
    const val = tArr[idx];
    return Array.isArray(val) ? val[1] : val;
  };

  // Compute active trains currently on tracks
  const activeTrains = useMemo<TrainInfo[]>(() => {
    const now = currentTimeMinutes;
    const result: TrainInfo[] = [];

    for (const tr of trains) {
      // Check weekday mask (1 << currentWeekday)
      if ((tr.m & (1 << currentWeekday)) === 0) continue;

      const lastIdx = tr.s.length - 1;
      const firstDep = getDepTime(tr.t, 0);
      const lastArr = getArrTime(tr.t, lastIdx);

      if (now < firstDep || now > lastArr) continue;

      // Find current leg
      let curIdx = 0;
      for (let i = 0; i <= lastIdx; i++) {
        if (getArrTime(tr.t, i) <= now) {
          curIdx = i;
        }
      }

      if (curIdx >= lastIdx) curIdx = lastIdx - 1;
      const nextIdx = curIdx + 1;

      const depCurrent = getDepTime(tr.t, curIdx);
      const arrNext = getArrTime(tr.t, nextIdx);

      let ratio = 1;
      if (arrNext > depCurrent) {
        ratio = (now - depCurrent) / (arrNext - depCurrent);
      }
      ratio = Math.max(0, Math.min(1, ratio));

      const stFrom = getStationName(tr.s[curIdx]);
      const stNext = getStationName(tr.s[nextIdx]);
      const finalDest = getStationName(tr.s[lastIdx]);
      const origin = getStationName(tr.s[0]);

      const coordA = stationCoords[stFrom] || { x: 50, y: 250 };
      const coordB = stationCoords[stNext] || { x: 50, y: 250 };

      const x = coordA.x + (coordB.x - coordA.x) * ratio;
      const y = coordA.y + (coordB.y - coordA.y) * ratio;

      const destMeta = destinations[finalDest] || destinations["Štrbské Pleso"] || {
        color: "#38bdf8",
        label: `→ ${finalDest}`,
      };

      result.push({
        x,
        y,
        color: destMeta.color,
        number: tr.n,
        label: `${tr.n} ${destMeta.label}`,
        from: origin,
        to: finalDest,
        next: stNext,
        dep: formatMinutes(firstDep),
        arr: formatMinutes(lastArr),
        progressPercent: Math.round(ratio * 100),
      });
    }

    return result;
  }, [currentTimeMinutes, currentWeekday, trains, stationCoords, stationNames, destinations]);

  // Find next departure from a specific station
  const getNextDeparture = (stationName: string, towardsStation?: string): string => {
    let nextTime: number | null = null;
    const now = currentTimeMinutes;

    for (const tr of trains) {
      if ((tr.m & (1 << currentWeekday)) === 0) continue;

      const stNames = tr.s.map((idx) => getStationName(idx));
      const originIdx = stNames.findIndex((name) =>
        name.toLowerCase().includes(stationName.toLowerCase())
      );
      if (originIdx === -1 || originIdx >= tr.s.length - 1) continue;

      if (towardsStation) {
        const towardsIdx = stNames.findIndex((name) =>
          name.toLowerCase().includes(towardsStation.toLowerCase())
        );
        // Must visit towardsStation AFTER the origin station
        if (towardsIdx === -1 || towardsIdx <= originIdx) continue;
      }

      const dep = getDepTime(tr.t, originIdx);
      if (dep > now && (nextTime === null || dep < nextTime)) {
        nextTime = dep;
      }
    }

    return nextTime !== null ? formatMinutes(nextTime) : "--:--";
  };

  // Next departures
  const nextFromPoprad = useMemo(() => getNextDeparture("Poprad-Tatry"), [currentTimeMinutes, currentWeekday]);
  const nextFromStrbske = useMemo(() => getNextDeparture("Štrbské Pleso"), [currentTimeMinutes, currentWeekday]);
  const nextFromPodLesomSmokovec = useMemo(
    () => getNextDeparture("Pod lesom", "Smokovec"),
    [currentTimeMinutes, currentWeekday]
  );
  const nextFromPodLesomPoprad = useMemo(
    () => getNextDeparture("Pod lesom", "Poprad"),
    [currentTimeMinutes, currentWeekday]
  );

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 border border-sky-500/25 shadow-2xl relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with live clock and stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Valós idejű szimuláció & Menetrendi pozíció</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Train className="w-6 h-6 text-sky-400" />
            <span>Tátrai Villamos (TEŽ) Élő Vonatkövető Térkép</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            ŽSR 2025/2026 hivatalos GTFS menetrendje alapján másodpercre kiszámított vonatpozíciók.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setIsLive(true);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isLive
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-md shadow-emerald-500/15"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Élő Idő ({isMounted ? formatMinutes(currentTimeMinutes) : "--:--"})</span>
          </button>

          <button
            onClick={() => setIsLive(!isLive)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all"
            title={isLive ? "Idő megállítása szimulációhoz" : "Lejátszás"}
          >
            {isLive ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Time Slider for quick trip preview */}
      <div className="mb-6 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-medium">
          <span className="flex items-center gap-1 text-sky-400">
            <Compass className="w-3.5 h-3.5" />
            Napi idővonal görgetése utazástervezéshez:
          </span>
          <span className="font-mono text-sm font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800 text-sky-300">
            {formatMinutes(currentTimeMinutes)}
          </span>
        </div>
        <input
          type="range"
          min={4 * 60}
          max={23 * 60 + 30}
          value={currentTimeMinutes}
          onChange={(e) => {
            setIsLive(false);
            setCurrentTimeMinutes(parseInt(e.target.value, 10));
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
        <div className="flex justify-between text-[10px] text-slate-300 mt-1 font-mono">
          <span>04:00 (Első járatok)</span>
          <span>12:00 (Dél)</span>
          <span>18:00 (Délután)</span>
          <span>23:30 (Utolsó járatok)</span>
        </div>
      </div>

      {/* Live Stats KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Pályán lévő vonatok</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{activeTrains.length}</span>
            <span className="text-xs text-emerald-400 font-semibold">aktív szerelvény</span>
          </div>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Indulás Poprádról</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{nextFromPoprad}</span>
            <span className="text-[10px] text-slate-300">következő</span>
          </div>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Indulás Csorbatóról</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono">{nextFromStrbske}</span>
            <span className="text-[10px] text-slate-300">következő</span>
          </div>
        </div>

        {/* Highlight for Villa Greystone: Pod lesom station */}
        <div className="bg-gradient-to-br from-sky-950/60 to-slate-950/90 p-3.5 rounded-2xl border border-sky-400/40 flex flex-col justify-between relative shadow-lg shadow-sky-500/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Pod lesom (900m)
            </span>
            <span className="text-[9px] bg-sky-500/20 text-sky-200 px-1.5 py-0.5 rounded font-semibold">
              Szállásunk mellett
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-300 text-[10px] block font-sans">➔ Hegyek / Smokovec:</span>
              <span className="text-sm font-bold text-emerald-400">{nextFromPodLesomSmokovec}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-300 text-[10px] block font-sans">➔ Völgy / Poprad:</span>
              <span className="text-sm font-bold text-amber-400">{nextFromPodLesomPoprad}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-4 py-2.5 px-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38bdf8] ring-2 ring-sky-300/40" />
          <span className="text-slate-300">Štrbské Pleso felé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f59e0b] ring-2 ring-amber-300/40" />
          <span className="text-slate-300">Poprad-Tatry felé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#10b981] ring-2 ring-emerald-300/40" />
          <span className="text-slate-300">Tatranská Lomnica felé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f43f5e] ring-2 ring-rose-300/40" />
          <span className="text-slate-300">Starý Smokovec felé</span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full overflow-x-auto rounded-2xl bg-[#08121e] border border-sky-500/20 shadow-inner p-2 sm:p-4">
        <div className="min-w-[800px] lg:min-w-0">
          <svg
            id="tez-route-svg"
            viewBox="0 0 880 295"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto select-none overflow-visible"
            role="img"
            aria-label="Tátrai Villamosvasút interaktív élő útvonaltérkép"
          >
            {/* Mountain silhouette background faint lines */}
            <path
              d="M 20 260 L 180 160 L 320 210 L 400 110 L 480 180 L 620 90 L 720 150 L 860 70 L 880 270"
              fill="none"
              stroke="#0f2844"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.3"
            />

            {/* Route 183 Track: Poprad → Starý Smokovec */}
            <path
              d="M 50 250 L 130 230 L 200 210 L 260 190 L 310 170 L 400 140"
              stroke="#1e4368"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Route 183 Track: Starý Smokovec → Štrbské Pleso */}
            <path
              d="M 400 140 L 440 120 L 480 105 L 520 90 L 560 75 L 600 60 L 640 48 L 690 38 L 760 28 L 830 20"
              stroke="#225e79"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Route 184 Track: Starý Smokovec → Tatranská Lomnica */}
            <path
              d="M 400 140 L 450 165 L 500 185 L 560 200 L 620 215 L 700 230"
              stroke="#235c42"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner track lines */}
            <path
              d="M 50 250 L 130 230 L 200 210 L 260 190 L 310 170 L 400 140 L 440 120 L 480 105 L 520 90 L 560 75 L 600 60 L 640 48 L 690 38 L 760 28 L 830 20"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="2,6"
              opacity="0.6"
            />
            <path
              d="M 400 140 L 450 165 L 500 185 L 560 200 L 620 215 L 700 230"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="2,6"
              opacity="0.6"
            />

            {/* Route labels */}
            <text x="210" y="155" fontSize="11" fill="#38bdf8" fontWeight="bold" opacity="0.65">
              183-as vonal (Poprád – Csorbató)
            </text>
            <text x="580" y="245" fontSize="11" fill="#34d399" fontWeight="bold" opacity="0.65">
              184-es vonal (Tátralomnic felé)
            </text>

            {/* Station Nodes */}
            {Object.entries(stationCoords).map(([stName, pt]) => {
              const isVillaNear = stName === "Pod lesom" || stName === "Nová Lesná";
              const isPodLesom = stName === "Pod lesom";
              const isMajor =
                stName === "Poprad-Tatry" ||
                stName === "Starý Smokovec" ||
                stName === "Štrbské Pleso" ||
                stName === "Tatranská Lomnica";
              const isSelected = selectedStation === stName;

              return (
                <g
                  key={stName}
                  className="cursor-pointer group"
                  onClick={() => setSelectedStation(stName)}
                >
                  {/* Glowing halo for Villa Greystone station - native SVG animation without CSS transform-origin drift */}
                  {isPodLesom && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="10"
                      fill="#f59e0b"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      className="pointer-events-none"
                    >
                      <animate
                        attributeName="r"
                        values="7;18;7"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-opacity"
                        values="0.9;0;0.9"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="fill-opacity"
                        values="0.35;0;0.35"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Highlight ring if selected */}
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      className="opacity-90 pointer-events-none"
                    />
                  )}

                  {/* Main Station Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isMajor ? 7 : isPodLesom ? 6 : 4}
                    fill={
                      isPodLesom
                        ? "#f59e0b"
                        : isMajor
                        ? "#38bdf8"
                        : isVillaNear
                        ? "#38bdf8"
                        : "#cbd5e1"
                    }
                    stroke="#0b1726"
                    strokeWidth={2}
                    className="transition-transform group-hover:scale-125"
                  />

                  {/* Station Label */}
                  <text
                    x={pt.x}
                    y={
                      isMajor && pt.y < 100
                        ? pt.y - 10
                        : pt.y + (isMajor ? 18 : isPodLesom ? 17 : 14)
                    }
                    textAnchor="middle"
                    fontSize={isMajor ? 11 : isPodLesom ? 10 : 8.5}
                    fontWeight={isMajor || isPodLesom ? "bold" : "normal"}
                    fill={
                      isPodLesom
                        ? "#fef08a"
                        : isMajor
                        ? "#ffffff"
                        : isSelected
                        ? "#38bdf8"
                        : "#94a3b8"
                    }
                    className="group-hover:fill-sky-300 transition-colors pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  >
                    {stName}
                  </text>

                  {/* Extra badge text for Pod lesom */}
                  {isPodLesom && (
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fill="#f59e0b"
                      className="pointer-events-none drop-shadow-md"
                    >
                      ★ Villa Greystone (900m)
                    </text>
                  )}
                </g>
              );
            })}

            {/* Active Moving Trains Layer */}
            {activeTrains.map((tr) => {
              const isSelected = selectedTrain?.number === tr.number;

              return (
                <g
                  key={tr.number}
                  className="cursor-pointer group"
                  onClick={() => setSelectedTrain(tr)}
                >
                  {/* Train ping pulse - native SVG animation */}
                  <circle
                    cx={tr.x}
                    cy={tr.y}
                    r="8"
                    fill={tr.color}
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      values="7;13;7"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.45;0.1;0.45"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Train outer ring */}
                  <circle
                    cx={tr.x}
                    cy={tr.y}
                    r={isSelected ? 9 : 7}
                    fill={tr.color}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  />

                  {/* Train inner dot */}
                  <circle cx={tr.x} cy={tr.y} r="2.5" fill="#0f172a" />

                  {/* Small train badge label */}
                  <text
                    x={tr.x}
                    y={tr.y - 12}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#ffffff"
                    className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                  >
                    {tr.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Train / Station details card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Train Details Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-sky-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Train className="w-4 h-4" />
              Kiválasztott Vonat Részletei
            </span>
            {selectedTrain && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                {selectedTrain.number}
              </span>
            )}
          </div>

          {selectedTrain ? (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Viszonylat:</span>
                <span className="font-semibold text-white">
                  {selectedTrain.from} ➔ {selectedTrain.to}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Következő állomás:</span>
                <span className="font-bold text-amber-400">{selectedTrain.next}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Menetidő & Indulás:</span>
                <span className="font-mono text-slate-200">
                  {selectedTrain.dep} – {selectedTrain.arr}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Kattints a térképen bármelyik mozgó vonatkörre további szerelvények adatainak megtekintéséhez!
              </p>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p>Kattints a térképen bármelyik mozgó vonatra a részletes menetidő és viszonylat megjelenítéséhez!</p>
              <div className="mt-3 flex justify-center gap-2">
                {activeTrains.slice(0, 3).map((tr) => (
                  <button
                    key={tr.number}
                    onClick={() => setSelectedTrain(tr)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-sky-500/20 border border-slate-800 text-sky-300 text-xs font-mono font-bold"
                  >
                    #{tr.number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Station Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-sky-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Állomás Információ
            </span>
            <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
              {selectedStation || "Válassz állomást"}
            </span>
          </div>

          <div className="text-xs sm:text-sm space-y-2">
            {selectedStation === "Pod lesom" ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <p className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Ez a legközelebbi állomás a Villa Greystone-hoz!
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Távolság a szállástól: kb. <strong>900 méter (10-12 perc kényelmes séta)</strong>. Az állomásról közvetlen
                  vonatok indulnak Poprádra és Ótátrafüredre / Csorbatóra. A megállónál jegykiadó automata is üzemel.
                </p>
              </div>
            ) : (
              <p className="text-slate-300">
                Kattints a térképen az állomások nevére vagy pöttyére az állomás kiemeléséhez!
              </p>
            )}

            <div className="flex justify-between py-1 border-b border-slate-800 text-xs">
              <span className="text-slate-400">Következő vonat ezen a megállón:</span>
              <span className="font-mono font-bold text-sky-300">
                {selectedStation ? getNextDeparture(selectedStation) : "--:--"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800 text-xs">
              <span className="text-slate-400">Vonalak:</span>
              <span className="text-slate-300">
                {selectedStation?.includes("Lomnica") || selectedStation?.includes("Lesná")
                  ? "184-es vonal (Ótátrafüred – Tátralomnic)"
                  : "183-as vonal (Poprád – Csorbató)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
