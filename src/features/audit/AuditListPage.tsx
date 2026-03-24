import { useState } from "react";
import { useAuditLogs } from "./hooks";
import AuditFilters from "./components/AuditFilters";
import AuditTable from "./components/AuditTable";

const AuditListPage = () => {
  const [filters, setFilters] = useState({});

  const { data, isLoading } = useAuditLogs(filters);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Audit Logs</h1>

      <AuditFilters onFilter={setFilters} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AuditTable logs={data || []} />
      )}
    </div>
  );
};

export default AuditListPage;