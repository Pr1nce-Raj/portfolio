import React from 'react';
import { Shield, Star, Trophy, Target, Crown } from 'lucide-react';
import { useGameStore } from '../store';

export const RankBadge: React.FC = () => {
  const { level } = useGameStore();

  const getRank = (lvl: number) => {
    if (lvl <= 5) return { name: 'BRONZE', color: 'text-orange-700', bg: 'bg-orange-700/10', border: 'border-orange-700/50', icon: Shield };
    if (lvl <= 10) return { name: 'SILVER', color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/50', icon: Target };
    if (lvl <= 15) return { name: 'GOLD', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/50', icon: Star };
    if (lvl <= 20) return { name: 'DIAMOND', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/50', icon: Trophy };
    return { name: 'LEGENDARY', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/50', icon: Crown };
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
