{
  let host;
  let run = async (a, b) => {
    try {
      host = (await chrome.userScripts.execute({
        target: { tabId: (b || a).id, allFrames: !0 },
        js: [{ file: "video.js" }]
      }))[0].result;
    } catch {}
  }
  chrome.action.onClicked.addListener(run);
  chrome.contextMenus.onClicked.addListener(run);

  chrome.downloads.onCreated.addListener(item => {
    if (!item.byExtensionId && item.mime.startsWith("video") && (new URL(item.referrer).host) == host) {
      host = 0;
      let { id, finalUrl } = item;
      chrome.downloads.cancel(id);
      chrome.downloads.erase({ id });
      chrome.tabs.query({ active: !0, currentWindow: !0 }, tabs =>
        chrome.tabs.create({ url: "vidirect.mp4.htm?" + finalUrl, index: tabs[0].index + 1 })
      );
    }
  });
}
chrome.runtime.onInstalled.addListener(() =>
  chrome.contextMenus.create({
    id: "",
    title: "Open video in new tab",
    contexts: ["page", "video"],
    documentUrlPatterns: ["https://*/*"]
  })
);