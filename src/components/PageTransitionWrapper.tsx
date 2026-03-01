'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { getIsPageActive } from '@/helpers';
import { Page } from '@/types';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  pages: Page[];
}

const previousTransitionKeys = new Map<string, string>();

export const PageTransitionWrapper = ({ children, pages }: PageTransitionWrapperProps) => {
  const pathname = usePathname();

  const transitionKey = getTransitionKey(pathname, pages);
  const scopeKey = pages.map(page => page.href).join('|');
  const previousKey = previousTransitionKeys.get(scopeKey) ?? transitionKey;

  const direction = getTransitionDirection(previousKey, transitionKey, pages);

  useLayoutEffect(() => {
    previousTransitionKeys.set(scopeKey, transitionKey);
  }, [scopeKey, transitionKey]);

  return (
    <AnimatePresence mode='wait' custom={direction}>
      <motion.div
        key={transitionKey}
        custom={direction}
        initial='enter'
        animate='center'
        exit='exit'
        variants={pageVariants}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const getTransitionKey = (pathname: string, pages?: Page[]) => {
  if (!pages?.length) return pathname;

  const activePage = pages.find(page => getIsPageActive(page.href, pathname, page.isBase));

  return activePage?.href ?? pathname;
};

const getTransitionDirection = (previousPath: string, currentPath: string, pages?: Page[]) => {
  if (!pages?.length || previousPath === currentPath) return 0;

  const previousIndex = pages.findIndex(page => page.href === previousPath);
  const currentIndex = pages.findIndex(page => page.href === currentPath);

  if (previousIndex === -1 || currentIndex === -1) return 0;

  return currentIndex > previousIndex ? 1 : -1;
};

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? -40 : 40,
  }),
};
