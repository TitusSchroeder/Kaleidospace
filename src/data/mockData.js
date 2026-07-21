export const DEFAULT_WERTE = [
  {
    id: 'werte-1',
    category: 'Lebenshaltung',
    question: 'Welcher Grundsatz hat mich in schweren Zeiten getragen?',
    answer: 'Ehrlichkeit gegen sich selbst und Nachsicht gegenüber anderen. Die Welt verändert sich ständig, aber Mut und Mitgefühl bleiben unvergänglich.',
    createdAt: '2026-06-10',
  },
  {
    id: 'werte-2',
    category: 'Ratschlag an Nachkommen',
    question: 'Welchen Ratschlag gebe ich der nächsten Generation?',
    answer: 'Sammelt Erinnerungen, nicht Besitztümer. Verbringt Zeit miteinander im Freien, sprecht offen über Ängste und vergebt schnell.',
    createdAt: '2026-07-01',
  },
  {
    id: 'werte-3',
    category: 'Dankbarkeit',
    question: 'Wofür bin ich im Rückblick am tiefsten dankbar?',
    answer: 'Für die ruhigen Sonntagmorgen mit der Familie, das Lachen am Esstisch und die treuen Weggefährten an meiner Seite.',
    createdAt: '2026-07-15',
  },
];

export const DEFAULT_LETZTES_KAPITEL = {
  music: [
    { title: 'Clair de Lune', artist: 'Claude Debussy', note: 'Zum Einlass der Abschiedsfeier' },
    { title: 'Der Weg', artist: 'Herbert Grönemeyer', note: 'Lieblingslied für leise Momente' },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', note: 'Zum Ausklang des Lebensabschieds' },
  ],
  atmosphere: {
    flowers: 'Wiesenblumen, Lavendel & helle Feldblumen (keine steifen Kränze)',
    colors: 'Helle, warme Naturtöne (Beige, Salbei, sanftes Gold)',
    dresscode: 'Helle Lebenskleidung statt traurigem Schwarz',
    notes: 'Es soll ein Ort der Dankbarkeit für das gemeinsame Leben sein, nicht der Dunkelheit.',
  },
  words: {
    poem: '„Ich bin nicht tot, ich tausche nur die Räume. Ich leb in euch und geh durch eure Träume.“',
    speakerNotes: 'Bitte sprecht nicht nur über Erfolge, sondern erzählt kleine, lustige Anekdoten aus dem Alltag.',
  },
  abschiedshaus: {
    name: 'Abschiedshaus Lichtblick (Dr. Marcus Weber)',
    location: 'Freiburg / Schwarzwald',
    contact: 'kontakt@abschiedshaus-lichtblick.de',
    notes: 'Abschiedsbegleiter Dr. Weber kennt meine Wünsche und führt die Treuhand-Zeitkapseln.',
  },
};

export const DEFAULT_PHASES = [
  {
    id: 'phase-1',
    name: 'Kindheit & Wurzeln',
    color: '#10b981', // Emerald
    gradient: 'from-emerald-400 to-teal-600',
    description: 'Geborgenheit, erste Schritte, Baumhäuser & Sommertage',
    startAge: 0,
    endAge: 18,
  },
  {
    id: 'phase-2',
    name: 'Wilde Jahre & Aufbruch',
    color: '#06b6d4', // Cyan
    gradient: 'from-cyan-400 to-blue-600',
    description: 'Reisen, Freiheit, erste große Liebe & späte Nächte',
    startAge: 18,
    endAge: 30,
  },
  {
    id: 'phase-3',
    name: 'Familiengründung & Liebe',
    color: '#f59e0b', // Amber/Sun
    gradient: 'from-amber-400 to-orange-500',
    description: 'Gemeinsames Heim, Kinderlachen & tiefe Verbundenheit',
    startAge: 30,
    endAge: 50,
  },
  {
    id: 'phase-4',
    name: 'Reifezeit & Schaffen',
    color: '#8b5cf6', // Violet
    gradient: 'from-purple-400 to-indigo-600',
    description: 'Lebenswerke, Erfahrung, Gelassenheit & Ernte',
    startAge: 50,
    endAge: 70,
  },
  {
    id: 'phase-5',
    name: 'Vermächtnis & Zukunft',
    color: '#ec4899', // Pink/Rose
    gradient: 'from-rose-400 to-pink-600',
    description: 'Botschaften an die Zukunft, Zeitkapseln & Ewigkeit',
    startAge: 70,
    endAge: 100,
  },
];

export const UNSPASH_PRESETS = [
  {
    label: 'Lagerfeuer im Abendlicht',
    url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Sonnenaufgang am Ozean',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Handgeschriebener Brief',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Alte Schallplatte & Musik',
    url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Kinderschaukel im Garten',
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Bergpanorama bei Dämmerung',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Altbau mit Buchregal',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Spaziergang im Herbstwald',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
  },
];

export const MOCK_MEMORIES = [
  // Phase 1: Kindheit & Wurzeln
  {
    id: 'mem-1',
    title: 'Das Baumhaus am Waldrand',
    story: 'Im Sommer 1994 haben wir Wochen damit verbracht, alte Holzbretter den Hügel hinaufzutragen. Oben in der Eiche war unsere eigene kleine Festung. Der Geruch von feuchtem Harz und Abenteuer begleitet mich bis heute.',
    phaseId: 'phase-1',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-02-10',
    isTimeLocked: false,
    audienceScope: 'family',
  },
  {
    id: 'mem-2',
    title: 'Sommer am Wörthersee 1998',
    story: 'Das Wasser war spiegelglatt. Papa hat uns gelernt, auf alten Holzski zu gleiten. Diese unbeschwerten Nachmittage sind mein Anker für ruhige Momente.',
    phaseId: 'phase-1',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-03-12',
    isTimeLocked: false,
    audienceScope: 'private',
  },
  {
    id: 'mem-3',
    title: 'Omas Holunderblütensirup',
    story: 'Jeden Juni duftete die gesamte Küche nach Zitronen und frischen Holunderdolden. Das Rezept lag handschriftlich in ihrer alten Rezeptschatulle.',
    phaseId: 'phase-1',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-04-05',
    isTimeLocked: false,
    audienceScope: 'family',
  },

  // Phase 2: Wilde Jahre & Aufbruch
  {
    id: 'mem-4',
    title: 'Roadtrip an der Atlantikküste',
    story: 'Ein klappriger VW-Bus, drei Freunde und die endlose Küstenstraße in Portugal. Wir schliefen am Strand unter dem Sternenhimmel und hörten die Wellen.',
    phaseId: 'phase-2',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-01-20',
    isTimeLocked: false,
    audienceScope: 'family',
  },
  {
    id: 'mem-5',
    title: 'Unsere erste Altbauwohnung',
    story: 'Überall Umzugskartons, nur eine Matratze auf dem Boden und eine Stehlampe. Wir haben Pizza vom Karton gegessen und die Zukunft geplant.',
    phaseId: 'phase-2',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-01-15',
    isTimeLocked: false,
    audienceScope: 'family',
  },
  {
    id: 'mem-6',
    title: 'Das kleine Jazz-Festival im Regensturm',
    story: 'Trotz des Platzregens blieb niemand im Zelt. Alle tanzten barfuß im Schlamm zu den Trompetenklängen. Unvergleichliche Lebensfreude.',
    phaseId: 'phase-2',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-05-18',
    isTimeLocked: false,
    audienceScope: 'private',
  },

  // Phase 3: Familiengründung & Liebe
  {
    id: 'mem-7',
    title: 'Brief an Clara zu ihrem 18. Geburtstag',
    story: 'Liebe Clara, wenn du diese Zeilen liest, bist du erwachsen. Ich habe diese Nachricht verfasst, als du 4 Jahre alt warst und friedlich schlummertest. Vergisst nie: Mut steht dir am besten.',
    phaseId: 'phase-3',
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-06-01',
    isTimeLocked: true,
    unlockDate: '2028-04-14',
    audienceScope: 'family',
    treuhandBote: 'Abschiedsbegleiter Dr. Marcus Weber (Abschiedshaus Lichtblick)',
  },
  {
    id: 'mem-8',
    title: 'Der erste gemeinsame Garten',
    story: 'Der Apfelbaum, den wir im ersten Frühling pflanzten, trug nach drei Jahren die ersten Früchte. Süß, klein und selbst gezogen.',
    phaseId: 'phase-3',
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-04-22',
    isTimeLocked: false,
    audienceScope: 'family',
  },
  {
    id: 'mem-9',
    title: 'Geheime Familienrezepte & Abendsongs',
    story: 'Die Lieder, die wir am Küchentisch gesungen haben, während das Sonntagsessen köchelte. Diese Klänge sollen in unserer Familie weiterleben.',
    phaseId: 'phase-3',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-03-30',
    isTimeLocked: false,
    audienceScope: 'family',
  },

  // Phase 4: Reifezeit & Schaffen
  {
    id: 'mem-10',
    title: 'Das Holzschnitz-Set von Opa Heinrich',
    story: 'Jede Kerbe im Eschenholz erzählt eine Geschichte von Geduld. Opa sagte: "Man muss nur das Überflüssige wegnehmen, um die Form zu befreien."',
    phaseId: 'phase-4',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2025-11-20',
    isTimeLocked: false,
    audienceScope: 'private',
  },
  {
    id: 'mem-11',
    title: 'Gedanken über die Verlangsamung des Lebens',
    story: 'Erkenntnisse aus dem fünfzigsten Lebensjahr: Der meiste Lärm der Welt verschwindet, wenn man lernt, den Blick auf das Wesentliche zu richten.',
    phaseId: 'phase-4',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-02-14',
    isTimeLocked: false,
    audienceScope: 'family',
  },
  {
    id: 'mem-12',
    title: 'Fotoalbum der dreißigjährigen Partnerschaft',
    story: 'Durch Sturm und Sonnenschein. Liebe ist kein Gefühl des Moments, sondern das tägliche Versprechen, einander Halt zu geben.',
    phaseId: 'phase-4',
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-05-01',
    isTimeLocked: false,
    audienceScope: 'family',
  },

  // Phase 5: Vermächtnis & Zukunft
  {
    id: 'mem-13',
    title: 'Vermächtnis der Stille: Worte an meine Kinder',
    story: 'Reichtum bemisst sich nicht in Besitztümern, sondern in den Menschen, mit denen man lachen und schweigen kann. Diese Botschaft öffnet sich zur Reifezeit.',
    phaseId: 'phase-5',
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-07-04',
    isTimeLocked: true,
    unlockDate: '2030-01-01',
    audienceScope: 'family',
    treuhandBote: 'Abschiedsbegleiterin Elena Lindner (Abschiedshaus Freudenberg)',
  },
  {
    id: 'mem-14',
    title: 'Zeitkapsel: Nachricht an meine Enkel im Jahr 2040',
    story: 'Wenn ihr dieses Bild und diese Worte seht, ist die Welt wahrscheinlich eine ganz andere. Ich wünsche euch, dass ihr die Ehrfurcht vor den Wäldern nie verliert.',
    phaseId: 'phase-5',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-07-10',
    isTimeLocked: true,
    unlockDate: '2040-06-21',
    audienceScope: 'family',
    treuhandBote: 'Digitaler Treuhand-Tresor Kaleido',
  },
  {
    id: 'mem-15',
    title: 'Wünsche für meine Abschiedsfeier',
    story: 'Kein trauriges Schwarz. Ich wünsche mir helle Farben, frische Feldblumen und Jazz-Musik. Lasst uns das verflossene Leben in Dankbarkeit feiern.',
    phaseId: 'phase-5',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-06-15',
    isTimeLocked: true,
    unlockDate: '2029-09-01',
    audienceScope: 'family',
    treuhandBote: 'Abschiedsbegleiter Dr. Marcus Weber (Abschiedshaus Lichtblick)',
  },
];

export const TERMINOLOGY_RULES = [
  { old: 'Bestatter / Bestattungsinstitut', replacement: 'Abschiedsbegleiter / Abschiedshaus', desc: 'Empathische Begleitung statt bürokratischer Gewerbebezeichnung' },
  { old: 'Beerdigung / Begräbnis', replacement: 'Lebensabschied / Abschiedsfeier', desc: 'Feier des verlaufenen Lebensweges statt Frieren am offenen Grab' },
  { old: 'Grabstein', replacement: 'Lebenszeichen / Erinnerungsfläche', desc: 'Ein leuchtendes Zeichen der Erinnerung & Geschichten' },
  { old: 'Grabpflege', replacement: 'Erinnerungspflege', desc: 'Aktives Pflegen von Werten, Worten und bleibenden Spuren' },
];

export const EDUCATIONAL_CONTENT = {
  philosophy: {
    title: 'Die Infinity Culture (Unendlichkeitskultur)',
    subtitle: 'Vom kurzlebigen Feed zum bleibenden Seelenraum',
    body: 'Standard-Social-Media belohnt Schnelligkeit, Aufregung und sofortige öffentliche Bestätigung. Kaleidospace dreht dieses Paradigma um: Es ist ein Raum der Verlangsamung. Hier werden Erinnerungen nicht konsumiert und vergessen, sondern für die Ewigkeit verwahrt und mit emotionalem Zeitabstand weitergegeben.',
  },
  features: [
    {
      title: 'Typologie der Wünsche',
      icon: 'HeartHandshake',
      description: 'Gestalten Sie Ihren Lebensabschied nach eigenen Vorstellungen: Von Musikwünschen für die Abschiedsfeier bis zu persönlichen Botschaften für geliebte Menschen.',
    },
    {
      title: 'Digitaler Raum "Letzter Wohnort"',
      icon: 'MapPin',
      description: 'Ein würdevoller virtueller Zufluchtsort. Angehörige können überall auf der Welt Kerzen entzünden, Erinnerungszeichen hinterlassen und Anekdoten teilen.',
    },
    {
      title: 'Treuhand-Zeitkapseln (Time-Locks)',
      icon: 'Lock',
      description: 'Verriegeln Sie Dokumente, Briefe oder Videos bis zu einem bestimmten Lebensdatum oder Wendepunkt. Freigabe durch vertraute Abschiedsbegleiter oder automatische Zeitregeln.',
    },
    {
      title: 'Erinnerungspflege im Lebenskreis',
      icon: 'Sparkles',
      description: 'Erhalten Sie aktive Impulse, vergangene Lebensphasen zu reflektieren und kostbare Augenblicke festzuhalten, bevor sie verblassen.',
    },
  ],
};
