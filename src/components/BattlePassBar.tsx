import React from 'react';
import { useGameStore } from '../store';
import { achievements } from '../data/achievements';

interface BattlePassBarProps {
  small?: boolean;
}

export const BattlePassBar: React.FC<BattlePassBarProps> = ({ small = false }) => {
  const { xp } = useGameStore();
  
  // Calculate absolute max XP possible
  const maxXP = achievements.reduce((total, a) => total + a.xp, 0);
  const progress = Math.min(100, Math.max(0, (xp / maxXP) * 100));

  return (
    <div className={`flex flex-col gap-1 w-full ${small ? 'max-w-48' : 'max-w-md'}`}>
      <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider oswald">
        <span>TOTAL XP</span>
        <span className="text-amber-500">{Math.floor(xp)} / {maxXP} XP</span>
      </div>
      <div className={`w-full bg-zinc-900 border border-zinc-800 ${small ? 'h-2' : 'h-4'}`}>
        <div 
          className="h-full bg-amber-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
