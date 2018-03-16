export const getConfig = () => new Promise(resolve => {
  chrome.storage.sync.get(['GITHUB_PERSONAL_ACCESS_TOKEN', 'GITHUB_USERNAME', 'MIN_REVIEWS_MAP'], config => resolve({
    GITHUB_PERSONAL_ACCESS_TOKEN: config.GITHUB_PERSONAL_ACCESS_TOKEN || '',
    GITHUB_USERNAME: config.GITHUB_USERNAME || '',
    MIN_REVIEWS_MAP: config.MIN_REVIEWS_MAP || '',
  }));
});

export const setConfig = config => new Promise(resolve => {
  chrome.storage.sync.set(config, resolve);
});
