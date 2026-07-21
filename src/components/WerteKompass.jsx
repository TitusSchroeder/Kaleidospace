import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Sparkles, Plus, Trash2, Heart, ShieldCheck, Bookmark, CheckCircle2 } from 'lucide-react';

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
    <section className="w-full my-6 flex flex-col items-center select-none">
      <div className="w-full max-w-5xl mx-auto glass-card rounded-3xl p-6 lg:p-10 border border-slate-200/90 shadow-xl bg-white text-slate-900 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shadow-xs">
              <Scroll className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                Ethik & Lebensweisheiten
              </span>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Der Werte-Kompass („Die Werteschrift“)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {werte.length > 0 && (
              <button
                onClick={handleCopyDocument}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-200"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-amber-600" />}
                <span>{copied ? 'Kopiert!' : 'Werteschrift kopieren'}</span>
              </button>
            )}

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>{isCreating ? 'Schließen' : 'Neuen Wert verfassen'}</span>
            </button>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3 text-slate-800 text-xs font-serif leading-relaxed">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            Vererben Sie nicht nur Sachwerte, sondern das, was Ihr Leben im Inneren zusammengehalten hat. 
            Die <strong>Werteschrift</strong> dient Ihren Hinterbliebenen und nachfolgenden Generationen als Orientierung und Lebenskompass.
          </p>
        </div>

        {/* CREATION CREATOR PANEL */}
        <AnimatePresence>
          {isCreating && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-2xl border border-amber-500/30 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Geführte Selbstreflexion
                </span>
                <span className="text-[10px] text-slate-400">Schrittweise zur persönlichen Werteschrift</span>
              </div>

              {/* Prompt Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Wählen Sie einen Reflexions-Impuls:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        className={`p-3 rounded-2xl text-left text-xs transition-all border ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                            : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-mono tracking-wider opacity-75 mb-0.5">
                          {prompt.category}
                        </span>
                        <span>{prompt.question}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Answer Input */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Ihre Gedanken & Lebensweisheit:
                </label>
                <textarea
                  rows="4"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Schreiben Sie in Ihren eigenen Worten..."
                  className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl text-white text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  In der Werteschrift verankern
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* VALUES CARDS GRID ("DIE WERTESCHRIFT") */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Ihre Werteschrift ({werte.length} Einträge)</span>
            </h3>
          </div>

          {werte.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {werte.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-6 border border-amber-200/80 bg-white/95 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.createdAt}</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-slate-900 leading-snug">
                      „{item.question}“
                    </h4>

                    <p className="text-xs text-slate-700 font-serif leading-relaxed italic bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      {item.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onDeleteWerte(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Entfernen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs italic">
              Noch keine Lebenswerte verfasst. Klicken Sie oben auf „Neuen Wert verfassen“.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
