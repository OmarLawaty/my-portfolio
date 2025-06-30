'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { PersonalInfo } from '@/const';

import { Link } from '../Link';

interface Page {
  title: string;
  href: string;
}

const pages: Page[] = [
  { title: PersonalInfo.name, href: '/' },
  { title: 'Experience', href: '/experience' },
  { title: 'Projects', href: '/projects' },
];

export const PageIndicator = () => {
  const [pillStyles, setPillStyles] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const activeLinkIndex = pages.findIndex(page => page.href === pathname);

    const activeLinkElement = linkRefs.current[activeLinkIndex];
    if (!activeLinkElement) return;

    const parentElement = activeLinkElement.parentElement;
    if (!parentElement) return;

    const { left, width } = activeLinkElement.getBoundingClientRect();
    const headerLeft = parentElement.getBoundingClientRect().left;
    setPillStyles({ left: left - headerLeft, width });
  }, [pathname]);

  return (
    <Flex gap='4' pos='relative'>
      {pages.map((page, i) => (
        <Link
          key={i}
          href={page.href}
          prefetch
          px='3'
          py='1'
          whiteSpace='nowrap'
          userSelect='none'
          transition='color 0.3s'
          color={pathname === page.href ? 'white' : 'purple.300'}
          _hover={{ color: pathname !== page.href ? 'purple.200' : 'white' }}
          ref={el => {
            linkRefs.current[i] = el;
          }}
        >
          <Text pos='relative' zIndex='1' fontWeight='600'>
            {page.title}
          </Text>
        </Link>
      ))}

      <AnimatedBox
        pos='absolute'
        insetY='-0.5'
        rounded='full'
        bg='purple.300'
        initial={false}
        animate={pillStyles}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </Flex>
  );
};

const AnimatedBox = motion.create(Box);
