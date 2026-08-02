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
  Trash2,
  Phone,
  FileText,
  Calendar,
  Layers
} from 'lucide-react';
import { FamilyTreeCanvas } from './FamilyTreeCanvas';
import { Lifeloop } from './Lifeloop';
import { IntentionalCreator } from './IntentionalCreator';

export const StitchObsidian = ({ 
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
    <div className="w-full min-h-screen bg-[#07090e] text-[#e1e2ec] font-sans selection:bg-[#4cd7f6] selection:text-[#001f26] flex justify-center">
      
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
        }
        .indigo-glow-obsidian {
          box-shadow: 0 0 20px rgba(192, 193, 255, 0.3);
        }
      `}</style>

      {/* SMARTPHONE MOBILE CONTAINER (MAX-W-MD) */}
      <div className="w-full max-w-md min-h-screen bg-[#0a0d14] text-[#e1e2ec] shadow-2xl relative flex flex-col justify-between overflow-x-hidden font-inter-obsidian pb-24 border-x border-white/10">
        
        {/* FIXED MOBILE TOP NAVBAR */}
        <nav className="sticky top-0 left-0 w-full z-40 bg-[#10131a]/90 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoBackToV1}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#8083ff] text-[#0d0096] rounded-full text-[11px] font-geist-obsidian font-bold hover:bg-[#c0c1ff] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>V1</span>
            </button>

            <span className="font-geist-obsidian text-base font-extrabold text-white tracking-tighter">
              KALEIDOspace
            </span>
            <span className="text-[9px] font-mono uppercase bg-[#03b5d3]/20 text-[#4cd7f6] px-1.5 py-0.5 rounded-full font-bold border border-[#4cd7f6]/30">
              Obsidian
            </span>
          </div>

          <button
            onClick={() => setIsCreatorOpen(true)}
            className="bg-[#c0c1ff] hover:bg-[#8083ff] text-[#1000a9] p-2 rounded-full transition-all duration-200 active:scale-95 indigo-glow-obsidian cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </nav>

        {/* MAIN STAGE */}
        <main className="p-4 space-y-5 flex-1">
          
          {/* HERO SECTION */}
          <section className="relative p-5 rounded-2xl glass-card-obsidian border border-white/10 space-y-3 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#191b23] border border-white/10 text-[10px] font-geist-obsidian text-[#4cd7f6]">
              <Zap className="w-3 h-3" />
              <span>High-Performance Mobile OS</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-geist-obsidian text-2xl font-extrabold text-white tracking-tight leading-tight">
                Obsidian Cockpit
              </h1>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                Präzises Digitales Lebens-Betriebssystem im Obsidian Hardware-Interface.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-[#1d1f27] border border-white/5 text-center">
                <span className="text-[9px] text-[#c0c1ff] font-geist-obsidian font-bold block">Momente</span>
                <span className="font-geist-obsidian text-lg font-bold text-white">{memories.length}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1d1f27] border border-white/5 text-center">
                <span className="text-[9px] text-[#4cd7f6] font-geist-obsidian font-bold block">Werte</span>
                <span className="font-geist-obsidian text-lg font-bold text-white">{werte.length}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1d1f27] border border-white/5 text-center">
                <span className="text-[9px] text-[#c0c1ff] font-geist-obsidian font-bold block">Ahnen</span>
                <span className="font-geist-obsidian text-lg font-bold text-white">6 Lv</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1d1f27] border border-white/5 text-center">
                <span className="text-[9px] text-[#4cd7f6] font-geist-obsidian font-bold block">Tresor</span>
                <span className="font-geist-obsidian text-[10px] font-bold text-[#4cd7f6] mt-1 block">Safe</span>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* TAB 1: COCKPIT */}
          {/* ========================================================= */}
          {activeTab === 'cockpit' && (
            <div className="space-y-4">
              <section className="p-4 rounded-2xl glass-card-obsidian space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-geist-obsidian text-base font-bold text-white">Der Lifeloop Orbit</span>
                  <span className="text-[10px] font-mono font-bold text-[#c0c1ff] bg-[#1d1f27] px-2 py-0.5 rounded-full border border-white/10">
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

              {/* QUICK MOMENTS */}
              <section className="space-y-2">
                <h3 className="font-geist-obsidian font-bold text-sm text-white">Aktuelle Einträge</h3>
                <div className="space-y-2">
                  {memories.slice(0, 3).map((mem) => (
                    <div key={mem.id} className="p-3 rounded-xl bg-[#1d1f27] border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-geist-obsidian font-bold text-xs text-white">{mem.title}</span>
                        <span className="text-[9px] bg-[#03b5d3]/20 text-[#4cd7f6] px-1.5 py-0.2 rounded font-mono font-bold">{mem.phaseId}</span>
                      </div>
                      <p className="text-[11px] text-[#c7c4d7] italic line-clamp-2">{mem.story}</p>
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
                    className={`px-3 py-1 rounded-full text-xs font-geist-obsidian font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activePhaseFilter === ph.id
                        ? 'bg-[#8083ff] text-[#0d0096] shadow-xs'
                        : 'bg-[#191b23] text-slate-400 border border-white/10'
                    }`}
                  >
                    {ph.label}
                  </button>
                ))}
              </div>

              {/* FAMILIENSTAMMBAUM */}
              <section className="p-3 rounded-2xl glass-card-obsidian space-y-2">
                <span className="font-geist-obsidian font-bold text-sm text-[#c0c1ff] block">Grafischer Familienstammbaum</span>
                <FamilyTreeCanvas
                  selectedPerson={selectedPerson}
                  onSelectPerson={setSelectedPerson}
                />
                {selectedPerson && (
                  <div className="p-3 rounded-xl bg-[#1d1f27] border border-[#8083ff]/40 space-y-1 text-xs">
                    <span className="font-geist-obsidian font-bold text-xs text-white block">{selectedPerson.name} ({selectedPerson.role})</span>
                    <p className="text-[#c7c4d7] italic">„{selectedPerson.thingsToSay || 'Notiz verfassen...'}“</p>
                  </div>
                )}
              </section>

              {/* MEMORIES FEED */}
              <section className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-geist-obsidian font-bold text-sm text-white">Erinnerungen ({filteredMemories.length})</h3>
                  <button
                    onClick={() => setIsCreatorOpen(true)}
                    className="text-xs font-geist-obsidian font-bold text-[#4cd7f6] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Neu</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {filteredMemories.map((mem) => (
                    <div key={mem.id} className="p-3.5 rounded-xl bg-[#191b23] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-geist-obsidian font-bold text-sm text-white">{mem.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold bg-[#03b5d3]/20 text-[#4cd7f6] px-1.5 py-0.2 rounded">
                            {mem.phaseId}
                          </span>
                          <button
                            onClick={() => onDeleteMemory(mem.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#c7c4d7] leading-relaxed">{mem.story}</p>
                      
                      {mem.date && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
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
              <section className="p-4 rounded-2xl glass-card-obsidian space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-geist-obsidian font-bold uppercase text-[#4cd7f6]">Personal Space</span>
                    <h2 className="font-geist-obsidian text-lg font-bold text-white">Werteschrift & Prinzipien</h2>
                  </div>

                  <button
                    onClick={() => setIsAddWerteOpen(true)}
                    className="px-3 py-1.5 bg-[#03b5d3] hover:bg-[#4cd7f6] text-[#001f26] rounded-full text-xs font-geist-obsidian font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Wert</span>
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {werte.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-xl bg-[#191b23] border border-white/10 space-y-1 relative group">
                      <div className="flex justify-between items-center">
                        <span className="font-geist-obsidian font-bold text-sm text-[#4cd7f6]">{w.title}</span>
                        <button
                          onClick={() => onDeleteWerte(w.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#c7c4d7] leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* MODAL TO ADD NEW WERTE */}
              {isAddWerteOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="w-full max-w-xs bg-[#191b23] rounded-2xl p-5 border border-white/20 space-y-4 shadow-2xl">
                    <h3 className="font-geist-obsidian font-bold text-base text-white">Neuen Wert hinzufügen</h3>
                    
                    <form onSubmit={handleCreateWerteSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs font-geist-obsidian text-slate-300 block mb-1">Titel des Werts</label>
                        <input
                          type="text"
                          required
                          placeholder="z.B. Autonomie & Integrität"
                          value={newWerteTitle}
                          onChange={(e) => setNewWerteTitle(e.target.value)}
                          className="w-full p-2.5 text-xs bg-[#10131a] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4cd7f6]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-geist-obsidian text-slate-300 block mb-1">Beschreibung</label>
                        <textarea
                          rows="3"
                          placeholder="Bedeutung für Ihre Lebensführung..."
                          value={newWerteDesc}
                          onChange={(e) => setNewWerteDesc(e.target.value)}
                          className="w-full p-2.5 text-xs bg-[#10131a] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4cd7f6] resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddWerteOpen(false)}
                          className="px-3 py-1.5 text-xs font-geist-obsidian font-bold text-slate-400 cursor-pointer"
                        >
                          Abbrechen
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#4cd7f6] text-[#001f26] rounded-xl text-xs font-geist-obsidian font-bold cursor-pointer"
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
              <section className="p-4 rounded-2xl glass-card-obsidian space-y-3">
                <span className="text-[10px] font-geist-obsidian font-bold uppercase text-[#c0c1ff]">Life Space</span>
                <h2 className="font-geist-obsidian text-lg font-bold text-white">Vorsorge & Abschiedsbegleiter</h2>

                <div className="space-y-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#191b23] border border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-[#8083ff]/30 text-[#c0c1ff] rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-geist-obsidian font-bold text-xs text-white block">Vorsorgevollmacht & Dokumente</span>
                      <span className="text-[10px] text-[#4cd7f6] font-bold">Safe & Verschlüsselt</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#191b23] border border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-[#03b5d3]/30 text-[#4cd7f6] rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-geist-obsidian font-bold text-xs text-white block">Notfallkontakte</span>
                      <span className="text-[10px] text-slate-400">2 Verwalter hinterlegt</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#191b23] border border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/30 text-indigo-300 rounded-lg">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-xs text-white block">Zeitkapsel-Tresor</span>
                      <span className="text-[10px] text-indigo-300 font-bold">256-Bit Hardware Encryption</span>
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
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-[#10131a]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex justify-around items-center shadow-2xl">
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
    </div>
  );
};
