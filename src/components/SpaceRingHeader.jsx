import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Target } from 'lucide-react';

// Custom multi-phase segmented pie icon displaying all 5 colored life phase slices
export const MultiPhasePieIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" strokeWidth="1.5">
    {/* Phase 1: Red (Kindheit) */}
    <path d="M12 12 L12 2 A10 10 0 0 1 21.5 8.5 Z" fill="#ef4444" stroke="#ffffff" />
    {/* Phase 2: Amber (Wilde Jahre) */}
    <path d="M12 12 L21.5 8.5 A10 10 0 0 1 18 20 Z" fill="#f59e0b" stroke="#ffffff" />
    {/* Phase 3: Emerald (Reifezeit) */}
    <path d="M12 12 L18 20 A10 10 0 0 1 6 20 Z" fill="#10b981" stroke="#ffffff" />
    {/* Phase 4: Blue (Erfüllung) */}
    <path d="M12 12 L6 20 A10 10 0 0 1 2.5 8.5 Z" fill="#3b82f6" stroke="#ffffff" />
    {/* Phase 5: Purple (Vermächtnis) */}
    <path d="M12 12 L2.5 8.5 A10 10 0 0 1 12 2 Z" fill="#8b5cf6" stroke="#ffffff" />
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
      icon: MultiPhasePieIcon,
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
