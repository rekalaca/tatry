"use client";

import React from "react";
import { Video, CloudSnow, ExternalLink, Eye, Radio, ThermometerSnowflake } from "lucide-react";

export default function WebcamsSection() {
  const webcams = [
    {
      title: "Lomnici-csúcs (2634 m)",
      location: "Lomnický štít",
      desc: "Nézz be a felhők fölé! Élő panorámakép a Tátra második legmagasabb pontjáról.",
      altitude: "2 634 m",
      status: "Élő adás",
      link: "https://www.vt.sk/hu/hegyek/webkamerak",
      category: "Csúcspanoráma",
    },
    {
      title: "Kő-pataki-tó (1751 m)",
      location: "Skalnaté pleso",
      desc: "A kabinos felvonó állomása, hegyi obszervatórium és a sípályák felső szakasza.",
      altitude: "1 751 m",
      status: "Élő adás",
      link: "https://www.vt.sk/hu/hegyek/webkamerak",
      category: "Középállomás",
    },
    {
      title: "Csorba-tó Síugrósánc & Pályák",
      location: "Štrbské Pleso",
      desc: "A legendás síugrósáncok, a Solisko ülőlift és a hófödte tóparti sétány képe.",
      altitude: "1 346 m",
      status: "Élő adás",
      link: "https://www.vt.sk/hu/hegyek/webkamerak",
      category: "Síterep & Tó",
    },
    {
      title: "Tarajka (Hrebienok)",
      location: "Hrebienok - Ótátrafüred",
      desc: "A jégtemplom környéke és a 2,5 km-es szánkópálya rajtjának aktuális hóvastagsága.",
      altitude: "1 285 m",
      status: "Élő adás",
      link: "https://www.vt.sk/hu/hegyek/webkamerak",
      category: "Szánkópálya",
    },
    {
      title: "Tátralomnic Völgyállomás",
      location: "Tatranská Lomnica",
      desc: "A síközpont kiindulópontja, felvonó sorbanállás és völgyi időjárás élőben.",
      altitude: "888 m",
      status: "Élő adás",
      link: "https://www.vt.sk/hu/hegyek/webkamerak",
      category: "Völgyállomás",
    },
    {
      title: "Bachledka Lombkorona sétány",
      location: "Ždiar - Bélai-Tátra",
      desc: "Látványos kilátás a lombkorona tanösvény tetejéről a havas csúcsok felé.",
      altitude: "1 150 m",
      status: "Élő adás",
      link: "https://chodnikkorunamistromov.sk/hu/",
      category: "Bélai-Tátra",
    },
  ];

  const weatherLinks = [
    {
      name: "SHMÚ Szlovák Meteorológia",
      desc: "A legpontosabb helyi hivatalos szlovák előrejelzés és hegyi figyelmeztetések",
      url: "https://www.shmu.sk/sk/?page=1",
    },
    {
      name: "Ventusky Élő Időjárás Radar",
      desc: "Interaktív szél-, csapadék- és hóréteg-térkép a Magas-Tátra felett",
      url: "https://www.ventusky.com/hu/49.138;20.219",
    },
    {
      name: "Bergfex Hójelentés & Síinfó",
      desc: "Hóvastagság adatok, nyitott sípályák és üzemelő liftek listája",
      url: "https://hu.bergfex.com/vysoke-tatry-tatranska-lomnica/",
    },
    {
      name: "HZS Hegyi Mentőszolgálat",
      desc: "Lavina-előrejelzés és túraútvonalak téli járhatósága (Horská záchranná služba)",
      url: "https://hzs.sk/",
    },
  ];

  return (
    <section id="webkamerak" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>Valós Idejű Körkép</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Élő Webkamerák &{" "}
          <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
            Hójelentés
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Nézz rá a hegyekre indulás előtt! Tiszta az idő a csúcson, vagy köd ül a völgyben? Van elég hó a szánkózáshoz?
        </p>
      </div>

      {/* Webcams Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {webcams.map((cam, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-sky-500/15 hover:border-sky-400/40 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-950/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {cam.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>{cam.status}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                {cam.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400 mb-2">{cam.location}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{cam.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400" />
                <span>{cam.altitude}</span>
              </span>

              <a
                href={cam.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 transition-all"
              >
                <span>Élőkép megnyitása</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

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
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between mb-1">
                  <span>{wl.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{wl.desc}</p>
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
