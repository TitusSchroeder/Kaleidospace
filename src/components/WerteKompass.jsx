import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Sparkles, Plus, Trash2, ShieldCheck, Bookmark, CheckCircle2 } from 'lucide-react';

const REFLECTION_PROMPTS = [
  {
    category: 'Lebenshaltung',
    question: 'Welcher Grundsatz hat mich in schweren Zeiten getragen?',
  },
  {
    category: 'Ratschlag an Nachkommen',
    question: 'Welchen Ratschlag gebe ich der nächsten Generation mit?',
  },
  {
    category: 'Dankbarkeit',
    question: 'Wofür bin ich im Rückblick am tiefsten dankbar?',
  },
  {
    category: 'Gemeinschaft & Familie',
    question: 'Welchen Wert soll unsere Familie in Zukunft weiterleben?',
  },
];

export const WerteKompass = ({ werte = [], onAddWerte, onDeleteWerte }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(REFLECTION_PROMPTS[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const questionText = customQuestion.trim() || selectedPrompt.question;

    onAddWerte({
      category: selectedPrompt.category,
      question: questionText,
      answer: answer.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    });

    setAnswer('');
    setCustomQuestion('');
    setIsCreating(false);
  };

  const handleCopyDocument = () => {
    const fullText = werte
      .map((w) => `--- ${w.category} ---\nFrage: ${w.question}\nAntwort: ${w.answer}\n`)
      .join('\n');
    navigator.clipboard.writeText(`DIE WERTESCHRIFT (Kaleidospace)\n\n${fullText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full my-4 flex flex-col items-center select-none">
      <div className="w-full max-w-md mx-auto rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-md bg-white text-slate-900 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-start justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Die Werteschrift
              </span>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Der Werte-Kompass
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            {werte.length > 0 && (
              <button
                onClick={handleCopyDocument}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-amber-600" />}
                <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
              </button>
            )}

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>{isCreating ? 'Schließen' : 'Neuer Wert'}</span>
            </button>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-slate-800 text-xs font-serif leading-relaxed">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            Vererben Sie nicht nur Sachwerte. Die <strong>Werteschrift</strong> dient Nachkommen als lebenslanger Orientierungs-Kompass.
          </p>
        </div>

        {/* CREATION CREATOR PANEL */}
        {isCreating && (
          <form
            onSubmit={handleSubmit}
            className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-xl border border-amber-500/30 text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-amber-400">Selbstreflexion</span>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">Reflexions-Impuls:</label>
              <div className="grid grid-cols-1 gap-1.5">
                {REFLECTION_PROMPTS.map((prompt, idx) => {
                  const isSelected = selectedPrompt.category === prompt.category;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPrompt(prompt);
                        setCustomQuestion('');
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="block text-[9px] uppercase font-mono opacity-75">{prompt.category}</span>
                      <span>{prompt.question}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="block font-semibold text-slate-300">Ihre Gedanken:</label>
              <textarea
                rows="3"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Schreiben Sie Ihre Werte nieder..."
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-serif leading-relaxed"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-slate-400"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-slate-950 bg-amber-400 font-bold rounded-xl"
              >
                Speichern
              </button>
            </div>
          </form>
        )}

        {/* VALUES CARDS STACKED VERTICALLY */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Ihre Werteschrift ({werte.length})</span>
          </h3>

          {werte.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {werte.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-4 border border-amber-200 bg-amber-50/30 shadow-xs space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{item.createdAt}</span>
                  </div>

                  <h4 className="font-serif font-bold text-xs text-slate-900">
                    „{item.question}“
                  </h4>

                  <p className="text-xs text-slate-700 font-serif leading-relaxed italic bg-white p-3 rounded-xl border border-slate-100">
                    {item.answer}
                  </p>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => onDeleteWerte(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Löschen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs italic">
              Noch keine Lebenswerte verfasst.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
