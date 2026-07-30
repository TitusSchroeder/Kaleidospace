import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Lock, Sparkles, Clock, Compass, Heart, ArrowRight, X } from 'lucide-react';

export const OrbitTimeline = ({
  memories = [],
  phases = [],
  simulatedDate = '2026-07-30',
  darkMode = false,
  onSelectMemory,
}) => {
  const [activeNode, setActiveNode] = useState(null);
  const currentYear = new Date(simulatedDate).getFullYear();

  // Orbit Geometry Parameters
  const viewBoxWidth = 800;
  const viewBoxHeight = 440;
  const cx = 400;
  const cy = 220;
  const rx = 320;
  const ry = 160;

  // Calculate today angle (day of year ratio 0 to 360 degrees)
  const now = new Date(simulatedDate);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const todayRatio = (dayOfYear % 365) / 365;
  const todayAngle = -Math.PI / 2 + todayRatio * 2 * Math.PI;

  const todayX = cx + rx * Math.cos(todayAngle);
  const todayY = cy + ry * Math.sin(todayAngle);

  // Map memories and milestones as node dots along the Orbit
  const orbitNodes = memories.map((mem, idx) => {
    const total = memories.length || 1;
    // Distribute nodes evenly with a nice phase offset along the ellipse
    const ratio = (idx / total);
    const angle = -Math.PI / 2 + ratio * 2 * Math.PI;

    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);

    const phase = phases.find((p) => p.id === mem.phaseId) || { color: '#10b981', name: 'Lebensphase' };
    const isLocked = mem.isTimeLocked && (!mem.unlockDate || simulatedDate < mem.unlockDate);

    return {
      ...mem,
      x,
      y,
      angle,
      color: isLocked ? '#f59e0b' : phase.color,
      phaseName: phase.name,
      isLocked,
    };
  });

  return (
    <div className={`relative w-full rounded-3xl p-6 lg:p-8 transition-colors duration-300 border shadow-xl select-none overflow-hidden ${
      darkMode
        ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md'
        : 'bg-white/90 border-slate-200/90 text-slate-900 backdrop-blur-md'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/40 gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'} border border-emerald-500/20`}>
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Signature Life OS Element
            </span>
            <h2 className="text-2xl font-serif font-bold tracking-tight">
              Der Life Loop Orbit
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-bold">Jahr {currentYear}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Heute ({now.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })})</span>
          </div>
        </div>
      </div>

      {/* SUBTITLE */}
      <p className="text-xs text-slate-500 dark:text-slate-400 font-serif max-w-lg mx-auto text-center mt-3">
        Der Orbit veranschaulicht den Fluss Ihrer Lebenszeit im Jahr <span className="font-bold text-emerald-600">{currentYear}</span>. Hovern oder klicken Sie auf die Knotenpunkte.
      </p>

      {/* SVG ORBIT STAGE (VIEWBOX 800 x 440) */}
      <div className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center my-2">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Orbit Ellipse Gradient */}
            <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="25%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <filter id="glowPulse" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Main Dynamic Ellipse Path */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={darkMode ? '#334155' : '#cbd5e1'}
            strokeWidth="4"
            strokeDasharray="6,8"
            opacity="0.7"
          />

          {/* 2. Highlight Orbit Flow Path */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="url(#orbitGlow)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#glowPulse)"
            opacity="0.85"
          />

          {/* 3. TODAY MARKER NODE ("HEUTE") */}
          <g transform={`translate(${todayX}, ${todayY})`}>
            {/* Pulsing Outer Ring */}
            <circle
              r="18"
              fill="#10b981"
              opacity="0.3"
              className="animate-ping"
            />
            {/* Outer Glow */}
            <circle
              r="12"
              fill="#10b981"
              opacity="0.8"
              filter="url(#glowPulse)"
            />
            {/* White Core Dot */}
            <circle r="5" fill="#ffffff" />
            
            {/* Today Badge Text */}
            <text
              y="-20"
              textAnchor="middle"
              fill={darkMode ? '#34d399' : '#047857'}
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              ★ HEUTE
            </text>
          </g>

          {/* 4. MEMORY & MILESTONE NODE DOTS */}
          {orbitNodes.map((node) => {
            const isHovered = activeNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer transition-all duration-200 group"
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => {
                  setActiveNode(node);
                  if (onSelectMemory) onSelectMemory(node);
                }}
              >
                {/* Time-Lock Pulsing Ring */}
                {node.isLocked && (
                  <circle
                    r={isHovered ? 20 : 14}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    className="animate-spin"
                    style={{ animationDuration: '6s' }}
                  />
                )}

                {/* Outer Glow Circle */}
                <circle
                  r={isHovered ? 16 : 10}
                  fill={node.color}
                  opacity={isHovered ? 0.85 : 0.5}
                  filter="url(#glowPulse)"
                  className="transition-all duration-200"
                />

                {/* Inner Core Dot */}
                <circle
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke={node.color}
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:scale-125"
                />

                {/* Node Title Label */}
                <text
                  y={node.y > cy ? 22 : -16}
                  textAnchor="middle"
                  fill={darkMode ? '#e2e8f0' : '#1e293b'}
                  fontSize="10"
                  fontFamily="serif"
                  fontWeight="bold"
                  opacity={isHovered ? 1 : 0.8}
                >
                  {node.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* CENTER ORBIT CORE BADGE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-40 h-40 rounded-full p-4 flex flex-col items-center justify-center text-center space-y-1 backdrop-blur-md shadow-lg border pointer-events-auto transition-transform hover:scale-105 ${
            darkMode
              ? 'bg-slate-900/90 border-slate-700 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
              Life OS Orbit
            </span>
            <h3 className="text-xs font-serif font-bold line-clamp-1 px-1">
              Lebenszeit-Kompass
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {memories.length} Knotenpunkte
            </span>
          </div>
        </div>

        {/* ACTIVE NODE INTERACTIVE PREVIEW CARD */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm rounded-2xl p-4 shadow-2xl border backdrop-blur-md space-y-2 ${
                darkMode
                  ? 'bg-slate-900/95 border-slate-700 text-white'
                  : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2 border-slate-200/40">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  {activeNode.phaseName}
                </span>

                <button
                  onClick={() => setActiveNode(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-3 items-center">
                {activeNode.imageUrl && (
                  <img
                    src={activeNode.imageUrl}
                    alt={activeNode.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200/60 flex-shrink-0"
                  />
                )}
                <div className="space-y-0.5">
                  <h4 className="font-serif font-bold text-xs line-clamp-1">
                    {activeNode.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-serif leading-relaxed line-clamp-2">
                    {activeNode.story}
                  </p>
                </div>
              </div>

              {activeNode.isLocked && (
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-[10px] text-amber-800 dark:text-amber-300 font-serif flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-600 flex-shrink-0" />
                  <span>Zeitkapsel versiegelt bis {activeNode.unlockDate}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
