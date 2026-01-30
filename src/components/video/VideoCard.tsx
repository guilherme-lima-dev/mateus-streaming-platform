"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/types/video";
import { VideoModal } from "@/components/video/VideoModal";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { getYoutubeVideoId, getYoutubeThumbnail } from "@/lib/utils/youtube";
import { formatDuration, truncateText } from "@/lib/utils/format";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [open, setOpen] = useState(false);

  const videoId = getYoutubeVideoId(video.video_url);
  const thumbnail = getYoutubeThumbnail(video.video_url);

  const handleOpen = () => {
    if (!videoId) {
      console.warn("URL de vídeo inválida:", video.video_url);
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="group block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition cursor-pointer"
      >

        <div className="relative aspect-video">
          <Image
            src={thumbnail || "/placeholder.png"}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white/70 group-hover:text-blue-400"
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
          <h3 className="text-lg font-semibold text-white mb-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400">
            {truncateText(video.description, 100)}
          </p>
        </div>
      </div>
      <VideoModal isOpen={open} onClose={() => setOpen(false)}>
        <VideoPlayer videoId={videoId} title={video.title} />
      </VideoModal>
    </>
  );
}
