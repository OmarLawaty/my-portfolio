import { PersonalInfo, RepoFields } from './const';
import { Page } from './types';

export const pages: Page[] = [
  { title: PersonalInfo.name, href: '/', isBase: true },
  { title: 'Experience', href: '/experience' },
  { title: 'Projects', href: '/projects' },
];

export const projectsPages: Page[] = [
  {
    title: 'all',
    href: '/projects',
    isBase: true,
  },
  ...RepoFields.map(field => ({
    title: field,
    href: `/projects/${field}`,
  })),
];
