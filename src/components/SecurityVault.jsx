import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, FileText, Download, Plus, Trash2, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';

const INITIAL_VAULT_ITEMS = [
  {
    id: 'v1',
    title: 'Patientenverfügung & Medizinischer Wille',
    category: 'Vorsorgedokumente',
    updatedAt: '2026-05-12',
    securityStatus: 'AES-256 Verschlüsselt',
    trustee: 'Abschiedsbegleiter Dr. Marcus Weber',
    fileSize: '1.2 MB',
  },
  {
    id: 'v2',
    title: 'Vorsorgevollmacht & Betreuungsverfügung',
    category: 'Rechtliche Dokumente',
    updatedAt: '2026-06-20',
    securityStatus: 'AES-256 Verschlüsselt',
    trustee: 'Clara Schröder (Tochter)',
    fileSize: '850 KB',
  },
  {
    id: 'v3',
    title: 'Digitaler Nachlass & Passwort-Tresor',
    category: 'Zugangsdaten',
    updatedAt: '2026-07-15',
    securityStatus: 'Zeitkapsel (Time-Lock 2030)',
    trustee: 'Digitaler Treuhand-Tresor Kaleido',
    fileSize: '420 KB',
  },
];

export const SecurityVault = ({ darkMode = false }) => {
  const [items, setItems] = useState(INITIAL_VAULT_ITEMS);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vorsorgedokumente');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setItems([
      ...items,
      {
        id: `v-${Date.now()}`,
        title: title.trim(),
        category,
        updatedAt: new Date().toISOString().slice(0, 10),
        securityStatus: 'AES-256 Verschlüsselt',
        trustee: 'Abschiedsbegleiter Dr. Marcus Weber',
        fileSize: '1.5 MB',
      },
    ]);

    setTitle('');
    setIsAdding(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Möchten Sie dieses Dokument aus dem Datentresor entfernen?')) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Header Banner with Safe Status Indicator */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-2xl">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Ebene 4 • Security Vault
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Datentresor (Security Vault)
              </h2>
            </div>
          </div>

          {/* SAFE INDICATOR BADGE */}
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>TRESOR GESICHERT (AES-256)</span>
          </div>
        </div>
      </div>

      {/* ADD DOCUMENT FORM */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-emerald-500/30">
          <h4 className="font-serif font-bold text-sm text-emerald-300">Neues Tresor-Dokument verschlüsselt hinterlegen</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              placeholder="Bezeichnung (z.B. Testamentsabschrift, Patientenvorausverfügung)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="Vorsorgedokumente">Vorsorgedokumente</option>
              <option value="Rechtliche Dokumente">Rechtliche Dokumente</option>
              <option value="Zugangsdaten">Zugangsdaten</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs"
            >
              Verschlüsselt speichern
            </button>
          </div>
        </form>
      )}

      {/* VAULT ITEMS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Geschützte Dokumente ({items.length})</span>
          </h3>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400 dark:text-slate-950" />
            <span>Dokument hinzufügen</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
                darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.fileSize}</span>
                </div>

                <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>SCHUTZ:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.securityStatus}</span>
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 font-serif block">
                    Zuweisung: {item.trustee}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-[10px] font-mono text-slate-400">Aktualisiert: {item.updatedAt}</span>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
