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
  if (ytpRight && !ytpRight.querySelector('#nquick-icon-button')) {
    const quickButton = createQuickButton('nquick-ytp-right')
    ytpRight.insertBefore(quickButton, ytpRight.firstChild)
  }
  if (ytpOfflineSlateButton && !ytpOfflineSlateButton.querySelector('#nquick-icon-button')) {
    const quickButton = createQuickButton('nquick-ytp-offline')
    ytpOfflineSlateButton.appendChild(quickButton)
  }
}

document.body.addEventListener('yt-page-data-updated', () => {
  setTimeout(() => addQuickIconButton() , 200);
})
document.addEventListener('yt-navigate-finish', () => {
  setTimeout(() => addQuickIconButton(), 200);
})

setTimeout(() => addQuickIconButton(), 200);
