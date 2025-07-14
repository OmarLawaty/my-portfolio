import { useQuery } from '@tanstack/react-query';

import { experience } from '@/apis';

const queryKey = ['experience'];

const queryFn = () => experience().then(res => res.data);

export const useExperienceQuery = () =>
  useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

useExperienceQuery.queryKey = queryKey;
useExperienceQuery.queryFn = queryFn;
