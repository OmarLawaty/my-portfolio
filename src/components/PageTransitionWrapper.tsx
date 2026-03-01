'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { getIsPageActive } from '@/helpers';
import { Page } from '@/types';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  pages?: Page[];
}

export const PageTransitionWrapper = ({ children, pages }: PageTransitionWrapperProps) => {
  const pathname = usePathname();
  const transitionKey = getTransitionKey(pathname, pages);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
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
