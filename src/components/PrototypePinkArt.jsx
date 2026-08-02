import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Heart, 
  Calendar, 
  GitBranch, 
  Lock, 
  Building2, 
  Fingerprint, 
  Target, 
  Compass, 
  Rose, 
  Star, 
  Layers, 
  Smile
} from 'lucide-react';
import { KaleidoscopeIcon } from './SpaceRingHeader';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';

export const PrototypePinkArt = ({ state, onGoBackToV1, onSwitchToIOS26, onOpenCreator }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'experience', 'personal', 'life'
  const [activeSegment, setActiveSegment] = useState('orbit'); // 'orbit', 'moments', 'family', 'vault'
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Vibrant Pink Art Navigation Tabs
  const spaceTabs = [
    { id: 'home', label: 'Übersicht', icon: Sparkles, color: 'bg-rose-500 text-white' },
    { id: 'experience', label: 'Experience', icon: KaleidoscopeIcon, count: state.memories?.length || 0 },
    { id: 'personal', label: 'Personal', icon: Fingerprint, count: (state.werte || []).length },
    { id: 'life', label: 'Life', icon: Target, count: 'Vorsorge' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcf8f6] text-slate-900 font-sans selection:bg-rose-200 selection:text-rose-900 pb-24 relative overflow-x-hidden">
      
      {/* VIBRANT PINK ART GRADIENT AMBIENT SPHERES */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-300/40 via-pink-200/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 left-0 w-80 h-80 bg-gradient-to-tr from-fuchsia-300/30 via-pink-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-40 w-full p-4 backdrop-blur-xl bg-[#fcf8f6]/80 border-b border-rose-200/60 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoBackToV1}
            className="p-2 rounded-2xl bg-white border border-rose-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs hover:bg-rose-50 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-rose-600" />
            <span>V1 Klassik</span>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-serif font-bold tracking-tight text-slate-900">
                KALEIDOspace
              </h1>
              <span className="text-[9px] font-mono font-extrabold uppercase bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 text-white px-2 py-0.5 rounded-full shadow-xs tracking-widest">
                V3 Pink Art
              </span>
            </div>
            <p className="text-[10px] text-rose-600 font-serif italic">Vibrant Modern Sanctuary Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToIOS26}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-mono font-bold uppercase transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            iOS 26
          </button>

          <button
            onClick={onOpenCreator}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-md shadow-rose-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 text-white stroke-[3]" />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-5">
        
        {/* VIBRANT PINK NAVIGATION PILLS */}
        <div className="grid grid-cols-4 gap-2 p-1.5 rounded-3xl bg-white border-2 border-rose-200 shadow-sm">
          {spaceTabs.map((sp) => {
            const Icon = sp.icon;
            const isActive = activeTab === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => setActiveTab(sp.id)}
                className={`p-2.5 rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md scale-[1.02]'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-serif font-bold tracking-tight line-clamp-1">{sp.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW (V3 PINK ART HOMESCREEN) */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            
            {/* HERO ARTWORK CARD */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700 text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full font-bold">
                  Sanctuary Art OS
                </span>
                <span className="text-xs font-mono text-pink-100">2026</span>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                  Das Leben zelebrieren
                </h2>
                <p className="text-xs text-rose-100 font-serif leading-relaxed">
                  Moderne Ästhetik trifft auf emotionale Lebensbegleitung. Verwalten Sie Erinnerungen in ausdrucksstarkem Design.
                </p>
              </div>

              {/* ACTION TILES */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('experience')}
                  className="p-3.5 rounded-2xl bg-white/15 border border-white/30 text-left hover:bg-white/25 transition-all cursor-pointer"
                >
                  <KaleidoscopeIcon className="w-5 h-5 text-pink-200 mb-2" />
                  <span className="font-bold text-xs text-white block">Experience</span>
                  <span className="text-[10px] text-rose-200 font-mono">{state.memories?.length || 0} Stories</span>
                </button>

                <button
                  onClick={() => setActiveTab('personal')}
                  className="p-3.5 rounded-2xl bg-white/15 border border-white/30 text-left hover:bg-white/25 transition-all cursor-pointer"
                >
                  <Fingerprint className="w-5 h-5 text-rose-200 mb-2" />
                  <span className="font-bold text-xs text-white block">Personal</span>
                  <span className="text-[10px] text-rose-200 font-mono">{(state.werte || []).length} Werte</span>
                </button>
              </div>
            </div>

            {/* LIFELOOP ORBIT CARD */}
            <div className="p-4 rounded-3xl bg-white border-2 border-rose-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-rose-600" />
                  <span>Der Lifeloop Orbit</span>
                </span>
                <span className="text-[10px] font-mono text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  1996 – 2066
                </span>
              </div>

              <Lifeloop
                phases={state.phases}
                activePhaseId="all"
                onSelectPhase={() => {}}
                memories={state.memories}
                simulatedDate={state.simulatedDate}
                onDateChange={() => {}}
              />
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: EXPERIENCE SPACE (V3 PINK ART) */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            
            {/* SPACE HEADER */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-700 text-white shadow-lg flex items-center gap-3">
              <div className="p-3 bg-white/20 border border-white/30 text-white rounded-2xl">
                <KaleidoscopeIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold">Experience Space</h2>
                <p className="text-[11px] text-rose-100 font-serif">Momente, Schatullen & Stammbaum</p>
              </div>
            </div>

            {/* SEGMENTED SWITCHER */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-rose-200 text-xs font-bold shadow-xs">
              {[
                { id: 'orbit', label: 'Orbit' },
                { id: 'moments', label: 'Momente' },
                { id: 'family', label: 'Stammbaum' },
                { id: 'vault', label: 'Tresor' },
              ].map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id)}
                  className={`flex-1 py-1.5 rounded-xl transition-all ${
                    activeSegment === seg.id
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-rose-600'
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>

            {/* SEGMENT 1: ORBIT */}
            {activeSegment === 'orbit' && (
              <div className="p-4 rounded-3xl bg-white border-2 border-rose-200">
                <Lifeloop
                  phases={state.phases}
                  activePhaseId="all"
                  onSelectPhase={() => {}}
                  memories={state.memories}
                  simulatedDate={state.simulatedDate}
                  onDateChange={() => {}}
                />
              </div>
            )}

            {/* SEGMENT 2: MOMENTE */}
            {activeSegment === 'moments' && (
              <div className="space-y-3">
                {state.memories?.map((mem) => (
                  <div key={mem.id} className="p-4 rounded-2xl bg-white border-2 border-rose-100 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-slate-900">{mem.title}</span>
                      <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-bold">
                        {mem.phaseId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-serif italic">{mem.story}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SEGMENT 3: GRAFISCHER STAMMBAUM */}
            {activeSegment === 'family' && (
              <div className="space-y-3">
                <FamilyTreeCanvas
                  selectedPerson={selectedPerson}
                  onSelectPerson={setSelectedPerson}
                />

                {selectedPerson && (
                  <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-xs space-y-2">
                    <span className="font-serif font-bold text-sm text-slate-900 block">{selectedPerson.name} ({selectedPerson.role})</span>
                    <p className="text-slate-700"><strong>Dinge, die ich sagen möchte:</strong> „{selectedPerson.thingsToSay || 'Notiz verfassen...'}“</p>
                  </div>
                )}
              </div>
            )}

            {/* SEGMENT 4: TRESOR */}
            {activeSegment === 'vault' && (
              <div className="p-5 rounded-3xl bg-white border-2 border-rose-200 space-y-3 text-xs">
                <h3 className="font-serif font-bold text-sm text-rose-600 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Zeitkapseln & Vertrauliche Dokumente</span>
                </h3>
                <p className="text-slate-600 font-serif">
                  Digitale Schatzkisten für Ihre Nachkommen im Pink Art Design.
                </p>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PERSONAL SPACE (V3 PINK ART) */}
        {/* ========================================================= */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-700 text-white shadow-lg flex items-center gap-3">
              <div className="p-3 bg-white/20 border border-white/30 text-white rounded-2xl">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold">Personal Space</h2>
                <p className="text-[11px] text-rose-100 font-serif">Werteschrift & Philosophie</p>
              </div>
            </div>

            <div className="space-y-3">
              {(state.werte || []).map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-white border-2 border-rose-100 shadow-xs space-y-1">
                  <span className="font-serif font-bold text-sm text-rose-700 block">{w.title}</span>
                  <p className="text-xs text-slate-600 font-serif italic">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: LIFE SPACE (V3 PINK ART) */}
        {/* ========================================================= */}
        {activeTab === 'life' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-700 text-white shadow-lg flex items-center gap-3">
              <div className="p-3 bg-white/20 border border-white/30 text-white rounded-2xl">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold">Life Space</h2>
                <p className="text-[11px] text-pink-100 font-serif">Abschiedsbegleiter & Lebensvorsorge</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-rose-200 space-y-3 text-xs">
              <h3 className="font-serif font-bold text-sm text-rose-600">Vorsorgedokumente & Abschiedsplanung</h3>
              <p className="text-slate-600 font-serif">
                Würdevolle Abschiedswünsche, Notfallkontakte und Dokumente geschützt hinterlegt.
              </p>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
