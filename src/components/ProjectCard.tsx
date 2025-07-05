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
    p='6'
    gap='2'
    maxW='27.5rem'
    minW='fit'
    rounded='1rem'
    borderColor='#3d444d'
    borderWidth='1px'
    h='min'
    pos='relative'
    {...props}
  >
    <Flex align='center' gap='2'>
      <GoRepo size='1.125rem' />

      <Link
        href={repo.url}
        target='_blank'
        color='#4493f8'
        fontWeight='600'
        fontSize='1rem'
        _hover={{ textDecoration: 'underline' }}
      >
        {repo.name}
      </Link>
    </Flex>

    <Text fontSize='0.875rem'>{repo.description}</Text>

    <Flex align='center' gap='2.5'>
      <GoLinkExternal size='0.875rem' />

      <Link href={repo.homepageUrl} target='_blank' fontSize='0.875rem' color='purple.200' fontWeight='600'>
        Live Preview
      </Link>
    </Flex>

    <Box pos='absolute' inset='0' cursor='pointer' visibility='hidden' {...overlayProps} />
  </AnimatedFlex>
);

const AnimatedFlex = motion.create(Flex);
