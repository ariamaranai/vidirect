{
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
}