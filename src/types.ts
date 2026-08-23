export interface Skill {
  name: string;
  percentage: number;
  color: string;
  iconName?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  status?: 'ACCOMPLISHED' | 'IN PROGRESS';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xp: number;
  icon: string;
  unlockedAt?: Date;
}

export interface HobbyItem {
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  discord: string;
  linkedin: string;
  github: string;
  leetcode: string;
  credly: string;
  photoUrl: string;
  photoFullUrl: string;
  summary: string;
  taglines: string[];
  education: Education[];
}

export interface TerminalCommand {
  name: string;
  description: string;
  handler: (args?: string[]) => string;
}

export interface GameState {
  xp: number;
  level: number;
  achievements: string[];
  visitedSections: string[];
  terminalCommandsRun: number;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}
