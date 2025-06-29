import { Flex } from '@chakra-ui/react';

import { Introduction } from '@/components';

export default function Home() {
  return (
    <Flex as='main' flex='1' gap='56'>
      <Introduction />
    </Flex>
  );
}
