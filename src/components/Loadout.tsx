import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Crosshair, Shield, BrainCircuit, ShieldAlert, Coffee } from 'lucide-react';
import { skills as skillsData } from '../data/skills';
import { useSectionTracker } from '../hooks/useSectionTracker';

export const Loadout: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSectionTracker('skills', 'loadout_inspected');

  // Using SimpleIcons for accurate brand logos, themed to Amber-500 (#f59e0b)
  const proficiencies = [
    { name: 'PYTHON_3', iconUrl: 'https://cdn.simpleicons.org/python/f59e0b' },
    { name: 'JAVASCRIPT', iconUrl: 'https://cdn.simpleicons.org/javascript/f59e0b' },
    { name: 'JAVA', icon: Coffee },
    { name: 'C_LANG', iconUrl: 'https://cdn.simpleicons.org/c/f59e0b' },
    { name: 'FIREBASE', iconUrl: 'https://cdn.simpleicons.org/firebase/f59e0b' },
    { name: 'GITHUB', iconUrl: 'https://cdn.simpleicons.org/github/f59e0b' },
    { name: 'LINUX', iconUrl: 'https://cdn.simpleicons.org/linux/f59e0b' },
    { name: 'DSA', icon: BrainCircuit },
    { name: 'NETWORK_SEC', icon: ShieldAlert },
  ];

  return (
    <section id="loadout" className="py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-16 flex items-center gap-4"
        >
          <Crosshair className="w-8 h-8 text-amber-500" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Current <span className="text-zinc-600">Loadout</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-6 relative group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
            
            <div className="flex items-center gap-3 mb-6 pl-2">
              <Shield className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Primary Arsenal</h3>
            </div>

            <div className="space-y-6 pl-2">
              {skillsData.map((skill: any, sIdx: number) => (
                <div key={skill.name} className="space-y-2 overflow-hidden">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-zinc-300 font-bold uppercase">{skill.name}</span>
                    <span className="text-amber-500">LVL {Math.round(skill.percentage / 10)}</span>
                  </div>
                  
                  {/* Tactical Progress Bar */}
                  <div className="h-3 w-full bg-zinc-950 border border-zinc-800 p-[1px] flex">
                    {/* Split into blocks for a tactical look */}
                    {Array.from({ length: 10 }).map((_, i) => {
                      const isActive = i < skill.percentage / 10;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -30, skewX: 20 }}
                          animate={isInView ? { opacity: isActive ? 1 : 0.2, x: 0, skewX: 0 } : { opacity: 0, x: -30, skewX: 20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 + (sIdx * 0.1) + (i * 0.03) }}
                          className={`h-full flex-1 mx-[1px] ${isActive ? 'bg-amber-500' : 'bg-zinc-800'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-6 relative group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
            
            <div className="flex items-center gap-3 mb-6 pl-2">
              <Crosshair className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Tactical Proficiencies</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pl-2 mt-4">
              {proficiencies.map((prof, idx) => (
                <motion.div
                  key={prof.name}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 50 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.3 + (idx * 0.08) }}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-zinc-950 border border-zinc-800 hover:border-amber-500 transition-colors group/item"
                >
                  {prof.iconUrl ? (
                    <img 
                      src={prof.iconUrl} 
                      alt={prof.name} 
                      className="w-8 h-8 opacity-70 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0)] group-hover/item:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" 
                    />
                  ) : prof.icon ? (
                    <prof.icon className="w-8 h-8 text-amber-500/70 group-hover/item:text-amber-400 group-hover/item:scale-125 transition-all duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0)] group-hover/item:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  ) : null}
                  <span className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase group-hover/item:text-amber-500 transition-colors text-center tracking-wider font-bold">
                    {prof.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
