import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Users, Lock, ShieldCheck, Plus, ChevronRight, ArrowLeft, Star, Sparkles, Building2, Trash2 } from 'lucide-react';
import { PhaseSchatullen } from '../PhaseSchatullen';

export const ExperienceSpace = ({ memories = [], phases = [], simulatedDate, onDeleteMemory, onOpenCreator, onGoHome }) => {
  const [subView, setSubView] = useState('overview');

  const [friendsList, setFriendsList] = useState([
    {
      id: 'f1',
      name: 'Clara Schröder',
      role: 'Tochter',
      thingsToSay: 'Ich bin stolz auf deinen Mut beim Studium.',
      questionToAsk: 'Wie geht es dir wirklich mit dem Umzug?',
      inspiringTrait: 'Bedingungslose Lebensfreude & Neugier',
      isRoleModel: true,
      circle: 'Familien-Circle',
    },
    {
      id: 'f2',
      name: 'Jonas Schröder',
      role: 'Sohn',
      thingsToSay: 'Danke für deine Ruhe in schweren Tagen.',
      questionToAsk: 'Wann machen wir unsere nächste Bergtour?',
      inspiringTrait: 'Gelassenheit & tiefes Zuhören',
      isRoleModel: true,
      circle: 'Engste Vertraute',
    },
  ]);

  return (
    <div className="w-full space-y-4 select-none pb-12">
      
      {/* SPACE HEADER WITH HOME BACK BUTTON */}
      <div className="p-4 bg-red-600 text-white rounded-3xl border-2 border-red-700 shadow-md">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1 text-xs font-bold bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-xl mb-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white text-red-600 rounded-2xl shadow-xs">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-700 px-2 py-0.5 rounded-full">
              Experience Space
            </span>
            <h2 className="text-xl font-serif font-bold">Experience Space</h2>
            <p className="text-xs text-red-100 font-serif">
              Leben / Wertvolle Momente bewahren • Preserving precious moments
            </p>
          </div>
        </div>
      </div>

      {/* OVERVIEW SUB-MODULE CARDS */}
      {subView === 'overview' && (
        <div className="space-y-2.5">
          
          {/* MODULE 1: MOMENTE & ERINNERUNGEN */}
          <div
            onClick={() => setSubView('moments')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Momente und Erinnerungen</h3>
                <p className="text-[11px] text-slate-500 font-serif">5 Schatullen der Lebensphasen</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 2: BEVORSTEHENDE EREIGNISSE */}
          <div
            onClick={() => setSubView('events')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Bevorstehende Ereignisse</h3>
                <p className="text-[11px] text-slate-500 font-serif">Jahrestage, Feiern & Meilensteine</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 3: FAMILIE UND FREUNDE */}
          <div
            onClick={() => setSubView('family')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Familie und Freunde</h3>
                <p className="text-[11px] text-slate-500 font-serif">Notizen, Fragen, Vorbilder & Circles</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 4: PRIVATER BEREICH */}
          <div
            onClick={() => setSubView('private')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Privater Bereich (Tresor & Kapsel)</h3>
                <p className="text-[11px] text-slate-500 font-serif">Private Schatulle & Zeitkapseln</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* MODULE 5: PARTNERANGEBOTE */}
          <div
            onClick={() => setSubView('partner')}
            className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-red-500 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-slate-900">Kuratierte Partnerangebote</h3>
                <p className="text-[11px] text-slate-500 font-serif">Erinnerungsarchive & Fotobücher</p>
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
            <span>Zurück zur Übersicht</span>
          </button>

          {subView === 'moments' && (
            <PhaseSchatullen
              phases={phases}
              memories={memories}
              simulatedDate={simulatedDate}
              onDeleteMemory={onDeleteMemory}
              onOpenCreator={onOpenCreator}
            />
          )}

          {subView === 'events' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <span>Bevorstehende Ereignisse & Jahrestage</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-slate-900">Sommer am Wörthersee (Jahrestag)</span>
                    <span className="text-[10px] text-slate-500">12. August • Familienerinnerung</span>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">in 13 Tagen</span>
                </div>
              </div>
            </div>
          )}

          {subView === 'family' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Familie und Freunde</span>
              </h3>

              <div className="space-y-3">
                {friendsList.map((person) => (
                  <div key={person.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{person.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                          {person.role}
                        </span>
                      </div>
                      {person.isRoleModel && (
                        <span className="flex items-center gap-1 text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                          <Star className="w-3 h-3 text-amber-600" />
                          <span>Vorbild</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-slate-700 font-serif">
                      <p><strong>Dinge, die ich sagen möchte:</strong> „{person.thingsToSay}“</p>
                      <p><strong>Frage, die ich stellen möchte:</strong> „{person.questionToAsk}“</p>
                      <p><strong>Inspirierende Eigenschaft:</strong> {person.inspiringTrait}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subView === 'private' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                <span>Privater Bereich (Tresor & Zeitkapsel)</span>
              </h3>
              <p className="text-xs text-slate-600 font-serif">
                Hier hinterlegte Zeitkapseln werden erst zu einem festgelegten Zeitpunkt für Ihre Familie freigeschaltet.
              </p>
              <button
                onClick={onOpenCreator}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Neue Zeitkapsel anlegen
              </button>
            </div>
          )}

          {subView === 'partner' && (
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Partnerangebote für den Experience Space</span>
              </h3>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs space-y-1">
                <span className="font-bold block text-slate-900">Memoria Digitalarchiv</span>
                <span className="text-slate-600 font-serif">Professionelle Digitalisierung alter Familienfotos und Tonbänder.</span>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
