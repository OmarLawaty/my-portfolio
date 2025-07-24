'use client';

import { Box, Flex, Text, type FlexProps } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { AnimatedLink, Image } from '@/components';
import { constructTechnologyIconURL, lightenColor } from '@/utils/helpers';
import { useConfigQuery, useSlider } from '@/hooks';

export const Slider = (props: FlexProps) => {
  const { scrollContainerRef, scrollIntoView, activeSlide } = useSlider();
  const configQuery = useConfigQuery();

  if (!configQuery.isSuccess) return null;

  return (
    <Flex flexDir='column' gap='6' w='full' maxW='100%' overflowX='hidden' {...props}>
      <Flex
        ref={scrollContainerRef}
        gap='10'
        scrollSnapType='inline mandatory'
        overflow='auto'
        scrollPaddingX='4'
        ps={['10vw', null, 4]}
        pe={['10vw', null, '25rem']}
        py='6'
        overscrollBehaviorInline='contain'
        scrollBehavior='smooth'
        pos='relative'
        scrollbar='hidden'
        css={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        {configQuery.data.technologies.map(tech => (
          <AnimatedLink
            key={tech.name}
            href={tech.url}
            target='_blank'
            display='flex'
            flexDir='column'
            justifyContent='center'
            p='12'
            gap='2.5'
            bg={lightenColor(tech.color, 0.4)}
            rounded='3.75rem'
            minW={['80vw', '25.5rem']}
            minH='72'
            scrollSnapAlign='center'
            transform='scale(1)'
            whileHover={{ transform: 'scale(1.05)', boxShadow: `0 0 1rem 0.25rem ${lightenColor(tech.color, 0.3)}` }}
            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
          >
            <Image src={constructTechnologyIconURL(tech.name)} alt={`${tech.name} icon`} width={60} height={60} />

            <Text fontSize='1.625rem' fontWeight='700' color='gray.700'>
              {tech.name}
            </Text>
          </AnimatedLink>
        ))}
      </Flex>

      <Flex gap='1.5' mx='auto'>
        {configQuery.data.technologies.map((tech, index) => (
          <IndicatorDot key={tech.name} isActive={index === activeSlide} onClick={() => scrollIntoView(index)} />
        ))}
      </Flex>
    </Flex>
  );
};

interface IndicatorDotProps {
  isActive: boolean;
  onClick?: () => void;
}

const IndicatorDot = ({ isActive, ...props }: IndicatorDotProps) => (
  <AnimatedBox
    h='3.5'
    rounded='full'
    data-cursor='interactive'
    whileHover={{
      opacity: isActive ? 1 : 0.8,
    }}
    animate={{
      width: isActive ? '4rem' : '1.25rem',
      backgroundColor: isActive ? '#D9D9D9' : '#606060',
    }}
    transition={{ type: 'spring', stiffness: 400, damping: 30, opacity: { duration: 0.5 } }}
    {...props}
  />
);

const AnimatedBox = motion.create(Box);
