import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { PersonalInfo } from '@/const';
import { useReposQuery } from '@/hooks';
import { ProjectsList } from '@/components';

export const metadata: Metadata = { title: `${PersonalInfo.name} | Projects` };

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useReposQuery.queryKey('f', 100),
    queryFn: useReposQuery.queryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex as='main' flex='1' flexDir='column'>
        <ProjectsList />
      </Flex>
    </HydrationBoundary>
  );
};

export default Page;
