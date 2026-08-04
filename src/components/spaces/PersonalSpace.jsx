import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Compass, User, Key, Scroll, BookOpen, Activity, Sparkles, Target, MapPin, Feather, Brain, ShieldCheck, Building2, ChevronRight, ArrowLeft, ExternalLink, Lock, CheckCircle2, Plus, Trash2, Edit3, Quote } from 'lucide-react';
import { WerteKompass } from '../WerteKompass';
import { SecurityVault } from '../SecurityVault';
import { DasLetzteKapitel } from '../DasLetzteKapitel';

export const PersonalSpace = ({ werte = [], onAddWerte, onDeleteWerte, letztesKapitel, onUpdateLetztesKapitel, onGoHome }) => {
  const [subView, setSubView] = useState('overview');

  // 1. Mein Profil (Interactive Edit)
  const [profile, setProfile] = useState({
    name: 'Titus Schröder',
    contact: 'titus@schroeder-familie.de',
    health: 'Blutgruppe A+, Keine chronischen Vorerkrankungen',
    emergency: 'Clara Schröder (Tochter, +49 170 1234567)',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 2. Passwörter & 1Password
  const [passwords, setPasswords] = useState([
    { id: 'p1', service: 'Master Tresor PIN', hint: 'Geschützt in 1Password' },
    { id: 'p2', service: 'Digitale Zeitkapsel-Schlüssel', hint: 'Abschiedsbegleiter Dr. Weber' },
  ]);
  const [newPassService, setNewPassService] = useState('');
  const [newPassHint, setNewPassHint] = useState('');

  // 3. Interessen & Hobbys
  const [interests, setInterests] = useState([
    'Philosophie der Stoa & Entschleunigung',
    'Geschichte der modernen Architektur',
    'Klassische Musik & Konzertabende',
  ]);
  const [hobbies, setHobbies] = useState([
    'Wandern im Schwarzwald & Bergtouren',
    'Holzschnitzen & Handwerkskunst',
    'Gärtnern & Anbau eigener Apfelsorten',
  ]);
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');

  // 4. Inspiration (Seelische Impulse & Zitate)
  const [inspirations, setInspirations] = useState([
    { id: 'i1', quote: 'Nicht wie lange, sondern wie gut du gelebt hast, ist die Hauptsache.', author: 'Seneca' },
    { id: 'i2', quote: 'Die besten Dinge im Leben sind nicht die, die man für Geld bekommt.', author: 'Albert Einstein' },
    { id: 'i3', quote: 'Vergiss nie: Das Leben ist jetzt.', author: 'Persönlicher Impuls' },
  ]);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');

  // 5. Bucket List (Interactive Toggle & Add)
  const [bucketList, setBucketList] = useState([
    { id: 'b1', text: 'Alpenüberquerung zu Fuß von Oberstdorf nach Meran', category: 'Ich', done: true },
    { id: 'b2', text: 'Gemeinsames Familien-Erinnerungsbuch veröffentlichen', category: 'Familie', done: false },
    { id: 'b3', text: 'Stiftung für regionalen Naturschutz gründen', category: 'Beruf', done: false },
  ]);
  const [newBucketText, setNewBucketText] = useState('');

  // 6. Mein Weg
  const [myWay, setMyWay] = useState({
    strengths: 'Besonnenheit, Ausdauer & tiefes Zuhören',
    vision: 'Ein Leben in Dankbarkeit, innerer Ruhe und bleibenden Werten',
    notMyWay: 'Rastloser Konsum, oberflächlicher Lärm und Fremdbestimmung',
  });

  // 7. Meine Gedanken (Gedanken-Stream)
  const [reflections, setReflections] = useState([
    { id: 'r1', date: '2026-07-28', text: 'Heute verstanden: Stille ist nicht die Abwesenheit von Geräuschen, sondern die Anwesenheit von innerem Frieden.' },
  ]);
  const [newReflectionText, setNewReflectionText] = useState('');

  // Handlers
  const handleAddInterest = (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    setInterests([...interests, newInterest.trim()]);
    setNewInterest('');
  };

  const handleAddHobby = (e) => {
    e.preventDefault();
    if (!newHobby.trim()) return;
    setHobbies([...hobbies, newHobby.trim()]);
    setNewHobby('');
  };

  const handleAddInspiration = (e) => {
    e.preventDefault();
    if (!newQuoteText.trim()) return;
    setInspirations([
      ...inspirations,
      { id: `i-${Date.now()}`, quote: newQuoteText.trim(), author: newQuoteAuthor.trim() || 'Eigener Gedanken-Impuls' },
    ]);
    setNewQuoteText('');
    setNewQuoteAuthor('');
  };

  const handleToggleBucket = (id) => {
    setBucketList(bucketList.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const handleAddBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketText.trim()) return;
    setBucketList([
      ...bucketList,
      { id: `b-${Date.now()}`, text: newBucketText.trim(), category: 'Ich', done: false },
    ]);
    setNewBucketText('');
  };

  const handleAddPasswordHint = (e) => {
    e.preventDefault();
    if (!newPassService.trim()) return;
    setPasswords([
      ...passwords,
      { id: `p-${Date.now()}`, service: newPassService.trim(), hint: newPassHint.trim() || 'Hinterlegt' },
    ]);
    setNewPassService('');
    setNewPassHint('');
  };

  const handleAddReflection = (e) => {
    e.preventDefault();
    if (!newReflectionText.trim()) return;
    setReflections([
      { id: `r-${Date.now()}`, date: new Date().toISOString().slice(0, 10), text: newReflectionText.trim() },
      ...reflections,
    ]);
    setNewReflectionText('');
  };

  return (
    <div className="w-full space-y-4 select-none pb-12">
      
      {/* SPACE HEADER WITH HOME BACK BUTTON */}
      <div className="p-4.5 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white rounded-3xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 text-xs font-bold bg-black/20 hover:bg-black/40 text-white px-3 py-1.5 rounded-full mb-3.5 transition-all cursor-pointer backdrop-blur-md border border-white/20 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-md flex-shrink-0">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold tracking-tight">Personal Space</h2>
            <p className="text-xs font-serif italic text-emerald-100/90 mt-0.5">
              Einordnen / Rahmen / Korridor / Verstehen / ideell / Das Leben bewusst leben | Living life mindfully
            </p>
          </div>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-2.5">
          
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
              <div className="p-2 bg-slate-900 text-emerald-400 rounded-xl">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Meine Passwörter</h3>
                <p className="text-[11px] text-slate-500 font-serif">Passwort-Hinweise & 1Password Partner</p>
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
                <p className="text-[11px] text-slate-500 font-serif">{werte.length} verankerte Prinzipien</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Geistige & körperliche Aktivitäten</p>
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
                <p className="text-[11px] text-slate-500 font-serif">{inspirations.length} seelische Impulse & Zitate</p>
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
                <p className="text-[11px] text-slate-500 font-serif">{bucketList.length} Ziele & Wünsche</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Abschiedsbegleiter & Wünsche</p>
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
                <p className="text-[11px] text-slate-500 font-serif">{reflections.length} Gedanken-Stream Notizen</p>
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
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </button>

          {/* SUB-VIEW: INSPIRATION (SEELISCHE IMPULSE) */}
          {subView === 'inspiration' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Meine Inspiration & Impulse ({inspirations.length})</span>
                </h3>
              </div>

              <form onSubmit={handleAddInspiration} className="space-y-2">
                <textarea
                  rows="2"
                  placeholder="Gedanken-Impuls oder Zitat verfassen..."
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Urheber / Autor (optional)"
                    value={newQuoteAuthor}
                    onChange={(e) => setNewQuoteAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded-xl text-xs flex-shrink-0 cursor-pointer">
                    Speichern
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {inspirations.map((item) => (
                  <div key={item.id} className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
                    <Quote className="w-4 h-4 text-purple-500" />
                    <p className="font-serif italic text-slate-900 text-xs">„{item.quote}“</p>
                    <span className="text-[10px] font-bold text-purple-800 block text-right">— {item.author}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW: INTERESSEN & HOBBYS */}
          {subView === 'interests-hobbies' && (
            <div className="space-y-3 text-xs font-serif">
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 font-sans">
                <h4 className="font-bold text-slate-900 text-sm">Geistige Interessen</h4>
                <form onSubmit={handleAddInterest} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Neues Interesse hinzufügen..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-teal-600 text-white font-bold rounded-xl text-xs flex-shrink-0">
                    Hinzufügen
                  </button>
                </form>
                <ul className="list-disc list-inside space-y-1 text-slate-700 font-serif">
                  {interests.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 font-sans">
                <h4 className="font-bold text-slate-900 text-sm">Körperliche Hobbys</h4>
                <form onSubmit={handleAddHobby} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Neues Hobby hinzufügen..."
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs flex-shrink-0">
                    Hinzufügen
                  </button>
                </form>
                <ul className="list-disc list-inside space-y-1 text-slate-700 font-serif">
                  {hobbies.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SUB-VIEW: PROFIL */}
          {subView === 'profile' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif font-bold text-base text-slate-900">Mein Profil</h3>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Fertig' : 'Bearbeiten'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <div className="space-y-2">
                  <div>
                    <label className="block font-bold text-slate-700 text-[10px]">Name:</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[10px]">Kontakt-E-Mail:</label>
                    <input
                      type="email"
                      value={profile.contact}
                      onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-[10px]">Gesundheitsdaten:</label>
                    <input
                      type="text"
                      value={profile.health}
                      onChange={(e) => setProfile({ ...profile, health: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 font-serif">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Kontakt:</strong> {profile.contact}</p>
                  <p><strong>Gesundheitsdaten:</strong> {profile.health}</p>
                  <p><strong>Notfallkontakt:</strong> {profile.emergency}</p>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW: PASSWÖRTER */}
          {subView === 'passwords' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white border-2 border-blue-500 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-sm text-white">1Password Partner-Empfehlung</span>
                  </div>
                  <span className="text-[9px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded-md font-bold">
                    Empfohlen
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Für maximale Sicherheit empfehlen wir die Speicherung vertraulicher Passwörter bei unserem Partner <strong>1Password</strong>.
                </p>

                <a
                  href="https://1password.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Jetzt 1Password sicher ausprobieren</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
                <h4 className="font-serif font-bold text-sm text-slate-900">Passwort-Hinweise in KALEIDOspace</h4>

                <form onSubmit={handleAddPasswordHint} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dienst (z.B. Tresor)"
                    value={newPassService}
                    onChange={(e) => setNewPassService(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-xs flex-shrink-0">
                    Hinzufügen
                  </button>
                </form>

                <div className="space-y-2">
                  {passwords.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-bold text-slate-900">{p.service}</span>
                      <span className="text-[11px] text-slate-500">{p.hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW: WÜNSCHE & BUCKET LIST */}
          {subView === 'bucketlist' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Meine Wünsche & Bucket List ({bucketList.length})</h3>

              <form onSubmit={handleAddBucketItem} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Neues Ziel oder Wunsch verfassen..."
                  value={newBucketText}
                  onChange={(e) => setNewBucketText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl text-xs flex-shrink-0 cursor-pointer">
                  Hinzufügen
                </button>
              </form>

              <div className="space-y-2">
                {bucketList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleBucket(item.id)}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:border-rose-300"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${item.done ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span className={item.done ? 'line-through text-slate-400' : 'font-bold text-slate-900'}>{item.text}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.done ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {item.done ? 'Erreicht' : 'Offen'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW: MEIN WEG */}
          {subView === 'myway' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs font-serif">
              <h3 className="font-serif font-bold text-base text-slate-900 font-sans">Mein Weg (Sinn & Vision)</h3>
              <p><strong>Stärken:</strong> {myWay.strengths}</p>
              <p><strong>Vision:</strong> {myWay.vision}</p>
              <p><strong>Was ist NICHT mein Weg:</strong> {myWay.notMyWay}</p>
            </div>
          )}

          {/* SUB-VIEW: GEDANKEN-STREAM */}
          {subView === 'reflections' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Meine Gedanken (Unsortierter Stream)</h3>

              <form onSubmit={handleAddReflection} className="space-y-2">
                <textarea
                  rows="3"
                  placeholder="Welcher Gedanke bewegt Sie gerade?"
                  value={newReflectionText}
                  onChange={(e) => setNewReflectionText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif"
                />
                <button type="submit" className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer">
                  Gedanken festhalten
                </button>
              </form>

              <div className="space-y-2">
                {reflections.map((r) => (
                  <div key={r.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-serif">
                    <span className="text-[10px] font-mono text-amber-800 block mb-1 font-sans">{r.date}</span>
                    <p className="text-slate-800">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subView === 'values' && <WerteKompass werte={werte} onAddWerte={onAddWerte} onDeleteWerte={onDeleteWerte} />}
          {subView === 'farewell' && <DasLetzteKapitel letztesKapitel={letztesKapitel} onUpdateLetztesKapitel={onUpdateLetztesKapitel} />}
          {subView === 'vault' && <SecurityVault />}
        </div>
      )}

    </div>
  );
};
