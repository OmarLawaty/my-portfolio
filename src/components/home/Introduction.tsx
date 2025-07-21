import { Flex, Heading, Text } from '@chakra-ui/react';

import { PersonalInfo } from '@/const';

import { DownloadResumeButton } from '../DownloadResumeButton';
import { Image } from '../Image';
import { Link } from '../Link';

export const Introduction = () => (
  <Flex
    flexDir={['column-reverse', null, 'row']}
    as='section'
    w='full'
    gap={[12, 16, null, 24]}
    align='center'
    justify='space-between'
    h='fit'
  >
    <Flex flexDir='column' gap='1' textAlign={['center', null, 'left']} align={['center', null, 'flex-start']}>
      <Heading
        as='h1'
        color='white'
        fontSize={['2rem', '3.125rem', '4.25rem']}
        lineHeight='normal'
        fontWeight='600'
        fontFamily='inherit'
      >
        Hi, I&apos;m Omar
      </Heading>

      <Heading
        as='h2'
        color='purple.500'
        fontWeight='500'
        fontSize={['1rem', '1.125rem', '1.25rem']}
        fontFamily='inherit'
      >
        Frontend Developer & CS student
      </Heading>

      <Text mt='2' color='gray.3d00' fontWeight='300' fontSize={['0.875rem', '0.95rem', '1rem']} maxW='38rem'>
        I&apos;ve been building real-world web apps for about a year using React, Next.js, and TypeScript — with a
        strong focus on performance and clean UI. I&apos;m currently open to remote internships or part-time roles where
        I can grow and contribute to meaningful projects.
      </Text>

      <Flex mt={[8, null, 5]} gap={[3, 4, 5]} flexDir={['column', null, 'row']} w={['fit', null, 'auto']}>
        <DownloadResumeButton />

        <Link
          href='/experience'
          color='purple.300'
          py='2.5'
          px='7'
          minW='11.5rem'
          transition='color 0.2s'
          fontWeight='600'
          fontFamily="'Nunito', sans-serif"
          fontSize='1rem'
          _hover={{ color: 'purple.200' }}
        >
          See experiences
        </Link>
      </Flex>
    </Flex>

    <Image
      src={PersonalInfo.photo}
      alt={PersonalInfo.name}
      width={336}
      height={336}
      priority
      fetchPriority='high'
      quality={50}
      w={['18rem', null, null, '21rem']}
      h={['18rem', null, null, '21rem']}
      aspectRatio='square'
      objectFit='cover'
      objectPosition='0 20%'
      rounded='full'
    />
  </Flex>
);
