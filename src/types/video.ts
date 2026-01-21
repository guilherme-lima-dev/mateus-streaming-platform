export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
}

export interface CreateVideoInput {
  title: string;
  description: string;
  duration: number;
}

export interface UpdateVideoInput {
  title: string;
  description: string;
  duration: number;
}
