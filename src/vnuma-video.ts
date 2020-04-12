interface Video {
  videoNode: Element
  getYouTubeId(): string;
  addQuickButton(createQuickButton: (className: string, youtubeId: string) => HTMLDivElement): void;
}

class Live implements Video {
  videoNode: Element

  constructor(videoNode: Element) {
    this.videoNode = videoNode
  }

  getYouTubeId(): string {
    const imgList = this.videoNode.querySelectorAll("img")
    if (imgList.length < 3) {
      return ""
    }
    const thumbnail = imgList[3]
    const m = thumbnail.src.match(/vi\/([^\/]+)\//)
    if (m.length >= 2) {
      return m[1]
    }
    return ""
  }

  addQuickButton(createQuickButton: (className: string, youtubeId: string) => HTMLDivElement): void {
    const youtubeId = this.getYouTubeId()
    if (youtubeId && !this.videoNode.querySelector('.nquick-vnuma')) {
      const icon = this.videoNode.querySelector("img.MuiAvatar-img")
      if (!icon) {
        return
      }
      const tr = icon.parentElement.parentElement.parentElement
      const muiboxRoot = tr.querySelector('.MuiBox-root')
      const videoDetails = muiboxRoot.querySelectorAll('.MuiBox-root')
      console.log(youtubeId)
      const quickButton = createQuickButton('nquick-vnuma', youtubeId)
      if (videoDetails.length == 1) {
        muiboxRoot.appendChild(quickButton)
      } else {
        muiboxRoot.insertBefore(quickButton, videoDetails[1])
      }
    }
  }
}

export { Video, Live }