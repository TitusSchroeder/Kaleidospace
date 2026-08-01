import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { SpaceRingHeader, KaleidoscopeIcon } from './components/SpaceRingHeader';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { Lifeloop } from './components/Lifeloop';
import { IntentionalCreator } from './components/IntentionalCreator';
import { Fingerprint, Target, Plus, Sparkles, Box, Lock, ShieldCheck } from 'lucide-react';

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
            
            {/* HOMEPAGE VIEW — WILLKOMMEN CARD REMOVED */}
            {activeSpace === 'home' && (
              <div className="space-y-4 select-none">
                
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

                {/* OVERVIEW STATS STACKED VERTICALLY */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div
                    onClick={() => setActiveSpace('experience')}
                    className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <KaleidoscopeIcon className="w-5 h-5" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Experience Space</span>
                        <span className="text-[10px] text-slate-500 font-mono">{state.memories.length} gespeicherte Momente</span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveSpace('personal')}
                    className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Fingerprint className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Personal Space</span>
                        <span className="text-[10px] text-slate-500 font-mono">{(state.werte || []).length} Prinzipien in der Werteschrift</span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveSpace('life')}
                    className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Life Space</span>
                        <span className="text-[10px] text-slate-500 font-mono">Datentresor & Vorsorgedokumente</span>
                      </div>
                    </div>
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
