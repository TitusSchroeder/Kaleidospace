import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { PhoneContainer } from './components/PhoneContainer';
import { SpaceRingHeader } from './components/SpaceRingHeader';
import { OrbitTimeline } from './components/OrbitTimeline';
import { ExperienceSpace } from './components/spaces/ExperienceSpace';
import { PersonalSpace } from './components/spaces/PersonalSpace';
import { LifeSpace } from './components/spaces/LifeSpace';
import { IntentionalCreator } from './components/IntentionalCreator';
import { Home, Heart, Compass, Target, Plus, ArrowRight } from 'lucide-react';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState('home'); // 'home', 'experience', 'personal', 'life'

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

  return (
    <PhoneContainer>
      
      {/* WHOOP-STYLE SPACE RING HEADER */}
      <SpaceRingHeader
        activeSpace={activeSpace}
        onSelectSpace={setActiveSpace}
      />

      {/* MAIN CONTAINER CONTENT STAGE */}
      <main className="p-4 space-y-4">
        
        {/* HOMEPAGE VIEW */}
        {activeSpace === 'home' && (
          <div className="space-y-4 pb-20 select-none">
            
            {/* LIFE LOOP ORBIT CENTERPIECE */}
            <OrbitTimeline
              memories={state.memories}
              phases={state.phases}
              simulatedDate={state.simulatedDate}
              darkMode={false}
            />

            {/* 3 SPACE PORTAL CARDS */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-slate-900 px-1">
                Die 3 Haupt-Räume (Spaces)
              </h3>

              {/* CARD 1: EXPERIENCE SPACE */}
              <div
                onClick={() => setActiveSpace('experience')}
                className="p-4 bg-red-600 text-white rounded-3xl border-2 border-red-700 shadow-md hover:bg-red-700 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white text-red-600 rounded-2xl">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase bg-red-700 px-2 py-0.5 rounded-full">
                      Space 1
                    </span>
                    <h4 className="font-serif font-bold text-base">Experience Space</h4>
                    <p className="text-xs text-red-100 font-serif">Wertvolle Momente bewahren</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>

              {/* CARD 2: PERSONAL SPACE */}
              <div
                onClick={() => setActiveSpace('personal')}
                className="p-4 bg-emerald-600 text-white rounded-3xl border-2 border-emerald-700 shadow-md hover:bg-emerald-700 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white text-emerald-600 rounded-2xl">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase bg-emerald-700 px-2 py-0.5 rounded-full">
                      Space 2
                    </span>
                    <h4 className="font-serif font-bold text-base">Personal Space</h4>
                    <p className="text-xs text-emerald-100 font-serif">Das Leben bewusst leben</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>

              {/* CARD 3: LIFE SPACE */}
              <div
                onClick={() => setActiveSpace('life')}
                className="p-4 bg-blue-600 text-white rounded-3xl border-2 border-blue-700 shadow-md hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white text-blue-600 rounded-2xl">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase bg-blue-700 px-2 py-0.5 rounded-full">
                      Space 3
                    </span>
                    <h4 className="font-serif font-bold text-base">Life Space</h4>
                    <p className="text-xs text-blue-100 font-serif">Wesentliches im Blick behalten</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
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
            onDeleteMemory={handleDeleteMemory}
            onOpenCreator={() => setIsCreatorOpen(true)}
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
          />
        )}

        {/* SPACE 3: LIFE SPACE */}
        {activeSpace === 'life' && (
          <LifeSpace
            letztesKapitel={state.letztesKapitel}
            onUpdateLetztesKapitel={handleUpdateLetztesKapitel}
          />
        )}

      </main>

      {/* BOTTOM MOBILE NAVIGATION BAR */}
      <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-50 bg-slate-900 text-white border-t border-slate-800 p-2 flex items-center justify-around select-none">
        <button
          onClick={() => setActiveSpace('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 transition-all ${
            activeSpace === 'home' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveSpace('experience')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 transition-all ${
            activeSpace === 'experience' ? 'text-red-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Experience</span>
        </button>

        {/* Floating Intake Add Button */}
        <button
          onClick={() => setIsCreatorOpen(true)}
          className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg hover:bg-emerald-400 transition-all cursor-pointer -mt-4 border-2 border-slate-900"
        >
          <Plus className="w-5 h-5 font-bold" />
        </button>

        <button
          onClick={() => setActiveSpace('personal')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 transition-all ${
            activeSpace === 'personal' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Personal</span>
        </button>

        <button
          onClick={() => setActiveSpace('life')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 transition-all ${
            activeSpace === 'life' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Life</span>
        </button>
      </nav>

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

    </PhoneContainer>
  );
}

export default App;
