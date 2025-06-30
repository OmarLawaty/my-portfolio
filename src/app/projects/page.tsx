import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { PersonalInfo } from '@/const';

export const metadata: Metadata = { title: `${PersonalInfo.name} | Projects` };

const Page = () => (
  <Box as='main' flex='1'>
    Projects Page
  </Box>
);

export default Page;
