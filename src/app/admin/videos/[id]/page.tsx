"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/lib/api/videos";
import { useUpdateVideo } from "@/hooks/useVideos";
import { VideoForm } from "@/components/admin/VideoForm";
import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";
import { Toast } from "@/components/ui/Toast";
import type { UpdateVideoFormData } from "@/lib/schemas/video";

export default function EditVideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const updateVideo = useUpdateVideo();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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

  const handleSubmit = async (data: UpdateVideoFormData) => {
    try {
      await updateVideo.mutateAsync({ id: videoId, data });
      setToast({ message: "Vídeo atualizado com sucesso!", type: "success" });
      setTimeout(() => {
        router.push("/admin/videos");
      }, 1500);
    } catch (error) {
      setToast({
        message: "Erro ao atualizar vídeo. Tente novamente.",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !video) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Editar Vídeo</h1>
        <p className="text-gray-400">Atualize os dados do vídeo</p>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <VideoForm
          initialData={{
            title: video.title,
            description: video.description,
            duration: video.duration,
          }}
          onSubmit={handleSubmit}
          isLoading={updateVideo.isPending}
          submitLabel="Salvar Alterações"
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
