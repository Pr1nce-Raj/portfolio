import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../utils/audioEngine';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const SpacetimeRipple: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't spawn ripples if clicking on an interactive element
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        return;
      }

      // Play the requested water droplet sound
      audio.playDroplet();

      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);

      // Clean up the ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, scale: 0, borderWidth: '2px' }}
            animate={{ opacity: 0, scale: 2, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-3 h-3 rounded-full border-amber-500/50 backdrop-blur-md shadow-[0_0_5px_rgba(245,158,11,0.5)]"
            style={{ 
              left: ripple.x, 
              top: ripple.y, 
              marginTop: '-6px', 
              marginLeft: '-6px' 
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
