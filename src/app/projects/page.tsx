import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { PersonalInfo } from '@/const';
import { useReposQuery } from '@/hooks';
import { ProjectsList } from '@/components';

export const metadata: Metadata = {
  title: `${PersonalInfo.name} | Projects`,
  description:
    'Explore a selection of projects by Omar Lawatey, showcasing front-end web applications, creative solutions, and modern development practices.',
};

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useReposQuery.queryKey<undefined>(100),
    queryFn: useReposQuery.queryFn<undefined>,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsList />
    </HydrationBoundary>
  );
};

export default Page;
