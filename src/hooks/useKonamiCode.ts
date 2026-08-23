import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setSequence((prev) => {
        const nextSequence = [...prev, key];
        
        const isMatch = nextSequence.every((k, i) => k === KONAMI_CODE[i]);

        if (!isMatch) {
          return key === KONAMI_CODE[0] ? [key] : [];
        }

        if (nextSequence.length === KONAMI_CODE.length) {
          callback();
          return [];
        }

        return nextSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}
