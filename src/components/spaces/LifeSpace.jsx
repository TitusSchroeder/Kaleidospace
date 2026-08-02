import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, BookOpen, HelpCircle, Calendar, ShieldCheck, FileText, Building2, ChevronRight, ArrowLeft, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';
import { SecurityVault } from '../SecurityVault';
import { DasLetzteKapitel } from '../DasLetzteKapitel';

export const LifeSpace = ({ letztesKapitel, onUpdateLetztesKapitel, onGoHome }) => {
  const [subView, setSubView] = useState('overview');

  // Interactive Guidelines & Checklists
  const [guidelines, setGuidelines] = useState([
    { id: 'g1', title: 'Patientenverfügung im Datentresor aktualisieren', done: true, category: 'Medizinisch' },
    { id: 'g2', title: 'Vorsorgevollmacht & Betreuungsverfügung unterzeichnen', done: true, category: 'Rechtlich' },
    { id: 'g3', title: 'Digitaler Nachlass: Passwort-Zugänge regeln', done: false, category: 'Digital' },
    { id: 'g4', title: 'Testament beim Notar hinterlegen', done: false, category: 'Erbschaft' },
  ]);

  // Interactive Life Stage Themes Content
  const [lifeThemes, setLifeThemes] = useState([
    {
      id: 't1',
      stage: 'Kindheit & Aufwachsen (0–18 Jahre)',
      title: 'Werte vermitteln & Meilensteine sichern',
      summary: 'Wie Eltern und Großeltern Erinnerungen und Werte von klein auf verankern.',
    },
    {
      id: 't2',
      stage: 'Wilde Jahre & Orientierung (18–30 Jahre)',
      title: 'Selbstfindung, Abenteuer & Berufsstart',
      summary: 'Eigenverantwortung übernehmen, Reisetagebücher führen und erste Zukunftsentscheidungen treffen.',
    },
    {
      id: 't3',
      stage: 'Familiengründung & Reifezeit (30–50 Jahre)',
      title: 'Absicherung & Bau von Zeitkapseln',
      summary: 'Vorsorge treffen, Kinder in das Leben begleiten und die Werteschrift verfassen.',
    },
    {
      id: 't4',
      stage: 'Vermächtnis & Lebensabschied (50+ Jahre)',
      title: 'Würdevolle Lebensabschluss-Planung',
      summary: 'Abschiedswünsche festlegen, Angehörige entlasten und Zeitkapseln vertrauensvoll übergeben.',
    },
  ]);

  // Interactive Financial & Funeral Provision Planner
  const [provisionPlan, setProvisionPlan] = useState({
    bestattungsBudget: 7500,
    sparbuchHinterlegt: true,
    versicherungsPolice: 'Vorsorge-Police Nr. 884-219',
    notarKontakt: 'Kanzlei Dr. Hoffmann (Stuttgart)',
  });

  const handleToggleGuideline = (id) => {
    setGuidelines(guidelines.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  return (
    <div className="w-full space-y-4 select-none pb-12">
      
      {/* SPACE HEADER WITH HOME BACK BUTTON */}
      <div className="p-4 bg-blue-600 text-white rounded-3xl border-2 border-blue-700 shadow-md">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-xl mb-3 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white text-blue-600 rounded-2xl shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold">Life Space</h2>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-2.5">
          
          {/* MODULE 1: LEBENSPHASEN UND THEMEN */}
          <div
            onClick={() => setSubView('themes')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Lebensphasen und Themen</h3>
                <p className="text-[11px] text-slate-500 font-serif">{lifeThemes.length} Themen-Leitfäden</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 2: LEITFRAGEN UND LEITFÄDEN */}
          <div
            onClick={() => setSubView('guidelines')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Leitfragen und Leitfäden</h3>
                <p className="text-[11px] text-slate-500 font-serif">{guidelines.filter(g => g.done).length}/{guidelines.length} Vorsorge-Checklisten erledigt</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 3: LEBENSPLANUNG */}
          <div
            onClick={() => setSubView('planning')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Lebensplanung</h3>
                <p className="text-[11px] text-slate-500 font-serif">Finanzen & Vorsorgebudget</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 4: DOKUMENTE UND VORSORGE */}
          <div
            onClick={() => setSubView('documents')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Dokumente und Vorsorge</h3>
                <p className="text-[11px] text-slate-500 font-serif">Dokumenten-Safe & Erbschaft</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 5: PARTNERANGEBOTE */}
          <div
            onClick={() => setSubView('partner')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Kuratierte Partnerangebote</h3>
                <p className="text-[11px] text-slate-500 font-serif">Notare & Vorsorgeexperten</p>
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

          {/* SUB-VIEW 1: LEBENSPHASEN UND THEMEN */}
          {subView === 'themes' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Lebensphasen & Themen ({lifeThemes.length})</span>
              </h3>

              <div className="space-y-3">
                {lifeThemes.map((theme) => (
                  <div key={theme.id} className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                      {theme.stage}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-slate-900">{theme.title}</h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">{theme.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: LEITFRAGEN & LEITFÄDEN (INTERACTIVE CHECKLIST) */}
          {subView === 'guidelines' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Leitfragen & Vorsorge-Checklisten</h3>
              <div className="space-y-2">
                {guidelines.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => handleToggleGuideline(g.id)}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:border-blue-300"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${g.done ? 'text-emerald-600' : 'text-slate-300'}`} />
                      <span className={g.done ? 'line-through text-slate-400' : 'font-bold text-slate-900'}>{g.title}</span>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md font-bold">{g.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: LEBENSPLANUNG (INTERACTIVE BUDGET & FINANCIAL PROVISION) */}
          {subView === 'planning' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
                <h3 className="font-serif font-bold text-base text-slate-900">Finanzielle Lebensplanung & Vorsorge</h3>
                <div className="space-y-2 font-serif text-slate-700">
                  <p><strong>Geplantes Abschieds-Budget:</strong> {provisionPlan.bestattungsBudget.toLocaleString('de-DE')} €</p>
                  <p><strong>Zweckgebundenes Sparbuch hinterlegt:</strong> {provisionPlan.sparbuchHinterlegt ? 'Ja (Im Datentresor)' : 'Nein'}</p>
                  <p><strong>Versicherungs-Police:</strong> {provisionPlan.versicherungsPolice}</p>
                  <p><strong>Vertrauter Notar:</strong> {provisionPlan.notarKontakt}</p>
                </div>
              </div>

              <DasLetzteKapitel letztesKapitel={letztesKapitel} onUpdateLetztesKapitel={onUpdateLetztesKapitel} />
            </div>
          )}

          {subView === 'documents' && <SecurityVault />}

          {subView === 'partner' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <span>Kanzlei Dr. Hoffmann & Partner</span>
              </h3>
              <p className="text-slate-600 font-serif">Rechtssichere Erstellung von Patientenverfügungen, Vorsorgevollmachten und Testamenten.</p>
              <a href="mailto:vorsorge@hoffmann-recht.de" className="inline-block px-3 py-1 bg-[#10b981] text-white font-bold rounded-lg text-[11px]">Kontakt aufnehmen</a>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
