import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Radio, Gamepad2, Headphones, Activity } from 'lucide-react';
import { useSectionTracker } from '../hooks/useSectionTracker';

export const OffDuty: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSectionTracker(isInView, 'hobbies', 'offduty_scanned');

  const games = [
    { name: 'Call of Duty: Mobile', rank: 'Legendary', role: 'Slayer/Sniper', exp: '7 YRS', status: 'ACTIVE' },
    { name: 'BGMI', rank: 'Veteran', role: 'Assaulter', exp: '7 YRS', status: 'ACTIVE' },
    { name: 'Clash of Clans', rank: 'TH 15', role: 'Co-Leader', exp: '10 YRS', status: 'ACTIVE' },
    { name: 'Brawl Stars', rank: 'Mythic', role: 'Assassin', exp: '3 YRS', status: 'OCCASIONAL' },
  ];

  return (
    <section id="offduty" className="py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <Radio className="w-8 h-8 text-amber-500" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Off-Duty <span className="text-zinc-600">Protocols</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Gaming Feed */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-6"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
              <Gamepad2 className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Combat Sims / Gaming</h3>
            </div>

            <div className="space-y-4">
              {games.map((game, i) => (
                <motion.div 
                  key={game.name}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 + (i * 0.1) }}
                  className="flex items-center justify-between bg-zinc-950 border border-zinc-800/50 p-4 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <Activity className="w-4 h-4 text-zinc-600 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
                    <div>
                      <div className="font-bold text-white uppercase text-sm">{game.name}</div>
                      <div className="font-mono text-xs text-zinc-500 flex gap-3 mt-1">
                        <span>ROLE: {game.role}</span>
                        <span className="text-zinc-700">|</span>
                        <span>EXP: {game.exp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-amber-500 font-bold uppercase">{game.rank}</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-1">
                      STATUS: <span className={game.status === 'ACTIVE' ? 'text-amber-500' : 'text-zinc-300'}>{game.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Music/Media Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
              <Headphones className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Audio Protocols</h3>
            </div>

            <div className="flex-grow flex items-center justify-center border border-dashed border-zinc-800 bg-zinc-950/50 p-8 text-center">
              <div>
                <Activity className="w-12 h-12 text-zinc-700 mx-auto mb-4 animate-pulse" />
                <h4 className="text-white font-bold uppercase mb-2">Analyzing Frequencies</h4>
                <p className="text-zinc-500 font-mono text-sm max-w-sm">
                  Constant stream of background tracks deployed during intense coding sessions. Focus maintained via high-BPM instrumentals and tactical soundscapes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
