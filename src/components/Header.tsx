import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { BattlePassBar } from './BattlePassBar';
import { RankBadge } from './RankBadge';
import { AchievementPanel } from './AchievementPanel';

export const Header: React.FC = () => {
  const [isTrophyRoomOpen, setIsTrophyRoomOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-none">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#hero" className="text-xl font-bold oswald text-zinc-100 tracking-widest hover:text-amber-500 transition-colors">
              PRINCE_RAJ <span className="text-amber-500">//</span> PROFILE
            </a>
            
            <nav className="hidden md:flex gap-6 oswald text-sm tracking-wider font-bold">
              <a href="#dossier" className="relative text-zinc-400 hover:text-amber-500 transition-colors group">
                DOSSIER
                <span className="absolute left-1/2 -bottom-1 h-0.5 bg-amber-500 w-0 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"></span>
              </a>
              <a href="#loadout" className="relative text-zinc-400 hover:text-amber-500 transition-colors group">
                LOADOUT
                <span className="absolute left-1/2 -bottom-1 h-0.5 bg-amber-500 w-0 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"></span>
              </a>
              <a href="#missions" className="relative text-zinc-400 hover:text-amber-500 transition-colors group">
                MISSIONS
                <span className="absolute left-1/2 -bottom-1 h-0.5 bg-amber-500 w-0 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"></span>
              </a>
              <a href="#comms" className="relative text-zinc-400 hover:text-amber-500 transition-colors group">
                COMMS
                <span className="absolute left-1/2 -bottom-1 h-0.5 bg-amber-500 w-0 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"></span>
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="hidden lg:block w-48">
              <BattlePassBar small />
            </div>
            <RankBadge />
            <button 
              onClick={() => setIsTrophyRoomOpen(true)}
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:text-amber-500 transition-colors clip-angled text-zinc-400"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AchievementPanel 
        isOpen={isTrophyRoomOpen} 
        onClose={() => setIsTrophyRoomOpen(false)} 
      />
    </>
  );
};
