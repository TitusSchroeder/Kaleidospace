import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  Compass, 
  Heart, 
  ShieldCheck, 
  ArrowLeft, 
  Plus, 
  Zap, 
  Sliders, 
  Terminal, 
  Layers, 
  ChevronRight,
  Code
} from 'lucide-react';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';

export const StitchObsidian = ({ state, onGoBackToV1, onOpenCreator }) => {
  const [activeTab, setActiveTab] = useState('cockpit'); // 'cockpit', 'experience', 'personal', 'life'
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#0a0d14] text-[#e1e2ec] font-sans selection:bg-[#4cd7f6] selection:text-[#001f26] relative pb-28">
      
      {/* GOOGLE FONTS FOR OBSIDIAN TECH DESIGN SYSTEM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        .font-geist-obsidian {
          font-family: 'Geist', sans-serif;
        }
        .font-inter-obsidian {
          font-family: 'Inter', sans-serif;
        }
        .glass-card-obsidian {
          background: rgba(18, 24, 36, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card-obsidian:hover {
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 40px rgba(192, 193, 255, 0.05);
        }
        .indigo-glow-obsidian {
          box-shadow: 0 0 20px rgba(192, 193, 255, 0.3);
        }
        .cyan-glow-obsidian {
          box-shadow: 0 0 20px rgba(76, 215, 246, 0.2);
        }
      `}</style>

      {/* TOP NAVBAR - EXACT STITCH OBSIDIAN HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#10131a]/80 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5 md:px-8 h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onGoBackToV1}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8083ff] text-[#0d0096] rounded-full text-xs font-geist-obsidian font-bold hover:bg-[#c0c1ff] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#0d0096]" />
              <span>V1 Klassik</span>
            </button>

            <span className="font-geist-obsidian text-xl font-extrabold text-white tracking-tighter">
              KALEIDOspace
            </span>
            <span className="text-[9px] font-mono uppercase bg-[#03b5d3]/20 text-[#4cd7f6] px-2 py-0.5 rounded-full border border-[#4cd7f6]/30 font-bold">
              Obsidian Tech
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-geist-obsidian text-[#4cd7f6] font-medium">
              High-Performance OS
            </span>
            <button
              onClick={onOpenCreator}
              className="bg-[#c0c1ff] hover:bg-[#8083ff] text-[#1000a9] font-geist-obsidian font-bold px-4 py-2 rounded-full transition-all duration-200 active:scale-95 indigo-glow-obsidian cursor-pointer text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Moment</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="pt-24 pb-32 max-w-7xl mx-auto px-5 md:px-8 space-y-8 font-inter-obsidian">
        
        {/* HERO SECTION - OBSIDIAN TECH COCKPIT */}
        <section className="relative p-8 rounded-2xl glass-card-obsidian border border-white/10 space-y-4 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#191b23] border border-white/10 text-xs font-geist-obsidian text-[#4cd7f6]">
            <Zap className="w-3.5 h-3.5" />
            <span>High-Performance Life Operating System</span>
          </div>

          <div className="space-y-2 max-w-2xl">
            <h1 className="font-geist-obsidian text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Obsidian Cockpit
            </h1>
            <p className="text-sm md:text-base text-[#c7c4d7] leading-relaxed">
              Präzises Digitales Lebens-Betriebssystem im obsidian-dunklen Hardware-Interface.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-white/5 space-y-1">
              <span className="text-xs text-[#c0c1ff] font-geist-obsidian font-bold block">Momente</span>
              <span className="font-geist-obsidian text-2xl font-bold text-white">{state.memories?.length || 0}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-white/5 space-y-1">
              <span className="text-xs text-[#4cd7f6] font-geist-obsidian font-bold block">Werte</span>
              <span className="font-geist-obsidian text-2xl font-bold text-white">{(state.werte || []).length}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-white/5 space-y-1">
              <span className="text-xs text-[#c0c1ff] font-geist-obsidian font-bold block">Stammbaum</span>
              <span className="font-geist-obsidian text-2xl font-bold text-white">6 Ebenen</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-white/5 space-y-1">
              <span className="text-xs text-[#4cd7f6] font-geist-obsidian font-bold block">Tresor</span>
              <span className="font-geist-obsidian text-2xl font-bold text-white">Verschlüsselt</span>
            </div>
          </div>
        </section>

        {/* TAB CONTENTS */}
        {activeTab === 'cockpit' && (
          <div className="space-y-6">
            <section className="p-6 rounded-2xl glass-card-obsidian space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-geist-obsidian font-bold uppercase tracking-wider text-[#4cd7f6]">Zeitstrahl & Lebensabschnitte</span>
                  <h2 className="font-geist-obsidian text-2xl font-bold text-white">Der Lifeloop Orbit</h2>
                </div>
                <span className="text-xs font-mono font-bold text-[#c0c1ff] bg-[#1d1f27] px-3 py-1 rounded-full border border-white/10">
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
            </section>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <section className="p-6 rounded-2xl glass-card-obsidian space-y-4">
              <div>
                <span className="text-xs font-geist-obsidian font-bold uppercase tracking-wider text-[#c0c1ff]">Experience Space</span>
                <h2 className="font-geist-obsidian text-2xl font-bold text-white">Grafischer Familienstammbaum</h2>
              </div>

              <FamilyTreeCanvas
                selectedPerson={selectedPerson}
                onSelectPerson={setSelectedPerson}
              />

              {selectedPerson && (
                <div className="p-4 rounded-xl bg-[#1d1f27] border border-[#8083ff]/40 space-y-2 text-xs">
                  <span className="font-geist-obsidian font-bold text-base text-white block">{selectedPerson.name} ({selectedPerson.role})</span>
                  <p className="text-[#c7c4d7] italic">„{selectedPerson.thingsToSay || 'Eine Notiz hinterlegen...'}“</p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="space-y-6">
            <section className="p-6 rounded-2xl glass-card-obsidian space-y-4">
              <div>
                <span className="text-xs font-geist-obsidian font-bold uppercase tracking-wider text-[#4cd7f6]">Personal Space</span>
                <h2 className="font-geist-obsidian text-2xl font-bold text-white">Werteschrift & Prinzipien</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(state.werte || []).map((w) => (
                  <div key={w.id} className="p-5 rounded-xl bg-[#191b23] border border-white/10 space-y-2">
                    <span className="font-geist-obsidian font-bold text-lg text-[#4cd7f6] block">{w.title}</span>
                    <p className="text-xs text-[#c7c4d7] leading-relaxed">{w.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'life' && (
          <div className="space-y-6">
            <section className="p-6 rounded-2xl glass-card-obsidian space-y-4">
              <div>
                <span className="text-xs font-geist-obsidian font-bold uppercase tracking-wider text-[#c0c1ff]">Life Space</span>
                <h2 className="font-geist-obsidian text-2xl font-bold text-white">Vorsorge & Abschiedsbegleiter</h2>
              </div>

              <p className="text-sm text-[#c7c4d7] leading-relaxed">
                Ende-zu-Ende verschlüsselte Vorsorgedokumente und Vollmachten im Obsidian Tech System hinterlegt.
              </p>
            </section>
          </div>
        )}

      </main>

      {/* FIXED BOTTOM NAVBAR - EXACT STITCH OBSIDIAN BOTTOM BAR */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#10131a]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex justify-around items-center">
        {[
          { id: 'cockpit', label: 'COCKPIT', icon: Sparkles },
          { id: 'experience', label: 'EXPERIENCE', icon: Heart },
          { id: 'personal', label: 'PERSONAL', icon: Compass },
          { id: 'life', label: 'LIFE', icon: ShieldCheck },
        ].map((nav) => {
          const Icon = nav.icon;
          const isActive = activeTab === nav.id;

          return (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'text-[#4cd7f6] font-bold scale-105'
                  : 'text-slate-400 hover:text-white opacity-70'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-geist-obsidian tracking-wider mt-1 font-bold">
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
