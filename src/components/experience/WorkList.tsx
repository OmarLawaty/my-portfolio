'use client';

import { Flex, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useExperienceQuery } from '@/hooks';
import type { Work } from '@/apis';

export const WorkList = () => {
  const experienceQuery = useExperienceQuery();

  if (!experienceQuery.isSuccess) return null;

  return (
    <Flex flexDir='column' gap='16' w='full'>
      <Heading as='h2' color='white' fontWeight='600' fontSize='2.25rem' lineHeight='normal' px='12'>
        Work Experience
      </Heading>

      <Flex flexDir='column' gap='12' w='full'>
        {experienceQuery.data.work.map(work => (
          <WorkCard key={work.title} work={work} />
        ))}
      </Flex>
    </Flex>
  );
};

interface WorkCardProps extends FlexProps {
  work: Work;
}

const WorkCard = ({ work, ...props }: WorkCardProps) => {
  return (
    <Flex gap='8' px='16' py='12' bg='gray.800' rounded='3rem' flex='1' {...props}>
      <Flex flexDir='column' flex='1' minW='20rem' gap='4'>
        <Heading as='h3' color='white' fontWeight='600' fontSize='1.5rem' lineHeight='normal'>
          {work.role}
        </Heading>

        <Text color='purple.300' fontSize='1.125rem' fontWeight='400'>
          {work.type}
        </Text>

        <Flex flexDir='column' gap='1'>
          <Text>
            {work.startDate}{' '}
            <Text as='span' color='green.500'>
              -
            </Text>{' '}
            {work.endDate || 'Present'}
          </Text>

          <Text>{work.location}</Text>
        </Flex>
      </Flex>

      <Flex flexDir='column' flex='3' gap='8' fontSize='1rem'>
        <Text color='purple.300' fontWeight='600'>
          {work.title}
        </Text>

        <Text>{work.description}</Text>
      </Flex>
    </Flex>
  );
};
