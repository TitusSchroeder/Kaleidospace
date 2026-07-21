import React, { useState } from 'react';
import { Sparkles, Lock, Unlock, Compass, Star, RotateCcw } from 'lucide-react';

export const StellarConstellation = ({
  phases = [],
  activePhaseId,
  onSelectPhase,
  memories = [],
  simulatedDate = '2026-07-19',
}) => {
  const [hoveredStarId, setHoveredStarId] = useState(null);

  // Compute memory counts and lock statuses
  const countsPerPhase = phases.reduce((acc, p) => {
    const phaseMems = memories.filter((m) => m.phaseId === p.id);
    const lockedMems = phaseMems.filter(
      (m) => m.isTimeLocked && (!m.unlockDate || simulatedDate < m.unlockDate)
    );
    acc[p.id] = {
      total: phaseMems.length,
      locked: lockedMems.length,
      unlocked: phaseMems.length - lockedMems.length,
    };
    return acc;
  }, {});

  const totalMemories = memories.length;
  const activePhase = phases.find((p) => p.id === activePhaseId);

  // Coordinates for the 5 Nebula Clusters along a celestial curve on a 800x380 SVG viewBox
  const clusterPositions = [
    { x: 100, y: 260 }, // Phase 1: Kindheit
    { x: 250, y: 140 }, // Phase 2: Wilde Jahre
    { x: 400, y: 240 }, // Phase 3: Familiengründung
    { x: 550, y: 130 }, // Phase 4: Reifezeit
    { x: 700, y: 250 }, // Phase 5: Vermächtnis
  ];

  // Map each memory to a specific star coordinate around its phase nebula
  const memoryStarNodes = memories.map((mem, index) => {
    const phaseIndex = phases.findIndex((p) => p.id === mem.phaseId);
    const cluster = clusterPositions[phaseIndex >= 0 ? phaseIndex : 0] || clusterPositions[0];
    
    // Spread stars in an orbit around cluster center based on index
    const phaseMems = memories.filter((m) => m.phaseId === mem.phaseId);
    const memIndexInPhase = phaseMems.findIndex((m) => m.id === mem.id);
    const totalInPhase = phaseMems.length || 1;
    
    const angle = (memIndexInPhase / totalInPhase) * Math.PI * 2 + (index * 0.4);
    const orbitRadius = 38 + (memIndexInPhase % 2) * 16;
    
    const x = cluster.x + Math.cos(angle) * orbitRadius;
    const y = cluster.y + Math.sin(angle) * orbitRadius;
    
    const isLocked = mem.isTimeLocked && (!mem.unlockDate || simulatedDate < mem.unlockDate);

    return {
      ...mem,
      x,
      y,
      isLocked,
    };
  });

  // SVG Constellation Curve Path
  const constellationPath = `M ${clusterPositions[0].x} ${clusterPositions[0].y} Q ${clusterPositions[1].x} ${clusterPositions[1].y - 40} ${clusterPositions[2].x} ${clusterPositions[2].y} T ${clusterPositions[4].x} ${clusterPositions[4].y}`;

  const hoveredStar = memoryStarNodes.find((s) => s.id === hoveredStarId);

  return (
    <section className="w-full my-6">
      {/* COSMIC CANVAS CONTAINER */}
      <div className="w-full max-w-5xl mx-auto rounded-3xl p-6 lg:p-10 bg-gradient-to-b from-[#0b0f19] via-[#0f172a] to-[#1e1b4b] text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        
        {/* Twinkling Background Stars (CSS decorative dots) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-10 left-16 w-1 h-1 bg-white rounded-full animate-twinkle" />
          <div className="absolute top-24 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-20 w-1 h-1 bg-amber-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-12 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-8 right-1/3 w-1 h-1 bg-rose-200 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Section Header */}
        <div className="text-center space-y-1 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-bold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="uppercase tracking-widest">Das Kosmische Sternbild</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Der Himmel der Erinnerungen
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-serif">
            Jeder leuchtende Stern ist eine Erinnerung. Klicken Sie auf ein Sternbild, um in diesen Lebensabschnitt einzutauchen.
          </p>
        </div>

        {/* INTERACTIVE CELESTIAL CANVAS */}
        <div className="relative w-full flex justify-center items-center my-2">
          <svg
            viewBox="0 0 800 380"
            className="w-full max-w-4xl h-auto drop-shadow-2xl"
          >
            <defs>
              {/* Star Glow Filter */}
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Locked Time-Capsule Ring Glow */}
              <filter id="lockGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Constellation Line (Lebensfaden) */}
            <path
              d={constellationPath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="4 8"
              opacity="0.3"
            />
            <path
              d={constellationPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              className="animate-stardust"
              opacity="0.6"
            />

            {/* Render 5 Phase Nebulae & Labels */}
            {phases.map((phase, idx) => {
              const pos = clusterPositions[idx] || clusterPositions[0];
              const isActive = activePhaseId === phase.id;
              const stats = countsPerPhase[phase.id] || { total: 0, locked: 0, unlocked: 0 };

              return (
                <g
                  key={phase.id}
                  className="cursor-pointer group"
                  onClick={() => onSelectPhase(phase.id)}
                >
                  {/* Nebula Glow Atmosphere */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 65 : 50}
                    fill={phase.color}
                    opacity={isActive ? 0.25 : 0.12}
                    className="transition-all duration-500 animate-nebula"
                  />

                  {/* Inner Cluster Ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 28 : 22}
                    fill="none"
                    stroke={phase.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? 'none' : '3 3'}
                    opacity={isActive ? 0.9 : 0.4}
                    className="transition-all duration-300"
                  />

                  {/* Nebula Center Core Dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 6 : 4}
                    fill={phase.color}
                    filter="url(#starGlow)"
                  />

                  {/* Phase Label & Age Range Below Cluster */}
                  <text
                    x={pos.x}
                    y={pos.y + 48}
                    fill={isActive ? '#ffffff' : '#94a3b8'}
                    fontSize="11"
                    fontWeight={isActive ? 'bold' : '500'}
                    textAnchor="middle"
                    className="pointer-events-none select-none font-sans"
                  >
                    {phase.name}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 62}
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {phase.startAge}–{phase.endAge} J. ({stats.total})
                  </text>
                </g>
              );
            })}

            {/* Render Memory Stars along Nebulae */}
            {memoryStarNodes.map((star) => {
              const phase = phases.find((p) => p.id === star.phaseId);
              const isHovered = hoveredStarId === star.id;
              const isPhaseActive = activePhaseId === 'all' || activePhaseId === star.phaseId;

              return (
                <g
                  key={star.id}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => onSelectPhase(star.phaseId)}
                  onMouseEnter={() => setHoveredStarId(star.id)}
                  onMouseLeave={() => setHoveredStarId(null)}
                  opacity={isPhaseActive ? 1 : 0.25}
                >
                  {/* Connection Line from Cluster Center to Star */}
                  {(() => {
                    const phaseIndex = phases.findIndex((p) => p.id === star.phaseId);
                    const cluster = clusterPositions[phaseIndex >= 0 ? phaseIndex : 0];
                    return (
                      <line
                        x1={cluster.x}
                        y1={cluster.y}
                        x2={star.x}
                        y2={star.y}
                        stroke={phase?.color || '#38bdf8'}
                        strokeWidth="1"
                        opacity="0.25"
                      />
                    );
                  })()}

                  {/* Locked Time Capsule Ring (If locked) */}
                  {star.isLocked && (
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={isHovered ? 12 : 9}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      filter="url(#lockGlow)"
                      className="animate-spin-slow"
                    />
                  )}

                  {/* Main Star Node Circle */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isHovered ? 7 : star.isLocked ? 4.5 : 5}
                    fill={star.isLocked ? '#fbbf24' : '#ffffff'}
                    filter="url(#starGlow)"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Glass Tooltip on Hover */}
          {hoveredStar && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-indigo-500/30 text-white rounded-2xl p-3 shadow-2xl max-w-xs space-y-1.5 animate-fade-in"
              style={{
                left: `${(hoveredStar.x / 800) * 100}%`,
                top: `${(hoveredStar.y / 380) * 100 - 15}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{phases.find((p) => p.id === hoveredStar.phaseId)?.name}</span>
              </div>
              <h4 className="font-serif font-bold text-xs leading-snug line-clamp-1">{hoveredStar.title}</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 italic font-serif">{hoveredStar.story}</p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{hoveredStar.createdAt}</span>
                {hoveredStar.isLocked ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Zeitkapsel verriegelt
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Unlock className="w-2.5 h-2.5" />
                    Freigeschaltet
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phase Selector Badges Below Canvas */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => onSelectPhase('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activePhaseId === 'all'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Alle Sterne ({totalMemories})
          </button>

          {phases.map((phase) => {
            const isActive = activePhaseId === phase.id;
            const stats = countsPerPhase[phase.id] || { total: 0, locked: 0, unlocked: 0 };
            return (
              <button
                key={phase.id}
                onClick={() => onSelectPhase(phase.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? 'bg-white text-slate-950 border-white shadow-md'
                    : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: phase.color }}
                />
                <span>{phase.name}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800 rounded-md text-slate-400">
                  {stats.total}
                </span>
              </button>
            );
          })}

          {activePhaseId !== 'all' && (
            <button
              onClick={() => onSelectPhase('all')}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-white px-2 py-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Zurück</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
