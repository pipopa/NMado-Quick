const createQuickButton = (className, youtubeId) => {
  let quickButton = document.createElement('div')
  quickButton.id= 'nquick-icon-button'
  quickButton.className= className
  quickButton.innerText = 'N'
  quickButton.onclick = () => {
    chrome.runtime.sendMessage({youtubeId: youtubeId })
  }
  return quickButton
}

const getYouTubeId = (video) => {
  const thumbnail = video.querySelectorAll("img")[3]
  const m = thumbnail.src.match(/vi\/([^\/]+)\//)
  if (m[1]) {
    return m[1]
  }
  return null
}

const addQuickButton = (video) => {
  const youtubeId = getYouTubeId(video)
  if (youtubeId && !video.querySelector('.nquick-vnuma')) {
    const icon = video.querySelector("img.MuiAvatar-img")
    if (!icon) {
      return
    }
    const tr = icon.parentElement.parentElement.parentElement
    const muiboxRoot = tr.querySelector('.MuiBox-root')
    const videoDetails = muiboxRoot.querySelectorAll('.MuiBox-root')
    const quickButton = createQuickButton('nquick-vnuma', youtubeId)
    if (videoDetails.length == 1) {
      muiboxRoot.appendChild(quickButton)
    } else {
      muiboxRoot.insertBefore(quickButton, videoDetails[1])
    }
  }
}

const getYouTubeVideos = () => {
  let videos = []
  const trList = document.querySelectorAll("table tr")
  for (let tr of trList) {
    const imgList = tr.querySelectorAll("img")
    if (imgList.length < 3) {
      continue
    }
    const platformIcon = imgList[2]
    if (platformIcon.src.includes("youtube")) {
      videos.push(tr)
      const thumbnail = imgList[3]
      const m = thumbnail.src.match(/vi\/[^\/]+\//)
    }
  }
  return videos
}

const init = () => {
  const chunkSize = 10
  const root = document.querySelector(".MuiBox-root")
  const observer = new MutationObserver((mutations) => {
    let videos = getYouTubeVideos()
    for (let i=0, j=videos.length; i * chunkSize < j; i++) {
      const nextChunkHead = i * chunkSize
      let chunk = videos.slice(nextChunkHead, nextChunkHead + chunkSize);
      setTimeout(() => {
        chunk.forEach(video => addQuickButton(video))
      }, 300 * (i + 1))
    }
  });

  const config = { subtree: true, attributes: true, childList: true, characterData: true };
  observer.observe(root, config);
}
init()
