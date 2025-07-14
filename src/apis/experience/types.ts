export interface Experience {
  work: Work[];
  certifications: Certifications[];
  education: Education[];
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

export interface Certifications {
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
