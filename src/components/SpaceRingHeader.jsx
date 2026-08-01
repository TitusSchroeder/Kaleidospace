import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Target, ArrowRight } from 'lucide-react';

export const SpaceRingHeader = ({ activeSpace = 'home', onSelectSpace }) => {
  const spaces = [
    {
      id: 'experience',
      title: 'Experience Space',
      subtitle: 'Wertvolle Momente',
      color: '#dc2626', // Solid Crimson Red
      bgSolid: 'bg-red-600',
      borderSolid: 'border-red-600',
      textSolid: 'text-red-600',
      icon: Heart,
    },
    {
      id: 'personal',
      title: 'Personal Space',
      subtitle: 'Bewusst leben',
      color: '#10b981', // Solid Emerald Green
      bgSolid: 'bg-emerald-600',
      borderSolid: 'border-emerald-600',
      textSolid: 'text-emerald-600',
      icon: Compass,
    },
    {
      id: 'life',
      title: 'Life Space',
      subtitle: 'Management & Vorsorge',
      color: '#2563eb', // Solid Royal Blue
      bgSolid: 'bg-blue-600',
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
          <h1 className="text-xl font-serif font-bold tracking-tight flex items-center gap-1.5 text-white">
            <span>KALEIDOspace</span>
          </h1>
          <p className="text-[10px] font-serif italic text-emerald-400">
            Celebrating life • Life Operating System
          </p>
        </div>

        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          WHOOP Space Rings
        </span>
      </div>

      {/* 3 WHOOP-STYLE RING PORTALS */}
      <div className="grid grid-cols-3 gap-2 pt-3">
        {spaces.map((sp) => {
          const Icon = sp.icon;
          const isActive = activeSpace === sp.id;

          return (
            <motion.div
              key={sp.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectSpace(sp.id)}
              className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1.5 relative ${
                isActive
                  ? `bg-slate-800 ${sp.borderSolid} shadow-lg ring-2 ring-white/20`
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Solid Color Ring Indicator */}
              <div
                className="w-10 h-10 rounded-full border-4 flex items-center justify-center transition-transform"
                style={{
                  borderColor: sp.color,
                  backgroundColor: isActive ? sp.color : 'transparent',
                }}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : sp.textSolid}`} />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[11px] font-serif font-bold text-white leading-tight">
                  {sp.title.split(' ')[0]}
                </h4>
                <span className="text-[9px] font-mono text-slate-400 block leading-tight">
                  {sp.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
