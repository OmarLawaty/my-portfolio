import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Introduction, LatestProjects, Skills, Technologies } from '@/components';
import { useConfigQuery, useReposQuery } from '@/hooks';
import { PersonalInfo } from '@/const';

export const metadata: Metadata = {
  title: PersonalInfo.name,
  description:
    'Explore the portfolio of Omar Lawatey — a front-end developer crafting modern web apps with performance, accessibility, and clean UI in mind. Check out my latest projects and skills.',
};

const Home = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useReposQuery.queryKey(),
      queryFn: useReposQuery.queryFn,
    }),
    queryClient.prefetchQuery(useConfigQuery),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex as='main' flex='1' gap='56' flexDir='column'>
        <Introduction />

        <Technologies />

        <LatestProjects />

        <Skills />
      </Flex>
    </HydrationBoundary>
  );
};

export default Home;
