import { Nunito, Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export const fonts = [raleway, nunito];
