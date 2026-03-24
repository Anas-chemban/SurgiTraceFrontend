import { useQuery } from "@tanstack/react-query";
import { getVideos, getVideo } from "./api";

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
};

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo(id),
    enabled: !!id,
  });
};