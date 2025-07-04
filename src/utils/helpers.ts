import { storageURL } from '@/const';

export const isClient = () => typeof window !== 'undefined';

export const getSearchParams = () => {
  if (!isClient()) return new URLSearchParams();

  return new URLSearchParams(window.location.search);
};

export const lightenColor = (hex: string, amount: number): string =>
  '#' +
  hex.replace(/^#/, '').replace(/../g, color => {
    const num = parseInt(color, 16);
    const lighter = Math.min(255, Math.floor(num + (255 - num) * amount));

    return lighter.toString(16).padStart(2, '0');
  });

export const constructStorageURL = (path: string) => `${storageURL}/${path}`;

export const constructTechnologyIconURL = (name: string) =>
  constructStorageURL(`technologies/${name.split(' ').join('-').toLowerCase()}.svg`);
