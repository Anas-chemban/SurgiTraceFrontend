const AlertsSummary = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Recent Alerts</h3>
      <p className="text-sm text-red-500">
        3 critical alerts need attention
      </p>
    </div>
  );
};

export default AlertsSummary;