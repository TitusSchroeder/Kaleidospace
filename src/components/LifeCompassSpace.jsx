import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WerteKompass } from './WerteKompass';
import { Compass, Sparkles, ShieldCheck, Heart, Award, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export const LifeCompassSpace = ({ werte = [], onAddWerte, onDeleteWerte, darkMode = false }) => {
  const [compassTab, setCompassTab] = useState('werte'); // 'werte', 'radar', 'priorities'
  const [satisfactionScores, setSatisfactionScores] = useState({
    gesundheit: 80,
    beziehungen: 90,
    beruf: 75,
    finanzen: 85,
    persoenlichkeit: 85,
    sinn: 95,
  });

  const handleScoreChange = (key, value) => {
    setSatisfactionScores((prev) => ({
      ...prev,
      [key]: parseInt(value, 10),
    }));
  };

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Header Banner */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-2xl">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-3 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                Ebene 2 • Raum 2
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Life Compass (Mein Kompass)
              </h2>
            </div>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setCompassTab('werte')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                compassTab === 'werte'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Die Werteschrift
            </button>
            <button
              onClick={() => setCompassTab('radar')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                compassTab === 'radar'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Lebenszufriedenheit
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: WERTE-KOMPASS */}
      {compassTab === 'werte' && (
        <WerteKompass
          werte={werte}
          onAddWerte={onAddWerte}
          onDeleteWerte={onDeleteWerte}
        />
      )}

      {/* TAB 2: LEBENSZUFRIEDENHEITS-RADAR */}
      {compassTab === 'radar' && (
        <div className={`p-6 lg:p-10 rounded-3xl border shadow-xl space-y-8 transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-1 text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-3 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              Persönlichkeits-Check-in
            </span>
            <h3 className="text-2xl font-serif font-bold">
              Lebenszufriedenheits-Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-serif">
              Bewerten Sie regelmäßig Ihre Zufriedenheit in den 6 zentralen Lebensbereichen für Ausgewogenheit und innere Ruhe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders for 6 Dimensions */}
            <div className="space-y-4 text-xs">
              {[
                { key: 'gesundheit', label: 'Gesundheit & Vitalität', icon: Heart, color: '#10b981' },
                { key: 'beziehungen', label: 'Familie & Beziehungen', icon: Award, color: '#f59e0b' },
                { key: 'beruf', label: 'Beruf & Schaffen', icon: Target, color: '#06b6d4' },
                { key: 'finanzen', label: 'Finanzielle Freiheit', icon: ShieldCheck, color: '#8b5cf6' },
                { key: 'persoenlichkeit', label: 'Persönliches Wachstum', icon: TrendingUp, color: '#ec4899' },
                { key: 'sinn', label: 'Sinn & Lebensfreude', icon: Sparkles, color: '#eab308' },
              ].map((item) => {
                const Icon = item.icon;
                const score = satisfactionScores[item.key];
                return (
                  <div key={item.key} className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                        <span>{item.label}</span>
                      </span>
                      <span className="font-mono text-xs">{score}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => handleScoreChange(item.key, e.target.value)}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                );
              })}
            </div>

            {/* Visual Radar Card Preview */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white flex flex-col items-center justify-center text-center space-y-4 border border-amber-500/20 shadow-2xl relative">
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-white">Gesamt-Harmonie</h4>
                <p className="text-2xl font-mono font-bold text-amber-300">
                  {Math.round(Object.values(satisfactionScores).reduce((a, b) => a + b, 0) / 6)}%
                </p>
                <span className="text-[11px] text-slate-400 font-serif block">
                  Hohe Balance zwischen Sinn, Beziehungen und Lebenswerk.
                </span>
              </div>
              <div className="w-full pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Im Lebenskompass verankert</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
