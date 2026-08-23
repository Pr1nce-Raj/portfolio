import React from 'react';
import { useGameStore } from '../store';
import { getXPProgress } from '../utils/xpCalculator';

interface BattlePassBarProps {
  small?: boolean;
}

export const BattlePassBar: React.FC<BattlePassBarProps> = ({ small = false }) => {
  const { xp, level } = useGameStore();
  const { currentXP: currentTierXP, requiredXP: nextTierXP, percentage: progress } = getXPProgress(xp);

  return (
    <div className={`flex flex-col gap-1 w-full ${small ? 'max-w-48' : 'max-w-md'}`}>
      <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider oswald">
        <span>TIER PROGRESS</span>
        <span>{Math.floor(currentTierXP)} / {nextTierXP} XP</span>
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
