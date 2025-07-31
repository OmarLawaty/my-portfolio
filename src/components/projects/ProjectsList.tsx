'use client';

import { Flex } from '@chakra-ui/react';

import { useReposQuery } from '@/hooks';

import { ProjectCard } from '../ProjectCard';

export const ProjectsList = () => {
  const reposQuery = useReposQuery({ limit: 100 });

  if (!reposQuery.isSuccess) return null;

  return (
    <Flex as='section' wrap='wrap' gap='10'>
      {reposQuery.data.map(repo => (
        <ProjectCard
          key={repo.name}
          repo={repo}
          flex='1 1 30rem'
          whileHover={{ scale: 1.05, boxShadow: '0 0 2rem rgba(255, 255, 255, 0.2)' }}
          transition={{ scale: { duration: 0.5, ease: 'easeInOut' }, boxShadow: { duration: 0.2, ease: 'easeInOut' } }}
          minW='auto'
          maxW='unset'
        />
      ))}
    </Flex>
  );
};
