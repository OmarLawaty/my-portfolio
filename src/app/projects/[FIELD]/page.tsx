import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { PersonalInfo } from '@/const';
import { useReposQuery } from '@/hooks';
import { ProjectsList } from '@/components';
import { Field } from '@/apis';

export const metadata: Metadata = {
  title: `${PersonalInfo.name} | Projects`,
  description:
    'Explore a selection of projects by Omar Lawatey, showcasing front-end web applications, creative solutions, and modern development practices.',
};

interface PageProps {
  params: Promise<{ FIELD: Field }>;
}

const Page = async ({ params }: PageProps) => {
  const { FIELD } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useReposQuery.queryKey(100, FIELD),
    queryFn: useReposQuery.queryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsList filter={FIELD} />
    </HydrationBoundary>
  );
};

export default Page;
