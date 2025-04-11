{
  let run = (a, b) => {
    let tabId = (b || a).id;
    chrome.userScripts.execute({
      target: b ? { tabId, frameIds: [a.frameId] } : { tabId, allFrames: !0 },
      js: [{ code:
`{
let video = document.body.getElementsByTagName("video");
let i = video.length;
let index = 0;
if (i) {
  if (i > 1) {
    let maxWidth = 0;
    let width = 0;
    while (
      maxWidth < (width = video[--i].offsetWidth) && (maxWidth = width, index = i),
      i
    );
  }
  (video = video[index].currentSrc) && video[0] == "h" && video.pause(open(video));
}
}`
      }]
    }).catch(() => 0);
  }
  chrome.action.onClicked.addListener(run);
  chrome.contextMenus.onClicked.addListener(run);
}
chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Open video in new tab",
    contexts: ["page", "video"],
    documentUrlPatterns: ["https://*/*"]
  })
);