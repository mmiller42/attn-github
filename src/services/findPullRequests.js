import { fetchPullRequests, fetchReviews, fetchReviewers, extractOwnerAndRepo } from './gitHub';

const findPullRequests = async (config, setState = () => {}) => {
  const pullRequests = await fetchPullRequests(config);
  const minReviewsMap = config.MIN_REVIEWS_MAP ? JSON.parse(config.MIN_REVIEWS_MAP) : { '': 2 };

  let requestsPendingMyReview = [];
  let myUnreviewedRequests = [];
  let myReadyRequests = [];
  let myRejectedRequests = [];

  for (const pullRequest of pullRequests) {
    const { owner, repo } = extractOwnerAndRepo(pullRequest);
    const path = `${owner}/${repo}`;

    if (pullRequest.user.login === config.GITHUB_USERNAME) {
      const reviews = await fetchReviews(config, pullRequest);
      if (reviews.every(review => review.state === 'APPROVED')) {
        if (reviews.length >= (minReviewsMap[path] || minReviewsMap[''])) {
          myReadyRequests = [...myReadyRequests, pullRequest];
          setState({ myReadyRequests });
        } else {
          myUnreviewedRequests = [...myUnreviewedRequests, pullRequest];
          setState({ myUnreviewedRequests });
        }
      } else {
        myRejectedRequests = [...myRejectedRequests, pullRequest];
        setState({ myRejectedRequests });
      }
    } else {
      const reviewers = await fetchReviewers(config, pullRequest);
      if (reviewers.users.find(user => user.login === config.GITHUB_USERNAME)) {
        requestsPendingMyReview = [...requestsPendingMyReview, pullRequest];
        setState({ requestsPendingMyReview });
      }
    }
  }

  return {
    requestsPendingMyReview,
    myUnreviewedRequests,
    myReadyRequests,
    myRejectedRequests,
  };
};

export default findPullRequests;
