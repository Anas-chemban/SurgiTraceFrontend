import { useAuthStore } from "../api/authStore";
import {
  canViewVideo,
  canDownloadVideo,
  canViewFullVideo,
} from "../utils/permissions";

export const usePermissions = () => {
  const user = useAuthStore((s) => s.user);

  return {
    canView: user ? canViewVideo(user.role) : false,
    canDownload: user ? canDownloadVideo(user.role) : false,
    canFull: user ? canViewFullVideo(user.role) : false,
  };
};