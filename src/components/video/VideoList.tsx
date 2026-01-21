import type { Video } from "@/types/video";
import { VideoCard } from "./VideoCard";
import { Loading } from "../ui/Loading";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";

interface VideoListProps {
  videos: Video[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

export function VideoList({
  videos,
  isLoading,
  isError,
  onRetry,
}: VideoListProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (!videos || videos.length === 0) {
    return <EmptyState message="Nenhum vídeo encontrado." icon="🎬" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
