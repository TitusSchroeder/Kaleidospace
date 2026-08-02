import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Heart, 
  ShieldCheck, 
  Menu, 
  User, 
  Edit3, 
  ArrowLeft, 
  Check, 
  Plus, 
  Lock, 
  Building2, 
  Sliders, 
  Sparkles, 
  Clock, 
  Calendar,
  Share2
} from 'lucide-react';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';

export const StitchPrototype = ({ state, onGoBackToV1, onSaveMemory }) => {
  const [activeTab, setActiveTab] = useState('personal'); // 'experience', 'personal', 'life', 'orbit'
  const [activeValue, setActiveValue] = useState('family'); // 'family', 'independence', 'integrity'
  const [sliderValue, setSliderValue] = useState(85);
  const [reflectionText, setReflectionText] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const valueDetails = {
    family: {
      title: 'Familien-Ausrichtung & Erbe',
      subtitle: 'Stability & Legacy',
      prompt: 'Warum ist mir Familie in meiner aktuellen Lebensphase so wichtig?',
      icon: Heart,
    },
    independence: {
      title: 'Unabhängigkeit & Freiheit',
      subtitle: 'Autonomy & Choice',
      prompt: 'In welchen Bereichen möchte ich noch selbstbestimmter handeln?',
      icon: Compass,
    },
    integrity: {
      title: 'Integrität & Wahrhaftigkeit',
      subtitle: 'Truth & Consistency',
      prompt: 'Wo habe ich in der letzten Zeit meine Werte am klarsten bewiesen?',
      icon: ShieldCheck,
    },
  };

  const activeValueInfo = valueDetails[activeValue];

  return (
    <div className="w-full min-h-screen bg-[#fdf7ff] text-[#1d1b20] font-sans selection:bg-[#4f378a] selection:text-white relative pb-28">
      
      {/* 40px GRID CANVAS BACKGROUND */}
      <style>{`
        .stitch-grid-bg {
          background-color: #fdf7ff;
          background-image: 
            linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .stitch-[#4f378a]-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #4f378a;
          border: 2px solid #ffffff;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>

      {/* FIXED STITCH TOP APP BAR */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#fdf7ff]/90 backdrop-blur-md border-b-2 border-[#1d1b20] px-4 flex items-center justify-between z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoBackToV1}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1d1b20] text-white rounded-none text-xs font-mono font-bold tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>V1 KLASSIK</span>
          </button>

          <div>
            <h1 className="font-serif font-bold text-sm tracking-widest uppercase text-[#4f378a]">
              KALEIDOspace
            </h1>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Google Stitch Design System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase bg-[#e9ddff] text-[#22005d] px-2 py-1 border border-[#4f378a]">
            Stitch Prototyp
          </span>
          <div className="w-8 h-8 rounded-full border-2 border-[#1d1b20] bg-[#6750a4] text-white font-serif font-bold text-xs flex items-center justify-center">
            T
          </div>
        </div>
      </header>

      {/* MAIN STITCH CANVAS STAGE */}
      <main className="pt-20 px-4 max-w-2xl mx-auto stitch-grid-bg min-h-screen space-y-8">
        
        {/* ========================================================= */}
        {/* TAB 1: PERSONAL (STITCH WERTEKOMPASS DEEP DIVE) */}
        {/* ========================================================= */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            
            {/* EDITORIAL HEADER SECTION */}
            <section className="border-b-2 border-[#1d1b20] pb-6 space-y-2">
              <span className="font-mono text-xs text-[#765b00] uppercase font-bold tracking-widest block">
                Personal Archetype • Werteschrift
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1d1b20] tracking-tight">
                WerteKompass
              </h2>
              <p className="font-serif text-sm text-[#494551] italic max-w-xl leading-relaxed">
                Das innere Navigationssystem für Ihre täglichen Entscheidungen und das langfristige Vermächtnis.
              </p>
            </section>

            {/* CORE ALIGNMENT FOCUS CARDS */}
            <section className="space-y-3">
              <label className="font-mono text-xs font-bold text-[#494551] uppercase tracking-wider block">
                Fokus der Ausrichtung wählen
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(valueDetails).map((key) => {
                  const item = valueDetails[key];
                  const Icon = item.icon;
                  const isActive = activeValue === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveValue(key)}
                      className={`p-5 border-2 border-[#1d1b20] transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer ${
                        isActive
                          ? 'bg-[#e9ddff] border-[#4f378a] shadow-md ring-2 ring-[#4f378a]'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-[#4f378a]' : 'text-slate-500'}`} />
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#1d1b20]">{item.title.split(' ')[0]}</h4>
                        <span className="font-mono text-[10px] text-slate-500 block">{item.subtitle}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* PRIORITY WEIGHTING SLIDER */}
            <section className="p-6 border-2 border-[#1d1b20] bg-white space-y-4 shadow-sm">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-mono text-xs font-bold text-[#765b00] uppercase tracking-wider block">
                    Gewichtung & Priorität
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1d1b20] mt-1">
                    {activeValueInfo.title}
                  </h3>
                </div>
                <span className="font-mono text-3xl font-bold text-[#4f378a]">
                  {sliderValue}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                className="w-full h-2 bg-[#f2ecf4] appearance-none cursor-pointer stitch-[#4f378a]-slider"
              />

              <div className="flex justify-between font-mono text-[10px] font-bold text-slate-400">
                <span>PERIPHER</span>
                <span>ZENTRALES ERBE</span>
              </div>
            </section>

            {/* REFLECTION PROMPT BOX */}
            <section className="border-2 border-[#1d1b20] bg-white flex flex-col shadow-sm">
              <div className="p-4 border-b-2 border-[#1d1b20] flex items-center justify-between bg-[#f2ecf4]">
                <h3 className="font-serif font-bold text-base text-[#1d1b20]">Reflektions-Impuls</h3>
                <Edit3 className="w-4 h-4 text-[#4f378a]" />
              </div>

              <div className="p-6 space-y-4">
                <p className="font-serif text-base italic text-[#494551] leading-relaxed">
                  "{activeValueInfo.prompt}"
                </p>

                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Gedanken und Absichten verfassen..."
                  className="w-full min-h-[140px] p-3 font-sans text-sm bg-[#fafaf8] border-2 border-[#1d1b20] focus:ring-2 focus:ring-[#4f378a] focus:outline-none resize-none placeholder:text-slate-400"
                />
              </div>

              <div className="p-4 bg-[#1d1b20] flex justify-end">
                <button
                  onClick={() => {
                    alert('Reflektion im Lifeloop gespeichert!');
                    setReflectionText('');
                  }}
                  className="bg-[#6750a4] hover:bg-[#4f378a] text-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer transition-all active:scale-95"
                >
                  IM LIFELOOP SPEICHERN
                </button>
              </div>
            </section>

            {/* VISUAL ARCHIVAL HERO ANCHOR */}
            <section className="w-full p-6 border-2 border-[#1d1b20] bg-[#1d1b20] text-white space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-widest block">
                Stitch Leitgedanke
              </span>
              <p className="font-serif text-lg italic leading-snug text-slate-100">
                „Werte sind nicht das, was wir sagen, sondern was wir tun, wenn niemand zuschaut.“
              </p>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: EXPERIENCE (STITCH GRAPHIC FAMILY TREE & MOMENTS) */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <section className="border-b-2 border-[#1d1b20] pb-4">
              <span className="font-mono text-xs text-rose-700 uppercase font-bold tracking-widest block">
                Experience Space
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1d1b20]">
                Erfahrungen & Stammbaum
              </h2>
            </section>

            <FamilyTreeCanvas
              selectedPerson={selectedPerson}
              onSelectPerson={setSelectedPerson}
            />

            {selectedPerson && (
              <div className="p-4 border-2 border-[#1d1b20] bg-[#f6f3ed] space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-[#b89f82] pb-1">
                  <span className="font-serif font-bold text-sm text-[#1d1b20]">{selectedPerson.name}</span>
                  <span className="font-mono text-[10px] text-[#765b00] font-bold">{selectedPerson.role}</span>
                </div>
                <p className="font-serif italic text-slate-700">„{selectedPerson.thingsToSay || 'Keine Notizen hinterlegt.'}“</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: LIFE (STITCH VORSORGE & TRESOR) */}
        {/* ========================================================= */}
        {activeTab === 'life' && (
          <div className="space-y-6">
            <section className="border-b-2 border-[#1d1b20] pb-4">
              <span className="font-mono text-xs text-blue-700 uppercase font-bold tracking-widest block">
                Life Space
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1d1b20]">
                Lebensvorsorge & Abschied
              </h2>
            </section>

            <div className="p-6 border-2 border-[#1d1b20] bg-white space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#1d1b20]">Vorsorgedokumente & Abschiedsbegleiter</h3>
              <p className="font-serif text-xs text-slate-600 leading-relaxed">
                Würdevolle Abschiedswünsche, Notfallkontakte und Vollmachten im Stitch-System verankert.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ORBIT (STITCH CIRCULAR TIMELINE) */}
        {/* ========================================================= */}
        {activeTab === 'orbit' && (
          <div className="space-y-6">
            <section className="border-b-2 border-[#1d1b20] pb-4">
              <span className="font-mono text-xs text-[#4f378a] uppercase font-bold tracking-widest block">
                Der Lifeloop Orbit
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1d1b20]">
                Zeitreise (1996 – 2066)
              </h2>
            </section>

            <Lifeloop
              phases={state.phases}
              activePhaseId="all"
              onSelectPhase={() => {}}
              memories={state.memories}
              simulatedDate={state.simulatedDate}
              onDateChange={() => {}}
            />
          </div>
        )}

      </main>

      {/* FIXED STITCH BOTTOM NAV BAR */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#1d1b20] text-white border-t-2 border-[#1d1b20] px-4 py-3 flex justify-around items-center">
        {[
          { id: 'experience', label: 'EXPERIENCE', icon: KaleidoscopeIcon },
          { id: 'personal', label: 'PERSONAL', icon: User },
          { id: 'life', label: 'LIFE', icon: ShieldCheck },
          { id: 'orbit', label: 'ORBIT', icon: Clock },
        ].map((nav) => {
          const Icon = nav.icon;
          const isActive = activeTab === nav.id;

          return (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'text-[#e9ddff] font-bold scale-105'
                  : 'text-slate-400 hover:text-white opacity-70'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#e9ddff]' : 'text-slate-400'}`} />
              <span className="font-mono text-[9px] tracking-widest mt-1">
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
