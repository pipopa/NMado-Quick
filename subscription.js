const addQuickButton = () => {
  let dismissableList = document.querySelectorAll("div#dismissable");
  Array.prototype.forEach.call(dismissableList, dismissable => {
    if (dismissable.getAttribute("has-quick-button") !== "true" && !dismissable.className.includes("ytd-shelf-renderer")) {
      dismissable.setAttribute("has-quick-button", "true");
      let detail = dismissable.querySelector("div#details");
      let quickButton = document.createElement("button");
      quickButton.id = "nquick-button";
      quickButton.innerHTML = "N窓に追加";
      if (detail) {
        detail.appendChild(quickButton);
        quickButton.onclick = () => {
          let videoTitle = quickButton.parentElement.querySelector("a#video-title");
          let youtubeId = videoTitle.href.match(/\/watch\?v=(.+)/)[1];
          chrome.runtime.sendMessage({youtubeId: youtubeId });
        }
      }
    }
  });
}

const observeContent = () => {
  addQuickButton();
  // オブザーバインスタンスを作成
  let contents = document.querySelectorAll("div#contents");
  for (content of contents) {
    if (content.getAttribute("observe") !== true) {
      const observer = new MutationObserver(() => {
        addQuickButton();
      });
      const config = {
        childList: true,
      };
      content.setAttribute("observe", "true");
      observer.observe(content, config);
    }
  }
}

observeContent();
document.body.addEventListener("yt-page-data-updated", () => {
  setTimeout(() => observeContent() , 200);
})
document.addEventListener("yt-navigate-finish", () => {
  setTimeout(() => observeContent(), 200);
})
