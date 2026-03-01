import type { Field } from './types';

export const GET_LATEST_REPOS = (total: number = 10, type?: Field) => `query {
  search(query: "user:omarlawaty topic:pro${type ? ` topic:${type}` : ''} sort:updated-desc", type: REPOSITORY, first: ${total}) {
    nodes {
      ... on Repository {
        name
        description
        url
        homepageUrl
        createdAt
        repositoryTopics(last: 5) {
          nodes {
            topic {
              name
            }
          }
        }
      }
    }
  }
}`;
