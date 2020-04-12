import { browser } from 'webextension-polyfill-ts'
import { VideoNode, Live, Schedule } from './vnuma-video.ts'

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

const getYouTubeVideoNodesOnLive = (): Array<Live> => {
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

const getYouTubeVideoNodesOnSchedule = (): Array<Schedule> => {
  let videos = []
  const gridItems = Array.prototype.slice.call(document.querySelectorAll(".MuiGrid-item"))
  for (let item of gridItems) {
    const imgList = item.querySelectorAll("img")
    if (imgList.length < 1) {
      continue
    }
    const thumbnail = imgList[0]
    if (thumbnail.src.includes("i.ytimg.com")) {
      videos.push(new Schedule(item))
    }
  }
  return videos
}


const init = () => {
  const chunkSize = 10
  const root = document.querySelector(".MuiBox-root")
  const observer = new MutationObserver(() => {
    const lives = getYouTubeVideoNodesOnLive()
    const schedules = getYouTubeVideoNodesOnSchedule()
    let videoNodes = lives.concat(schedules)
    for (let i=0, j=videoNodes.length; i * chunkSize < j; i++) {
      const chunkHead = i * chunkSize
      let chunk = videoNodes.slice(chunkHead, chunkHead + chunkSize);
      setTimeout(() => {
        chunk.forEach((videoNode: VideoNode) => videoNode.addQuickButton(createQuickButton))
      }, 300 * (i + 1))
    }
  });

  const config = { subtree: true, attributes: true, childList: true, characterData: true };
  observer.observe(root, config);
}
init()