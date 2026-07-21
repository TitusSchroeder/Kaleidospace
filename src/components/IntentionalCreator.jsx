import React, { useState } from 'react';
import { Sparkles, Lock, Unlock, Calendar, Users, ShieldCheck, Image, Shuffle, Send, HeartHandshake } from 'lucide-react';
import { UNSPASH_PRESETS } from '../data/mockData';

export const IntentionalCreator = ({ isOpen = true, onClose, onSave, onSaveMemory, phases = [] }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [phaseId, setPhaseId] = useState(phases[0]?.id || 'phase-1');
  const [imageUrl, setImageUrl] = useState(UNSPASH_PRESETS[0].url);
  const [isTimeLocked, setIsTimeLocked] = useState(false);
  const [unlockDate, setUnlockDate] = useState('2028-12-24');
  const [audienceScope, setAudienceScope] = useState('family');
  const [recipientsText, setRecipientsText] = useState('familie@kaleido.org');
  const [treuhandBote, setTreuhandBote] = useState('Abschiedsbegleiter Dr. Marcus Weber (Abschiedshaus Lichtblick)');

  if (isOpen === false) return null;

  const handleRandomizeImage = () => {
    const randomIndex = Math.floor(Math.random() * UNSPASH_PRESETS.length);
    setImageUrl(UNSPASH_PRESETS[randomIndex].url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !story.trim()) return;

    const recipients = recipientsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const memoryData = {
      title: title.trim(),
      story: story.trim(),
      phaseId,
      imageUrl: imageUrl.trim() || UNSPASH_PRESETS[0].url,
      createdAt: new Date().toISOString().slice(0, 10),
      isTimeLocked,
      unlockDate: isTimeLocked ? unlockDate : undefined,
      audienceScope,
      recipients,
      treuhandBote: isTimeLocked ? treuhandBote : null,
    };

    if (onSave) {
      onSave(memoryData);
    } else if (onSaveMemory) {
      onSaveMemory(memoryData);
    }

    // Reset Form
    setTitle('');
    setStory('');
    setIsTimeLocked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 my-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100/80 rounded-2xl text-emerald-700 shadow-xs">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Der Intentionale Ersteller
              </span>
              <h2 className="font-serif font-bold text-2xl text-slate-900">Was soll von heute bleiben?</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Title & Story */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Titel der Erinnerung
              </label>
              <input
                type="text"
                placeholder="z.B. Mein Brief an die Zukunft, Gedanken zum 50. Geburtstag, Unser Sommer in Schweden..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Erinnerungstext / Geschichte / Lebensweisheit
              </label>
              <textarea
                rows="4"
                placeholder="Schreiben Sie ohne Eile. Was möchten Sie festhalten? Welche Werte oder Anekdoten sollen überdauern?"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Phase & Image Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Life Phase Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Zuordnung im Lebensloop
              </label>
              <select
                value={phaseId}
                onChange={(e) => setPhaseId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {phases.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL & Randomizer */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Visualisierung / Bild
                </label>
                <button
                  type="button"
                  onClick={handleRandomizeImage}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Zufälliges Bild</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Preset Image Suggestions */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500">Stimmungsvolle Vorlagen:</span>
            <div className="flex flex-wrap gap-2">
              {UNSPASH_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-xl border transition-all ${
                    imageUrl === preset.url
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* TIME & TRUST GATE CONTROLLER (Core Logic) */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  {isTimeLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Time & Trust Gate Controller</h4>
                  <p className="text-xs text-slate-400">Freigabe-Logik & Zeitkapsel-Steuerung</p>
                </div>
              </div>

              {/* Visibility Toggle Switch */}
              <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsTimeLocked(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    !isTimeLocked ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Sofort sichtbar
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimeLocked(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isTimeLocked ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Zeitkapsel (Time-Lock)
                </button>
              </div>
            </div>

            {/* Time-Lock Fields (If Enabled) */}
            {isTimeLocked && (
              <div className="space-y-4 pt-3 border-t border-slate-800 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Unlock Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      Freischalt-Datum in der Zukunft
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-xl border border-slate-700">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <input
                        type="date"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        className="bg-transparent text-white text-xs font-mono focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Audience Scope */}
                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      Empfänger-Kreis (Audience Scope)
                    </label>
                    <select
                      value={audienceScope}
                      onChange={(e) => setAudienceScope(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-medium focus:outline-none"
                    >
                      <option value="private">Für mich privat (Eigenes Tagebuch)</option>
                      <option value="family">Für meine Familie (Trust-Group)</option>
                      <option value="contacts">Spezifische Kontakte (E-Mail)</option>
                    </select>
                  </div>
                </div>

                {/* Specific Recipients input if contacts selected */}
                {audienceScope === 'contacts' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Empfänger-E-Mails (kommagetrennt)
                    </label>
                    <input
                      type="text"
                      placeholder="maria@familie.de, jonas@familie.de"
                      value={recipientsText}
                      onChange={(e) => setRecipientsText(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-xs rounded-xl focus:outline-none"
                    />
                  </div>
                )}

                {/* Treuhand-Bote (Trustee Selector) */}
                <div>
                  <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Zugeordneter Abschiedsbegleiter / Treuhand-Bote</span>
                  </label>
                  <select
                    value={treuhandBote}
                    onChange={(e) => setTreuhandBote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-emerald-200 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="Abschiedsbegleiter Dr. Marcus Weber (Abschiedshaus Lichtblick)">
                      Abschiedsbegleiter Dr. Marcus Weber (Abschiedshaus Lichtblick)
                    </option>
                    <option value="Abschiedsbegleiterin Elena Lindner (Abschiedshaus Freudenberg)">
                      Abschiedsbegleiterin Elena Lindner (Abschiedshaus Freudenberg)
                    </option>
                    <option value="Digitaler Treuhand-Tresor Kaleido (Automatische Freigabe)">
                      Digitaler Treuhand-Tresor Kaleido (Automatische Freigabe)
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Form Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-amber-400 hover:from-emerald-300 hover:to-amber-300 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Erinnerung für die Ewigkeit verwahren</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
