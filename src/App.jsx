import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { SpaceRingHeader, KaleidoscopeIcon } from './components/SpaceRingHeader';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { Lifeloop } from './components/Lifeloop';
import { IntentionalCreator } from './components/IntentionalCreator';
import { PrototypeIOS26 } from './components/PrototypeIOS26';
import { Fingerprint, Target, Plus, Sparkles, Box, Lock, ShieldCheck, Zap } from 'lucide-react';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState('home'); // 'home', 'experience', 'personal', 'life'
  const [activePhaseId, setActivePhaseId] = useState('all');
  const [activePrototype, setActivePrototype] = useState('v1'); // 'v1' (Klassik) or 'ios26' (Liquid Glass)

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

  // IF USER IS TESTING PROTOTYPE 2 (iOS 26 Liquid Glass Edition)
  if (activePrototype === 'ios26') {
    return (
      <PrototypeIOS26
        state={state}
        onGoBackToV1={() => setActivePrototype('v1')}
        onSaveMemory={handleSaveMemory}
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
              onSwitchToIOS26={() => setActivePrototype('ios26')}
            />
          )}

          {/* MAIN STAGE */}
          <main className="p-4 space-y-4">
            
            {/* HOMEPAGE VIEW — WITH LINK TO PROTOTYPE 2 */}
            {activeSpace === 'home' && (
              <div className="space-y-4 select-none">
                
                {/* PROTOTYPE 2 (iOS 26) BANNER BANNER LINK */}
                <div 
                  onClick={() => setActivePrototype('ios26')}
                  className="p-3.5 bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white rounded-2xl border-2 border-purple-500/50 shadow-lg flex items-center justify-between cursor-pointer group hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl shadow-md">
                      <Zap className="w-4 h-4 text-emerald-300 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-xs text-white">Prototyp 2: iOS 26 Liquid Glass</span>
                        <span className="text-[9px] font-mono bg-emerald-500 text-slate-950 px-1.5 py-0.2 font-extrabold rounded-md uppercase">Neu</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-serif">Neuestes Stitch-Designkonzept testen →</p>
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
