import React from 'react';
import { Plus, Compass, Scroll, Feather } from 'lucide-react';

export const Header = ({ activeView = 'loop', onSelectView, onOpenCreator }) => {
  return (
    <header className="w-full py-5 px-4 lg:px-8 border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="space-y-0.5 text-center md:text-left">
          <h1 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>Kaleidospace</span>
          </h1>
          <p className="text-xs text-slate-500 font-serif italic">
            Raum für Verlangsamung, Zeitkapseln & bleibende Spuren
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner text-xs">
          <button
            onClick={() => onSelectView && onSelectView('loop')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeView === 'loop'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Der Lifeloop</span>
          </button>

          <button
            onClick={() => onSelectView && onSelectView('werte')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeView === 'werte'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Scroll className="w-4 h-4 text-amber-600" />
            <span>Werte-Kompass</span>
          </button>

          <button
            onClick={() => onSelectView && onSelectView('letztes-kapitel')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeView === 'letztes-kapitel'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Feather className="w-4 h-4 text-rose-600" />
            <span>Das Letzte Kapitel</span>
          </button>
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
