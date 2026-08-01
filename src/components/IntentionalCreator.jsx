import React, { useState } from 'react';
import { Sparkles, Lock, Unlock, Calendar, Users, ShieldCheck, Image, Shuffle, Send } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-md w-full shadow-2xl border border-emerald-100 my-auto space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Intentionale Erinnerung
              </span>
              <h2 className="font-serif font-bold text-lg text-slate-900 leading-tight">Was soll bleiben?</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Main Title & Story */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Titel der Erinnerung
              </label>
              <input
                type="text"
                placeholder="z.B. Brief an meine Kinder..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gedanken & Geschichte
              </label>
              <textarea
                rows="4"
                placeholder="Schreiben Sie Ihre Gedanken nieder..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          {/* Phase Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lebensphase zuordnen
            </label>
            <select
              value={phaseId}
              onChange={(e) => setPhaseId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-xs focus:outline-none"
            >
              {phases.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.startAge}–{p.endAge} Jahre)
                </option>
              ))}
            </select>
          </div>

          {/* Image Choice */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Titelbild
              </label>
              <button
                type="button"
                onClick={handleRandomizeImage}
                className="text-[10px] text-emerald-700 font-bold flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" />
                <span>Neues Motiv</span>
              </button>
            </div>
            <div className="flex gap-2">
              <img
                src={imageUrl}
                alt="Vorschau"
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              />
              <input
                type="url"
                placeholder="Bild-URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] self-center"
              />
            </div>
          </div>

          {/* Time Lock Toggle */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-900 text-xs">Als Zeitkapsel versiegeln</span>
              </div>
              <input
                type="checkbox"
                checked={isTimeLocked}
                onChange={(e) => setIsTimeLocked(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {isTimeLocked && (
              <div className="space-y-2 pt-2 border-t border-amber-200 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Freigabe-Datum:</label>
                  <input
                    type="date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Treuhand-Bote / Abschiedsbegleiter:</label>
                  <input
                    type="text"
                    value={treuhandBote}
                    onChange={(e) => setTreuhandBote(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-500 font-bold text-xs"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Speichern</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
