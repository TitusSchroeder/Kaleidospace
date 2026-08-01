import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, User, Key, Scroll, BookOpen, Activity, Sparkles, Target, MapPin, Feather, Brain, ShieldCheck, Building2, ChevronRight, ArrowLeft } from 'lucide-react';
import { WerteKompass } from '../WerteKompass';
import { SecurityVault } from '../SecurityVault';
import { DasLetzteKapitel } from '../DasLetzteKapitel';

export const PersonalSpace = ({ werte = [], onAddWerte, onDeleteWerte, letztesKapitel, onUpdateLetztesKapitel }) => {
  const [subView, setSubView] = useState('overview');

  // Interactive Sub-Module State Data
  const [profile, setProfile] = useState({
    name: 'Titus Schröder',
    contact: 'titus@schroeder-familie.de',
    health: 'Blutgruppe A+, Keine Allergien',
    emergency: 'Clara Schröder (Tochter, +49 170 1234567)',
  });

  const [passwords, setPasswords] = useState([
    { id: 'p1', service: 'Master Tresor PIN', hint: 'Geschützt durch 2FA' },
    { id: 'p2', service: 'Digitale Zeitkapsel-Schlüssel', hint: 'Abschiedsbegleiter Dr. Weber' },
  ]);

  const [interests, setInterests] = useState([
    'Philosophie der Stoa & Entschleunigung',
    'Geschichte der Architektur',
    'Klassische Musik & Oper',
  ]);

  const [hobbies, setHobbies] = useState([
    'Wandern im Schwarzwald',
    'Holzschnitzen & Handwerk',
    'Gärtnern & Apfelanbau',
  ]);

  const [bucketList, setBucketList] = useState([
    { id: 'b1', text: 'Alpenüberquerung zu Fuß', category: 'Ich', done: true },
    { id: 'b2', text: 'Gemeinsames Familienbuch veröffentlichen', category: 'Familie', done: false },
    { id: 'b3', text: 'Stiftung für Naturschutz gründen', category: 'Beruf', done: false },
  ]);

  const [myWay, setMyWay] = useState({
    strengths: 'Besonnenheit, Ausdauer & Zuhören',
    vision: 'Ein Leben in Dankbarkeit und bleibenden Werten',
    notMyWay: 'Rastloser Konsum und oberflächlicher Lärm',
  });

  const [reflections, setReflections] = useState([
    { id: 'r1', date: '2026-07-28', text: 'Heute verstanden: Stille ist nicht die Abwesenheit von Geräuschen, sondern die Anwesenheit von Frieden.' },
  ]);

  return (
    <div className="w-full space-y-4 select-none pb-20">
      
      {/* SPACE HEADER */}
      <div className="p-4 bg-emerald-600 text-white rounded-3xl border-2 border-emerald-700 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white text-emerald-600 rounded-2xl shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-700 px-2.5 py-0.5 rounded-full">
              Space 2
            </span>
            <h2 className="text-xl font-serif font-bold">Personal Space</h2>
            <p className="text-xs text-emerald-100 font-serif">
              Einordnen / Rahmen / Verstehen • Living life mindfully
            </p>
          </div>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-3">
          
          {/* MODULE 1: MEIN PROFIL */}
          <div
            onClick={() => setSubView('profile')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Mein Profil</h3>
                <p className="text-[11px] text-slate-500 font-serif">Kontaktdaten, Gesundheit & Notfall</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 2: PASSWÖRTER */}
          <div
            onClick={() => setSubView('passwords')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Passwörter</h3>
                <p className="text-[11px] text-slate-500 font-serif">Geschützte Passwort-Hinweise</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 3: MEINE WERTE */}
          <div
            onClick={() => setSubView('values')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Scroll className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Werte (Werteschrift)</h3>
                <p className="text-[11px] text-slate-500 font-serif">Werte, Überzeugungen & Prinzipien</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 4: INTERESSEN & HOBBYS */}
          <div
            onClick={() => setSubView('interests-hobbies')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Interessen & Hobbys</h3>
                <p className="text-[11px] text-slate-500 font-serif">Geistige & körperliche Entfaltung</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 5: INSPIRATION */}
          <div
            onClick={() => setSubView('inspiration')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Inspiration</h3>
                <p className="text-[11px] text-slate-500 font-serif">Seelische Impulse & Zitate</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 6: WÜNSCHE & BUCKET LIST */}
          <div
            onClick={() => setSubView('bucketlist')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Wünsche / Träume / Bucket List</h3>
                <p className="text-[11px] text-slate-500 font-serif">Ich, Familie & Beruf</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 7: MEIN WEG */}
          <div
            onClick={() => setSubView('myway')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Mein Weg</h3>
                <p className="text-[11px] text-slate-500 font-serif">Stärken, Sinn & Vision</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 8: PERSÖNLICHER ABSCHIED */}
          <div
            onClick={() => setSubView('farewell')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Persönlicher Abschied</h3>
                <p className="text-[11px] text-slate-500 font-serif">Abschiedsbegleiter, Abschiedshaus, Wünsche</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 9: MEINE GEDANKEN */}
          <div
            onClick={() => setSubView('reflections')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Gedanken</h3>
                <p className="text-[11px] text-slate-500 font-serif">Unsortierte Notizen & Gedanken-Stream</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 10: DATEN-TRESOR */}
          <div
            onClick={() => setSubView('vault')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Daten-Tresor (Data Vault)</h3>
                <p className="text-[11px] text-slate-500 font-serif">Geschützte Dokumente & Vollmachten</p>
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
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Personal Space</span>
          </button>

          {subView === 'profile' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Mein Profil</h3>
              <div className="space-y-2 font-serif">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Kontakt:</strong> {profile.contact}</p>
                <p><strong>Gesundheitsdaten:</strong> {profile.health}</p>
                <p><strong>Notfallkontakt:</strong> {profile.emergency}</p>
              </div>
            </div>
          )}

          {subView === 'values' && (
            <WerteKompass werte={werte} onAddWerte={onAddWerte} onDeleteWerte={onDeleteWerte} />
          )}

          {subView === 'farewell' && (
            <DasLetzteKapitel letztesKapitel={letztesKapitel} onUpdateLetztesKapitel={onUpdateLetztesKapitel} />
          )}

          {subView === 'vault' && (
            <SecurityVault />
          )}

          {subView === 'bucketlist' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Meine Wünsche & Bucket List</h3>
              <div className="space-y-2">
                {bucketList.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>{item.text} ({item.category})</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.done ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {item.done ? 'Erreicht' : 'Offen'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subView === 'myway' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs font-serif">
              <h3 className="font-serif font-bold text-base text-slate-900 font-sans">Mein Weg (Sinn & Vision)</h3>
              <p><strong>Stärken:</strong> {myWay.strengths}</p>
              <p><strong>Vision:</strong> {myWay.vision}</p>
              <p><strong>Was ist NICHT mein Weg:</strong> {myWay.notMyWay}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
