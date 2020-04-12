import { browser } from 'webextension-polyfill-ts'
import { Video, Live } from './vnuma-video.ts'

const createQuickButton = (className: string, youtubeId: string): HTMLDivElement => {
  let quickButton = document.createElement('div')
  quickButton.id= 'nquick-icon-button'
  quickButton.className= className
  quickButton.innerText = 'N'
  quickButton.onclick = () => {
    browser.runtime.sendMessage({ youtubeId: youtubeId })
  }
  return quickButton
}

const getYouTubeVideosOnLive = (): Array<Live> => {
  let videos = []
  const trList = Array.prototype.slice.call(document.querySelectorAll("table tr"))
  for (let tr of trList) {
    const imgList = tr.querySelectorAll("img")
    if (imgList.length < 3) {
      continue
    }
    const platformIcon = imgList[2]
    if (platformIcon.src.includes("youtube")) {
      videos.push(new Live(tr))
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
    let videos = getYouTubeVideosOnLive()
    for (let i=0, j=videos.length; i * chunkSize < j; i++) {
      const nextChunkHead = i * chunkSize
      let chunk = videos.slice(nextChunkHead, nextChunkHead + chunkSize);
      setTimeout(() => {
        chunk.forEach((video: Video) => video.addQuickButton(createQuickButton))
      }, 300 * (i + 1))
    }
  });

  const config = { subtree: true, attributes: true, childList: true, characterData: true };
  observer.observe(root, config);
}
init()