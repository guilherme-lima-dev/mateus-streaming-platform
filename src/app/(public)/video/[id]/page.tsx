"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/lib/api/videos";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatDuration } from "@/lib/utils/format";
import Link from "next/link";

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;

  const {
    data: videos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getVideos(),
  });

  const video = videos?.find((v) => v.id === videoId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState
          message="Vídeo não encontrado ou erro ao carregar."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors inline-flex items-center gap-2"
          >
            ← Voltar ao Catálogo
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <VideoPlayer videoId={video.id} title={video.title} />
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{video.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-400">
              Duração: {formatDuration(video.duration)}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{video.description}</p>
        </div>
      </main>
    </div>
  );
}
