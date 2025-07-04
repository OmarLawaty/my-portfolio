import axios, { type AxiosResponse } from 'axios';

import type { GitHubResponse, LatestRepositories } from './types';

export const github = <T extends LatestRepositories>(query: string) =>
  axios
    .post<GitHubResponse<T>, AxiosResponse<GitHubResponse<T>>, { query: string }>(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then(res => res.data.data.user);
