import { useQuery } from '@tanstack/react-query';

import { GET_LATEST_REPOS, github, type LatestRepositories, type Field, type Repository } from '@/apis';

const queryKey = ['latest-repos'];

const queryFn = (indicator: Field = 'f') =>
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
    queryKey,
    queryFn: () => queryFn(indicator),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    select: data => data.sort((a, b) => getRepoRank(b) - getRepoRank(a)),
  });

const getRepoRank = (repo: Repository) => +repo.repositoryTopics.nodes[0].topic.name.split('-')[1];

useLatestReposQuery.queryKey = queryKey;
useLatestReposQuery.queryFn = queryFn;
