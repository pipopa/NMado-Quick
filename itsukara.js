const createQuickButton = (className) => {
  let quickButton = document.createElement('div')
  quickButton.id= 'nquick-icon-button'
  quickButton.className= className
  quickButton.innerText = 'N'
  quickButton.onclick = () => {
    const eventDetailTime = document.querySelector('div.event-detail-thumbnail')
    const youtubeUrl = eventDetailTime.querySelector('div.inner a').href
    const youtubeId = youtubeUrl.match(/\/watch\?v=(.+)/)[1];
    chrome.runtime.sendMessage({youtubeId: youtubeId })
  }
  return quickButton
}

const observer = new MutationObserver(() => {
  setTimeout(() => {
    let eventDetailTime = document.querySelector('div.event-detail-time')
    let quickButton = createQuickButton('nquick-itsukara')
    if (eventDetailTime && !eventDetailTime.querySelector('div.nquick-itsukara')) {
      eventDetailTime.appendChild(quickButton)
    }
  }, 200);
})
const config = { attributes: true, childList: true, characterData: true };
observer.observe(document.body, config)
