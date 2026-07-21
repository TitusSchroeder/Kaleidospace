import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Lock, Unlock, Clock, ChevronRight } from 'lucide-react';

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
  const strokeWidth = 30;
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
    <section className="w-full my-6 flex flex-col items-center select-none">
      <AnimatePresence mode="wait">
        {/* VIEW 1: CLEAN 12 O'CLOCK LIFELOOP CIRCLE */}
        {viewMode === 'circle' ? (
          <motion.div
            key="circle-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-4xl mx-auto glass-card rounded-3xl p-6 lg:p-10 border border-slate-200/90 shadow-md bg-white text-slate-900 flex flex-col items-center text-center space-y-6"
          >
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Der Große Lebenskreis (12 Uhr)
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Der Lifeloop
              </h2>
              <p className="text-xs text-slate-500 font-serif max-w-md mx-auto">
                Der Ring füllt sich ab 12 Uhr im Uhrzeigersinn bis zum simulierten Jahr (<span className="font-bold text-emerald-700">{currentYear}</span>). Klicken Sie auf ein Segment, um den Zeitstrahl zu öffnen.
              </p>
            </div>

            {/* INLINE SIMULATED YEAR SLIDER CONTROL */}
            <div className="w-full max-w-md bg-slate-900 text-white rounded-2xl p-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Simuliertes Jahr: <span className="text-white font-mono text-sm">{currentYear}</span></span>
              </div>

              <input
                type="range"
                min="1996"
                max="2066"
                value={currentYear}
                onChange={handleYearSliderChange}
                className="w-full sm:w-44 accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
            </div>

            {/* CLEAN 12 O'CLOCK SVG CIRCLE */}
            <div className="relative flex items-center justify-center my-2">
              <svg
                width="340"
                height="340"
                viewBox="0 0 400 400"
                className="drop-shadow-md"
              >
                {/* 1. Background Gray Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
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
                        opacity={isActive ? 1 : 0.85}
                      />
                    </g>
                  );
                })}

                {/* 12 O'Clock Top Indicator Tick */}
                <line
                  x1={center}
                  y1={center - radius - strokeWidth / 2 - 6}
                  x2={center}
                  y2={center - radius + strokeWidth / 2 + 6}
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="pointer-events-none"
                />
              </svg>

              {/* CENTER CORE BADGE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  onClick={() => onSelectPhase('all')}
                  className="w-40 h-40 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md p-4 flex flex-col items-center justify-center text-center space-y-1 pointer-events-auto cursor-pointer transition-all hover:scale-105"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Jahr {currentYear}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-slate-900 line-clamp-1 px-1">
                    {activePhaseId === 'all' ? 'Der Lebenskreis' : activePhase?.name}
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                    {memories.length} Erinnerungen
                  </span>
                </div>
              </div>
            </div>

            {/* PHASE SELECTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => onSelectPhase('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activePhaseId === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Alle ({memories.length})
              </button>

              {phases.map((phase, idx) => {
                const isActive = activePhaseId === phase.id;
                const phaseStartDeg = idx * segmentAngle - 90;
                const isReached = fillEndAngle > phaseStartDeg;

                return (
                  <button
                    key={phase.id}
                    onClick={() => handlePhaseClick(phase.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-white text-slate-900 border-slate-900 shadow-xs ring-1 ring-slate-900'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: isReached ? phase.color : '#cbd5e1' }}
                    />
                    <span className={isReached ? 'text-slate-800 font-bold' : 'text-slate-400 font-normal'}>
                      {phase.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* VIEW 2: CLEAN, STABLE PHASEN-ZEITSTRAHL CONTAINER */
          <motion.div
            key="timeline-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-5xl mx-auto glass-card rounded-3xl p-6 lg:p-8 border-t-8 border border-slate-200/90 shadow-xl bg-white text-slate-900 space-y-6"
            style={{ borderTopColor: activePhase?.color || '#10b981' }}
          >
            {/* Header with Back Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReturnToCircle}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span>Zurück zum Lebenskreis</span>
                </button>

                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full shadow-xs"
                    style={{ backgroundColor: activePhase?.color || '#10b981' }}
                  />
                  <h3 className="font-serif font-bold text-2xl text-slate-900">
                    Phasen-Zeitstrahl: {activePhase?.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="px-3 py-1 bg-slate-100 rounded-xl font-bold">
                  {activePhase?.startAge}–{activePhase?.endAge} Jahre
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl font-bold border border-emerald-200">
                  {phaseMemories.length} Erinnerungen
                </span>
              </div>
            </div>

            {/* HORIZONTAL ZEITSTRAHL ACHSE WITH ALTERNATING CARDS (DRÜBER & DRUNTER) */}
            <div className="w-full space-y-2">
              <p className="text-xs text-slate-500 font-serif italic text-center">
                {activePhase?.description}
              </p>

              {/* Scrollable Timeline Area */}
              <div className="relative py-4 my-2 overflow-x-auto min-h-[520px] flex flex-col justify-center">
                
                {/* CENTRAL HORIZONTAL AXIS LINE */}
                <div className="absolute top-[260px] left-0 right-0 h-1.5 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 rounded-full shadow-inner" />

                {/* Alternating Memory Columns */}
                <div className="relative z-10 flex items-center gap-10 min-w-max px-12">
                  {phaseMemories.length > 0 ? (
                    phaseMemories.map((mem, index) => {
                      const isTopRow = index % 2 === 0;
                      const isLocked = mem.isTimeLocked && (!mem.unlockDate || simulatedDate < mem.unlockDate);

                      return (
                        <div
                          key={mem.id}
                          className="relative flex flex-col items-center w-72 flex-shrink-0"
                          style={{
                            marginTop: isTopRow ? '0px' : '260px',
                            marginBottom: isTopRow ? '260px' : '0px',
                          }}
                        >
                          {/* CARD ITEM */}
                          <div className="w-72 glass-card rounded-2xl p-4 border border-slate-200 shadow-md space-y-2 bg-white hover:shadow-lg transition-all">
                            {/* Photo Thumbnail */}
                            <div className="relative h-32 rounded-xl overflow-hidden bg-slate-950">
                              <img
                                src={mem.imageUrl}
                                alt={mem.title}
                                className={`w-full h-full object-cover transition-all ${
                                  isLocked ? 'blur-md opacity-30 brightness-50' : 'opacity-100'
                                }`}
                              />
                              {isLocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-slate-950/70 text-white text-center">
                                  <Lock className="w-4 h-4 text-amber-400 mb-0.5 animate-pulse" />
                                  <span className="text-[10px] font-bold text-amber-300">
                                    Freigabe am {mem.unlockDate}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Text Info */}
                            <div className="space-y-1 text-left">
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-emerald-600" />
                                  {mem.createdAt}
                                </span>
                              </div>

                              <h4 className="font-serif font-bold text-xs text-slate-900 line-clamp-1">
                                {mem.title}
                              </h4>

                              <p className="text-[11px] text-slate-600 font-serif leading-relaxed line-clamp-2">
                                {mem.story}
                              </p>
                            </div>
                          </div>

                          {/* VERTICAL CONNECTOR STICK */}
                          <div
                            className={`absolute w-0.5 bg-slate-300 ${
                              isTopRow ? 'top-[225px] h-[35px]' : 'bottom-[225px] h-[35px]'
                            }`}
                          />

                          {/* TICK NODE ON CENTRAL AXIS LINE */}
                          <div
                            className="absolute top-[252px] w-5 h-5 rounded-full bg-white border-2 shadow-md flex items-center justify-center font-mono text-[9px] font-bold z-20"
                            style={{ borderColor: activePhase?.color || '#10b981' }}
                          >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePhase?.color || '#10b981' }} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full text-center py-12 text-slate-400 text-xs italic">
                      Keine Erinnerungen in dieser Lebensphase hinterlegt.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
