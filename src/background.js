const sendYoutubeId = (youtubeId) => {
  chrome.tabs.query({url: 'https://piporoid.net/NMado/'}, (tabs) => {
    if (tabs.length === 0) {
      chrome.tabs.create({
        url:'https://piporoid.net/NMado/'
      }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener)
            chrome.tabs.sendMessage(
              tab.id,
              {
                youtubeId: youtubeId
              }
            )
          }
        })
      })
      return
    }
    for (tab of tabs) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          youtubeId: youtubeId
        }
      )
    }
  })
}

chrome.contextMenus.create({
  id: "nmado-quick",
  title: "N窓へ追加",
  contexts: ["link"],
  targetUrlPatterns: ["*://*.youtube.com/*", "*://youtu.be/*"]
})
chrome.contextMenus.onClicked.addListener((info, _tab) => {
  const youtubeId = info.linkUrl.match(/\/watch\?v=(.+)|youtu.be\/(.+)/)[1]
  console.log(info.linkUrl)
  if (youtubeId) {
    sendYoutubeId(youtubeId)
  }
})

chrome.runtime.onMessage.addListener((message, _sender) => {
  sendYoutubeId(message.youtubeId)
})
