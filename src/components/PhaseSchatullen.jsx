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
    <div className="w-full space-y-6 select-none">
      
      {/* VIEW 1: THE 5 ELEGANT STORY CHESTS (SCHATULLEN) */}
      {!openedPhaseId ? (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              5 Schatzkisten des Lebens
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Die Schatullen der Lebensphasen
            </h3>
            <p className="text-xs text-slate-500 font-serif max-w-md mx-auto">
              Jede Schatulle bewahrt die Geschichten, Fotos und Zeitkapseln eines Lebensabschnitts. Klicken Sie auf eine Schatulle, um das Album zu öffnen.
            </p>
          </div>

          {/* 5 SCHATULLEN CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {phases.map((phase, idx) => {
              const memsInPhase = memories.filter((m) => m.phaseId === phase.id);
              const lockedCount = memsInPhase.filter(
                (m) => m.isTimeLocked && (!m.unlockDate || simulatedDate < m.unlockDate)
              ).length;

              return (
                <motion.div
                  key={phase.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpenedPhaseId(phase.id)}
                  className="glass-card rounded-3xl p-6 border-2 border-slate-200/90 shadow-md bg-white hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden group"
                  style={{ borderColor: phase.color }}
                >
                  {/* Decorative Color Top Accent Bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{ backgroundColor: phase.color }}
                  />

                  {/* Header info */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {phase.startAge}–{phase.endAge} Jahre
                      </span>

                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Box className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{memsInPhase.length} Erinnerungen</span>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                      Schatulle {idx + 1}: {phase.name}
                    </h4>

                    <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-2">
                      {phase.description}
                    </p>
                  </div>

                  {/* Locked status & open trigger */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                    {lockedCount > 0 ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        <Lock className="w-3 h-3 text-amber-600" />
                        <span>{lockedCount} Zeitkapsel(n) versiegelt</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {memsInPhase.length > 0 ? 'Freigegeben' : 'Leer'}
                      </span>
                    )}

                    <div className="flex items-center gap-1 font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                      <span>Schatulle öffnen</span>
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: OPENED SCHATULLE MEMORY ALBUM */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {/* Top Bar with Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpenedPhaseId(null)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>Alle Schatullen anzeigen</span>
              </button>

              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full shadow-xs"
                  style={{ backgroundColor: openedPhase?.color }}
                />
                <h3 className="font-serif font-bold text-xl lg:text-2xl text-slate-900">
                  Schatulle: {openedPhase?.name}
                </h3>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              {phaseMemories.length} Erinnerungen in dieser Schatulle
            </span>
          </div>

          {/* Cards Grid for Opened Schatulle */}
          {phaseMemories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {phaseMemories.map((mem) => (
                  <MemoryCard
                    key={mem.id}
                    memory={mem}
                    phase={openedPhase}
                    simulatedDate={simulatedDate}
                    onDeleteMemory={onDeleteMemory}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-400">Diese Schatulle ist noch leer.</p>
              <button
                onClick={onOpenCreator}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Erste Erinnerung hinzufügen
              </button>
            </div>
          )}
        </motion.div>
      )}

    </div>
  );
};
