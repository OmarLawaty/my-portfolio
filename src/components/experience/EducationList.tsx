'use client';

import { Flex, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useExperienceQuery } from '@/hooks';
import type { Education } from '@/apis';

export const EducationList = () => {
  const experienceQuery = useExperienceQuery();

  if (!experienceQuery.isSuccess) return null;

  return (
    <Flex as='section' flexDir='column' gap='16' w='full'>
      <Heading as='h2' color='white' fontWeight='600' fontSize='2.25rem' lineHeight='normal' px='12'>
        Education
      </Heading>

      <Flex flexDir='column' gap='12' w='full'>
        {experienceQuery.data.education.map(education => (
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
  <Flex gap='8' px='14' py='10' bg='gray.800' rounded='3rem' flex='1' textTransform='capitalize' {...props}>
    <Flex flexDir='column' flex='1' minW='20rem' gap='4'>
      <Heading as='h3' color='white' fontWeight='600' fontSize='1.5rem' lineHeight='normal'>
        {education.title}
      </Heading>

      <Text color='purple.300' fontSize='1.125rem' fontWeight='400'>
        {education.authority}
      </Text>

      <Flex flexDir='column' gap='1' fontWeight='200' fontSize='0.9rem' color='gray.400'>
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
