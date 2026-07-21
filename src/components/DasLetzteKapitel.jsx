import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, Music, Heart, Sparkles, Building2, ShieldCheck, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';

export const DasLetzteKapitel = ({ letztesKapitel, onUpdateLetztesKapitel }) => {
  const [data, setData] = useState(letztesKapitel);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongNote, setNewSongNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Add Music Song
  const handleAddSong = (e) => {
    e.preventDefault();
    if (!newSongTitle.trim()) return;

    const updatedMusic = [
      ...data.music,
      {
        title: newSongTitle.trim(),
        artist: newSongArtist.trim() || 'Unbekannt',
        note: newSongNote.trim() || 'Für die Abschiedsfeier',
      },
    ];

    const updatedData = { ...data, music: updatedMusic };
    setData(updatedData);
    onUpdateLetztesKapitel(updatedData);

    setNewSongTitle('');
    setNewSongArtist('');
    setNewSongNote('');
  };

  // Remove Music Song
  const handleRemoveSong = (idx) => {
    const updatedMusic = data.music.filter((_, i) => i !== idx);
    const updatedData = { ...data, music: updatedMusic };
    setData(updatedData);
    onUpdateLetztesKapitel(updatedData);
  };

  // Update Atmosphere or Words
  const handleTextChange = (section, key, value) => {
    const updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    };
    setData(updatedData);
    onUpdateLetztesKapitel(updatedData);
  };

  const handleSaveAll = () => {
    onUpdateLetztesKapitel(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <section className="w-full my-6 flex flex-col items-center select-none">
      <div className="w-full max-w-5xl mx-auto glass-card rounded-3xl p-6 lg:p-10 border border-slate-200/90 shadow-xl bg-white text-slate-900 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl shadow-xs">
              <Feather className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-800 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
                Lebensabschied & Entlastung der Angehörigen
              </span>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Das Letzte Kapitel (Abschiedsfeier-Wünsche)
              </h2>
            </div>
          </div>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-rose-400" />}
            <span>{isSaved ? 'Wünsche gespeichert!' : 'Änderungen sichern'}</span>
          </button>
        </div>

        {/* Intro Guidance */}
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/70 flex items-start gap-3 text-slate-800 text-xs font-serif leading-relaxed">
          <Sparkles className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <p>
            Halten Sie hier Ihre ganz persönlichen Vorstellungen für den <strong>Lebensabschied</strong> fest. 
            Diese Informationen schenken Ihren Angehörigen in schweren Stunden liebevolle Klarheit und werden vertraulich mit Ihrem <strong>Abschiedsbegleiter</strong> geteilt.
          </p>
        </div>

        {/* 4 CORE SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SECTION 1: MUSIK & LIEDER FÜR DIE ABSCHIEDSFEIER */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base">
                <Music className="w-5 h-5" />
                <span>1. Musik & Lieblingslieder</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                {data.music.length} Lieder
              </span>
            </div>

            <p className="text-xs text-slate-500 font-serif italic">
              Welche Musikstücke sollen während der Abschiedsfeier erklingen?
            </p>

            {/* Existing Music List */}
            <div className="space-y-2">
              {data.music.map((song, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">{song.title}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{song.artist} — <span className="italic">{song.note}</span></span>
                  </div>
                  <button
                    onClick={() => handleRemoveSong(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Music Form */}
            <form onSubmit={handleAddSong} className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 block">Neues Musikstück hinzufügen:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Titel (z.B. Clair de Lune)"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Künstler (z.B. Debussy)"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Hinweis (z.B. Zum Einlass)"
                  value={newSongNote}
                  onChange={(e) => setNewSongNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Hinzufügen</span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 2: STIMMUNG, FARBEN & ATMOSPHÄRE */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base">
                <Heart className="w-5 h-5" />
                <span>2. Stimmung & Atmosphäre</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Blumen & Dekoration:</label>
                <input
                  type="text"
                  value={data.atmosphere.flowers}
                  onChange={(e) => handleTextChange('atmosphere', 'flowers', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Farben & Dresscode:</label>
                <input
                  type="text"
                  value={data.atmosphere.dresscode}
                  onChange={(e) => handleTextChange('atmosphere', 'dresscode', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Persönliche Wünsche zur Stimmung:</label>
                <textarea
                  rows="3"
                  value={data.atmosphere.notes}
                  onChange={(e) => handleTextChange('atmosphere', 'notes', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: WORTE, ZITATE & ABSCHIEDSREDE */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base">
                <Feather className="w-5 h-5" />
                <span>3. Worte, Zitate & Rede</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lieblingsgedicht oder Leitspruch:</label>
                <textarea
                  rows="3"
                  value={data.words.poem}
                  onChange={(e) => handleTextChange('words', 'poem', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif italic leading-relaxed focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hinweise an den Redner / Abschiedsbegleiter:</label>
                <textarea
                  rows="3"
                  value={data.words.speakerNotes}
                  onChange={(e) => handleTextChange('words', 'speakerNotes', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: GEWÄHLTER ABSCHIEDSBEGLEITER / ABSCHIEDSHAUS */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base">
                <Building2 className="w-5 h-5" />
                <span>4. Abschiedsbegleiter / Abschiedshaus</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Vertrautes Abschiedshaus / Begleiter:</label>
                <input
                  type="text"
                  value={data.abschiedshaus.name}
                  onChange={(e) => handleTextChange('abschiedshaus', 'name', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ort / Region:</label>
                  <input
                    type="text"
                    value={data.abschiedshaus.location}
                    onChange={(e) => handleTextChange('abschiedshaus', 'location', e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kontakt-E-Mail:</label>
                  <input
                    type="email"
                    value={data.abschiedshaus.contact}
                    onChange={(e) => handleTextChange('abschiedshaus', 'contact', e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vereinbarungen & Notizen:</label>
                <textarea
                  rows="2"
                  value={data.abschiedshaus.notes}
                  onChange={(e) => handleTextChange('abschiedshaus', 'notes', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
