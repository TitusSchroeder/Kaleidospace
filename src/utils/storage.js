import { DEFAULT_PHASES, MOCK_MEMORIES } from '../data/mockData';

const STORAGE_KEY = 'kaleido_app_state_v14';

export const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      simulatedDate: '2026-07-19',
      activePhaseId: 'all',
      phases: DEFAULT_PHASES,
      memories: MOCK_MEMORIES,
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
  };
  saveState(defaultState);
  return defaultState;
};
