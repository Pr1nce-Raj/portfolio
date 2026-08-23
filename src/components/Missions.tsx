import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, ExternalLink, Github } from 'lucide-react';
import { projects as projectsData } from '../data/projects';
import { useSectionTracker } from '../hooks/useSectionTracker';
import { TacticalCard } from './TacticalCard';

export const Missions: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSectionTracker('projects');

  return (
    <section id="missions" className="py-24 bg-zinc-950 border-t border-zinc-900" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <Target className="w-8 h-8 text-amber-500" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Campaign Logs // <span className="text-zinc-600">Missions</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project: any, idx: number) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: idx * 0.15 }}
            >
              <TacticalCard className="h-full flex flex-col group relative">
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.emoji}</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 uppercase border ${project.status === 'ACCOMPLISHED' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-zinc-800/50 border-zinc-700 text-zinc-400'}`}>
                    {project.status || 'ACCOMPLISHED'}
                  </span>
                </div>

                <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag: any, i: number) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-mono font-bold text-zinc-500 border border-zinc-800 px-2 py-1 uppercase tracking-wider bg-zinc-950"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-zinc-800/50 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs font-bold uppercase transition-colors group"
                    >
                      <Github className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
                      View Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-mono text-xs font-bold uppercase transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
                      Deploy Target
                    </a>
                  )}
                </div>
              </TacticalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
