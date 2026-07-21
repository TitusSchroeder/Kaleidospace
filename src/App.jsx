import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { Header } from './components/Header';
import { TimeSimulationBar } from './components/TimeSimulationBar';
import { Lifeloop } from './components/Lifeloop';
import { MemoryVault } from './components/MemoryVault';
import { IntentionalCreator } from './components/IntentionalCreator';
import { WerteKompass } from './components/WerteKompass';
import { DasLetzteKapitel } from './components/DasLetzteKapitel';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeView, setActiveView] = useState('loop'); // 'loop', 'werte', 'letztes-kapitel'

  // Auto save to localStorage when state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Handlers
  const handleDateChange = (newDate) => {
    setState((prev) => ({ ...prev, simulatedDate: newDate }));
  };

  const handleSelectPhase = (phaseId) => {
    setState((prev) => ({ ...prev, activePhaseId: phaseId }));
  };

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
    <div className="min-h-screen bg-[#fafaf8] text-slate-900 flex flex-col justify-between font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <div>
        {/* Header with Navigation Tabs */}
        <Header
          activeView={activeView}
          onSelectView={setActiveView}
          onOpenCreator={() => setIsCreatorOpen(true)}
        />

        {/* Main Content Stage */}
        <main className="max-w-5xl mx-auto px-4 lg:px-8 py-4 space-y-6">
          {activeView === 'loop' && (
            <>
              {/* LIFELOOP CENTERPIECE */}
              <Lifeloop
                phases={state.phases}
                activePhaseId={state.activePhaseId}
                onSelectPhase={handleSelectPhase}
                memories={state.memories}
                simulatedDate={state.simulatedDate}
                onDateChange={handleDateChange}
              />

              {/* Minimal Inline Time Simulation */}
              <TimeSimulationBar
                simulatedDate={state.simulatedDate}
                onDateChange={handleDateChange}
              />

              {/* Clean Memory Vault Grid */}
              <MemoryVault
                memories={state.memories}
                phases={state.phases}
                simulatedDate={state.simulatedDate}
                activePhaseId={state.activePhaseId}
                onDeleteMemory={handleDeleteMemory}
                onOpenCreator={() => setIsCreatorOpen(true)}
              />
            </>
          )}

          {activeView === 'werte' && (
            <WerteKompass
              werte={state.werte || []}
              onAddWerte={handleAddWerte}
              onDeleteWerte={handleDeleteWerte}
            />
          )}

          {activeView === 'letztes-kapitel' && (
            <DasLetzteKapitel
              letztesKapitel={state.letztesKapitel}
              onUpdateLetztesKapitel={handleUpdateLetztesKapitel}
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
  );
}

export default App;
