"use client";

import React, { useState } from "react";
import timetablesData from "@/data/tez-timetables.json";
import { Calendar, Search, MapPin, Clock, ArrowRight, Train, CheckCircle2 } from "lucide-react";

export default function TezTimetable() {
  const [activeTab, setActiveTab] = useState<string>("tab-183-sp");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentTable = timetablesData.find((t) => t.id === activeTab) || timetablesData[0];

  const filteredRows = currentTable.rows.filter((row) =>
    row.station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 border border-sky-500/25 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Hivatalos ŽSR Menetrend • 2025/2026</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Train className="w-6 h-6 text-sky-400" />
            <span>Menetrendek: 183-as és 184-es vonalak</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Görgethető interaktív táblázatok mindkét irányban. A Villa Greystone megállója (<span className="text-amber-400 font-bold">Pod lesom</span>) kiemelve.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Állomás keresése..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {timetablesData.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                isActive
                  ? "bg-sky-500/25 text-white border-sky-400/50 shadow-md shadow-sky-500/20"
                  : "bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900 border-slate-800"
              }`}
            >
              <span className="truncate">{tab.name}</span>
              {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Current Tab Title & Direction Indicator */}
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-950/40 border border-slate-800/80 mb-3 text-xs">
        <span className="font-semibold text-sky-300 flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          {currentTable.title}
        </span>
        <span className="text-[11px] text-slate-400">
          Összesen: {currentTable.trains.length} vonatpár naponta
        </span>
      </div>

      {/* Responsive Table with Sticky First Column */}
      <div className="relative overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 shadow-inner">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
              <th className="sticky left-0 z-20 bg-slate-900/95 backdrop-blur px-4 py-3 min-w-[170px] sm:min-w-[190px] font-bold text-white border-r border-slate-800">
                Állomás / Megálló
              </th>
              {currentTable.trains.map((trainNum) => (
                <th
                  key={trainNum}
                  className="px-3 py-3 text-center font-mono font-bold text-sky-300 min-w-[65px] border-r border-slate-800/50"
                >
                  {trainNum}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredRows.map((row) => {
              const isPodLesom = row.station.toLowerCase().includes("pod lesom");
              const isNovaLesna = row.station.toLowerCase().includes("nová lesná");
              const isKeyStation = isPodLesom || isNovaLesna;

              return (
                <tr
                  key={row.station}
                  className={`transition-colors ${
                    isPodLesom
                      ? "bg-amber-500/15 hover:bg-amber-500/20 font-bold"
                      : isNovaLesna
                      ? "bg-sky-500/10 hover:bg-sky-500/15"
                      : "hover:bg-slate-900/50"
                  }`}
                >
                  <td
                    className={`sticky left-0 z-10 px-4 py-2.5 font-sans whitespace-nowrap border-r border-slate-800 ${
                      isPodLesom
                        ? "bg-[#181d1e] text-amber-300 font-bold"
                        : isNovaLesna
                        ? "bg-[#0c1828] text-sky-200 font-semibold"
                        : "bg-slate-950/95 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {isPodLesom && <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      <span>{row.station}</span>
                      {isPodLesom && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono ml-1">
                          Villa (900m)
                        </span>
                      )}
                    </div>
                  </td>

                  {row.times.map((time, idx) => (
                    <td
                      key={idx}
                      className={`px-3 py-2.5 text-center whitespace-nowrap border-r border-slate-800/40 ${
                        isPodLesom
                          ? "text-amber-200 font-extrabold"
                          : time === "—" || time === ""
                          ? "text-slate-400"
                          : "text-slate-200"
                      }`}
                    >
                      {time || "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Note about seasonal variations */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <strong className="text-slate-300">Megjegyzés a menetrendhez:</strong> A vonatok általában ütemes, óránkénti menetrend szerint indulnak.
        Egyes vonatok szezonálisan (pl. főszezoni hétvégéken vagy síidőszakban sűrítve) közlekednek, illetve karácsonykor (XII.24-25) és szilveszterkor/újévkor (XII.31-I.1)
        módosított menetrend lehet érvényben. Utazás előtt érdemes a hivatalos ZSSK oldalon (
        <a
          href="https://www.zssk.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 underline hover:text-white ml-0.5"
        >
          zssk.sk
        </a>
        ) vagy a{" "}
        <a
          href="https://cp.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 underline hover:text-white"
        >
          cp.sk
        </a>{" "}
        keresőben is rákeresni az adott napra.
      </div>
    </div>
  );
}
