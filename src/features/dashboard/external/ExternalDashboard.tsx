// src/pages/ExternalDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";



export default function ExternalDashboard() {
  return (
    <DashboardLayout title="External Dashboard">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          External User Dashboard
        </h1>

        <div className="bg-white p-4 rounded-xl shadow">
          Video access & audit logs
        </div>

      </div>
    </DashboardLayout>
  );
}