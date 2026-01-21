"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useVideos } from "@/hooks/useVideos";
import { SearchBar } from "@/components/video/SearchBar";
import { VideoList } from "@/components/video/VideoList";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: videos, isLoading, isError, refetch } = useVideos({
    search: debouncedSearch || undefined,
  });

  return (
    <div className="min-h-screen">
      <header className="bg-gray-900 border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Plataforma de Streaming
          </h1>
          <SearchBar onSearch={setSearch} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {debouncedSearch ? `Resultados para "${debouncedSearch}"` : "Catálogo de Vídeos"}
          </h2>
          <a
            href="/admin"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Área Admin →
          </a>
        </div>

        <VideoList
          videos={videos}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
        />
      </main>
    </div>
  );
}
