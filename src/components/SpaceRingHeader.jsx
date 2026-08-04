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
      borderSolid: 'border-red-600',
      textSolid: 'text-red-600',
      icon: KaleidoscopeIcon,
    },
    {
      id: 'personal',
      title: 'Personal',
      color: '#10b981',
      borderSolid: 'border-emerald-600',
      textSolid: 'text-emerald-600',
      icon: Fingerprint,
    },
    {
      id: 'life',
      title: 'Life',
      color: '#2563eb',
      borderSolid: 'border-blue-600',
      textSolid: 'text-blue-600',
      icon: Target,
    },
  ];

  return (
    <div className="w-full p-4 bg-slate-900 text-white select-none shadow-md">
      
      {/* Brand Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-serif font-bold tracking-tight text-white">
            KALEIDOspace
          </h1>
          <p className="text-xs font-serif italic text-emerald-400">
            Celebrating life
          </p>
          <p className="text-[9px] font-mono text-slate-400 mt-0.5">
            Mein Lebensbegleiter | My Life Companion (Life Operating System)
          </p>
        </div>
      </div>

      {/* 3 WHOOP-STYLE RING PORTALS WITH LARGER RINGS AND SMALLER CAPTION TEXT */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        {spaces.map((sp) => {
          const Icon = sp.icon;
          const isActive = activeSpace === sp.id;

          return (
            <motion.div
              key={sp.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectSpace(sp.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 ${
                isActive
                  ? `bg-slate-800 ${sp.borderSolid} shadow-lg ring-2 ring-white/20`
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Larger Solid Color Ring Indicator */}
              <div
                className="w-14 h-14 rounded-full border-[5px] flex items-center justify-center overflow-hidden transition-all shadow-inner"
                style={{
                  borderColor: sp.color,
                  backgroundColor: isActive ? sp.color : 'transparent',
                }}
              >
                <Icon className={`w-7 h-7 ${isActive ? 'text-white' : sp.textSolid}`} />
              </div>

              {/* Smaller Caption Text */}
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                {sp.title}
              </h4>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
