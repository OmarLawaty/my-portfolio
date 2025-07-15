import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { PersonalInfo } from '@/const';
import { CertificationsList, Heading, WorkList } from '@/components';
import { useExperienceQuery } from '@/hooks';

export const metadata: Metadata = {
  title: `${PersonalInfo.name} | Experience`,
  description:
    "Learn about Omar Lawatey's background in computer science, education, and professional experience as a front-end developer.",
};

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useExperienceQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex as='main' flex='1' flexDir='column' align='center' gap='36'>
        <Heading />

        <WorkList />

        <CertificationsList />
      </Flex>
    </HydrationBoundary>
  );
};

export default Page;
