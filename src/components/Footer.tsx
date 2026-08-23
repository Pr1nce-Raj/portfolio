import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText(profileData.discord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-zinc-900 pb-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="oswald text-2xl font-black text-white uppercase tracking-widest mb-2">Secure Channel</h3>
            <p className="font-mono text-zinc-500 text-sm">Direct communications and external links.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href={`mailto:${profileData.email}`} target="_top" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 group cursor-pointer">
              <Mail className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
              <span className="font-mono text-xs hidden sm:inline">MAIL</span>
            </a>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
              <Github className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
              <span className="font-mono text-xs hidden sm:inline">GitHub</span>
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
              <Linkedin className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
              <span className="font-mono text-xs hidden sm:inline">LinkedIn</span>
            </a>
            <button 
              onClick={copyDiscord}
              className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 group cursor-pointer" 
              title="Copy Discord Username"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500 group-hover:scale-125 transition-all duration-300" />
              ) : (
                <MessageSquare className="w-4 h-4 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-300" />
              )}
              <span className={`font-mono text-xs hidden sm:inline ${copied ? 'text-green-500 font-bold' : ''}`}>
                {copied ? 'ID COPIED!' : 'DISCORD'}
              </span>
            </button>
          </div>
        </div>
        
        <p className="oswald text-zinc-600 text-xs tracking-widest font-bold text-center">
          END OF REPORT // {new Date().getFullYear()} {profileData.name.toUpperCase()} // ALL SYSTEMS NOMINAL
        </p>
      </div>
      
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    </footer>
  );
};
