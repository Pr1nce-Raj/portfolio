import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { achievements } from './data/achievements';
import { getLevelFromXP } from './utils/xpCalculator';

interface GameStoreState {
  xp: number;
  level: number;
  achievements: string[];
  visitedSections: string[];
  terminalCommandsRun: number;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  achievementPanelOpen: boolean;
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => boolean;
  visitSection: (id: string) => void;
  incrementTerminalCommands: () => void;
  toggleSound: () => void;
  toggleTheme: () => void;
  setAchievementPanelOpen: (open: boolean) => void;
  resetProgress: () => void;
}

const initialState = {
  xp: 0,
  level: 1,
  achievements: [],
  visitedSections: [],
  terminalCommandsRun: 0,
  soundEnabled: false,
  theme: 'dark' as const,
  achievementPanelOpen: false,
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,
      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = getLevelFromXP(newXP);
          return { xp: newXP, level: newLevel };
        });
      },
      unlockAchievement: (id: string) => {
        const state = get();
        if (state.achievements.includes(id)) {
          return false;
        }
        const achievement = achievements.find((a) => a.id === id);
        if (achievement) {
          set((state) => ({ achievements: [...state.achievements, id] }));
          get().addXP(achievement.xp);
          return true;
        }
        return false;
      },
      visitSection: (id: string) => {
        set((state) => {
          if (!state.visitedSections.includes(id)) {
            return { visitedSections: [...state.visitedSections, id] };
          }
          return state;
        });
      },
      incrementTerminalCommands: () => {
        set((state) => ({ terminalCommandsRun: state.terminalCommandsRun + 1 }));
      },
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setAchievementPanelOpen: (open: boolean) => set({ achievementPanelOpen: open }),
      resetProgress: () => set(initialState),
    }),
    {
      name: 'prince-portfolio-game-save',
    }
  )
);
