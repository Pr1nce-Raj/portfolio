import React from 'react';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { Crosshair, Shield, Zap, ChevronDown } from 'lucide-react';
import { profileData } from '../data/profile';
import { useSectionTracker } from '../hooks/useSectionTracker';

export const Hero: React.FC = () => {
  useSectionTracker(true, 'hero', 'first_landing');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-20">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-3 mt-12 md:mt-0"
          >
            <Crosshair className="text-amber-500 w-6 h-6" />
            <span className="text-amber-500 font-mono tracking-[0.2em] text-sm font-bold uppercase">Player Profile Initiated</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase"
          >
            {profileData.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-zinc-400 mb-12 h-16 uppercase font-mono"
          >
            <TypeAnimation
              sequence={[
                'COMPETITIVE DEVELOPER',
                2000,
                'TACTICAL PROBLEM SOLVER',
                2000,
                'FULL-STACK OPERATIVE',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-amber-400"
            />
          </motion.div>

          {/* Player Stats Quick View */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: 'K/D RATIO', value: 'FLAWLESS', icon: Crosshair },
              { label: 'MATCHES WON', value: '∞+', icon: Shield },
              { label: 'REACTION TIME', value: '< 2ms', icon: Zap },
              { label: 'RANK', value: 'GLOBAL ELITE', icon: ChevronDown }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-none group hover:border-amber-500/50 hover:bg-zinc-800/50 transition-all duration-300 cursor-crosshair">
                <div className="flex items-center gap-2 text-zinc-500 mb-2 font-mono text-xs font-bold group-hover:text-amber-500/70 transition-colors">
                  <stat.icon className="w-4 h-4 text-amber-500 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
                  {stat.label}
                </div>
                <div className="text-white font-bold font-mono text-lg group-hover:text-white transition-colors">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#loadout"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase tracking-wider transition-colors rounded-none flex items-center justify-center gap-2 group"
            >
              View Loadout
              <Crosshair className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </a>
            <a
              href="#comms"
              className="px-8 py-4 border-2 border-zinc-700 text-white hover:border-amber-500 hover:text-amber-500 font-bold uppercase tracking-wider transition-colors rounded-none flex items-center justify-center gap-2"
            >
              Initiate Comms
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
