import { useEffect, useState } from 'react';

const SECRET_CODE = ['<', 't', 'e', 'r', 'm', 'i', 'n', 'a', 'l', '>'];

export function useSecretCode(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore input if user is typing in a form field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      
      const key = e.key.toLowerCase();
      
      // Ignore modifier keys so holding shift for < and > doesn't break the sequence
      if (['shift', 'control', 'alt', 'meta', 'capslock'].includes(key)) {
        return;
      }

      setSequence((prev) => {
        const nextSequence = [...prev, key];
        
        // We compare using toLowerCase just to be safe, but `<` and `>` are explicitly checked
        const expectedKey = SECRET_CODE[nextSequence.length - 1];
        
        if (key !== expectedKey) {
          // If they mess up, check if the current key is the start of the sequence
          return key === SECRET_CODE[0] ? [key] : [];
        }

        if (nextSequence.length === SECRET_CODE.length) {
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
