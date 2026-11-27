"use client";

import React, { useState, useEffect } from "react";
import {
  CloudSnow,
  ThermometerSnowflake,
  CloudRain,
  Snowflake,
  Wind,
  Droplets,
  ExternalLink,
  RefreshCw,
  Clock,
  Radio,
  CheckCircle2,
} from "lucide-react";
import type { WeatherData } from "@/app/api/weather/route";

export default function LiveWeatherBox() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<string>("");

  const fetchWeather = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/weather", { cache: "no-store" });
      if (res.ok) {
        const json: WeatherData = await res.json();
        setData(json);
        const date = new Date();
        setLastFetched(
          date.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" })
        );
      }
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    } finally {
      setLoading(false);
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchWeather();
    // Auto refresh every 5 minutes
    const interval = setInterval(() => fetchWeather(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-sky-950/40 p-5 sm:p-7 border border-sky-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_30px_rgba(56,189,248,0.12)] ring-1 ring-white/10 relative overflow-hidden">
      {/* Decorative subtle ambient mountain gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar of the framed box */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-sky-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Élő SHMÚ Mérés
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Állomás: 11934 • Poprad-Tatry
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Aktuális Időjárási és Hóadatok</span>
          </h3>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => fetchWeather(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-sky-400/50 text-xs font-semibold text-sky-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            title="Adatok frissítése most"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-sky-400" : ""}`} />
            <span>{isRefreshing ? "Frissítés..." : "Frissítés"}</span>
          </button>

          <a
            href="https://www.shmu.sk/sk/?page=1&id=meteo_apocasie_sk&ii=11934"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-xs font-semibold text-sky-300 hover:text-white transition-all hover:scale-[1.02]"
            title="Hivatalos SHMÚ 11934 állomás megnyitása"
          >
            <span>SHMÚ 11934</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of Key Question Metric Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. KÉRDÉS: Hány fok van? */}
        <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border-2 border-slate-700/80 hover:border-sky-400/70 transition-all duration-300 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 shadow-inner">
                <ThermometerSnowflake className="w-6 h-6 text-sky-400" />
              </div>
              <h4 className="text-2xl sm:text-xl font-bold text-white tracking-tight leading-tight">
                Hőmérséklet
              </h4>
            </div>

            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {loading || !data ? "--" : `${data.temperature.current > 0 ? `+${data.temperature.current}` : data.temperature.current}°C`}
              </span>
              <span className="text-xs text-sky-300/80 font-medium">
                {loading || !data ? "" : `(hőérzet: ${data.temperature.apparent}°C)`}
              </span>
            </div>

            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mt-2"
            >
              Hivatalos SHMÚ Poprad (718 m) állomás mérése. A hegycsúcsokon (Kő-pataki-tó, Lomnici-csúcs) ennél 6–12 fokkal hidegebbre kell készülni.
            </p>
          </div>
        </div>

        {/* 2. KÉRDÉS: Esik-e a hó vagy eső? */}
        <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border-2 border-slate-700/80 hover:border-sky-400/70 transition-all duration-300 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 shadow-inner">
                {data?.precipitation.isSnowing ? (
                  <Snowflake className="w-6 h-6 text-sky-300 animate-pulse" />
                ) : data?.precipitation.isRaining ? (
                  <CloudRain className="w-6 h-6 text-sky-400" />
                ) : (
                  <CloudSnow className="w-6 h-6 text-sky-300" />
                )}
              </div>
              <h4 className="text-2xl sm:text-xl font-bold text-white tracking-tight leading-tight">
                Esik a hó / eső?
              </h4>
            </div>

            <div className="my-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-sm font-extrabold tracking-wide ${
                  data?.precipitation.isSnowing
                    ? "bg-sky-500/25 border border-sky-400 text-sky-200"
                    : data?.precipitation.isRaining
                    ? "bg-blue-500/25 border border-blue-400 text-blue-200"
                    : "bg-emerald-500/20 border border-emerald-400/40 text-emerald-200"
                }`}
              >
                {loading || !data ? (
                  "Betöltés..."
                ) : data.precipitation.isSnowing ? (
                  <>
                    <Snowflake className="w-3.5 h-3.5" />
                    {data.precipitation.statusText}
                  </>
                ) : data.precipitation.isRaining ? (
                  <>
                    <CloudRain className="w-3.5 h-3.5" />
                    {data.precipitation.statusText}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {data.precipitation.statusText}
                  </>
                )}
              </span>
            </div>

            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mt-2"
            >
              {loading || !data
                ? "Időjárási csapadékviszonyok lekérdezése..."
                : data.precipitation.isSnowing
                ? `Jelenleg havazás tapasztalható a térségben (${data.precipitation.amount1hMm} mm/h mért csapadék intenzitással).`
                : data.precipitation.isRaining
                ? `Jelenleg folyékony esőzés zajlik a völgyben (${data.precipitation.amount1hMm} mm/h).`
                : `Jelenleg nincsen csapadék a völgyben (0.0 mm/h). Az égbolt állapota: ${data.condition.text.toLowerCase()}.`}
            </p>
          </div>
        </div>

        {/* 3. KÉRDÉS: Hány cm a hó? */}
        <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border-2 border-slate-700/80 hover:border-sky-400/70 transition-all duration-300 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 shadow-inner">
                <Snowflake className="w-6 h-6 text-sky-300" />
              </div>
              <h4 className="text-2xl sm:text-xl font-bold text-white tracking-tight leading-tight">
                Hóvastagság
              </h4>
            </div>

            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {loading || !data ? "--" : `${data.snow.depthValleyCm} cm`}
              </span>
              <span className="text-xs text-sky-200/90 font-medium">
                {loading || !data ? "" : `(Tátra-alján: ${data.snow.depthMountainCm} cm)`}
              </span>
            </div>

            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mt-2"
            >
              {loading || !data
                ? "Hóréteg adatok betöltése..."
                : `Helyzet: ${data.snow.statusText}. A sípályákon (Tátralomnic, Csorbató) a ratrakolt műhóréteg ennél jelentősen vastagabb.`}
            </p>
          </div>
        </div>

        {/* 4. METRIKA: Szél és Páratartalom */}
        <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border-2 border-slate-700/80 hover:border-sky-400/70 transition-all duration-300 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 shadow-inner">
                <Wind className="w-6 h-6 text-sky-400" />
              </div>
              <h4 className="text-2xl sm:text-xl font-bold text-white tracking-tight leading-tight">
                Szél & Páratartalom
              </h4>
            </div>

            <div className="my-2 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                {loading || !data ? "--" : `${data.wind.speedKmh} km/h`}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                {loading || !data ? "--" : `${data.humidity}%`}
              </span>
            </div>

            <p
              lang="hu"
              className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mt-2"
            >
              {loading || !data
                ? "Szél- és páraadatok feldolgozása..."
                : `${data.wind.description} (${data.wind.speedMs} m/s). Magashegyi túrák előtt mindig ellenőrizd a gerincek széllökéseit az alábbi HZS linken.`}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>
            {lastFetched
              ? `Adatok lekérdezve: ma ${lastFetched}-kor`
              : "Kapcsolódás a szlovák meteorológiai szerverhez..."}
            {data?.station.stationTime
              ? ` • Állomás mérés: ${new Date(data.station.stationTime).toLocaleTimeString("hu-HU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : ""}
          </span>
        </div>
        <div className="text-slate-400 font-medium">
          Forrás:{" "}
          <a
            href="https://www.shmu.sk/sk/?page=1&id=meteo_apocasie_sk&ii=11934"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:text-white underline decoration-sky-500/40 hover:decoration-sky-300 transition-colors"
          >
            Slovenský hydrometeorologický ústav (SHMÚ)
          </a>
        </div>
      </div>
    </div>
  );
}
