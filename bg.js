{
  let run = (a, b) => {
    let tabId = (b || a).id;
    chrome.userScripts.execute({
      target: b ? { tabId, frameIds: [a.frameId] } : { tabId, allFrames: !0 },
      js: [{ code:
`{
  let video = document.body.getElementsByTagName("video");
  let i = video.length;
  if (i) {
    let index = 0;
    let maxWidth = 0;
    let width = 0;
    while (
      maxWidth < (width = video[--i].offsetWidth) && (maxWidth = width, index = i),
      i
    );
    (video = video[index]) &&
    (i = video.currentSrc)[0] == "h" &&
    video.pause(open(i));
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