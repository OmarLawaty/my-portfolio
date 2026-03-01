import { Box, Flex } from '@chakra-ui/react';

import { PageIndicator, PageTransitionWrapper, ProjectsHeading } from '@/components';
import { projectsPages } from '@/routes';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Flex as='main' flex='1' flexDir='column' gap='16'>
    <ProjectsHeading />

    <Box minH={[12, null, 16]} bg='rgba(33, 31, 35, 0.35)' rounded='full' p={[3, null, 4]} w='min' mx='auto'>
      <PageIndicator pages={projectsPages} gap={[2, null, 4]} />
    </Box>

    <PageTransitionWrapper pages={projectsPages}>{children}</PageTransitionWrapper>
  </Flex>
);

export default Layout;
