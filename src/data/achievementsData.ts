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
  },

  // ─── HACKATHONS ────────────────────────────────────────────────────────────
  {
    id: 'hackathon-srm-hackeast',
    title: 'National HackEast Build 2025',
    issuer: 'SRM University',
    category: 'Hackathons',
    subCategory: 'National Level Hackathons',
    issueDate: '2025-07-20',
    skills: ['React', 'Node.js', 'Express', 'TailwindCSS', 'Fast Prototyping'],
    description: 'Secured 1st Place (Winner) for designing and developing a real-time cloud shield orchestration dashboard within a 36-hour sprint.',
    url: 'https://github.com/VIJAYAPANDIANT',
    place: '1st Place (Winner)',
    projectTitle: 'Nebula Cloud Shield',
    projectUrl: 'https://github.com/VIJAYAPANDIANT',
    teamSize: 4
  },
  {
    id: 'hackathon-cyberhack',
    title: 'SRM CyberHack 2025',
    issuer: 'SRM Easwari Engineering College',
    category: 'Hackathons',
    subCategory: 'Institutional Hackathons',
    issueDate: '2025-10-15',
    skills: ['Next.js', 'Firebase Auth', 'Web Crypto API', 'Cybersecurity'],
    description: 'Awarded 2nd Place (Runner-up) for creating a futuristic identity management tool with decentralized encryption capabilities.',
    url: 'https://github.com/VIJAYAPANDIANT',
    place: '2nd Place (Runner-up)',
    projectTitle: 'Cosmic Guard ID',
    projectUrl: 'https://github.com/VIJAYAPANDIANT',
    teamSize: 3
  },

  // ─── COURSES ───────────────────────────────────────────────────────────────
  {
    id: 'course-google-gcp',
    title: 'Google Cloud Platform Architecting Specialization',
    issuer: 'Coursera',
    category: 'Courses',
    subCategory: 'Cloud Computing Specializations',
    issueDate: '2025-03-12',
    credentialId: 'GCP-ARCH-8451X',
    skills: ['Google Cloud', 'Compute Engine', 'Cloud Storage', 'Kubernetes Engine'],
    description: 'Successfully completed the Google Cloud Platform Architecture specialization covering virtual networks, cloud identities, deployment automation, and load balancing.',
    url: 'https://www.coursera.org'
  },
  {
    id: 'course-azure-fundamentals',
    title: 'Microsoft Azure AZ-900 Certification Preparation',
    issuer: 'Udemy',
    category: 'Courses',
    subCategory: 'Cloud Certifications',
    issueDate: '2025-05-18',
    credentialId: 'UC-948ef1b2',
    skills: ['Azure Services', 'Cloud Concepts', 'Cloud Security', 'Azure Resources'],
    description: 'Completed AZ-900 cloud fundamentals preparation course covering core Azure architectural models, database engines, security protocols, and governance standards.',
    url: 'https://www.udemy.com'
  },
  {
    id: 'course-advanced-ml',
    title: 'Advanced Machine Learning and Deep Learning Specialization',
    issuer: 'Coursera',
    category: 'Courses',
    subCategory: 'AI & Data Science Specializations',
    issueDate: '2025-08-25',
    credentialId: 'AML-DL-7729',
    skills: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'Computer Vision'],
    description: 'Gained expertise in multi-layer deep neural networks, CNNs, RNNs, backpropagation networks, and generative models using TensorFlow/Keras framework.',
    url: 'https://www.coursera.org'
  },

  // ─── WORKSHOPS ─────────────────────────────────────────────────────────────
  {
    id: 'workshop-genai',
    title: 'Generative AI Boot Camp',
    issuer: 'SRM Easwari Engineering College',
    category: 'Workshops',
    subCategory: 'Generative AI & LLMs',
    issueDate: '2025-04-10',
    skills: ['Generative AI', 'Large Language Models', 'LangChain', 'Prompt Engineering'],
    description: 'Attended a comprehensive 3-day bootcamp focused on building custom LLM agents using LangChain frameworks, vector databases, and prompt refinement matrices.',
    url: 'https://srmeaswari.ac.in'
  },
  {
    id: 'workshop-cybersec',
    title: 'Cyber Security Defense Lab Workshop',
    issuer: 'NoviTech R&D Private Limited',
    category: 'Workshops',
    subCategory: 'Network Security',
    issueDate: '2025-10-02',
    skills: ['Penetration Testing', 'Kali Linux', 'Network Auditing', 'Firewall Configurations'],
    description: 'Completed a security auditing masterclass covering packet capture, threat assessment, secure shell auditing, and firewall deployment structures.',
    url: 'https://www.novitechrd.com'
  },

  // ─── COMPETITIONS ──────────────────────────────────────────────────────────
  {
    id: 'comp-codechef-starters',
    title: 'CodeChef Starters 142 Coding Challenge',
    issuer: 'CodeChef',
    category: 'Competitions',
    subCategory: 'Weekly Competitive Programming',
    issueDate: '2025-08-05',
    skills: ['Competitive Coding', 'Algorithms', 'Data Structures', 'C++'],
    description: 'Secured 1st Place (Winner) in Division 3, demonstrating advanced algorithmic execution speed, complexity optimization, and error debugging capabilities.',
    url: 'https://www.codechef.com',
    place: '1st Place (Winner)'
  },
  {
    id: 'comp-gfg-weekly',
    title: 'GeeksforGeeks Weekly Coding Challenge',
    issuer: 'GeeksforGeeks',
    category: 'Competitions',
    subCategory: 'Algorithms & Data Structures Contests',
    issueDate: '2025-11-12',
    skills: ['Algorithms', 'Graphs', 'Dynamic Programming', 'Complexity Auditing'],
    description: 'Achieved an outstanding 5th Rank globally in the GeeksforGeeks algorithm challenge, solving complex dynamic programming and graph recursion structures.',
    url: 'https://www.geeksforgeeks.org',
    place: '5th Rank'
  },

  // ─── BADGES ────────────────────────────────────────────────────────────────
  {
    id: 'badge-leet-knight',
    title: 'Legendary Code Knight Badge',
    issuer: 'LeetCode',
    category: 'Badges',
    subCategory: 'Gamified Programming Achievements',
    issueDate: '2025-09-10',
    skills: ['Problem Solving', 'Algorithmic Mastery', 'Consistent Coding Practice'],
    description: 'Awarded for maintaining a continuous daily problem-solving streak on LeetCode for 50 days, successfully executing complex dynamic structures.',
    rarity: 'legendary',
    badgeIcon: 'knight'
  },
  {
    id: 'badge-hr-gold',
    title: 'Problem Solving 5-Stars Gold Badge',
    issuer: 'HackerRank',
    category: 'Badges',
    subCategory: 'Platform Milestones',
    issueDate: '2025-05-22',
    skills: ['Data Structures', 'String Manipulation', 'Basic & Advanced Algorithms'],
    description: 'Achieved the maximum 5-Stars competency rating in Problem Solving on HackerRank, validating consistent success in algorithmic challenges.',
    rarity: 'epic',
    badgeIcon: 'gold_star'
  },
  {
    id: 'badge-gcp-cloud',
    title: 'Google Cloud GCP Skill Badge',
    issuer: 'Google Cloud',
    category: 'Badges',
    subCategory: 'Cloud Learning Badges',
    issueDate: '2025-04-18',
    skills: ['Google Cloud Services', 'VM Orchestrations', 'Network Firewall Configs'],
    description: 'Unlocked the official Google Cloud infrastructure skill badge verifying competency in virtual machine deployment, network routing, and load balancers.',
    rarity: 'rare',
    badgeIcon: 'gcp_ai'
  }
];
