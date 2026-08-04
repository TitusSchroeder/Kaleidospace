import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInitialState, saveState } from './utils/storage';
import { SpaceRingHeader, KaleidoscopeIcon } from './components/SpaceRingHeader';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { Lifeloop } from './components/Lifeloop';
import { IntentionalCreator } from './components/IntentionalCreator';
import { Home, Fingerprint, Target, Plus, Sparkles, BookOpen, Heart, ShieldCheck } from 'lucide-react';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState('home'); // 'home', 'experience', 'personal', 'life'
  const [activePhaseId, setActivePhaseId] = useState('all');

  // Auto save to localStorage when state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleSaveMemory = (newMemory) => {
    const memoryItem = {
      id: `mem-${Date.now()}`,
      ...newMemory,
    };
    setState((prev) => ({
      ...prev,
      memories: [memoryItem, ...prev.memories],
    }));
  };

  const handleDeleteMemory = (memoryId) => {
    if (window.confirm('Möchten Sie diese Erinnerung löschen?')) {
      setState((prev) => ({
        ...prev,
        memories: prev.memories.filter((m) => m.id !== memoryId),
      }));
    }
  };

  const handleAddWerte = (newWerte) => {
    const werteItem = {
      id: `werte-${Date.now()}`,
      ...newWerte,
    };
    setState((prev) => ({
      ...prev,
      werte: [werteItem, ...(prev.werte || [])],
    }));
  };

  const handleDeleteWerte = (werteId) => {
    if (window.confirm('Möchten Sie diesen Wert aus der Werteschrift entfernen?')) {
      setState((prev) => ({
        ...prev,
        werte: (prev.werte || []).filter((w) => w.id !== werteId),
      }));
    }
  };

  const handleUpdateLetztesKapitel = (updatedKapitel) => {
    setState((prev) => ({
      ...prev,
      letztesKapitel: updatedKapitel,
    }));
  };

  const handleDateChange = (newDate) => {
    setState((prev) => ({
      ...prev,
      simulatedDate: newDate,
    }));
  };

  const navItems = [
    { id: 'home', label: 'Start', icon: Home, color: '#c05621' },
    { id: 'experience', label: 'Experience', icon: KaleidoscopeIcon, color: '#dc2626' },
    { id: 'personal', label: 'Personal', icon: Fingerprint, color: '#059669' },
    { id: 'life', label: 'Life', icon: Target, color: '#2563eb' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#1c1917] flex justify-center selection:bg-[#e8ded0] selection:text-[#78350f] font-sans p-0 sm:p-4">
      
      {/* SMARTPHONE CONTAINER (MAX-W-MD) */}
      <div className="w-full max-w-md min-h-screen bg-[#f9f7f2] text-[#1c1917] shadow-2xl relative flex flex-col justify-between overflow-x-hidden sm:rounded-[40px] sm:border-4 border-[#292524] pb-24">
        
        <div className="flex-1">
          {/* BRAND HEADER BAR */}
          <SpaceRingHeader
            activeSpace={activeSpace}
            onSelectSpace={setActiveSpace}
          />

          {/* MAIN CONTENT STAGE */}
          <main className="p-4 space-y-4">
            
            {/* HOMEPAGE VIEW — WARM LINEN EDITORIAL HERO */}
            {activeSpace === 'home' && (
              <div className="space-y-4 select-none">
                
                {/* EDITORIAL HERO BANNER */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#f3efe6] via-[#f7f4ed] to-[#eaede3] border border-[#e2dacb] shadow-xs relative overflow-hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c05621] bg-white px-2.5 py-1 rounded-full border border-[#e2dacb]">
                      Willkommen zurück
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-medium">Titus Schröder</span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                      Das Leben bewusst begleiten.
                    </h2>
                    <p className="text-xs font-serif italic text-slate-600 leading-relaxed">
                      Erinnerungen bewahren, Werte festschreiben und Vorsorge in Würde gestalten.
                    </p>
                  </div>

                  {/* QUICK STATS PILLS */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 bg-white/90 rounded-2xl border border-[#e2dacb] text-center">
                      <span className="text-[9px] font-mono text-slate-500 block">Erinnerungen</span>
                      <span className="text-base font-serif font-bold text-[#dc2626]">{state.memories?.length || 0}</span>
                    </div>
                    <div className="p-2.5 bg-white/90 rounded-2xl border border-[#e2dacb] text-center">
                      <span className="text-[9px] font-mono text-slate-500 block">Werte</span>
                      <span className="text-base font-serif font-bold text-[#059669]">{(state.werte || []).length}</span>
                    </div>
                    <div className="p-2.5 bg-white/90 rounded-2xl border border-[#e2dacb] text-center">
                      <span className="text-[9px] font-mono text-slate-500 block">Status</span>
                      <span className="text-xs font-mono font-bold text-[#2563eb] block mt-1">Aktiv</span>
                    </div>
                  </div>
                </div>

                {/* QUICK INTENTIONAL CREATOR ACTION BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCreatorOpen(true)}
                  className="w-full py-3.5 bg-[#1c1917] hover:bg-[#292524] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer border border-[#44403c]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#c05621] text-white flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Neue Erinnerung oder Zeitkapsel anlegen</span>
                </motion.button>

                {/* LIFELOOP ORBIT ON HOMEPAGE */}
                <div className="w-full bg-white p-4.5 rounded-3xl border border-[#e2dacb] shadow-xs space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c05621]" />
                      <span className="text-xs font-serif font-bold text-[#1c1917]">Lebenskreis Orbit</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#c05621] bg-[#fdf8f6] font-bold px-2.5 py-0.5 rounded-full border border-[#fbdcd2]">
                      1996 – 2066
                    </span>
                  </div>

                  <Lifeloop
                    phases={state.phases}
                    activePhaseId={activePhaseId}
                    onSelectPhase={setActivePhaseId}
                    memories={state.memories}
                    simulatedDate={state.simulatedDate}
                    onDateChange={handleDateChange}
                  />
                </div>

                {/* 3 SPACE QUICK CARDS ON HOMEPAGE */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-1 block">
                    Direkte Bereiche erkunden
                  </span>

                  {/* SPACE 1 QUICK CARD */}
                  <div
                    onClick={() => setActiveSpace('experience')}
                    className="p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl border border-red-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-red-400 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-xs">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900">Experience Space</h3>
                        <p className="text-[11px] text-slate-600 font-serif italic">Wertvolle Momente & Stammbaum</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-red-600 font-bold">Öffnen →</span>
                  </div>

                  {/* SPACE 2 QUICK CARD */}
                  <div
                    onClick={() => setActiveSpace('personal')}
                    className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900">Personal Space</h3>
                        <p className="text-[11px] text-slate-600 font-serif italic">Werte, Profil & Reflektion</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-600 font-bold">Öffnen →</span>
                  </div>

                  {/* SPACE 3 QUICK CARD */}
                  <div
                    onClick={() => setActiveSpace('life')}
                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-slate-900">Life Space</h3>
                        <p className="text-[11px] text-slate-600 font-serif italic">Planung, Vorsorge & Dokumente</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-600 font-bold">Öffnen →</span>
                  </div>
                </div>

              </div>
            )}

            {/* SPACE 1: EXPERIENCE SPACE */}
            {activeSpace === 'experience' && (
              <ExperienceSpace
                memories={state.memories}
                phases={state.phases}
                simulatedDate={state.simulatedDate}
                onDateChange={handleDateChange}
                onDeleteMemory={handleDeleteMemory}
                onOpenCreator={() => setIsCreatorOpen(true)}
                onGoHome={() => setActiveSpace('home')}
              />
            )}

            {/* SPACE 2: PERSONAL SPACE */}
            {activeSpace === 'personal' && (
              <PersonalSpace
                werte={state.werte || []}
                onAddWerte={handleAddWerte}
                onDeleteWerte={handleDeleteWerte}
                letztesKapitel={state.letztesKapitel}
                onUpdateLetztesKapitel={handleUpdateLetztesKapitel}
                onGoHome={() => setActiveSpace('home')}
              />
            )}

            {/* SPACE 3: LIFE SPACE */}
            {activeSpace === 'life' && (
              <LifeSpace
                letztesKapitel={state.letztesKapitel}
                onUpdateLetztesKapitel={handleUpdateLetztesKapitel}
                onGoHome={() => setActiveSpace('home')}
              />
            )}

          </main>
        </div>

        {/* FLOATING BOTTOM DOCK NAVIGATION BAR (ALWAYS ACCESSIBLE) */}
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px] z-50">
          <div className="bg-[#1c1917]/95 backdrop-blur-xl text-white p-1.5 rounded-full border border-white/10 shadow-2xl flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSpace === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSpace(item.id)}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all cursor-pointer relative ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDockBg"
                      className="absolute inset-0 bg-[#332e2b] rounded-full -z-10 border border-[#524943]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5" style={{ color: isActive ? item.color : undefined }} />
                  <span className="text-[9px] font-mono font-bold mt-0.5 tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Intake Modal for Memory Creation */}
        {isCreatorOpen && (
          <IntentionalCreator
            isOpen={isCreatorOpen}
            phases={state.phases}
            onSave={handleSaveMemory}
            onSaveMemory={handleSaveMemory}
            onClose={() => setIsCreatorOpen(false)}
          />
        )}

      </div>
    </div>
  );
}

export default App;
