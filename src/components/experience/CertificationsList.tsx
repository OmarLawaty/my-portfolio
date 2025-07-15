'use client';

import { Flex, Grid, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useExperienceQuery } from '@/hooks';
import type { Certification } from '@/apis';
import { Link } from '../Link';

export const CertificationsList = () => {
  const experienceQuery = useExperienceQuery();

  if (!experienceQuery.isSuccess) return null;

  return (
    <Flex flexDir='column' gap='16' w='full'>
      <Heading as='h2' color='white' fontWeight='600' fontSize='2.25rem' lineHeight='normal' px='12'>
        Certifications
      </Heading>

      <Grid templateColumns='repeat(auto-fit, minmax(min(400px, 100%), 1fr))' gap='12' w='full'>
        {experienceQuery.data.certifications.map(certification => (
          <CertificationCard key={certification.title} certification={certification} />
        ))}
      </Grid>
    </Flex>
  );
};

interface CertificationCardProps extends FlexProps {
  certification: Certification;
}

const CertificationCard = ({ certification, ...props }: CertificationCardProps) => {
  return (
    <Flex
      flexDir='column'
      gap='1.5'
      px='12'
      py='8'
      bg='gray.800'
      rounded='1.5rem'
      textTransform='capitalize'
      {...props}
    >
      <Heading as='h3' fontWeight='600' fontSize='1.4rem'>
        {certification.title}
      </Heading>

      <Text color='purple.300' fontSize='1rem'>
        {certification.authority}
      </Text>

      <Text mt='0.5' fontWeight='200' fontSize='0.9rem' color='gray.400' fontFamily="'Nunito', sans-serif">
        {certification.date}
      </Text>

      <Link
        href={certification.link}
        target='_blanks'
        mt='2'
        w='fit'
        color='green.500'
        fontWeight='500'
        fontSize='1rem'
        _hover={{ textDecoration: 'underline' }}
      >
        View Certificate
      </Link>
    </Flex>
  );
};
