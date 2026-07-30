import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, HeartHandshake, Sparkles, Award, ExternalLink, Phone, Mail } from 'lucide-react';

const PARTNER_OFFERS = [
  {
    id: 'p1',
    name: 'Abschiedshaus Lichtblick (Dr. Marcus Weber)',
    category: 'Zertifizierter Abschiedsbegleiter',
    lifeStage: 'Vermächtnis & Lebensabschied',
    description: 'Einfühlsame Begleitung beim Lebensabschied, Organisation würdevoller Abschiedsfeiern und Durchführung von Treuhand-Zeitkapseln.',
    contact: 'kontakt@abschiedshaus-lichtblick.de',
    location: 'Freiburg & Bundesweit',
    certified: true,
    rating: '5.0 ★★★★★',
  },
  {
    id: 'p2',
    name: 'Kanzlei Dr. Hoffmann & Partner',
    category: 'Vorsorge- & Erbrecht',
    lifeStage: 'Reifezeit & Vorsorge',
    description: 'Rechtssichere Erstellung von Patientenverfügungen, Vorsorgevollmachten und Testamenten mit direkter Tresor-Anbindung.',
    contact: 'vorsorge@hoffmann-recht.de',
    location: 'Stuttgart & Digital',
    certified: true,
    rating: '4.9 ★★★★★',
  },
  {
    id: 'p3',
    name: 'Memoria Digitalarchiv',
    category: 'Foto- & Analogsammlungen',
    lifeStage: 'Familiengründung & Liebe',
    description: 'Professionelle Digitalisierung alter Familienfotos, Dias, Super-8-Filme und Tonbänder zur sicheren Verwahrung im Lifeloop.',
    contact: 'service@memoria-archiv.de',
    location: 'München & Versand',
    certified: true,
    rating: '4.9 ★★★★★',
  },
];

export const Marktplatz = ({ darkMode = false }) => {
  return (
    <div className="w-full space-y-8 select-none">
      
      {/* Header Banner */}
      <div className={`p-6 lg:p-8 rounded-3xl border shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 rounded-2xl">
              <Building2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-3 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                Ebene 6 • Kuratierter Marktplatz
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Kontextuelle Partner-Dienste
              </h2>
            </div>
          </div>

          <span className="text-xs font-serif text-slate-500 dark:text-slate-400 max-w-xs text-right hidden sm:block">
            Geprüfte Experten und Dienstleister passend zu Ihren konkreten Lebensphasen.
          </span>
        </div>
      </div>

      {/* PARTNERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PARTNER_OFFERS.map((partner) => (
          <div
            key={partner.id}
            className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between transition-colors duration-300 ${
              darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                  {partner.category}
                </span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                  {partner.rating}
                </span>
              </div>

              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-snug">
                {partner.name}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                {partner.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{partner.location}</span>
                <span className="text-teal-600 font-bold">{partner.lifeStage}</span>
              </div>

              <a
                href={`mailto:${partner.contact}`}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-slate-950 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Kontakt aufnehmen</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
