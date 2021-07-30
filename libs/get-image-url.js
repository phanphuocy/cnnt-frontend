export function getImageMetadata(obj, quality) {
  if (!quality) {
    quality = 'medium';
  }

  if (!obj || typeof obj !== 'object') {
    return '';
  }

  if (!obj.hasOwnProperty('formats')) {
    return '';
  }

  switch (quality) {
    case 'high' || 'large' || 'hq':
      return {
        url: obj.formats.large.url,
        height: obj.formats.large.height,
        width: obj.formats.large.width,
      };
    case 'medium' || 'md':
      return {
        url: obj.formats.medium.url,
        height: obj.formats.medium.height,
        width: obj.formats.medium.width,
      };
    case 'small' || 'sm':
      return {
        url: obj.formats.small.url,
        height: obj.formats.small.height,
        width: obj.formats.small.width,
      };
    case 'thumbnail':
      return {
        url: obj.formats.thumbnail.url,
        height: obj.formats.thumbnail.height,
        width: obj.formats.thumbnail.width,
      };
    default:
      return {
        url: obj.formats.medium.url,
        height: obj.formats.medium.height,
        width: obj.formats.medium.width,
      };
  }
}
