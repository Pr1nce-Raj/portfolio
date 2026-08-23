import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';

interface EntryScreenProps {
  onEnter: () => void;
}

const EN_MSG = { main: "SIGNAL ENCRYPTED", sub: "> CLICK ANYWHERE TO DECRYPT_" };

const MESSAGES = [
  EN_MSG,
  { main: "SEÑAL ENCRIPTADA", sub: "> HAGA CLIC PARA DESCIFRAR_" },
  EN_MSG,
  { main: "信号暗号化", sub: "> クリックして復号化_" },
  EN_MSG,
  { main: "СИГНАЛ ЗАШИФРОВАН", sub: "> ЩЕЛКНИТЕ ДЛЯ РАСШИФРОВКИ_" },
  EN_MSG,
  { main: "信号加密", sub: "> 点击任意位置解密_" }
];

export const EntryScreen: React.FC<EntryScreenProps> = ({ onEnter }) => {
  const [isDestroying, setIsDestroying] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (isDestroying) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1800); // Increased speed slightly to 1.8s
    return () => clearInterval(interval);
  }, [isDestroying]);

  const handleClick = () => {
    if (isDestroying) return;
    setIsDestroying(true);
    
    // Slight delay to allow the "destroy" animation to play out
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  const currentMsg = MESSAGES[msgIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden cursor-crosshair"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isDestroying ? 0 : 1,
        scale: isDestroying ? 1.5 : 1,
        filter: isDestroying ? 'blur(20px) brightness(2)' : 'blur(0px) brightness(1)'
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onClick={handleClick}
      style={{
        background: 'radial-gradient(circle at center, #18181b 0%, #000000 100%)'
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className={`relative z-10 flex flex-col items-center gap-8 ${isDestroying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      >
        <div className="p-6 border-2 border-amber-500 bg-amber-500/10 rounded-full animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <Terminal className="w-16 h-16 text-amber-500" />
        </div>
        
        <div className="text-center flex flex-col gap-4 min-h-[140px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-4xl md:text-6xl font-black oswald text-zinc-100 tracking-[0.2em] uppercase drop-shadow-2xl">
                {currentMsg.main}
              </h1>
              <div>
                <p className="font-mono text-amber-500 tracking-widest text-sm md:text-lg bg-zinc-950/50 inline-block px-4 py-2 border border-amber-500/30">
                  {currentMsg.sub}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Aggressive Glitch Overlay during destruction */}
      <AnimatePresence>
        {isDestroying && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.2, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
              className="absolute inset-0 bg-amber-500 mix-blend-overlay z-20 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white z-30 pointer-events-none mix-blend-screen"
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
