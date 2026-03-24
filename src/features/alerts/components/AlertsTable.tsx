
import { useNavigate } from "react-router-dom";
import AlertBadge from "./AlertBadge";
import type { Alert } from "../../../types/alert";

type Props = {
  alerts: Alert[];
};

const AlertsTable = ({ alerts }: Props) => {
  const navigate = useNavigate();

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>ID</th>
          <th>Type</th>
          <th>Message</th>
          <th>Severity</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {alerts.map((alert) => (
          <tr key={alert.id} className="border-t">
            <td>{alert.id}</td>
            <td>{alert.type}</td>
            <td>{alert.message}</td>
            <td>
              <AlertBadge severity={alert.severity} />
            </td>
            <td>
              <button
                onClick={() => navigate(`/surgeries/${alert.surgery}`)}
                className="text-blue-500"
              >
                View Surgery
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlertsTable;