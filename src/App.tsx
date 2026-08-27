import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AchievementToast } from './components/AchievementToast';
import { EntryScreen } from './components/EntryScreen';
import { Hero } from './components/Hero';
import { Dossier } from './components/Dossier';
import { Loadout } from './components/Loadout';
import { Missions } from './components/Missions';
import { OffDuty } from './components/OffDuty';
import { Comms } from './components/Comms';
import { useSecretCode } from './hooks/useSecretCode';
import { useGameStore } from './store';
import { audio } from './utils/audioEngine';
import { useEffect } from 'react';
import { TerminalPopup } from './components/TerminalPopup';
import { NightVisionOverlay } from './components/NightVisionOverlay';
import { SpacetimeRipple } from './components/SpacetimeRipple';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const unlockAchievement = useGameStore(state => state.unlockAchievement);
  const theme = useGameStore(state => state.theme);

  useSecretCode(() => {
    setIsTerminalOpen(true);
    unlockAchievement('terminal_hacker');
  });

  useEffect(() => {
    if (hasEntered) {
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
          audio.playHover();
        }
      };

      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, [hasEntered]);

  // Sync theme with body class to fix global CSS cursor overrides
  useEffect(() => {
    if (theme === 'night_vision') {
      document.body.classList.add('night-vision');
    } else {
      document.body.classList.remove('night-vision');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-100 ${theme === 'night_vision' ? 'cursor-crosshair' : ''}`}>
      {!hasEntered && <EntryScreen onEnter={() => setHasEntered(true)} />}
      
      {hasEntered && (
        <>
          <Header />
          <main className="flex-1 flex flex-col gap-24 py-12 px-4 max-w-7xl mx-auto w-full">
            <Hero />
            <Dossier />
            <Loadout />
            <Missions />
            <OffDuty />
            <Comms />
          </main>
          <Footer />
          <AchievementToast />
          <TerminalPopup isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          <NightVisionOverlay />
          <SpacetimeRipple />
        </>
      )}
    </div>
  );
}

export default App;
