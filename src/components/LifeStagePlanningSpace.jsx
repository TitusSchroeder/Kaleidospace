import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, ShieldCheck, FileText, HeartHandshake, Sparkles, BookOpen, Clock, ChevronRight } from 'lucide-react';

const LIFE_STAGES_PLANNING = [
  {
    id: 'stage-1',
    title: 'Familiengründung & Absicherung',
    ageRange: '30–50 Jahre',
    color: '#f59e0b',
    description: 'Vorsorge für Kinder, digitale Zeitkapseln und gegenseitige Absicherung im Alltag.',
    tasks: [
      { id: 't1', title: 'Zeitkapsel zum 18. Geburtstag der Kinder verfassen', completed: true },
      { id: 't2', title: 'Notfall-Kontakte & Vollmachten in „Mein Kreis“ eintragen', completed: true },
      { id: 't3', title: 'Familien-Werteschrift im Lebenskompass sichern', completed: false },
    ],
    expertTip: 'Erstellen Sie frühzeitig digitale Zeitkapseln – so bleiben Ihre Worte auch nach vielen Jahren unvergessen.',
  },
  {
    id: 'stage-2',
    title: 'Reifezeit, Ernte & Vorsorge',
    ageRange: '50–70 Jahre',
    color: '#8b5cf6',
    description: 'Strukturierte Regelung aller rechtlichen, medizinischen und finanziellen Vorsorgedokumente.',
    tasks: [
      { id: 't4', title: 'Patientenverfügung im Datentresor hinterlegen', completed: true },
      { id: 't5', title: 'Vorsorgevollmacht & Betreuungsverfügung erstellen', completed: false },
      { id: 't6', title: 'Digitalen Nachlass-Verwalter in „Mein Kreis“ benennen', completed: false },
    ],
    expertTip: 'Prüfen Sie alle 2 Jahre Ihre Dokumente im Datentresor auf Aktualität.',
  },
  {
    id: 'stage-3',
    title: 'Vermächtnis & Lebensabschied',
    ageRange: '70+ Jahre',
    color: '#ec4899',
    description: 'Würdevolle Vorbereitung des Lebensabschieds zur liebevollen Entlastung der Angehörigen.',
    tasks: [
      { id: 't7', title: 'Wünsche für die Abschiedsfeier in „Das Letzte Kapitel“ sichern', completed: true },
      { id: 't8', title: 'Zertifizierten Abschiedsbegleiter (Abschiedshaus) zuweisen', completed: true },
      { id: 't9', title: 'Persönliche Abschiedsbriefe als zeitversetzte Kapsel hinterlegen', completed: false },
    ],
    expertTip: 'Ein vertrauter Abschiedsbegleiter garantiert die würdevolle Umsetzung Ihrer Vorstellungen.',
  },
];

export const LifeStagePlanningSpace = ({ darkMode = false, onNavigateTab }) => {
  const [selectedStageId, setSelectedStageId] = useState(LIFE_STAGES_PLANNING[1].id);
  const [tasksState, setTasksState] = useState(LIFE_STAGES_PLANNING);

  const activeStage = tasksState.find((s) => s.id === selectedStageId) || tasksState[0];

  const handleToggleTask = (stageId, taskId) => {
    setTasksState((prev) =>
      prev.map((stage) => {
        if (stage.id !== stageId) return stage;
        return {
          ...stage,
          tasks: stage.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Header Banner */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 rounded-2xl">
              <Target className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-3 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                Ebene 2 • Raum 3
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Life Stage Planning (Mein Morgen)
              </h2>
            </div>
          </div>

          <span className="text-xs font-serif text-slate-500 dark:text-slate-400 max-w-xs text-right hidden sm:block">
            Situationsbezogene Begleitung für konkrete Lebensphasen & Vorsorge.
          </span>
        </div>
      </div>

      {/* STAGE SELECTOR TABS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasksState.map((stage) => {
          const isSelected = stage.id === selectedStageId;
          const completedCount = stage.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`p-5 rounded-3xl border shadow-md transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-purple-500 ring-2 ring-purple-500/20 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                  {stage.ageRange}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                {stage.title}
              </h4>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
                <span>Aufgaben:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {completedCount}/{stage.tasks.length} erledigt
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE STAGE DETAIL CONTAINER */}
      <div className={`p-6 lg:p-10 rounded-3xl border shadow-xl space-y-6 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/40 gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-3 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
              Lebensphase: {activeStage.ageRange}
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              {activeStage.title}
            </h3>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('vault')}
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Zum Datentresor</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
          {activeStage.description}
        </p>

        {/* TASKS CHECKLIST */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Strukturierte Vorsorge-Checkliste:
          </h4>

          <div className="space-y-2">
            {activeStage.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(activeStage.id, task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  task.completed
                    ? 'bg-purple-50/60 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-slate-700 dark:text-slate-300'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      task.completed ? 'text-purple-600 dark:text-purple-400' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                  <span className={`text-xs font-serif ${task.completed ? 'line-through opacity-75' : 'font-bold'}`}>
                    {task.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2.5 py-0.5 rounded-full">
                  {task.completed ? 'Erledigt' : 'Ausstehend'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERT TIP BANNER */}
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs font-serif leading-relaxed">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="font-bold block">Experten-Rat:</span>
            <span>{activeStage.expertTip}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
