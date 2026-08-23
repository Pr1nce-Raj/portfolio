import { useEffect } from 'react';
import { useGameStore } from '../store';

export function useSectionTracker(inView: boolean, sectionId: string, achievementId?: string) {
  const visitSection = useGameStore((state) => state.visitSection);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  useEffect(() => {
    if (inView) {
      visitSection(sectionId);
      if (achievementId) {
        unlockAchievement(achievementId);
      }
    }
  }, [inView, sectionId, achievementId, visitSection, unlockAchievement]);
}
