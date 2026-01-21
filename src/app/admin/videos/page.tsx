"use client";

import { useState } from "react";
import { useVideos, useDeleteVideo } from "@/hooks/useVideos";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatDuration, truncateText } from "@/lib/utils/format";
import Link from "next/link";
import type { Video } from "@/types/video";

export default function AdminVideosPage() {
  const { data: videos, isLoading, isError, refetch } = useVideos();
  const deleteVideo = useDeleteVideo();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (video: Video) => {
    if (confirmDelete !== video.id) {
      setConfirmDelete(video.id);
      return;
    }

    setDeletingId(video.id);
    try {
      await deleteVideo.mutateAsync(video.id);
      setConfirmDelete(null);
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gerenciar Vídeos
          </h1>
          <p className="text-gray-400">
            {videos?.length || 0} vídeo(s) cadastrado(s)
          </p>
        </div>
        <Link href="/admin/videos/new">
          <Button variant="primary">Novo Vídeo</Button>
        </Link>
      </div>

      {videos && videos.length > 0 ? (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duração
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {video.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-md">
                        {truncateText(video.description, 100)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {formatDuration(video.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/videos/${video.id}`}>
                          <Button variant="secondary" className="text-sm">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="text-sm"
                          onClick={() => handleDelete(video)}
                          isLoading={deletingId === video.id}
                        >
                          {confirmDelete === video.id ? "Confirmar?" : "Deletar"}
                        </Button>
                        {confirmDelete === video.id && (
                          <Button
                            variant="ghost"
                            className="text-sm"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
          <p className="text-gray-400 mb-4">Nenhum vídeo cadastrado ainda.</p>
          <Link href="/admin/videos/new">
            <Button variant="primary">Criar Primeiro Vídeo</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
