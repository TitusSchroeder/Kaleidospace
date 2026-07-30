import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lock, Unlock, ShieldCheck, HeartHandshake, Key, Eye, UserPlus, Trash2, CheckCircle2 } from 'lucide-react';

const INITIAL_KREIS_MEMBERS = [
  {
    id: 'k1',
    name: 'Clara Schröder',
    role: 'Tochter / Familie',
    email: 'clara@schroeder-familie.de',
    accessLevel: 'Freigabe nach Zeitkapsel-Datum (2028)',
    status: 'Aktiv',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'k2',
    name: 'Abschiedsbegleiter Dr. Marcus Weber',
    role: 'Treuhand-Bote (Abschiedshaus Lichtblick)',
    email: 'weber@abschiedshaus-lichtblick.de',
    accessLevel: 'Treuhand-Schlüssel für Lebensabschied & Zeitkapseln',
    status: 'Zertifiziert',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'k3',
    name: 'Jonas Schröder',
    role: 'Sohn / Vertrauensperson',
    email: 'jonas@schroeder-familie.de',
    accessLevel: 'Leserecht für freigegebene Erinnerungen',
    status: 'Aktiv',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
];

export const MeinKreis = ({ darkMode = false }) => {
  const [members, setMembers] = useState(INITIAL_KREIS_MEMBERS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Familie');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setMembers([
      ...members,
      {
        id: `k-${Date.now()}`,
        name: name.trim(),
        role: role,
        email: email.trim(),
        accessLevel: 'Granulare Freigabe',
        status: 'Eingeladen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
    ]);

    setName('');
    setEmail('');
    setIsAdding(false);
  };

  const handleRemoveMember = (id) => {
    if (window.confirm('Möchten Sie diese Person aus Ihrem Kreis entfernen?')) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Header */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 rounded-2xl">
              <Users className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-3 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                Ebene 3 • Privacy & Governance
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Mein Kreis (Sharing & Treuhand)
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-indigo-400 dark:text-slate-950" />
            <span>Person einladen</span>
          </button>
        </div>
      </div>

      {/* ADD MEMBER FORM */}
      {isAdding && (
        <form onSubmit={handleAddMember} className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-indigo-500/30">
          <h4 className="font-serif font-bold text-sm text-indigo-300">Neue Vertrauensperson einladen</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="Familie">Familie</option>
              <option value="Vertrauensperson">Vertrauensperson</option>
              <option value="Abschiedsbegleiter">Abschiedsbegleiter</option>
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
              className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-slate-950 font-bold rounded-xl text-xs"
            >
              Einladung senden
            </button>
          </div>
        </form>
      )}

      {/* MEMBERS LIST */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>Freigegebene Vertrauenspersonen ({members.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
                darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {member.name}
                    </h4>
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 block">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>STATUS:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{member.status}</span>
                  </div>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-serif leading-relaxed block">
                    {member.accessLevel}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-[10px] font-mono text-slate-400 line-clamp-1">{member.email}</span>
                <button
                  onClick={() => handleRemoveMember(member.id)}
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
