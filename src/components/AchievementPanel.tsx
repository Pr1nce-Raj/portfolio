import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, Trophy } from 'lucide-react';
import { useGameStore } from '../store';
import { achievements as ACHIEVEMENTS } from '../data/achievements'; import { Achievement } from '../types';

interface AchievementPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({ isOpen, onClose }) => {
  const { achievements: unlockedAchievements } = useGameStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-4xl bg-zinc-950 border-2 border-zinc-800 clip-angled flex flex-col max-h-[80vh] shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-zinc-100 oswald tracking-widest">TROPHY ROOM / ACHIEVEMENTS</h2>
              </div>
              <button onClick={onClose} className="p-1 text-zinc-400 hover:text-amber-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((achievement: Achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                
                return (
                  <div 
                    key={achievement.id}
                    className={`relative p-4 border flex flex-col gap-2 clip-angled transition-all duration-300 ${
                      isUnlocked 
                        ? 'bg-zinc-900 border-amber-500/50 hover:border-amber-500' 
                        : 'bg-zinc-950 border-zinc-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-3 right-3">
                        <Lock className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-zinc-950 border ${isUnlocked ? 'border-amber-500/30' : 'border-zinc-800'}`}>
                        <span className={isUnlocked ? '' : 'grayscale opacity-50'}>{achievement.icon}</span>
                      </div>
                      <h3 className={`font-bold oswald text-lg ${isUnlocked ? 'text-zinc-100' : 'text-zinc-500'}`}>
                        {achievement.name}
                      </h3>
                    </div>
                    <p className={`text-sm ${isUnlocked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {achievement.description}
                    </p>
                    <div className={`mt-auto pt-2 text-xs font-bold ${isUnlocked ? 'text-amber-500' : 'text-zinc-600'}`}>
                      +{achievement.xp} XP
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-end">
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to completely wipe your XP and local save data?')) {
                    useGameStore.getState().resetProgress();
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest clip-angled"
              >
                Reset Save Data
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
