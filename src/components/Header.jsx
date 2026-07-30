import React from 'react';
import { Plus, Compass, Scroll, Feather, LayoutDashboard, Users, ShieldCheck, Building2, Sun, Moon } from 'lucide-react';

export const Header = ({
  activeView = 'cockpit',
  onSelectView,
  onOpenCreator,
  darkMode = false,
  onToggleDarkMode,
}) => {
  const navTabs = [
    { id: 'cockpit', label: 'Cockpit', icon: LayoutDashboard, level: 'Ebene 1' },
    { id: 'loop', label: 'Life Loop', icon: Compass, level: 'Raum 1' },
    { id: 'compass', label: 'Life Compass', icon: Scroll, level: 'Raum 2' },
    { id: 'stage-planning', label: 'Life Stage Planning', icon: Feather, level: 'Raum 3' },
    { id: 'kreis', label: 'Mein Kreis', icon: Users, level: 'Ebene 3' },
    { id: 'vault', label: 'Datentresor', icon: ShieldCheck, level: 'Ebene 4' },
    { id: 'marktplatz', label: 'Marktplatz', icon: Building2, level: 'Ebene 6' },
  ];

  return (
    <header className={`w-full py-4 px-4 lg:px-8 border-b transition-colors duration-300 sticky top-0 z-40 backdrop-blur-md ${
      darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/80 border-slate-200/60 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center justify-between w-full xl:w-auto">
          <div className="space-y-0.5 cursor-pointer" onClick={() => onSelectView('cockpit')}>
            <h1 className="text-2xl font-serif font-bold tracking-tight flex items-center gap-2">
              <span>Kaleido.Space</span>
              <span className="text-[10px] font-sans font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Life OS v0.3
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-serif italic">
              Personal Life Operating System
            </p>
          </div>

          {/* Mobile Dark Mode Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* 6-Level Navigation Bar */}
        <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 max-w-full text-xs font-bold">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 font-medium'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Actions: Dark Mode & Add Memory */}
        <div className="hidden xl:flex items-center gap-3">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title="Wechsel zwischen Tages-Look und Abend-Modus"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Tages-Look</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Abend-Modus</span>
              </>
            )}
          </button>

          {/* Add Memory Action Button */}
          <button
            onClick={onOpenCreator}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400 dark:text-slate-950" />
            <span>Erinnerung hinzufügen</span>
          </button>
        </div>

      </div>
    </header>
  );
};
