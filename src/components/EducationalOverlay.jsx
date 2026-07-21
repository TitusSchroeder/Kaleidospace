import React, { useState } from 'react';
import { BookOpen, MapPin, HeartHandshake, Lock, Sparkles, Flame, Shield, Globe, Compass, ArrowRight } from 'lucide-react';
import { EDUCATIONAL_CONTENT, TERMINOLOGY_RULES } from '../data/mockData';

export const EducationalOverlay = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('philosophy');
  const [candlesIgnited, setCandlesIgnited] = useState(142);
  const [hasIgnitedUserCandle, setHasIgnitedUserCandle] = useState(false);

  if (!isOpen) return null;

  const handleIgniteCandle = () => {
    if (!hasIgnitedUserCandle) {
      setCandlesIgnited((c) => c + 1);
      setHasIgnitedUserCandle(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-4xl w-full shadow-2xl border border-emerald-100 my-8 space-y-6 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Kaleidospace Vision & Dokumentation
              </span>
              <h2 className="font-serif font-bold text-2xl text-slate-900">Über Kaleido & Infinity Culture</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all font-bold text-base"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3 flex-shrink-0">
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'philosophy'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Philosophie & Vision</span>
          </button>

          <button
            onClick={() => setActiveTab('wohnorat')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wohnorat'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Raum "Letzter Wohnort"</span>
          </button>

          <button
            onClick={() => setActiveTab('wünsche')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wünsche'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Typologie der Wünsche</span>
          </button>

          <button
            onClick={() => setActiveTab('terminology')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'terminology'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Würdevoller Sprachcode</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1 py-2">
          {/* TAB 1: Philosophy */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl space-y-3 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="w-48 h-48 text-emerald-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Anti-Social Media Prinzip
                </span>
                <h3 className="font-serif font-bold text-2xl text-emerald-100">
                  {EDUCATIONAL_CONTENT.philosophy.title}
                </h3>
                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  {EDUCATIONAL_CONTENT.philosophy.body}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EDUCATIONAL_CONTENT.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Letzter Wohnort */}
          {activeTab === 'wohnorat' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Der digitale Raum "Letzter Wohnort"
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Statt isolierter Friedhöfe schafft Kaleidospace einen global erreichbaren, liebevoll gestalteten Zufluchtsort. Angehörige weltweit können virtuell zusammenkommen, Erinnerungslichter entzünden und Anekdoten hinterlassen.
                </p>
              </div>

              {/* Simulated Interactive Map Preview */}
              <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-inner">
                {/* Background Map Graphic Mockup */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Map Marker Pin */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-3 bg-emerald-500 rounded-2xl text-slate-950 font-bold shadow-lg shadow-emerald-500/40 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif font-bold text-base">Erinnerungshain Wörthersee</h4>
                    <p className="text-xs text-emerald-400 font-mono">Geokoordinaten: 46.6238° N, 14.1517° E</p>
                  </div>
                </div>

                {/* Interactive Candle Ignition Box */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                      <Flame className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {candlesIgnited} virtuelle Kerzen entzündet
                      </span>
                      <span className="text-[11px] text-slate-400">Angehörige aus 4 Ländern sind im Gedenken vereint</span>
                    </div>
                  </div>

                  <button
                    onClick={handleIgniteCandle}
                    disabled={hasIgnitedUserCandle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                      hasIgnitedUserCandle
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 active:scale-95'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>{hasIgnitedUserCandle ? 'Ihre Kerze leuchtet' : 'Ein Gedenklicht entzünden'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Typologie der Wünsche */}
          {activeTab === 'wünsche' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">Typologie der Wünsche</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bestimmen Sie selbst über die Gestaltung Ihres Lebensabschieds. Nehmen Sie Hinterbliebenen schwere Entscheidungen ab und hinterlassen Sie klare, liebevolle Orientierung.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                    Wunsch 01
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-base">Musik & Atmosphäre der Abschiedsfeier</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "Kein getragenes Orgelspiel, sondern Jazz von Miles Davis und helle Farben. Ich möchte, dass gelacht und an schöne Ausflüge erinnert wird."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-md">
                    Wunsch 02
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-base">Lebenszeichen & Erinnerungsfläche</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "Ein schlichter Holzaufsteller mit QR-Code zum digitalen Lebenskreis statt eines wuchtigen Steins."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Terminology */}
          {activeTab === 'terminology' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-slate-900">Sprachcode & Kulturwandel</h3>
                <p className="text-xs text-slate-600">
                  Die Wörter, die wir wählen, prägen unsere Wahrnehmung von Endlichkeit und Trost.
                </p>
              </div>

              <div className="space-y-3">
                {TERMINOLOGY_RULES.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="line-through text-slate-400 text-xs font-mono">{rule.old}</span>
                      <h4 className="text-emerald-800 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                        <span>{rule.replacement}</span>
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 italic max-w-xs">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-semibold shadow-md transition-all"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
