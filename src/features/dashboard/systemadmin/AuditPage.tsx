import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

//////////////////////////////////////
// TYPES
//////////////////////////////////////

type AuditLog = {
  id: string;
  user: string;
  action: string;
  role: string;
  target_type: string;
  target_id: number | null;
  ip_address: string;
  timestamp: string;
};

//////////////////////////////////////
// COMPONENT
//////////////////////////////////////

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  //////////////////////////////////////
  // FETCH LOGS
  //////////////////////////////////////
  const fetchLogs = async () => {
    try {
      const res = await api.get("/audit_log/logs/");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchLogs();
      setLoading(false);
    };
    load();
  }, []);

  //////////////////////////////////////
  // FORMATTERS
  //////////////////////////////////////
  const formatText = (text: string) => {
    return text.replace("_", " ");
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="AuditPage">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Audit</h1>
          <p className="text-gray-500 text-sm">
            Manage Audit
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
                  <th className="p-3 text-left">User</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>IP</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-t">

                    <td className="p-3">{log.user}</td>
                    
                    <td className="p-3">{log.role}</td>

                    <td className="capitalize">
                      {formatText(log.action)}
                    </td>

                    <td>
                      {log.target_type} #{log.target_id ?? "-"}
                    </td>

                    <td>{log.ip_address}</td>

                    <td>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td>
                      <button
                        onClick={() => setSelectedLog(log)}
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
        {selectedLog && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white p-6 rounded w-[420px] space-y-4">

              <h2 className="text-lg font-semibold">
                Audit Details
              </h2>

              <div className="space-y-2 text-sm">

                <p><b>ID:</b> {selectedLog.id}</p>

                <p><b>User:</b> {selectedLog.user}</p>

                <p><b>Role:</b> {selectedLog.role}</p>

                <p><b>Action:</b> {formatText(selectedLog.action)}</p>

                <p><b>Target Type:</b> {selectedLog.target_type}</p>

                <p><b>Target ID:</b> {selectedLog.target_id ?? "N/A"}</p>

                <p><b>IP Address:</b> {selectedLog.ip_address}</p>

                <p>
                  <b>Time:</b> {new Date(selectedLog.timestamp).toLocaleString()}
                </p>

              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
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