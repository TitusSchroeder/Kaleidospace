import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X, Send, Compass, ShieldCheck, Heart } from 'lucide-react';

export const LebensbegleiterWidget = ({ darkMode = false, onOpenCreator, onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Guten Tag. Ich bin Ihr Lebensbegleiter in Kaleido.Space. Gibt es eine Geschichte, einen Wert oder ein Vorsorgedokument, bei dem ich Sie heute behutsam begleiten darf?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Vielen Dank für Ihre Gedanken. Ich habe diesen Impuls verstanden. Möchten Sie diesen Eintrag direkt in Ihrer Werteschrift sichern oder als Zeitkapsel an Ihren Kreis übergeben?',
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER AT SCREEN EDGE */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-2xl border border-emerald-400/30 font-bold text-xs cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 dark:text-slate-950 animate-pulse" />
          <span className="hidden sm:inline">Lebensbegleiter (KI)</span>
        </motion.button>
      </div>

      {/* FLOATING ASSISTANT DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-20 right-6 z-50 w-full max-w-sm sm:max-w-md rounded-3xl p-5 shadow-2xl border backdrop-blur-md flex flex-col justify-between h-[480px] ${
              darkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs">Der Lebensbegleiter</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Ebene 5 • Sensibler KI-Navigator</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-xs font-serif leading-relaxed">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white ml-auto text-right'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Quick Action Shortcuts */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-200/40 text-[10px] font-bold">
              <button
                onClick={onOpenCreator}
                className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 flex-shrink-0"
              >
                + Erinnerung verfassen
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('compass')}
                className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800 flex-shrink-0"
              >
                Reflexion starten
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-slate-200/40">
              <input
                type="text"
                placeholder="Stellen Sie eine Frage oder teilen Sie Gedanken..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl transition-all flex-shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
