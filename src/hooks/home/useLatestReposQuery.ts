import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';

import { GET_LATEST_REPOS, github, type LatestRepositories, type Field, type Repository } from '@/apis';

const queryKey = (indicator: Field = 'f') => ['latest-repos', indicator] as const;

type QueryKey = ReturnType<typeof queryKey>;

const queryFn = ({ queryKey: [, indicator] }: QueryFunctionContext<QueryKey>) =>
  github<LatestRepositories>(GET_LATEST_REPOS()).then(res =>
    res.repositories.nodes.reduce<Repository[]>((repos, repo) => {
      const repoIndication = repo.repositoryTopics.nodes.find(node => node.topic.name.startsWith(`${indicator}-`));

      if (!repoIndication) return repos;

      repo.repositoryTopics.nodes = [repoIndication];
      repos.push(repo);

      return repos;
    }, [])
  );

interface LatestReposQueryProps {
  indicator?: Field;
}

export const useLatestReposQuery = ({ indicator = 'f' }: LatestReposQueryProps = {}) =>
  useQuery({
    queryKey: queryKey(indicator),
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    select: data => data.sort((a, b) => getRepoRank(b) - getRepoRank(a)),
  });

const getRepoRank = (repo: Repository) => +repo.repositoryTopics.nodes[0].topic.name.split('-')[1];

useLatestReposQuery.queryKey = queryKey;
useLatestReposQuery.queryFn = queryFn;
