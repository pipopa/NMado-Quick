chrome.runtime.onMessage.addListener((message, sender) => {
  chrome.tabs.query({url: "https://piporoid.net/NMado/"}, (tabs) => {
    if (tabs.length === 0) {
      chrome.tabs.create({
        url:"https://piporoid.net/NMado/"
      }, (tab) => {
        // chrome.tabs.update(sender.tab.id, {'active': true }, () => { });
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === "complete" && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(
              tab.id,
              {
                youtubeId: message.youtubeId
              }
            )
          }
        });
      })
      return;
    }
    for (tab of tabs) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          youtubeId: message.youtubeId
        }
      )
    }
  }
  );
});
