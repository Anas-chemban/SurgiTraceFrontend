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

  const [selectedFiles, setSelectedFiles] = useState<{
    [key: number]: File | null;
  }>({});

  const [uploadingId, setUploadingId] = useState<number | null>(null);

  //////////////////////////////////////
  // FETCH
  //////////////////////////////////////
  const fetchMissingVideos = async () => {
    try {
      const res = await api.get("/alerts/alerts/missing-videos/");
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingVideos();
  }, []);

  //////////////////////////////////////
  // FILE SELECT
  //////////////////////////////////////
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    surgeryId: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFiles((prev) => ({
      ...prev,
      [surgeryId]: file,
    }));
  };

  //////////////////////////////////////
  // UPLOAD
  //////////////////////////////////////
  const handleUpload = async (surgeryId: number) => {
    const file = selectedFiles[surgeryId];

    if (!file) {
      alert("Please choose a file first");
      return;
    }

    try {
      setUploadingId(surgeryId);

      const formData = new FormData();
      formData.append("surgery_id", String(surgeryId));
      formData.append("video_path", file);
      formData.append("recording_start", new Date().toISOString());
      formData.append("recording_end", new Date().toISOString());
      formData.append("duration", "3600");
      formData.append("storage_type", "WORM");

      await api.post("/videos/operation/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedFiles((prev) => ({
        ...prev,
        [surgeryId]: null,
      }));

      fetchMissingVideos();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingId(null);
    }
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Pending Video">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Pending Videos</h1>
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
                  <th>Choose File</th>
                  <th>Upload</th>
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

                    {/* CHOOSE FILE BUTTON */}
                    <td>
                      <label className="cursor-pointer bg-gray-200 px-3 py-1 rounded text-sm">
                        Choose File
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileSelect(e, item.surgery_id)
                          }
                        />
                      </label>

                      {/* FILE NAME */}
                      {selectedFiles[item.surgery_id] && (
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedFiles[item.surgery_id]?.name}
                        </p>
                      )}
                    </td>

                    {/* UPLOAD BUTTON */}
                    <td>
                      <button
                        onClick={() => handleUpload(item.surgery_id)}
                        disabled={uploadingId === item.surgery_id}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm"
                      >
                        {uploadingId === item.surgery_id
                          ? "Uploading..."
                          : "Upload"}
                      </button>
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