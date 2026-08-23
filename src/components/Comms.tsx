import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Radio, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useSectionTracker } from '../hooks/useSectionTracker';

export const Comms: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSectionTracker('contact', 'comms_established');

  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="comms" className="py-24 bg-zinc-950 border-t border-zinc-900 relative" ref={ref}>
      {/* Background warning pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-col justify-between overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-1 bg-amber-500 w-full transform -skew-x-12 translate-x-1/4 scale-150" />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <Radio className="w-8 h-8 text-amber-500" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Secure Comms // <span className="text-zinc-600">Contact</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-8 relative"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500" />

            <div className="mb-8 p-4 bg-zinc-950 border border-zinc-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-amber-500 font-bold uppercase text-sm mb-1">Encrypted Channel Open</div>
                <div className="text-zinc-400 font-mono text-xs">Awaiting transmission payload. All data is end-to-end encrypted.</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-zinc-500 font-mono text-xs font-bold uppercase">Operative Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono rounded-none"
                    placeholder="ENTER ALIAS"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-zinc-500 font-mono text-xs font-bold uppercase">Comm Link (Email)</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono rounded-none"
                    placeholder="ENTER COMM LINK"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-zinc-500 font-mono text-xs font-bold uppercase">Payload (Message)</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono rounded-none resize-none"
                  placeholder="ENTER TRANSMISSION DATA..."
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-black text-lg uppercase py-4 flex items-center justify-center gap-3 transition-colors rounded-none"
              >
                {formState === 'idle' && (
                  <>
                    Transmit Data
                    <Send className="w-5 h-5" />
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    <span className="animate-pulse">Encrypting & Sending...</span>
                  </>
                )}
                {formState === 'success' && (
                  <>
                    Transmission Received
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
