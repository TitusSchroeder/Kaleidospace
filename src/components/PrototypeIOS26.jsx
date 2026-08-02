import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Plus, 
  Lock, 
  Heart, 
  Calendar, 
  GitBranch, 
  ShieldCheck, 
  Zap, 
  Eye, 
  Fingerprint, 
  Target, 
  Sliders, 
  Compass, 
  Layers, 
  Bookmark,
  Share2,
  Clock
} from 'lucide-react';
import { KaleidoscopeIcon } from './SpaceRingHeader';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';

export const PrototypeIOS26 = ({ state, onGoBackToV1, onSaveMemory, onOpenCreator }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'experience', 'personal', 'life'
  const [activeSegment, setActiveSegment] = useState('orbit'); // 'orbit', 'moments', 'family', 'vault'
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Liquid Glass Navigation Pills
  const spacePills = [
    { id: 'home', label: 'Overview', color: 'from-amber-400/20 to-purple-500/20', icon: Sparkles, badge: 'iOS 26' },
    { id: 'experience', label: 'Experience', color: 'from-red-500/20 to-amber-500/20', icon: KaleidoscopeIcon, count: state.memories?.length || 0 },
    { id: 'personal', label: 'Personal', color: 'from-emerald-500/20 to-teal-500/20', icon: Fingerprint, count: (state.werte || []).length },
    { id: 'life', label: 'Life', color: 'from-blue-500/20 to-indigo-500/20', icon: Target, count: 'Vault' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-24 relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT LIQUID GLOW SPHERES (iOS 26 Liquid Glass Aura) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-600/30 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP LIQUID GLASS HEADER BAR */}
      <header className="sticky top-0 z-40 w-full p-4 backdrop-blur-2xl bg-slate-950/60 border-b border-white/10 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoBackToV1}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>V1 Klassik</span>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-serif font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                KALEIDOspace
              </h1>
              <span className="text-[9px] font-mono font-extrabold uppercase bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-0.5 rounded-full shadow-xs tracking-widest border border-white/20">
                iOS 26
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-serif italic">Liquid Glass Edition</p>
          </div>
        </div>

        <button
          onClick={onOpenCreator}
          className="p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span className="hidden sm:inline">Moment</span>
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-5">
        
        {/* LIQUID SEGMENTED SPACE SWITCHER */}
        <div className="grid grid-cols-4 gap-2 p-1.5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          {spacePills.map((sp) => {
            const Icon = sp.icon;
            const isActive = activeTab === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => setActiveTab(sp.id)}
                className={`p-2.5 rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 relative ${
                  isActive
                    ? 'bg-gradient-to-b from-white/20 to-white/5 border border-white/30 text-white shadow-xl backdrop-blur-2xl ring-1 ring-white/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider line-clamp-1">{sp.label}</span>
                {sp.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW (iOS 26 LIQUID HOMESCREEN) */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            
            {/* HERO LIQUID GLASS CARD */}
            <div className="p-5 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                  Next-Gen Operating System
                </span>
                <span className="text-xs font-mono text-slate-400">2026</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                  Willkommen im Lebenskreis
                </h2>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Ihr digitaler Lebensbegleiter in flüssigem Glass-Design. Verwalten Sie Erinnerungen, Werte & Vermächtnis.
                </p>
              </div>

              {/* ACTION TILES */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('experience')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/10 border border-red-500/30 text-left hover:border-red-400/50 transition-all group cursor-pointer"
                >
                  <KaleidoscopeIcon className="w-5 h-5 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-white block">Experience</span>
                  <span className="text-[10px] text-slate-400 font-mono">{state.memories?.length || 0} Momente</span>
                </button>

                <button
                  onClick={() => setActiveTab('personal')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-left hover:border-emerald-400/50 transition-all group cursor-pointer"
                >
                  <Fingerprint className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-white block">Personal</span>
                  <span className="text-[10px] text-slate-400 font-mono">{(state.werte || []).length} Prinzipien</span>
                </button>
              </div>
            </div>

            {/* LIFELOOP ORBIT CARD */}
            <div className="p-4 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-serif font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Der Lifeloop Orbit</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">1996 – 2066</span>
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
        {/* TAB 2: EXPERIENCE SPACE (iOS 26 LIQUID GLASS) */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            
            {/* SPACE HEADER */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-red-600/30 via-red-900/20 to-slate-950 border border-red-500/30 backdrop-blur-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/20 border border-red-400/40 text-red-400 rounded-2xl shadow-lg">
                  <KaleidoscopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">Experience Space</h2>
                  <p className="text-[11px] text-slate-300 font-serif">Lebenserfahrungen & Ahnenstammbaum</p>
                </div>
              </div>
            </div>

            {/* SEGMENTED SWITCHER */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-white/10 text-xs font-bold">
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
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>

            {/* SEGMENT 1: ORBIT */}
            {activeSegment === 'orbit' && (
              <div className="p-4 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-2xl">
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
                  <div key={mem.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-white">{mem.title}</span>
                      <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded-md border border-red-500/30">
                        {mem.phaseId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-serif italic">{mem.story}</p>
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
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 backdrop-blur-md text-xs space-y-2">
                    <span className="font-serif font-bold text-sm text-emerald-300 block">{selectedPerson.name} ({selectedPerson.role})</span>
                    <p className="text-slate-200"><strong>Dinge, die ich sagen möchte:</strong> „{selectedPerson.thingsToSay || 'Eine Notiz hinterlegen...'}“</p>
                  </div>
                )}
              </div>
            )}

            {/* SEGMENT 4: TRESOR */}
            {activeSegment === 'vault' && (
              <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-2xl space-y-3 text-xs">
                <h3 className="font-serif font-bold text-sm text-purple-400 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Zeitkapsel-Tresor (iOS 26 Vault)</span>
                </h3>
                <p className="text-slate-300 font-serif">
                  Ende-zu-Ende verschlüsselte Zeitkapseln für Ihre Nachkommen.
                </p>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PERSONAL SPACE (iOS 26 GLASS) */}
        {/* ========================================================= */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-600/30 via-emerald-900/20 to-slate-950 border border-emerald-500/30 backdrop-blur-2xl flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 rounded-2xl shadow-lg">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Personal Space</h2>
                <p className="text-[11px] text-slate-300 font-serif">Werteschrift & Prinzipien</p>
              </div>
            </div>

            <div className="space-y-3">
              {(state.werte || []).map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
                  <span className="font-serif font-bold text-sm text-emerald-300 block">{w.title}</span>
                  <p className="text-xs text-slate-300 font-serif italic">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: LIFE SPACE (iOS 26 GLASS) */}
        {/* ========================================================= */}
        {activeTab === 'life' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-600/30 via-blue-900/20 to-slate-950 border border-blue-500/30 backdrop-blur-2xl flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 border border-blue-400/40 text-blue-400 rounded-2xl shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Life Space</h2>
                <p className="text-[11px] text-slate-300 font-serif">Lebensvorsorge & Abschiedsplanung</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-2xl space-y-3 text-xs">
              <h3 className="font-serif font-bold text-sm text-blue-400">Vorsorge-Checkliste & Abschiedsbegleiter</h3>
              <p className="text-slate-300 font-serif">
                Hier sind Ihre Notfallkontakte, Vorsorgevollmachten und Wünsche für die Abschiedsfeier geschützt hinterlegt.
              </p>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
