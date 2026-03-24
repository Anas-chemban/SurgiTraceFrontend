import { useAlerts } from "./hooks";
import AlertsTable from "./components/AlertsTable";

const AlertsPage = () => {
  const { data, isLoading } = useAlerts();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Alerts</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        <AlertsTable alerts={data} />
      ) : (
        <p>No alerts 🎉</p>
      )}
    </div>
  );
};

export default AlertsPage;