import { api } from "../../api/client";
import type { Video } from "../../types/video";


export const getVideos = async (): Promise<Video[]> => {
  const res = await api.get("videos/");
  return res.data;
};

export const getVideo = async (id: string): Promise<Video> => {
  const res = await api.get(`videos/${id}/`);
  return res.data;
};

// 🔥 STREAM URL (important)
export const getVideoStreamUrl = (id: number) => {
  return `http://localhost:8000/api/v1/videos/${id}/stream/`;
};