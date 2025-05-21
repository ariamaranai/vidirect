{
  let run = (a, b) => {
    let tabId = (b || a).id;
    let frameId = b && a.frameId;
    chrome.management.getAll(crx => {
      let f = tab => tab.url || tab.index - (b || a).index - 1 || chrome.runtime.sendMessage(crx.id, tab.id);

      (crx = crx.find(v => v.name == "kbdvid")) && chrome.tabs.onCreated.addListener(f);
      chrome.userScripts.execute({
        target: frameId ? { tabId, frameIds: [frameId] } : { tabId, allFrames: !0 },
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
    (video = video[index]) && (i = video.currentSrc)[0] == "h" && video.pause(open(i));
  }
}`
        }]
      }).catch(() => 0);
      crx && chrome.tabs.onCreated.removeListener(f);
    });
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