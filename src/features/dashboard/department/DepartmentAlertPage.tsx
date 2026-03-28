import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

//////////////////////////////////////
// TYPES
//////////////////////////////////////

type Alert = {
  id: number;
  surgery: number;
  surgery_name: string;
  alert_type: string;
  status: string;
  message: string;
  created_at: string;
  resolved_at: string | null;
};

//////////////////////////////////////
// COMPONENT
//////////////////////////////////////

export default function DepartmentAlertPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  //////////////////////////////////////
  // FETCH LIST
  //////////////////////////////////////
  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts/alerts/");
      setAlerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAlerts();
      setLoading(false);
    };
    load();
  }, []);

  //////////////////////////////////////
  // FETCH DETAILS
  //////////////////////////////////////
  const handleView = async (id: number) => {
    try {
      const res = await api.get(`/alerts/alerts/${id}/`);
      setSelectedAlert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////
  // STATUS STYLE
  //////////////////////////////////////
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-600";
      case "resolved":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  //////////////////////////////////////
  // TYPE STYLE (optional UX improvement)
  //////////////////////////////////////
  const formatType = (type: string) => {
    return type.replace("_", " ");
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="AlertPage">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Alert</h1>
          <p className="text-gray-500 text-sm">
            Manage Alert
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th>Surgery</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id} className="border-t">

                    <td className="p-3">A{a.id}</td>

                    <td>{a.surgery_name}</td>

                    <td className="capitalize">
                      {formatType(a.alert_type)}
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${getStatusClass(a.status)}`}
                      >
                        {a.status}
                      </span>
                    </td>

                    <td>
                      {new Date(a.created_at).toLocaleString()}
                    </td>

                    <td>
                      <button
                        onClick={() => handleView(a.id)}
                        className="text-blue-600"
                      >
                        Details
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

        {/* DETAILS MODAL */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white p-6 rounded w-[420px] space-y-4">

              <h2 className="text-lg font-semibold">
                Alert Details
              </h2>

              <div className="space-y-2 text-sm">

                <p><b>ID:</b> {selectedAlert.id}</p>

                <p><b>Surgery:</b> {selectedAlert.surgery_name}</p>

                <p><b>Type:</b> {formatType(selectedAlert.alert_type)}</p>

                <p><b>Status:</b> {selectedAlert.status}</p>

                <p><b>Message:</b> {selectedAlert.message}</p>

                <p>
                  <b>Created:</b>{" "}
                  {new Date(selectedAlert.created_at).toLocaleString()}
                </p>

                <p>
                  <b>Resolved:</b>{" "}
                  {selectedAlert.resolved_at
                    ? new Date(selectedAlert.resolved_at).toLocaleString()
                    : "Not resolved"}
                </p>

              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="bg-teal-600 text-white px-4 py-1 rounded"
                >
                  OK
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}