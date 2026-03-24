import type { AuditLog } from "../../../types/audit";



type Props = {
  logs: AuditLog[];
};

const AuditTable = ({ logs }: Props) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>ID</th>
          <th>User</th>
          <th>Action</th>
          <th>Target</th>
          <th>IP</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => (
          <tr key={log.id} className="border-t">
            <td>{log.id}</td>
            <td>{log.user.email}</td>
            <td>{log.action}</td>
            <td>
              {log.target_type} #{log.target_id}
            </td>
            <td>{log.ip_address}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuditTable;