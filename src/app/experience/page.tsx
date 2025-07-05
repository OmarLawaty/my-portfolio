import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { PersonalInfo } from '@/const';

export const metadata: Metadata = {
  title: `${PersonalInfo.name} | Experience`,
  description:
    "Learn about Omar Lawatey's background in computer science, education, and professional experience as a front-end developer.",
};

const Page = () => (
  <Box as='main' flex='1'>
    Experience Page
  </Box>
);

export default Page;
