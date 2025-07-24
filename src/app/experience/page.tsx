import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { PersonalInfo } from '@/const';
import { CertificationsList, EducationList, ExperienceHeading, WorkList } from '@/components';
import { useConfigQuery } from '@/hooks';

export const metadata: Metadata = {
  title: `${PersonalInfo.name} | Experience`,
  description:
    "Learn about Omar Lawatey's background in computer science, education, and professional experience as a front-end developer.",
};

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useConfigQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flex as='main' flex='1' flexDir='column' align='center' gap={[24, 28, 36]}>
        <ExperienceHeading />

        <WorkList />

        <CertificationsList />

        <EducationList />
      </Flex>
    </HydrationBoundary>
  );
};

export default Page;
