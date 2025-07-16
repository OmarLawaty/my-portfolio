'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';

import { useReposQuery } from '@/hooks';

import { ProjectCard } from '../ProjectCard';

export const ProjectsList = () => {
  const reposQuery = useReposQuery({ limit: 100 });

  if (!reposQuery.isSuccess) return null;

  return (
    <Flex as='section' flexDir='column' gap='16'>
      <Flex as='header' flexDir='column' gap='4' px='4' align='center'>
        <Heading
          as='h1'
          fontSize={['clamp(1.4rem, 7vw, 2rem)', null, '3rem']}
          fontWeight='700'
          bg='linear-gradient(270deg,rgb(255, 82, 246), #5551ff)'
          lineHeight='normal'
          bgClip='text'
          textAlign='center'
        >
          Ideas Brought to Life
        </Heading>

        <Text fontSize={['clamp(0.8rem, 4vw, 1rem)', null, '1.25rem']} textAlign='center'>
          From full-stack apps to fun side projects, here&apos;s what I&apos;ve been crafting.
        </Text>
      </Flex>

      <Flex wrap='wrap' gap='10'>
        {reposQuery.data.map(repo => (
          <ProjectCard key={repo.name} repo={repo} flex='1 1 30rem' minW='auto' maxW='unset' />
        ))}
      </Flex>
    </Flex>
  );
};
