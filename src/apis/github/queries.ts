export const GET_PINNED_REPOS = (total: number = 6) => `query {
  user(login: "OmarLawaty") {
    pinnedItems(first: ${total}, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
        }
      }
    }
  }
}`;

export const GET_LATEST_REPOS = (total: number = 3) => `query {
  user(login: "omarlawaty") {
    repositories(first: ${total}, orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC) {
      nodes {
        name
        description
        url
        homepageUrl
      }
    }
  }
}`;
