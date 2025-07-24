import { useQuery } from '@tanstack/react-query';

import { config } from '@/apis';

const queryKey = ['config'];

const queryFn = () => config().then(res => res.data);

export const useConfigQuery = () =>
  useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

useConfigQuery.queryKey = queryKey;
useConfigQuery.queryFn = queryFn;
