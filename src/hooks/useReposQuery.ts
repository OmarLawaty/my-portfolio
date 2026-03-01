import axios from 'axios';
import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';

import { GET_LATEST_REPOS, type Field, type Repository, type RepositoryResponse } from '@/apis';
import { RepoFields } from '@/const';

const queryKey = <F extends Field | undefined>(limit: number = 10, filter?: F) =>
  filter ? (['latest-repos', limit, filter] as const) : (['latest-repos', limit] as const);

type QueryKey<F extends Field | undefined> = ReturnType<typeof queryKey<F>>;

const queryFn = <F extends Field | undefined>({ queryKey: [, limit, filter] }: QueryFunctionContext<QueryKey<F>>) =>
  axios
    .post<RepositoryResponse[]>((process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api/github/repos', {
      query: GET_LATEST_REPOS(limit, filter),
    })
    .then(repos =>
      repos.data.map<Repository<F>>(({ repositoryTopics, ...repo }) => {
        type Topics = { topics: string[]; type: Field; rank: number };
        const topics = repositoryTopics.nodes.reduce<Topics>(
          (prev, { topic: { name } }) => {
            if (RepoFields.includes(name as Field)) prev.type = name as Field;
            if (parseInt(name) > 0) prev.rank = parseInt(name);
            prev.topics.push(name);

            return prev;
          },
          { topics: [], type: '' as Field, rank: 0 },
        );

        return { ...repo, ...topics } as Repository<F>;
      }),
    );

interface LatestReposQueryProps<F extends Field | undefined = undefined> {
  filter?: F;
  limit?: number;
}

export const useReposQuery = <F extends Field | undefined>({ filter, limit }: LatestReposQueryProps<F> = {}) =>
  useQuery({
    queryKey: queryKey<F>(limit, filter),
    queryFn: queryFn<F>,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    select: data => data.sort((a, b) => b.rank - a.rank),
  });

useReposQuery.queryKey = queryKey;
useReposQuery.queryFn = queryFn;
