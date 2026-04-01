import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

type MissingVideo = {
  surgery_id: number;
  surgery_name: string;
  message: string;
};

export default function PengingVedioPage() {
  const [videos, setVideos] = useState<MissingVideo[]>([]);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////
  // FETCH DATA
  //////////////////////////////////////
  const fetchMissingVideos = async () => {
    try {
      const res = await api.get(
        "/alerts/alerts/missing-videos/"
      );
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching missing videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingVideos();
  }, []);

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Pending Video">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">
            Pending Videos
          </h1>
          <p className="text-gray-500 text-sm">
            Surgeries with missing video recordings
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : videos.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No pending videos 🎉
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Surgery ID</th>
                  <th>Surgery Name</th>
                  <th>Issue</th>
                </tr>
              </thead>

              <tbody>
                {videos.map((item) => (
                  <tr key={item.surgery_id} className="border-t">
                    <td className="p-3">S{item.surgery_id}</td>
                    <td>{item.surgery_name}</td>
                    <td>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                        {item.message}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}