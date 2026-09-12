document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['stats'], (result) => {
    if (result.stats) {
      document.getElementById('score').innerText = `${result.stats.score} / 100`;
    }
  });

  document.getElementById('openDash').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
  });
});
