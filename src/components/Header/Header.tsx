'use client';

import { motion } from 'motion/react';
import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import { PersonalInfo } from '@/const';

import { ContactLinks } from '../ContactLinks';
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

export const Header = () => {
  const pathname = usePathname();

  return (
    <Flex
      as='header'
      minH='16'
      bg='rgba(33, 31, 35, 0.35)'
      w='fit'
      rounded='full'
      align='center'
      p='4'
      pe='5'
      gap='6'
      mx='auto'
    >
      <Flex gap='4'>
        {pages.map((page, i) => (
          <Link
            key={i}
            href={page.href}
            pos='relative'
            color={pathname === page.href ? 'white' : 'purple.300'}
            px='3'
            py='1'
            userSelect='none'
            transition='color 0.3s'
            _hover={{ color: pathname !== page.href ? 'purple.200' : 'white' }}
            layout
            prefetch
          >
            {pathname === page.href && (
              <AnimatedBox layoutId='background' bg='purple.300' pos='absolute' inset='-0.5' rounded='full' />
            )}

            <Box pos='relative' zIndex='1' fontWeight='600'>
              {page.title}
            </Box>
          </Link>
        ))}
      </Flex>

      <ContactLinks />
    </Flex>
  );
};

const AnimatedBox = motion.create(Box);
