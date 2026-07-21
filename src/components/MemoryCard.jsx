import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Calendar, Trash2 } from 'lucide-react';

export const MemoryCard = ({
  memory,
  simulatedDate,
  phase,
  onDeleteMemory,
}) => {
  const isTimeLocked = memory.isTimeLocked;
  const isUnlocked = !isTimeLocked || (memory.unlockDate && simulatedDate >= memory.unlockDate);

  const formattedUnlockDate = memory.unlockDate
    ? new Date(memory.unlockDate).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`glass-card rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
        !isUnlocked
          ? 'border-amber-200/80 bg-slate-950 text-white shadow-md'
          : 'border-slate-200/80 bg-white text-slate-900 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            !isUnlocked ? 'blur-xl opacity-25 scale-105' : 'blur-0 opacity-100'
          }`}
        />

        {/* Phase Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-xs flex items-center gap-1.5"
            style={{ backgroundColor: phase?.color || '#10b981' }}
          >
            {phase?.name || 'Lebensphase'}
          </span>
        </div>

        {/* Locked Overlay State */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-950/80 backdrop-blur-md">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-2 shadow-md">
              <Lock className="w-5 h-5 animate-pulse" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              Zeitkapsel verriegelt
            </span>

            <h4 className="font-serif font-bold text-sm text-white line-clamp-1 mb-1">{memory.title}</h4>

            <p className="text-[11px] text-slate-300">
              Freigabe am <span className="font-bold text-amber-300">{formattedUnlockDate}</span>
            </p>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-600" />
              <span>{memory.createdAt}</span>
            </span>
          </div>

          <h3 className={`font-serif font-bold text-base leading-snug ${!isUnlocked ? 'text-white' : 'text-slate-900'}`}>
            {memory.title}
          </h3>

          <p className={`text-xs font-serif leading-relaxed line-clamp-4 ${!isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
            {memory.story}
          </p>
        </div>

        {/* Footer with Delete Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100/10 text-[10px] text-slate-400">
          <span>{isUnlocked && isTimeLocked ? '✨ Zeitkapsel freigeschaltet' : ''}</span>
          <button
            onClick={() => onDeleteMemory(memory.id)}
            className="p-1 text-slate-300 hover:text-rose-500 transition-all ml-auto"
            title="Löschen"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
