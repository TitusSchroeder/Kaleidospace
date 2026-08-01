import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Users, Lock, ShieldCheck, Plus, ChevronRight, ArrowLeft, Star, Sparkles, Building2, Trash2, CheckCircle2, MessageSquare, GitBranch, User, Clock, CircleDot } from 'lucide-react';
import { PhaseSchatullen } from '../PhaseSchatullen';
import { Lifeloop } from '../Lifeloop';

export const ExperienceSpace = ({ memories = [], phases = [], simulatedDate, onDateChange, onDeleteMemory, onOpenCreator, onGoHome }) => {
  const [subView, setSubView] = useState('overview');
  const [familyTab, setFamilyTab] = useState('tree'); // 'tree' or 'list'
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activePhaseId, setActivePhaseId] = useState('all');

  // Interactive Events List
  const [eventsList, setEventsList] = useState([
    { id: 'e1', title: 'Sommer am Wörthersee (Jahrestag)', date: '2026-08-12', category: 'Familienerinnerung', daysLeft: '11 Tage' },
    { id: 'e2', title: '18. Geburtstag von Clara (Zeitkapsel-Freigabe)', date: '2028-12-24', category: 'Zeitkapsel', daysLeft: '2 Jahre' },
    { id: 'e3', title: 'Silberne Hochzeit mit Marie', date: '2027-05-15', category: 'Meilenstein', daysLeft: '9 Monate' },
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Interactive Family List
  const [friendsList, setFriendsList] = useState([
    {
      id: 'f3',
      name: 'Opa Heinrich',
      role: 'Großvater',
      gen: 1,
      birthYear: '1942',
      thingsToSay: 'Deine Geschichten aus der Werkstatt prägen mich noch heute.',
      questionToAsk: 'Wie hast du damals die ersten Jahre gemeistert?',
      inspiringTrait: 'Handwerkliche Geduld & Humor',
      isRoleModel: true,
      circle: 'Familien-Circle',
    },
    {
      id: 'f4',
      name: 'Oma Martha',
      role: 'Großmutter',
      gen: 1,
      birthYear: '1945',
      thingsToSay: 'Dein Holunderblütensirup schmeckt nach Kindheit.',
      questionToAsk: 'Welche Lieder habt ihr früher gesungen?',
      inspiringTrait: 'Wärme & Geborgenheit',
      isRoleModel: true,
      circle: 'Familien-Circle',
    },
    {
      id: 'f0',
      name: 'Titus (Ich)',
      role: 'Familienoberhaupt',
      gen: 2,
      birthYear: '1976',
      thingsToSay: 'Verantwortung für unsere Werte übernehmen.',
      questionToAsk: 'Was bleibt von meinem Handeln?',
      inspiringTrait: 'Ausdauer & Besonnenheit',
      isRoleModel: false,
      circle: 'Ich',
    },
    {
      id: 'f5',
      name: 'Marie Schröder',
      role: 'Ehefrau',
      gen: 2,
      birthYear: '1978',
      thingsToSay: 'Danke für 25 Jahre gemeinsame Liebe.',
      questionToAsk: 'Wohin reisen wir als Nächstes?',
      inspiringTrait: 'Bedingungslose Herzlichkeit',
      isRoleModel: true,
      circle: 'Engste Vertraute',
    },
    {
      id: 'f1',
      name: 'Clara Schröder',
      role: 'Tochter',
      gen: 3,
      birthYear: '2008',
      thingsToSay: 'Ich bin stolz auf deinen Mut beim Studium.',
      questionToAsk: 'Wie geht es dir wirklich mit dem Umzug?',
      inspiringTrait: 'Bedingungslose Lebensfreude & Neugier',
      isRoleModel: true,
      circle: 'Familien-Circle',
    },
    {
      id: 'f2',
      name: 'Jonas Schröder',
      role: 'Sohn',
      gen: 3,
      birthYear: '2012',
      thingsToSay: 'Danke für deine Ruhe in schweren Tagen.',
      questionToAsk: 'Wann machen wir unsere nächste Bergtour?',
      inspiringTrait: 'Gelassenheit & tiefes Zuhören',
      isRoleModel: true,
      circle: 'Engste Vertraute',
    },
  ]);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRole, setNewFriendRole] = useState('Familie');
  const [newFriendGen, setNewFriendGen] = useState(2);
  const [newFriendTrait, setNewFriendTrait] = useState('');

  // Handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    setEventsList([
      ...eventsList,
      {
        id: `e-${Date.now()}`,
        title: newEventTitle.trim(),
        date: newEventDate || '2026-09-01',
        category: 'Persönlich',
        daysLeft: 'Anstehend',
      },
    ]);
    setNewEventTitle('');
    setNewEventDate('');
    setIsAddingEvent(false);
  };

  const handleRemoveEvent = (id) => {
    setEventsList(eventsList.filter((e) => e.id !== id));
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;
    setFriendsList([
      ...friendsList,
      {
        id: `f-${Date.now()}`,
        name: newFriendName.trim(),
        role: newFriendRole,
        gen: parseInt(newFriendGen, 10),
        birthYear: '2000',
        thingsToSay: 'Eine wichtige Notiz hinzufügen...',
        questionToAsk: 'Eine Frage für das nächste Gespräch...',
        inspiringTrait: newFriendTrait.trim() || 'Herzlichkeit',
        isRoleModel: false,
        circle: 'Familien-Circle',
      },
    ]);
    setNewFriendName('');
    setNewFriendTrait('');
    setIsAddingFriend(false);
  };

  const handleRemoveFriend = (id) => {
    setFriendsList(friendsList.filter((f) => f.id !== id));
  };

  const gen1 = friendsList.filter((f) => f.gen === 1);
  const gen2 = friendsList.filter((f) => f.gen === 2);
  const gen3 = friendsList.filter((f) => f.gen === 3);

  return (
    <div className="w-full space-y-4 select-none pb-12">
      
      {/* SPACE HEADER WITH HOME BACK BUTTON */}
      <div className="p-4 bg-red-600 text-white rounded-3xl border-2 border-red-700 shadow-md">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1 text-xs font-bold bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-xl mb-3 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white text-red-600 rounded-2xl shadow-xs">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-700 px-2 py-0.5 rounded-full">
              Experience Space
            </span>
            <h2 className="text-xl font-serif font-bold">Experience Space</h2>
          </div>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-2.5">
          
          {/* MODULE 0: DER LIFELOOP ORBIT */}
          <div
            onClick={() => setSubView('lifeloop')}
            className="p-4 bg-slate-900 text-white rounded-2xl border-2 border-emerald-500 shadow-md hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <CircleDot className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-white">Der Lifeloop Orbit</h3>
                <p className="text-[11px] text-slate-300 font-serif">Erinnerungskreis & Zeitreise</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-400" />
          </div>

          {/* MODULE 1: MOMENTE & ERINNERUNGEN */}
          <div
            onClick={() => setSubView('moments')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Momente und Erinnerungen</h3>
                <p className="text-[11px] text-slate-500 font-serif">{memories.length} Geschichten in 5 Schatullen</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 2: BEVORSTEHENDE EREIGNISSE */}
          <div
            onClick={() => setSubView('events')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Bevorstehende Ereignisse</h3>
                <p className="text-[11px] text-slate-500 font-serif">{eventsList.length} Jahrestage & Feiern</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 3: FAMILIE UND FREUNDE */}
          <div
            onClick={() => setSubView('family')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Familie und Stammbaum</h3>
                <p className="text-[11px] text-slate-500 font-serif">Graphischer Stammbaum ({friendsList.length} Personen)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 4: PRIVATER BEREICH */}
          <div
            onClick={() => setSubView('private')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Privater Bereich (Tresor & Kapsel)</h3>
                <p className="text-[11px] text-slate-500 font-serif">Zeitversetzte Freigaben</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 5: PARTNERANGEBOTE */}
          <div
            onClick={() => setSubView('partner')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Kuratierte Partnerangebote</h3>
                <p className="text-[11px] text-slate-500 font-serif">Fotoarchive & Digitalisierung</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

        </div>
      )}

      {/* SUB-VIEW DETAILS */}
      {subView !== 'overview' && (
        <div className="space-y-3">
          <button
            onClick={() => setSubView('overview')}
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </button>

          {/* SUB-VIEW 0: LIFELOOP ORBIT */}
          {subView === 'lifeloop' && (
            <Lifeloop
              phases={phases}
              activePhaseId={activePhaseId}
              onSelectPhase={setActivePhaseId}
              memories={memories}
              simulatedDate={simulatedDate}
              onDateChange={onDateChange}
            />
          )}

          {/* SUB-VIEW 1: MOMENTE */}
          {subView === 'moments' && (
            <PhaseSchatullen
              phases={phases}
              memories={memories}
              simulatedDate={simulatedDate}
              onDeleteMemory={onDeleteMemory}
              onOpenCreator={onOpenCreator}
            />
          )}

          {/* SUB-VIEW 2: BEVORSTEHENDE EREIGNISSE */}
          {subView === 'events' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <span>Bevorstehende Ereignisse ({eventsList.length})</span>
                </h3>

                <button
                  onClick={() => setIsAddingEvent(!isAddingEvent)}
                  className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Neu</span>
                </button>
              </div>

              {isAddingEvent && (
                <form onSubmit={handleAddEvent} className="p-3 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Bezeichnung (z.B. Silberne Hochzeit)"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    required
                  />
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button type="button" onClick={() => setIsAddingEvent(false)} className="text-slate-400">Abbrechen</button>
                    <button type="submit" className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg">Speichern</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-2.5">
                {eventsList.map((evt) => (
                  <div key={evt.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{evt.title}</span>
                      <span className="text-[10px] text-slate-500">{evt.date} • {evt.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">{evt.daysLeft}</span>
                      <button onClick={() => handleRemoveEvent(evt.id)} className="text-slate-400 hover:text-rose-600 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: GRAPHISCHER STAMMBAUM & FAMILIE */}
          {subView === 'family' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4">
              
              {/* Header & Tab Toggle Switch */}
              <div className="flex items-center justify-between border-b pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif font-bold text-base text-slate-900">Familienstammbaum</h3>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setFamilyTab('tree')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      familyTab === 'tree' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Stammbaum
                  </button>
                  <button
                    onClick={() => setFamilyTab('list')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      familyTab === 'list' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Liste ({friendsList.length})
                  </button>
                </div>
              </div>

              {/* TAB 1: GRAPHISCHER STAMMBAUM */}
              {familyTab === 'tree' && (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Visualisierter Stammbaum
                    </span>
                    <p className="text-xs text-slate-500 font-serif">
                      Klicken Sie auf eine Person im Stammbaum, um Notizen und Fragen anzuzeigen.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-3xl space-y-6 border-2 border-emerald-500/30 relative">
                    
                    {/* GENERATION 1: GROSSELTERN */}
                    <div className="space-y-2 text-center">
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                        Gen 1 • Großeltern & Vorfahren
                      </span>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {gen1.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setSelectedPerson(p)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1 w-32 ${
                              selectedPerson?.id === p.id
                                ? 'bg-emerald-600 border-white text-white shadow-lg ring-2 ring-emerald-400'
                                : 'bg-slate-800 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-300">
                              <User className="w-4 h-4" />
                            </div>
                            <span className="font-serif font-bold text-xs line-clamp-1">{p.name}</span>
                            <span className="text-[9px] font-mono text-emerald-300">{p.role} ({p.birthYear})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-emerald-500/60 mx-auto" />

                    {/* GENERATION 2: ELTERN & ICH */}
                    <div className="space-y-2 text-center">
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                        Gen 2 • Ich & Partner
                      </span>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {gen2.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setSelectedPerson(p)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1 w-32 ${
                              selectedPerson?.id === p.id
                                ? 'bg-emerald-600 border-white text-white shadow-lg ring-2 ring-emerald-400'
                                : 'bg-slate-800 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-300">
                              <User className="w-4 h-4" />
                            </div>
                            <span className="font-serif font-bold text-xs line-clamp-1">{p.name}</span>
                            <span className="text-[9px] font-mono text-emerald-300">{p.role} ({p.birthYear})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-emerald-500/60 mx-auto" />

                    {/* GENERATION 3: KINDER */}
                    <div className="space-y-2 text-center">
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                        Gen 3 • Kinder & Nachkommen
                      </span>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {gen3.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setSelectedPerson(p)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1 w-32 ${
                              selectedPerson?.id === p.id
                                ? 'bg-emerald-600 border-white text-white shadow-lg ring-2 ring-emerald-400'
                                : 'bg-slate-800 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-300">
                              <User className="w-4 h-4" />
                            </div>
                            <span className="font-serif font-bold text-xs line-clamp-1">{p.name}</span>
                            <span className="text-[9px] font-mono text-emerald-300">{p.role} ({p.birthYear})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {selectedPerson && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-slate-900">{selectedPerson.name}</span>
                        <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">
                          {selectedPerson.role} ({selectedPerson.birthYear})
                        </span>
                      </div>
                      <div className="space-y-1 font-serif text-slate-700">
                        <p><strong>Dinge, die ich sagen möchte:</strong> „{selectedPerson.thingsToSay}“</p>
                        <p><strong>Frage für das nächste Gespräch:</strong> „{selectedPerson.questionToAsk}“</p>
                        <p><strong>Inspirierende Eigenschaft:</strong> {selectedPerson.inspiringTrait}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: LIST VIEW */}
              {familyTab === 'list' && (
                <div className="space-y-3">
                  <button
                    onClick={() => setIsAddingFriend(!isAddingFriend)}
                    className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Person im Stammbaum eintragen</span>
                  </button>

                  {isAddingFriend && (
                    <form onSubmit={handleAddFriend} className="p-3 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                      <input
                        type="text"
                        placeholder="Name der Person"
                        value={newFriendName}
                        onChange={(e) => setNewFriendName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Rolle (z.B. Tochter, Großvater)"
                        value={newFriendRole}
                        onChange={(e) => setNewFriendRole(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      />
                      <select
                        value={newFriendGen}
                        onChange={(e) => setNewFriendGen(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      >
                        <option value={1}>Gen 1 (Großeltern / Vorfahren)</option>
                        <option value={2}>Gen 2 (Ich / Partner / Geschwister)</option>
                        <option value={3}>Gen 3 (Kinder / Nachkommen)</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Inspirierende Eigenschaft"
                        value={newFriendTrait}
                        onChange={(e) => setNewFriendTrait(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      />
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button type="button" onClick={() => setIsAddingFriend(false)} className="text-slate-400">Abbrechen</button>
                        <button type="submit" className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg">Hinzufügen</button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    {friendsList.map((person) => (
                      <div key={person.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{person.name}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                              {person.role} (Gen {person.gen})
                            </span>
                          </div>

                          <button onClick={() => handleRemoveFriend(person.id)} className="text-slate-400 hover:text-rose-600 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1 text-slate-700 font-serif">
                          <p><strong>Dinge, die ich sagen möchte:</strong> „{person.thingsToSay}“</p>
                          <p><strong>Frage für das nächste Gespräch:</strong> „{person.questionToAsk}“</p>
                          <p><strong>Inspirierende Eigenschaft:</strong> {person.inspiringTrait}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 4: PRIVATER BEREICH */}
          {subView === 'private' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                <span>Privater Bereich (Tresor & Zeitkapsel)</span>
              </h3>
              <p className="text-xs text-slate-600 font-serif">
                Hier hinterlegte Zeitkapseln werden erst zu einem festgelegten Zeitpunkt für Ihre Familie freigeschaltet.
              </p>
              <button
                onClick={onOpenCreator}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Neue Zeitkapsel anlegen
              </button>
            </div>
          )}

          {/* SUB-VIEW 5: PARTNERANGEBOTE */}
          {subView === 'partner' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Partnerangebote für den Experience Space</span>
              </h3>
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs space-y-2">
                <span className="font-bold block text-slate-900">Memoria Digitalarchiv</span>
                <p className="text-slate-600 font-serif">Professionelle Digitalisierung alter Familienfotos, Dias und Tonbänder.</p>
                <a href="mailto:service@memoria-archiv.de" className="inline-block px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-[11px]">Anfragen</a>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
