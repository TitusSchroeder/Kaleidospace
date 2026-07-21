import { DEFAULT_PHASES, MOCK_MEMORIES, DEFAULT_WERTE, DEFAULT_LETZTES_KAPITEL } from '../data/mockData';

const STORAGE_KEY = 'kaleido_app_state_v15';

export const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      simulatedDate: '2026-07-19',
      activePhaseId: 'all',
      phases: DEFAULT_PHASES,
      memories: MOCK_MEMORIES,
      werte: DEFAULT_WERTE,
      letztesKapitel: DEFAULT_LETZTES_KAPITEL,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        simulatedDate: parsed.simulatedDate || '2026-07-19',
        activePhaseId: parsed.activePhaseId || 'all',
        phases: parsed.phases?.length ? parsed.phases : DEFAULT_PHASES,
        memories: parsed.memories?.length ? parsed.memories : MOCK_MEMORIES,
        werte: parsed.werte?.length ? parsed.werte : DEFAULT_WERTE,
        letztesKapitel: parsed.letztesKapitel || DEFAULT_LETZTES_KAPITEL,
      };
    }
  } catch (err) {
    console.error('Error reading state from localStorage:', err);
  }

  return {
    simulatedDate: '2026-07-19',
    activePhaseId: 'all',
    phases: DEFAULT_PHASES,
    memories: MOCK_MEMORIES,
    werte: DEFAULT_WERTE,
    letztesKapitel: DEFAULT_LETZTES_KAPITEL,
  };
};

export const saveState = (state) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

export const resetToDefaultData = () => {
  const defaultState = {
    simulatedDate: '2026-07-19',
    activePhaseId: 'all',
    phases: DEFAULT_PHASES,
    memories: MOCK_MEMORIES,
    werte: DEFAULT_WERTE,
    letztesKapitel: DEFAULT_LETZTES_KAPITEL,
  };
  saveState(defaultState);
  return defaultState;
};
