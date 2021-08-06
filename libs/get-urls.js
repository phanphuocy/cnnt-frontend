export function getMusicVideoUrl(slug) {
  return `/music-videos/${slug}`;
}

export function getProfileUrl(slug) {
  return `/profiles/${slug}`;
}

export function getVideoAddTranslationRoute(slug) {
  return `/translations/add?slug=${slug}`;
}

export function getSpotifyUrl(id) {
  return `https://open.spotify.com/artist${id}`;
}
