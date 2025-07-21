'use client';

import { Box, Flex, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useExperienceQuery } from '@/hooks';
import type { Work } from '@/apis';

export const WorkList = () => {
  const experienceQuery = useExperienceQuery();

  if (!experienceQuery.isSuccess) return null;

  return (
    <Flex as='section' flexDir='column' gap={[12, 14, 16]} w='full'>
      <Heading
        as='h2'
        color='white'
        fontWeight='600'
        fontSize={['1.5rem', '1.75rem', '2.25rem']}
        lineHeight='normal'
        px={['none', null, 12]}
        textAlign={['center', null, 'start']}
      >
        Work Experience
      </Heading>

      <Flex flexDir='column' gap={[8, 10, 12]} w='full'>
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

const WorkCard = ({ work, ...props }: WorkCardProps) => (
  <Flex
    flexDir={['column', null, 'row']}
    gap={[4, 6, 8]}
    px={[8, 12, 14]}
    py={[8, null, 10]}
    bg='gray.800'
    rounded={['2rem', null, '3rem']}
    flex='1'
    textTransform='capitalize'
    {...props}
  >
    <Flex flexDir='column' flex='1' minW={['none', null, '20rem']} gap={[1, 2, 4]}>
      <Heading as='h3' color='white' fontWeight='600' fontSize={['1rem', '1.125rem', '1.5rem']} lineHeight='normal'>
        {work.role}
      </Heading>

      <Text color='purple.300' fontSize={['0.9rem', '1rem', '1.125rem']} fontWeight='400'>
        {work.type}
      </Text>

      <Flex flexDir='column' gap='1' fontWeight='200' fontSize={['0.75rem', '0.8rem', '0.9rem']} color='gray.400'>
        <Text fontFamily="'Nunito', sans-serif">
          {work.startDate}{' '}
          <Text as='span' color='green.500'>
            -
          </Text>{' '}
          {work.endDate || 'Present'}
        </Text>

        <Text>{work.location}</Text>
      </Flex>
    </Flex>

    <Flex flexDir='column' flex='3' gap={[1, null, 3]} fontSize={['0.9rem', null, '1rem']}>
      <Text color='purple.300' fontWeight='600' fontSize={['0.9rem', '1rem', '1.125rem']}>
        {work.title}
      </Text>

      <Flex flexDir='column' color='gray.400'>
        <Text>{work.description}</Text>

        <Box mt='2'>
          <Text fontWeight='500' color='green.500'>
            Responsibilities:
          </Text>

          <Box ms='4' as='ul' listStyleType='disc'>
            {work.responsibilities.map((responsibility, index) => (
              <Text key={index} as='li' fontWeight='200' fontFamily="'Nunito', sans-serif" color='gray.400'>
                {responsibility}
              </Text>
            ))}
          </Box>

          <Text mt='2'>
            <Text as='span' fontWeight='500' color='green.500'>
              Tech:
            </Text>{' '}
            {work.tech.join(', ')}.
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
