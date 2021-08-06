export function getImageLargestAvailable(obj) {
  function returnMetadata(format) {
    return {
      url: format.url,
      height: format.height,
      width: format.width,
    };
  }

  if (obj.formats.large) {
    return returnMetadata(obj.formats.large);
  } else if (obj.formats.medium) {
    return returnMetadata(obj.formats.medium);
  } else if (obj.formats.small) {
    return returnMetadata(obj.formats.small);
  } else if (obj.formats.thumbnail) {
    return returnMetadata(obj.formats.thumbnail);
  }
}
