chrome.runtime.onMessage.addListener((message) => {
  let url = 'https://www.youtube.com/watch?v=' + message.youtubeId
  console.log(url)
  let input = document.getElementById('video-url')
  input.value = url
  let addButton = document.getElementById('add-video-button')
  addButton.click()
})
