{
  let d = document;
  let { scrollingElement } = d; 
  let cx = (innerWidth + scrollingElement.scrollLeft) / 2;
  let cy = (innerHeight + scrollingElement.scrollTop) / 2; 
  let videos = d.getElementsByTagName("video");
  let video;
  let minds = 2e9;
  let i = 0;
  while (i < videos.length) {
    let _video = videos[i];
    if (_video.readyState && _video.currentSrc[0] == "h") {
      let rect = _video.getBoundingClientRect();
      let ds = Math.abs(cx - (rect.width / 2 + rect.x)) + Math.abs(cy - (rect.height / 2 + rect.y));
      ds < minds && (
        minds = ds,
        video = _video
      );
    }
    ++i;
  }
  video && video.pause(open(video.currentSrc));
}