(function () {
  const createQuickButton = (className) => {
    let quickButton = document.createElement('button')
    quickButton.id = 'nquick-button'
    quickButton.className= className ? className : ''
    quickButton.innerHTML = 'N窓に追加'
    quickButton.onclick = () => {
      let videoHref = quickButton.parentElement.parentElement.querySelector('a').href
      let youtubeId = videoHref.match(/\/watch\?v=(.+)/)[1]
      chrome.runtime.sendMessage({youtubeId: youtubeId })
    }
    return quickButton
  }

  const addQuickButton = () => {
    let dismissableList = document.querySelectorAll('div#dismissable')
    Array.prototype.forEach.call(dismissableList, dismissable => {
      if (dismissable.querySelector('#nquick-button') === null && !dismissable.className.includes('ytd-shelf-renderer')) {
        let detail = dismissable.querySelector('div#buttons')
        const quickButton = createQuickButton()
        if (detail) {
          detail.appendChild(quickButton)
        }
      }
    })
  }

  const observeContent = () => {
    addQuickButton()
    // オブザーバインスタンスを作成
    let contents = document.querySelectorAll('div#contents')
    for (content of contents) {
      if (content.getAttribute('observe') !== true) {
        const observer = new MutationObserver(() => {
          addQuickButton()
        })
        const config = {
          childList: true,
        }
        content.setAttribute('observe', 'true')
        observer.observe(content, config)
      }
    }
  }

  observeContent()
  document.body.addEventListener('yt-page-data-updated', () => {
    setTimeout(() => addQuickButton() , 200)
  })
  document.addEventListener('yt-service-request-completed', () => {
    setTimeout(() => addQuickButton(), 200)
  })
}())
