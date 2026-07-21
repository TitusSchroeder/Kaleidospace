import React, { useState } from 'react';
import { MemoryCard } from './MemoryCard';
import { PhaseSchatullen } from './PhaseSchatullen';
import { AnimatePresence } from 'framer-motion';
import { Box, Grid } from 'lucide-react';

export const MemoryVault = ({
  memories = [],
  phases = [],
  simulatedDate,
  activePhaseId,
  onDeleteMemory,
  onOpenCreator,
}) => {
  const [vaultViewMode, setVaultViewMode] = useState('schatullen'); // 'schatullen' or 'grid'

  // Filter memories by phase
  const filteredMemories = memories.filter((mem) => {
    if (activePhaseId !== 'all' && mem.phaseId !== activePhaseId) return false;
    return true;
  });

  const activePhase = phases.find((p) => p.id === activePhaseId);

  return (
    <div className="w-full max-w-5xl mx-auto my-10 space-y-6">
      {/* Header bar with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
        <h3 className="font-serif font-bold text-xl text-slate-900">
          Erinnerungs-Archiv {activePhaseId !== 'all' ? `— ${activePhase?.name}` : ''}
          <span className="ml-2 text-xs font-sans font-normal text-slate-400">
            ({filteredMemories.length} Einträge)
          </span>
        </h3>

        {/* View Mode Switcher: Schatullen vs Grid */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setVaultViewMode('schatullen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              vaultViewMode === 'schatullen'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-amber-300" />
            <span>5 Schatullen</span>
          </button>

          <button
            onClick={() => setVaultViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              vaultViewMode === 'grid'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gesamt-Raster</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: 5 SCHATULLEN DER LEBENSPHASEN */}
      {vaultViewMode === 'schatullen' && (
        <PhaseSchatullen
          phases={phases}
          memories={filteredMemories}
          simulatedDate={simulatedDate}
          onDeleteMemory={onDeleteMemory}
          onOpenCreator={onOpenCreator}
        />
      )}

      {/* VIEW MODE 2: SPACIOUS 2-COLUMN EDITORIAL GRID */}
      {vaultViewMode === 'grid' && (
        filteredMemories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredMemories.map((mem) => {
                const phase = phases.find((p) => p.id === mem.phaseId);
                return (
                  <MemoryCard
                    key={mem.id}
                    memory={mem}
                    phase={phase}
                    simulatedDate={simulatedDate}
                    onDeleteMemory={onDeleteMemory}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <p className="text-xs text-slate-400">Keine Erinnerungen in dieser Lebensphase.</p>
            <button
              onClick={onOpenCreator}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Erinnerung hinzufügen
            </button>
          </div>
        )
      )}
    </div>
  );
};
