'use client';

import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { recipes } from '@/theme/recipes';

import { ContactLinks } from '../ContactLinks';
import { PageIndicator } from './PageIndicator';

const compactHeaderScrollThreshold = 150;
const getInsetX = (index: number) =>
  Array.isArray(recipes.container.base?.px) ? recipes.container.base?.px[index] : '0';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile] = useMediaQuery(['(max-width: 540px)']);

  console.log('isMobile', isMobile);

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
    <Box h={[12, null, 16]} pos='sticky' zIndex='1000' top={recipes.container.base?.py}>
      <AnimatedFlex
        as='header'
        minH={[12, null, 16]}
        bg='rgba(33, 31, 35, 0.35)'
        rounded='full'
        align='center'
        justify='space-between'
        p={[3, null, 4]}
        pe={[3, null, 5]}
        gap={[1, 2, 4, 5, 6]}
        overflow='hidden'
        backdropFilter='blur(20px)'
        pos={['fixed', 'static']}
        mx='auto'
        maxW={recipes.container.base?.maxW}
        w={['unset', 'fit']}
        minW={['unset', 'fit']}
        insetX={[getInsetX(0), 'unset']}
        animate={isMobile ? { top: isScrolled ? '90vh' : '2rem' } : { minWidth: isScrolled ? '0' : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <PageIndicator />

        <ContactLinks display={['none', 'flex']} />
      </AnimatedFlex>
    </Box>
  );
};

const AnimatedFlex = motion.create(Flex);
