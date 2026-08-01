import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Users, Lock, ShieldCheck, Plus, ChevronRight, ArrowLeft, Star, Sparkles, Building2, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';
import { PhaseSchatullen } from '../PhaseSchatullen';

export const ExperienceSpace = ({ memories = [], phases = [], simulatedDate, onDeleteMemory, onOpenCreator, onGoHome }) => {
  const [subView, setSubView] = useState('overview');

  // Interactive Events List
  const [eventsList, setEventsList] = useState([
    { id: 'e1', title: 'Sommer am Wörthersee (Jahrestag)', date: '2026-08-12', category: 'Familienerinnerung', daysLeft: '11 Tage' },
    { id: 'e2', title: '18. Geburtstag von Clara (Zeitkapsel-Freigabe)', date: '2028-12-24', category: 'Zeitkapsel', daysLeft: '2 Jahre' },
    { id: 'e3', title: 'Silberne Hochzeit mit Marie', date: '2027-05-15', category: 'Meilenstein', daysLeft: '9 Monate' },
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Interactive Family & Friends List
  const [friendsList, setFriendsList] = useState([
    {
      id: 'f1',
      name: 'Clara Schröder',
      role: 'Tochter',
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
      thingsToSay: 'Danke für deine Ruhe in schweren Tagen.',
      questionToAsk: 'Wann machen wir unsere nächste Bergtour?',
      inspiringTrait: 'Gelassenheit & tiefes Zuhören',
      isRoleModel: true,
      circle: 'Engste Vertraute',
    },
    {
      id: 'f3',
      name: 'Opa Heinrich',
      role: 'Großvater',
      thingsToSay: 'Deine Geschichten aus der Werkstatt prägen mich noch heute.',
      questionToAsk: 'Wie hast du damals die ersten Jahre gemeistert?',
      inspiringTrait: 'Handwerkliche Geduld & Humor',
      isRoleModel: true,
      circle: 'Familien-Circle',
    },
  ]);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRole, setNewFriendRole] = useState('Familie');
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
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Familie und Freunde</h3>
                <p className="text-[11px] text-slate-500 font-serif">{friendsList.length} Personen & Notizen</p>
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

          {/* SUB-VIEW 2: BEVORSTEHENDE EREIGNISSE (FULLY INTERACTIVE) */}
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

          {/* SUB-VIEW 3: FAMILIE UND FREUNDE (FULLY INTERACTIVE) */}
          {subView === 'family' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Familie und Freunde ({friendsList.length})</span>
                </h3>

                <button
                  onClick={() => setIsAddingFriend(!isAddingFriend)}
                  className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Person eintragen</span>
                </button>
              </div>

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
                    placeholder="Beziehung / Rolle (z.B. Tochter, Freund)"
                    value={newFriendRole}
                    onChange={(e) => setNewFriendRole(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
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
                          {person.role}
                        </span>
                      </div>

                      <button onClick={() => handleRemoveFriend(person.id)} className="text-slate-400 hover:text-rose-600 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-slate-700 font-serif">
                      <p><strong>Dinge, die ich sagen möchte:</strong> „{person.thingsToSay}“</p>
                      <p><strong>Frage, die ich stellen möchte:</strong> „{person.questionToAsk}“</p>
                      <p><strong>Inspirierende Eigenschaft:</strong> {person.inspiringTrait}</p>
                    </div>
                  </div>
                ))}
              </div>
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
