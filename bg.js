{
  let run = (a, b) => {
    let tabId = (b || a).id;
    let frameId = b && a.frameId;
    chrome.userScripts.execute({
      target: frameId ? { tabId, frameIds: [frameId] } : { tabId, allFrames: !0 },
      js: [{ code:
`(() => {
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
    return (video = video[index]) && (i = video.currentSrc)[0] == "h" && (video.pause(), i);
  }
})();`
      }]
    }).then(results =>
      (results &&= results[0].result) &&
      chrome.tabs.create({
        url: results,
        index: (b || a).index + 1
      }, tab =>
        chrome.management.getAll(crx =>
          (crx = crx.find(v => v.name == "kbdvid")) &&
          chrome.runtime.sendMessage(crx.id, tab.id)
        )
      )
    ).catch(() => 0);
  }
  chrome.action.onClicked.addListener(run);
  chrome.contextMenus.onClicked.addListener(run);
}
chrome.runtime.onInstalled.addListener(() => (
  chrome.contextMenus.create({
    id: "",
    title: "Open video in new tab",
    contexts: ["page", "video"],
    documentUrlPatterns: ["https://*/*"]
  }),
  chrome.userScripts.configureWorld({
    messaging: !0
  })
));