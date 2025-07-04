export interface GitHubResponse<T extends object> {
  data: {
    user: T;
  };
}

export interface LatestRepositories {
  repositories: {
    nodes: Repository[];
  };
}

export interface Repository {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string;
  repositoryTopics: {
    nodes: RepositoryTopic[];
  };
}

export interface RepositoryTopic {
  topic: {
    name: string;
  };
}

export type Field = 'f' | 'b';
