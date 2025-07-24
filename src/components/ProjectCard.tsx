'use client';

import { Box, Flex, Text, type BoxProps } from '@chakra-ui/react';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { GoLinkExternal, GoRepo } from 'react-icons/go';

import type { Repository } from '@/apis';

import { Link } from './Link';

interface ProjectCardProps extends ComponentProps<typeof AnimatedFlex> {
  repo: Repository;
  overlayProps?: BoxProps;
}

export const ProjectCard = ({ repo, overlayProps, ...props }: ProjectCardProps) => (
  <AnimatedFlex
    flexDir='column'
    p={[4, 5, 6]}
    gap='2'
    maxW={['20rem', '24rem', '27.5rem']}
    minW='fit'
    rounded='1rem'
    borderColor='#3d444d'
    borderWidth='1px'
    h='min'
    pos='relative'
    bgColor='gray.900'
    {...props}
  >
    <Flex align='center' gap='2' fontSize={['0.875rem', '1rem', '1.125rem']}>
      <GoRepo />

      <Link
        href={repo.url}
        target='_blank'
        color='#4493f8'
        fontWeight='600'
        fontSize={['0.75rem', '0.875rem', '1rem']}
        _hover={{ textDecoration: 'underline' }}
      >
        {repo.name}
      </Link>
    </Flex>

    <Text fontSize={['0.75rem', null, '0.875rem']}>{repo.description}</Text>

    <Flex align='center' gap='2.5' fontSize={['0.75rem', null, '0.875rem']}>
      <GoLinkExternal />

      <Link href={repo.homepageUrl} target='_blank' color='purple.200' fontWeight='600'>
        Live Preview
      </Link>
    </Flex>

    <Box pos='absolute' inset='0' cursor='pointer' visibility='hidden' {...overlayProps} />
  </AnimatedFlex>
);

const AnimatedFlex = motion.create(Flex);
