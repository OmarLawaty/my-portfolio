export interface GitHubResponse<T extends object> {
  data: T;
}

export interface LatestRepositories {
  search: {
    nodes: RepositoryResponse[];
  };
}

export interface RepositoryResponse {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string;
  createdAt: string;
  repositoryTopics: {
    nodes: RepositoryTopic[];
  };
}

export interface RepositoryTopic {
  topic: {
    name: string;
  };
}

export interface Repository<F extends Field | undefined> extends Omit<RepositoryResponse, 'repositoryTopics'> {
  topics: string[];
  type: F extends Field ? F : Field;
  rank: number;
}

export type Field = 'frontend' | 'backend';
