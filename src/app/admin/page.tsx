"use client";

import { useVideos } from "@/hooks/useVideos";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatDuration } from "@/lib/utils/format";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: videos, isLoading, isError, refetch } = useVideos();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const totalVideos = videos?.length || 0;
  const totalDuration = videos?.reduce((acc, video) => acc + video.duration, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
        <p className="text-gray-400">Visão geral da plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-2">
            Total de Vídeos
          </h3>
          <p className="text-3xl font-bold text-blue-400">{totalVideos}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-2">
            Duração Total
          </h3>
          <p className="text-3xl font-bold text-blue-400">
            {formatDuration(totalDuration)}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-2">
            Ações Rápidas
          </h3>
          <Link href="/admin/videos/new">
            <Button variant="primary" className="w-full mt-4">
              Adicionar Novo Vídeo
            </Button>
          </Link>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Vídeos Recentes</h2>
          <Link href="/admin/videos">
            <Button variant="ghost">Ver Todos</Button>
          </Link>
        </div>
        {videos && videos.length > 0 ? (
          <div className="space-y-2">
            {videos.slice(0, 5).map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div>
                  <h3 className="text-white font-medium">{video.title}</h3>
                  <p className="text-sm text-gray-400">
                    {formatDuration(video.duration)}
                  </p>
                </div>
                <Link href={`/admin/videos/${video.id}`}>
                  <Button variant="ghost" className="text-sm">
                    Editar
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nenhum vídeo cadastrado ainda.
          </p>
        )}
      </Card>
    </div>
  );
}
