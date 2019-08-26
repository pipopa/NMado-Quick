const ytpRight = document.querySelector('div.ytp-right-controls')
if (ytpRight) {
  let quickButton = document.createElement('div')
  quickButton.id= 'nmado-quick-icon-button'
  quickButton.innerText = 'N'
  quickButton.onclick = () => {
    const youtubeId = document.querySelector('.ytd-page-manager').getAttribute('video-id')
    chrome.runtime.sendMessage({youtubeId: youtubeId });
  }
  ytpRight.insertBefore(quickButton, ytpRight.firstChild)
}
