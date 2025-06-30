import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { Introduction } from '@/components';
import { PersonalInfo } from '@/const';

export const metadata: Metadata = { title: PersonalInfo.name };

const Home = () => (
  <Flex as='main' flex='1' gap='56'>
    <Introduction />
  </Flex>
);

export default Home;
