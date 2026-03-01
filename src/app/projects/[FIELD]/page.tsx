import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { PersonalInfo } from '@/const';
import { useReposQuery } from '@/hooks';
import { ProjectsList } from '@/components';
import { Field } from '@/apis';
import { capitalize } from '@/helpers';

interface PageProps {
  params: Promise<{ FIELD: Field }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { FIELD } = await params;

  return {
    title: `${PersonalInfo.name} | Projects - ${capitalize(FIELD)}`,
    description: `Explore a selection of projects by Omar Lawatey, showcasing ${FIELD} projects, creative solutions, and modern development practices.`,
  };
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
