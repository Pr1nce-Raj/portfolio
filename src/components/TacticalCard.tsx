import React from 'react';
import { motion } from 'motion/react';

interface TacticalCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TacticalCard: React.FC<TacticalCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={`bg-zinc-900 border border-zinc-800 p-6 rounded-none hover:border-l-2 hover:border-l-amber-500 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};
