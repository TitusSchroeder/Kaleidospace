import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Target } from 'lucide-react';

// Custom Multi-Faceted Symmetrical Kaleidoskop Icon
export const KaleidoscopeIcon = ({ className = "w-5 h-5" }) => (
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
        </div>
      </div>

      {/* 3 WHOOP-STYLE RING PORTALS */}
      <div className="grid grid-cols-3 gap-2.5 pt-3">
        {spaces.map((sp) => {
          const Icon = sp.icon;
          const isActive = activeSpace === sp.id;

          return (
            <motion.div
              key={sp.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectSpace(sp.id)}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1.5 ${
                isActive
                  ? `bg-slate-800 ${sp.borderSolid} shadow-lg ring-2 ring-white/20`
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Solid Color Ring Indicator */}
              <div
                className="w-10 h-10 rounded-full border-4 flex items-center justify-center overflow-hidden"
                style={{
                  borderColor: sp.color,
                  backgroundColor: isActive ? sp.color : 'transparent',
                }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : sp.textSolid}`} />
              </div>

              <h4 className="text-xs font-serif font-bold text-white">
                {sp.title}
              </h4>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
