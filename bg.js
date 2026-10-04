onunhandledrejection = e => e.preventDefault();
{
  let { action, contextMenus, downloads, runtime, scripting, tabs } = chrome;
  let host;
  let f = (a, b) => scripting.executeScript({
    target: { tabId: (b ?? a).id, allFrames: !0 },
    world: "MAIN",
    files: ["video.js"]
  }, results => host = results[0].result);

  action.onClicked.addListener(f);
  contextMenus.onClicked.addListener(f);
  downloads.onCreated.addListener(item => {
    try {
      if (!item.byExtensionId && item.mime.startsWith("video") && (new URL(item.referrer).host) === host) {
        host = 0;
        let { id, finalUrl } = item;
        downloads.cancel(id);
        downloads.erase({ id });
        tabs.query({ active: !0, currentWindow: !0 }, tabs =>
          tabs.create({ url: "vidirect.mp4.htm?" + finalUrl, index: tabs[0].index + 1 })
        );
      }
      return;
    } catch {}
  });
  runtime.onInstalled.addListener(() =>
    contextMenus.create({
      id: "",
      title: "Open video in new tab",
      contexts: ["page", "video"],
      documentUrlPatterns: ["https://*/*"]
    })
  );
}
