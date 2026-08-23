import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FileText, Target, Crosshair } from 'lucide-react';
import { profileData } from '../data/profile';
import { useSectionTracker } from '../hooks/useSectionTracker';

export const Dossier: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSectionTracker(isInView, 'about', 'dossier_unlocked');

  return (
    <section id="dossier" className="py-24 bg-zinc-950 border-t border-zinc-900" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <FileText className="w-8 h-8 text-amber-500" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Service Record // <span className="text-zinc-600">Dossier</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Profile Image - Military Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 relative group"
          >
            <div className="absolute -inset-1 bg-amber-500 opacity-0 group-hover:opacity-20 transition-opacity blur-sm" />
            <div className="relative aspect-[3/4] bg-zinc-950 border-2 border-zinc-800 p-2">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-20">
                <Crosshair className="w-24 h-24 text-amber-500" />
              </div>

              <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                <img
                  src={profileData.photoUrl || "https://github.com/princeraj.png"}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                  style={{
                    filter: 'invert(1) sepia(1) saturate(4) hue-rotate(-15deg) brightness(0.8) contrast(1.1)'
                  }}
                />
                {/* Scanline overlay for extra tactical feel */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.8) 3px)' }} />
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 border border-zinc-800 p-3 font-mono text-xs uppercase text-zinc-400 flex justify-between items-center backdrop-blur-none">
                <span>ID: {profileData.name.replace(/\s+/g, '')}</span>
                <span className="text-amber-500 animate-pulse">STATUS: ACTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Dossier Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 space-y-8 flex flex-col justify-center"
          >
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-none relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <Target className="w-6 h-6 text-amber-500" />
                Operative Summary
              </h3>
              <p className="text-zinc-400 font-mono leading-relaxed mb-6">
                {profileData.summary}
              </p>
            </div>

            {/* Hardware/Software Proficiencies */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-6">
                <h4 className="text-amber-500 font-bold uppercase mb-4 text-sm font-mono tracking-widest">Base of Operations</h4>
                <div className="space-y-2 font-mono text-sm text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">LOCATION</span>
                    <span>India</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">SPECIALTY</span>
                    <span>FULL-STACK DEV</span>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6">
                <h4 className="text-amber-500 font-bold uppercase mb-4 text-sm font-mono tracking-widest">Current Objective</h4>
                <p className="font-mono text-sm text-zinc-300">
                  Seeking high-impact missions to deploy advanced web technologies and tactical problem-solving.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
