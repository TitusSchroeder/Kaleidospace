import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';

export const Lifeloop = ({
  phases = [],
  activePhaseId,
  onSelectPhase,
  memories = [],
  simulatedDate = '2026-07-19',
  onDateChange,
}) => {
  const [viewMode, setViewMode] = useState('circle'); // 'circle' or 'timeline'
  const currentYear = new Date(simulatedDate).getFullYear();

  // Circle Parameters (360px SVG viewBox 400x400)
  const center = 200;
  const radius = 140;
  const strokeWidth = 32;
  const numPhases = phases.length;
  const segmentAngle = 360 / numPhases;

  // Lifetime Year Mapping (1996 = Age 0 at 12 o'clock, 2066 = Age 70)
  const lifeStartYear = 1996;
  const lifeEndYear = 2066;
  const totalYearsSpan = lifeEndYear - lifeStartYear;
  const progressRatio = Math.max(0, Math.min(1, (currentYear - lifeStartYear) / totalYearsSpan));
  const fillEndAngle = -90 + progressRatio * 360;

  const activePhaseIndex = phases.findIndex((p) => p.id === activePhaseId);
  const activePhase = phases[activePhaseIndex >= 0 ? activePhaseIndex : 0];

  // Memories for focused phase
  const phaseMemories = activePhaseId !== 'all'
    ? memories.filter((m) => m.phaseId === activePhaseId)
    : memories;

  // Handle year slider input
  const handleYearSliderChange = (e) => {
    const yr = parseInt(e.target.value, 10);
    if (onDateChange) {
      onDateChange(`${yr}-07-19`);
    }
  };

  // Switch to Timeline view when clicking a phase
  const handlePhaseClick = (phaseId) => {
    onSelectPhase(phaseId);
    setViewMode('timeline');
  };

  const handleReturnToCircle = () => {
    onSelectPhase('all');
    setViewMode('circle');
  };

  return (
    <section className="w-full my-2 flex flex-col items-center select-none">
      <AnimatePresence mode="wait">
        {/* VIEW 1: ULTRA-COMPACT 12 O'CLOCK LIFELOOP CIRCLE */}
        {viewMode === 'circle' ? (
          <motion.div
            key="circle-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mx-auto bg-white rounded-3xl p-3 border-2 border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3"
          >
            {/* COMPACT SVG CIRCLE */}
            <div className="relative flex items-center justify-center my-1">
              <svg
                width="220"
                height="220"
                viewBox="0 0 400 400"
                className="drop-shadow-sm"
              >
                {/* 1. Background Gray Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                />

                {/* 2. Color Filled Phase Arc Segments */}
                {phases.map((phase, idx) => {
                  const startDeg = idx * segmentAngle - 90;
                  const endDeg = startDeg + segmentAngle;

                  if (startDeg >= fillEndAngle) return null;

                  const actualEndDeg = Math.min(endDeg + 0.5, fillEndAngle);
                  if (actualEndDeg <= startDeg) return null;

                  const startRad = (startDeg * Math.PI) / 180;
                  const endRad = (actualEndDeg * Math.PI) / 180;

                  const x1 = center + radius * Math.cos(startRad);
                  const y1 = center + radius * Math.sin(startRad);
                  const x2 = center + radius * Math.cos(endRad);
                  const y2 = center + radius * Math.sin(endRad);

                  const spanDeg = actualEndDeg - startDeg;
                  const largeArcFlag = spanDeg <= 180 ? '0' : '1';
                  const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

                  const isActive = activePhaseId === phase.id;

                  return (
                    <g
                      key={phase.id}
                      className="cursor-pointer transition-all duration-200 group"
                      onClick={() => handlePhaseClick(phase.id)}
                    >
                      <path
                        d={pathData}
                        fill="none"
                        stroke={phase.color}
                        strokeWidth={isActive ? strokeWidth + 6 : strokeWidth}
                        strokeLinecap="round"
                        className="group-hover:opacity-100 transition-all duration-200"
                        opacity={isActive ? 1 : 0.9}
                      />
                    </g>
                  );
                })}

                {/* 12 O'Clock Top Indicator Tick */}
                <line
                  x1={center}
                  y1={center - radius - strokeWidth / 2 - 4}
                  x2={center}
                  y2={center - radius + strokeWidth / 2 + 4}
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="pointer-events-none"
                />
              </svg>

              {/* CENTER CORE BADGE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  onClick={() => onSelectPhase('all')}
                  className="w-28 h-28 rounded-full bg-white border border-slate-200 shadow-md p-2 flex flex-col items-center justify-center text-center pointer-events-auto cursor-pointer transition-all hover:scale-105"
                >
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-400">
                    Jahr {currentYear}
                  </span>
                  <h3 className="text-xs font-serif font-bold text-slate-900 line-clamp-1">
                    {activePhaseId === 'all' ? 'Lifeloop' : activePhase?.name}
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-0.5">
                    {memories.length} Momente
                  </span>
                </div>
              </div>
            </div>

            {/* COMPACT SIMULATED YEAR SLIDER CONTROL */}
            <div className="w-full bg-slate-900 text-white rounded-xl p-2 px-3 flex items-center justify-between gap-2 shadow-xs text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px] whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Jahr: <span className="text-white font-mono text-xs">{currentYear}</span></span>
              </div>

              <input
                type="range"
                min="1996"
                max="2066"
                value={currentYear}
                onChange={handleYearSliderChange}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
            </div>

            {/* QUICK PHASE PILLS */}
            <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
              {phases.map((phase) => {
                const isActive = activePhaseId === phase.id;
                return (
                  <button
                    key={phase.id}
                    onClick={() => handlePhaseClick(phase.id)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {phase.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* VIEW 2: TIMELINE VIEW FOR SELECTED PHASE */
          <motion.div
            key="timeline-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mx-auto bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <button
                onClick={handleReturnToCircle}
                className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zurück zum Lifeloop</span>
              </button>
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                {activePhase?.name}
              </span>
            </div>

            <div className="space-y-2">
              {phaseMemories.length > 0 ? (
                phaseMemories.map((mem) => (
                  <div key={mem.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">{mem.title}</span>
                    <p className="text-slate-600 font-serif italic line-clamp-2">{mem.story}</p>
                    <span className="text-[10px] text-slate-400 block font-mono">{mem.createdAt}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Keine Erinnerungen in dieser Lebensphase.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
