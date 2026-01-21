import { apiClient } from "./client";
import type { Video, CreateVideoInput, UpdateVideoInput } from "@/types/video";

export interface ListVideosParams {
  search?: string;
}

export async function getVideos(params?: ListVideosParams): Promise<Video[]> {
  const response = await apiClient.get<Video[]>("/videos", {
    params,
  });
  return response.data;
}


export async function createVideo(data: CreateVideoInput): Promise<void> {
  await apiClient.post("/videos", data);
}

export async function updateVideo(
  id: string,
  data: UpdateVideoInput
): Promise<void> {
  await apiClient.put(`/videos/${id}`, data);
}

export async function deleteVideo(id: string): Promise<void> {
  await apiClient.delete(`/videos/${id}`);
}
