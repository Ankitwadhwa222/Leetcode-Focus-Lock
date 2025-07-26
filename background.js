chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const blockedSites = ["youtube.com", "stackoverflow.com" , "https://chatgpt.com/" , "https://gemini.google.com" , "ai"];
  if (changeInfo.url) {
    for (let site of blockedSites) {
      if(changeInfo.url.includes(site) == "leetcode.com") break;
      if (changeInfo.url.includes(site)) {
        chrome.tabs.remove(tabId);
        break;
      }
    }
  }
});
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ violations: 0, isCheater: false });
  console.log("Extension installed: Reset cheater status.");
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ violations: 0, isCheater: false });
  console.log("Extension restarted: Reset cheater status.");
});
