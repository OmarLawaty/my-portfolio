'use client';

import { Flex, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useConfigQuery } from '@/hooks';
import type { Education } from '@/apis';

export const EducationList = () => {
  const configQuery = useConfigQuery();

  if (!configQuery.isSuccess) return null;

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
        Education
      </Heading>

      <Flex flexDir='column' gap={[8, 10, 12]} w='full'>
        {configQuery.data.education.map(education => (
          <EducationCard key={education.title} education={education} />
        ))}
      </Flex>
    </Flex>
  );
};

interface EducationCardProps extends FlexProps {
  education: Education;
}

const EducationCard = ({ education, ...props }: EducationCardProps) => (
  <Flex
    gap={[4, 6, 8]}
    px={[8, 12, 14]}
    py={[8, null, 10]}
    bg='gray.800'
    rounded={['2rem', null, '3rem']}
    flex='1'
    textTransform='capitalize'
    {...props}
  >
    <Flex flexDir='column' flex='1' gap={[1, 2, 4]}>
      <Heading as='h3' color='white' fontWeight='600' fontSize={['1rem', '1.125rem', '1.5rem']} lineHeight='normal'>
        {education.title}
      </Heading>

      <Text color='purple.300' fontSize={['0.9rem', '1rem', '1.125rem']} fontWeight='400'>
        {education.authority}
      </Text>

      <Flex flexDir='column' gap='1' fontWeight='200' fontSize={['0.75rem', '0.8rem', '0.9rem']} color='gray.400'>
        <Text fontFamily="'Nunito', sans-serif">
          {education.startDate}{' '}
          <Text as='span' color='green.500'>
            -
          </Text>{' '}
          {education.endDate}
        </Text>

        <Text>{education.location}</Text>
      </Flex>
    </Flex>
  </Flex>
);
