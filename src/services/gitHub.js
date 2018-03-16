import 'whatwg-fetch';
import { stringify } from 'qs';
import reverse from 'lodash/reverse';
import uniqBy from 'lodash/uniqBy';

const fetchGitHub = async ({ GITHUB_PERSONAL_ACCESS_TOKEN }, route, params = {}) => {
  const response = await fetch(`https://api.github.com/${route}${stringify(params, { addQueryPrefix: true })}`, {
    headers: {
      authorization: `token ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const extractOwnerAndRepo = pullRequest => {
  const [, owner, repo] = pullRequest.url.match(/\/repos\/(.*?)\/(.*?)\//);
  return { owner, repo };
};

export const fetchPullRequests = async config => {
  const data = await fetchGitHub(config, 'search/issues', {
    q: `involves:${config.GITHUB_USERNAME} state:open type:pr`,
    per_page: 100,
  });
  return data.items;
};

const PRIORITY_STATES = ['APPROVED', 'CHANGES_REQUESTED'];

export const fetchReviews = async (config, pullRequest) => {
  const { owner, repo } = extractOwnerAndRepo(pullRequest);
  let reviews = await fetchGitHub(config, `repos/${owner}/${repo}/pulls/${pullRequest.number}/reviews`);
  reviews = reviews.filter(review => review.user.login !== config.GITHUB_USERNAME);
  reviews = reverse(reviews);
  reviews = [...reviews].sort((a, b) => {
    const aScore = PRIORITY_STATES.includes(a.state) ? 0 : 1;
    const bScore = PRIORITY_STATES.includes(b.state) ? 0 : 1;
    return aScore - bScore;
  });
  reviews = uniqBy(reviews, 'user.login');
  return reviews;
};

export const fetchReviewers = async (config, pullRequest) => {
  const { owner, repo } = extractOwnerAndRepo(pullRequest);
  return fetchGitHub(config, `repos/${owner}/${repo}/pulls/${pullRequest.number}/requested_reviewers`);
};
