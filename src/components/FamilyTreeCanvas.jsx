import React from 'react';
import { User, Heart } from 'lucide-react';

export const FamilyTreeCanvas = ({ selectedPerson, onSelectPerson }) => {
  // Structured Tree Node Data matching the reference image layout:
  // Gen 0: Urgroßeltern (Johann & Elise)
  // Gen 1: Großeltern (Heinrich & Martha) -> Parent pair
  // Gen 2: Eltern (Friedrich & Elisabeth) -> Parent pair
  // Gen 3: Ich & Partner (Titus & Marie) & Geschwister (Lukas, Anna)
  // Gen 4: Kinder (Clara & Jonas)
  // Gen 5: Enkel (Maya)

  const treeStructure = [
    {
      level: 0,
      title: 'Urgroßeltern (1915–1920)',
      couples: [
        {
          id: 'c0',
          p1: { id: 'f_ug1', name: 'Uropa Johann', role: 'Urgroßvater', year: '1918' },
          p2: { id: 'f_ug2', name: 'Uroma Elise', role: 'Urgroßmutter', year: '1922' },
        },
      ],
    },
    {
      level: 1,
      title: 'Großeltern (1940–1945)',
      couples: [
        {
          id: 'c1_1',
          p1: { id: 'f3', name: 'Opa Heinrich', role: 'Großvater', year: '1942' },
          p2: { id: 'f4', name: 'Oma Martha', role: 'Großmutter', year: '1945' },
        },
        {
          id: 'c1_2',
          p1: { id: 'f_g_w', name: 'Opa Wilhelm', role: 'Großvater (Mutter)', year: '1938' },
          p2: { id: 'f_g_e', name: 'Oma Erika', role: 'Großmutter (Mutter)', year: '1941' },
        },
      ],
    },
    {
      level: 2,
      title: 'Eltern & Onkel (1950–1960)',
      couples: [
        {
          id: 'c2_1',
          p1: { id: 'f_e1', name: 'Vater Friedrich', role: 'Vater', year: '1954' },
          p2: { id: 'f_e2', name: 'Mutter Elisabeth', role: 'Mutter', year: '1956' },
        },
        {
          id: 'c2_2',
          p1: { id: 'f_onkel', name: 'Onkel Stefan', role: 'Onkel', year: '1958' },
          p2: { id: 'f_tante', name: 'Tante Helga', role: 'Tante', year: '1960' },
        },
      ],
    },
    {
      level: 3,
      title: 'Ich, Partner & Geschwister (1975–1985)',
      couples: [
        {
          id: 'c3_1',
          p1: { id: 'f0', name: 'Titus (Ich)', role: 'Familienoberhaupt', year: '1976', isMain: true },
          p2: { id: 'f5', name: 'Marie Schröder', role: 'Ehefrau', year: '1978' },
        },
        {
          id: 'c3_2',
          p1: { id: 'f_g1', name: 'Bruder Lukas', role: 'Bruder', year: '1980' },
          p2: { id: 'f_g1_w', name: 'Sarah', role: 'Schwägerin', year: '1982' },
        },
        {
          id: 'c3_3',
          p1: { id: 'f_g2', name: 'Schwester Anna', role: 'Schwester', year: '1983' },
          p2: null, // Single
        },
      ],
    },
    {
      level: 4,
      title: 'Kinder & Nichten (2005–2015)',
      couples: [
        {
          id: 'c4_1',
          p1: { id: 'f1', name: 'Clara Schröder', role: 'Tochter', year: '2008' },
          p2: { id: 'f_clara_p', name: 'David', role: 'Partner Clara', year: '2006' },
        },
        {
          id: 'c4_2',
          p1: { id: 'f2', name: 'Jonas Schröder', role: 'Sohn', year: '2012' },
          p2: null,
        },
        {
          id: 'c4_3',
          p1: { id: 'f_n1', name: 'Neffe Tim', role: 'Neffe', year: '2014' },
          p2: null,
        },
      ],
    },
    {
      level: 5,
      title: 'Enkelkinder (2025+)',
      couples: [
        {
          id: 'c5_1',
          p1: { id: 'f_enk1', name: 'Enkeltochter Maya', role: 'Enkelkind', year: '2025' },
          p2: null,
        },
      ],
    },
  ];

  const renderPersonNode = (person) => {
    if (!person) return null;
    const isSelected = selectedPerson?.id === person.id;

    return (
      <div
        key={person.id}
        onClick={() => onSelectPerson(person)}
        className={`w-32 p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1 relative shadow-sm ${
          isSelected
            ? 'bg-emerald-600 border-white text-white ring-4 ring-emerald-400/50 scale-105 z-10'
            : person.isMain
            ? 'bg-amber-500 border-amber-300 text-slate-950 font-bold'
            : 'bg-white border-slate-300 text-slate-900 hover:border-emerald-500'
        }`}
      >
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
          isSelected
            ? 'bg-white/20 border-white text-white'
            : person.isMain
            ? 'bg-slate-900 text-amber-400 border-slate-900'
            : 'bg-emerald-100 border-emerald-300 text-emerald-800'
        }`}>
          <User className="w-4 h-4" />
        </div>

        <span className="font-serif font-bold text-xs line-clamp-1">{person.name}</span>
        <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
          {person.year}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f6f3ed] p-4 rounded-3xl border-2 border-[#e5dfd3] shadow-inner select-none overflow-x-auto">
      
      {/* Elegantes Vintage Stammbaum Header */}
      <div className="text-center space-y-1 pb-6 border-b border-[#e5dfd3] mb-6">
        <h3 className="font-serif font-bold text-lg tracking-widest text-[#5c4a38] uppercase">
          Grafischer Familienstammbaum
        </h3>
        <p className="text-xs font-serif italic text-[#8c745c]">
          Verbindungslinien zeigen Eltern-Kind-Beziehungen & Ehen über 6 Generationen
        </p>
      </div>

      {/* GRAPHICAL TREE LAYOUT WITH SVG CONNECTOR LINES */}
      <div className="min-w-[640px] space-y-8 py-2">
        {treeStructure.map((lvlGroup, lvlIdx) => (
          <div key={lvlGroup.level} className="space-y-3 relative">
            
            {/* Generation Level Title */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c745c] bg-[#eae4d7] px-3 py-0.5 rounded-full border border-[#d8cfbe]">
                {lvlGroup.title}
              </span>
            </div>

            {/* Couples & Siblings Row */}
            <div className="flex items-center justify-center gap-8 flex-wrap relative">
              {lvlGroup.couples.map((c) => (
                <div key={c.id} className="flex flex-col items-center relative">
                  
                  {/* Pair Container with Horizontal Marriage Line */}
                  <div className="flex items-center gap-3 relative">
                    {renderPersonNode(c.p1)}

                    {/* Marriage Line & Heart Connector */}
                    {c.p2 && (
                      <div className="flex items-center justify-center relative w-8">
                        <div className="w-full h-0.5 bg-[#b89f82]" />
                        <div className="absolute w-5 h-5 rounded-full bg-[#f6f3ed] border border-[#b89f82] flex items-center justify-center">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        </div>
                      </div>
                    )}

                    {c.p2 && renderPersonNode(c.p2)}
                  </div>

                  {/* Vertical Line descending from couple midpoint down to next generation */}
                  {lvlIdx < treeStructure.length - 1 && (
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-0.5 h-6 bg-[#b89f82]" />
                      <div className="w-2 h-2 rounded-full bg-[#b89f82]" />
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Horizontal Branching Bar to Children for next level */}
            {lvlIdx < treeStructure.length - 1 && (
              <div className="w-full flex justify-center">
                <div className="w-2/3 h-0.5 bg-[#b89f82]/50" />
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
