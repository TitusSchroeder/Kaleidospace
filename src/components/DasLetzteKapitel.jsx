import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, Music, Heart, Sparkles, Building2, ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react';

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
    <section className="w-full my-4 flex flex-col items-center select-none">
      <div className="w-full max-w-md mx-auto rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-md bg-white text-slate-900 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-start justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-rose-100 text-rose-800 rounded-2xl">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Lebensabschied
              </span>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Das Letzte Kapitel
              </h2>
            </div>
          </div>

          <button
            onClick={handleSaveAll}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-rose-400" />}
            <span>{isSaved ? 'Wünsche gespeichert!' : 'Änderungen sichern'}</span>
          </button>
        </div>

        {/* Intro Guidance */}
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-slate-800 text-xs font-serif leading-relaxed">
          <Sparkles className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <p>
            Halten Sie hier persönliche Vorstellungen für den <strong>Lebensabschied</strong> fest. 
            Diese Informationen schenken Angehörigen Klarheit und werden vertraulich mit Ihrem <strong>Abschiedsbegleiter</strong> geteilt.
          </p>
        </div>

        {/* 4 CORE SECTIONS - STRICTLY VERTICAL STACK FOR MOBILE */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* SECTION 1: MUSIK & LIEDER */}
          <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-sm">
                <Music className="w-4 h-4" />
                <span>1. Musik & Lieblingslieder</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                {data.music.length} Lieder
              </span>
            </div>

            <div className="space-y-2">
              {data.music.map((song, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">{song.title}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{song.artist} — {song.note}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveSong(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSong} className="space-y-2 pt-2 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block text-[11px]">Musikstück hinzufügen:</span>
              <input
                type="text"
                placeholder="Titel (z.B. Clair de Lune)"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <input
                type="text"
                placeholder="Künstler (z.B. Debussy)"
                value={newSongArtist}
                onChange={(e) => setNewSongArtist(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <input
                type="text"
                placeholder="Hinweis (z.B. Zum Einlass)"
                value={newSongNote}
                onChange={(e) => setNewSongNote(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="submit"
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Song hinzufügen</span>
              </button>
            </form>
          </div>

          {/* SECTION 2: STIMMUNG */}
          <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-sm pb-2 border-b border-slate-200">
              <Heart className="w-4 h-4" />
              <span>2. Stimmung & Atmosphäre</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Blumen & Dekoration:</label>
                <input
                  type="text"
                  value={data.atmosphere.flowers}
                  onChange={(e) => handleTextChange('atmosphere', 'flowers', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Farben & Dresscode:</label>
                <input
                  type="text"
                  value={data.atmosphere.dresscode}
                  onChange={(e) => handleTextChange('atmosphere', 'dresscode', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Wünsche zur Stimmung:</label>
                <textarea
                  rows="2"
                  value={data.atmosphere.notes}
                  onChange={(e) => handleTextChange('atmosphere', 'notes', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-serif"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: WORTE & REDE */}
          <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-sm pb-2 border-b border-slate-200">
              <Feather className="w-4 h-4" />
              <span>3. Worte, Zitate & Rede</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Lieblingsgedicht / Leitspruch:</label>
                <textarea
                  rows="2"
                  value={data.words.poem}
                  onChange={(e) => handleTextChange('words', 'poem', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-serif italic"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Hinweise an den Redner:</label>
                <textarea
                  rows="2"
                  value={data.words.speakerNotes}
                  onChange={(e) => handleTextChange('words', 'speakerNotes', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-serif"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: ABSCHIEDSBEGLEITER */}
          <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-sm pb-2 border-b border-slate-200">
              <Building2 className="w-4 h-4" />
              <span>4. Abschiedsbegleiter / Abschiedshaus</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Vertrautes Abschiedshaus:</label>
                <input
                  type="text"
                  value={data.abschiedshaus.name}
                  onChange={(e) => handleTextChange('abschiedshaus', 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Ort / Region:</label>
                <input
                  type="text"
                  value={data.abschiedshaus.location}
                  onChange={(e) => handleTextChange('abschiedshaus', 'location', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-[11px]">Kontakt-E-Mail:</label>
                <input
                  type="email"
                  value={data.abschiedshaus.contact}
                  onChange={(e) => handleTextChange('abschiedshaus', 'contact', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
