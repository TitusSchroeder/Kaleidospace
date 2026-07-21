import React from 'react';
import { Calendar, Lock, Unlock } from 'lucide-react';

export const TimeSimulationBar = ({
  simulatedDate,
  onDateChange,
  memories = [],
}) => {
  const currentYear = new Date(simulatedDate).getFullYear();

  // Calculate unlocked vs locked stats for current simulatedDate
  const unlockedCount = memories.filter(
    (m) => !m.isTimeLocked || (m.unlockDate && simulatedDate >= m.unlockDate)
  ).length;
  const lockedCount = memories.length - unlockedCount;

  const handleYearSlider = (e) => {
    const year = e.target.value;
    const monthDay = simulatedDate.slice(5) || '07-19';
    onDateChange(`${year}-${monthDay}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 bg-slate-900 text-white rounded-2xl p-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
      {/* Year Display & Slider */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Simuliertes Jahr: {currentYear}</span>
        </div>

        <input
          type="range"
          min="2020"
          max="2040"
          value={currentYear}
          onChange={handleYearSlider}
          className="w-32 sm:w-48 accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs font-medium">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Unlock className="w-3.5 h-3.5" />
          <span>{unlockedCount} Offen</span>
        </span>
        <span className="text-slate-700">|</span>
        <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>{lockedCount} Zeitkapseln verriegelt</span>
        </span>
      </div>
    </div>
  );
};
