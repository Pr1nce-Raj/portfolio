import React, { useState } from 'react';
import { Trophy, FileText, Eye, EyeOff, Menu, X } from 'lucide-react';
import { BattlePassBar } from './BattlePassBar';
import { RankBadge } from './RankBadge';
import { AchievementPanel } from './AchievementPanel';
import { useGameStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const [isTrophyRoomOpen, setIsTrophyRoomOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useGameStore();

  const navLinks = [
    { href: '#dossier', label: 'DOSSIER' },
    { href: '#loadout', label: 'LOADOUT' },
    { href: '#missions', label: 'MISSIONS' },
    { href: '#comms', label: 'COMMS' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-none">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-8 flex-shrink-0">
            <a href="#hero" className="text-[13px] sm:text-xl font-bold oswald text-zinc-100 tracking-widest hover:text-amber-500 transition-colors whitespace-nowrap">
              PRINCE_RAJ <span className="text-amber-500">//</span> PORTFOLIO
            </a>
            
            <nav className="hidden md:flex gap-6 oswald text-sm tracking-wider font-bold">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="relative text-zinc-400 hover:text-amber-500 transition-colors group">
                  {link.label}
                  <span className="absolute left-1/2 -bottom-1 h-0.5 bg-amber-500 w-0 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 flex-1 justify-end">
            <div className="hidden lg:block w-48">
              <BattlePassBar small />
            </div>
            
            <div className="hidden sm:block">
              <RankBadge />
            </div>
            
            <a 
              href="https://drive.google.com/file/d/1fbIQlElMTKo1eXbC2NgvSP8svz8WXTGp/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 lg:px-3 py-2 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500 hover:text-zinc-950 text-amber-500 transition-colors clip-angled flex items-center gap-2 text-xs font-bold oswald uppercase tracking-wider group"
              title="View ATS Resume"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">RESUME</span>
            </a>
            
            <button 
              onClick={toggleTheme}
              className={`relative z-[60] p-2 border transition-colors clip-angled group ${theme === 'night_vision' ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-zinc-900 border-zinc-800 hover:border-amber-500 hover:text-amber-500 text-zinc-400'}`}
              title="Toggle Night Vision"
            >
              {theme === 'night_vision' ? <Eye className="w-4 h-4 lg:w-5 lg:h-5" /> : <EyeOff className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />}
            </button>

            <button 
              onClick={() => setIsTrophyRoomOpen(true)}
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:text-amber-500 transition-colors clip-angled text-zinc-400 group"
              title="Trophy Room"
            >
              <Trophy className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:text-amber-500 transition-colors clip-angled text-zinc-400"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-zinc-800 bg-zinc-950/95 overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-4 oswald text-sm tracking-wider font-bold">
                {navLinks.map(link => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-zinc-400 hover:text-amber-500 transition-colors block py-2 border-b border-zinc-900"
                  >
                    {link.label}
                  </a>
                ))}
                {/* Show Rank on Mobile since it was hidden in the top bar to save space */}
                <div className="pt-2 sm:hidden flex justify-center">
                  <RankBadge />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AchievementPanel 
        isOpen={isTrophyRoomOpen} 
        onClose={() => setIsTrophyRoomOpen(false)} 
      />
    </>
  );
};
