{
  let run = (a, b) => {
    let tabId = (b || a).id;
    let frameId = b && a.frameId;
    chrome.userScripts.execute({
      target: frameId ? { tabId, frameIds: [frameId] } : { tabId, allFrames: !0 },
      js: [{ file: "video.js" }]
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