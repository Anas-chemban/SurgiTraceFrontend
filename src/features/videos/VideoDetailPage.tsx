import { useParams } from "react-router-dom";
import { useVideo } from "./hooks";
import VideoPlayer from "./VideoPlayer";
import { usePermissions } from "../../app/usePermissions";

const VideoDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useVideo(id || "");
  const { canView, canFull } = usePermissions();

  if (isLoading) return <p>Loading...</p>;

  if (!canView) {
    return <p className="p-6 text-red-500">Access denied</p>;
  }

  if (!data) {
    return <p>Video not found</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl">{data.file_name}</h1>

      {/* 🔐 Full vs Limited Access */}
      {canFull ? (
        <VideoPlayer videoId={data.id} />
      ) : (
        <p className="text-yellow-500">
          You have limited access to this video
        </p>
      )}

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Hash:</strong> {data.hash}</p>
        <p><strong>Duration:</strong> {data.duration}s</p>
      </div>
    </div>
  );
};

export default VideoDetailPage;