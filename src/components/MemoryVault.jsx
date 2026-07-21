import React from 'react';
import { MemoryCard } from './MemoryCard';
import { AnimatePresence } from 'framer-motion';

export const MemoryVault = ({
  memories = [],
  phases = [],
  simulatedDate,
  activePhaseId,
  onDeleteMemory,
  onOpenCreator,
}) => {
  // Filter memories by phase
  const filteredMemories = memories.filter((mem) => {
    if (activePhaseId !== 'all' && mem.phaseId !== activePhaseId) return false;
    return true;
  });

  const activePhase = phases.find((p) => p.id === activePhaseId);

  return (
    <div className="w-full max-w-5xl mx-auto my-10 space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="font-serif font-bold text-xl text-slate-900">
          Erinnerungen {activePhaseId !== 'all' ? `— ${activePhase?.name}` : ''}
          <span className="ml-2 text-xs font-sans font-normal text-slate-400">
            ({filteredMemories.length} Einträge)
          </span>
        </h3>
      </div>

      {/* Spacious 2-Column Editorial Grid */}
      {filteredMemories.length > 0 ? (
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
      )}
    </div>
  );
};
