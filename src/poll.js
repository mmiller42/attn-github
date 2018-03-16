import { getConfig } from './services/config';
import findPullRequests from './services/findPullRequests';

const poll = async () => {
  const config = await getConfig();
  if (config.GITHUB_PERSONAL_ACCESS_TOKEN && config.GITHUB_USERNAME) {
    const sets = await findPullRequests(config);
    const totalCount = Object.keys(sets).reduce((count, key) => count + sets[key].length, 0);
    chrome.browserAction.setBadgeText({ text: totalCount > 0 ? String(totalCount) : '' });
  }

  setTimeout(poll, 60 * 1000);
};

poll();
