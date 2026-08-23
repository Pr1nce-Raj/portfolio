import { Achievement } from '../types';

export const achievements: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first_landing', name: 'First Landing', description: 'Welcome aboard! You visited the portfolio.', xp: 10, icon: '🏠' },
  { id: 'story_reader', name: 'Story Reader', description: 'Read the About section.', xp: 20, icon: '📖' },
  { id: 'skill_scanner', name: 'Skill Scanner', description: 'Explored the Skills section.', xp: 20, icon: '🛠️' },
  { id: 'project_explorer', name: 'Project Explorer', description: 'Checked out the Projects.', xp: 30, icon: '📂' },
  { id: 'social_butterfly', name: 'Social Butterfly', description: 'Found the Contact section.', xp: 25, icon: '💬' },
  { id: 'game_on', name: 'Game On', description: 'Played the typing mini-game.', xp: 50, icon: '🎮' },
  { id: 'terminal_hacker', name: 'Terminal Hacker', description: 'Ran 5 commands in the terminal.', xp: 100, icon: '💻' },
  { id: 'easter_egg_hunter', name: 'Easter Egg Hunter', description: 'Found the Konami Code secret!', xp: 250, icon: '🥚' },
  { id: 'night_owl', name: 'Night Owl', description: 'Toggled the theme.', xp: 15, icon: '🌙' },
  { id: 'sound_check', name: 'Sound Check', description: 'Enabled sound effects.', xp: 10, icon: '🔊' }
];
