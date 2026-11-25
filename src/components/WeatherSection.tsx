import React from "react";
import { CloudSnow, ExternalLink } from "lucide-react";

interface WeatherLink {
  name: string;
  desc: string;
  url: string;
  logo: string;
}

const weatherLinks: WeatherLink[] = [
  {
    name: "SHMÚ Szlovák Meteorológia",
    desc: "A legpontosabb helyi hivatalos szlovák előrejelzés és magashegyi figyelmeztetések.",
    url: "https://www.shmu.sk/sk/?page=1",
    logo: "https://spisskabela.sk/wp-content/uploads/2020/06/SHMU_logo.png",
  },
  {
    name: "Ventusky Élő Időjárás Radar",
    desc: "Interaktív szél-, csapadék- és valós idejű hóréteg-térkép a Magas-Tátra felett.",
    url: "https://www.ventusky.com/hu/49.138;20.219",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOgo3e2TQNcEl_xPWp-VFPW_mJRSOqUayGK62-m9YLoJex0oHDJj43Rfb_&s=10",
  },
  {
    name: "HZS Hegyi Mentőszolgálat",
    desc: "Hivatalos lavina-előrejelzés és téli magashegyi túraútvonalak járhatósági jelentése.",
    url: "https://hzs.sk/",
    logo: "https://hzs.sk/wp-content/themes/HZSTheme_v4/assets/img/logo.svg",
  },
];

export default function WeatherSection() {
  return (
    <section id="idojaras" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4 sm:pb-6">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20 shadow-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <CloudSnow className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400 shrink-0" />
          <span>Időjárás és Hójelentés</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {weatherLinks.map((wl, idx) => (
            <a
              key={idx}
              href={wl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/85 hover:bg-slate-800/90 p-5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5"
            >
              <div>
                {/* Rule: Az ikon és a cím MINDIG EGY SORBAN, egymás mellett helyezkedjen el (flex items-center gap-3 mb-2.5 vagy mb-3) */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md border border-slate-700/50">
                    <img
                      src={wl.logo}
                      alt={wl.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between flex-1 leading-snug">
                    <span>{wl.name}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors shrink-0 ml-2" />
                  </h3>
                </div>

                {/* Rule: A szöveges tartalom MINDIG ÚJ SORBAN kezdődjön, ne az ikon mellé szorítva és ne alá behúzva. A szöveg töltse ki a kártya TELJES SZÉLESSÉGÉT (w-full), és MINDIG SORKIZÁRT legyen */}
                <p
                  lang="hu"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
                >
                  {wl.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                <span>Megnyitás böngészőben</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
