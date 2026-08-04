import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Target, Sparkles, Home } from 'lucide-react';

// Custom Multi-Faceted Symmetrical Kaleidoskop Icon (Warm Gold & Terracotta Editorial Edition)
export const KaleidoscopeIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M12 12 L12 2 L19.07 4.93 Z" fill="#c05621" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L19.07 4.93 L22 12 Z" fill="#d99b26" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L22 12 L19.07 19.07 Z" fill="#1b4d3e" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L19.07 19.07 L12 22 Z" fill="#0284c7" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L12 22 L4.93 19.07 Z" fill="#1e3a8a" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L4.93 19.07 L2 12 Z" fill="#7c3aed" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L2 12 L4.93 4.93 Z" fill="#db2777" stroke="#ffffff" strokeWidth="0.5" />
    <path d="M12 12 L4.93 4.93 L12 2 Z" fill="#e11d48" stroke="#ffffff" strokeWidth="0.5" />
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1" fill="none" />
  </svg>
);

export const SpaceRingHeader = ({ activeSpace = 'home', onSelectSpace }) => {
  return (
    <div className="w-full p-4 bg-[#f3efe6] text-slate-900 select-none border-b border-[#e2dacb] shadow-xs relative overflow-hidden">
      
      {/* Brand Header Bar - Warm Linen Editorial Edition */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#1c1917]">
              KALEIDOspace
            </h1>
            <span className="text-[9px] font-mono uppercase bg-[#e8ded0] text-[#78350f] px-2 py-0.5 rounded-full font-bold border border-[#d6c7b2]">
              Editorial OS
            </span>
          </div>
          <p className="text-xs font-serif italic text-[#c05621] font-semibold mt-0.5">
            Celebrating life
          </p>
          <p className="text-[10px] font-mono text-slate-600 mt-0.5 tracking-tight">
            Mein Lebensbegleiter | My Life Companion (Life Operating System)
          </p>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-white border border-[#e2dacb] shadow-xs flex items-center justify-center text-[#c05621]">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
};
