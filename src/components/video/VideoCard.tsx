import Link from "next/link";
import type { Video } from "@/types/video";
import { formatDuration, truncateText } from "@/lib/utils/format";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={`/video/${video.id}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-600 group-hover:text-blue-500 transition-colors"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {truncateText(video.description, 100)}
        </p>
      </div>
    </Link>
  );
}
