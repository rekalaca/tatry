"use client";

import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Plus, Trash2, RotateCcw, Sparkles } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  checked: boolean;
}

const defaultItems: ChecklistItem[] = [
  // Személyes öltözet & Ruházat
  { id: "s0", category: "👕 Személyes Öltözet & Ruházat", text: "Vízálló meleg téli kabát / anorák", checked: false },
  { id: "s1", category: "👕 Személyes Öltözet & Ruházat", text: "Bakancsok (vízálló, meleg téli túrabakancs)", checked: false },
  { id: "s2", category: "👕 Személyes Öltözet & Ruházat", text: "Papucsok (kényelmes benti papucs az apartmanba)", checked: false },
  { id: "s3", category: "👕 Személyes Öltözet & Ruházat", text: "Zoknik (hétköznapi pamutzoknik minden napra)", checked: false },
  { id: "s4", category: "👕 Személyes Öltözet & Ruházat", text: "Túrazoknik (vastag meleg gyapjú vagy termo zokni)", checked: false },
  { id: "s5", category: "👕 Személyes Öltözet & Ruházat", text: "Jégeralsó (termo aláöltözet nadrág)", checked: false },
  { id: "s6", category: "👕 Személyes Öltözet & Ruházat", text: "Boxerek, alsóneműk (minden napra + tartalék)", checked: false },
  { id: "s7", category: "👕 Személyes Öltözet & Ruházat", text: "Atléták (pamut ujjatlan trikók réteges öltözködéshez)", checked: false },
  { id: "s8", category: "👕 Személyes Öltözet & Ruházat", text: "Pólók (rövid ujjú pamutpólók)", checked: false },
  { id: "s9", category: "👕 Személyes Öltözet & Ruházat", text: "Hosszú ujjú pólók / felsők", checked: false },
  { id: "s10", category: "👕 Személyes Öltözet & Ruházat", text: "Pulóverek (meleg kötött vagy polár pulóver)", checked: false },
  { id: "s11", category: "👕 Személyes Öltözet & Ruházat", text: "Mackófelső (kényelmes cipzáras / kapucnis felső)", checked: false },
  { id: "s12", category: "👕 Személyes Öltözet & Ruházat", text: "Mackóalsó (melegítő nadrág az apartmanos pihenéshez)", checked: false },
  { id: "s13", category: "👕 Személyes Öltözet & Ruházat", text: "Farmernadrágok (kényelmes utcai / utazós nadrág)", checked: false },
  { id: "s14", category: "👕 Személyes Öltözet & Ruházat", text: "Sínadrág (vízálló, meleg bélelt nadrág szánkózáshoz)", checked: false },
  { id: "s15", category: "👕 Személyes Öltözet & Ruházat", text: "Kesztyűk (vízálló meleg kesztyű + tartalék pár)", checked: false },
  { id: "s16", category: "👕 Személyes Öltözet & Ruházat", text: "Sapka (meleg téli sapka)", checked: false },
  { id: "s17", category: "👕 Személyes Öltözet & Ruházat", text: "Sál vagy csősál a hideg szél ellen", checked: false },
  { id: "s18", category: "👕 Személyes Öltözet & Ruházat", text: "Napszemüveg (erős szikrázó hegyi napfény és hóvakság ellen)", checked: false },
  { id: "s19", category: "👕 Személyes Öltözet & Ruházat", text: "Derékszíj / nadrágszíj", checked: false },
  { id: "s20", category: "👕 Személyes Öltözet & Ruházat", text: "Kistáska / övtáska (iratoknak, telefonnak, kulcsoknak)", checked: false },
  { id: "s21", category: "👕 Személyes Öltözet & Ruházat", text: "Hátizsák (kényelmes hátizsák a napi kirándulásokhoz)", checked: false },
  { id: "s22", category: "👕 Személyes Öltözet & Ruházat", text: "Pizsama (kényelmes éjszakai alvóruha)", checked: false },

  // Szánkózás & Havas Játékok
  { id: "sz1", category: "🛷 Szánkózás & Havas Játékok", text: "Szánkó / műanyag csúszka / popsitepsi a havas lejtőkhöz", checked: false },
  { id: "sz2", category: "🛷 Szánkózás & Havas Játékok", text: "Bukósisak a 2,5 km-es kivilágított tarajkai szánkópályához (gyerekeknek)", checked: false },
  { id: "sz3", category: "🛷 Szánkózás & Havas Játékok", text: "Védőszemüveg / síszemüveg gyors szánkózáshoz és hóeséshez", checked: false },

  // Autó
  { id: "a1", category: "🚗 Autós Téli Felszerelés", text: "Méretpontos hólánc a csomagtartóban", checked: false },
  { id: "a2", category: "🚗 Autós Téli Felszerelés", text: "Nemzetközi gépjármű zöldkártya (felelősségbiztosítási igazolás)", checked: false },
  { id: "a3", category: "🚗 Autós Téli Felszerelés", text: "Tűzoltó készülék és elsősegélycsomag", checked: false },
  { id: "a4", category: "🚗 Autós Téli Felszerelés", text: "Gyalogsági ásó vagy összecsukható hólapát (hótorlasz és elakadás esetére)", checked: false },
  { id: "a5", category: "🚗 Autós Téli Felszerelés", text: "Láthatósági mellények minden utasnak az utastérben", checked: false },
  { id: "a6", category: "🚗 Autós Téli Felszerelés", text: "Jégkaparó, hókefe és jégoldó spray", checked: false },
  { id: "a7", category: "🚗 Autós Téli Felszerelés", text: "Téli szélvédőmosó folyadék (-25°C flakonban)", checked: false },
  { id: "a8", category: "🚗 Autós Téli Felszerelés", text: "Meleg pléd és zseblámpa az autóba", checked: false },
  { id: "a9", category: "🚗 Autós Téli Felszerelés", text: "Szlovák autópálya e-matrica (eznamka.sk) megvéve", checked: false },

  // Okmányok & Pénz
  { id: "d1", category: "📄 Okmányok & Pénz", text: "Személyi igazolványok / útlevelek a gyerekeknek is!", checked: false },
  { id: "d2", category: "📄 Okmányok & Pénz", text: "Európai Egészségbiztosítási Kártya (EU kék kártya) mindenkinek", checked: false },
  { id: "d3", category: "📄 Okmányok & Pénz", text: "Jogosítvány, forgalmi engedély, nemzetközi zöldkártya", checked: false },
  { id: "d4", category: "📄 Okmányok & Pénz", text: "Utasbiztosítás hegyimentő fedezettel kinyomtatva / mentve", checked: false },
  { id: "d5", category: "📄 Okmányok & Pénz", text: "Euró (€) készpénz (apró és papírpénz hegyi hüttékhez)", checked: false },
  { id: "d6", category: "📄 Okmányok & Pénz", text: "Bankkártya külföldi használatra aktiválva", checked: false },

  // Wellness & Fürdő
  { id: "w1", category: "🏊 Wellness & Fürdőzés", text: "Fürdőruhák / fürdőnadrágok mindenkinek", checked: false },
  { id: "w2", category: "🏊 Wellness & Fürdőzés", text: "Kényelmes fürdőköntös a wellnesshez és apartmanos pihenéshez", checked: false },
  { id: "w3", category: "🏊 Wellness & Fürdőzés", text: "Nagyméretű fürdőlepedők és törölközők", checked: false },
  { id: "w4", category: "🏊 Wellness & Fürdőzés", text: "Csúszásgátló strandpapucs / gumipapucs", checked: false },
  { id: "w5", category: "🏊 Wellness & Fürdőzés", text: "Úszósapka / úszószemüveg a sportmedencékhez", checked: false },

  // Patika & Egészség
  { id: "p1", category: "💊 Egészség & Téli Ápolás", text: "Láz- és fájdalomcsillapító, torokfertőtlenítő", checked: false },
  { id: "p2", category: "💊 Egészség & Téli Ápolás", text: "Orrcsepp / tengervizes orrspray megfázás ellen", checked: false },
  { id: "p3", category: "💊 Egészség & Téli Ápolás", text: "Vitaminok (C- és D-vitamin, multivitamin)", checked: false },
  { id: "p4", category: "💊 Egészség & Téli Ápolás", text: "Sebtapasz, steril gézlap, fásli, magnézium izomláz ellen", checked: false },
  { id: "p5", category: "💊 Egészség & Téli Ápolás", text: "Papír zsebkendő (több csomag a kabátzsebekbe)", checked: false },
  { id: "p6", category: "💊 Egészség & Téli Ápolás", text: "Kézfertőtlenítő gél vagy kendő", checked: false },
  { id: "p7", category: "💊 Egészség & Téli Ápolás", text: "Zsíros hidratáló krém szél és fagy ellen", checked: false },
  { id: "p8", category: "💊 Egészség & Téli Ápolás", text: "Fényvédős ajakápoló / stift a hideg ellen", checked: false },

  // Elektronika & Családi Esték
  { id: "e1", category: "📱 Elektronika & Családi Esték", text: "Powerbank (hidegben gyorsabban merülnek a telefonok!)", checked: false },
  { id: "e2", category: "📱 Elektronika & Családi Esték", text: "Telefontöltők és töltőkábelek mindenkinek", checked: false },
  { id: "e3", category: "📱 Elektronika & Családi Esték", text: "Hálózati elosztó / hosszabbító több eszköz töltéséhez", checked: false },
  { id: "e4", category: "📱 Elektronika & Családi Esték", text: "Laptop és töltője", checked: false },
  { id: "e5", category: "📱 Elektronika & Családi Esték", text: "HDMI kábel (laptop összekötéséhez a TV-vel)", checked: false },
  { id: "e6", category: "📱 Elektronika & Családi Esték", text: "Hordozható JBL bluetooth hangszóró a zenékhez", checked: false },
  { id: "e7", category: "📱 Elektronika & Családi Esték", text: "Társasjátékok & kártya az apartmanos estékre", checked: false },

  // Konyhai Kiegészítők & Útravaló
  { id: "k1", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Papírtörlő / konyhai törlőkendő guriga", checked: false },
  { id: "k2", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Instant kávé / kávékapszula", checked: false },
  { id: "k3", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Teafilterek, cukor / édesítő, citromlé", checked: false },
  { id: "k4", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Hőtartó termosz a forró teához túrázáskor", checked: false },
  { id: "k5", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Zárható ételes dobozok / uzsonnás dobozok", checked: false },
  { id: "k6", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Sós és édes rágcsálnivalók, kekszek, csokoládé", checked: false },
  { id: "k7", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Ásványvíz / üdítők az útra és az apartmanba", checked: false },
  { id: "k8", category: "☕ Konyhai Kiegészítők & Útravaló", text: "Bicska / zsebkés vagy multifunkciós bicska", checked: false },
];

export default function PackingChecklist({ isSubpage = false }: { isSubpage?: boolean }) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [isClient, setIsClient] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("👕 Személyes Öltözet & Ruházat");

  // Load from localStorage (with auto-migration to v4 so new items appear while keeping user checks)
  useEffect(() => {
    setIsClient(true);
    const savedV4 = localStorage.getItem("tatry_packing_list_v4");
    if (savedV4) {
      try {
        setItems(JSON.parse(savedV4));
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // Migrate from previous versions if exist
    const prevSaved =
      localStorage.getItem("tatry_packing_list_v3") ||
      localStorage.getItem("tatry_packing_list_v2") ||
      localStorage.getItem("tatry_packing_list");
    if (prevSaved) {
      try {
        const oldItems: ChecklistItem[] = JSON.parse(prevSaved);
        const checkedTexts = new Set(
          oldItems.filter((i) => i.checked).map((i) => i.text.toLowerCase().trim())
        );
        const customItems = oldItems.filter((i) => i.id.startsWith("custom_"));
        const merged = defaultItems.map((item) => ({
          ...item,
          checked:
            checkedTexts.has(item.text.toLowerCase().trim()) ||
            oldItems.some((o) => o.id === item.id && o.checked),
        }));
        const finalItems = [...merged, ...customItems];
        setItems(finalItems);
        localStorage.setItem("tatry_packing_list_v4", JSON.stringify(finalItems));
        return;
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to localStorage
  const saveItems = (updated: ChecklistItem[]) => {
    setItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tatry_packing_list_v4", JSON.stringify(updated));
    }
  };

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(updated);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: "custom_" + Date.now(),
      category: selectedCategory,
      text: newItemText.trim(),
      checked: false,
    };
    saveItems([...items, newItem]);
    setNewItemText("");
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  const resetList = () => {
    if (confirm("Biztosan visszaállítod az eredeti listát? Minden bepipálás törlődik.")) {
      saveItems(defaultItems);
    }
  };

  // Calculate progress
  const totalCount = items.length;
  const checkedCount = items.filter((i) => i.checked).length;
  const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // Categories list
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <section id="csomagolas" className={`${isSubpage ? "pt-4 pb-20" : "py-20"} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Mit ne felejtsünk{" "}
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            otthon?
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Kattintással pipáld ki a bepakolt tételeket! Az állapot automatikusan elmentődik a böngésződben, és saját tételeket is hozzáadhatsz.
        </p>
      </div>

      {/* Progress & Quick Actions Card */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/20 mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Csomagolási Haladás
            </span>
            <span className="text-2xl font-black text-white">
              {checkedCount} / {totalCount} tétel bepakolva ({percentage}%)
            </span>
          </div>

          <button
            onClick={resetList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Lista visszaállítása</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={addItem} className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Új tétel hozzáadása a listához (pl. szánkó, kedvenc társasjáték...)"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
        />

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Hozzáadás</span>
        </button>
      </form>

      {/* Category Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => {
          const categoryItems = items.filter((i) => i.category === category);
          const catChecked = categoryItems.filter((i) => i.checked).length;

          return (
            <div
              key={category}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">{category}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-sky-300">
                  {catChecked}/{categoryItems.length}
                </span>
              </div>

              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${
                      item.checked
                        ? "bg-emerald-500/10 border-emerald-500/20 text-slate-400 line-through"
                        : "bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs sm:text-sm font-medium leading-tight">
                        {item.text}
                      </span>
                    </div>

                    {item.id.startsWith("custom_") && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        title="Törlés"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
