interface VideoNode {
  node: Element
  getYouTubeId(): string;
  addQuickButton(createQuickButton: (className: string, youtubeId: string) => HTMLDivElement): void;
}

class Live implements VideoNode {
  node: Element

  constructor(node: Element) {
    this.node = node
  }

  getYouTubeId(): string {
    const imgList = this.node.querySelectorAll("img")
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
    if (youtubeId && !this.node.querySelector('.nquick-vnuma')) {
      const icon = this.node.querySelector("img.MuiAvatar-img")
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
}

class Schedule implements VideoNode {
  node: Element

  constructor(node: Element) {
    this.node = node
  }

  getYouTubeId(): string {
    const imgList = this.node.querySelectorAll("img")
    if (imgList.length < 1) {
      return ""
    }
    const thumbnail = imgList[0]
    const m = thumbnail.src.match(/vi\/([^\/]+)\//)
    if (m.length >= 2) {
      return m[1]
    }
    return ""
  }

  addQuickButton(createQuickButton: (className: string, youtubeId: string) => HTMLDivElement): void {
    const youtubeId = this.getYouTubeId()
    if (youtubeId && !this.node.querySelector('.nquick-vnuma-schedule')) {
      let scheduledTime = this.node.querySelector('span')
      const quickButton = createQuickButton('nquick-vnuma-schedule', youtubeId)
      scheduledTime.parentElement.insertBefore(quickButton, scheduledTime)
    }
  }
}

export { VideoNode, Live, Schedule }