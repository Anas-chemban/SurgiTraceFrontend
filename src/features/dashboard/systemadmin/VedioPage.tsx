import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";
import { Video } from "lucide-react";

type VideoItem = {
  id: number;
  video_path: string;
  recording_start: string;
  recording_end: string;
  duration: number;
  storage_type: string;
  surgery_id: number;
};

export default function VideoPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////
  // FETCH
  //////////////////////////////////////
  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos/operation/videos/");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  //////////////////////////////////////
  // FORMATTERS
  //////////////////////////////////////
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Videos">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Videos</h1>
          <p className="text-gray-500 text-sm">
            Manage surgical video recordings
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center p-10">Loading...</div>
        ) : videos.length === 0 ? (
          <div className="text-center p-10 text-gray-500">
            No videos found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {videos.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Video size={40} className="text-gray-400" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">

                  {/* Title */}
                  <div className="flex justify-between items-start">
                    <h2 className="font-medium text-gray-800">
                      Surgery #{v.surgery_id}
                    </h2>

                    <span className="text-green-600 bg-green-100 px-2 py-1 text-xs rounded">
                      ready
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Duration: {formatDuration(v.duration)}</p>
                    <p>Storage: {v.storage_type}</p>
                  </div>

                  {/* Action */}
                  <a
                    href={`http://127.0.0.1:8000${v.video_path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-600 text-sm font-medium inline-block mt-2"
                  >
                    Play Video →
                  </a>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}