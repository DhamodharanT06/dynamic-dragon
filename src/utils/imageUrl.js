export function toDirectGoogleDriveImageUrl(inputUrl) {
  if (!inputUrl || typeof inputUrl !== 'string') return inputUrl

  const url = inputUrl.trim()
  const fileId = extractGoogleDriveFileId(url)

  if (!fileId) return url
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

function extractGoogleDriveFileId(url) {
  const byPath = url.match(/\/file\/d\/([^/]+)/)
  if (byPath?.[1]) return byPath[1]

  const byOpenId = url.match(/[?&]id=([^&]+)/)
  if (byOpenId?.[1]) return byOpenId[1]

  if (/^[a-zA-Z0-9_-]{20,}$/.test(url)) return url
  return null
}
