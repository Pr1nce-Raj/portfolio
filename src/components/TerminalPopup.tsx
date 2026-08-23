import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { terminalCommands } from '../data/terminalCommands';

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalPopup: React.FC<TerminalPopupProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<string[]>(['SYS_BOOT...', 'Establishing secure connection...', 'Connection established.', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newHistory = [...history, `guest@portfolio:~$ ${cmd}`];
    
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      onClose();
      setHistory(['SYS_BOOT...', 'Establishing secure connection...', 'Connection established.', 'Type "help" to see available commands.']);
      setInput('');
      return;
    }

    const response = terminalCommands[cmd] || terminalCommands[cmd.toLowerCase()] || `bash: ${cmd}: command not found`;
    
    // Check if it's the date command to run dynamically
    if (cmd === 'date') {
      newHistory.push(new Date().toString());
    } else {
      const lines = response.split('\n');
      newHistory.push(...lines);
    }
    
    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-3xl bg-zinc-950 border-2 border-amber-500/50 clip-angled flex flex-col h-[60vh] shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3 text-amber-500">
                <TerminalIcon className="w-5 h-5" />
                <h2 className="text-sm font-bold font-mono tracking-widest uppercase">root@system // Terminal</h2>
              </div>
              <button onClick={onClose} className="text-zinc-400 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm text-amber-500/90 flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-zinc-950">
              <div className="flex-1">
                {history.map((line, i) => (
                  <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                <span className="text-green-500 font-bold">guest@portfolio:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
