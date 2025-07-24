'use client';

import { Flex, Grid, Heading, Text, type FlexProps } from '@chakra-ui/react';

import { useConfigQuery } from '@/hooks';
import type { Certification } from '@/apis';

import { Link } from '../Link';

export const CertificationsList = () => {
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
        Certifications
      </Heading>

      <Grid templateColumns='repeat(auto-fit, minmax(min(400px, 100%), 1fr))' gap={[8, 10, 12]} w='full'>
        {configQuery.data.certifications.map(certification => (
          <CertificationCard key={certification.title} certification={certification} />
        ))}
      </Grid>
    </Flex>
  );
};

interface CertificationCardProps extends FlexProps {
  certification: Certification;
}

const CertificationCard = ({ certification, ...props }: CertificationCardProps) => (
  <Flex
    flexDir='column'
    gap='1.5'
    px={[6, 8, 12]}
    py={[6, null, 8]}
    bg='gray.800'
    rounded='1.5rem'
    textTransform='capitalize'
    {...props}
  >
    <Heading as='h3' fontWeight='600' fontSize={['1rem', '1.125rem', '1.4rem']}>
      {certification.title}
    </Heading>

    <Text color='purple.300' fontSize={['0.8rem', '0.9rem', '1rem']}>
      {certification.authority}
    </Text>

    <Text
      mt='0.5'
      fontWeight='200'
      fontSize={['0.75rem', '0.8rem', '0.9rem']}
      color='gray.400'
      fontFamily="'Nunito', sans-serif"
    >
      {certification.date}
    </Text>

    <Link
      href={certification.link}
      target='_blanks'
      mt='2'
      w='fit'
      color='green.500'
      fontWeight='500'
      fontSize={['0.8rem', '0.9rem', '1rem']}
      _hover={{ textDecoration: 'underline' }}
    >
      View Certificate
    </Link>
  </Flex>
);
