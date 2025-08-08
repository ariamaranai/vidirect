{
  let d = document;
  let videos = d.getElementsByTagName("video");
  let video;
  let { innerWidth, innerHeight } = self;
  let maxVisibleSize = 0;
  let i = 0;
  while (i < videos.length) {
    let _video = videos[i];
    if (_video.readyState && _video.currentSrc[0] == "h") {
      let { x, right, y, bottom } = _video.getBoundingClientRect();
      let visibleSize = Math.max(Math.min(right, innerWidth) - Math.max(x, 0), 0) * Math.max(Math.min(bottom, innerHeight) - Math.max(y, 0), 0);
      maxVisibleSize < visibleSize && (
        maxVisibleSize = visibleSize,
        video = _video
      );
    }
    ++i;
  }
  video && video.pause(open(video.currentSrc));
}