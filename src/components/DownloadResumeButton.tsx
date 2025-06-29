'use client';

import { Text } from '@chakra-ui/react';

import { PersonalInfo } from '@/const';

import { Link } from './Link';

export const DownloadResumeButton = () => (
  <Link
    href={PersonalInfo.resume}
    download={`${PersonalInfo.username}-resume`}
    target='_blank'
    display='flex'
    bg='white'
    color='gray.900'
    alignItems='center'
    justifyContent='center'
    py='2.5'
    px='8'
    rounded='full'
    pos='relative'
    transition='color 0.2s'
    overflow='hidden'
    _before={{
      content: '""',
      position: 'absolute',
      inset: '-1px',
      transform: 'translateX(-101%)',
      bg: 'black',
      zIndex: '0',
      rounded: 'full',
      borderWidth: '2px',
      borderColor: 'transparent',
      opacity: 0,
      transition: 'border-color 0.5s 0.4s, opacity 0.5s ease, transform 0.5s, inset 0.4s 0.3s',
    }}
    _hover={{
      color: 'white',
      _before: {
        transform: 'translateX(0)',
        opacity: 1,
        borderColor: 'white',
        inset: '0px',
      },
    }}
  >
    <Text zIndex='2' pos='relative' fontWeight='600' fontFamily={"'Nunito', sans-serif"} fontSize='1rem'>
      Download Resume
    </Text>
  </Link>
);
