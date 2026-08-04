import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Target } from 'lucide-react';

// Custom Multi-Faceted Symmetrical Kaleidoskop Icon
export const KaleidoscopeIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    {/* 8 Vibrant Symmetrical Crystal Facets radiating from center (12, 12) */}
    <path d="M12 12 L12 2 L19.07 4.93 Z" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L19.07 4.93 L22 12 Z" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L22 12 L19.07 19.07 Z" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L19.07 19.07 L12 22 Z" fill="#06b6d4" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L12 22 L4.93 19.07 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L4.93 19.07 L2 12 Z" fill="#8b5cf6" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L2 12 L4.93 4.93 Z" fill="#ec4899" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L4.93 4.93 L12 2 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="0.5" />
    {/* Center Lens Sparkle */}
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
    {/* Outer Boundary Circle */}
    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1" fill="none" />
  </svg>
);

export const SpaceRingHeader = ({ activeSpace = 'home', onSelectSpace }) => {
  const spaces = [
    {
      id: 'experience',
      title: 'Experience',
      color: '#dc2626',
      bgGlow: 'from-red-600/20 to-amber-500/10',
      borderSolid: 'border-red-500',
      textSolid: 'text-red-500',
      icon: KaleidoscopeIcon,
    },
    {
      id: 'personal',
      title: 'Personal',
      color: '#10b981',
      bgGlow: 'from-emerald-600/20 to-teal-500/10',
      borderSolid: 'border-emerald-500',
      textSolid: 'text-emerald-400',
      icon: Fingerprint,
    },
    {
      id: 'life',
      title: 'Life',
      color: '#2563eb',
      bgGlow: 'from-blue-600/20 to-indigo-500/10',
      borderSolid: 'border-blue-500',
      textSolid: 'text-blue-400',
      icon: Target,
    },
  ];

  return (
    <div className="w-full p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white select-none border-b border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* BACKGROUND GLOW SPHERE */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-serif font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              KALEIDOspace
            </h1>
            <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              Life OS
            </span>
          </div>
          <p className="text-xs font-serif italic text-emerald-400 font-medium mt-0.5">
            Celebrating life
          </p>
          <p className="text-[9px] font-mono text-slate-400 mt-0.5 tracking-tight">
            Mein Lebensbegleiter | My Life Companion (Life Operating System)
          </p>
        </div>
      </div>

      {/* 3 WHOOP-STYLE RING PORTALS WITH HIGH-FASHION GLOW */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        {spaces.map((sp) => {
          const Icon = sp.icon;
          const isActive = activeSpace === sp.id;

          return (
            <motion.div
              key={sp.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelectSpace(sp.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden ${
                isActive
                  ? `bg-slate-900 ${sp.borderSolid} shadow-lg shadow-black/50 ring-2 ring-white/20 scale-[1.02]`
                  : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-b ${sp.bgGlow} pointer-events-none`} />
              )}

              {/* Solid Color Ring Indicator */}
              <div
                className={`w-14 h-14 rounded-full border-[4.5px] flex items-center justify-center overflow-hidden transition-all shadow-inner relative z-10 ${
                  isActive ? 'scale-105 shadow-md' : 'opacity-90'
                }`}
                style={{
                  borderColor: sp.color,
                  backgroundColor: isActive ? sp.color : 'rgba(15, 23, 42, 0.6)',
                }}
              >
                <Icon className={`w-7 h-7 ${isActive ? 'text-white drop-shadow-md' : sp.textSolid}`} />
              </div>

              {/* Caption Text */}
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 relative z-10">
                {sp.title}
              </h4>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
