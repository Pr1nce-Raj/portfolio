import { useEffect, useRef } from 'react';
import { useGameStore } from '../store';

export function useSectionTracker(sectionId: string, achievementId?: string) {
  const ref = useRef<HTMLElement | null>(null);
  const visitSection = useGameStore((state) => state.visitSection);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          visitSection(sectionId);
          if (achievementId) {
            unlockAchievement(achievementId);
          }
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [sectionId, achievementId, visitSection, unlockAchievement]);

  return ref;
}
