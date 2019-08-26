const addQuickIconButton = () => {
  const ytpRight = document.querySelector('div.ytp-right-controls')
  const ytpOfflineSlateButton = document.querySelector('span.ytp-offline-slate-buttons')
  const createQuickButton = (className) => {
    let quickButton = document.createElement('div')
    quickButton.id= 'nquick-icon-button'
    quickButton.className= className
    quickButton.innerText = 'N'
    quickButton.onclick = () => {
      for (let node of document.querySelectorAll('.ytd-page-manager')) {
        if (node.hasAttribute('video-id')) {
          const youtubeId = node.getAttribute('video-id')
          chrome.runtime.sendMessage({youtubeId: youtubeId })
          break
        }
      }
    }
    return quickButton
  }
  if (ytpRight) {
    const quickButton = createQuickButton('nquick-ytp-right')
    ytpRight.insertBefore(quickButton, ytpRight.firstChild)
  }
  if (ytpOfflineSlateButton) {
    const quickButton = createQuickButton('nquick-ytp-offline')
    ytpOfflineSlateButton.appendChild(quickButton)
  }
}

setTimeout(() => addQuickIconButton(), 500)
