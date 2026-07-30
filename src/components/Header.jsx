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
    { id: 'cockpit', label: 'Cockpit', icon: LayoutDashboard },
    { id: 'loop', label: 'Life Loop', icon: Compass },
    { id: 'compass', label: 'Life Compass', icon: Scroll },
    { id: 'stage-planning', label: 'Planning', icon: Feather },
    { id: 'kreis', label: 'Mein Kreis', icon: Users },
    { id: 'vault', label: 'Datentresor', icon: ShieldCheck },
    { id: 'marktplatz', label: 'Marktplatz', icon: Building2 },
  ];

  return (
    <header className={`w-full py-2.5 px-4 lg:px-6 border-b transition-colors duration-300 sticky top-0 z-40 backdrop-blur-md ${
      darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/85 border-slate-200/60 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand identity - Ultra Compact */}
        <div
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          onClick={() => onSelectView('cockpit')}
        >
          <h1 className="text-xl font-serif font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Kaleido.Space</span>
          </h1>
          <span className="hidden sm:inline text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            Life OS
          </span>
        </div>

        {/* 6-Level Navigation Bar - Compact Single Horizontal Bar */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-bold no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0 cursor-pointer text-[11px] ${
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

        {/* Right Compact Actions: Dark Mode & Add Memory */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Wechsel zwischen Tages-Look und Abend-Modus"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Add Memory Action Button */}
          <button
            onClick={onOpenCreator}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400 dark:text-slate-950" />
            <span className="hidden md:inline">Erinnerung hinzufügen</span>
          </button>
        </div>

      </div>
    </header>
  );
};
