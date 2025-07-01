import { Flex, Text } from '@chakra-ui/react';

import { Slider } from './Slider';

export const Technologies = () => (
  <Flex as='section' gap='24' align='center'>
    <Flex flexDir='column' fontSize='1rem' fontWeight='500' color='gray.400'>
      Years of
      <Text fontSize='5rem' fontWeight='700' color='white'>
        XP
      </Text>
      with the most popular technologies
    </Flex>

    <Slider />
  </Flex>
);
