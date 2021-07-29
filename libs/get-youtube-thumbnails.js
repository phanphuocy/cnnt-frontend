export function getYoutubeThumbnail(video_id, quality) {
  if (video_id) {
    if (typeof quality == 'undefined') {
      quality = 'high';
    }

    var quality_key = 'maxresdefault'; // Max quality

    if (quality == 'low') {
      quality_key = 'sddefault';
    } else if (quality == 'medium') {
      quality_key = 'mqdefault';
    } else if (quality == 'high') {
      quality_key = 'hqdefault';
    }

    var thumbnail =
      'http://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg';
    return thumbnail;
  }
}
