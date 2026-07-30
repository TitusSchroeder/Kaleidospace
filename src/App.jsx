import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/storage';
import { Header } from './components/Header';
import { CockpitDashboard } from './components/CockpitDashboard';
import { Lifeloop } from './components/Lifeloop';
import { LifeCompassSpace } from './components/LifeCompassSpace';
import { LifeStagePlanningSpace } from './components/LifeStagePlanningSpace';
import { MeinKreis } from './components/MeinKreis';
import { SecurityVault } from './components/SecurityVault';
import { Marktplatz } from './components/Marktplatz';
import { MemoryVault } from './components/MemoryVault';
import { TimeSimulationBar } from './components/TimeSimulationBar';
import { IntentionalCreator } from './components/IntentionalCreator';
import { DasLetzteKapitel } from './components/DasLetzteKapitel';

export function App() {
  const [state, setState] = useState(getInitialState);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [activeView, setActiveView] = useState('cockpit'); // 'cockpit', 'loop', 'compass', 'stage-planning', 'kreis', 'vault', 'marktplatz'
  const [darkMode, setDarkMode] = useState(false);

  // Auto save to localStorage when state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply dark mode class to root body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-emerald-200 selection:text-emerald-900 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#fafaf8] text-slate-900'
    }`}>
      <div>
        {/* Header with 6-Level Navigation & Dark Mode Switch */}
        <Header
          activeView={activeView}
          onSelectView={setActiveView}
          onOpenCreator={() => setIsCreatorOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        {/* Main Content Stage Across the 6 Levels */}
        <main className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-8">
          
          {/* LEVEL 1: COCKPIT (DASHBOARD) */}
          {activeView === 'cockpit' && (
            <CockpitDashboard
              phases={state.phases}
              activePhaseId={state.activePhaseId}
              memories={state.memories}
              simulatedDate={state.simulatedDate}
              onDateChange={handleDateChange}
              onOpenCreator={() => setIsCreatorOpen(true)}
              onNavigateTab={setActiveView}
              darkMode={darkMode}
            />
          )}

          {/* LEVEL 2 SPACE 1: LIFE LOOP (MEIN LEBEN) */}
          {activeView === 'loop' && (
            <>
              <Lifeloop
                phases={state.phases}
                activePhaseId={state.activePhaseId}
                onSelectPhase={handleSelectPhase}
                memories={state.memories}
                simulatedDate={state.simulatedDate}
                onDateChange={handleDateChange}
              />

              <TimeSimulationBar
                simulatedDate={state.simulatedDate}
                onDateChange={handleDateChange}
              />

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

          {/* LEVEL 2 SPACE 2: LIFE COMPASS (MEIN KOMPASS) */}
          {activeView === 'compass' && (
            <LifeCompassSpace
              werte={state.werte || []}
              onAddWerte={handleAddWerte}
              onDeleteWerte={handleDeleteWerte}
              darkMode={darkMode}
            />
          )}

          {/* LEVEL 2 SPACE 3: LIFE STAGE PLANNING (MEIN MORGEN) */}
          {activeView === 'stage-planning' && (
            <>
              <LifeStagePlanningSpace
                darkMode={darkMode}
                onNavigateTab={setActiveView}
              />

              {/* Das Letzte Kapitel Integration */}
              <DasLetzteKapitel
                letztesKapitel={state.letztesKapitel}
                onUpdateLetztesKapitel={handleUpdateLetztesKapitel}
              />
            </>
          )}

          {/* LEVEL 3: MEIN KREIS (SHARING & GOVERNANCE) */}
          {activeView === 'kreis' && (
            <MeinKreis darkMode={darkMode} />
          )}

          {/* LEVEL 4: DATENTRESOR (SECURITY VAULT) */}
          {activeView === 'vault' && (
            <SecurityVault darkMode={darkMode} />
          )}

          {/* LEVEL 6: KURATIERTER MARKTPLATZ */}
          {activeView === 'marktplatz' && (
            <Marktplatz darkMode={darkMode} />
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
