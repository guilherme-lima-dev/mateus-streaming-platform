export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail_url?: string;
  video_url?: string;
}

export interface CreateVideoInput {
  title: string;
  description: string;
  duration: number;
  thumbnail_url?: string;
  video_url?: string;
}

export interface UpdateVideoInput {
  title: string;
  description: string;
  duration: number;
  thumbnail_url?: string;
  video_url?: string;
}
