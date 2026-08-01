import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, BookOpen, HelpCircle, Calendar, ShieldCheck, FileText, Building2, ChevronRight, ArrowLeft } from 'lucide-react';
import { SecurityVault } from '../SecurityVault';
import { DasLetzteKapitel } from '../DasLetzteKapitel';

export const LifeSpace = ({ letztesKapitel, onUpdateLetztesKapitel }) => {
  const [subView, setSubView] = useState('overview');

  const [guidelines, setGuidelines] = useState([
    { title: 'Leitfaden: Vorsorgevollmacht & Betreuungsverfügung', type: 'Instrument', readTime: '5 Min' },
    { title: 'Leitfragen: Was ist meinen Angehörigen im Ernstfall wichtig?', type: 'Leitfragen', readTime: '8 Min' },
    { title: 'Leitfaden: Digitaler Nachlass & Cloud-Zugänge', type: 'Instrument', readTime: '6 Min' },
  ]);

  return (
    <div className="w-full space-y-4 select-none pb-20">
      
      {/* SPACE HEADER */}
      <div className="p-4 bg-blue-600 text-white rounded-3xl border-2 border-blue-700 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white text-blue-600 rounded-2xl shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-700 px-2.5 py-0.5 rounded-full">
              Space 3
            </span>
            <h2 className="text-xl font-serif font-bold">Life Space</h2>
            <p className="text-xs text-blue-100 font-serif">
              Management & Planung • Getting the essentials straight
            </p>
          </div>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-3">
          
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
                <p className="text-[11px] text-slate-500 font-serif">Informationen & Inspirationen</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Instrumente & Vorsorge-Leitfäden</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Finanzen & Lebensabschied-Vorsorge</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Dokumenten-Safe, Patientenverfügung & Erbschaft</p>
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
                <p className="text-[11px] text-slate-500 font-serif">Abschiedsbegleiter & Notare</p>
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
            className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Life Space</span>
          </button>

          {subView === 'guidelines' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Leitfragen & Leitfäden</h3>
              <div className="space-y-2">
                {guidelines.map((g, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-900">{g.title}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold">{g.readTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subView === 'documents' && (
            <SecurityVault />
          )}

          {subView === 'planning' && (
            <DasLetzteKapitel letztesKapitel={letztesKapitel} onUpdateLetztesKapitel={onUpdateLetztesKapitel} />
          )}
        </div>
      )}

    </div>
  );
};
