import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Compass, Lock, Calendar, X } from 'lucide-react';

export const OrbitTimeline = ({
  memories = [],
  phases = [],
  simulatedDate = '2026-07-30',
  darkMode = false,
  onSelectMemory,
}) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const currentYear = new Date(simulatedDate).getFullYear();

  // Orbit Geometry Parameters
  const viewBoxWidth = 800;
  const viewBoxHeight = 440;
  const cx = 400;
  const cy = 220;
  const rx = 320;
  const ry = 150;

  // Calculate day of year ratio (0.0 to 1.0)
  const now = new Date(simulatedDate);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const todayRatio = Math.max(0.02, Math.min(1.0, (dayOfYear % 365) / 365));

  // 12 o'clock is -Math.PI / 2 (-90 deg)
  const startAngle = -Math.PI / 2;
  const todayAngle = startAngle + todayRatio * 2 * Math.PI;

  // 12 o'clock point (Top Center)
  const startX = cx;
  const startY = cy - ry;

  // Today point (Tip of colored arc)
  const todayX = cx + rx * Math.cos(todayAngle);
  const todayY = cy + ry * Math.sin(todayAngle);

  // SVG Elliptical Arc Path from 12 o'clock to Today
  const largeArcFlag = todayRatio > 0.5 ? 1 : 0;
  const coloredArcPath = `M ${startX} ${startY} A ${rx} ${ry} 0 ${largeArcFlag} 1 ${todayX} ${todayY}`;

  // Map memories deterministically along the orbit
  const orbitNodes = memories.map((mem, idx) => {
    const total = memories.length || 1;
    // Map ratio around the year
    const nodeRatio = (idx / total) * 0.95; // Map around the year
    const angle = startAngle + nodeRatio * 2 * Math.PI;

    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);

    const phase = phases.find((p) => p.id === mem.phaseId) || { color: '#10b981', name: 'Lebensphase' };
    const isLocked = mem.isTimeLocked && (!mem.unlockDate || simulatedDate < mem.unlockDate);
    const isPast = nodeRatio <= todayRatio;

    return {
      ...mem,
      x,
      y,
      angle,
      color: isLocked ? '#f59e0b' : phase.color,
      phaseName: phase.name,
      isLocked,
      isPast,
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
              Der Lebenskreis-Orbit
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
        Der Orbit startet oben bei 12 Uhr (1. Jan) und füllt sich im Uhrzeigersinn bis <strong className="text-emerald-600">Heute</strong>. Hovern Sie über Knotenpunkte, um Details zu sehen.
      </p>

      {/* SVG ORBIT STAGE */}
      <div className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center my-2">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#06b6d4" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <filter id="glowPulse" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Full Gray Ellipse (Future/Unwritten Track) */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={darkMode ? '#334155' : '#cbd5e1'}
            strokeWidth="5"
            strokeDasharray="6,8"
            opacity="0.6"
          />

          {/* 2. COLORED FILLED ARC (Starts at 12 o'clock, flows to TODAY) */}
          {todayRatio > 0.001 && (
            <path
              d={coloredArcPath}
              fill="none"
              stroke="url(#orbitGlow)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#glowPulse)"
            />
          )}

          {/* 3. 12 O'CLOCK TOP START TICK (1. JANUAR) */}
          <g transform={`translate(${startX}, ${startY})`}>
            <line
              x1="0"
              y1="-10"
              x2="0"
              y2="10"
              stroke={darkMode ? '#ffffff' : '#0f172a'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              y="-16"
              textAnchor="middle"
              fill={darkMode ? '#94a3b8' : '#64748b'}
              fontSize="10"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              12 UHR (1. JAN)
            </text>
          </g>

          {/* 4. TODAY MARKER NODE (Tip of Arc) */}
          <g transform={`translate(${todayX}, ${todayY})`}>
            <circle
              r="18"
              fill="#10b981"
              opacity="0.3"
              className="animate-ping"
            />
            <circle
              r="12"
              fill="#10b981"
              opacity="0.8"
              filter="url(#glowPulse)"
            />
            <circle r="5" fill="#ffffff" />
            
            <text
              y={todayY > cy ? 24 : -18}
              textAnchor="middle"
              fill={darkMode ? '#34d399' : '#047857'}
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              ★ HEUTE
            </text>
          </g>

          {/* 5. MEMORY NODE DOTS (TEXT VISIBLE ONLY ON HOVER!) */}
          {orbitNodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer transition-all duration-200 group"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  setHoveredNode(node);
                  if (onSelectMemory) onSelectMemory(node);
                }}
              >
                {/* Time-Lock Pulsing Ring */}
                {node.isLocked && (
                  <circle
                    r={isHovered ? 20 : 12}
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
                  r={isHovered ? 16 : 8}
                  fill={node.color}
                  opacity={isHovered ? 0.9 : 0.6}
                  filter="url(#glowPulse)"
                  className="transition-all duration-200"
                />

                {/* Inner Core Dot */}
                <circle
                  r={isHovered ? 6 : 3.5}
                  fill="#ffffff"
                  stroke={node.color}
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:scale-125"
                />

                {/* TEXT LABEL — SHOWN ONLY ON HOVER! */}
                {isHovered && (
                  <g>
                    <rect
                      x="-80"
                      y={node.y > cy ? 16 : -34}
                      width="160"
                      height="22"
                      rx="6"
                      fill={darkMode ? '#0f172a' : '#ffffff'}
                      stroke={node.color}
                      strokeWidth="1.5"
                      className="shadow-lg"
                    />
                    <text
                      y={node.y > cy ? 30 : -20}
                      textAnchor="middle"
                      fill={darkMode ? '#ffffff' : '#0f172a'}
                      fontSize="10"
                      fontFamily="serif"
                      fontWeight="bold"
                    >
                      {node.title.length > 22 ? `${node.title.slice(0, 20)}...` : node.title}
                    </text>
                  </g>
                )}
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
              Life Loop Orbit
            </span>
            <h3 className="text-xs font-serif font-bold line-clamp-1 px-1">
              Lebenszeit im Jahr {currentYear}
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {memories.length} Knotenpunkte
            </span>
          </div>
        </div>

        {/* HOVERED NODE CARD FLOATING PREVIEW */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm rounded-2xl p-4 shadow-2xl border backdrop-blur-md space-y-2 ${
                darkMode
                  ? 'bg-slate-900/95 border-slate-700 text-white'
                  : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2 border-slate-200/40">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  {hoveredNode.phaseName}
                </span>

                <button
                  onClick={() => setHoveredNode(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-3 items-center">
                {hoveredNode.imageUrl && (
                  <img
                    src={hoveredNode.imageUrl}
                    alt={hoveredNode.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200/60 flex-shrink-0"
                  />
                )}
                <div className="space-y-0.5">
                  <h4 className="font-serif font-bold text-xs line-clamp-1">
                    {hoveredNode.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-serif leading-relaxed line-clamp-2">
                    {hoveredNode.story}
                  </p>
                </div>
              </div>

              {hoveredNode.isLocked && (
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-[10px] text-amber-800 dark:text-amber-300 font-serif flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-600 flex-shrink-0" />
                  <span>Zeitkapsel versiegelt bis {hoveredNode.unlockDate}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
