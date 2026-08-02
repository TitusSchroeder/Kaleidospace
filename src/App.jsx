import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { SpaceRingHeader, KaleidoscopeIcon } from './components/SpaceRingHeader';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { Lifeloop } from './components/Lifeloop';
import { IntentionalCreator } from './components/IntentionalCreator';
import { StitchPrototype } from './components/StitchPrototype';
import { StitchSanctuary } from './components/StitchSanctuary';
import { StitchObsidian } from './components/StitchObsidian';
import { Fingerprint, Target, Plus, Sparkles, Box, Lock, ShieldCheck, Zap, Heart, Layers, Compass } from 'lucide-react';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState('home'); // 'home', 'experience', 'personal', 'life'
  const [activePhaseId, setActivePhaseId] = useState('all');
  const [activePrototype, setActivePrototype] = useState('v1'); // 'v1', 'stitch', 'sanctuary', 'obsidian'

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

  // IF USER IS TESTING GOOGLE STITCH WERTEKOMPASS PROTOTYPE
  if (activePrototype === 'stitch') {
    return (
      <StitchPrototype
        state={state}
        onGoBackToV1={() => setActivePrototype('v1')}
        onSaveMemory={handleSaveMemory}
      />
    );
  }

  // IF USER IS TESTING STITCH SANCTUARY DESIGN SYSTEM (1-to-1 Stitch Layout 1)
  if (activePrototype === 'sanctuary') {
    return (
      <StitchSanctuary
        state={state}
        onGoBackToV1={() => setActivePrototype('v1')}
        onOpenCreator={() => setIsCreatorOpen(true)}
      />
    );
  }

  // IF USER IS TESTING STITCH OBSIDIAN TECH DESIGN SYSTEM (1-to-1 Stitch Layout 2)
  if (activePrototype === 'obsidian') {
    return (
      <StitchObsidian
        state={state}
        onGoBackToV1={() => setActivePrototype('v1')}
        onOpenCreator={() => setIsCreatorOpen(true)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 flex justify-center selection:bg-emerald-200 selection:text-emerald-900 font-sans">
      
      {/* MOBILE CONTAINER (MAX-W-MD) */}
      <div className="w-full max-w-md min-h-screen bg-[#fafaf8] text-slate-900 shadow-2xl relative flex flex-col justify-between overflow-x-hidden">
        
        <div className="flex-1">
          {/* TOP 3 SPACE RINGS — ONLY DISPLAYED ON HOMEPAGE */}
          {activeSpace === 'home' && (
            <SpaceRingHeader
              activeSpace={activeSpace}
              onSelectSpace={setActiveSpace}
            />
          )}

          {/* MAIN STAGE */}
          <main className="p-4 space-y-4">
            
            {/* HOMEPAGE VIEW — WITH STITCH 1-TO-1 PROTOTYPE LINKS */}
            {activeSpace === 'home' && (
              <div className="space-y-3 select-none">
                
                {/* PROTOTYPE SWITCHER BANNER GRID */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    Stitch 1:1 Design-Entwürfe testen
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {/* STITCH DESIGN 1: SANCTUARY */}
                    <div 
                      onClick={() => setActivePrototype('sanctuary')}
                      className="p-3 bg-gradient-to-r from-[#ffdcc3] to-[#fbf9f5] text-[#2f1500] rounded-2xl border-2 border-[#8d4b00]/40 shadow-sm flex items-center gap-2 cursor-pointer hover:border-[#8d4b00] transition-all"
                    >
                      <Compass className="w-4 h-4 text-[#8d4b00] flex-shrink-0" />
                      <div>
                        <span className="font-serif font-bold text-[11px] text-[#1b1c1a] block line-clamp-1">Stitch: Sanctuary</span>
                        <span className="text-[9px] font-mono text-[#8d4b00] font-bold">Warm Editorial →</span>
                      </div>
                    </div>

                    {/* STITCH DESIGN 2: OBSIDIAN TECH */}
                    <div 
                      onClick={() => setActivePrototype('obsidian')}
                      className="p-3 bg-[#0a0d14] text-white rounded-2xl border-2 border-[#8083ff]/40 shadow-sm flex items-center gap-2 cursor-pointer hover:border-[#8083ff] transition-all"
                    >
                      <Zap className="w-4 h-4 text-[#4cd7f6] flex-shrink-0" />
                      <div>
                        <span className="font-serif font-bold text-[11px] text-white block line-clamp-1">Stitch: Obsidian</span>
                        <span className="text-[9px] font-mono text-[#4cd7f6] font-bold">Dark Hardware →</span>
                      </div>
                    </div>
                  </div>

                  {/* STITCH DESIGN 3: WERTEKOMPASS GRID */}
                  <div
                    onClick={() => setActivePrototype('stitch')}
                    className="p-3 bg-[#1d1b20] text-white rounded-2xl border border-[#4f378a] shadow-sm flex items-center justify-between cursor-pointer hover:bg-[#2b2830] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-serif font-bold text-[11px] text-white block">Stitch: WerteKompass Canvas Grid</span>
                        <span className="text-[9px] font-mono text-purple-300">Space Mono & Material Symbols →</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QUICK INTENTIONAL CREATOR ACTION BUTTON */}
                <button
                  onClick={() => setIsCreatorOpen(true)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Erinnerung oder Zeitkapsel anlegen</span>
                </button>

                {/* LIFELOOP ORBIT ON HOMEPAGE */}
                <div className="w-full">
                  <Lifeloop
                    phases={state.phases}
                    activePhaseId={activePhaseId}
                    onSelectPhase={setActivePhaseId}
                    memories={state.memories}
                    simulatedDate={state.simulatedDate}
                    onDateChange={handleDateChange}
                  />
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
