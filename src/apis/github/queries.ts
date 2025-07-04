export const GET_LATEST_REPOS = (total: number = 10) => `query {
  user(login: "omarlawaty") {
    repositories(first: ${total}, orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC) {
      nodes {
        name
        description
        url
        homepageUrl
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
