import React from "react";
import { MapPin, ExternalLink, ShieldAlert, Truck, Video } from "lucide-react";

export default function UtinformacioMap() {
  return (
    <section
      id="utinformacio"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)] scroll-mt-28"
    >
      {/* Title & Icon: One row, NO badge above H2 (per Villa Greystone UI rules) */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/30 shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Útinformáció & Térkép
        </h2>
      </div>

      {/* Description: Starts on a new row, full width, justified with hyphens-auto (per Villa Greystone UI rules) */}
      <p
        lang="hu"
        className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full mb-5"
      >
        Aktuális útviszonyok Szlovákiában a Szlovák Közútkezelő (SSC / zjazdnost.sk) hivatalos élő térképén.
        Valós időben követhető a tátrai és az országos utak járhatósága, a hókotrók és sószórók mozgása,
        a hegyi hágók állapota, az élő webkamerák és a hivatalos téli figyelmeztetések.
      </p>

      {/* Action links */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <a
          href="https://www.zjazdnost.sk/map/view.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs font-bold transition-all shadow-md shadow-sky-500/10"
        >
          <span>Megnyitás teljes méretben (zjazdnost.sk)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://eznamka.sk/hu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-all shadow-md shadow-amber-500/10"
        >
          <span>Szlovák autópálya-matrica vásárlás (eznamka.sk)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Embedded interactive map iframe container */}
      <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-slate-950 relative w-full h-[480px] sm:h-[580px] lg:h-[660px] mb-6">
        <iframe
          src="https://www.zjazdnost.sk/map/view.html"
          title="Szlovák Közútkezelő Élő Útinformációs Térkép"
          className="w-full h-full rounded-2xl bg-white border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Feature cards below the map: strictly following Villa Greystone UI Rule #2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Hókotrók & Sószórók Élőben
            </h4>
          </div>
          <p
            lang="hu"
            className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
          >
            A térkép jobb felső rétegválasztójában bekapcsolható a hókotró és sószóró gépek valós idejű GPS nyomvonala, így közvetlenül ellenőrizhető a hegyi utak tisztítása.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Közúti Webkamerák
            </h4>
          </div>
          <p
            lang="hu"
            className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
          >
            A kamera ikonokra kattintva élőkép látható a kritikus tátrai és felvidéki szakaszokról, hágókról és autópályákról a pillanatnyi látási viszonyok felméréséhez.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Téli Figyelmeztetések
            </h4>
          </div>
          <p
            lang="hu"
            className="text-xs text-slate-300 leading-relaxed text-justify [text-align:justify] [text-justify:inter-word] hyphens-auto [hyphens:auto] [-webkit-hyphens:auto] w-full"
          >
            A rendszer valós időben jelzi a jegesedést, hóátfúvásokat, esetleges hegyi lezárásokat vagy kötelező hólánc használatot a Magas-Tátra környéki úthálózaton.
          </p>
        </div>
      </div>
    </section>
  );
}
