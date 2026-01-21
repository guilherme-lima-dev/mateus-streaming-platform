"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateVideo } from "@/hooks/useVideos";
import { VideoForm } from "@/components/admin/VideoForm";
import type { CreateVideoFormData } from "@/lib/schemas/video";
import { Toast } from "@/components/ui/Toast";

export default function NewVideoPage() {
  const router = useRouter();
  const createVideo = useCreateVideo();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (data: CreateVideoFormData) => {
    try {
      await createVideo.mutateAsync(data);
      setToast({ message: "Vídeo criado com sucesso!", type: "success" });
      setTimeout(() => {
        router.push("/admin/videos");
      }, 1500);
    } catch (error) {
      setToast({
        message: "Erro ao criar vídeo. Tente novamente.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Criar Novo Vídeo</h1>
        <p className="text-gray-400">Preencha os dados do vídeo</p>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <VideoForm
          onSubmit={handleSubmit}
          isLoading={createVideo.isPending}
          submitLabel="Criar Vídeo"
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
