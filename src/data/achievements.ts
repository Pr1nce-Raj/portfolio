import { Achievement } from '../types';

export const achievements: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first_landing', name: 'First Landing', description: 'Welcome aboard! Initialized the profile.', xp: 10, icon: '🏠' },
  { id: 'profile_unlocked', name: 'Profile Unlocked', description: 'Accessed the operative profile.', xp: 20, icon: '📖' },
  { id: 'loadout_inspected', name: 'Loadout Inspected', description: 'Explored technical proficiencies.', xp: 20, icon: '🛠️' },
  { id: 'missions_reviewed', name: 'Missions Reviewed', description: 'Checked out the campaign logs.', xp: 30, icon: '📂' },
  { id: 'offduty_scanned', name: 'Off-Duty Scanned', description: 'Found the gaming records.', xp: 20, icon: '🎮' },
  { id: 'comms_established', name: 'Comms Established', description: 'Reached the secure communications footer.', xp: 20, icon: '💬' },
  { id: 'night_owl', name: 'Bravo Six', description: 'Going dark. Activated Night Vision mode.', xp: 50, icon: '🌙' },
  { id: 'terminal_hacker', name: 'Terminal Hacker', description: 'Gained root access via the hidden terminal.', xp: 250, icon: '💻' }
];
