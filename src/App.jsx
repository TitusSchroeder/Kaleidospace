import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { SpaceRingHeader } from './components/SpaceRingHeader';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { Lifeloop } from './components/Lifeloop';
import { IntentionalCreator } from './components/IntentionalCreator';
import { Plus } from 'lucide-react';

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

  return (
    <div className="w-full min-h-screen bg-[#090b11] flex justify-center selection:bg-emerald-200 selection:text-emerald-900 font-sans p-0 sm:p-4">
      
      {/* MOBILE CONTAINER (MAX-W-MD) */}
      <div className="w-full max-w-md min-h-screen bg-[#fafaf8] text-slate-900 shadow-2xl relative flex flex-col justify-between overflow-x-hidden sm:rounded-[36px] sm:border border-slate-800/80">
        
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
            
            {/* HOMEPAGE VIEW — CLEAN & STREAMLINED */}
            {activeSpace === 'home' && (
              <div className="space-y-4 select-none">
                
                {/* QUICK INTENTIONAL CREATOR ACTION BUTTON */}
                <button
                  onClick={() => setIsCreatorOpen(true)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer border border-slate-800"
                >
                  <Plus className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>Erinnerung oder Zeitkapsel anlegen</span>
                </button>

                {/* LIFELOOP ORBIT ON HOMEPAGE */}
                <div className="w-full bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-serif font-bold text-slate-900">Lebenskreis Orbit</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
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
