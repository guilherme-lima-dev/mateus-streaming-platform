export function getYoutubeVideoId(url?: string | null): string {
    if (!url) return "";

    const regex =
        /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?\/]+)/;

    const match = url.match(regex);

    return match ? match[1] : "";
}
export function getYoutubeThumbnail(url?: string | null): string {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return "/placeholder.png";
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}