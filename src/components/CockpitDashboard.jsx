import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OrbitTimeline } from './OrbitTimeline';
import { ShieldCheck, Calendar, Bell, Sparkles, CheckCircle2, Clock, Users, ArrowRight, HeartHandshake } from 'lucide-react';

export const CockpitDashboard = ({
  phases = [],
  activePhaseId = 'all',
  memories = [],
  simulatedDate = '2026-07-30',
  onDateChange,
  onSelectMemory,
  onOpenCreator,
  onNavigateTab,
  darkMode = false,
}) => {
  const [reflectionInput, setReflectionInput] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const currentYear = new Date(simulatedDate).getFullYear();
  const activePhase = phases.find((p) => p.id === activePhaseId) || phases[2] || phases[0];

  const handleSaveReflection = (e) => {
    e.preventDefault();
    if (!reflectionInput.trim()) return;
    setReflectionSaved(true);
    setTimeout(() => {
      setReflectionSaved(false);
      setReflectionInput('');
    }, 2500);
  };

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* COCKPIT HERO HEADER */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Ebene 1: Personal Life Cockpit
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Willkommen zurück
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
              Ihr Leben im Überblick
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
              Aktueller Kontext: <strong className="text-emerald-600 dark:text-emerald-400">{activePhase?.name}</strong> ({activePhase?.startAge}–{activePhase?.endAge} Jahre). 
              Ein Ort für bewusste Erinnerungen, Vorsorge & persönliche Werte.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCreator}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 dark:text-slate-950" />
              <span>Erinnerung verfassen</span>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('compass')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl transition-all border border-slate-200 dark:border-slate-700"
            >
              <span>Zum Lebenskompass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SIGNATURE ELEMENT: THE LIFE LOOP ORBIT */}
      <OrbitTimeline
        memories={memories}
        phases={phases}
        simulatedDate={simulatedDate}
        darkMode={darkMode}
        onSelectMemory={onSelectMemory}
      />

      {/* 3 STATUS CARDS: VORSORGE, JAHRESTAGE, MEIN KREIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: VORSORGE & LEBENSPLANUNG */}
        <div className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Vorsorge & ToDos</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                2 offen
              </span>
            </div>

            <ul className="space-y-2.5 text-xs font-serif">
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <input type="checkbox" className="mt-0.5 accent-emerald-500 rounded cursor-pointer" />
                <span>Patientenverfügung im Datentresor aktualisieren</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <input type="checkbox" className="mt-0.5 accent-emerald-500 rounded cursor-pointer" defaultChecked />
                <span className="line-through opacity-60">Zeitkapsel für Claras 18. Geburtstag hinterlegt</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('stage-planning')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-all"
          >
            <span>Lebensplanung öffnen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 2: JAHRESTAGE & GEDENKTAGE */}
        <div className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Calendar className="w-4 h-4" />
                <span>Jahrestage im Orbit</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md">
                Anstehend
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Sommer am Wörthersee</span>
                  <span className="text-[10px] text-slate-500 font-mono">12. August • Kindheit</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">in 13 Tagen</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('loop')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-all"
          >
            <span>Alle Jahrestage im Life Loop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 3: MEIN KREIS NOTIFICATIONS */}
        <div className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                <Bell className="w-4 h-4" />
                <span>Mein Kreis (Sharing)</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md">
                3 Personen
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2.5">
                <HeartHandshake className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-[11px]">
                  Abschiedsbegleiter Dr. Marcus Weber ist als Treuhand-Bote zugewiesen.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('kreis')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-all"
          >
            <span>Rechte & Kreis verwalten</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* TAGES-REFLEXION CHECK-IN IMPULS */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-md space-y-4 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Reflexions-Check-in des Tages
            </span>
            <h3 className="font-serif font-bold text-lg">
              „Welcher Mensch hat deine Haltung in diesem Jahr am meisten geprägt?“
            </h3>
          </div>
        </div>

        <form onSubmit={handleSaveReflection} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Schreibe eine kurze Notiz für deine persönliche Werteschrift..."
            value={reflectionInput}
            onChange={(e) => setReflectionInput(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all flex-shrink-0 cursor-pointer"
          >
            {reflectionSaved ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{reflectionSaved ? 'Gespeichert!' : 'Festhalten'}</span>
          </button>
        </form>
      </div>

    </div>
  );
};
