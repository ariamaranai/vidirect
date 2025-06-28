{
  let run = async (a, b) => {
    try {
      await chrome.userScripts.execute({
        target: { tabId: (b || a).id, allFrames: !0 },
        js: [{ file: "video.js" }]
      });
    } catch {}
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