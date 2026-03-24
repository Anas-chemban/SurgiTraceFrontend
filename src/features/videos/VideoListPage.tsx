import { useVideos } from "./hooks";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../app/usePermissions";

const VideoListPage = () => {
  const { data, isLoading } = useVideos();
  const navigate = useNavigate();
  const { canView } = usePermissions();

  if (isLoading) return <p>Loading...</p>;

  if (!canView) {
    return <p className="p-6 text-red-500">Access denied</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Videos</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.file_name}</td>

              <td>
                <button
                  onClick={() => navigate(`/videos/${v.id}`)}
                  className="text-blue-500"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoListPage;