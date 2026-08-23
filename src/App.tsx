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

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-100">
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
        </>
      )}
    </div>
  );
}

export default App;
