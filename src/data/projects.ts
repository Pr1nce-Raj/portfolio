import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Study Roadmap Tracker',
    description: 'Engineered and deployed a multi-user study planning application utilizing Vanilla JavaScript and Firebase. Features Google Auth, real-time Firestore syncing, per-user data isolation, and offline localStorage fallback.',
    tags: ['JavaScript', 'Firebase', 'Auth', 'Cloud Sync'],
    liveUrl: 'https://studytracker-ccb52.web.app',
    githubUrl: 'https://github.com/Pr1nce-Raj/Study-roadmap-tracker',
    emoji: '📚',
    status: 'ACCOMPLISHED'
  },
  {
    title: 'Threat Monitor',
    description: 'Python-based cybersecurity tool to actively scan and monitor WiFi and Bluetooth networks for potential vulnerabilities and threats. Features real-time detection and logging.',
    tags: ['Python', 'Cybersecurity', 'Networking'],
    githubUrl: 'https://github.com/Pr1nce-Raj/Threat_monitor',
    emoji: '🛡️',
    status: 'IN PROGRESS'
  },
  {
    title: 'Classroom AI - Monitor',
    description: 'AI-driven classroom engagement tracking system with a Python backend and React dashboard for real-time monitoring. 🥇 ByteHack Winner.',
    tags: ['Python', 'React', 'AI', 'Hackathon'],
    githubUrl: 'https://github.com/Pr1nce-Raj/ClassroomAI-Monitor',
    emoji: '🤖',
    status: 'ACCOMPLISHED'
  },
  {
    title: 'Campus Gigs',
    description: 'Decentralized student gig-economy platform with AI-powered gig descriptions and simulated UPI wallet. 🥇 Science Mela Winner.',
    tags: ['Full-Stack', 'AI', 'Hackathon'],
    githubUrl: 'https://github.com/Adnan9-63/CampusGigs',
    emoji: '💼',
    status: 'ACCOMPLISHED'
  }
];
