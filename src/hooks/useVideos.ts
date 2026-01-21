import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  type ListVideosParams,
} from "@/lib/api/videos";
import type { CreateVideoInput, UpdateVideoInput } from "@/types/video";

export function useVideos(params?: ListVideosParams) {
  return useQuery({
    queryKey: ["videos", params?.search],
    queryFn: () => getVideos(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVideoInput) => createVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVideoInput }) =>
      updateVideo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}
