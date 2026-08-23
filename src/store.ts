import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { achievements } from './data/achievements';
import { getLevelFromXP } from './utils/xpCalculator';
import { toast } from 'sonner';

interface GameStoreState {
  xp: number;
  level: number;
  achievements: string[];
  visitedSections: string[];
  terminalCommandsRun: number;
  soundEnabled: boolean;
  theme: 'dark' | 'night_vision';
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
          
          if (newLevel > state.level) {
            setTimeout(() => {
              toast.success(`LEVEL UP! You reached Tier ${newLevel}!`);
            }, 500); // slight delay to allow achievement toast to pop first
          }
          
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
          toast(`ACHIEVEMENT UNLOCKED: ${achievement.name}`, {
            description: `+${achievement.xp} XP Gained`,
            icon: achievement.icon,
          });
          
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
      toggleTheme: () => {
        const state = get();
        const newTheme = state.theme === 'dark' ? 'night_vision' : 'dark';
        set({ theme: newTheme });
        
        // Trigger achievement if they switch to night vision
        if (newTheme === 'night_vision') {
          state.unlockAchievement('night_owl');
          
          // Mobile-only optimization warning
          if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setTimeout(() => {
              toast.warning('Tactical Advisory', {
                description: 'For the smoothest zero-latency Night Vision experience, access this terminal via Desktop.',
                duration: 5000,
              });
            }, 800); // Delayed slightly so it doesn't overlap identically with the achievement toast
          }
        }
      },
      setAchievementPanelOpen: (open: boolean) => set({ achievementPanelOpen: open }),
      resetProgress: () => set(initialState),
    }),
    {
      name: 'prince-portfolio-game-save',
    }
  )
);
