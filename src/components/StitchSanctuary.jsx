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
  Plus,
  Trash2,
  Phone,
  FileText,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';
import { IntentionalCreator } from './IntentionalCreator';

export const StitchSanctuary = ({ 
  state, 
  onGoBackToV1, 
  onSaveMemory, 
  onDeleteMemory, 
  onAddWerte, 
  onDeleteWerte,
  onUpdateLetztesKapitel
}) => {
  const [activeTab, setActiveTab] = useState('cockpit'); // 'cockpit', 'experience', 'personal', 'life'
  const [activePhaseFilter, setActivePhaseFilter] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isAddWerteOpen, setIsAddWerteOpen] = useState(false);
  const [newWerteTitle, setNewWerteTitle] = useState('');
  const [newWerteDesc, setNewWerteDesc] = useState('');

  const memories = state.memories || [];
  const werte = state.werte || [];

  const filteredMemories = activePhaseFilter === 'all' 
    ? memories 
    : memories.filter(m => m.phaseId === activePhaseFilter);

  const handleCreateWerteSubmit = (e) => {
    e.preventDefault();
    if (!newWerteTitle.trim()) return;
    onAddWerte({
      title: newWerteTitle,
      description: newWerteDesc,
    });
    setNewWerteTitle('');
    setNewWerteDesc('');
    setIsAddWerteOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 flex justify-center selection:bg-[#ffdcc3] selection:text-[#2f1500] font-sans">
      
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
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* SMARTPHONE MOBILE CONTAINER (MAX-W-MD) */}
      <div className="w-full max-w-md min-h-screen bg-[#fbf9f5] text-[#1b1c1a] shadow-2xl relative flex flex-col justify-between overflow-x-hidden font-sans-sanctuary pb-24">
        
        {/* FIXED MOBILE TOP BAR */}
        <header className="sticky top-0 left-0 w-full z-40 flex justify-between items-center px-4 h-16 glass-card-sanctuary border-b border-[#e4e2de] shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoBackToV1}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#8d4b00] text-white rounded-full text-[11px] font-semibold hover:bg-[#b15f00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>V1</span>
            </button>

            <span className="font-serif-sanctuary text-base font-bold text-[#8d4b00] tracking-tight">
              Kaleido.Space
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-[#ffdcc3] text-[#2f1500] px-1.5 py-0.5 rounded-full">
              Sanctuary
            </span>
          </div>

          <button
            onClick={() => setIsCreatorOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8d4b00] hover:bg-[#b15f00] text-white transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </header>

        {/* MAIN STAGE */}
        <main className="p-4 space-y-5 flex-1">
          
          {/* HERO SECTION */}
          <section className="relative p-5 rounded-[24px] bg-gradient-to-br from-[#ffdcc3] via-[#fbf9f5] to-[#82f5c1]/30 border border-white shadow-md space-y-3 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8d4b00] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#8d4b00]/20">
                Digital Sanctuary
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Smartphone Mode</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-serif-sanctuary text-2xl font-bold text-[#1b1c1a] tracking-tight">
                KALEIDOspace
              </h1>
              <p className="text-xs font-serif-sanctuary italic text-[#8d4b00] font-semibold">
                Celebrating life
              </p>
              <p className="text-[10px] text-[#554336] leading-relaxed">
                Mein Lebensbegleiter | My Life Companion (Life Operating System)
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-white/70 border border-white text-center">
                <span className="text-[9px] text-[#8d4b00] font-semibold block">Momente</span>
                <span className="font-serif-sanctuary text-lg font-bold">{memories.length}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-white text-center">
                <span className="text-[9px] text-[#006c4a] font-semibold block">Werte</span>
                <span className="font-serif-sanctuary text-lg font-bold">{werte.length}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-white text-center">
                <span className="text-[9px] text-[#ba0035] font-semibold block">Ahnen</span>
                <span className="font-serif-sanctuary text-lg font-bold">6 Lv</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-white text-center">
                <span className="text-[9px] text-[#8d4b00] font-semibold block">Tresor</span>
                <span className="font-serif-sanctuary text-xs font-bold text-[#006c4a] mt-1 block">Aktiv</span>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* TAB 1: COCKPIT */}
          {/* ========================================================= */}
          {activeTab === 'cockpit' && (
            <div className="space-y-4">
              <section className="p-4 rounded-[20px] bg-white border border-[#e4e2de] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#e4e2de] pb-2">
                  <span className="font-serif-sanctuary text-base font-bold text-[#1b1c1a]">Der Lifeloop Orbit</span>
                  <span className="text-[10px] font-bold text-[#006c4a] bg-[#82f5c1]/30 px-2 py-0.5 rounded-full">
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

              {/* QUICK MOMENTS FEED */}
              <section className="space-y-2">
                <h3 className="font-serif-sanctuary font-bold text-sm text-[#1b1c1a]">Aktuelle Erinnerungen</h3>
                <div className="space-y-2">
                  {memories.slice(0, 3).map((mem) => (
                    <div key={mem.id} className="p-3 rounded-xl bg-white border border-[#e4e2de] space-y-1 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="font-serif-sanctuary font-bold text-xs text-[#1b1c1a]">{mem.title}</span>
                        <span className="text-[9px] bg-[#ffdcc3] text-[#8d4b00] px-1.5 py-0.2 rounded font-semibold">{mem.phaseId}</span>
                      </div>
                      <p className="text-[11px] text-[#554336] italic line-clamp-2">{mem.story}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: EXPERIENCE SPACE */}
          {/* ========================================================= */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              
              {/* PHASE FILTERS */}
              <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: 'Alle' },
                  { id: 'childhood', label: 'Kindheit' },
                  { id: 'youth', label: 'Jugend' },
                  { id: 'career', label: 'Karriere' },
                  { id: 'legacy', label: 'Vermächtnis' },
                ].map((ph) => (
                  <button
                    key={ph.id}
                    onClick={() => setActivePhaseFilter(ph.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activePhaseFilter === ph.id
                        ? 'bg-[#ba0035] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-[#e4e2de]'
                    }`}
                  >
                    {ph.label}
                  </button>
                ))}
              </div>

              {/* FAMILIENSTAMMBAUM CANVAS */}
              <section className="p-3 rounded-[20px] bg-white border border-[#e4e2de] shadow-xs space-y-2">
                <span className="font-serif-sanctuary font-bold text-sm text-[#ba0035] block">Grafischer Familienstammbaum</span>
                <FamilyTreeCanvas
                  selectedPerson={selectedPerson}
                  onSelectPerson={setSelectedPerson}
                />
                {selectedPerson && (
                  <div className="p-3 rounded-xl bg-[#ffdada]/40 border border-[#ba0035]/30 space-y-1 text-xs">
                    <span className="font-serif-sanctuary font-bold text-xs text-[#1b1c1a] block">{selectedPerson.name} ({selectedPerson.role})</span>
                    <p className="text-[#554336] italic">„{selectedPerson.thingsToSay || 'Notiz verfassen...'}“</p>
                  </div>
                )}
              </section>

              {/* MEMORIES FEED */}
              <section className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-sanctuary font-bold text-sm text-[#1b1c1a]">Erinnerungen ({filteredMemories.length})</h3>
                  <button
                    onClick={() => setIsCreatorOpen(true)}
                    className="text-xs font-semibold text-[#ba0035] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Neu</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {filteredMemories.map((mem) => (
                    <div key={mem.id} className="p-3.5 rounded-2xl bg-white border border-[#e4e2de] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-serif-sanctuary font-bold text-sm text-[#1b1c1a]">{mem.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-semibold bg-[#ffdcc3] text-[#8d4b00] px-1.5 py-0.2 rounded">
                            {mem.phaseId}
                          </span>
                          <button
                            onClick={() => onDeleteMemory(mem.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#554336] leading-relaxed">{mem.story}</p>
                      
                      {mem.date && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{mem.date}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PERSONAL SPACE */}
          {/* ========================================================= */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <section className="p-4 rounded-[20px] bg-white border border-[#e4e2de] shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-[#006c4a]">Personal Space</span>
                    <h2 className="font-serif-sanctuary text-lg font-bold text-[#1b1c1a]">Werteschrift & Prinzipien</h2>
                  </div>

                  <button
                    onClick={() => setIsAddWerteOpen(true)}
                    className="px-3 py-1.5 bg-[#006c4a] hover:bg-[#005137] text-white rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Wert</span>
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {werte.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-xl bg-[#f5f3ef] border border-[#e4e2de] space-y-1 relative group">
                      <div className="flex justify-between items-center">
                        <span className="font-serif-sanctuary font-bold text-sm text-[#006c4a]">{w.title}</span>
                        <button
                          onClick={() => onDeleteWerte(w.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#554336] leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* MODAL TO ADD NEW WERTE */}
              {isAddWerteOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="w-full max-w-xs bg-white rounded-2xl p-5 border border-[#e4e2de] space-y-4 shadow-2xl">
                    <h3 className="font-serif-sanctuary font-bold text-base text-[#1b1c1a]">Neuen Wert hinzufügen</h3>
                    
                    <form onSubmit={handleCreateWerteSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Titel des Werts</label>
                        <input
                          type="text"
                          required
                          placeholder="z.B. Wahrhaftigkeit & Freiheit"
                          value={newWerteTitle}
                          onChange={(e) => setNewWerteTitle(e.target.value)}
                          className="w-full p-2.5 text-xs bg-[#f5f3ef] border border-[#e4e2de] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#006c4a]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Beschreibung / Bedeutung</label>
                        <textarea
                          rows="3"
                          placeholder="Warum ist dieser Wert für Ihr Leben zentral?"
                          value={newWerteDesc}
                          onChange={(e) => setNewWerteDesc(e.target.value)}
                          className="w-full p-2.5 text-xs bg-[#f5f3ef] border border-[#e4e2de] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#006c4a] resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddWerteOpen(false)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 cursor-pointer"
                        >
                          Abbrechen
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#006c4a] text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Speichern
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: LIFE SPACE */}
          {/* ========================================================= */}
          {activeTab === 'life' && (
            <div className="space-y-4">
              <section className="p-4 rounded-[20px] bg-white border border-[#e4e2de] shadow-xs space-y-3">
                <span className="text-[10px] font-semibold uppercase text-[#8d4b00]">Life Space</span>
                <h2 className="font-serif-sanctuary text-lg font-bold text-[#1b1c1a]">Vorsorge & Abschiedsbegleiter</h2>

                <div className="space-y-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#f5f3ef] border border-[#e4e2de] flex items-center gap-3">
                    <div className="p-2 bg-[#ffdcc3] text-[#8d4b00] rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-serif-sanctuary font-bold text-xs text-[#1b1c1a] block">Vorsorgevollmacht & Patientenverfügung</span>
                      <span className="text-[10px] text-[#006c4a] font-semibold">Hinterlegt & verifiziert</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f5f3ef] border border-[#e4e2de] flex items-center gap-3">
                    <div className="p-2 bg-[#82f5c1]/40 text-[#006c4a] rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-serif-sanctuary font-bold text-xs text-[#1b1c1a] block">Notfallkontakte & Nachlassverwalter</span>
                      <span className="text-[10px] text-slate-500">2 Personen zugewiesen</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f5f3ef] border border-[#e4e2de] flex items-center gap-3">
                    <div className="p-2 bg-[#ffdada] text-[#ba0035] rounded-lg">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-serif-sanctuary font-bold text-xs text-[#1b1c1a] block">Zeitkapsel-Tresor für Nachkommen</span>
                      <span className="text-[10px] text-[#ba0035] font-semibold">Ende-zu-Ende Verschlüsselt</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

        </main>

        {/* INTENTIONAL CREATOR MODAL */}
        {isCreatorOpen && (
          <IntentionalCreator
            onClose={() => setIsCreatorOpen(false)}
            onSave={(newMem) => {
              onSaveMemory(newMem);
              setIsCreatorOpen(false);
            }}
            phases={state.phases}
          />
        )}

        {/* FIXED SMARTPHONE BOTTOM NAVBAR */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-[#1b1c1a] text-white px-4 py-3 flex justify-around items-center border-t border-white/10 shadow-2xl">
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
    </div>
  );
};
