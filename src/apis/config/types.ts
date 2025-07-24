export interface Config {
  technologies: Technology[];
  skills: Skills[];
  work: Work[];
  certifications: Certification[];
  education: Education[];
}

export interface Technology {
  name: string;
  color: string;
  url: string;
}

export interface Skills {
  category: string;
  skills: string[];
}

export interface Work {
  title: string;
  role: string;
  location: 'remote' | 'on-site';
  startDate: string;
  endDate?: string;
  type: 'part-time' | 'full-time' | 'internship' | 'freelance' | 'contract';
  description: string;
  tech: string[];
  responsibilities: string[];
}

export interface Certification {
  title: string;
  authority: string;
  date: string;
  link: string;
}

export interface Education {
  title: string;
  location: string;
  authority: string;
  startDate: string;
  endDate: string;
  type: 'bachelor' | 'master' | 'phd';
}
