import React from 'react';
import { Shield, Star, Trophy, Target, Crown } from 'lucide-react';
import { useGameStore } from '../store';

export const RankBadge: React.FC = () => {
  const { level } = useGameStore();

  const getRank = (lvl: number) => {
    if (lvl === 1) return { 
      name: 'EXPLORER', 
      color: 'text-zinc-400', 
      bg: 'bg-zinc-800/20', 
      border: 'border-zinc-700/50', 
      icon: Shield 
    };
    if (lvl === 2) return { 
      name: 'OPERATIVE', 
      color: 'text-amber-600', 
      bg: 'bg-amber-600/10', 
      border: 'border-amber-600/50', 
      icon: Target 
    };
    return { 
      name: 'ELITE COMMANDER', 
      color: 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]', 
      bg: 'bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]', 
      border: 'border-amber-400', 
      icon: Crown 
    };
  };

  const rank = getRank(level);
  const Icon = rank.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 border ${rank.border} ${rank.bg} clip-angled`}>
      <Icon className={`w-4 h-4 ${rank.color}`} />
      <span className={`text-sm font-bold tracking-wider ${rank.color} oswald`}>
        {rank.name} [LVL {level}]
      </span>
    </div>
  );
};
