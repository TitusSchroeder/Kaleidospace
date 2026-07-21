import React from 'react';
import { motion } from 'framer-motion';

export const KaleidoscopeBackground = ({ simulatedDate = '2026-07-19' }) => {
  const currentYear = new Date(simulatedDate).getFullYear();
  const yearDelta = Math.max(0, currentYear - 1996);

  // Butterfly Effect Parameters: Small year changes drive sweeping geometry shifts
  const dynamicScale = 1 + (yearDelta % 25) * 0.025; // Expands rings smoothly
  const innerScale = 0.8 + (yearDelta % 15) * 0.03;
  const rotationDuration = Math.max(30, 90 - (yearDelta % 30) * 1.5); // Speed adjusts with era

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none bg-[#fafaf8]">
      
      {/* LAYER 1: ULTRA-DETAILED 32-FOLD MANDALA (DYNAMICALLY EXPANDS WITH YEAR) */}
      <motion.svg
        animate={{
          rotate: 360,
          scale: [dynamicScale, dynamicScale * 1.05, dynamicScale],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: rotationDuration, ease: 'linear' },
          scale: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
        }}
        viewBox="0 0 1200 1200"
        className="w-[1800px] h-[1800px] text-slate-400 stroke-current fill-none opacity-30 max-w-none"
        style={{ strokeWidth: 0.6 }}
      >
        <g transform="translate(600, 600)">
          {/* 32-fold Intricate Micro-Symmetry */}
          {[...Array(32)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 11.25})`}>
              {/* Fine Filigree Facets */}
              <path d="M 0,0 Q 30,-120 0,-240 Q -30,-120 0,0" opacity="0.6" />
              <path d="M 0,0 Q 60,-200 0,-400 Q -60,-200 0,0" opacity="0.4" />
              <path d="M 0,-120 Q 80,-240 0,-360 Q -80,-240 0,-120" opacity="0.3" />
              
              {/* Micro Ornaments & Nodes */}
              <circle cx="0" cy="-180" r="6" strokeWidth="0.4" opacity="0.7" />
              <circle cx="0" cy="-300" r="12" strokeWidth="0.4" opacity="0.5" />
              <circle cx="0" cy="-440" r="18" strokeWidth="0.3" opacity="0.4" />
              <polygon points="0,-520 12,-490 -12,-490" opacity="0.6" />

              <line x1="0" y1="0" x2="0" y2="-560" strokeDasharray="2,6" opacity="0.25" />
            </g>
          ))}

          {/* Intricate Concentric Lattice Rings */}
          <circle cx="0" cy="0" r="90" strokeWidth="0.8" opacity="0.6" />
          <circle cx="0" cy="0" r="180" strokeWidth="0.6" opacity="0.5" />
          <circle cx="0" cy="0" r="270" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4" />
          <circle cx="0" cy="0" r="360" strokeWidth="0.5" opacity="0.35" />
          <circle cx="0" cy="0" r="450" strokeWidth="0.4" strokeDasharray="6,8" opacity="0.3" />
          <circle cx="0" cy="0" r="540" strokeWidth="0.3" opacity="0.2" />
        </g>
      </motion.svg>

      {/* LAYER 2: COUNTER-ROTATING DETAILED INNER LATTICE (DYNAMIC BUTTERFLY EFFECT) */}
      <motion.svg
        animate={{
          rotate: -360,
          scale: [innerScale, innerScale * 1.08, innerScale],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: rotationDuration * 1.4, ease: 'linear' },
          scale: { repeat: Infinity, duration: 16, ease: 'easeInOut' },
        }}
        viewBox="0 0 900 900"
        className="absolute w-[1300px] h-[1300px] text-slate-500 stroke-current fill-none opacity-25 max-w-none"
        style={{ strokeWidth: 0.5 }}
      >
        <g transform="translate(450, 450)">
          {[...Array(24)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 15})`}>
              <polygon points="0,0 25,-100 0,-200 -25,-100" opacity="0.4" />
              <polygon points="0,-200 40,-300 0,-400 -40,-300" opacity="0.25" />
              <circle cx="0" cy="-150" r="8" opacity="0.5" />
            </g>
          ))}
          <circle cx="0" cy="0" r="150" strokeWidth="0.6" strokeDasharray="2,4" opacity="0.5" />
          <circle cx="0" cy="0" r="300" strokeWidth="0.4" opacity="0.3" />
        </g>
      </motion.svg>

    </div>
  );
};
