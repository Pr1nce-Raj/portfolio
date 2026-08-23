import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export const NightVisionOverlay: React.FC = () => {
  const { theme } = useGameStore();
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (theme !== 'night_vision') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return (
    <AnimatePresence>
      {theme === 'night_vision' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0.98) 100%)`,
            backdropFilter: 'sepia(1) hue-rotate(90deg) saturate(3)',
          }}
        >
          {/* Scanline overlay specifically for night vision */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,0,0.8) 3px)' }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
