'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { getIsPageActive } from '@/helpers';
import { Page } from '@/types';

import { Link } from '../Link';

interface PageIndicatorProps extends FlexProps {
  pages: Page[];
}

export const PageIndicator = ({ pages, ...props }: PageIndicatorProps) => {
  const [pillStyles, setPillStyles] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const activeLinkIndex = pages.findIndex(page => getIsPageActive(page.href, pathname, page.isBase));

    const activeLinkElement = linkRefs.current[activeLinkIndex];
    if (!activeLinkElement) return;

    const parentElement = activeLinkElement.parentElement;
    if (!parentElement) return;

    const { left, width } = activeLinkElement.getBoundingClientRect();
    const headerLeft = parentElement.getBoundingClientRect().left;
    setPillStyles({ left: left - headerLeft, width });
  }, [pages, pathname]);

  return (
    <Flex w={['full', 'min-content']} justify='space-between' gap={[0, 2, 4]} pos='relative' {...props}>
      {pages.map((page, i) => (
        <Link
          key={i}
          href={page.href}
          prefetch
          px={[2, 1.5, 3]}
          py={[1, 0.5, 1]}
          whiteSpace='nowrap'
          userSelect='none'
          transition='color 0.3s'
          color={getIsPageActive(page.href, pathname, page.isBase) ? 'white' : 'purple.400'}
          _hover={{ color: getIsPageActive(page.href, pathname, page.isBase) ? 'white' : 'purple.200' }}
          ref={el => {
            linkRefs.current[i] = el;
          }}
        >
          <Text
            pos='relative'
            fontSize={['clamp(0.7rem, 4vw, 1rem)', '0.875rem', '1rem']}
            zIndex='1'
            fontWeight='600'
            textTransform='capitalize'
          >
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
