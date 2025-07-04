export interface Config {
  technologies: Technology[];
  skills: Skills[];
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
