export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function getLevelFromXP(totalXP: number): number {
  let level = 1;
  while (totalXP >= xpForLevel(level)) {
    level++;
  }
  return level;
}

export function getXPProgress(totalXP: number): { level: number; currentXP: number; requiredXP: number; percentage: number } {
  const level = getLevelFromXP(totalXP);
  const xpForCurrentLevel = level === 1 ? 0 : xpForLevel(level - 1);
  const requiredXP = xpForLevel(level);
  const currentXPInLevel = totalXP - xpForCurrentLevel;
  const requiredXPForNextLevel = requiredXP - xpForCurrentLevel;
  const percentage = Math.min(100, Math.max(0, (currentXPInLevel / requiredXPForNextLevel) * 100));

  return { level, currentXP: currentXPInLevel, requiredXP: requiredXPForNextLevel, percentage };
}
