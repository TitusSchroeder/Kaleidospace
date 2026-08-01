import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Lock, Unlock, Calendar, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { MemoryCard } from './MemoryCard';

export const PhaseSchatullen = ({
  phases = [],
  memories = [],
  simulatedDate = '2026-07-19',
  onDeleteMemory,
  onOpenCreator,
}) => {
  const [openedPhaseId, setOpenedPhaseId] = useState(null);

  const openedPhase = phases.find((p) => p.id === openedPhaseId);
  const phaseMemories = openedPhaseId
    ? memories.filter((m) => m.phaseId === openedPhaseId)
    : [];

  return (
    <div className="w-full space-y-4 select-none">
      
      {/* VIEW 1: THE 5 STORY CHESTS STACKED VERTICALLY */}
      {!openedPhaseId ? (
        <div className="space-y-3">
          <div className="text-center space-y-0.5">
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Die 5 Schatullen der Lebensphasen
            </h3>
            <p className="text-xs text-slate-500 font-serif">
              Jede Schatulle bewahrt die Geschichten eines Lebensabschnitts.
            </p>
          </div>

          {/* 5 SCHATULLEN CARDS - STRICTLY SINGLE COLUMN STACKED UNDERNEATH EACH OTHER */}
          <div className="grid grid-cols-1 gap-3 pt-1">
            {phases.map((phase, idx) => {
              const memsInPhase = memories.filter((m) => m.phaseId === phase.id);
              const lockedCount = memsInPhase.filter(
                (m) => m.isTimeLocked && (!m.unlockDate || simulatedDate < m.unlockDate)
              ).length;

              return (
                <div
                  key={phase.id}
                  onClick={() => setOpenedPhaseId(phase.id)}
                  className="rounded-2xl p-4 border-2 border-slate-200 bg-white hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group shadow-sm"
                  style={{ borderLeftWidth: '6px', borderLeftColor: phase.color }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {phase.startAge}–{phase.endAge} Jahre
                      </span>

                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <Box className="w-3 h-3 text-emerald-600" />
                        <span>{memsInPhase.length} Erinnerungen</span>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-base text-slate-900">
                      Schatulle {idx + 1}: {phase.name}
                    </h4>

                    <p className="text-xs text-slate-600 font-serif leading-snug">
                      {phase.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    {lockedCount > 0 ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Lock className="w-3 h-3 text-amber-600" />
                        <span>{lockedCount} Kapsel(n) versiegelt</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {memsInPhase.length > 0 ? 'Freigegeben' : 'Leer'}
                      </span>
                    )}

                    <div className="flex items-center gap-1 font-bold text-xs text-slate-900">
                      <span>Öffnen</span>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: ALBUM VIEW OF OPENED SCHATULLE (STRICTLY VERTICALLY STACKED UNDERNEATH EACH OTHER!) */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-md">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                {openedPhase.startAge}–{openedPhase.endAge} Jahre
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                Schatulle: {openedPhase.name}
              </h3>
            </div>

            <button
              onClick={() => setOpenedPhaseId(null)}
              className="flex items-center gap-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
          </div>

          {/* MEMORY CARDS - STRICTLY SINGLE COLUMN STACKED */}
          {phaseMemories.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {phaseMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  simulatedDate={simulatedDate}
                  onDelete={onDeleteMemory}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <Box className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-serif">
                Diese Schatulle ist noch leer. Fügen Sie Ihre erste Erinnerung hinzu.
              </p>
              <button
                onClick={onOpenCreator}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Erinnerung verfassen
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
