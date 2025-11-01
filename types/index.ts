export type Theme = 'empire' | 'jedi' | 'outerrim' | 'hyperspace';

export interface ThemeConfig {
  name: string;
  icon: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    cardBg: string;
    chatBubbleAI: string;
    chatBubbleUser: string;
    border: string;
  };
  gradient: string;
  buttonGradient: string;
  textGradient: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: string[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
}


