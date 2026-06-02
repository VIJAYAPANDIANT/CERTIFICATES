export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  category: 'Internships' | 'Hackathons' | 'Courses' | 'Workshops' | 'Competitions' | 'Badges';
  subCategory: string;
  issueDate: string;
  credentialId?: string;
  skills: string[];
  description: string;
  url?: string;
  image?: string; // Scan of physical/digital certificate file
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'; // For badges
  place?: string; // For hackathons/competitions, e.g., '1st Place', 'Winner', 'Runner-up', 'Participation'
  projectTitle?: string; // For hackathons
  projectUrl?: string; // For hackathons
  teamSize?: number; // For hackathons
  badgeIcon?: string; // Icon identifier for badges
}

export const achievementsData: Achievement[] = [
  // ─── INTERNSHIPS ───────────────────────────────────────────────────────────
  {
    id: 'internship-zero2site',
    title: 'Cloud Development Intern',
    issuer: 'Zero2site',
    category: 'Internships',
    subCategory: 'Online Internships',
    issueDate: '2025-06-28',
    credentialId: 'Z2S-CLOUD-2025',
    skills: ['Cloud Development', 'Client Demo Projects', 'API Configurations', 'Software Engineering'],
    description: 'Successfully completed a 1-month Internship in the field of Cloud Development from May 15, 2025 to June 15, 2025. Actively engaged in diverse tasks and played a pivot role in a client demo project.',
    url: 'https://www.zero2site.in',
    image: '/certificates/zero2site_internship.jpg'
  },
  {
    id: 'internship-cognifyz',
    title: 'Java Development Intern',
    issuer: 'Cognifyz Technologies',
    category: 'Internships',
    subCategory: 'Online Internships',
    issueDate: '2025-09-29',
    credentialId: 'CTI/A1/C208788',
    skills: ['Java Development', 'Core Java', 'Problem Solving', 'Communication'],
    description: 'Served as a Java Development Intern from August 2025 to September 2025. Displayed remarkable dedication, sincerity, and exceptional coordination and communication skills.',
    url: 'https://www.cognifyz.com',
    image: '/certificates/cognifyz_internship.jpg'
  },
  {
    id: 'internship-novitech-da',
    title: 'Data Analytics Intern',
    issuer: 'NoviTech R&D Private Limited',
    category: 'Internships',
    subCategory: 'Offline Internships',
    issueDate: '2025-09-28',
    credentialId: 'DAIN12477',
    skills: ['Data Analytics', 'Statistical Analysis', 'Data Visualizations'],
    description: 'Successfully completed a one month internship in Data Analytics from August 28th to September 28th 2025 at NoviTech R&D Private Limited, Coimbatore.',
    url: 'https://www.novitechrd.com',
    image: '/certificates/novitech_data_analytics.jpg'
  },
  {
    id: 'internship-novitech-ml',
    title: 'Machine Learning Intern',
    issuer: 'NoviTech R&D Private Limited',
    category: 'Internships',
    subCategory: 'Offline Internships',
    issueDate: '2025-11-30',
    credentialId: 'MLIN8451',
    skills: ['Machine Learning', 'Model Training', 'Predictive Analytics'],
    description: 'Successfully completed a one month internship in Machine Learning from November 1, 2025 to November 30, 2025 at NoviTech R&D Private Limited, Coimbatore.',
    url: 'https://www.novitechrd.com',
    image: '/certificates/novitech_machine_learning.jpg'
  }
];
