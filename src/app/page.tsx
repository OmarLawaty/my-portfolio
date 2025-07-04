import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Introduction, LatestProjects, Technologies } from '@/components';
import { useLatestReposQuery } from '@/hooks';
import { PersonalInfo } from '@/const';

export const metadata: Metadata = { title: PersonalInfo.name };

const Home = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useLatestReposQuery.queryKey,
      queryFn: () => useLatestReposQuery.queryFn(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex as='main' flex='1' gap='56' flexDir='column'>
        <Introduction />

        <Technologies />

        <LatestProjects />
      </Flex>
    </HydrationBoundary>
  );
};

export default Home;
