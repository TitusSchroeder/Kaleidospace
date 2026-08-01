import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, FileText, Download, Plus, Trash2, CheckCircle2 } from 'lucide-react';

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

export const SecurityVault = () => {
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
    <div className="w-full space-y-4 select-none">
      
      {/* Header Banner with Safe Status Indicator */}
      <div className="p-4 bg-white rounded-3xl border-2 border-slate-200 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Security Vault
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Datentresor
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-emerald-800 text-[10px] font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>AES-256 GESICHERT</span>
          </div>
        </div>
      </div>

      {/* ADD DOCUMENT FORM */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-xl border border-emerald-500/30">
          <h4 className="font-serif font-bold text-xs text-emerald-300">Neues Tresor-Dokument hinterlegen</h4>
          <div className="space-y-2 text-xs">
            <input
              type="text"
              placeholder="Bezeichnung (z.B. Patientenverfügung, Erbschaft)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="Vorsorgedokumente">Vorsorgedokumente</option>
              <option value="Rechtliche Dokumente">Rechtliche Dokumente</option>
              <option value="Zugangsdaten">Zugangsdaten</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-slate-400"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              Verschlüsseln & Speichern
            </button>
          </div>
        </form>
      )}

      {/* VAULT ITEMS LIST — STRICTLY SINGLE COLUMN FOR MOBILE! */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Geschützte Dokumente ({items.length})</span>
          </h4>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dokument hinzufügen</span>
          </button>
        </div>

        {/* SINGLE COLUMN STACK FOR MOBILE ONLY */}
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.fileSize}</span>
                </div>

                <h5 className="font-serif font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h5>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>SCHUTZ:</span>
                    <span className="font-bold text-emerald-600">{item.securityStatus}</span>
                  </div>
                  <span className="text-[11px] text-slate-700 font-serif block">
                    Zuweisung: {item.trustee}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[10px] font-mono text-slate-400">Aktualisiert: {item.updatedAt}</span>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
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
