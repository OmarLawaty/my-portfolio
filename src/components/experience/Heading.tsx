import { Flex, Heading as ChakraHeading } from '@chakra-ui/react';

import { DownloadResumeButton } from '../DownloadResumeButton';

export const Heading = () => (
  <Flex as='section' w='60%' flexDir='column' align='center' gap='11'>
    <ChakraHeading
      as='h1'
      fontSize='1.75rem'
      fontWeight='700'
      bg='linear-gradient(270deg,rgb(255, 82, 246), #5551ff)'
      lineHeight='normal'
      bgClip='text'
      textAlign='center'
    >
      {'< A closer look into my journey as a frontend developer and CS student. />'}
    </ChakraHeading>

    <DownloadResumeButton animationDir='up' />
  </Flex>
);
