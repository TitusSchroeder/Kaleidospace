import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  Compass, 
  Heart, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Sliders, 
  ChevronRight, 
  Layers, 
  Plus
} from 'lucide-react';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';

export const StitchSanctuary = ({ state, onGoBackToV1, onOpenCreator }) => {
  const [activeTab, setActiveTab] = useState('cockpit'); // 'cockpit', 'experience', 'personal', 'life'
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans selection:bg-[#ffdcc3] selection:text-[#2f1500] relative pb-28">
      
      {/* GOOGLE FONTS FOR SANCTUARY DESIGN SYSTEM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        .font-serif-sanctuary {
          font-family: 'Playfair Display', serif;
        }
        .font-sans-sanctuary {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .glass-card-sanctuary {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
      `}</style>

      {/* TOP APP BAR - EXACT STITCH SANCTUARY HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-16 h-16 glass-card-sanctuary shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoBackToV1}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8d4b00] text-white rounded-full text-xs font-sans-sanctuary font-semibold hover:bg-[#b15f00] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>V1 Klassik</span>
          </button>

          <span className="font-serif-sanctuary text-xl font-bold text-[#8d4b00] tracking-tight">
            Kaleido.Space
          </span>
          <span className="text-[10px] font-sans-sanctuary font-bold uppercase tracking-wider bg-[#ffdcc3] text-[#2f1500] px-2 py-0.5 rounded-full border border-[#8d4b00]/20">
            Sanctuary Design
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreator}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8d4b00] hover:bg-[#b15f00] text-white transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#ffdcc3] bg-[#8d4b00] text-white font-serif-sanctuary font-bold text-xs flex items-center justify-center">
            T
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="pt-24 pb-32 px-5 md:px-16 max-w-5xl mx-auto space-y-8 font-sans-sanctuary">
        
        {/* HERO SECTION - SANCTUARY ORBIT CARD */}
        <section className="relative w-full p-8 rounded-[32px] bg-gradient-to-br from-[#ffdcc3] via-[#fbf9f5] to-[#82f5c1]/30 border-2 border-white shadow-xl space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans-sanctuary font-semibold uppercase tracking-wider text-[#8d4b00] bg-white/70 px-3 py-1 rounded-full border border-[#8d4b00]/20">
              Digital Sanctuary
            </span>
            <span className="text-xs text-slate-500 font-sans-sanctuary font-medium">1-zu-1 Stitch Design</span>
          </div>

          <div className="space-y-2 max-w-xl">
            <h1 className="font-serif-sanctuary text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight">
              Mein Lebensbegleiter
            </h1>
            <p className="text-sm md:text-base text-[#554336] leading-relaxed">
              Ein geschützter Raum für Ihre Lebenserfahrungen, Familienstammbaum und zeitlosen Werte in sanfter Ästhetik.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 space-y-1">
              <span className="text-xs text-[#8d4b00] font-semibold block">Momente</span>
              <span className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">{state.memories?.length || 0}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 space-y-1">
              <span className="text-xs text-[#006c4a] font-semibold block">Werte</span>
              <span className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">{(state.werte || []).length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 space-y-1">
              <span className="text-xs text-[#ba0035] font-semibold block">Stammbaum</span>
              <span className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">6 Ebenen</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 space-y-1">
              <span className="text-xs text-[#8d4b00] font-semibold block">Tresor</span>
              <span className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">Aktiv</span>
            </div>
          </div>
        </section>

        {/* TAB CONTENTS */}
        {activeTab === 'cockpit' && (
          <div className="space-y-8">
            
            {/* LIFELOOP ORBIT CARD */}
            <section className="p-6 rounded-[24px] bg-white border border-[#e4e2de] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#e4e2de] pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8d4b00]">Zeitstrahl & Lebensabschnitte</span>
                  <h2 className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">Der Lifeloop Orbit</h2>
                </div>
                <span className="text-xs font-semibold text-[#006c4a] bg-[#82f5c1]/30 px-3 py-1 rounded-full">
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
            <section className="p-6 rounded-[24px] bg-white border border-[#e4e2de] shadow-sm space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#ba0035]">Experience Space</span>
                <h2 className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">Grafischer Familienstammbaum</h2>
              </div>

              <FamilyTreeCanvas
                selectedPerson={selectedPerson}
                onSelectPerson={setSelectedPerson}
              />

              {selectedPerson && (
                <div className="p-4 rounded-2xl bg-[#ffdada]/40 border border-[#ba0035]/30 space-y-2 text-xs">
                  <span className="font-serif-sanctuary font-bold text-base text-[#1b1c1a] block">{selectedPerson.name} ({selectedPerson.role})</span>
                  <p className="text-[#554336] italic">„{selectedPerson.thingsToSay || 'Eine Notiz hinterlegen...'}“</p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="space-y-6">
            <section className="p-6 rounded-[24px] bg-white border border-[#e4e2de] shadow-sm space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#006c4a]">Personal Space</span>
                <h2 className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">Werteschrift & Prinzipien</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(state.werte || []).map((w) => (
                  <div key={w.id} className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#e4e2de] space-y-2">
                    <span className="font-serif-sanctuary font-bold text-lg text-[#006c4a] block">{w.title}</span>
                    <p className="text-xs text-[#554336] leading-relaxed">{w.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'life' && (
          <div className="space-y-6">
            <section className="p-6 rounded-[24px] bg-white border border-[#e4e2de] shadow-sm space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8d4b00]">Life Space</span>
                <h2 className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a]">Vorsorge & Abschiedsbegleiter</h2>
              </div>

              <p className="text-sm text-[#554336] leading-relaxed">
                Vorsorgedokumente, Wünsche für die Abschiedsfeier und Notfallkontakte geschützt hinterlegt im Sanctuary-System.
              </p>
            </section>
          </div>
        )}

      </main>

      {/* FIXED BOTTOM NAV BAR - EXACT STITCH SANCTUARY BOTTOM BAR */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#1b1c1a] text-white px-6 py-3 flex justify-around items-center border-t border-white/10">
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
                  ? 'text-[#ffdcc3] font-bold scale-105'
                  : 'text-slate-400 hover:text-white opacity-70'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-sans-sanctuary tracking-wider mt-1 font-semibold">
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
