import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Unlock, Calendar, HeartHandshake, Eye, X } from 'lucide-react';

export const StellarConstellation = ({
  memories = [],
  phases = [],
  simulatedDate = '2026-07-19',
}) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);

  // Group memories by phase for constellation mapping
  const width = 900;
  const height = 480;

  // Phase Orbit Centers
  const phaseCenters = {
    'phase-1': { cx: 160, cy: 240, color: '#10b981' },
    'phase-2': { cx: 330, cy: 160, color: '#06b6d4' },
    'phase-3': { cx: 480, cy: 300, color: '#f59e0b' },
    'phase-4': { cx: 640, cy: 170, color: '#8b5cf6' },
    'phase-5': { cx: 780, cy: 280, color: '#ec4899' },
  };

  // Compute deterministic (x, y) for each memory star
  const memoryStars = memories.map((mem, idx) => {
    const pCenter = phaseCenters[mem.phaseId] || { cx: 450, cy: 240, color: '#10b981' };
    const phaseMems = memories.filter((m) => m.phaseId === mem.phaseId);
    const subIndex = phaseMems.findIndex((m) => m.id === mem.id);
    const totalInPhase = phaseMems.length;

    const angle = (subIndex / Math.max(1, totalInPhase)) * Math.PI * 2 + (idx * 0.4);
    const radius = 60 + (subIndex % 3) * 35;

    const x = Math.max(80, Math.min(width - 80, pCenter.cx + Math.cos(angle) * radius));
    const y = Math.max(60, Math.min(height - 60, pCenter.cy + Math.sin(angle) * radius));

    const isLocked = mem.isTimeLocked && (!mem.unlockDate || simulatedDate < mem.unlockDate);

    return {
      ...mem,
      x,
      y,
      color: pCenter.color,
      isLocked,
    };
  });

  // Group star nodes by phase to draw constellation lines
  const constellationLines = phases.map((phase) => {
    const starsInPhase = memoryStars.filter((s) => s.phaseId === phase.id);
    const pathPoints = starsInPhase.map((s) => `${s.x},${s.y}`).join(' L ');
    return {
      phaseId: phase.id,
      color: phase.color,
      pathD: starsInPhase.length > 1 ? `M ${pathPoints}` : '',
    };
  });

  return (
    <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border border-indigo-900/60 shadow-2xl p-4 lg:p-6 text-white">
      
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800/80 z-20 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
              Kosmische Sternenbild-Perspektive
            </span>
            <h3 className="font-serif font-bold text-lg text-white">
              Der Lebenshimmel
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{memories.length} leuchtende Sterne</span>
          </span>
          <span className="hidden sm:inline text-slate-500 italic">| Klicken Sie auf einen Stern</span>
        </div>
      </div>

      {/* MAIN CELESTIAL SKY CANVAS */}
      <div className="relative w-full h-[480px] flex items-center justify-center my-2">
        
        {/* Background Twinkling Micro-Stars */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                top: `${(i * 17) % 95}%`,
                left: `${(i * 23) % 95}%`,
                animationDuration: `${(i % 4) + 2}s`,
              }}
            />
          ))}
        </div>

        {/* SVG CONSTELLATIONS & STAR NODES */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full relative z-10 drop-shadow-2xl"
        >
          <defs>
            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="lockGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Constellation Lines between same-phase stars */}
          {constellationLines.map((line) => (
            <path
              key={line.phaseId}
              d={line.pathD}
              fill="none"
              stroke={line.color}
              strokeWidth="1.5"
              strokeDasharray="4,6"
              opacity="0.45"
              className="transition-all duration-300"
            />
          ))}

          {/* 2. Interactive Star Nodes */}
          {memoryStars.map((star) => {
            const isHovered = hoveredStar?.id === star.id;

            return (
              <g
                key={star.id}
                className="cursor-pointer transition-all duration-300 group"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => setSelectedMemory(star)}
                transform={`translate(${star.x}, ${star.y})`}
              >
                {/* Lock Aura Ring (If Time Locked) */}
                {star.isLocked && (
                  <circle
                    r={isHovered ? 24 : 18}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    className="animate-spin"
                    style={{ animationDuration: '8s' }}
                    filter="url(#lockGlow)"
                  />
                )}

                {/* Outer Glow Circle */}
                <circle
                  r={isHovered ? 18 : 12}
                  fill={star.color}
                  opacity={isHovered ? 0.7 : 0.35}
                  filter="url(#starGlow)"
                  className="transition-all duration-200"
                />

                {/* Core Star Node */}
                <circle
                  r={isHovered ? 7 : 5}
                  fill="#ffffff"
                  stroke={star.color}
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:scale-125"
                />

                {/* Star Label Tag */}
                <text
                  y={isHovered ? -16 : -12}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="serif"
                  fontWeight="bold"
                  opacity={isHovered ? 1 : 0.75}
                  className="pointer-events-none transition-opacity"
                >
                  {star.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* HOVER TOOLTIP FLOATING BADGE */}
        <AnimatePresence>
          {hoveredStar && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 left-6 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl max-w-xs space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  {hoveredStar.createdAt}
                </span>
                {hoveredStar.isLocked && (
                  <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded-md">
                    <Lock className="w-3 h-3" />
                    <span>Versiegelt</span>
                  </span>
                )}
              </div>

              <h4 className="font-serif font-bold text-xs text-white line-clamp-1">
                {hoveredStar.title}
              </h4>

              <p className="text-[11px] text-slate-300 font-serif line-clamp-2 leading-relaxed">
                {hoveredStar.story}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MEMORY INSPECTION MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-slate-900 rounded-3xl p-6 lg:p-8 max-w-xl w-full shadow-2xl border border-slate-200 relative space-y-5"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Header */}
              <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  className={`w-full h-full object-cover transition-all ${
                    selectedMemory.isLocked ? 'blur-md opacity-30 brightness-50' : 'opacity-100'
                  }`}
                />

                {selectedMemory.isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/75 text-white text-center space-y-1">
                    <Lock className="w-8 h-8 text-amber-400 mb-1 animate-pulse" />
                    <span className="text-xs font-bold text-amber-300">
                      Zeitkapsel versiegelt bis {selectedMemory.unlockDate || 'Zukunft'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Treuhand-Bote: {selectedMemory.treuhandBote || 'Abschiedsbegleiter Dr. Marcus Weber'}
                    </span>
                  </div>
                )}
              </div>

              {/* Memory Details */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedMemory.createdAt}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                    Sternbild-Erinnerung
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {selectedMemory.title}
                </h3>

                <p className="text-xs text-slate-700 font-serif leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  „{selectedMemory.story}“
                </p>
              </div>

              {/* Trustee Info (If applicable) */}
              {selectedMemory.treuhandBote && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-3 text-xs text-amber-900 font-serif">
                  <HeartHandshake className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Abschiedsbegleiter Treuhand-Status:</span>
                    <span className="text-[11px] text-amber-800">{selectedMemory.treuhandBote}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
