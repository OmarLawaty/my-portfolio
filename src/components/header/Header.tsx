'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { recipes } from '@/theme/recipes';

import { ContactLinks } from '../ContactLinks';
import { PageIndicator } from './PageIndicator';

const compactHeaderScrollThreshold = 150;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > compactHeaderScrollThreshold);

    const onScroll = () => {
      setIsScrolled(window.scrollY > compactHeaderScrollThreshold);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Box h='16' pos='sticky' zIndex='1000' top={recipes.container.base?.py}>
      <AnimatedFlex
        as='header'
        minH='16'
        bg='rgba(33, 31, 35, 0.35)'
        rounded='full'
        align='center'
        justify='space-between'
        p='4'
        pe='5'
        gap='6'
        overflow='hidden'
        backdropFilter='blur(20px)'
        mx='auto'
        maxW={recipes.container.base?.maxW}
        w='fit'
        animate={{ minWidth: isScrolled ? '0' : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <PageIndicator />

        <ContactLinks />
      </AnimatedFlex>
    </Box>
  );
};

const AnimatedFlex = motion.create(Flex);
