import React from 'react';
import { Plus } from 'lucide-react';

export const Header = ({ onOpenCreator }) => {
  return (
    <header className="w-full py-6 px-4 lg:px-8 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div className="space-y-0.5">
          <h1 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-slate-900">
            Kaleidospace
          </h1>
          <p className="text-xs text-slate-500 font-serif italic">
            Raum für Verlangsamung, Zeitkapseln & bleibende Spuren
          </p>
        </div>

        {/* Single minimal action button */}
        <button
          onClick={onOpenCreator}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Erinnerung hinzufügen</span>
        </button>
      </div>
    </header>
  );
};
