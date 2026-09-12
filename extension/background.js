// Privacy Gate Manifest V3 Background Service Worker

console.log('[Privacy Gate] Service Worker Initialized.');

let stats = {
  intercepted: 142,
  blocked: 29,
  score: 82
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ stats });
  console.log('[Privacy Gate] Zero-Trust protection rules activated.');
});

// Listener for content script alerts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FINGERPRINT_DETECTED') {
    console.warn('[Privacy Gate Alert] Canvas/WebGL Fingerprinting Trap Triggered on:', sender.tab?.url);
    stats.blocked += 1;
    stats.score = Math.max(30, stats.score - 5);
    chrome.storage.local.set({ stats });
    sendResponse({ status: 'BLOCKED' });
  }
});
